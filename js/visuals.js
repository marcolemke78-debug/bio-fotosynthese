/**
 * Visualisierungen fuer das Bio-Lernprogramm.
 * Alles als SVG, damit es auf jedem Geraet scharf bleibt und offline laeuft.
 */

const Visuals = {};

/**
 * Hilfsfunktion: Container mit Bildunterschrift anlegen.
 */
function makeFigure(container, label) {
  const fig = document.createElement('figure');
  fig.className = 'visual-figure';
  container.appendChild(fig);

  if (label) {
    const cap = document.createElement('figcaption');
    cap.className = 'visual-caption';
    cap.innerHTML = label;
    fig.appendChild(cap);
  }
  return fig;
}

/* ===================================================================
 * 1. Wortgleichung
 * =================================================================== */

/**
 * Stellt eine Reaktionsgleichung als Kaertchen mit Pfeil dar.
 * Beispiel: CO2 + Wasser --Licht--> Glucose + Sauerstoff
 *
 * @param {Object} cfg - { left: [], right: [], over, label }
 */
Visuals.renderEquation = function(cfg, container) {
  const fig = makeFigure(container, cfg.label);

  const box = document.createElement('div');
  box.className = 'equation-box';

  function side(items, cls) {
    const wrap = document.createElement('div');
    wrap.className = 'equation-side ' + cls;

    items.forEach(function(item, i) {
      if (i > 0) {
        const plus = document.createElement('span');
        plus.className = 'equation-plus';
        plus.textContent = '+';
        wrap.appendChild(plus);
      }
      const card = document.createElement('span');
      card.className = 'equation-card';
      // item.color faerbt das Kaertchen passend zum Stoff ein
      if (item.color) card.style.borderColor = item.color;
      card.innerHTML = '<span class="equation-icon">' + (item.icon || '') + '</span>'
                     + '<span class="equation-name">' + item.name + '</span>';
      wrap.appendChild(card);
    });
    return wrap;
  }

  box.appendChild(side(cfg.left, 'left'));

  // Pfeil in der Mitte, darueber steht die Bedingung (z.B. "Licht")
  const arrow = document.createElement('div');
  arrow.className = 'equation-arrow';
  arrow.innerHTML = '<span class="arrow-over">' + (cfg.over || '') + '</span>'
                  + '<span class="arrow-line">&rarr;</span>';
  box.appendChild(arrow);

  box.appendChild(side(cfg.right, 'right'));
  fig.appendChild(box);
};

/* ===================================================================
 * 2. Beschriftete Grafik
 * =================================================================== */

/**
 * Zeigt eine SVG-Grafik mit anklickbaren Bereichen. Klick auf einen Bereich
 * blendet die zugehoerige Erklaerung unter der Grafik ein.
 *
 * @param {Object} cfg - { svg, parts: [{id, name, text}], label }
 */
Visuals.renderLabeledSvg = function(cfg, container) {
  const fig = makeFigure(container, cfg.label);

  const holder = document.createElement('div');
  holder.className = 'labeled-svg-holder';
  holder.innerHTML = cfg.svg;
  fig.appendChild(holder);

  // Infofeld unter der Grafik
  const info = document.createElement('div');
  info.className = 'labeled-svg-info';
  info.innerHTML = '<em>Tippe auf einen Teil der Grafik.</em>';
  fig.appendChild(info);

  (cfg.parts || []).forEach(function(part) {
    // Im SVG muss ein Element mit dieser id existieren
    const el = holder.querySelector('#' + part.id);
    if (!el) return;

    el.classList.add('clickable-part');
    el.addEventListener('click', function() {
      holder.querySelectorAll('.clickable-part').forEach(function(p) {
        p.classList.remove('active');
      });
      el.classList.add('active');
      info.innerHTML = '<strong>' + part.name + '</strong><br>' + part.text;
    });
  });
};

/* ===================================================================
 * 3. Faktoren-Simulation
 * =================================================================== */

/**
 * Drei Regler (Licht, CO2, Wasser) steuern die Fotosyntheserate.
 * Kernidee: Es zaehlt IMMER der kleinste Wert - das ist das Minimumgesetz.
 * Genau dieser Aha-Effekt laesst sich mit Text schlecht erzeugen.
 */
Visuals.renderFactorSim = function(cfg, container) {
  const fig = makeFigure(container, cfg.label);

  const factors = [
    { key: 'licht',  name: 'Licht',           color: '#f59e0b', value: 60 },
    { key: 'co2',    name: 'Kohlenstoffdioxid', color: '#6b7280', value: 60 },
    { key: 'wasser', name: 'Wasser',          color: '#3b82f6', value: 60 }
  ];

  const panel = document.createElement('div');
  panel.className = 'factor-sim';

  const controls = document.createElement('div');
  controls.className = 'factor-controls';

  // Anzeige der resultierenden Rate
  const output = document.createElement('div');
  output.className = 'factor-output';
  const barOuter = document.createElement('div');
  barOuter.className = 'factor-bar-outer';
  const barInner = document.createElement('div');
  barInner.className = 'factor-bar-inner';
  barOuter.appendChild(barInner);
  const rateLabel = document.createElement('div');
  rateLabel.className = 'factor-rate-label';
  const limitLabel = document.createElement('div');
  limitLabel.className = 'factor-limit-label';

  output.appendChild(document.createElement('strong')).textContent = 'Fotosyntheserate';
  output.appendChild(barOuter);
  output.appendChild(rateLabel);
  output.appendChild(limitLabel);

  function update() {
    // Minimumgesetz: der kleinste Faktor begrenzt das Ergebnis
    let min = factors[0];
    factors.forEach(function(f) {
      if (f.value < min.value) min = f;
    });

    barInner.style.width = min.value + '%';
    barInner.style.background = min.color;
    rateLabel.textContent = min.value + ' %';

    // Es koennen mehrere Faktoren gleich niedrig sein - dann bremsen sie
    // gemeinsam, und es waere falsch, nur einen davon zu nennen.
    const tied = factors.filter(function(f) { return f.value === min.value; });
    if (tied.length === factors.length) {
      limitLabel.textContent = 'Alle Faktoren sind gleich hoch.';
    } else if (tied.length > 1) {
      const namen = tied.map(function(f) { return f.name; }).join(' und ');
      limitLabel.innerHTML = 'Es bremsen: <strong>' + namen + '</strong>';
    } else {
      limitLabel.innerHTML = 'Es bremst: <strong>' + min.name + '</strong>';
    }
  }

  factors.forEach(function(f) {
    const row = document.createElement('div');
    row.className = 'factor-row';

    const label = document.createElement('label');
    label.textContent = f.name;
    label.style.color = f.color;

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '100';
    slider.value = String(f.value);
    slider.className = 'factor-slider';
    slider.style.accentColor = f.color;

    const val = document.createElement('span');
    val.className = 'factor-value';
    val.textContent = f.value + ' %';

    slider.addEventListener('input', function() {
      f.value = parseInt(slider.value, 10);
      val.textContent = f.value + ' %';
      update();
    });

    row.appendChild(label);
    row.appendChild(slider);
    row.appendChild(val);
    controls.appendChild(row);
  });

  panel.appendChild(controls);
  panel.appendChild(output);
  fig.appendChild(panel);
  update();
};

/* ===================================================================
 * 4. Kreislauf Fotosynthese / Zellatmung
 * =================================================================== */

/**
 * Zeigt beide Vorgaenge als Kreislauf. Ein Knopf startet die Animation:
 * Sauerstoff wandert von der Pflanze zum Tier, CO2 wieder zurueck.
 */
Visuals.renderCycleAnim = function(cfg, container) {
  const fig = makeFigure(container, cfg.label);

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 520 300');
  svg.setAttribute('class', 'cycle-svg');

  svg.innerHTML = [
    // Pfeilspitzen - ohne sie sieht man die Fliessrichtung nicht.
    // markerUnits verhindert, dass die Spitze mit der Linienbreite mitwaechst.
    '<defs>',
    '  <marker id="cycleGruen" markerWidth="10" markerHeight="10" refX="8" refY="5"',
    '          orient="auto" markerUnits="userSpaceOnUse">',
    '    <path d="M 0 0 L 10 5 L 0 10 z" fill="#16a34a"/>',
    '  </marker>',
    '  <marker id="cycleRot" markerWidth="10" markerHeight="10" refX="8" refY="5"',
    '          orient="auto" markerUnits="userSpaceOnUse">',
    '    <path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626"/>',
    '  </marker>',
    '</defs>',
    // Pflanze links
    '<g>',
    '  <rect x="20" y="90" width="150" height="130" rx="12" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/>',
    '  <text x="95" y="120" text-anchor="middle" class="cycle-title">Pflanze</text>',
    '  <text x="95" y="145" text-anchor="middle" class="cycle-sub">Fotosynthese</text>',
    '  <text x="95" y="175" text-anchor="middle" class="cycle-small">CO&#8322; + Wasser</text>',
    '  <text x="95" y="196" text-anchor="middle" class="cycle-small">wird zu Zucker</text>',
    '</g>',
    // Tier rechts
    '<g>',
    '  <rect x="350" y="90" width="150" height="130" rx="12" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/>',
    '  <text x="425" y="120" text-anchor="middle" class="cycle-title">Tier / Mensch</text>',
    '  <text x="425" y="145" text-anchor="middle" class="cycle-sub">Zellatmung</text>',
    '  <text x="425" y="175" text-anchor="middle" class="cycle-small">Zucker + O&#8322;</text>',
    '  <text x="425" y="196" text-anchor="middle" class="cycle-small">wird zu Energie</text>',
    '</g>',
    // Pfeil oben: Sauerstoff von der Pflanze zum Tier
    '<path d="M 175 120 Q 260 55 345 120" fill="none" stroke="#16a34a" stroke-width="3"',
    '      marker-end="url(#cycleGruen)"/>',
    '<text x="260" y="52" text-anchor="middle" class="cycle-label" fill="#16a34a">Sauerstoff &#8594;</text>',
    // Pfeil unten: CO2 zurueck zur Pflanze
    '<path d="M 345 195 Q 260 260 175 195" fill="none" stroke="#dc2626" stroke-width="3"',
    '      marker-end="url(#cycleRot)"/>',
    '<text x="260" y="285" text-anchor="middle" class="cycle-label" fill="#dc2626">&#8592; Kohlenstoffdioxid</text>'
  ].join('\n');

  // Zwei wandernde Kugeln, eine pro Richtung
  const o2 = document.createElementNS(svgNS, 'circle');
  o2.setAttribute('r', '9');
  o2.setAttribute('fill', '#16a34a');
  o2.setAttribute('opacity', '0');
  svg.appendChild(o2);

  const co2 = document.createElementNS(svgNS, 'circle');
  co2.setAttribute('r', '9');
  co2.setAttribute('fill', '#dc2626');
  co2.setAttribute('opacity', '0');
  svg.appendChild(co2);

  fig.appendChild(svg);

  const btn = document.createElement('button');
  btn.className = 'cycle-button';
  btn.textContent = 'Kreislauf starten';
  fig.appendChild(btn);

  let running = false;

  // Punkt auf einer quadratischen Bezierkurve zum Zeitpunkt t (0..1)
  function bezier(t, p0, p1, p2) {
    const u = 1 - t;
    return {
      x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
      y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y
    };
  }

  const pathO2  = [{ x: 175, y: 120 }, { x: 260, y: 55 },  { x: 345, y: 120 }];
  const pathCO2 = [{ x: 345, y: 195 }, { x: 260, y: 260 }, { x: 175, y: 195 }];

  btn.addEventListener('click', function() {
    if (running) return;
    running = true;
    btn.disabled = true;

    const duration = 2600;
    const start = performance.now();
    o2.setAttribute('opacity', '1');
    co2.setAttribute('opacity', '1');

    function step(now) {
      let t = (now - start) / duration;
      if (t > 1) t = 1;

      const a = bezier(t, pathO2[0], pathO2[1], pathO2[2]);
      o2.setAttribute('cx', a.x);
      o2.setAttribute('cy', a.y);

      const b = bezier(t, pathCO2[0], pathCO2[1], pathCO2[2]);
      co2.setAttribute('cx', b.x);
      co2.setAttribute('cy', b.y);

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        o2.setAttribute('opacity', '0');
        co2.setAttribute('opacity', '0');
        running = false;
        btn.disabled = false;
      }
    }
    requestAnimationFrame(step);
  });
};
