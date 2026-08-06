/* ========================================
   AILA Fall 2026 — Data Explorer
   Reads RESPONSES from js/aila-data.js
   ======================================== */

(function () {
  'use strict';

  const N = RESPONSES.length;
  const PURPLE = '#6c63ff', ORANGE = '#e85d3a', TEAL = '#2a9d8f',
        GOLD = '#d4a017', SLATE = '#9b968f', ICE = '#d9d6ff';

  const HOURS_ORDER = ['Under 10', '10-50', '51-150', '151-500', '500+'];
  const CONF_ORDER = ['1', '2-3', '4', '5-6', '7'];
  const CONF_LABEL = { '1': '1 — not yet', '2-3': "2–3 — experimented,\nnothing stuck", '4': '4 — a few\nreliable uses', '5-6': '5–6 — confident\nabout where it fits', '7': '7 — core to\nhow I work' };
  const UDL_ORDER = ['1', '2-3', '4-5'];
  const UDL_LABEL = { '1': 'New to UDL', '2-3': 'A few supports when time allows', '4-5': 'I design with UDL from the start' };
  const INTEGRITY_ORDER = ['Never', 'Once or twice', 'Several times', 'Regular occurrence'];

  if (window.Chart) {
    Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
    Chart.defaults.font.size = 12.5;
    Chart.defaults.color = '#6b6560';
    Chart.defaults.plugins.legend.labels.boxWidth = 12;
    Chart.defaults.plugins.legend.labels.padding = 14;
    Chart.defaults.maintainAspectRatio = false;
  }

  /* ---------- counting helpers ---------- */
  const count = (arr) => arr.reduce((m, v) => (v ? (m[v] = (m[v] || 0) + 1, m) : m), {});
  const countMulti = (field) => RESPONSES.reduce((m, r) => (r[field].forEach(v => m[v] = (m[v] || 0) + 1), m), {});
  const sorted = (m) => Object.entries(m).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const pct = (a, b) => Math.round((a / b) * 100);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const tried = countMulti('tried');
  const kept = countMulti('kept');
  const concernCounts = countMulti('concerns');
  const concernRank = sorted(concernCounts);

  /* Deterministic scatter jitter — the same person lands in the same
     spot on every reload. (The first build used Math.random(), which
     quietly moved people around each time the page opened.) */
  function jitter(id, salt) {
    const s = Math.sin(id * 127.1 + salt * 311.7) * 43758.5453;
    return ((s - Math.floor(s)) - 0.5) * 0.42;
  }

  /* ---------- small view helpers ---------- */
  function numbersTable(headers, rows) {
    return `<details class="numbers">
      <summary>Show the numbers</summary>
      <table class="numbers__table"><thead><tr>${headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>${rows.map(r => `<tr>${r.map((c, i) => i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>
    </details>`;
  }
  const prompt = (text) => `<div class="table-talk"><span class="table-talk__label">Take this to the table</span><p>${text}</p></div>`;
  const cap = (text) => `<p class="cap">${text}</p>`;

  /* ---------- tabs ---------- */
  const TABS = [
    ['overview', 'Overview'],
    ['experience', 'AI experience'],
    ['concerns', 'Concerns'],
    ['voices', 'In their words'],
    ['udl', 'UDL baseline'],
    ['raw', 'Raw data']
  ];

  const nav = document.getElementById('ex-tabs');
  const main = document.getElementById('ex-panels');

  TABS.forEach(([id, label]) => {
    const b = document.createElement('button');
    b.className = 'ex-tab';
    b.textContent = label;
    b.id = 'tab-' + id;
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-controls', id);
    b.setAttribute('aria-selected', 'false');
    b.tabIndex = -1;
    b.addEventListener('click', () => select(id, true));
    nav.appendChild(b);

    const d = document.createElement('div');
    d.id = id;
    d.className = 'ex-panel';
    d.setAttribute('role', 'tabpanel');
    d.setAttribute('aria-labelledby', 'tab-' + id);
    d.hidden = true;
    main.appendChild(d);
  });

  function select(id, focus) {
    TABS.forEach(([t]) => {
      const btn = document.getElementById('tab-' + t);
      const on = t === id;
      btn.setAttribute('aria-selected', String(on));
      btn.tabIndex = on ? 0 : -1;
      btn.classList.toggle('is-active', on);
      document.getElementById(t).hidden = !on;
    });
    // Charts built while their panel was hidden have no measurable box, so
    // Chart.js pins the canvas to 0x0 via inline styles — and then sizes the
    // next resize against those same styles, so it can never recover. Clear
    // them first, then re-measure against the (now visible) container.
    document.querySelectorAll('#' + id + ' canvas').forEach(c => {
      const chart = window.Chart && Chart.getChart(c);
      if (!chart) return;
      c.style.width = '';
      c.style.height = '';
      chart.resize();
    });
    if (focus) {
      document.getElementById('tab-' + id).focus();
      history.replaceState(null, '', '#' + id);
    }
  }

  nav.addEventListener('keydown', (e) => {
    const keys = { ArrowRight: 1, ArrowLeft: -1, Home: 'first', End: 'last' };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const ids = TABS.map(t => t[0]);
    const cur = ids.findIndex(t => document.getElementById('tab-' + t).getAttribute('aria-selected') === 'true');
    const step = keys[e.key];
    const next = step === 'first' ? 0 : step === 'last' ? ids.length - 1 : (cur + step + ids.length) % ids.length;
    select(ids[next], true);
  });

  /* ==========================================================
     OVERVIEW
     ========================================================== */
  (function () {
    const el = document.getElementById('overview');
    const arch = count(RESPONSES.map(r => r.archetype));
    const tinker = arch['Tinkerer'] || 0;
    const dealt = RESPONSES.filter(r => r.integrity !== 'Never').length;
    const regular = RESPONSES.filter(r => r.integrity === 'Regular occurrence').length;
    const teachers = RESPONSES.filter(r => r.role === 'Classroom teacher').length;
    const roleCounts = sorted(count(RESPONSES.map(r => r.role)));

    // Registration roster — a different population from RESPONSES (everyone
    // signed up, not only the people who answered the pre-survey).
    const R = ROSTER.length;
    const roleGroups = sorted(count(ROSTER.map(r => r.roleGroup)));
    const gradeOrder = ['Elementary (K–5)', 'Middle School (6–8)', 'High School (9–12)', 'K–12', 'N/A'];
    const gradeCounts = count(ROSTER.map(r => r.grade));
    const gradeLabels = gradeOrder.filter(g => gradeCounts[g]);
    const members = ROSTER.filter(r => r.membership === 'CALIE Member').length;
    const orgCounts = sorted(count(ROSTER.map(r => ORG_ALIASES[r.org] || r.org)));
    const merged = Object.keys(ORG_ALIASES).filter(k => ROSTER.some(r => r.org === k));

    const countList = (rows) => `<ul class="countlist">${rows.map(([k, v]) =>
      `<li><span class="countlist__name">${esc(k)}</span><span class="countlist__num">${v}</span></li>`).join('')}</ul>`;
    const plainList = (items) => `<ul class="plainlist">${items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`;

    el.innerHTML = `
      <h2>The room at a glance</h2>
      <div class="ex-stats">
        <div class="ex-stat"><div class="ex-stat__num">${N}<span class="ex-stat__of"> / ${REGISTERED}</span></div>
          <div class="ex-stat__label">pre-survey responses in, of everyone registered.</div></div>
        <div class="ex-stat"><div class="ex-stat__num">${tinker}<span class="ex-stat__of"> / ${N}</span></div>
          <div class="ex-stat__label">picked <em>the tinkerer</em>. Manual holdout and systems engineer were also on the list; neither was picked.</div></div>
        <div class="ex-stat"><div class="ex-stat__num">${dealt}<span class="ex-stat__of"> / ${N}</span></div>
          <div class="ex-stat__label">have already handled an AI academic-integrity incident. ${regular} say it happens regularly.</div></div>
      </div>

      <h2 style="margin-top:2.5rem">Everyone registered — all ${R}</h2>
      <p class="lede">From the registration sheet, not the pre-survey. This section counts all ${R} people who signed up. Every other section on this page counts only the ${N} who answered the survey.</p>

      <div class="ex-grid">
        <div class="ex-card"><h3>Role, as grouped at registration</h3>
          <div class="chartbox"><canvas id="c_rgroup" role="img" aria-label="Bar chart of role groups on the registration roster"></canvas></div>
          ${numbersTable(['Role group', 'People'], roleGroups.map(([k, v]) => [k, v]))}
        </div>
        <div class="ex-card"><h3>Grade level served</h3>
          <div class="chartbox"><canvas id="c_grade" role="img" aria-label="Bar chart of grade levels served by registered participants"></canvas></div>
          ${numbersTable(['Grade level', 'People'], gradeLabels.map(g => [g, gradeCounts[g]]))}
        </div>
      </div>

      <div class="ex-grid" style="margin-top:1.25rem">
        <div class="ex-card"><h3>Organizations</h3>
          ${countList(orgCounts)}
          ${cap(`${orgCounts.length} organizations across ${R} people. ${merged.length} entries typed differently at registration — ${merged.map(m => `"${esc(m)}"`).join(', ')} — are counted with their full-name match.`)}
        </div>
        <div class="ex-card"><h3>CALIE membership</h3>
          ${countList([['CALIE Member', members], ['Left blank', R - members]])}
          ${cap('The registration sheet records a membership type or nothing at all. Blank is shown as blank.')}
        </div>
      </div>

      <div class="ex-grid" style="margin-top:1.25rem">
        <div class="ex-card"><h3>Subject areas, as written</h3>${plainList(ROSTER.map(r => r.subject).sort((a, b) => a.localeCompare(b)))}</div>
      </div>

      <h2 style="margin-top:2.5rem">The ${N} who answered the pre-survey</h2>

      <div class="ex-grid">
        <div class="ex-card">
          <h3>Primary role, as answered on the survey</h3>
          <div class="chartbox"><canvas id="c_roles" role="img" aria-label="Bar chart of roles represented in the group"></canvas></div>
          ${numbersTable(['Role', 'People'], roleCounts.map(([k, v]) => [k, v]))}
          ${cap(`${teachers} of ${N} selected "classroom teacher."`)}
        </div>

        <div class="ex-card">
          <h3>Confidence against hours — everyone is a dot</h3>
          <div class="chartbox"><canvas id="c_scatter" role="img" aria-label="Scatter plot of self-rated AI confidence band against estimated hours band"></canvas></div>
          <div class="finder">
            <p class="finder__label"><strong>Find yourself.</strong> Pick your two answers and your dot lights up.</p>
            <div class="finder__row">
              <label>Your hours
                <select id="f_hours">
                  <option value="">—</option>
                  ${HOURS_ORDER.map(h => `<option>${h}</option>`).join('')}
                </select>
              </label>
              <label>Your confidence
                <select id="f_conf">
                  <option value="">—</option>
                  ${CONF_ORDER.map(c => `<option value="${c}">${c.replace('-', '–')}</option>`).join('')}
                </select>
              </label>
            </div>
            <p class="finder__out" id="f_out" role="status"></p>
          </div>
          ${cap('Both axes are bands, not points — the survey never asked for a number. Dots are nudged apart so overlapping answers stay visible.')}
        </div>
      </div>
`;

    new Chart(document.getElementById('c_rgroup'), {
      type: 'bar',
      data: { labels: roleGroups.map(e => e[0]), datasets: [{ data: roleGroups.map(e => e[1]), backgroundColor: TEAL, borderRadius: 4 }] },
      options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { ticks: { stepSize: 1, precision: 0 }, grid: { color: 'rgba(0,0,0,.05)' } }, y: { grid: { display: false }, ticks: { autoSkip: false, callback: function (v) { return String(this.getLabelForValue(v)).split(' ').reduce((a, w) => { if (!a.length || (a[a.length - 1] + ' ' + w).length > 16) a.push(w); else a[a.length - 1] += ' ' + w; return a; }, []); } } } } }
    });

    new Chart(document.getElementById('c_grade'), {
      type: 'bar',
      data: { labels: gradeLabels, datasets: [{ data: gradeLabels.map(g => gradeCounts[g]), backgroundColor: TEAL, borderRadius: 4 }] },
      options: { plugins: { legend: { display: false } }, scales: { y: { ticks: { stepSize: 1, precision: 0 } }, x: { grid: { display: false } } } }
    });

    new Chart(document.getElementById('c_roles'), {
      type: 'bar',
      data: { labels: roleCounts.map(e => e[0]), datasets: [{ data: roleCounts.map(e => e[1]), backgroundColor: PURPLE, borderRadius: 4 }] },
      options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { ticks: { stepSize: 1, precision: 0 }, grid: { color: 'rgba(0,0,0,.05)' } }, y: { grid: { display: false }, ticks: { autoSkip: false } } } }
    });

    const maxHour = Math.max(...RESPONSES.map(r => HOURS_ORDER.indexOf(r.hours)));
    const scatter = new Chart(document.getElementById('c_scatter'), {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'responses',
            data: RESPONSES.map(r => ({
              x: HOURS_ORDER.indexOf(r.hours) + jitter(r.id, 1),
              y: CONF_ORDER.indexOf(r.conf) + jitter(r.id, 2),
              r0: r
            })),
            backgroundColor: 'rgba(108,99,255,.75)', pointRadius: 7, pointHoverRadius: 9
          },
          {
            label: 'you', data: [], backgroundColor: ORANGE, pointRadius: 11,
            pointStyle: 'rectRot', borderColor: '#fff', borderWidth: 2
          }
        ]
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const r = ctx.raw.r0;
                if (!r) return 'you';
                return [`${r.role} · serves ${r.grade}`, `${r.hours} hours · confidence ${r.conf}`];
              }
            }
          }
        },
        scales: {
          x: {
            min: -0.6, max: maxHour + 0.6,
            title: { display: true, text: 'total hours with AI tools (self-estimated band)' },
            ticks: { stepSize: 1, callback: (v) => HOURS_ORDER[v] || '' },
            grid: { color: 'rgba(0,0,0,.05)' }
          },
          y: {
            min: -0.6, max: CONF_ORDER.length - 0.4,
            title: { display: true, text: 'self-rated confidence band' },
            ticks: { stepSize: 1, callback: (v) => (CONF_LABEL[CONF_ORDER[v]] || '').split('\n') },
            grid: { color: 'rgba(0,0,0,.05)' }
          }
        }
      }
    });

    const fh = document.getElementById('f_hours'), fc = document.getElementById('f_conf'), fo = document.getElementById('f_out');
    function findMe() {
      const h = fh.value, c = fc.value;
      if (!h || !c) { scatter.data.datasets[1].data = []; scatter.update(); fo.textContent = ''; return; }
      scatter.data.datasets[1].data = [{ x: HOURS_ORDER.indexOf(h), y: CONF_ORDER.indexOf(c) }];
      scatter.update();
      const sameBoth = RESPONSES.filter(r => r.hours === h && r.conf === c).length;
      const sameHours = RESPONSES.filter(r => r.hours === h).length;
      const sameConf = RESPONSES.filter(r => r.conf === c).length;
      fo.innerHTML = `${sameBoth === 0 ? 'Nobody else answered exactly that' : `${sameBoth} ${sameBoth === 1 ? 'response matches' : 'responses match'} you on both`}
        — ${sameHours} of ${N} logged ${esc(h)} hours, ${sameConf} of ${N} picked confidence ${esc(c.replace('-', '–'))}.`;
    }
    fh.addEventListener('change', findMe);
    fc.addEventListener('change', findMe);
  })();

  /* ==========================================================
     EXPERIENCE
     ========================================================== */
  (function () {
    const el = document.getElementById('experience');
    const hoursCount = count(RESPONSES.map(r => r.hours));
    const hoursLabels = HOURS_ORDER.filter(h => hoursCount[h]);
    const archLabels = ['The manual holdout', 'One prompt and done', 'Tinkerer', 'The systems engineer'];
    const archKeys = ['Manual holdout', 'One prompt and done', 'Tinkerer', 'Systems engineer'];
    const archCount = count(RESPONSES.map(r => r.archetype));
    const toolLabels = sorted(tried).map(e => e[0]);

    // stick rate, for tools at least 3 people tried
    const stick = toolLabels.filter(t => (tried[t] || 0) >= 3)
      .map(t => ({ t, tried: tried[t] || 0, kept: kept[t] || 0, rate: pct(kept[t] || 0, tried[t]) }))
      .sort((a, b) => b.rate - a.rate || b.tried - a.tried);

    const magicTried = tried['MagicSchool'] || 0, magicKept = kept['MagicSchool'] || 0;

    el.innerHTML = `
      <h2>Hours, habits, and tools</h2>
      <div class="ex-grid">
        <div class="ex-card"><h3>Total hours with AI tools</h3>
          <div class="chartbox"><canvas id="c_hours" role="img" aria-label="Bar chart of self-estimated total hours with AI tools"></canvas></div>
          ${numbersTable(['Hours band', 'People'], hoursLabels.map(h => [h, hoursCount[h]]))}
        </div>
        <div class="ex-card"><h3>"Which of these sounds most like you?"</h3>
          <div class="chartbox"><canvas id="c_arch" role="img" aria-label="Bar chart of self-selected AI user archetypes"></canvas></div>
          ${numbersTable(['Archetype', 'People'], archLabels.map((l, i) => [l, archCount[archKeys[i]] || 0]))}
          ${cap('Four options were offered. Two were picked; two got zero.')}
        </div>
      </div>

      <div class="ex-card ex-card--wide">
        <h3>Guess first: of the ${magicTried} people who tried MagicSchool, how many still come back to it?</h3>
        <div class="guess" id="guess_tool">
          <input type="range" id="g_range" min="0" max="${magicTried}" value="${Math.round(magicTried / 2)}" aria-label="Your guess, number of people">
          <output id="g_out">${Math.round(magicTried / 2)}</output>
          <button class="ex-btn" id="g_go">Reveal</button>
        </div>
        <p class="guess__result" id="g_result" role="status"></p>
      </div>

      <div class="ex-card ex-card--wide"><h3>Tried at least once, against still come back to</h3>
        <div class="chartbox chartbox--tall"><canvas id="c_tools" role="img" aria-label="Bar chart comparing tools tried at least once against tools still in use"></canvas></div>
        ${numbersTable(['Tool', 'Tried', 'Kept'], toolLabels.map(t => [t, tried[t] || 0, kept[t] || 0]))}
        ${cap('One respondent marked Microsoft Copilot as a tool they come back to without marking it as tried, so its "kept" bar counts a person its "tried" bar does not. Left as submitted.')}
      </div>

      <div class="ex-card ex-card--wide"><h3>Stick rate — of the people who tried it, who stayed</h3>
        <ul class="sticks">
          ${stick.map(s => `<li class="stick">
            <span class="stick__name">${esc(s.t)}</span>
            <span class="stick__bar"><span class="stick__fill" style="width:${s.rate}%;background:${s.rate >= 60 ? TEAL : s.rate >= 35 ? GOLD : ORANGE}"></span></span>
            <span class="stick__num">${s.kept} of ${s.tried}</span>
          </li>`).join('')}
        </ul>
        ${cap('Tools that at least three people tried. Bar length is the share of those people who still come back to it.')}
      </div>

      ${prompt('Pull up your own two answers — what you tried, and what you came back to. What separates the two lists?')}`;

    new Chart(document.getElementById('c_hours'), {
      type: 'bar',
      data: { labels: hoursLabels, datasets: [{ data: hoursLabels.map(h => hoursCount[h]), backgroundColor: PURPLE, borderRadius: 4 }] },
      options: { plugins: { legend: { display: false } }, scales: { y: { ticks: { stepSize: 1, precision: 0 } }, x: { grid: { display: false } } } }
    });

    new Chart(document.getElementById('c_arch'), {
      type: 'bar',
      data: { labels: ['Manual holdout', 'One prompt & done', 'Tinkerer', 'Systems engineer'], datasets: [{ data: archKeys.map(k => archCount[k] || 0), backgroundColor: [SLATE, GOLD, PURPLE, TEAL], borderRadius: 4 }] },
      options: { plugins: { legend: { display: false } }, scales: { y: { ticks: { stepSize: 1, precision: 0 } }, x: { grid: { display: false } } } }
    });

    new Chart(document.getElementById('c_tools'), {
      type: 'bar',
      data: {
        labels: toolLabels,
        datasets: [
          { label: 'tried at least once', data: toolLabels.map(t => tried[t] || 0), backgroundColor: ICE, borderRadius: 3 },
          { label: 'still come back to', data: toolLabels.map(t => kept[t] || 0), backgroundColor: PURPLE, borderRadius: 3 }
        ]
      },
      options: { indexAxis: 'y', scales: { x: { ticks: { stepSize: 1, precision: 0 }, grid: { color: 'rgba(0,0,0,.05)' } }, y: { grid: { display: false }, ticks: { autoSkip: false } } } }
    });

    const gr = document.getElementById('g_range'), go = document.getElementById('g_out');
    gr.addEventListener('input', () => { go.textContent = gr.value; });
    document.getElementById('g_go').addEventListener('click', () => {
      const guess = Number(gr.value);
      const diff = guess - magicKept;
      const res = document.getElementById('g_result');
      res.innerHTML = `<strong>${magicKept} of ${magicTried}</strong> — ${pct(magicKept, magicTried)}%. ${diff === 0 ? 'Exactly right.' : diff > 0 ? `You guessed ${diff} too high.` : `You guessed ${-diff} too low.`}
        Every tool's figure is in the stick-rate list below.`;
      res.classList.add('is-shown');
    });
  })();

  /* ==========================================================
     CONCERNS
     ========================================================== */
  (function () {
    const el = document.getElementById('concerns');
    const labels = concernRank.map(e => e[0]);
    const ic = count(RESPONSES.map(r => r.integrity));
    const integrityLabels = INTEGRITY_ORDER.filter(k => ic[k]);
    const worse = RESPONSES.filter(r => r.worse && r.worse.toLowerCase() !== 'unsure');

    el.innerHTML = `
      <h2>What worries this room</h2>

      <div class="ex-card ex-card--wide predict" id="predict">
        <h3>Before you look: what do you think this room's number-one concern was?</h3>
        <p class="predict__sub">Everyone picked up to three. One of these was named more often than any other.</p>
        <div class="predict__opts">
          ${[...labels].sort((a, b) => a.localeCompare(b)).map(l => `<button class="ex-chip" data-c="${esc(l)}">${esc(l)}</button>`).join('')}
        </div>
        <button class="ex-link" id="p_skip">Skip — just show me the chart</button>
        <p class="predict__result" id="p_result" role="status"></p>
      </div>

      <div class="ex-card ex-card--wide reveal" id="concern_card" hidden>
        <h3>Top concerns (each person picked up to three)</h3>
        <div class="chartbox chartbox--tall"><canvas id="c_concerns" role="img" aria-label="Bar chart of concerns about AI, ranked"></canvas></div>
        ${numbersTable(['Concern', 'People', 'Share of ' + N], concernRank.map(([k, v]) => [k, v, pct(v, N) + '%']))}
      </div>

      <div class="ex-grid" style="margin-top:1.75rem">
        <div class="ex-card"><h3>Have you dealt with AI and your academic code?</h3>
          <div class="chartbox"><canvas id="c_integrity" role="img" aria-label="Bar chart of how often respondents have handled AI academic integrity incidents"></canvas></div>
          ${numbersTable(['Frequency', 'People'], integrityLabels.map(k => [k, ic[k]]))}
        </div>
        <div class="ex-card"><h3>"A challenge your school already had that AI is making worse"</h3>
          <div class="quotes">${worse.map(r => `<blockquote class="quote">${esc(r.worse)}<cite>${esc(r.role)}</cite></blockquote>`).join('')}</div>
          ${cap(`Every answer to this question is shown except ${N - worse.length} that read simply "unsure."`)}
        </div>
      </div>

      ${prompt('Compare your own answers to two of these questions: what you hear people talking about, and what you picked as your own top three. What do you make of the comparison?')}`;

    let built = false;
    function buildCharts() {
      if (built) return; built = true;
      new Chart(document.getElementById('c_concerns'), {
        type: 'bar',
        data: { labels, datasets: [{ data: labels.map(l => concernCounts[l]), backgroundColor: labels.map((l, i) => i === 0 ? ORANGE : PURPLE), borderRadius: 4 }] },
        options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { ticks: { stepSize: 1, precision: 0 }, grid: { color: 'rgba(0,0,0,.05)' } }, y: { grid: { display: false }, ticks: { autoSkip: false } } } }
      });
    }
    function reveal(picked) {
      const card = document.getElementById('concern_card');
      card.hidden = false;
      buildCharts();
      const res = document.getElementById('p_result');
      if (picked) {
        const n = concernCounts[picked];
        // Rank by how many concerns beat it outright, so ties read as ties
        // rather than as an arbitrary ordering of equal counts.
        const rank = labels.filter(l => concernCounts[l] > n).length + 1;
        const tied = labels.filter(l => l !== picked && concernCounts[l] === n).length;
        const ord = rank + (rank % 100 >= 11 && rank % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][rank % 10] || 'th');
        res.innerHTML = rank === 1 && !tied
          ? `<strong>Right.</strong> ${esc(picked)} came first, named by ${n} of ${N}.`
          : `You picked <strong>${esc(picked)}</strong> — ${tied ? `joint ${ord} with ${tied} other${tied === 1 ? '' : 's'}` : ord}, named by ${n} of ${N}. The top answer was <strong>${esc(labels[0])}</strong> at ${concernCounts[labels[0]]} of ${N}.`;
        res.classList.add('is-shown');
      }
      document.querySelectorAll('#predict .ex-chip').forEach(b => {
        b.disabled = true;
        if (b.dataset.c === picked) b.classList.add('is-picked');
        if (b.dataset.c === labels[0]) b.classList.add('is-answer');
      });
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    document.querySelectorAll('#predict .ex-chip').forEach(b => b.addEventListener('click', () => reveal(b.dataset.c)));
    document.getElementById('p_skip').addEventListener('click', () => reveal(null));

    new Chart(document.getElementById('c_integrity'), {
      type: 'bar',
      data: { labels: integrityLabels, datasets: [{ data: integrityLabels.map(k => ic[k]), backgroundColor: integrityLabels.map(k => k === 'Never' ? TEAL : k === 'Once or twice' ? GOLD : ORANGE), borderRadius: 4 }] },
      options: { plugins: { legend: { display: false } }, scales: { y: { ticks: { stepSize: 1, precision: 0 } }, x: { grid: { display: false } } } }
    });
  })();

  /* ==========================================================
     VOICES
     ========================================================== */
  (function () {
    const el = document.getElementById('voices');
    el.innerHTML = `
      <h2>In their words</h2>
      <p class="lede">Two questions, side by side: what you hear people talking about, and what you wish they talked about instead. Read across, not down.</p>
      <div class="ex-grid">
        <div class="ex-card"><h3>What we hear</h3>
          <div class="quotes">${RESPONSES.map(r => `<blockquote class="quote">${esc(r.hear)}<cite>${esc(r.role)}</cite></blockquote>`).join('')}</div>
        </div>
        <div class="ex-card"><h3>What we wish we heard</h3>
          <div class="quotes">${RESPONSES.map(r => `<blockquote class="quote quote--wish">${esc(r.wish)}<cite>${esc(r.role)}</cite></blockquote>`).join('')}</div>
        </div>
      </div>

      <h2 style="margin-top:2.5rem">One use you wish every educator could learn</h2>
      <div class="ex-card ex-card--wide"><div class="quotes quotes--cols">${RESPONSES.filter(r => r.oneUse).map(r => `<blockquote class="quote quote--use">${esc(r.oneUse)}<cite>${esc(r.role)}</cite></blockquote>`).join('')}</div></div>

      <h2 style="margin-top:2.5rem">What you want from this academy</h2>
      <div class="ex-card ex-card--wide"><div class="quotes quotes--cols">${RESPONSES.map(r => `<blockquote class="quote">${esc(r.learn)}<cite>${esc(r.role)}</cite></blockquote>`).join('')}</div></div>

      ${prompt('Find one card in the right-hand column that is not yours and that you would happily spend a session on. That is the person to sit next to.')}`;
  })();

  /* ==========================================================
     UDL
     ========================================================== */
  (function () {
    const el = document.getElementById('udl');
    const uc = count(RESPONSES.map(r => r.udl));
    const udlLabels = UDL_ORDER.filter(k => uc[k]);
    const sc = countMulti('udlSupports');
    const sl = sorted(sc).map(e => e[0]);
    const designers = uc['4-5'] || 0;
    const low = Math.min(...sl.map(s => sc[s]));
    const rare = sl.filter(s => sc[s] === low);

    el.innerHTML = `
      <h2>UDL baseline</h2>
      <p class="lede">Two questions from the survey: how much UDL is already in your practice, and which supports you have used.</p>
      <div class="ex-grid">
        <div class="ex-card"><h3>How much UDL is already in your practice?</h3>
          <div class="chartbox"><canvas id="c_udl" role="img" aria-label="Bar chart of self-reported UDL practice level"></canvas></div>
          ${numbersTable(['Level', 'People'], udlLabels.map(k => [UDL_LABEL[k], uc[k]]))}
          ${cap(`${designers} of ${N} selected "I design with UDL from the start."`)}
        </div>
        <div class="ex-card"><h3>Supports already in play</h3>
          <div class="chartbox chartbox--tall"><canvas id="c_supports" role="img" aria-label="Bar chart of UDL supports respondents have used"></canvas></div>
          ${numbersTable(['Support', 'People'], sl.map(s => [s, sc[s]]))}
        </div>
      </div>
      ${cap(`Highest count: ${esc(sl[0])}, at ${sc[sl[0]]} of ${N}. Lowest: ${rare.map(esc).join(' and ')}, at ${low} of ${N}.`)}
      ${prompt('Pick the one support on this list you have never tried. What would have to be true about a lesson for it to be the obvious choice?')}`;

    new Chart(document.getElementById('c_udl'), {
      type: 'bar',
      data: { labels: udlLabels.map(k => UDL_LABEL[k]), datasets: [{ data: udlLabels.map(k => uc[k]), backgroundColor: [SLATE, GOLD, PURPLE].slice(-udlLabels.length), borderRadius: 4 }] },
      options: { plugins: { legend: { display: false } }, scales: { y: { ticks: { stepSize: 1, precision: 0 } }, x: { grid: { display: false }, ticks: { callback: function (v) { return String(this.getLabelForValue(v)).split(' ').reduce((a, w) => { if (!a.length || (a[a.length - 1] + ' ' + w).length > 18) a.push(w); else a[a.length - 1] += ' ' + w; return a; }, []); } } } } }
    });

    new Chart(document.getElementById('c_supports'), {
      type: 'bar',
      data: { labels: sl, datasets: [{ data: sl.map(s => sc[s]), backgroundColor: TEAL, borderRadius: 4 }] },
      options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { ticks: { stepSize: 1, precision: 0 }, grid: { color: 'rgba(0,0,0,.05)' } }, y: { grid: { display: false }, ticks: { autoSkip: false } } } }
    });
  })();

  /* ==========================================================
     RAW
     ========================================================== */
  (function () {
    const el = document.getElementById('raw');
    const cols = [
      ['id', '#'], ['role', 'Role'], ['grade', 'Serves'], ['years', 'Years in ed'], ['influence', 'Influence'],
      ['hours', 'AI hours'], ['conf', 'Confidence'], ['archetype', 'Archetype'], ['tried', 'Tools tried'], ['kept', 'Tools kept'],
      ['practice', 'Best example'], ['learn', 'Wants to learn'], ['concerns', 'Concerns'], ['worse', 'Made worse'],
      ['integrity', 'Integrity incidents'], ['hear', 'Hears a lot'], ['wish', 'Wishes more'], ['oneUse', 'One use for every educator'],
      ['wantTool', 'Wants to explore'], ['udl', 'UDL'], ['udlSupports', 'UDL supports']
    ];
    const roles = [...new Set(RESPONSES.map(r => r.role))].sort();

    const cell = (r, k) => {
      const v = r[k];
      if (Array.isArray(v)) return v.map(x => `<span class="pill">${esc(x)}</span>`).join('');
      if (k === 'udl') return esc(UDL_LABEL[v] || v);
      if (k === 'conf') return esc(String(v).replace('-', '–'));
      return esc(v);
    };

    const blob = (r) => esc(JSON.stringify(Object.values(r)).toLowerCase());

    const card = (r) => `
      <article class="rawcard" data-blob="${blob(r)}" data-role="${esc(r.role)}">
        <header class="rawcard__head">
          <span class="rawcard__id">#${r.id}</span>
          <h3>${esc(r.role)}</h3>
          <p>${esc(r.grade)} · ${esc(r.years)} years in education · influence: ${esc(r.influence)}</p>
        </header>
        <dl class="rawcard__facts">
          <div><dt>AI hours</dt><dd>${esc(r.hours)}</dd></div>
          <div><dt>Confidence</dt><dd>${esc(String(r.conf).replace('-', '–'))}</dd></div>
          <div><dt>Archetype</dt><dd>${esc(r.archetype)}</dd></div>
          <div><dt>Integrity incidents</dt><dd>${esc(r.integrity)}</dd></div>
          <div><dt>UDL</dt><dd>${esc(UDL_LABEL[r.udl] || r.udl)}</dd></div>
        </dl>
        <dl class="rawcard__text">
          <dt>Tools tried</dt><dd>${r.tried.map(x => `<span class="pill">${esc(x)}</span>`).join('')}</dd>
          <dt>Still comes back to</dt><dd>${r.kept.map(x => `<span class="pill">${esc(x)}</span>`).join('')}</dd>
          <dt>Best example of AI in practice</dt><dd>${esc(r.practice)}</dd>
          <dt>Wants to learn</dt><dd>${esc(r.learn)}</dd>
          <dt>Top concerns</dt><dd>${r.concerns.map(x => `<span class="pill">${esc(x)}</span>`).join('')}</dd>
          <dt>Already a challenge, now worse</dt><dd>${esc(r.worse)}</dd>
          <dt>Hears a lot</dt><dd>${esc(r.hear)}</dd>
          <dt>Wishes people talked about</dt><dd>${esc(r.wish)}</dd>
          <dt>One use for every educator</dt><dd>${esc(r.oneUse)}</dd>
          <dt>Wants to explore</dt><dd>${esc(r.wantTool) || '<span class="muted">left blank</span>'}</dd>
          <dt>UDL supports in use</dt><dd>${r.udlSupports.map(x => `<span class="pill">${esc(x)}</span>`).join('')}</dd>
        </dl>
      </article>`;

    el.innerHTML = `
      <h2>Every response, unfiltered</h2>
      <p class="lede">Names are not here. Free text is exactly as submitted — typos included, because that is what raw means. Responses are numbered so you can find your own.</p>
      <div class="rawbar">
        <label>Search <input type="search" id="r_q" placeholder="e.g. privacy, Gems, debate"></label>
        <label>Role <select id="r_role"><option value="">All roles</option>${roles.map(r => `<option>${esc(r)}</option>`).join('')}</select></label>
        <label>View
          <div class="seg" role="group" aria-label="View style">
            <button class="seg__btn is-on" id="v_cards" aria-pressed="true">Cards</button>
            <button class="seg__btn" id="v_table" aria-pressed="false">Table</button>
          </div>
        </label>
        <span class="rawbar__count" id="r_count" role="status"></span>
      </div>

      <div class="rawcards" id="r_cards">${RESPONSES.map(card).join('')}</div>

      <div class="tablewrap" id="r_table" hidden><table class="rawtable"><thead><tr>${cols.map(c => `<th scope="col">${esc(c[1])}</th>`).join('')}</tr></thead>
        <tbody id="r_body">${RESPONSES.map(r => `<tr data-blob="${blob(r)}" data-role="${esc(r.role)}">${cols.map(([k]) => `<td>${cell(r, k)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

    const q = document.getElementById('r_q'), rs = document.getElementById('r_role'), cnt = document.getElementById('r_count');
    const items = [...document.querySelectorAll('#r_body tr, #r_cards .rawcard')];
    function filter() {
      const term = q.value.trim().toLowerCase(), role = rs.value;
      let shown = 0;
      items.forEach(node => {
        const ok = (!term || node.dataset.blob.includes(term)) && (!role || node.dataset.role === role);
        node.hidden = !ok;
        if (ok) shown++;
      });
      shown = shown / 2; // each response exists once as a card and once as a row
      cnt.textContent = shown === N ? `${N} responses` : `${shown} of ${N} responses`;
    }
    q.addEventListener('input', filter);
    rs.addEventListener('change', filter);
    filter();

    const vc = document.getElementById('v_cards'), vt = document.getElementById('v_table');
    function view(cards) {
      document.getElementById('r_cards').hidden = !cards;
      document.getElementById('r_table').hidden = cards;
      vc.classList.toggle('is-on', cards); vc.setAttribute('aria-pressed', String(cards));
      vt.classList.toggle('is-on', !cards); vt.setAttribute('aria-pressed', String(!cards));
    }
    vc.addEventListener('click', () => view(true));
    vt.addEventListener('click', () => view(false));
  })();

  /* ---------- boot ---------- */
  const hash = location.hash.replace('#', '');
  select(TABS.some(t => t[0] === hash) ? hash : 'overview', false);

  document.getElementById('ex-meta').textContent =
    `${N} of ${REGISTERED} pre-survey responses · most recent ${LAST_UPDATED}`;
})();
