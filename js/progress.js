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
  }
};
