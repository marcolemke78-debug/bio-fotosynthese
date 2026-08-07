const Progress = {
  // Eigener Schluessel! Auf GitHub Pages liegen alle Lernprogramme unter
  // derselben Domain - mit dem alten KOIN-Schluessel wuerden sich die
  // Programme gegenseitig den Fortschritt ueberschreiben.
  STORAGE_KEY: 'bio_fotosynthese_progress',
  VERSION: 1,
  TOTAL_LESSONS: 6,

  // Standard-Zustand: alle 6 Lektionen auf not_started, letzte Lektion = 1
  createDefault() {
    const data = { version: this.VERSION, lessons: {}, lastLesson: 1 };
    for (let i = 1; i <= this.TOTAL_LESSONS; i++) {
      data.lessons[i] = { status: 'not_started' };
    }
    return data;
  },

  // Aus localStorage laden.
  // Fallback auf Default bei: fehlendem Eintrag, kaputtem JSON, Version-Mismatch.
  load() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) {
        const data = this.createDefault();
        this.save(data);
        return data;
      }
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== this.VERSION) {
        const data = this.createDefault();
        this.save(data);
        return data;
      }
      return parsed;
    } catch (e) {
      // JSON.parse-Fehler oder sonstiges Problem -> sauberer Neustart
      const data = this.createDefault();
      this.save(data);
      return data;
    }
  },

  // Aktuellen Zustand in localStorage schreiben.
  // setItem kann werfen: Safari-Privatmodus, voller Speicher, Storage gesperrt.
  // Das darf die App nicht anhalten - ohne Speicher laeuft das Programm normal
  // weiter, nur der Fortschritt ueberlebt das Schliessen des Tabs nicht.
  // Ohne dieses try/catch wuerde stattdessen der ausloesende Klick-Handler
  // abbrechen (z.B. "Lektion abschliessen" reagiert dann gar nicht mehr).
  save(data) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Fortschritt konnte nicht gespeichert werden:', e);
    }
  },

  // Status einer Lektion abfragen: 'not_started' | 'in_progress' | 'completed'
  getStatus(lessonId) {
    const data = this.load();
    const lesson = data.lessons[lessonId];
    return lesson ? lesson.status : 'not_started';
  },

  // Status einer Lektion setzen und direkt speichern
  setStatus(lessonId, status) {
    const data = this.load();
    if (!data.lessons[lessonId]) {
      data.lessons[lessonId] = {};
    }
    data.lessons[lessonId].status = status;
    this.save(data);
  },

  // Letzte besuchte Lektion auslesen
  getLastLesson() {
    const data = this.load();
    return data.lastLesson;
  },

  // Letzte besuchte Lektion setzen und speichern
  setLastLesson(lessonId) {
    const data = this.load();
    data.lastLesson = lessonId;
    this.save(data);
  },

  // Fortschritt komplett zuruecksetzen.
  // removeItem kann aus denselben Gruenden werfen wie setItem oben. Ohne
  // try/catch wuerde der Klick auf "Fortschritt zuruecksetzen" mitten im
  // Handler abbrechen - die App bliebe dann auf der alten Lektion stehen,
  // statt wie vorgesehen zu Lektion 1 zu springen.
  reset() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (e) {
      console.warn('Fortschritt konnte nicht zurueckgesetzt werden:', e);
    }
  },

  // Prozent der abgeschlossenen Lektionen im Bereich [start, end]
  // z.B. getCompletionPercent(1, 6) fuer C1, getCompletionPercent(7, 11) fuer C2
  getCompletionPercent(start, end) {
    const data = this.load();
    let completed = 0;
    const total = end - start + 1;
    for (let i = start; i <= end; i++) {
      if (data.lessons[i] && data.lessons[i].status === 'completed') {
        completed++;
      }
    }
    return Math.round((completed / total) * 100);
  },

  // ===================== Spaced Repetition (Leitner-System) =====================
  // Verteiltes Wiederholen: Eine abgeschlossene Lektion wandert durch fuenf
  // Karteikasten-Faecher mit wachsenden Abstaenden. Je sicherer sich Leonie
  // fuehlt, desto weiter hinten landet die Lektion - und desto spaeter kommt
  // sie wieder dran. So konzentriert sich das Ueben von selbst auf das,
  // was noch wackelt.
  // WICHTIG: Die SR-Felder (box, dueDate, lastReviewed, confidence) werden
  // additiv pro Lektion ergaenzt - KEIN VERSION-Bump. Ein Bump wuerde in
  // load() den Version-Mismatch ausloesen und den kompletten bereits
  // erarbeiteten Fortschritt loeschen. Alte Eintraege ohne diese Felder
  // sind deshalb ueberall zulaessig und bedeuten schlicht: noch nie
  // eingeschaetzt, also (noch) nicht im Wiederholungssystem.
  INTERVALS: [1, 3, 7, 16, 35], // Tage bis zur naechsten Wiederholung je Fach (1..5)

  // Heutiges Datum als YYYY-MM-DD (tagesgenau, ohne Uhrzeit).
  // Bewusst KEINE Date-Objekte mit Uhrzeit vergleichen: sonst haengt
  // "heute faellig" an der Tageszeit und Zeitzonen-/Sommerzeit-Spruenge
  // verschieben das Ergebnis um einen Tag.
  _today() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  },

  // Datum-String (YYYY-MM-DD) um n Tage verschieben, wieder als YYYY-MM-DD.
  // Das 'T00:00:00' ohne Zeitzonen-Kuerzel erzwingt lokale Mitternacht -
  // ohne den Zusatz wuerde der String als UTC gelesen und die Rechnung
  // koennte in Deutschland auf den Vortag rutschen.
  _addDays(dateStr, n) {
    const d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + n);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  },

  // Ist dieses Faelligkeitsdatum heute oder schon ueberschritten?
  // YYYY-MM-DD-Strings sind gleich lang und mit Nullen aufgefuellt -
  // deshalb genuegt ein einfacher Textvergleich ("2026-08-07" < "2026-08-10").
  _isDue(dateStr) {
    return !!dateStr && dateStr <= this._today();
  },

  // Eine Lektion wurde komplett geloest (alle Uebungen richtig).
  // Die Selbsteinschaetzung (confidence) steuert das Leitner-Fach:
  //   'low'    (noch unsicher) -> zurueck auf Fach 1 (morgen wieder)
  //   'medium' (geht so)       -> bleibt im aktuellen Fach (beim ersten Mal: Fach 1)
  //   'high'   (sitzt sicher)  -> ein Fach weiter (beim ersten Mal: Fach 2)
  // Ohne confidence (Fallback): wie 'medium'.
  // Das naechste Faelligkeitsdatum ergibt sich aus dem Intervall des neuen Fachs.
  recordCompletion(lessonId, confidence) {
    const data = this.load();
    if (!data.lessons[lessonId]) data.lessons[lessonId] = { status: 'completed' };
    const lesson = data.lessons[lessonId];
    // Ein alter Eintrag ohne box zaehlt als Erstabschluss - genau so soll
    // sich bereits vorhandener Fortschritt verhalten.
    const isFirstTime = !lesson.box;
    const currentBox = lesson.box || 0;

    let newBox;
    if (confidence === 'low') {
      newBox = 1;
    } else if (confidence === 'high') {
      newBox = isFirstTime ? 2 : currentBox + 1;
    } else { // 'medium' oder kein Wert
      newBox = isFirstTime ? 1 : currentBox;
    }
    // In den gueltigen Fachbereich 1..5 zwingen
    newBox = Math.max(1, Math.min(newBox, this.INTERVALS.length));

    lesson.box = newBox;
    lesson.dueDate = this._addDays(this._today(), this.INTERVALS[newBox - 1]);
    lesson.lastReviewed = this._today();
    if (confidence) lesson.confidence = confidence;
    this.save(data);
  },

  // Alle heute (oder frueher) faelligen Lektionen, am laengsten ueberfaellig zuerst.
  // Lektionen ohne box (nie eingeschaetzt) sind nicht im System und kommen
  // hier gar nicht vor.
  getDueLessons() {
    const data = this.load();
    const today = this._today();
    const due = [];
    Object.keys(data.lessons).forEach(id => {
      const l = data.lessons[id];
      if (l && l.box > 0 && l.dueDate && l.dueDate <= today) {
        due.push({ id: parseInt(id, 10), box: l.box, dueDate: l.dueDate });
      }
    });
    due.sort((a, b) => (a.dueDate < b.dueDate ? -1 : (a.dueDate > b.dueDate ? 1 : 0)));
    return due;
  },

  // SR-Info einer einzelnen Lektion (fuer das Sidebar-Badge).
  // null = Lektion ist (noch) nicht im Wiederholungssystem.
  getReviewInfo(lessonId) {
    const data = this.load();
    const l = data.lessons[lessonId];
    if (!l || !l.box) return null;
    return { box: l.box, dueDate: l.dueDate, due: this._isDue(l.dueDate) };
  }
};
