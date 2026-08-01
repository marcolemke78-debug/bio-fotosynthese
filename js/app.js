/**
 * Fotosynthese & Zellatmung - Lernprogramm
 * Navigation und Initialisierung.
 */

// Uebersicht aller Lektionen. Die IDs duerfen spaeter NICHT mehr geaendert
// werden, sonst verliert man den im Browser gespeicherten Fortschritt.
const LESSONS = [
  { id: 1, title: 'Die Zelle als Fabrik' },
  { id: 2, title: 'Fotosynthese: rein und raus' },
  { id: 3, title: 'Das Blatt von innen' },
  { id: 4, title: 'Was bremst die Fotosynthese?' },
  { id: 5, title: 'Zellatmung' },
  { id: 6, title: 'Der Kreislauf' }
];

/**
 * Navigiert zu einer bestimmten Lektion.
 */
function navigateToLesson(id) {
  // Sidebar schliessen (wichtig auf dem Tablet)
  document.getElementById('sidebar').classList.remove('open');

  Progress.setLastLesson(id);

  // Beim ersten Oeffnen einer Lektion Status auf "angefangen" setzen
  if (Progress.getStatus(id) === 'not_started') {
    Progress.setStatus(id, 'in_progress');
  }

  Renderer.renderLesson(id);
  Renderer.renderSidebar(LESSONS);
  Renderer.renderProgressBar();

  // Aktive Lektion markieren - erst NACH renderSidebar, weil das die
  // <li>-Elemente neu erzeugt und die Markierung sonst verloren geht
  const activeItem = document.querySelector('#sidebar li[data-lesson-id="' + id + '"]');
  if (activeItem) activeItem.classList.add('active');

  window.scrollTo(0, 0);
}

// --- Initialisierung ---
document.addEventListener('DOMContentLoaded', () => {
  Renderer.renderSidebar(LESSONS);
  Renderer.renderProgressBar();

  // Dort weitermachen, wo zuletzt aufgehoert wurde
  const last = Progress.getLastLesson();
  navigateToLesson(last || 1);

  // Hamburger-Menue (Tablet/Handy)
  const menuBtn = document.getElementById('menu-toggle');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('open');
    });
  }

  // Fortschritt zuruecksetzen
  const resetBtn = document.getElementById('reset-progress');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Wirklich den gesamten Fortschritt loeschen?')) {
        Progress.reset();
        navigateToLesson(1);
      }
    });
  }
});
