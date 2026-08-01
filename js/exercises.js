const Exercises = {
  /**
   * Rendert eine einzelne Uebung in den Container.
   * Dispatcht je nach exercise.type an die passende Render-Funktion.
   *
   * @param {Object} exercise - Uebungsobjekt mit type, question, etc.
   * @param {HTMLElement} container - DOM-Element in das gerendert wird
   * @param {Function} onComplete - Callback wenn Uebung bestanden
   */
  render(exercise, container, onComplete) {
    switch (exercise.type) {
      case 'multiple-choice':
        return Exercises.renderMultipleChoice(exercise, container, onComplete);
      case 'matching':
        return Exercises.renderMatching(exercise, container, onComplete);
      case 'fill-in-blank':
        return Exercises.renderFillInBlank(exercise, container, onComplete);
      case 'ordering':
        return Exercises.renderOrdering(exercise, container, onComplete);
      case 'labeling':
        return Exercises.renderLabeling(exercise, container, onComplete);
      default:
        const div = document.createElement('div');
        div.textContent = 'Übungstyp "' + exercise.type + '" wird noch implementiert.';
        container.appendChild(div);
    }
  },

  /**
   * Rendert eine Multiple-Choice-Uebung.
   * Zeigt Frage + Antwort-Buttons an. Bei Klick:
   * - Richtig: Button gruen, Erklaerung anzeigen, alle Buttons sperren, onComplete()
   * - Falsch: Button rot + gesperrt, Fehlermeldung anzeigen, weiter probieren
   *
   * @param {Object} exercise - { type, question, options, correct, explanation }
   * @param {HTMLElement} container - DOM-Element in das gerendert wird
   * @param {Function} onComplete - Callback wenn richtige Antwort gewaehlt
   */
  renderMultipleChoice(exercise, container, onComplete) {
    // Wrapper-Div fuer die gesamte MC-Uebung
    const wrapper = document.createElement('div');
    wrapper.className = 'exercise-mc';

    // Frage anzeigen
    const questionEl = document.createElement('p');
    questionEl.className = 'exercise-question';
    questionEl.innerHTML = exercise.question;
    wrapper.appendChild(questionEl);

    // Container fuer die Antwort-Buttons
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'mc-options';

    // Feedback-Bereich (anfangs versteckt)
    const feedbackEl = document.createElement('div');
    feedbackEl.className = 'exercise-feedback';
    feedbackEl.style.display = 'none';

    // Antworten mischen (Fisher-Yates). Ohne das steht die richtige Antwort
    // immer an derselben Stelle - man kann sich die Position merken oder das
    // Muster erraten, statt den Inhalt zu lesen. Beim zweiten Durchgang ist
    // die Reihenfolge dann auch wieder eine andere.
    const order = exercise.options.map(function(_, i) { return i; });
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = order[i]; order[i] = order[j]; order[j] = tmp;
    }
    const shuffled = order.map(function(i) { return exercise.options[i]; });
    // Wo ist die richtige Antwort nach dem Mischen gelandet?
    const correctIndex = order.indexOf(exercise.correct);

    // Fuer jeden Antwort-Button einen Event-Listener anlegen
    shuffled.forEach(function(optionText, index) {
      const button = document.createElement('button');
      button.className = 'mc-option';
      button.setAttribute('data-index', index);
      button.innerHTML = optionText;

      button.addEventListener('click', function() {
        if (index === correctIndex) {
          // Richtige Antwort: Button gruen markieren
          button.classList.add('correct');

          // Feedback mit Erklaerung anzeigen
          feedbackEl.innerHTML = exercise.explanation;
          feedbackEl.className = 'exercise-feedback correct';
          feedbackEl.style.display = 'block';

          // Alle Buttons deaktivieren
          const allButtons = optionsContainer.querySelectorAll('.mc-option');
          allButtons.forEach(function(btn) {
            btn.disabled = true;
          });

          // Uebung als abgeschlossen melden
          onComplete();
        } else {
          // Falsche Antwort: Button rot markieren und sperren
          button.classList.add('incorrect');
          button.disabled = true;

          // Fehlermeldung anzeigen
          feedbackEl.textContent = 'Leider falsch. Versuch es nochmal!';
          feedbackEl.className = 'exercise-feedback incorrect';
          feedbackEl.style.display = 'block';
        }
      });

      optionsContainer.appendChild(button);
    });

    wrapper.appendChild(optionsContainer);
    wrapper.appendChild(feedbackEl);
    container.appendChild(wrapper);
  },

  /**
   * Rendert eine Zuordnungs-Uebung (links Begriff, rechts Erklaerung).
   * Klick links, dann Klick rechts verbindet ein Paar. Farbcodiert.
   *
   * @param {Object} exercise - { type, question, pairs: [{left, right}] }
   * @param {HTMLElement} container - DOM-Element in das gerendert wird
   * @param {Function} onComplete - Callback wenn alle Paare korrekt
   */
  renderMatching(exercise, container, onComplete) {
    // Farben fuer die Paar-Verbindungen
    var pairColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    // Wrapper-Div fuer die gesamte Zuordnungs-Uebung
    var wrapper = document.createElement('div');
    wrapper.className = 'exercise-matching';

    // Frage anzeigen
    var questionEl = document.createElement('p');
    questionEl.className = 'exercise-question';
    questionEl.innerHTML = exercise.question;
    wrapper.appendChild(questionEl);

    // Zuordnungsbereich (Grid: links | rechts)
    var matchingArea = document.createElement('div');
    matchingArea.className = 'matching-area';

    // Linke Spalte: Items in Originalreihenfolge
    var leftCol = document.createElement('div');
    leftCol.className = 'matching-left';

    // Rechte Spalte: Items in zufaelliger Reihenfolge
    var rightCol = document.createElement('div');
    rightCol.className = 'matching-right';

    // Rechte Items mischen (Fisher-Yates Shuffle)
    // Wir brauchen die Original-Indizes, um spaeter pruefen zu koennen
    var rightIndices = [];
    for (var i = 0; i < exercise.pairs.length; i++) {
      rightIndices.push(i);
    }
    for (var j = rightIndices.length - 1; j > 0; j--) {
      var rand = Math.floor(Math.random() * (j + 1));
      var temp = rightIndices[j];
      rightIndices[j] = rightIndices[rand];
      rightIndices[rand] = temp;
    }

    // State: welches linke Item ist gerade ausgewaehlt?
    var selectedLeft = null;

    // State: Verbindungen speichern – connections[leftIndex] = rightOriginalIndex
    var connections = {};
    // Umgekehrt: reverseConnections[rightOriginalIndex] = leftIndex
    var reverseConnections = {};
    // Naechste Farbnummer fuer neue Verbindung
    var nextColorIndex = 0;
    // Farbe pro Verbindung: connectionColors[leftIndex] = Farbe
    var connectionColors = {};

    // DOM-Referenzen speichern
    var leftItems = [];
    var rightItems = {}; // rightItems[originalIndex] = DOM-Element

    // Linke Items erstellen
    exercise.pairs.forEach(function(pair, idx) {
      var item = document.createElement('div');
      item.className = 'match-item match-left';
      item.setAttribute('data-index', idx);
      item.textContent = pair.left;

      item.addEventListener('click', function() {
        // Fall 1: Item ist bereits verbunden → Verbindung loesen
        if (connections[idx] !== undefined) {
          var connectedRight = connections[idx];
          // Farben/Styling zuruecksetzen
          item.classList.remove('matched');
          item.style.backgroundColor = '';
          item.style.borderColor = '';
          item.style.color = '';

          var rightEl = rightItems[connectedRight];
          rightEl.classList.remove('matched');
          rightEl.style.backgroundColor = '';
          rightEl.style.borderColor = '';
          rightEl.style.color = '';

          // Verbindung aus State entfernen
          delete reverseConnections[connectedRight];
          delete connectionColors[idx];
          delete connections[idx];

          // Selection zuruecksetzen
          if (selectedLeft !== null) {
            leftItems[selectedLeft].classList.remove('selected');
          }
          selectedLeft = null;
          return;
        }

        // Fall 2: Bereits ein anderes linkes Item ausgewaehlt → Auswahl wechseln
        if (selectedLeft !== null) {
          leftItems[selectedLeft].classList.remove('selected');
        }

        // Fall 3: Dieses linke Item auswaehlen
        selectedLeft = idx;
        item.classList.add('selected');
      });

      leftItems.push(item);
      leftCol.appendChild(item);
    });

    // Rechte Items erstellen (in gemischter Reihenfolge)
    rightIndices.forEach(function(originalIdx) {
      var pair = exercise.pairs[originalIdx];
      var item = document.createElement('div');
      item.className = 'match-item match-right';
      item.setAttribute('data-index', originalIdx);
      item.textContent = pair.right;

      item.addEventListener('click', function() {
        // Fall 1: Item ist bereits verbunden → Verbindung loesen
        if (reverseConnections[originalIdx] !== undefined) {
          var connectedLeft = reverseConnections[originalIdx];
          // Farben/Styling zuruecksetzen
          item.classList.remove('matched');
          item.style.backgroundColor = '';
          item.style.borderColor = '';
          item.style.color = '';

          var leftEl = leftItems[connectedLeft];
          leftEl.classList.remove('matched');
          leftEl.style.backgroundColor = '';
          leftEl.style.borderColor = '';
          leftEl.style.color = '';

          // Verbindung aus State entfernen
          delete connections[connectedLeft];
          delete connectionColors[connectedLeft];
          delete reverseConnections[originalIdx];

          // Selection zuruecksetzen
          if (selectedLeft !== null) {
            leftItems[selectedLeft].classList.remove('selected');
            selectedLeft = null;
          }
          return;
        }

        // Fall 2: Kein linkes Item ausgewaehlt → ignorieren
        if (selectedLeft === null) {
          return;
        }

        // Fall 3: Verbindung herstellen
        var leftIdx = selectedLeft;
        var color = pairColors[nextColorIndex % pairColors.length];
        nextColorIndex++;

        // Verbindung speichern
        connections[leftIdx] = originalIdx;
        reverseConnections[originalIdx] = leftIdx;
        connectionColors[leftIdx] = color;

        // Linkes Item stylen
        leftItems[leftIdx].classList.remove('selected');
        leftItems[leftIdx].classList.add('matched');
        leftItems[leftIdx].style.backgroundColor = color;
        leftItems[leftIdx].style.borderColor = color;
        leftItems[leftIdx].style.color = 'white';

        // Rechtes Item stylen
        item.classList.add('matched');
        item.style.backgroundColor = color;
        item.style.borderColor = color;
        item.style.color = 'white';

        // Selection zuruecksetzen
        selectedLeft = null;
      });

      rightItems[originalIdx] = item;
      rightCol.appendChild(item);
    });

    matchingArea.appendChild(leftCol);
    matchingArea.appendChild(rightCol);
    wrapper.appendChild(matchingArea);

    // Feedback-Bereich (anfangs versteckt)
    var feedbackEl = document.createElement('div');
    feedbackEl.className = 'exercise-feedback';
    feedbackEl.style.display = 'none';

    // "Pruefen"-Button
    var checkBtn = document.createElement('button');
    checkBtn.className = 'exercise-check-btn';
    checkBtn.textContent = 'Prüfen';

    checkBtn.addEventListener('click', function() {
      // Pruefen ob alle Paare zugeordnet sind
      var totalPairs = exercise.pairs.length;
      var connectedCount = Object.keys(connections).length;

      if (connectedCount < totalPairs) {
        feedbackEl.textContent = 'Bitte ordne zuerst alle Begriffe zu.';
        feedbackEl.className = 'exercise-feedback incorrect';
        feedbackEl.style.display = 'block';
        return;
      }

      // Pruefen ob alle Zuordnungen korrekt sind
      // Korrekt bedeutet: connections[i] === i (links[i] gehoert zu rechts[i])
      var allCorrect = true;
      for (var k = 0; k < totalPairs; k++) {
        if (connections[k] !== k) {
          allCorrect = false;
          break;
        }
      }

      if (allCorrect) {
        // Wenn die Uebung eine Erklaerung mitbringt, diese zeigen - Lob allein
        // sagt nicht, WARUM es stimmt. Sonst der Standardtext.
        feedbackEl.innerHTML = exercise.explanation || 'Alle Zuordnungen sind korrekt!';
        feedbackEl.className = 'exercise-feedback correct';
        feedbackEl.style.display = 'block';
        checkBtn.disabled = true;
        onComplete();
      } else {
        feedbackEl.textContent = 'Nicht alle Zuordnungen stimmen. Versuch es nochmal!';
        feedbackEl.className = 'exercise-feedback incorrect';
        feedbackEl.style.display = 'block';
      }
    });

    wrapper.appendChild(checkBtn);
    wrapper.appendChild(feedbackEl);
    container.appendChild(wrapper);
  }
};

/* ===================================================================
 * Zusaetzliche Uebungstypen fuer Biologie
 * =================================================================== */

/**
 * Lueckentext: Der Fragetext enthaelt ___ (drei Unterstriche) als Platzhalter.
 * Fuer jede Luecke wird ein Eingabefeld erzeugt.
 * Geprueft wird gross-/kleinschreibungsunabhaengig, Alternativen erlaubt.
 *
 * @param {Object} exercise - { question, text, blanks: [{correct, alternatives}] }
 */
Exercises.renderFillInBlank = function(exercise, container, onComplete) {
  var wrapper = document.createElement('div');
  wrapper.className = 'exercise-fill-in-blank';

  var questionEl = document.createElement('p');
  questionEl.className = 'exercise-question';
  questionEl.innerHTML = exercise.question;
  wrapper.appendChild(questionEl);

  // Text an den Platzhaltern aufteilen und Eingabefelder dazwischensetzen
  var textEl = document.createElement('p');
  textEl.className = 'blank-text';
  var parts = exercise.text.split('___');
  var inputs = [];

  parts.forEach(function(part, i) {
    var span = document.createElement('span');
    span.innerHTML = part;
    textEl.appendChild(span);

    // Nach jedem Teil ausser dem letzten kommt eine Luecke
    if (i < parts.length - 1) {
      var input = document.createElement('input');
      input.type = 'text';
      input.className = 'blank-input';
      input.setAttribute('autocapitalize', 'off');
      input.setAttribute('autocorrect', 'off');
      inputs.push(input);
      textEl.appendChild(input);
    }
  });
  wrapper.appendChild(textEl);

  var feedbackEl = document.createElement('div');
  feedbackEl.className = 'exercise-feedback';
  feedbackEl.style.display = 'none';

  var checkBtn = document.createElement('button');
  checkBtn.className = 'check-button';
  checkBtn.textContent = 'Prüfen';

  checkBtn.addEventListener('click', function() {
    var allCorrect = true;

    inputs.forEach(function(input, i) {
      var blank = exercise.blanks[i];
      var given = input.value.trim().toLowerCase();

      // Richtige Antwort plus erlaubte Schreibweisen sammeln
      var accepted = [blank.correct].concat(blank.alternatives || []);
      var isCorrect = accepted.some(function(a) {
        return a.trim().toLowerCase() === given;
      });

      input.classList.remove('correct', 'incorrect');
      input.classList.add(isCorrect ? 'correct' : 'incorrect');
      if (!isCorrect) allCorrect = false;
    });

    if (allCorrect) {
      feedbackEl.innerHTML = exercise.explanation || 'Alles richtig!';
      feedbackEl.className = 'exercise-feedback correct';
      inputs.forEach(function(i) { i.disabled = true; });
      checkBtn.disabled = true;
      onComplete();
    } else {
      feedbackEl.textContent = 'Noch nicht ganz. Die roten Felder stimmen nicht.';
      feedbackEl.className = 'exercise-feedback incorrect';
    }
    feedbackEl.style.display = 'block';
  });

  wrapper.appendChild(checkBtn);
  wrapper.appendChild(feedbackEl);
  container.appendChild(wrapper);
};

/**
 * Reihenfolge-Uebung: Elemente in die richtige Ordnung bringen.
 * Bewusst KEIN Drag-and-Drop, sondern Hoch/Runter-Buttons - das funktioniert
 * auf dem Tablet zuverlaessig, Drag-and-Drop dagegen oft nicht.
 *
 * @param {Object} exercise - { question, items: [], correctOrder: [] }
 */
Exercises.renderOrdering = function(exercise, container, onComplete) {
  var wrapper = document.createElement('div');
  wrapper.className = 'exercise-ordering';

  var questionEl = document.createElement('p');
  questionEl.className = 'exercise-question';
  questionEl.innerHTML = exercise.question;
  wrapper.appendChild(questionEl);

  // Aktuelle Reihenfolge als Index-Liste auf die Original-items
  var order = exercise.items.map(function(_, i) { return i; });

  var list = document.createElement('ol');
  list.className = 'ordering-list';

  var feedbackEl = document.createElement('div');
  feedbackEl.className = 'exercise-feedback';
  feedbackEl.style.display = 'none';

  function draw() {
    list.innerHTML = '';
    order.forEach(function(itemIndex, pos) {
      var li = document.createElement('li');
      li.className = 'ordering-item';

      var label = document.createElement('span');
      label.className = 'ordering-label';
      label.innerHTML = exercise.items[itemIndex];
      li.appendChild(label);

      var controls = document.createElement('span');
      controls.className = 'ordering-controls';

      var up = document.createElement('button');
      up.className = 'ordering-btn';
      up.innerHTML = '&uarr;';
      up.disabled = (pos === 0);
      up.addEventListener('click', function() {
        var tmp = order[pos - 1];
        order[pos - 1] = order[pos];
        order[pos] = tmp;
        draw();
      });

      var down = document.createElement('button');
      down.className = 'ordering-btn';
      down.innerHTML = '&darr;';
      down.disabled = (pos === order.length - 1);
      down.addEventListener('click', function() {
        var tmp = order[pos + 1];
        order[pos + 1] = order[pos];
        order[pos] = tmp;
        draw();
      });

      controls.appendChild(up);
      controls.appendChild(down);
      li.appendChild(controls);
      list.appendChild(li);
    });
  }
  draw();
  wrapper.appendChild(list);

  var checkBtn = document.createElement('button');
  checkBtn.className = 'check-button';
  checkBtn.textContent = 'Prüfen';
  checkBtn.addEventListener('click', function() {
    var correct = order.every(function(itemIndex, pos) {
      return itemIndex === exercise.correctOrder[pos];
    });

    if (correct) {
      feedbackEl.innerHTML = exercise.explanation || 'Richtige Reihenfolge!';
      feedbackEl.className = 'exercise-feedback correct';
      list.querySelectorAll('.ordering-btn').forEach(function(b) { b.disabled = true; });
      checkBtn.disabled = true;
      onComplete();
    } else {
      feedbackEl.textContent = 'Die Reihenfolge stimmt noch nicht. Denk an den Ablauf.';
      feedbackEl.className = 'exercise-feedback incorrect';
    }
    feedbackEl.style.display = 'block';
  });

  wrapper.appendChild(checkBtn);
  wrapper.appendChild(feedbackEl);
  container.appendChild(wrapper);
};

/**
 * Beschriftungs-Uebung: Eine SVG-Grafik hat nummerierte Punkte, die mit
 * Begriffen beschriftet werden muessen. Erst Begriff waehlen, dann Punkt klicken.
 *
 * @param {Object} exercise - { question, svg, spots: [{id, x, y, correct}], terms: [] }
 */
Exercises.renderLabeling = function(exercise, container, onComplete) {
  var wrapper = document.createElement('div');
  wrapper.className = 'exercise-labeling';

  var questionEl = document.createElement('p');
  questionEl.className = 'exercise-question';
  questionEl.innerHTML = exercise.question;
  wrapper.appendChild(questionEl);

  var selectedTerm = null;
  var assigned = {};   // spotId -> Begriff
  var solvedCount = 0;

  // Begriffs-Buttons zum Auswaehlen
  var termBar = document.createElement('div');
  termBar.className = 'labeling-terms';
  exercise.terms.forEach(function(term) {
    var btn = document.createElement('button');
    btn.className = 'labeling-term';
    btn.textContent = term;
    btn.addEventListener('click', function() {
      if (btn.disabled) return;
      termBar.querySelectorAll('.labeling-term').forEach(function(b) {
        b.classList.remove('selected');
      });
      btn.classList.add('selected');
      selectedTerm = { text: term, button: btn };
    });
    termBar.appendChild(btn);
  });
  wrapper.appendChild(termBar);

  // Grafik mit klickbaren Punkten
  var figure = document.createElement('div');
  figure.className = 'labeling-figure';
  figure.innerHTML = exercise.svg;

  var feedbackEl = document.createElement('div');
  feedbackEl.className = 'exercise-feedback';
  feedbackEl.style.display = 'none';

  var svgEl = figure.querySelector('svg');
  exercise.spots.forEach(function(spot) {
    var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'labeling-spot');
    g.setAttribute('transform', 'translate(' + spot.x + ',' + spot.y + ')');

    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('r', '16');   // 32px Durchmesser - gut treffbar per Finger
    circle.setAttribute('class', 'spot-circle');

    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('class', 'spot-text');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dy', '5');
    text.textContent = '?';

    g.appendChild(circle);
    g.appendChild(text);

    g.addEventListener('click', function() {
      if (assigned[spot.id]) return;          // schon geloest
      if (!selectedTerm) {
        feedbackEl.textContent = 'Wähle zuerst oben einen Begriff aus.';
        feedbackEl.className = 'exercise-feedback incorrect';
        feedbackEl.style.display = 'block';
        return;
      }

      if (selectedTerm.text === spot.correct) {
        assigned[spot.id] = selectedTerm.text;
        solvedCount++;
        g.classList.add('correct');
        text.textContent = selectedTerm.text;
        text.setAttribute('class', 'spot-text solved');
        circle.setAttribute('r', '0');        // Kreis weg, nur noch Beschriftung
        selectedTerm.button.disabled = true;
        selectedTerm.button.classList.remove('selected');
        selectedTerm = null;

        if (solvedCount === exercise.spots.length) {
          feedbackEl.innerHTML = exercise.explanation || 'Alle Teile richtig benannt!';
          feedbackEl.className = 'exercise-feedback correct';
          feedbackEl.style.display = 'block';
          onComplete();
        } else {
          feedbackEl.textContent = 'Richtig! Noch ' +
            (exercise.spots.length - solvedCount) + ' zu beschriften.';
          feedbackEl.className = 'exercise-feedback correct';
          feedbackEl.style.display = 'block';
        }
      } else {
        g.classList.add('shake');
        setTimeout(function() { g.classList.remove('shake'); }, 400);
        feedbackEl.textContent = 'Das gehört woanders hin. Versuch einen anderen Punkt.';
        feedbackEl.className = 'exercise-feedback incorrect';
        feedbackEl.style.display = 'block';
      }
    });

    svgEl.appendChild(g);
  });

  wrapper.appendChild(figure);
  wrapper.appendChild(feedbackEl);
  container.appendChild(wrapper);
};
