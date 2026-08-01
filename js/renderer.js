// Kleines Inline-SVG des Klemmbrett-Symbols aus den KOIN-Uebungs-PDFs
// ("Moegliche Klausuraufgabe"). Wird in Sidebar und Lektions-Header verwendet.


const Renderer = {

  /**
   * Sidebar mit Lektionsliste aufbauen.
   * Jede Lektion bekommt ein <li> mit data-lesson-id und einer
   * CSS-Klasse je nach Fortschrittsstatus.
   */
  renderSidebar(lessons) {
    const list = document.getElementById('lesson-list');
    list.innerHTML = '';

    lessons.forEach(lesson => {
      const li = document.createElement('li');
      li.dataset.lessonId = lesson.id;
      const status = Progress.getStatus(lesson.id);
      const prefix = (status === 'completed') ? '✓ ' : '';
      if (status === 'completed') li.classList.add('completed');
      else if (status === 'in_progress') li.classList.add('in-progress');
      else li.classList.add('not-started');

      // Icon fuer klausurrelevante Lektionen (vor dem Titel)
      li.textContent = prefix + lesson.title;

      list.appendChild(li);
    });
  },

  /**
   * Fortschrittsbalken aktualisieren.
   * Zeigt den Gesamtfortschritt ueber alle 6 Lektionen.
   */
  renderProgressBar() {
    const percent = Progress.getCompletionPercent(1, 6);
    const bar = document.getElementById('progress-bar');
    bar.style.width = percent + '%';
  },

  /**
   * Lektionsinhalt im #lesson-container rendern.
   * Sucht die Lektionsdaten in LessonsFoto und baut das
   * 3-Phasen-Layout (Erklaerung, Beispiel, Uebung) auf.
   */
  renderLesson(id) {
    const container = document.getElementById('lesson-container');

    // Lektionsdaten aus dem Content-Array suchen
    const lessonData = LessonsFoto.find(l => l.id === id);

    // Titel aus der LESSONS-Liste (hat immer einen Eintrag)
    const lessonMeta = LESSONS.find(l => l.id === id);
    const title = lessonMeta ? lessonMeta.title : 'Unbekannte Lektion';

    // Wenn keine Lektionsdaten vorhanden: Platzhalter anzeigen
    if (!lessonData) {
      container.innerHTML = `<h1>Lektion ${id}: ${title}</h1>
        <p>Inhalt wird noch erstellt...</p>`;
      return;
    }

    // --- DOM aufbauen ---

    container.innerHTML = `<h1>Lektion ${id}: ${lessonData.title}</h1>`;

    // Phase-Tabs
    const tabsDiv = document.createElement('div');
    tabsDiv.className = 'phase-tabs';

    const phases = [
      { key: 'explanation', label: 'Erklärung' },
      { key: 'example', label: 'Beispiel' },
      { key: 'exercises', label: 'Übung' }
    ];

    phases.forEach((phase, i) => {
      const btn = document.createElement('button');
      btn.className = 'phase-tab' + (i === 0 ? ' active' : '');
      btn.dataset.phase = phase.key;
      btn.textContent = phase.label;
      tabsDiv.appendChild(btn);
    });

    container.appendChild(tabsDiv);

    // Phase: Erklaerung
    const explanationSection = document.createElement('section');
    explanationSection.className = 'phase explanation active';
    explanationSection.id = 'phase-explanation';
    explanationSection.innerHTML = lessonData.explanation.html;
    // Visuals in der Erklaerungsphase rendern
    if (lessonData.explanation.visuals) {
      Renderer.renderVisuals(lessonData.explanation.visuals, explanationSection);
    }
    container.appendChild(explanationSection);

    // Phase: Beispiel
    const exampleSection = document.createElement('section');
    exampleSection.className = 'phase example';
    exampleSection.id = 'phase-example';

    if (lessonData.example) {
      const h2 = document.createElement('h2');
      h2.textContent = lessonData.example.title;
      exampleSection.appendChild(h2);

      lessonData.example.steps.forEach((step, i) => {
        const details = document.createElement('details');
        details.className = 'example-step';
        // Nur den ersten Schritt offen anzeigen
        if (i === 0) details.open = true;

        const summary = document.createElement('summary');
        summary.textContent = `Schritt ${i + 1}: ${step.label}`;
        details.appendChild(summary);

        const content = document.createElement('div');
        content.className = 'step-content';
        content.innerHTML = step.html;
        details.appendChild(content);

        // Visuals pro Schritt rendern (z.B. eine Circuit-Simulation, die zu diesem Step passt)
        if (step.visuals) {
          Renderer.renderVisuals(step.visuals, content);
        }

        exampleSection.appendChild(details);
      });

      // Visuals in der Beispielphase rendern
      if (lessonData.example.visuals) {
        Renderer.renderVisuals(lessonData.example.visuals, exampleSection);
      }
    }

    container.appendChild(exampleSection);

    // Phase: Uebungen
    const exercisesSection = document.createElement('section');
    exercisesSection.className = 'phase exercises';
    exercisesSection.id = 'phase-exercises';
    container.appendChild(exercisesSection);

    // Uebungen rendern, falls vorhanden
    if (lessonData.exercises && lessonData.exercises.length > 0) {
      const totalExercises = lessonData.exercises.length;
      let completedCount = 0;

      lessonData.exercises.forEach(exercise => {
        Exercises.render(exercise, exercisesSection, () => {
          completedCount++;
          // Wenn alle Uebungen bestanden: Lektion als abgeschlossen markieren
          if (completedCount === totalExercises) {
            Progress.setStatus(id, 'completed');
            Renderer.renderSidebar(LESSONS);
            Renderer.renderProgressBar();
          }
        });
      });
    }

    // Tab-Klick-Logik: Phase wechseln
    tabsDiv.addEventListener('click', (e) => {
      const clickedTab = e.target.closest('.phase-tab');
      if (!clickedTab) return;

      const targetPhase = clickedTab.dataset.phase;

      // Alle Tabs und Sections deaktivieren
      tabsDiv.querySelectorAll('.phase-tab').forEach(t => t.classList.remove('active'));
      container.querySelectorAll('.phase').forEach(s => s.classList.remove('active'));

      // Geklickten Tab und zugehoerige Section aktivieren
      clickedTab.classList.add('active');
      document.getElementById('phase-' + targetPhase).classList.add('active');
    });
  }
};

/**
 * Rendert Visualisierungen in einen Container.
 * Liest das visuals-Array aus den Lektionsdaten und dispatcht an Visuals-Methoden.
 *
 * @param {Array} visuals - Array von Visual-Config-Objekten
 * @param {HTMLElement} container - Ziel-Container
 */
Renderer.renderVisuals = function(visuals, container) {
  if (!visuals || !Array.isArray(visuals) || visuals.length === 0) return;

  visuals.forEach(vis => {
    switch (vis.type) {
      case 'labeled-svg':
        Visuals.renderLabeledSvg(vis, container);
        break;
      case 'factor-sim':
        Visuals.renderFactorSim(vis, container);
        break;
      case 'cycle-anim':
        Visuals.renderCycleAnim(vis, container);
        break;
      case 'equation':
        Visuals.renderEquation(vis, container);
        break;
      default:
        console.warn('Unbekannter Visual-Typ:', vis.type);
    }
  });
};

// Event-Delegation: Klicks auf Sidebar-<li>-Elemente abfangen
// Wird einmal registriert und bleibt auch nach Sidebar-Neurendern aktiv
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('sidebar').addEventListener('click', (e) => {
    // Naechstes <li> im DOM-Baum finden (falls auf ein Kind-Element geklickt wurde)
    const li = e.target.closest('li[data-lesson-id]');
    if (li) {
      const lessonId = parseInt(li.dataset.lessonId, 10);
      navigateToLesson(lessonId);
    }
  });
});
