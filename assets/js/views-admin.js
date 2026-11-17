/* School admin: configurable curriculum, subject availability and JSON exchange. */
(function (HSE) {
  'use strict';
  var store = HSE.store, ui = HSE.ui;

  function admin() { return store.currentUser(); }

  function schoolPanel() {
    var cur = store.curriculum();
    return '<div class="card"><h3>School profile</h3>' +
      '<div class="grid cols-2"><label class="field"><span class="lbl">School name</span>' +
      '<input id="s-name" maxlength="120" value="' + ui.attr(cur.school.name) + '"></label>' +
      '<label class="field"><span class="lbl">Academic year</span><input id="s-year" maxlength="20" value="' + ui.attr(cur.meta.academicYear) + '"></label></div>' +
      '<div class="grid cols-2"><label class="field"><span class="lbl">School code</span><input id="s-code" maxlength="30" value="' + ui.attr(cur.school.code || '') + '"></label>' +
      '<label class="field"><span class="lbl">Board</span><input value="' + ui.attr(cur.meta.board) + '" disabled></label></div>' +
      '<div class="btn-row"><button class="btn primary" id="s-save">Save school profile</button>' +
      '<span class="small muted">Curriculum version ' + ui.esc(cur.meta.version) + ' · updated ' + ui.esc(cur.meta.updated) + '</span></div></div>';
  }

  function streamPanel() {
    var cur = store.curriculum();
    var blocks = cur.streams.map(function (s) {
      var others = Object.keys(cur.subjects).filter(function (id) { return !cur.subjects[id].language; });
      return '<div class="card"><div class="row-between"><h3 style="margin:0">' + ui.esc(s.name) + ' stream</h3>' +
        '<span class="pill">' + s.subjects.length + ' core subjects</span></div>' +
        '<p class="small muted">Tick the subjects this school offers in ' + ui.esc(s.name) + ' for ' + ui.esc(cur.meta.academicYear) + '.</p>' +
        '<div class="check-list" data-stream="' + ui.attr(s.id) + '">' + others.map(function (id) {
          var sub = cur.subjects[id];
          var on = s.subjects.indexOf(id) >= 0;
          return '<label><input type="checkbox" value="' + ui.attr(id) + '"' + (on ? ' checked' : '') + '> ' + ui.esc(sub.name) + '</label>';
        }).join('') + '</div></div>';
    }).join('');
    var langs = '<div class="card"><h3>Languages offered</h3><p class="small muted">Every student picks at least one language. Disabled languages are hidden from admission.</p>' +
      '<div class="check-list" id="lang-list">' + cur.languages.map(function (l) {
        return '<label><input type="checkbox" value="' + ui.attr(l.id) + '"' + (l.enabled === false ? '' : ' checked') + '> ' + ui.esc(l.name) +
          (l.native ? ' <span class="muted small">(' + ui.esc(l.native) + ')</span>' : '') + '</label>';
      }).join('') + '</div>' +
      '<div class="btn-row"><button class="btn primary" id="c-save">Save availability</button></div></div>';
    return '<div class="grid cols-2">' + blocks + '</div><div style="margin-top:1rem">' + langs + '</div>';
  }

  function subjectPanel() {
    var cur = store.curriculum();
    var rows = Object.keys(cur.subjects).map(function (id) {
      var s = cur.subjects[id];
      return '<tr><td><b>' + ui.esc(s.name) + '</b><div class="small muted">' + ui.esc(id) + '</div></td>' +
        '<td>' + (s.streams || []).map(function (x) { return ui.esc((store.stream(x) || {}).name || x); }).join(', ') + '</td>' +
        '<td class="num">' + (s.chapters[1] || []).length + ' / ' + (s.chapters[2] || []).length + '</td>' +
        '<td class="num">' + s.practicals.length + '</td></tr>';
    }).join('');
    return '<div class="card"><h3>Subjects in the curriculum</h3><div class="table-wrap"><table><thead><tr><th>Subject</th><th>Streams</th>' +
      '<th class="num">Chapters +1 / +2</th><th class="num">Practicals</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>' +
      '<div class="card"><h3>Add a subject</h3><p class="small muted">One chapter per line: <code>Chapter title :: topic | topic</code></p>' +
      '<div class="grid cols-2"><label class="field"><span class="lbl">Subject name</span><input id="n-name" maxlength="80" placeholder="e.g. Geology"></label>' +
      '<label class="field"><span class="lbl">Subject id</span><input id="n-id" maxlength="40" placeholder="e.g. geology"></label></div>' +
      '<div class="check-list" id="n-streams">' + store.curriculum().streams.map(function (s) {
        return '<label><input type="checkbox" value="' + ui.attr(s.id) + '"> ' + ui.esc(s.name) + '</label>';
      }).join('') + '</div>' +
      '<div class="grid cols-2"><label class="field"><span class="lbl">Plus One chapters</span><textarea id="n-y1" rows="3"></textarea></label>' +
      '<label class="field"><span class="lbl">Plus Two chapters</span><textarea id="n-y2" rows="3"></textarea></label></div>' +
      '<div class="btn-row"><button class="btn primary" id="n-save">Add subject</button></div></div>';
  }

  function dataPanel() {
    var cur = store.curriculum();
    return '<div class="split"><div class="stack"><div class="card"><h3>Export curriculum</h3>' +
      '<p class="small muted">Download the full curriculum — streams, subjects, chapters, practicals, languages and rules — as JSON. Keep it as your school\'s curriculum backup.</p>' +
      '<div class="btn-row"><button class="btn primary" id="d-export">Download JSON</button>' +
      '<span class="small muted">' + Object.keys(cur.subjects).length + ' subjects · ' + cur.streams.length + ' streams</span></div></div>' +
      '<div class="card"><h3>Import curriculum</h3><p class="small muted">Paste a curriculum JSON export. This replaces the current curriculum for every user in this browser.</p>' +
      '<label class="field"><span class="lbl">Curriculum JSON</span><textarea id="d-text" rows="8" placeholder="{ &quot;meta&quot;: … }"></textarea></label>' +
      '<div class="btn-row"><button class="btn" id="d-import">Validate and import</button>' +
      '<button class="btn ghost" id="d-reset">Restore DHSE seed</button></div></div></div>' +
      '<aside class="card"><h3>How updates work</h3><p class="small muted">Curriculum content is data, not code. A DHSE syllabus revision can be imported here without rebuilding the application, and schools can trim subject combinations for their own timetable.</p>' +
      '<p class="small muted">Questions keep working for subjects that already have banks. A brand new subject gets chapter materials and practicals first; its teacher can add assessment questions.</p></aside></div>';
  }

  HSE.views.admin = function (params, query) {
    var a = admin();
    if (!a) return { html: '<div class="card">Please sign in.</div>' };
    var tab = (query || {}).tab || 'curriculum';
    var items = [['curriculum', 'Curriculum'], ['subjects', 'Subjects'], ['data', 'Import / export']];
    var body = tab === 'subjects' ? subjectPanel() : tab === 'data' ? dataPanel() : schoolPanel() + '<div style="margin-top:1rem"></div>' + streamPanel();
    return {
      title: 'Curriculum admin',
      html: '<div class="section-head"><div><h1 style="margin:0">Curriculum admin</h1>' +
        '<div class="sub">' + ui.esc(a.name) + ' · ' + ui.esc(store.curriculum().school.name) + '</div></div></div>' +
        '<div class="tabs">' + items.map(function (it) {
          return '<a class="' + (tab === it[0] ? 'active' : '') + '" href="#/admin?tab=' + it[0] + '">' + it[1] + '</a>';
        }).join('') + '</div>' + body,
      mount: function (root) { mount(root, tab); }
    };
  };

  function mount(root, tab) {
    function val(id) { var el = root.querySelector('#' + id); return el ? el.value.trim() : ''; }
    function checked(sel, rootEl) {
      return [].slice.call((rootEl || root).querySelectorAll(sel + ' input:checked')).map(function (i) { return i.value; });
    }

    var sSave = root.querySelector('#s-save');
    if (sSave) sSave.addEventListener('click', function () {
      var name = val('s-name'); if (!name) { ui.toast('Enter the school name.', 'error'); return; }
      store.updateCurriculum({ school: Object.assign({}, store.curriculum().school, { name: name, code: val('s-code') }) });
      store.updateCurriculum({ meta: Object.assign({}, store.curriculum().meta, { academicYear: val('s-year') || store.curriculum().meta.academicYear }) });
      ui.toast('School profile saved.');
      HSE.app.render();
    });

    var cSave = root.querySelector('#c-save');
    if (cSave) cSave.addEventListener('click', function () {
      var cur = store.curriculum();
      var streams = cur.streams.map(function (s) {
        var box = root.querySelector('[data-stream="' + s.id + '"]');
        var picked = checked('', box);
        return Object.assign({}, s, { subjects: picked });
      });
      var enabledLang = checked('#lang-list');
      var languages = cur.languages.map(function (l) {
        return Object.assign({}, l, { enabled: enabledLang.indexOf(l.id) >= 0 });
      });
      store.updateCurriculum({ streams: streams, languages: languages });
      ui.toast('Availability saved for ' + cur.meta.academicYear + '.');
      HSE.app.render();
    });

    var nSave = root.querySelector('#n-save');
    if (nSave) nSave.addEventListener('click', function () {
      var name = val('n-name');
      var id = val('n-id').toLowerCase().replace(/[^a-z0-9-]+/g, '-');
      if (!name || !id) { ui.toast('Enter a name and an id.', 'error'); return; }
      var cur = store.curriculum();
      if (cur.subjects[id]) { ui.toast('That subject id already exists.', 'error'); return; }
      var streams = checked('#n-streams') || [];
      if (!streams.length) { ui.toast('Choose at least one stream.', 'error'); return; }
      var y1 = val('n-y1'), y2 = val('n-y2');
      if (!y1 || !y2) { ui.toast('Add chapters for both classes.', 'error'); return; }
      var subject = {
        id: id, name: name, short: name.slice(0, 3), icon: '✎', colour: '#0e7c66',
        streams: streams, description: name + ' — added by the school.',
        chapters: {
          1: HSE.parseChapters(y1.split('\n'), id, 1),
          2: HSE.parseChapters(y2.split('\n'), id, 2)
        },
        practicals: [{ id: id + '-p1', sim: 'teacher-practical', title: name + ' practical activity', brief: 'Complete the activity and record your observations.', subject: id }]
      };
      var subjects = Object.assign({}, cur.subjects);
      subjects[id] = subject;
      var updated = cur.streams.map(function (s) {
        return streams.indexOf(s.id) >= 0 ? Object.assign({}, s, { subjects: s.subjects.concat([id]) }) : s;
      });
      store.updateCurriculum({ subjects: subjects, streams: updated });
      store.log(admin().name + ' added the subject ' + name);
      ui.toast(name + ' added to the curriculum.');
      window.location.hash = '#/admin?tab=subjects';
    });

    var ex = root.querySelector('#d-export');
    if (ex) ex.addEventListener('click', function () {
      var blob = new Blob([JSON.stringify(store.curriculum(), null, 2)], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'kerala-hse-curriculum-' + store.curriculum().meta.academicYear + '.json';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 500);
      ui.toast('Curriculum downloaded.');
    });

    var im = root.querySelector('#d-import');
    if (im) im.addEventListener('click', function () {
      var text = val('d-text');
      if (!text) { ui.toast('Paste a curriculum JSON export first.', 'error'); return; }
      var obj;
      try { obj = JSON.parse(text); } catch (e) { ui.toast('That is not valid JSON.', 'error'); return; }
      if (!obj || !obj.subjects || !obj.streams || !obj.meta) { ui.toast('The JSON is missing subjects, streams or meta.', 'error'); return; }
      var count = Object.keys(obj.subjects).length;
      ui.modal({
        title: 'Replace the curriculum?',
        body: '<p>This replaces the curriculum for every user in this browser with ' + count + ' subjects across ' +
          obj.streams.length + ' streams.</p><p class="small muted">Student progress is kept. Export the current curriculum first if you may need it back.</p>',
        confirm: 'Replace curriculum',
        onConfirm: function () {
          store.importCurriculum(obj);
          store.log(admin().name + ' imported a curriculum (' + count + ' subjects)');
          HSE.ui.toast('Curriculum imported.');
          HSE.app.render();
        }
      });
    });

    var rs = root.querySelector('#d-reset');
    if (rs) rs.addEventListener('click', function () {
      ui.modal({
        title: 'Restore the DHSE seed curriculum?',
        body: '<p>School edits, added subjects and availability changes will be replaced by the built-in DHSE seed. Student accounts and progress stay.</p>',
        confirm: 'Restore seed',
        onConfirm: function () {
          store.importCurriculum(HSE.buildCurriculum());
          store.log(admin().name + ' restored the seed curriculum');
          HSE.ui.toast('Seed curriculum restored.');
          HSE.app.render();
        }
      });
    });
  }
})(window.HSE = window.HSE || {});
