/**
 * Lektionsinhalte: Fotosynthese & Zellatmung
 * Klasse 8, M-Niveau. Alle Grafiken selbst gezeichnet.
 */

// Schematische Pflanzenzelle. Bewusst einfach gehalten - es geht um die
// zwei "Maschinen" Chloroplast und Mitochondrium, nicht um Vollstaendigkeit.
const SVG_PFLANZENZELLE = `
<svg viewBox="0 0 460 320" class="bio-svg">
  <!-- Zellwand außen -->
  <rect id="zellwand" x="12" y="12" width="436" height="296" rx="18"
        fill="#f0fdf4" stroke="#65a30d" stroke-width="10"/>
  <!-- Zellmembran direkt darunter -->
  <rect id="zellmembran" x="26" y="26" width="408" height="268" rx="12"
        fill="#fefce8" stroke="#f59e0b" stroke-width="4"/>

  <!-- Vakuole: nimmt viel Platz ein -->
  <ellipse id="vakuole" cx="300" cy="165" rx="105" ry="88"
           fill="#ede9fe" stroke="#7c3aed" stroke-width="3"/>
  <text x="300" y="170" text-anchor="middle" class="bio-label">Vakuole</text>

  <!-- Zellkern -->
  <circle id="zellkern" cx="115" cy="105" r="42" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/>
  <circle cx="115" cy="105" r="14" fill="#93c5fd"/>
  <text x="115" y="163" text-anchor="middle" class="bio-label">Zellkern</text>

  <!-- Chloroplasten: gruen, mit Innenstruktur -->
  <g id="chloroplast">
    <ellipse cx="105" cy="228" rx="46" ry="27" fill="#86efac" stroke="#15803d" stroke-width="3"/>
    <line x1="80" y1="218" x2="130" y2="218" stroke="#15803d" stroke-width="3"/>
    <line x1="80" y1="228" x2="130" y2="228" stroke="#15803d" stroke-width="3"/>
    <line x1="80" y1="238" x2="130" y2="238" stroke="#15803d" stroke-width="3"/>
  </g>
  <text x="105" y="272" text-anchor="middle" class="bio-label">Chloroplast</text>

  <!-- Mitochondrium: rot, mit gefalteter Innenmembran -->
  <g id="mitochondrium">
    <ellipse cx="215" cy="65" rx="40" ry="22" fill="#fecaca" stroke="#b91c1c" stroke-width="3"/>
    <path d="M 185 65 q 10 -12 20 0 q 10 12 20 0 q 10 -12 20 0"
          fill="none" stroke="#b91c1c" stroke-width="2.5"/>
  </g>
  <text x="215" y="34" text-anchor="middle" class="bio-label">Mitochondrium</text>
</svg>`;

// Blatt im Querschnitt. Von oben nach unten: Wachsschicht, obere Haut,
// Palisadengewebe (viele Chloroplasten), Schwammgewebe (viel Luft dazwischen),
// untere Haut mit einer Spaltoeffnung.
const SVG_BLATTQUERSCHNITT = `
<svg viewBox="0 0 560 300" class="bio-svg">
  <!-- Wachsschicht ganz oben -->
  <rect id="wachs" x="20" y="20" width="520" height="12" fill="#fde68a" stroke="#d97706" stroke-width="2"/>

  <!-- Obere Haut (Epidermis) -->
  <g id="epidermis-oben">
    <rect x="20" y="32" width="520" height="30" fill="#ecfccb" stroke="#65a30d" stroke-width="2"/>
    <line x1="105" y1="32" x2="105" y2="62" stroke="#65a30d" stroke-width="1.5"/>
    <line x1="190" y1="32" x2="190" y2="62" stroke="#65a30d" stroke-width="1.5"/>
    <line x1="275" y1="32" x2="275" y2="62" stroke="#65a30d" stroke-width="1.5"/>
    <line x1="360" y1="32" x2="360" y2="62" stroke="#65a30d" stroke-width="1.5"/>
    <line x1="445" y1="32" x2="445" y2="62" stroke="#65a30d" stroke-width="1.5"/>
  </g>

  <!-- Palisadengewebe: laengliche Zellen dicht an dicht, voller Chloroplasten -->
  <g id="palisaden">
    <rect x="20" y="62" width="520" height="88" fill="#f7fee7" stroke="#65a30d" stroke-width="2"/>
    <g fill="#bbf7d0" stroke="#15803d" stroke-width="2">
      <rect x="32"  y="70" width="46" height="72" rx="6"/>
      <rect x="88"  y="70" width="46" height="72" rx="6"/>
      <rect x="144" y="70" width="46" height="72" rx="6"/>
      <rect x="200" y="70" width="46" height="72" rx="6"/>
      <rect x="256" y="70" width="46" height="72" rx="6"/>
      <rect x="312" y="70" width="46" height="72" rx="6"/>
      <rect x="368" y="70" width="46" height="72" rx="6"/>
      <rect x="424" y="70" width="46" height="72" rx="6"/>
      <rect x="480" y="70" width="46" height="72" rx="6"/>
    </g>
    <!-- Chloroplasten als kleine gruene Ovale -->
    <g fill="#16a34a">
      <ellipse cx="45"  cy="88"  rx="7" ry="4"/><ellipse cx="65" cy="110" rx="7" ry="4"/>
      <ellipse cx="48"  cy="128" rx="7" ry="4"/>
      <ellipse cx="101" cy="88"  rx="7" ry="4"/><ellipse cx="121" cy="112" rx="7" ry="4"/>
      <ellipse cx="104" cy="130" rx="7" ry="4"/>
      <ellipse cx="157" cy="90"  rx="7" ry="4"/><ellipse cx="177" cy="108" rx="7" ry="4"/>
      <ellipse cx="160" cy="129" rx="7" ry="4"/>
      <ellipse cx="213" cy="87"  rx="7" ry="4"/><ellipse cx="233" cy="111" rx="7" ry="4"/>
      <ellipse cx="216" cy="131" rx="7" ry="4"/>
      <ellipse cx="269" cy="90"  rx="7" ry="4"/><ellipse cx="289" cy="109" rx="7" ry="4"/>
      <ellipse cx="272" cy="128" rx="7" ry="4"/>
      <ellipse cx="325" cy="88"  rx="7" ry="4"/><ellipse cx="345" cy="112" rx="7" ry="4"/>
      <ellipse cx="328" cy="130" rx="7" ry="4"/>
      <ellipse cx="381" cy="89"  rx="7" ry="4"/><ellipse cx="401" cy="110" rx="7" ry="4"/>
      <ellipse cx="384" cy="129" rx="7" ry="4"/>
      <ellipse cx="437" cy="87"  rx="7" ry="4"/><ellipse cx="457" cy="111" rx="7" ry="4"/>
      <ellipse cx="440" cy="130" rx="7" ry="4"/>
      <ellipse cx="493" cy="90"  rx="7" ry="4"/><ellipse cx="513" cy="109" rx="7" ry="4"/>
      <ellipse cx="496" cy="128" rx="7" ry="4"/>
    </g>
  </g>

  <!-- Schwammgewebe: runde Zellen mit Luftraeumen dazwischen -->
  <g id="schwamm">
    <rect x="20" y="150" width="520" height="88" fill="#f7fee7" stroke="#65a30d" stroke-width="2"/>
    <g fill="#d9f99d" stroke="#4d7c0f" stroke-width="2">
      <circle cx="60"  cy="178" r="21"/><circle cx="130" cy="172" r="18"/>
      <circle cx="196" cy="182" r="22"/><circle cx="268" cy="170" r="19"/>
      <circle cx="336" cy="181" r="21"/><circle cx="404" cy="172" r="18"/>
      <circle cx="470" cy="180" r="21"/>
      <circle cx="95"  cy="215" r="17"/><circle cx="165" cy="218" r="19"/>
      <circle cx="234" cy="214" r="17"/><circle cx="302" cy="217" r="19"/>
      <circle cx="370" cy="214" r="17"/><circle cx="438" cy="217" r="19"/>
      <circle cx="505" cy="213" r="16"/>
    </g>
    <g fill="#16a34a">
      <ellipse cx="60"  cy="178" rx="6" ry="3.5"/><ellipse cx="196" cy="182" rx="6" ry="3.5"/>
      <ellipse cx="336" cy="181" rx="6" ry="3.5"/><ellipse cx="470" cy="180" rx="6" ry="3.5"/>
    </g>
  </g>

  <!-- Untere Haut - in der Mitte bleibt Platz fuer die Spaltoeffnung -->
  <g id="epidermis-unten">
    <rect x="20" y="238" width="235" height="28" fill="#ecfccb" stroke="#65a30d" stroke-width="2"/>
    <rect x="305" y="238" width="235" height="28" fill="#ecfccb" stroke="#65a30d" stroke-width="2"/>
  </g>

  <!-- Spaltoeffnung: zwei bohnenfoermige Schließzellen, dazwischen der Spalt.
       Die Zellen fuellen die Luecke ganz aus, sonst sieht es aus wie ein Loch. -->
  <g id="spaltoeffnung">
    <!-- Zwei Schließzellen, die die Luecke in der Epidermis ausfuellen.
         Dazwischen bleibt der Spalt (Porus) offen. -->
    <ellipse cx="266" cy="252" rx="12" ry="14" fill="#86efac" stroke="#15803d" stroke-width="2.5"/>
    <ellipse cx="294" cy="252" rx="12" ry="14" fill="#86efac" stroke="#15803d" stroke-width="2.5"/>
    <!-- Der Spalt selbst - hier geht die Luft durch -->
    <rect x="278" y="240" width="4" height="24" fill="#ffffff"/>
  </g>

  <!-- Gastausch-Pfeile unter dem Blatt -->
  <g id="gasaustausch">
    <path d="M 296 292 L 296 270" stroke="#6b7280" stroke-width="2.5" marker-end="url(#pfeilGrau)"/>
    <text x="302" y="288" class="svg-mini" fill="#6b7280">CO&#8322; hinein</text>
    <path d="M 264 270 L 264 292" stroke="#16a34a" stroke-width="2.5" marker-end="url(#pfeilGruen)"/>
    <text x="258" y="288" text-anchor="end" class="svg-mini" fill="#16a34a">O&#8322; hinaus</text>
  </g>

  <defs>
    <!-- markerUnits=userSpaceOnUse, sonst skaliert die Spitze mit der
         Linienbreite mit und wird viel zu groß -->
    <marker id="pfeilGrau" markerWidth="9" markerHeight="9" refX="4.5" refY="8"
            orient="auto" markerUnits="userSpaceOnUse">
      <path d="M 0 9 L 4.5 0 L 9 9 z" fill="#6b7280"/>
    </marker>
    <marker id="pfeilGruen" markerWidth="9" markerHeight="9" refX="4.5" refY="8"
            orient="auto" markerUnits="userSpaceOnUse">
      <path d="M 0 0 L 4.5 9 L 9 0 z" fill="#16a34a"/>
    </marker>
  </defs>
</svg>`;

// Gleiche Zelle, aber ohne Beschriftungen - fuer die Uebung, in der die
// Teile selbst benannt werden. Sonst stuende die Loesung schon dran.
const SVG_PFLANZENZELLE_LEER = SVG_PFLANZENZELLE
  .replace(/<text[^>]*class="bio-label"[^>]*>[^<]*<\/text>/g, '');

const LessonsFoto = [

  /* =================================================================
   * Lektion 1
   * ================================================================= */
  {
    id: 1,
    title: 'Die Zelle als Fabrik',

    explanation: {
      html: `
        <h2>Die Zelle als Fabrik</h2>
        <p>Jedes Lebewesen besteht aus Zellen. Und in jeder Zelle wird gearbeitet
        &ndash; ungefähr so wie in einer Fabrik.</p>

        <div class="analogy-box">
          <strong>Analogie aus dem Alltag:</strong> Stell dir eine Fabrikhalle vor.
          Es gibt ein <em>Büro</em>, das alles steuert (der Zellkern). Es gibt ein
          <em>Lager</em> (die Vakuole). Es gibt eine <em>Mauer</em> drumherum
          (die Zellwand). Und es gibt zwei ganz besondere <em>Maschinen</em>:
          eine, die Energie <strong>einfängt und speichert</strong>, und eine,
          die sie <strong>wieder freisetzt</strong>.
          <br><br>
          Denk an einen Akku: Die eine Maschine <em>lädt</em> ihn auf, die andere
          <em>entlädt</em> ihn wieder und macht daraus Bewegung und Wärme.
          Genau um diese beiden geht es im ganzen Lernprogramm.
        </div>

        <h3>Die zwei wichtigen Maschinen</h3>
        <p>Die einzelnen Bauteile einer Zelle nennt man <strong>Zellorganellen</strong>
        &ndash; das sind sozusagen die Maschinen und Räume der Zellfabrik.</p>

        <table class="icon-table">
          <tr>
            <th>Zellorganell</th>
            <th>Vergleich Fabrik</th>
            <th>Was passiert dort?</th>
          </tr>
          <tr>
            <td><strong>Chloroplast</strong> (grün)</td>
            <td>Solaranlage</td>
            <td>Fängt Sonnenlicht ein und baut <strong>mit dieser Energie</strong>
                aus Kohlenstoffdioxid und Wasser Zucker. Das ist die
                <strong>Fotosynthese</strong>.</td>
          </tr>
          <tr>
            <td><strong>Mitochondrium</strong> (rot)</td>
            <td>Kraftwerk</td>
            <td>Verbrennt Zucker &ndash; langsam und ohne Flamme &ndash; und setzt dabei
                die gespeicherte Energie wieder frei. Das ist die
                <strong>Zellatmung</strong>.</td>
          </tr>
        </table>

        <div class="warning-box">
          <strong>Häufiger Fehler:</strong> Viele denken, Pflanzen hätten nur
          Chloroplasten und Tiere nur Mitochondrien. Falsch! Pflanzenzellen haben
          <strong>beides</strong>. Eine Pflanze macht nämlich nicht nur Zucker,
          sie muss ihn auch verbrauchen &ndash; auch nachts, wenn kein Licht da ist.
          Von den beiden Maschinen fehlt den Tieren nur der Chloroplast &ndash;
          dazu kommen aber noch Zellwand und Vakuole, die Tierzellen ebenfalls
          nicht haben.
        </div>

        <h3>Was Pflanzenzellen zusätzlich haben</h3>
        <p>Neben dem Chloroplasten haben Pflanzenzellen noch zwei Dinge, die
        tierischen Zellen fehlen:</p>
        <ul>
          <li><strong>Zellwand</strong> &ndash; eine feste Hülle außen herum. Sie gibt
          der Zelle ihre Form. Zusammen mit dem Wasserdruck von innen hält sie
          die Pflanze aufrecht &ndash; deshalb ist ein Blatt stabil und ein Stück
          Haut nicht.</li>
          <li><strong>Vakuole</strong> &ndash; ein großer Wasserspeicher. Ist sie
          prall gefüllt, steht die Pflanze aufrecht. Fehlt Wasser, wird sie
          schlaff &ndash; die Pflanze lässt die Blätter hängen.</li>
        </ul>

        <div class="why-context">
          <strong>Warum lernen wir das?</strong> Wenn du weißt, <em>wo</em> die
          Fotosynthese stattfindet, verstehst du auch, warum Blätter grün sind,
          warum eine Pflanze im Dunkeln eingeht und warum wir ohne Pflanzen keine
          Luft zum Atmen hätten. Alles Weitere baut auf dieser Lektion auf.
        </div>

        <div class="reading-guide">
          <strong>So liest du die Grafik unten:</strong>
          <ul>
            <li>Tippe auf ein Teil der Zelle &ndash; darunter erscheint die Erklärung.</li>
            <li>Grün = Chloroplast (Solaranlage), Rot = Mitochondrium (Kraftwerk).</li>
            <li>Die dicke grüne Linie außen ist die Zellwand.</li>
          </ul>
        </div>
      `,
      visuals: [
        {
          type: 'labeled-svg',
          label: 'Schematische Pflanzenzelle &ndash; tippe auf die Teile',
          svg: SVG_PFLANZENZELLE,
          parts: [
            { id: 'zellwand', name: 'Zellwand',
              text: 'Feste Hülle aus Zellulose. Gibt der Pflanze Halt. Tierische Zellen haben sie nicht.' },
            { id: 'zellmembran', name: 'Zellmembran',
              text: 'Dünne Haut direkt unter der Zellwand. Sie entscheidet, was in die Zelle hinein- und hinausdarf.' },
            { id: 'zellkern', name: 'Zellkern',
              text: 'Das Büro der Zelle. Hier liegt die Erbinformation, von hier wird alles gesteuert.' },
            { id: 'vakuole', name: 'Vakuole',
              text: 'Großer Speicher, gefüllt mit Zellsaft. Hält die Pflanze prall. Ist sie leer, hängen die Blätter.' },
            { id: 'chloroplast', name: 'Chloroplast',
              text: 'Die Solaranlage. Enthält den grünen Farbstoff Chlorophyll. Mit der Energie des Lichts baut sie aus Kohlenstoffdioxid und Wasser Zucker. NUR in Pflanzenzellen.' },
            { id: 'mitochondrium', name: 'Mitochondrium',
              text: 'Das Kraftwerk. Verbrennt Zucker zu Energie. In Pflanzen UND Tieren.' }
          ]
        }
      ]
    },

    example: {
      title: 'Warum lässt eine vergessene Zimmerpflanze die Blätter hängen?',
      steps: [
        {
          label: 'Schritt 1: Was fehlt der Pflanze?',
          html: `<p>Sie wurde eine Woche nicht gegossen &ndash; ihr fehlt
                 <strong>Wasser</strong>.</p>`
        },
        {
          label: 'Schritt 2: Welches Zellteil ist betroffen?',
          html: `<p>Das Wasser wird in der <strong>Vakuole</strong> gespeichert.
                 Ohne Nachschub leert sie sich.</p>`
        },
        {
          label: 'Schritt 3: Was passiert dadurch mit der Zelle?',
          html: `<p>Eine volle Vakuole drückt von innen gegen die Zellwand &ndash;
                 wie Luft in einem Fahrradreifen. Ist sie leer, fehlt der Druck.
                 Die Zelle wird schlaff.</p>`
        },
        {
          label: 'Schritt 4: Und die ganze Pflanze?',
          html: `<p>Wenn Millionen Zellen gleichzeitig schlaff werden, hängen die
                 Blätter herunter. Gießt man, füllen sich die Vakuolen wieder und
                 die Pflanze richtet sich innerhalb von Stunden wieder auf.</p>
                 <p><em>Merke: Der Druck aus der Vakuole ist das Skelett der Pflanze.</em></p>`
        }
      ]
    },

    exercises: [
      {
        type: 'multiple-choice',
        question: 'In welchem Zellteil findet die Fotosynthese statt?',
        options: ['Im Mitochondrium', 'Im Chloroplast', 'Im Zellkern', 'In der Vakuole'],
        correct: 1,
        explanation: 'Richtig! Der Chloroplast ist die Solaranlage der Zelle. Er enthält den grünen Farbstoff Chlorophyll, der das Sonnenlicht einfängt.'
      },
      {
        type: 'multiple-choice',
        question: 'Welche Aussage stimmt?',
        options: [
          'Nur Tierzellen haben Mitochondrien, Pflanzen brauchen keine.',
          'Nur Pflanzenzellen haben Mitochondrien, Tiere brauchen keine.',
          'Pflanzen- und Tierzellen haben beide Mitochondrien.',
          'Mitochondrien sitzen im Zellkern und steuern die Zelle.'
        ],
        correct: 2,
        explanation: 'Genau. Beide brauchen ein Kraftwerk, denn beide müssen Zucker in Energie umwandeln. Eine Pflanze tut das auch nachts, wenn keine Fotosynthese läuft.'
      },
      {
        type: 'matching',
        question: 'Ordne jedem Zellteil seine Aufgabe zu:',
        explanation: 'Richtig! Merke dir vor allem die beiden Maschinen: Der Chloroplast lädt den Akku (Zucker), das Mitochondrium entlädt ihn wieder.',
        pairs: [
          { left: 'Chloroplast', right: 'Baut mit der Energie des Lichts Zucker auf' },
          { left: 'Mitochondrium', right: 'Setzt die im Zucker gespeicherte Energie frei' },
          { left: 'Zellkern', right: 'Steuert die Zelle, enthält die Erbinformation' },
          { left: 'Vakuole', right: 'Speichert Wasser, hält die Pflanze prall' },
          { left: 'Zellwand', right: 'Feste Hülle, gibt Halt' }
        ]
      },
      {
        type: 'labeling',
        question: 'Beschrifte die Pflanzenzelle: Wähle oben einen Begriff und tippe dann auf die richtige Stelle.',
        svg: SVG_PFLANZENZELLE_LEER,
        terms: ['Chloroplast', 'Mitochondrium', 'Zellkern', 'Vakuole'],
        spots: [
          { id: 's1', x: 105, y: 228, correct: 'Chloroplast' },
          { id: 's2', x: 215, y: 65,  correct: 'Mitochondrium' },
          { id: 's3', x: 115, y: 105, correct: 'Zellkern' },
          { id: 's4', x: 300, y: 165, correct: 'Vakuole' }
        ],
        explanation: 'Alle vier richtig! Damit kennst du die Grundausstattung einer Pflanzenzelle.'
      }
    ]
  },

  /* =================================================================
   * Lektion 2
   * ================================================================= */
  {
    id: 2,
    title: 'Fotosynthese: rein und raus',

    explanation: {
      html: `
        <h2>Fotosynthese: rein und raus</h2>
        <p>In Lektion 1 hast du den Chloroplasten kennengelernt &ndash; die
        Solaranlage der Zelle. Jetzt schauen wir genau hin: Was geht dort
        hinein, und was kommt heraus?</p>

        <div class="analogy-box">
          <strong>Bleiben wir in der Fabrik:</strong> Jede Fabrik braucht drei
          Dinge. <em>Rohstoffe</em>, die verarbeitet werden. <em>Energie</em>,
          damit die Maschinen laufen. Und heraus kommt ein <em>Produkt</em> &ndash;
          plus etwas, das die Fabrik selbst nicht braucht.
          <br><br>
          Bei der Fotosynthese sind die Rohstoffe <strong>Kohlenstoffdioxid und
          Wasser</strong>, die Energie kommt vom <strong>Sonnenlicht</strong>,
          das Produkt ist <strong>Zucker</strong> &ndash; und das, was die Pflanze
          übrig hat, ist <strong>Sauerstoff</strong>. Für uns ist genau dieser
          Rest lebenswichtig.
        </div>

        <h3>Die Wortgleichung</h3>
        <p>So schreibt man den ganzen Vorgang in einer Zeile auf. Diese Gleichung
        solltest du auswendig können:</p>

        <div class="tip-box">
          <strong>Merksatz:</strong> Kohlenstoffdioxid + Wasser
          &rarr; Traubenzucker + Sauerstoff.<br>
          Über dem Pfeil steht, was es zusätzlich braucht:
          <strong>Licht</strong> und <strong>Chlorophyll</strong>.
          Chlorophyll ist der grüne Farbstoff im Chloroplasten &ndash; er fängt
          das Licht ein. Ohne diese beiden passiert gar nichts.
          (Und weil dieser Farbstoff grün ist, sind Blätter grün.)
        </div>

        <h3>Woher kommt was?</h3>
        <table class="icon-table">
          <tr>
            <th>Stoff</th>
            <th>Woher / wohin?</th>
          </tr>
          <tr>
            <td>Kohlenstoffdioxid (CO<sub>2</sub>)</td>
            <td>Kommt aus der Luft. Es gelangt durch winzige Löcher an der
                Blattunterseite ins Blatt &ndash; sie heißen <em>Spaltöffnungen</em>,
                mehr dazu in Lektion 3.</td>
          </tr>
          <tr>
            <td>Wasser (H<sub>2</sub>O)</td>
            <td>Kommt aus dem Boden. Die Wurzeln saugen es auf, es wird bis in
                die Blätter transportiert.</td>
          </tr>
          <tr>
            <td>Traubenzucker (Glucose)</td>
            <td>Bleibt in der Pflanze. Sie baut daraus alles auf, was sie zum
                Wachsen braucht &ndash; und speichert Vorräte, zum Beispiel als Stärke &ndash; das ist die Speicherform
                von Zucker, wie in einer Kartoffel.</td>
          </tr>
          <tr>
            <td>Sauerstoff (O<sub>2</sub>)</td>
            <td>Wird nach außen abgegeben. Diesen Sauerstoff atmen wir ein.</td>
          </tr>
        </table>

        <div class="warning-box">
          <strong>Typischer Fehler in der Klassenarbeit:</strong> Viele schreiben
          &bdquo;die Pflanze atmet Kohlenstoffdioxid ein und Sauerstoff aus&ldquo;.
          Das ist ungenau! Bei der Fotosynthese wird CO<sub>2</sub>
          <em>verarbeitet</em>, nicht geatmet. Und Pflanzen atmen zusätzlich
          ganz normal &ndash; auch nachts, wenn keine Fotosynthese läuft.
          Mehr dazu in Lektion 5.
        </div>

        <div class="why-context">
          <strong>Warum lernen wir das?</strong> Diese eine Gleichung erklärt,
          warum es auf der Erde Sauerstoff gibt. Vor Milliarden Jahren war fast
          keiner in der Luft. Erst Lebewesen mit Fotosynthese haben ihn nach und
          nach hineingebracht. Jeder Atemzug von dir stammt aus dieser Reaktion.
        </div>
        <div class="reading-guide">
          <strong>So liest du die Gleichung unten:</strong>
          <ul>
            <li>Links steht, was hineingeht. Rechts, was herauskommt.
            Über dem Pfeil, was zusätzlich nötig ist.</li>
            <li>Die kleinen Formeln auf den Kärtchen (CO<sub>2</sub>, H<sub>2</sub>O ...)
            <strong>musst du nicht auswendig können</strong>. Die Namen reichen.</li>
            <li>Die 6 vor den Formeln bedeutet: Es werden jeweils sechs Teilchen
            gebraucht, damit die Rechnung aufgeht.</li>
          </ul>
        </div>
      `,
      visuals: [
        {
          type: 'equation',
          label: 'Die Fotosynthese als Wortgleichung',
          over: 'Licht + Chlorophyll',
          left: [
            { name: 'Kohlenstoff&shy;dioxid', icon: '6 CO<sub>2</sub>', color: '#6b7280' },
            { name: 'Wasser', icon: '6 H<sub>2</sub>O', color: '#3b82f6' }
          ],
          right: [
            { name: 'Trauben&shy;zucker', icon: 'C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>', color: '#f59e0b' },
            { name: 'Sauerstoff', icon: '6 O<sub>2</sub>', color: '#16a34a' }
          ]
        }
      ]
    },

    example: {
      title: 'Woher nimmt ein Baum sein Gewicht?',
      steps: [
        {
          label: 'Die Frage',
          html: `<p>Ein großer Baum wiegt viele Tonnen. Als Samen wog er ein
                 paar Gramm. Woher kommt das ganze Material?</p>`
        },
        {
          label: 'Die häufigste Antwort - und warum sie falsch ist',
          html: `<p>Die meisten sagen: &bdquo;Aus dem Boden.&ldquo; Aber wenn man
                 einen Baum in einem abgewogenen Topf Erde wachsen lässt, fehlen
                 der Erde am Ende nur wenige Gramm. Der Baum wiegt aber Tonnen
                 mehr. Aus der Erde kann es also nicht kommen.</p>`
        },
        {
          label: 'Die richtige Antwort',
          html: `<p>Das Material kommt zum größten Teil <strong>aus der Luft</strong>
                 (genauer: das Trockengewicht &ndash; frisches Holz enthält zusätzlich
                 viel Wasser).
                 Genauer: aus dem Kohlenstoffdioxid. Der Kohlenstoff daraus wird
                 zu Zucker verarbeitet, und aus Zucker baut die Pflanze Holz.</p>`
        },
        {
          label: 'Merke',
          html: `<p>Ein Baum besteht im Wesentlichen aus <em>Luft und Wasser</em>,
                 zusammengebaut mit Sonnenenergie. Aus dem Boden holt er nur
                 Wasser und ein paar Mineralstoffe.</p>
                 <p><em>In der Fabrik-Sprache: Der Rohstoff wird angeliefert &ndash;
                 er liegt nicht schon im Keller.</em></p>`
        }
      ]
    },

    exercises: [
      {
        type: 'fill-in-blank',
        question: 'Vervollständige die Wortgleichung der Fotosynthese:',
        text: 'Kohlenstoffdioxid + ___ &rarr; Traubenzucker + ___',
        blanks: [
          { correct: 'Wasser', alternatives: ['H2O', 'wasser'] },
          { correct: 'Sauerstoff', alternatives: ['O2', 'sauerstoff'] }
        ],
        explanation: 'Richtig! Kohlenstoffdioxid + Wasser wird zu Traubenzucker + Sauerstoff. Über dem Pfeil stehen Licht und Chlorophyll.'
      },
      {
        type: 'multiple-choice',
        question: 'Was steht über dem Reaktionspfeil und wird zusätzlich gebraucht?',
        options: [
          'Wärme und Erde',
          'Licht und Chlorophyll',
          'Sauerstoff und Wasser',
          'Mineralstoffe aus dem Boden'
        ],
        correct: 1,
        explanation: 'Genau. Ohne Licht läuft nichts, und ohne den grünen Farbstoff Chlorophyll kann das Licht gar nicht eingefangen werden.'
      },
      {
        type: 'multiple-choice',
        question: 'Woher stammt der Kohlenstoff, aus dem ein Baum sein Holz baut?',
        options: [
          'Aus den Mineralstoffen im Boden, über die Wurzeln',
          'Aus dem Regenwasser, das über die Blätter aufgenommen wird',
          'Aus dem Kohlenstoffdioxid der Luft',
          'Aus dem Sonnenlicht, das im Holz gespeichert wird'
        ],
        correct: 2,
        explanation: 'Richtig - und das überrascht die meisten. Ein Baum baut sich zum größten Teil aus Luft auf. Das Sonnenlicht liefert nur die Energie dazu, kein Material.'
      },
      {
        type: 'matching',
        question: 'Ordne jedem Stoff zu, ob er hinein- oder herausgeht:',
        explanation: 'Richtig! Zwei Rohstoffe hinein, zwei Produkte hinaus. Der Zucker bleibt in der Pflanze, der Sauerstoff geht hinaus - und den atmen wir.',
        pairs: [
          { left: 'Kohlenstoffdioxid', right: 'Rohstoff - kommt aus der Luft hinein' },
          { left: 'Wasser', right: 'Rohstoff - kommt über die Wurzeln hinein' },
          { left: 'Traubenzucker', right: 'Produkt - bleibt in der Pflanze' },
          { left: 'Sauerstoff', right: 'Produkt - wird nach außen abgegeben' }
        ]
      }
    ]
  },

  /* =================================================================
   * Lektion 3
   * ================================================================= */
  {
    id: 3,
    title: 'Das Blatt von innen',

    explanation: {
      html: `
        <h2>Das Blatt von innen</h2>
        <p>Du weißt jetzt, was bei der Fotosynthese passiert. Aber warum
        ausgerechnet im Blatt? Schneidet man ein Blatt quer durch und legt es
        unters Mikroskop, wird klar: Ein Blatt ist perfekt für diese eine
        Aufgabe gebaut.</p>

        <div class="analogy-box">
          <strong>Die Fabrik hat ein Gebäude:</strong> Bisher haben wir nur die
          Maschinen angeschaut. Jetzt kommt die Halle drumherum.
          Oben ein <em>Dach</em>, das vor Regen schützt (die Wachsschicht).
          Ganz oben unter dem Dach der <em>Maschinenraum</em>, wo das Licht
          hinkommt (das Palisadengewebe). Darunter breite <em>Lüftungsgänge</em>,
          damit die Luft zu jeder Maschine kommt (das Schwammgewebe).
          Und unten <em>Tore</em>, die sich öffnen und schließen lassen
          (die Spaltöffnungen).
        </div>

        <h3>Die Schichten von oben nach unten</h3>
        <table class="icon-table">
          <tr>
            <th>Schicht</th>
            <th>Aufgabe</th>
          </tr>
          <tr>
            <td><strong>Wachsschicht</strong></td>
            <td>Dünner, wasserdichter Überzug. Verhindert, dass das Blatt
                austrocknet. Deshalb perlt Regen von Blättern ab.</td>
          </tr>
          <tr>
            <td><strong>Obere Haut</strong> (Epidermis)</td>
            <td>Durchsichtige Schutzschicht &ndash; wie eine Fensterscheibe.
                Sie lässt das Licht durch und hat selbst keine Chloroplasten.</td>
          </tr>
          <tr>
            <td><strong>Palisadengewebe</strong></td>
            <td>Längliche Zellen, dicht an dicht wie Zaunlatten gestellt.
                Hier stecken die <strong>meisten Chloroplasten</strong>.
                Hier läuft der Großteil der Fotosynthese.</td>
          </tr>
          <tr>
            <td><strong>Schwammgewebe</strong></td>
            <td>Runde Zellen mit <strong>großen Lufträumen</strong> dazwischen.
                So kommt das Kohlenstoffdioxid an jede Zelle heran.</td>
          </tr>
          <tr>
            <td><strong>Untere Haut</strong> mit
                <strong>Spaltöffnungen</strong></td>
            <td>Die Tore des Blattes. CO<sub>2</sub> hinein, Sauerstoff und
                Wasserdampf hinaus.</td>
          </tr>
        </table>

        <h3>Warum sitzen die Tore unten?</h3>
        <p>Bei den meisten Laubblättern liegen die Spaltöffnungen an der
        <strong>Unterseite</strong>. Der Grund: Oben knallt die Sonne drauf &ndash;
        dort würde viel zu viel Wasser verdunsten. (Gräser haben sie
        übrigens auf beiden Seiten.)</p>

        <div class="tip-box">
          <strong>So funktionieren die Schließzellen:</strong> Zwei bohnenförmige
          Zellen liegen sich gegenüber. Sind sie prall mit Wasser gefüllt, biegen
          sie sich auseinander &ndash; der Spalt ist <strong>offen</strong>. Verliert
          die Pflanze Wasser, werden sie schlaff und legen sich aneinander &ndash;
          der Spalt <strong>schließt</strong>. Die Pflanze regelt das ganz von
          selbst, ohne Muskeln.
        </div>

        <div class="warning-box">
          <strong>Der Haken dabei:</strong> Wenn es heiß wird, schließt die Pflanze
          ihre Spaltöffnungen. So spart sie Wasser. Aber dann kommt auch kein
          Kohlenstoffdioxid mehr herein &ndash; und die Fotosynthese steht still.
          Die Pflanze muss also ständig abwägen: Wasser sparen oder Zucker
          herstellen. Beides gleichzeitig geht nicht.
        </div>

        <div class="why-context">
          <strong>Warum lernen wir das?</strong> Dieser Zusammenhang erklärt,
          warum Pflanzen bei großer Hitze schlecht wachsen, obwohl doch reichlich
          Licht da ist &ndash; und warum eine Kaktuspflanze so anders aussieht als
          ein Buchenblatt. Wer wenig Wasser hat, muss anders bauen.
        </div>

        <div class="reading-guide">
          <strong>So liest du die Grafik unten:</strong>
          <ul>
            <li>Das Blatt ist quer durchgeschnitten &ndash; oben ist die Blattoberseite.</li>
            <li>Die kleinen grünen Ovale in den Zellen sind Chloroplasten.
            Zähl mal, wo mehr sitzen: oben oder unten.</li>
            <li>Unten in der Mitte siehst du die Spaltöffnung mit ihren zwei
            Schließzellen. Der graue Pfeil ist CO<sub>2</sub> hinein,
            der grüne Sauerstoff hinaus.</li>
            <li>Tippe auf eine Schicht, um die Erklärung zu lesen.</li>
          </ul>
        </div>
      `,
      visuals: [
        {
          type: 'labeled-svg',
          label: 'Blatt im Querschnitt &ndash; tippe auf die Schichten',
          svg: SVG_BLATTQUERSCHNITT,
          parts: [
            { id: 'wachs', name: 'Wachsschicht',
              text: 'Wasserdichter Überzug auf der Oberseite. Schützt vor dem Austrocknen. Deshalb perlen Wassertropfen von Blättern ab.' },
            { id: 'epidermis-oben', name: 'Obere Haut (Epidermis)',
              text: 'Durchsichtige Schutzschicht ohne Chloroplasten - wie eine Fensterscheibe, damit das Licht bis nach unten kommt. Nur die Schließzellen der Spaltöffnungen haben welche.' },
            { id: 'palisaden', name: 'Palisadengewebe',
              text: 'Längliche Zellen, dicht gestellt wie Zaunlatten. Hier sitzen die meisten Chloroplasten - das ist der Hauptort der Fotosynthese.' },
            { id: 'schwamm', name: 'Schwammgewebe',
              text: 'Runde Zellen mit großen Lufträumen dazwischen. Durch diese Luftkanäle erreicht das Kohlenstoffdioxid jede einzelne Zelle.' },
            { id: 'epidermis-unten', name: 'Untere Haut',
              text: 'Schutzschicht an der Unterseite. Hier liegen fast alle Spaltöffnungen - im Schatten, damit weniger Wasser verdunstet.' },
            { id: 'spaltoeffnung', name: 'Spaltöffnung',
              text: 'Zwei Schließzellen bilden ein Tor. Prall mit Wasser gefüllt biegen sie sich auseinander und der Spalt öffnet sich. Bei Wassermangel schließt er.' }
          ]
        }
      ]
    },

    example: {
      title: 'Warum haben Schwimmblätter der Seerose die Spaltöffnungen oben?',
      steps: [
        {
          label: 'Die Beobachtung',
          html: `<p>Bei fast allen Landpflanzen sitzen die Spaltöffnungen unten.
                 Bei der Seerose, deren Blätter auf dem Wasser schwimmen, sitzen
                 sie <strong>oben</strong>. Warum?</p>`
        },
        {
          label: 'Schritt 1: Wozu dienen die Spaltöffnungen?',
          html: `<p>Sie lassen Kohlenstoffdioxid herein. Ohne CO<sub>2</sub>
                 keine Fotosynthese.</p>`
        },
        {
          label: 'Schritt 2: Was liegt bei der Seerose unter dem Blatt?',
          html: `<p>Wasser. Und im Wasser ist viel weniger Kohlenstoffdioxid
                 verfügbar als in der Luft. Eine Öffnung nach unten würde kaum
                 etwas bringen &ndash; sie würde nur volllaufen.</p>`
        },
        {
          label: 'Schritt 3: Warum ist das Austrocknen kein Problem?',
          html: `<p>Eine Seerose steht mit den Wurzeln im Wasser. Sie hat
                 unbegrenzt Nachschub. Der Grund, warum Landpflanzen ihre
                 Öffnungen im Schatten verstecken, entfällt hier komplett.</p>`
        },
        {
          label: 'Ergebnis',
          html: `<p>Die Seerose baut ihre Tore dorthin, wo die Luft ist: nach oben.
                 <em>Der Bauplan folgt der Aufgabe</em> &ndash; genau wie eine Fabrik
                 ihre Tore dorthin baut, wo die Lastwagen ankommen.</p>`
        }
      ]
    },

    exercises: [
      {
        type: 'multiple-choice',
        question: 'In welcher Schicht läuft der größte Teil der Fotosynthese ab?',
        options: ['In der Wachsschicht', 'In der oberen Haut', 'Im Palisadengewebe', 'Im Schwammgewebe'],
        correct: 2,
        explanation: 'Richtig! Im Palisadengewebe stecken die meisten Chloroplasten. Es liegt direkt unter der durchsichtigen oberen Haut - dort kommt am meisten Licht an.'
      },
      {
        type: 'multiple-choice',
        question: 'Warum liegen die Spaltöffnungen bei den meisten Pflanzen an der Blattunterseite?',
        options: [
          'Weil dort mehr Kohlenstoffdioxid in der Luft ist',
          'Weil im Schatten weniger Wasser verdunstet',
          'Weil das Licht sie sonst zerstören würde',
          'Weil sie sonst vom Regen verstopft würden'
        ],
        correct: 1,
        explanation: 'Genau. Auf der sonnigen Oberseite würde durch die Öffnungen viel zu viel Wasser verdunsten. Unten ist es kühler und schattiger.'
      },
      {
        type: 'ordering',
        question: 'Bringe die Schichten des Blattes in die richtige Reihenfolge - von oben nach unten:',
        items: [
          'Schwammgewebe',
          'Wachsschicht',
          'Untere Haut mit Spaltöffnungen',
          'Obere Haut',
          'Palisadengewebe'
        ],
        correctOrder: [1, 3, 4, 0, 2],
        explanation: 'Richtig! Wachsschicht, obere Haut, Palisadengewebe, Schwammgewebe, untere Haut. Merke: Je weiter oben, desto mehr Licht - deshalb sitzen die Chloroplasten oben.'
      },
      {
        type: 'multiple-choice',
        question: 'Es ist ein heißer Sommertag, die Pflanze schließt ihre Spaltöffnungen. Was passiert mit der Fotosynthese?',
        options: [
          'Sie läuft schneller, weil bei Hitze mehr Licht ankommt',
          'Sie bleibt gleich, denn Licht ist ja mehr als genug vorhanden',
          'Sie wird langsamer, weil kein Kohlenstoffdioxid mehr hereinkommt',
          'Sie stoppt, weil dem Blatt ohne Wasserzufuhr die Rohstoffe fehlen'
        ],
        correct: 2,
        explanation: 'Richtig - und das ist der Zwiespalt der Pflanze. Sie schließt die Tore, um Wasser zu sparen. Damit sperrt sie aber gleichzeitig den Rohstoff CO2 aus. Licht allein nützt dann nichts.'
      }
    ]
  },

  /* =================================================================
   * Lektion 4
   * ================================================================= */
  {
    id: 4,
    title: 'Was bremst die Fotosynthese?',

    explanation: {
      html: `
        <h2>Was bremst die Fotosynthese?</h2>
        <p>Eine Pflanze im Sommer auf der Fensterbank macht mehr Fotosynthese
        als dieselbe Pflanze im Winter im Keller. Aber woran liegt das genau &ndash;
        und was passiert, wenn nur <em>eine</em> Sache fehlt?</p>

        <div class="analogy-box">
          <strong>Die Fabrik hat ein Nadelöhr:</strong> Stell dir vor, in der
          Fabrik arbeiten drei Zulieferer. Einer bringt Schrauben, einer bringt
          Bleche, einer bringt Farbe. Wenn der Schrauben-Lieferant nur die Hälfte
          liefert, nützt es <strong>überhaupt nichts</strong>, doppelt so viele
          Bleche zu bestellen. Die Fabrik läuft trotzdem nur auf halber Kraft.
          <br><br>
          Genau so ist es bei der Fotosynthese. Es zählt immer der Stoff, der
          am knappsten ist. Man nennt ihn den <strong>begrenzenden Faktor</strong>.
        </div>

        <h3>Die wichtigsten Faktoren</h3>
        <table class="icon-table">
          <tr>
            <th>Faktor</th>
            <th>Wann wird er knapp?</th>
          </tr>
          <tr>
            <td><strong>Licht</strong></td>
            <td>Im Winter, im Schatten, abends, in einem dunklen Zimmer.</td>
          </tr>
          <tr>
            <td><strong>Kohlenstoffdioxid</strong></td>
            <td>Wenn die Pflanze bei Hitze ihre Spaltöffnungen schließt
                (siehe Lektion 3). In einem geschlossenen Gewächshaus mit vielen
                Pflanzen kann das CO<sub>2</sub> ebenfalls knapp werden.</td>
          </tr>
          <tr>
            <td><strong>Wasser</strong></td>
            <td>Bei Trockenheit. Wasser ist gleich doppelt wichtig: als Rohstoff
                und um die Spaltöffnungen offen zu halten.</td>
          </tr>
          <tr>
            <td><strong>Temperatur</strong></td>
            <td>Bei Kälte laufen alle Vorgänge in der Zelle langsam, bei großer
                Hitze gehen sie kaputt. Am besten arbeitet die Fotosynthese bei
                etwa 20 bis 30 Grad.</td>
          </tr>
        </table>

        <p>Die Temperatur ist kein Lieferant &ndash; sie ist das <em>Arbeitstempo in
        der Halle</em>. Bei Kälte arbeiten alle in Zeitlupe, bei großer Hitze
        gehen die Maschinen kaputt. Deshalb steht sie in der Tabelle mit dabei,
        obwohl sie kein Rohstoff ist.</p>

        <div class="tip-box">
          <strong>So beantwortest du solche Aufgaben:</strong> Frage dich immer
          zuerst: <em>Welcher Faktor ist hier der knappste?</em> Nur dieser eine
          bestimmt die Geschwindigkeit. Alle anderen zu erhöhen bringt nichts,
          solange der knappste nicht steigt.
          <br><br>
          <em>Kleine Einschränkung:</em> Das ist ein vereinfachtes Modell. In
          Wirklichkeit wirken oft zwei Faktoren zusammen. Für die Schule reicht
          die Regel: Der knappste Faktor bestimmt das Tempo.
        </div>

        <div class="warning-box">
          <strong>Beliebte Fangfrage:</strong> &bdquo;Eine Pflanze steht im
          Dunkeln. Man gibt ihr mehr Wasser und mehr Dünger. Wächst sie jetzt
          schneller?&ldquo; &ndash; <strong>Nein.</strong> Der begrenzende Faktor ist
          das Licht. Solange das fehlt, ändert alles andere gar nichts.
        </div>

        <div class="why-context">
          <strong>Warum lernen wir das?</strong> Gärtner nutzen genau dieses
          Wissen. In professionellen Gewächshäusern wird gezielt CO<sub>2</sub>
          eingeleitet und mit Lampen beleuchtet &ndash; aber nur so viel, dass es sich
          lohnt. Wer den begrenzenden Faktor kennt, weiß, wo sich Aufwand
          auszahlt und wo nicht.
        </div>

        <div class="reading-guide">
          <strong>So benutzt du den Regler unten:</strong>
          <ul>
            <li>Schieb die drei Regler auf verschiedene Werte.
            100 % heißt: so viel, wie die Pflanze von diesem Stoff
            höchstens verwerten kann.</li>
            <li>Achte auf den Balken: Er richtet sich immer nach dem
            <strong>kleinsten</strong> Regler, nie nach dem größten.</li>
            <li>Probier es aus: Stell Licht auf 20 und alles andere auf 100.
            Der Balken bleibt bei 20 stehen.</li>
          </ul>
        </div>
      `,
      visuals: [
        {
          type: 'factor-sim',
          label: 'Probiere aus: Welcher Faktor bremst?'
        }
      ]
    },

    example: {
      title: 'Warum wächst der Salat im Gewächshaus im Februar nicht richtig?',
      steps: [
        {
          label: 'Die Situation',
          html: `<p>Ein Gärtner hat im Februar ein beheiztes Gewächshaus. Es ist
                 angenehm warm, gegossen wird regelmäßig, gedüngt auch. Trotzdem
                 wächst der Salat kaum.</p>`
        },
        {
          label: 'Schritt 1: Faktoren durchgehen',
          html: `<p>Wärme &ndash; genug. Wasser &ndash; genug. CO<sub>2</sub> &ndash; ist in der
                 Luft vorhanden. Licht &ndash; im Februar sind die Tage kurz und der
                 Himmel oft grau.</p>`
        },
        {
          label: 'Schritt 2: Den knappsten Faktor bestimmen',
          html: `<p>Das <strong>Licht</strong> ist mit Abstand am knappsten. Es ist
                 der begrenzende Faktor.</p>`
        },
        {
          label: 'Schritt 3: Was hilft, was nicht?',
          html: `<p>Noch mehr heizen bringt nichts. Noch mehr düngen bringt auch
                 nichts &ndash; zu viel Dünger im Boden zieht der Wurzel sogar Wasser
                 weg. Es hilft nur eines: <strong>Pflanzenlampen</strong>.</p>`
        },
        {
          label: 'Ergebnis',
          html: `<p>Genau deshalb hängen in Gewächshäusern im Winter Lampen.
                 Nicht weil Licht immer am wichtigsten wäre, sondern weil es zu
                 dieser Jahreszeit der knappste Faktor ist. Im Hochsommer wäre
                 dieselbe Lampe rausgeworfenes Geld.</p>`
        }
      ]
    },

    exercises: [
      {
        type: 'multiple-choice',
        question: 'Licht steht auf 90 %, Wasser auf 80 %, Kohlenstoffdioxid auf 30 %. Was passiert, wenn man das Licht auf 100 % erhöht?',
        options: [
          'Sie wird deutlich schneller, weil jetzt mehr Energie ankommt',
          'Sie ändert sich kaum, weil Kohlenstoffdioxid der knappste Faktor ist',
          'Sie stoppt ganz, weil zu viel Licht die Blätter schädigen würde',
          'Sie bleibt gleich, dafür verbraucht die Pflanze deutlich mehr Wasser'
        ],
        correct: 1,
        explanation: 'Richtig. Der knappste Faktor ist Kohlenstoffdioxid mit 30 %. Solange der nicht steigt, bringt mehr Licht nichts - wie mehr Bleche, wenn die Schrauben fehlen.'
      },
      {
        type: 'multiple-choice',
        question: 'Warum ist Wasser für die Fotosynthese gleich doppelt wichtig?',
        options: [
          'Weil es die Blätter kühlt und den Zucker abtransportiert',
          'Weil es Rohstoff ist und die Spaltöffnungen offen hält',
          'Weil es das Licht bündelt und Mineralstoffe heranbringt',
          'Weil es das Chlorophyll grün färbt und die Zellwand aufbaut'
        ],
        correct: 1,
        explanation: 'Genau. Wasser ist einerseits Rohstoff in der Gleichung. Andererseits halten prall gefüllte Schließzellen die Spaltöffnungen offen - ohne Wasser schließen sie und das CO2 bleibt draußen.'
      },
      {
        type: 'fill-in-blank',
        question: 'Ergänze den Merksatz:',
        text: 'Die Geschwindigkeit der Fotosynthese richtet sich immer nach dem ___ Faktor. Man nennt ihn den ___ Faktor.',
        blanks: [
          { correct: 'knappsten', alternatives: ['kleinsten', 'geringsten', 'knappesten'] },
          { correct: 'begrenzenden', alternatives: ['begrenzender', 'limitierenden'] }
        ],
        explanation: 'Richtig! Der knappste Faktor ist der begrenzende Faktor. Alle anderen zu erhöhen bringt nichts, solange dieser eine fehlt.'
      },
      {
        type: 'multiple-choice',
        question: 'Eine Zimmerpflanze steht im hellen Fenster, wird gut gegossen, ist aber seit Wochen im ungeheizten Wintergarten bei 4 Grad. Was bremst hier?',
        options: [
          'Das Licht',
          'Das Wasser',
          'Die Temperatur',
          'Das Kohlenstoffdioxid'
        ],
        correct: 2,
        explanation: 'Richtig. Licht und Wasser sind ausreichend da. Bei 4 Grad laufen aber alle Vorgänge in der Zelle extrem langsam. Die Fotosynthese arbeitet am besten zwischen 20 und 30 Grad.'
      }
    ]
  },

  /* =================================================================
   * Lektion 5
   * ================================================================= */
  {
    id: 5,
    title: 'Zellatmung',

    explanation: {
      html: `
        <h2>Zellatmung</h2>
        <p>Die Pflanze hat jetzt Zucker hergestellt. Aber Zucker allein bringt
        noch keine Energie &ndash; genauso wenig, wie ein Stapel Brennholz ein warmes
        Zimmer macht. Der Zucker muss erst <em>verwertet</em> werden. Das ist die
        Aufgabe der Zellatmung.</p>

        <div class="analogy-box">
          <strong>Von der Solaranlage zum Kraftwerk:</strong> In Lektion 1 hatte unsere
          Fabrik zwei Maschinen. Die Solaranlage (Chloroplast) haben wir jetzt
          ausführlich angeschaut. Sie füllt sozusagen den <em>Akku</em> &ndash; in Form
          von Zucker.
          <br><br>
          Das Kraftwerk (Mitochondrium) macht das Gegenteil: Es <em>entlädt</em>
          den Akku wieder und macht daraus nutzbare Energie. Und zwar immer dann,
          wenn die Fabrik sie braucht &ndash; auch nachts, wenn die Solaranlage stillsteht.
        </div>

        <h3>Die Wortgleichung der Zellatmung</h3>
        <p>Schau dir die Gleichung unten genau an und vergleiche sie mit der aus
        Lektion 2. Fällt dir etwas auf?</p>

        <div class="tip-box">
          <strong>Der Trick zum Merken:</strong> Rechnerisch ist die Zellatmung
          die <strong>Umkehrung</strong> der Fotosynthese. Was bei der einen
          hineingeht, kommt bei der anderen heraus:
          <br><br>
          Fotosynthese: <em>Licht</em> + CO<sub>2</sub> + Wasser
          &rarr; Zucker + Sauerstoff<br>
          Zellatmung: &nbsp;&nbsp;Zucker + Sauerstoff
          &rarr; CO<sub>2</sub> + Wasser + <em>Energie</em>
          <br><br>
          Wenn du eine Gleichung kannst, kannst du die andere auch.
          <br><br>
          <em>Aber Achtung:</em> Es ist nicht derselbe Vorgang rückwärts. Beide
          laufen in verschiedenen Zellteilen und über ganz verschiedene Schritte
          ab. Nur die Bilanz &ndash; was rein und was raus geht &ndash; ist umgekehrt.
        </div>

        <h3>Wo und wann läuft die Zellatmung?</h3>
        <ul>
          <li><strong>Wo?</strong> In den Mitochondrien &ndash; bei Tieren, Pflanzen und
          Pilzen. Bei dir, bei deinem Hund, bei der Buche im Garten.</li>
          <li><strong>Wann?</strong> Rund um die Uhr. Ohne Pause. Sobald sie
          aufhört, ist das Lebewesen tot.</li>
        </ul>

        <div class="warning-box">
          <strong>Der wichtigste Punkt der ganzen Lektion:</strong> Auch
          <strong>Pflanzen</strong> betreiben Zellatmung! Und zwar Tag und Nacht.
          <br><br>
          Tagsüber läuft beides gleichzeitig: Die Pflanze macht Fotosynthese
          <em>und</em> atmet. Bei ausreichend Licht läuft die Fotosynthese viel
          stärker &ndash; deshalb gibt die Pflanze unterm Strich Sauerstoff ab. Nachts fällt die Fotosynthese weg &ndash; dann
          verbraucht die Pflanze Sauerstoff, genau wie du.
        </div>

        <div class="why-context">
          <strong>Warum lernen wir das?</strong> Der alte Ratschlag, keine
          Pflanzen im Schlafzimmer zu haben, kommt genau von hier. In der Praxis
          ist der Effekt allerdings winzig &ndash; eine Zimmerpflanze verbraucht nachts
          nur einen Bruchteil dessen, was ein schlafender Mensch im selben Zimmer
          veratmet. Wer die Zellatmung verstanden
          hat, kann solche Behauptungen selbst einschätzen, statt sie zu glauben.
        </div>
      `,
      visuals: [
        {
          type: 'equation',
          label: 'Die Zellatmung &ndash; vergleiche sie mit Lektion 2',
          over: 'im Mitochondrium',
          left: [
            { name: 'Trauben&shy;zucker', icon: 'C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>', color: '#f59e0b' },
            { name: 'Sauerstoff', icon: '6 O<sub>2</sub>', color: '#16a34a' }
          ],
          right: [
            { name: 'Kohlenstoff&shy;dioxid', icon: '6 CO<sub>2</sub>', color: '#6b7280' },
            { name: 'Wasser', icon: '6 H<sub>2</sub>O', color: '#3b82f6' },
            { name: 'Energie', icon: '&#9889;', color: '#dc2626' }
          ]
        }
      ]
    },

    example: {
      title: 'Warum wird dir beim Sport warm?',
      steps: [
        {
          label: 'Die Beobachtung',
          html: `<p>Du rennst 400 Meter. Danach bist du außer Atem, dir ist heiß
                 und du schwitzt. Was hat das mit Zellatmung zu tun?</p>`
        },
        {
          label: 'Schritt 1: Was brauchen deine Muskeln?',
          html: `<p>Energie. Und die holen sie sich aus Zucker &ndash; genau nach der
                 Gleichung der Zellatmung.</p>`
        },
        {
          label: 'Schritt 2: Was brauchen sie dafür?',
          html: `<p><strong>Sauerstoff.</strong> Deshalb atmest du schneller: Dein
                 Körper schafft Nachschub für die Mitochondrien heran. Und dein
                 Herz schlägt schneller, um ihn dorthin zu transportieren.</p>`
        },
        {
          label: 'Schritt 3: Warum wird dir warm?',
          html: `<p>Bei der Zellatmung entsteht nicht nur nutzbare Energie, sondern
                 auch <strong>Wärme</strong> &ndash; wie bei jedem Motor. Je mehr
                 Zellatmung, desto mehr Wärme. Deshalb schwitzt du.</p>`
        },
        {
          label: 'Schritt 4: Und das Ausatmen?',
          html: `<p>Du atmest <strong>Kohlenstoffdioxid</strong> aus &ndash; das
                 Abfallprodukt aus der Gleichung. Beim Sport mehr als sonst, weil
                 mehr Zellatmung läuft.</p>
                 <p><em>Merke: Deine Atmung und die Zellatmung sind zwei
                 verschiedene Dinge. Die Lunge holt den Sauerstoff nur ins Blut.
                 Die eigentliche Zellatmung passiert in den Mitochondrien &ndash;
                 in jeder einzelnen Muskelzelle.</em></p>`
        }
      ]
    },

    exercises: [
      {
        type: 'fill-in-blank',
        question: 'Vervollständige die Wortgleichung der Zellatmung:',
        text: 'Traubenzucker + ___ &rarr; ___ + Wasser + Energie',
        blanks: [
          { correct: 'Sauerstoff', alternatives: ['O2', 'sauerstoff'] },
          { correct: 'Kohlenstoffdioxid', alternatives: ['CO2', 'kohlenstoffdioxid', 'Kohlendioxid'] }
        ],
        explanation: 'Richtig! Zucker und Sauerstoff hinein, Kohlenstoffdioxid und Wasser hinaus - plus die Energie, um die es eigentlich geht.'
      },
      {
        type: 'multiple-choice',
        question: 'Welche Lebewesen betreiben Zellatmung?',
        options: [
          'Nur Tiere und Menschen, weil sie sich bewegen',
          'Nur Pflanzen, weil sie den Zucker selbst herstellen',
          'Alle - Pflanzen, Tiere und Menschen',
          'Nur die Lebewesen, die keine Fotosynthese können'
        ],
        correct: 2,
        explanation: 'Richtig. Jedes Lebewesen mit Mitochondrien betreibt Zellatmung, rund um die Uhr. Pflanzen machen zusätzlich Fotosynthese - aber die ersetzt die Zellatmung nicht.'
      },
      {
        type: 'multiple-choice',
        question: 'Eine Pflanze steht nachts im Dunkeln. Was passiert?',
        options: [
          'Sie macht weiter Fotosynthese, nur deutlich langsamer als am Tag',
          'Sie macht keine Fotosynthese, aber Zellatmung - sie verbraucht Sauerstoff',
          'In ihr passiert gar nichts mehr, sie ruht bis zum nächsten Morgen',
          'Sie gibt weiter Sauerstoff ab, nur in geringeren Mengen als tagsüber'
        ],
        correct: 1,
        explanation: 'Genau. Ohne Licht keine Fotosynthese. Die Zellatmung läuft aber weiter - die Pflanze braucht ja auch nachts Energie. Deshalb verbraucht sie nachts Sauerstoff und gibt CO2 ab.'
      },
      {
        type: 'matching',
        question: 'Ordne zu - was gehört zur Fotosynthese, was zur Zellatmung?',
        explanation: 'Richtig! Die wichtigste Zeile ist die letzte: Die Fotosynthese braucht Licht und pausiert nachts, die Zellatmung läuft ohne Pause weiter.',
        pairs: [
          { left: 'Fotosynthese: Ort', right: 'Chloroplast' },
          { left: 'Zellatmung: Ort', right: 'Mitochondrium' },
          { left: 'Fotosynthese: braucht', right: 'Licht, CO2 und Wasser' },
          { left: 'Zellatmung: braucht', right: 'Zucker und Sauerstoff' },
          { left: 'Fotosynthese: läuft', right: 'nur bei Licht' },
          { left: 'Zellatmung: läuft', right: 'Tag und Nacht, ohne Pause' }
        ]
      }
    ]
  },

  /* =================================================================
   * Lektion 6
   * ================================================================= */
  {
    id: 6,
    title: 'Der Kreislauf',

    explanation: {
      html: `
        <h2>Der Kreislauf</h2>
        <p>Jetzt kennst du beide Vorgänge. Zeit, sie zusammenzusetzen &ndash; denn
        gemeinsam bilden sie einen der wichtigsten Kreisläufe auf unserem Planeten.</p>

        <div class="analogy-box">
          <strong>Zwei Fabriken, die sich gegenseitig beliefern:</strong> Die
          Pflanzen-Fabrik produziert Zucker und Sauerstoff. Die Tier-Fabrik
          braucht genau diese beiden Dinge &ndash; und produziert dabei
          Kohlenstoffdioxid und Wasser. Und was braucht die Pflanzen-Fabrik als
          Rohstoff? Genau: Kohlenstoffdioxid und Wasser.
          <br><br>
          Der Abfall der einen ist der Rohstoff der anderen. So läuft das seit
          Millionen von Jahren im Kreis &ndash; ohne dass jemand etwas hineinschütten muss.
        </div>

        <h3>Der berühmte Versuch mit der Glasglocke</h3>
        <p>Vor über 250 Jahren machte der Forscher Joseph Priestley einen Versuch,
        der genau das zeigte:</p>

        <table class="icon-table">
          <tr>
            <th>Versuch</th>
            <th>Ergebnis</th>
          </tr>
          <tr>
            <td>Eine Maus allein unter einer Glasglocke</td>
            <td>Nach kurzer Zeit ging es der Maus schlecht &ndash; der Sauerstoff
                wurde knapp.</td>
          </tr>
          <tr>
            <td>Eine Kerze allein unter der Glocke</td>
            <td>Die Flamme erlosch, ebenfalls aus Sauerstoffmangel. (Eine Kerze
                geht schon aus, wenn noch reichlich Sauerstoff da ist &ndash; ihr
                genügt der Rest nur nicht mehr.)</td>
          </tr>
          <tr>
            <td>Eine Pflanze <strong>zusammen</strong> mit der Maus unter der Glocke</td>
            <td>Beide hielten es viel länger aus. Die Pflanze lieferte der Maus
                Sauerstoff, die Maus der Pflanze Kohlenstoffdioxid.</td>
          </tr>
        </table>

        <div class="warning-box">
          <strong>Wichtige Ergänzung:</strong> Der Versuch funktioniert nur
          <strong>mit Licht</strong>. Stellt man die Glocke ins Dunkle, hilft die
          Pflanze der Maus überhaupt nicht &ndash; im Gegenteil, sie verbraucht dann
          selbst Sauerstoff. Genau das hatte Priestley anfangs nicht verstanden,
          weshalb seine Versuche mal klappten und mal nicht. Erst der Arzt
          Jan Ingenhousz fand einige Jahre später heraus, dass es am Licht liegt.
        </div>

        <h3>Beide Gleichungen nebeneinander</h3>
        <table class="icon-table">
          <tr>
            <th></th>
            <th>Fotosynthese</th>
            <th>Zellatmung</th>
          </tr>
          <tr>
            <td><strong>Wo?</strong></td>
            <td>Chloroplast</td>
            <td>Mitochondrium</td>
          </tr>
          <tr>
            <td><strong>Wer?</strong></td>
            <td>Pflanzen und Algen</td>
            <td>alle Lebewesen</td>
          </tr>
          <tr>
            <td><strong>Wann?</strong></td>
            <td>nur bei Licht</td>
            <td>immer</td>
          </tr>
          <tr>
            <td><strong>Hinein</strong></td>
            <td>CO<sub>2</sub> + Wasser</td>
            <td>Zucker + Sauerstoff</td>
          </tr>
          <tr>
            <td><strong>Heraus</strong></td>
            <td>Zucker + Sauerstoff</td>
            <td>CO<sub>2</sub> + Wasser</td>
          </tr>
          <tr>
            <td><strong>Energie</strong></td>
            <td>wird gespeichert</td>
            <td>wird freigesetzt</td>
          </tr>
        </table>

        <div class="why-context">
          <strong>Warum lernen wir das?</strong> Dieser Kreislauf erklärt, warum
          Wälder für das Klima so wichtig sind. Ein wachsender Baum entzieht der
          Luft Kohlenstoffdioxid und speichert den Kohlenstoff im Holz. Wird das
          Holz verbrannt oder verrottet es, kommt genau dieses CO<sub>2</sub>
          wieder zurück. Wer den Kreislauf verstanden hat, versteht auch die
          Klimadiskussion ein gutes Stück besser.
        </div>

        <div class="reading-guide">
          <strong>So liest du die Grafik unten:</strong>
          <ul>
            <li>Links die Pflanze, rechts Tier und Mensch.</li>
            <li>Drück auf den Knopf: Die grüne Kugel ist der Sauerstoff, der zur
            Tierseite wandert. Die rote ist das Kohlenstoffdioxid auf dem Rückweg.</li>
            <li>Beide Wege laufen gleichzeitig &ndash; deshalb bleibt die
            Zusammensetzung der Luft über Jahre stabil.</li>
          </ul>
        </div>
      `,
      visuals: [
        {
          type: 'cycle-anim',
          label: 'Der Kreislauf zwischen Pflanze und Tier'
        }
      ]
    },

    example: {
      title: 'Ein Aquarium mit Pflanzen und Fischen - warum funktioniert das?',
      steps: [
        {
          label: 'Die Beobachtung',
          html: `<p>In einem gut eingerichteten Aquarium leben Fische und
                 Wasserpflanzen zusammen. Man muss keinen Sauerstoff hineinpumpen,
                 und trotzdem geht es allen gut. Warum?</p>`
        },
        {
          label: 'Schritt 1: Was machen die Fische?',
          html: `<p>Zellatmung. Sie verbrauchen Sauerstoff und geben
                 Kohlenstoffdioxid ins Wasser ab.</p>`
        },
        {
          label: 'Schritt 2: Was machen die Pflanzen?',
          html: `<p>Tagsüber Fotosynthese: Sie nehmen das CO<sub>2</sub> aus dem
                 Wasser auf und geben Sauerstoff ab &ndash; man sieht die Bläschen an
                 den Blättern.</p>`
        },
        {
          label: 'Schritt 3: Der Kreislauf schließt sich',
          html: `<p>Was die Fische abgeben, brauchen die Pflanzen. Was die Pflanzen
                 abgeben, brauchen die Fische. Das Aquarium versorgt sich
                 weitgehend selbst &ndash; ein Teil des Sauerstoffs kommt zusätzlich
                 über die Wasseroberfläche aus der Luft.</p>`
        },
        {
          label: 'Schritt 4: Und nachts?',
          html: `<p>Nachts machen die Pflanzen keine Fotosynthese, aber weiter
                 Zellatmung. Dann verbrauchen <em>alle</em> Sauerstoff. Deshalb
                 ist der Sauerstoffgehalt im Aquarium morgens am niedrigsten.
                 Aquarianer wissen das &ndash; bei zu vielen Fischen und zu wenig
                 Wasserbewegung wird genau das gefährlich.</p>`
        }
      ]
    },

    exercises: [
      {
        type: 'multiple-choice',
        question: 'Priestley stellte eine Pflanze zusammen mit einer Maus unter eine Glasglocke. Unter welcher Bedingung hilft die Pflanze der Maus?',
        options: [
          'Immer, Pflanzen produzieren ständig Sauerstoff',
          'Nur wenn Licht auf die Pflanze fällt',
          'Nur nachts, wenn die Pflanze ruht',
          'Nur wenn die Maus vorher genug gefressen hat'
        ],
        correct: 1,
        explanation: 'Richtig. Ohne Licht keine Fotosynthese - dann verbraucht die Pflanze selbst Sauerstoff und macht die Lage sogar schlechter. Genau daran scheiterten Priestleys erste Versuche.'
      },
      {
        type: 'ordering',
        question: 'Bringe den Kreislauf in die richtige Reihenfolge - beginne bei der Pflanze im Sonnenlicht:',
        items: [
          'Das Tier atmet Kohlenstoffdioxid aus',
          'Die Pflanze nimmt Licht, CO2 und Wasser auf',
          'Die Pflanze gibt Sauerstoff ab',
          'Das Tier nimmt Sauerstoff auf und verbrennt damit Zucker',
          'Die Pflanze stellt Zucker her'
        ],
        correctOrder: [1, 4, 2, 3, 0],
        explanation: 'Richtig! Die Pflanze nimmt auf, stellt Zucker her, gibt Sauerstoff ab - das Tier nutzt den Sauerstoff und gibt CO2 zurück. Und damit beginnt alles von vorn.'
      },
      {
        type: 'multiple-choice',
        question: 'Warum ist der Sauerstoffgehalt in einem Aquarium morgens am niedrigsten?',
        options: [
          'Weil die Fische nachts unruhiger sind und mehr verbrauchen',
          'Weil nachts alle atmen und keine Fotosynthese läuft',
          'Weil sich Sauerstoff im kühleren Nachtwasser schlechter löst',
          'Weil die Pflanzen nachts Kohlenstoffdioxid statt Sauerstoff abgeben'
        ],
        correct: 1,
        explanation: 'Genau. Nachts fällt die Fotosynthese weg, aber die Zellatmung von Fischen UND Pflanzen läuft weiter. Über die ganze Nacht sinkt der Sauerstoffgehalt deshalb stetig.'
      },
      {
        type: 'multiple-choice',
        question: 'Bei welchem Vorgang wird Energie gespeichert, bei welchem freigesetzt?',
        options: [
          'Fotosynthese speichert Energie, Zellatmung setzt sie frei',
          'Fotosynthese setzt Energie frei, Zellatmung speichert sie',
          'Beide speichern Energie, nur in verschiedenen Zellteilen',
          'Beide setzen Energie frei, nur zu verschiedenen Zeiten'
        ],
        correct: 0,
        explanation: 'Richtig. Die Fotosynthese packt Sonnenenergie in den Zucker hinein - wie einen Akku laden. Die Zellatmung holt sie wieder heraus - wie den Akku nutzen.'
      }
    ]
  }

];
