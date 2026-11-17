/* Practical lab runner: one engine, several activity kinds, shared scoring. */
(function (HSE) {
  'use strict';
  var ui = HSE.ui, store = HSE.store;
  HSE.views = HSE.views || {};
  HSE.labs = HSE.labs || {};

  var FALLBACK = {
    id: 'teacher-practical',
    title: 'Teacher practical activity',
    intro: 'Your teacher created this practical. Carry it out as described and record your work below.',
    kind: 'choice',
    steps: [{
      q: 'Which statement best describes a good practical record?',
      options: ['Aim, apparatus, procedure, observation, inference', 'Only the final answer', 'A copy of the textbook page', 'A list of names'],
      answer: 0,
      why: 'A practical record states what you set out to do, how you did it, what you saw and what it means.'
    }]
  };

  function defFor(practicalId, simId) {
    var def = HSE.labs[simId] || HSE.labs[practicalId];
    if (def) return def;
    return Object.assign({}, FALLBACK, { id: simId || practicalId });
  }

  function normalize(num, digits) {
    var n = Number(String(num).replace(/[^0-9.\-]/g, ''));
    if (!isFinite(n)) return NaN;
    var f = Math.pow(10, digits || 0);
    return Math.round(n * f) / f;
  }

  function finish(user, def, score, max, root, practicalId) {
    store.recordPractical(user.id, practicalId || def.id, score, max, def.title);
    store.log(user.name + ' completed the practical "' + def.title + '" (' + score + '/' + max + ').');
    var pct = Math.round(score * 100 / max);
    var msg = pct >= 80 ? 'Strong practical work.' : pct >= 50 ? 'Good attempt — revisit the notes and try once more.' : 'Review the method and repeat the activity.';
    var box = root.querySelector('#lab-result');
    box.innerHTML = '<div class="card" style="margin-top:1rem;border-left:5px solid var(--green)">' +
      '<div class="row-between"><div><div class="small muted">Practical result</div>' +
      '<h2 style="margin:.1rem 0">' + score + ' / ' + max + '</h2><p class="muted" style="margin:0">' + ui.esc(msg) + '</p>' +
      '</div>' + ui.ring(pct, '#0e7c66', 70) + '</div>' +
      '<div class="btn-row" style="margin-top:.9rem"><a class="btn" href="#/labs">All practicals</a>' +
      '<a class="btn ghost" href="#/progress">My progress</a></div></div>';
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ---------- step renderers ---------- */
  function stepKind(def, s) {
    return s.kind || (s.options && s.options.length ? 'choice' : s.pairs ? 'match' : s.items ? 'order' : s.entries ? 'journal' : def.kind);
  }
  function stepHtml(def, s, i) {
    var body, kind = stepKind(def, s);
    if (kind === 'numeric') {
      body = '<div class="row" style="margin-top:.6rem"><input type="number" step="any" id="ans-' + i + '" style="max-width:180px" placeholder="Your answer">' +
        (s.unit ? '<span class="small muted">' + ui.esc(s.unit) + '</span>' : '') + '</div>' +
        '<div class="small muted" style="margin-top:.4rem">' + ui.esc(s.hint || '') + '</div>';
    } else if (kind === 'order') {
      /* deterministic shuffle so the task is never shown already solved */
      var shuffled = s.items.map(function (it, j) {
        var h = (j + 1) * 7919 + (i + 3) * 104729;
        return { text: it, pos: j, key: (h * 9301 + 49297) % 233280 };
      }).sort(function (a, b) { return a.key - b.key; });
      body = '<ol class="order-list" id="order-' + i + '">' + shuffled.map(function (it) {
        return '<li class="order-item" data-pos="' + it.pos + '"><span>' + ui.esc(it.text) + '</span>' +
          '<span class="row"><button type="button" class="btn small ghost" data-move="up" data-step="' + i + '">↑</button>' +
          '<button type="button" class="btn small ghost" data-move="down" data-step="' + i + '">↓</button></span></li>';
      }).join('') + '</ol><div class="small muted">Use the arrows to put the events in order.</div>';
    } else if (kind === 'match') {
      body = '<div class="stack" style="margin-top:.6rem">' + s.pairs.map(function (p, j) {
        return '<div class="row-between"><span>' + ui.esc(p[0]) + '</span>' +
          '<select id="match-' + i + '-' + j + '" style="max-width:220px"><option value="">Choose…</option>' +
          s.pairs.map(function (q) { return '<option value="' + ui.attr(q[1]) + '">' + ui.esc(q[1]) + '</option>'; }).join('') +
          '</select></div>';
      }).join('') + '</div>';
    } else if (kind === 'journal') {
      body = '<div class="table-wrap" style="margin-top:.6rem"><table><thead><tr><th>Account</th><th>Debit / Credit</th><th class="num">Amount (₹)</th></tr></thead><tbody>' +
        s.entries.map(function (e, j) {
          return '<tr><td><select id="acc-' + i + '-' + j + '"><option value="">Account…</option>' +
            s.accounts.map(function (a) { return '<option value="' + ui.attr(a) + '">' + ui.esc(a) + '</option>'; }).join('') + '</select></td>' +
            '<td><select id="side-' + i + '-' + j + '"><option value="">—</option><option value="dr">Debit</option><option value="cr">Credit</option></select></td>' +
            '<td class="num"><input type="number" step="any" id="amt-' + i + '-' + j + '" style="max-width:110px"></td></tr>';
        }).join('') + '</tbody></table></div>';
    } else {
      body = '<div class="options" style="margin-top:.6rem">' + s.options.map(function (o, j) {
        return '<label class="option"><input type="radio" name="q' + i + '" value="' + j + '">' +
          '<span class="mark">' + String.fromCharCode(65 + j) + '</span><span>' + ui.esc(o) + '</span></label>';
      }).join('') + '</div>';
    }
    return '<div class="card question" data-step="' + i + '"><div class="row-between">' +
      '<span class="pill grey">Step ' + (i + 1) + ' of ' + def.steps.length + '</span>' +
      '<span class="small muted">' + (kind === 'numeric' ? 'Calculate' : 'Decide') + '</span></div>' +
      '<div class="qtext" style="margin-top:.55rem">' + ui.esc(s.q) + '</div>' + body +
      '<div class="feedback" hidden style="margin-top:.6rem"></div></div>';
  }

  HSE.views.lab = function (params) {
    var user = store.currentUser();
    var subject = store.subject(params.subject);
    if (!subject) return { html: '<div class="card">Subject not found.</div>' };
    var practical = subject.practicals.filter(function (p) { return p.id === params.practical; })[0];
    if (!practical) {
      practical = store.state.practicals.filter(function (p) { return p.id === params.practical; })[0];
    }
    var def = defFor(params.practical, practical ? practical.sim : null);
    var last = store.progressOf(user.id).practicals[params.practical] ||
      store.progressOf(user.id).practicals[def.id];

    var steps = def.steps.map(function (s, i) { return stepHtml(def, s, i); }).join('');
    var controls = (def.controls || []).map(function (c) {
      return '<label class="field"><span class="lbl">' + ui.esc(c.label) + ' <b id="read-' + c.key + '">' + c.value + '</b></span>' +
        '<input type="range" id="ctl-' + c.key + '" min="' + c.min + '" max="' + c.max + '" step="' + (c.step || 1) + '" value="' + c.value + '"></label>';
    }).join('');

    var html = '<div class="breadcrumb"><a href="#/dashboard">Dashboard</a> / <a href="#/labs">Practical labs</a> / ' +
      ui.esc(subject.name) + '</div>' +
      '<div class="section-head"><div><h1 style="margin:0">' + ui.esc(def.title) + '</h1>' +
      '<div class="sub">' + ui.esc(subject.name) + ' · practical activity' + (practical ? ' · ' + ui.esc(practical.brief) : '') + '</div></div>' +
      (last ? '<span class="pill">Last score ' + last.score + '/' + last.max + '</span>' : '') + '</div>' +
      '<div class="split"><div class="stack">' +
      (def.stage ? '<div class="card"><div class="lab-stage"><canvas id="lab-canvas" width="640" height="300"></canvas>' +
        (controls ? '<div class="lab-controls" style="margin-top:.8rem;color:#d8ede5">' + controls + '</div>' : '') +
        '</div><div class="lab-readout" id="lab-readout" style="margin-top:.8rem"></div></div>' : '') +
      '<div class="panel soft"><b>Your task</b><div class="small muted" style="margin-top:.3rem">' + ui.esc(def.intro || (practical ? practical.brief : '')) + '</div></div>' +
      '<div class="stack" id="lab-steps">' + steps + '</div>' +
      '<div class="row-between" style="margin-top:1rem"><span class="small muted" id="lab-status">' + def.steps.length + ' steps</span>' +
      '<button class="btn primary" id="lab-submit">Submit practical</button></div>' +
      '<div id="lab-result"></div></div>' +
      '<aside class="stack"><div class="card"><h3>What you will learn</h3><ul class="list-clean small">' +
      (def.objectives || []).map(function (o) { return '<li>' + ui.esc(o) + '</li>'; }).join('') +
      '</ul></div>' +
      '<div class="card"><h3>Lab notes</h3><div class="small muted">' + ui.esc(def.notes ||
        'Record what you changed, what you observed and one improvement you would make. Your score is saved in My progress.') + '</div></div>' +
      '</aside></div>';

    return {
      title: def.title, html: html, mount: function (root) {
        var state = def.state ? def.state() : {};
        var canvas = root.querySelector('#lab-canvas');
        function draw() {
          if (!canvas || !def.draw) return;
          var ctx = canvas.getContext('2d');
          def.draw(ctx, canvas.width, canvas.height, state);
          var readout = root.querySelector('#lab-readout');
          if (readout) readout.innerHTML = (def.readout ? def.readout(state) : '');
        }
        (def.controls || []).forEach(function (c) {
          var input = root.querySelector('#ctl-' + c.key);
          input.addEventListener('input', function () {
            state[c.key] = Number(input.value);
            var lbl = root.querySelector('#read-' + c.key);
            if (lbl) lbl.textContent = input.value;
            draw();
          });
        });
        draw();

        /* ordering */
        root.querySelectorAll('.order-item').forEach(function (item, idx) { item.dataset.render = idx; });
        root.addEventListener('click', function (e) {
          var btn = e.target.closest('[data-move]');
          if (!btn) return;
          var list = btn.closest('.order-list');
          var item = btn.closest('.order-item');
          if (btn.getAttribute('data-move') === 'up' && item.previousElementSibling) {
            list.insertBefore(item, item.previousElementSibling);
          } else if (btn.getAttribute('data-move') === 'down' && item.nextElementSibling) {
            list.insertBefore(item.nextElementSibling, item);
          }
        });

        root.querySelector('#lab-submit').addEventListener('click', function () {
          var missing = false;
          def.steps.forEach(function (s, i) {
            var k = stepKind(def, s);
            if (k === 'choice') {
              if (!root.querySelector('input[name="q' + i + '"]:checked')) missing = true;
            } else if (k === 'numeric') {
              if (root.querySelector('#ans-' + i).value === '') missing = true;
            } else if (k === 'match') {
              s.pairs.forEach(function (p, j) { if (!root.querySelector('#match-' + i + '-' + j).value) missing = true; });
            } else if (k === 'journal') {
              s.entries.forEach(function (en, j) {
                if (!root.querySelector('#acc-' + i + '-' + j).value || !root.querySelector('#side-' + i + '-' + j).value ||
                  root.querySelector('#amt-' + i + '-' + j).value === '') missing = true;
              });
            }
          });
          if (missing) { ui.toast('Complete every step before submitting.', 'error'); return; }

          var score = 0;
          var unanswered = false;
          def.steps.forEach(function (s, i) {
            var card = root.querySelector('[data-step="' + i + '"]');
            var fb = card.querySelector('.feedback');
            var ok = false, detail = s.why || '';
            var kind = stepKind(def, s);
            if (kind === 'numeric') {
              var raw = root.querySelector('#ans-' + i).value;
              if (raw === '') unanswered = true;
              var got = normalize(raw, s.digits || 0);
              var want = normalize(s.answer, s.digits || 0);
              ok = isFinite(got) && Math.abs(got - want) <= (s.tolerance || 0);
              detail = (ok ? 'Correct. ' : 'Expected ' + s.answer + (s.unit ? ' ' + s.unit : '') + '. ') + detail;
            } else if (kind === 'order') {
              var items = Array.prototype.slice.call(root.querySelectorAll('#order-' + i + ' .order-item'));
              var seq = items.map(function (it) { return Number(it.getAttribute('data-pos')); });
              var wanted = s.items.map(function (_, j) { return j; });
              ok = seq.join(',') === wanted.join(',');
              detail = (ok ? 'Correct order. ' : 'The correct order is: ' + s.items.map(function (x, j) { return (j + 1) + '. ' + x; }).join(' · ') + '. ') + detail;
            } else if (kind === 'match') {
              var rights = {};
              s.pairs.forEach(function (p) { rights[p[0]] = p[1]; });
              var good = 0;
              s.pairs.forEach(function (p, j) {
                var pick = root.querySelector('#match-' + i + '-' + j).value;
                if (pick === p[1]) good++;
                else if (!pick) unanswered = true;
              });
              ok = good === s.pairs.length;
              detail = (ok ? 'All pairs correct. ' : good + ' of ' + s.pairs.length + ' pairs correct. ') + detail;
            } else if (kind === 'journal') {
              var allGood = true;
              s.entries.forEach(function (en, j) {
                var acc = root.querySelector('#acc-' + i + '-' + j).value;
                var side = root.querySelector('#side-' + i + '-' + j).value;
                var amt = normalize(root.querySelector('#amt-' + i + '-' + j).value, 2);
                if (acc === '' || side === '') unanswered = true;
                if (acc === en[0] && side === en[1] && Math.abs(amt - en[2]) < 0.01) return;
                allGood = false;
              });
              ok = allGood;
              detail = (ok ? 'Every entry is correct. ' : 'Check the account names, sides and amounts. ') + detail;
            } else {
              var checked = root.querySelector('input[name="q' + i + '"]:checked');
              if (!checked) unanswered = true;
              ok = checked && Number(checked.value) === s.answer;
              card.querySelectorAll('.option').forEach(function (lab) {
                var j = Number(lab.querySelector('input').value);
                lab.classList.toggle('correct', j === s.answer);
                if (checked && j === Number(checked.value) && !ok) lab.classList.add('wrong');
              });
              card.querySelectorAll('input').forEach(function (inp) { inp.disabled = true; });
              detail = (ok ? 'Correct. ' : 'Answer: ' + String.fromCharCode(65 + s.answer) + '. ') + detail;
            }
            if (ok) score++;
            fb.hidden = false;
            fb.innerHTML = '<span class="small"><b>' + (ok ? '✓ ' : '✗ ') + '</b>' + ui.esc(detail) + '</span>';
          });
          if (unanswered) { ui.toast('Complete every step before submitting.', 'error'); return; }
          finish(user, def, score, def.steps.length, root, params.practical);
          root.querySelector('#lab-submit').disabled = true;
          root.querySelector('#lab-submit').textContent = 'Submitted';
        });
      }
    };
  };
})(window.HSE = window.HSE || {});
