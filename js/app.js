/**
 * Fotosynthese & Zellatmung - Lernprogramm
 * Navigation und Initialisierung.
 */

// Uebersicht aller Lektionen fuer die Sidebar. ID und Titel kommen direkt aus
// den Lektionsdaten - sonst muesste man jeden Titel an zwei Stellen pflegen und
// die Sidebar koennte der H1-Ueberschrift widersprechen.
// lessons-foto.js wird in index.html vor app.js geladen, LessonsFoto steht hier
// also schon bereit.
// Die IDs duerfen spaeter NICHT mehr geaendert werden, sonst verliert man den
// im Browser gespeicherten Fortschritt.
const LESSONS = LessonsFoto.map(lesson => ({ id: lesson.id, title: lesson.title }));

/**
 * Navigiert zu einer bestimmten Lektion.
 */
function navigateToLesson(id) {
  // Sidebar schliessen (wichtig auf dem Tablet)
  document.getElementById('sidebar').classList.remove('open');

  // Der "heute faellig"-Kasten ist eine Begruessung, kein Dauer-Banner:
  // sobald Leonie aktiv eine Lektion oeffnet, hat er seinen Zweck erfuellt
  // und verschwindet. Die Erinnerung bleibt ueber die Sidebar-Badges sichtbar.
  const reviewBox = document.getElementById('review-due');
  if (reviewBox) reviewBox.style.display = 'none';

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

  // Faellig-Kasten NACH der ersten Navigation zeigen - navigateToLesson
  // blendet ihn ja aus, in dieser Reihenfolge ueberlebt die Begruessung.
  Renderer.renderReviewDue();

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
