/* Teacher console: content authoring, assessment and monitoring. */
(function (HSE) {
  'use strict';
  var store = HSE.store, ui = HSE.ui;

  function teacher() { return store.currentUser(); }
  function subsOf(t) {
    return (t.subjects || []).map(function (id) { return store.subject(id); }).filter(Boolean);
  }
  function yearOf(q) { return String(q.year || 1) === '2' ? 2 : 1; }
  function subjectOptions(t, chosen) {
    return subsOf(t).map(function (s) {
      return '<option value="' + ui.attr(s.id) + '"' + (s.id === chosen ? ' selected' : '') + '>' + ui.esc(s.name) + '</option>';
    }).join('');
  }
  function yearOptions(y) {
    return '<option value="1"' + (y === 1 ? ' selected' : '') + '>Plus One</option>' +
      '<option value="2"' + (y === 2 ? ' selected' : '') + '>Plus Two</option>';
  }
  function chapterOptions(subject, year, chosen) {
    if (!subject) return '';
    return '<option value="">Whole subject</option>' + (subject.chapters[year] || []).map(function (c) {
      return '<option value="' + ui.attr(c.id) + '"' + (c.id === chosen ? ' selected' : '') + '>' + (c.no ? c.no + '. ' : '') + ui.esc(c.title) + '</option>';
    }).join('');
  }
  function tabs(active) {
    var items = [['overview', 'Overview'], ['materials', 'Materials'], ['practicals', 'Practicals'],
    ['assignments', 'Assignments'], ['projects', 'Projects'], ['assessments', 'Assessments'],
    ['evaluate', 'Evaluate'], ['students', 'Students']];
    return '<div class="tabs">' + items.map(function (it) {
      return '<a class="' + (active === it[0] ? 'active' : '') + '" href="#/teacher?tab=' + it[0] + '">' + it[1] + '</a>';
    }).join('') + '</div>';
  }

  /* ---------- overview ---------- */
  function overview(t, year) {
    var students = store.students().filter(function (s) { return (t.streams || []).indexOf(s.stream) >= 0; });
    var subs = subsOf(t);
    var cards = subs.map(function (s) {
      var rows = students.filter(function (st) { return (st.subjects || []).indexOf(s.id) >= 0; });
      var avg = 0, n = 0;
      rows.forEach(function (st) {
        var st2 = store.subjectStats(st.id, s, year);
        if (st2.avgScore !== null) { avg += st2.avgScore; n++; }
      });
      return '<div class="card"><div class="row-between"><h3 style="margin:0">' + ui.esc(s.name) + '</h3>' +
        '<span class="pill">' + rows.length + ' students</span></div>' +
        '<div class="small muted" style="margin-top:.4rem">' + (s.chapters[year] || []).length + ' chapters · ' +
        s.practicals.length + ' practicals · ' + store.assessmentsFor(s.id, year).length + ' custom assessments</div>' +
        '<div class="metric" style="margin-top:.7rem"><b>' + (n ? Math.round(avg / n) + '%' : '—') + '</b><span class="small muted">average test score</span></div>' +
        '<div class="btn-row" style="margin-top:.7rem"><a class="btn small subtle" href="#/teacher?tab=materials&subject=' + s.id + '">Add material</a>' +
        '<a class="btn small subtle" href="#/teacher?tab=students&subject=' + s.id + '">Monitor</a></div></div>';
    }).join('');
    var pending = 0;
    store.students().forEach(function (st) {
      var p = store.progressOf(st.id);
      Object.keys(p.assignments).forEach(function (k) { if (p.assignments[k].status === 'submitted') pending++; });
      Object.keys(p.projects).forEach(function (k) { if (p.projects[k].status === 'submitted') pending++; });
    });
    return '<div class="section-head"><div><h1 style="margin:0">Teacher console</h1>' +
      '<div class="sub">' + ui.esc(t.name) + ' · ' + subs.length + ' subjects · academic year ' +
      ui.esc(store.curriculum().meta.academicYear) + '</div></div>' +
      '<label class="field" style="min-width:150px"><span class="lbl">Class</span><select id="year-pick">' + yearOptions(year) + '</select></label></div>' +
      (pending ? '<div class="panel soft" style="margin-bottom:1rem"><b>' + pending + ' submission' + (pending > 1 ? 's' : '') + ' waiting for evaluation.</b> ' +
        '<a href="#/teacher?tab=evaluate">Review now →</a></div>' : '') +
      '<div class="grid cols-3">' + (cards || ui.emptyState('No subjects assigned', 'Ask the school admin to add subjects to your profile.')) + '</div>';
  }

  /* ---------- materials ---------- */
  function materials(t, q, year) {
    var subject = store.subject(q.subject) || subsOf(t)[0];
    var list = subject ? store.materialsFor(subject.id, year) : [];
    return '<div class="split"><div class="stack">' +
      '<div class="card"><h3>Upload chapter material</h3><p class="small muted">Materials appear instantly in the student classroom for the selected chapter.</p>' +
      '<div class="grid cols-2"><label class="field"><span class="lbl">Subject</span><select id="m-subject">' + subjectOptions(t, subject && subject.id) + '</select></label>' +
      '<label class="field"><span class="lbl">Class</span><select id="m-year">' + yearOptions(year) + '</select></label></div>' +
      '<label class="field"><span class="lbl">Chapter</span><select id="m-chapter">' + chapterOptions(subject, year) + '</select></label>' +
      '<label class="field"><span class="lbl">Title</span><input id="m-title" maxlength="120" placeholder="e.g. Newtons second law — worked examples"></label>' +
      '<div class="grid cols-2"><label class="field"><span class="lbl">Type</span><select id="m-kind">' +
      '<option value="note">Reading note</option><option value="video">Video link</option><option value="link">Reference link</option><option value="slides">Slide deck</option></select></label>' +
      '<label class="field"><span class="lbl">Link (optional)</span><input id="m-url" placeholder="https://…"></label></div>' +
      '<label class="field"><span class="lbl">Content</span><textarea id="m-body" rows="4" maxlength="4000" placeholder="Key points, definitions or instructions"></textarea></label>' +
      '<div class="btn-row"><button class="btn primary" id="m-save">Publish material</button></div></div>' +
      '<div class="card"><h3>' + (subject ? ui.esc(subject.name) : 'Subject') + ' · Plus ' + (year === 1 ? 'One' : 'Two') + '</h3>' +
      (list.length ? '<div class="stack" style="margin-top:.5rem">' + list.map(function (m) {
        var ch = ((subject.chapters[year] || []).filter(function (c) { return c.id === m.chapterId; })[0] || {}).title;
        return '<div class="row-between" style="border-bottom:1px solid var(--line);padding:.5rem 0">' +
          '<div><b>' + ui.esc(m.title) + '</b><div class="small muted">' + ui.esc(m.kind) + (ch ? ' · ' + ui.esc(ch) : '') + ' · ' + ui.date(m.at) + '</div></div>' +
          '<span class="pill grey">' + ui.esc(m.subjectId) + '</span></div>';
      }).join('') + '</div>' : '<p class="muted small">No materials yet for this class.</p>') + '</div>' +
      '</div><aside class="stack"><div class="card"><h3>Teaching tip</h3><p class="small muted">Keep each note under 400 words and end with one question. Students read shorter material more completely.</p></div>' +
      '<div class="card"><h3>Other tools</h3><div class="stack"><a class="btn subtle" href="#/teacher?tab=practicals">Create a practical</a>' +
      '<a class="btn subtle" href="#/teacher?tab=assessments">Build an assessment</a></div></div></aside></div>';
  }

  /* ---------- practicals ---------- */
  function practicals(t, q, year) {
    var subject = store.subject(q.subject) || subsOf(t)[0];
    var sims = Object.keys(HSE.labs);
    var custom = subject ? store.practicalActivitiesFor(subject.id, year) : [];
    return '<div class="split"><div class="stack"><div class="card"><h3>Create a practical activity</h3>' +
      '<p class="small muted">Pick a lab simulation; it opens as a scored activity in the student lab list.</p>' +
      '<div class="grid cols-2"><label class="field"><span class="lbl">Subject</span><select id="p-subject">' + subjectOptions(t, subject && subject.id) + '</select></label>' +
      '<label class="field"><span class="lbl">Class</span><select id="p-year">' + yearOptions(year) + '</select></label></div>' +
      '<label class="field"><span class="lbl">Simulation</span><select id="p-sim">' + sims.map(function (k) {
        return '<option value="' + ui.attr(k) + '">' + ui.esc(HSE.labs[k].title) + '</option>';
      }).join('') + '</select></label>' +
      '<label class="field"><span class="lbl">Title</span><input id="p-title" maxlength="120" placeholder="e.g. Ohms law verification"></label>' +
      '<label class="field"><span class="lbl">Brief for students</span><textarea id="p-brief" rows="3" maxlength="600"></textarea></label>' +
      '<div class="btn-row"><button class="btn primary" id="p-save">Add practical</button></div></div>' +
      '<div class="card"><h3>Teacher-added practicals</h3>' + (custom.length ? '<div class="stack">' + custom.map(function (p) {
        return '<div><b>' + ui.esc(p.title) + '</b><div class="small muted">' + ui.esc(p.brief) + ' · ' + ui.esc(p.sim) + '</div></div>';
      }).join('') + '</div>' : '<p class="small muted">None yet. The subject already includes its syllabus practicals.</p>') + '</div></div>' +
      '<aside class="card"><h3>Available simulations</h3><div class="small muted">' + sims.map(function (k, i) {
        return (i ? ' · ' : '') + ui.esc(HSE.labs[k].title);
      }).join('') + '</div></aside></div>';
  }

  /* ---------- assignments & projects ---------- */
  function assignments(t, q, year) {
    var subject = store.subject(q.subject) || subsOf(t)[0];
    var list = subject ? store.assignmentsFor(subject.id, year) : [];
    return '<div class="split"><div class="stack"><div class="card"><h3>Assign work</h3>' +
      '<div class="grid cols-2"><label class="field"><span class="lbl">Subject</span><select id="a-subject">' + subjectOptions(t, subject && subject.id) + '</select></label>' +
      '<label class="field"><span class="lbl">Class</span><select id="a-year">' + yearOptions(year) + '</select></label></div>' +
      '<label class="field"><span class="lbl">Chapter</span><select id="a-chapter">' + chapterOptions(subject, year) + '</select></label>' +
      '<label class="field"><span class="lbl">Title</span><input id="a-title" maxlength="120"></label>' +
      '<label class="field"><span class="lbl">Instructions</span><textarea id="a-brief" rows="3" maxlength="1200"></textarea></label>' +
      '<div class="grid cols-2"><label class="field"><span class="lbl">Maximum score</span><input id="a-max" type="number" min="1" max="100" value="20"></label>' +
      '<label class="field"><span class="lbl">Due date</span><input id="a-due" type="date"></label></div>' +
      '<div class="btn-row"><button class="btn primary" id="a-save">Publish assignment</button></div></div>' +
      '<div class="card"><h3>Assignments</h3>' + (list.length ? '<div class="stack">' + list.map(function (a) {
        var ch = ((subject.chapters[year] || []).filter(function (c) { return c.id === a.chapterId; })[0] || {}).title;
        return '<div class="row-between"><div><b>' + ui.esc(a.title) + '</b><div class="small muted">' + (ch ? ui.esc(ch) + ' · ' : '') +
          'max ' + (a.maxScore || 20) + (a.due ? ' · due ' + ui.esc(a.due) : '') + '</div></div>' +
          '<span class="pill grey">' + submittedCount(a.id) + ' submitted</span></div>';
      }).join('') + '</div>' : '<p class="small muted">No assignments for this class yet.</p>') + '</div></div>' +
      '<aside class="card"><h3>Grading</h3><p class="small muted">Open <a href="#/teacher?tab=evaluate">Evaluate</a> to score submissions. Students see your feedback in the classroom.</p></aside></div>';
  }

  function submittedCount(id) {
    return store.students().filter(function (s) {
      var p = store.progressOf(s.id);
      return p.assignments[id] && p.assignments[id].status !== 'graded';
    }).length;
  }

  function projects(t, q, year) {
    var subject = store.subject(q.subject) || subsOf(t)[0];
    var list = subject ? store.projectsFor(subject.id, year) : [];
    return '<div class="split"><div class="stack"><div class="card"><h3>Assign a project</h3>' +
      '<div class="grid cols-2"><label class="field"><span class="lbl">Subject</span><select id="pr-subject">' + subjectOptions(t, subject && subject.id) + '</select></label>' +
      '<label class="field"><span class="lbl">Class</span><select id="pr-year">' + yearOptions(year) + '</select></label></div>' +
      '<label class="field"><span class="lbl">Title</span><input id="pr-title" maxlength="120"></label>' +
      '<label class="field"><span class="lbl">Brief</span><textarea id="pr-brief" rows="3" maxlength="1200"></textarea></label>' +
      '<label class="field"><span class="lbl">Maximum score</span><input id="pr-max" type="number" min="1" max="100" value="20"></label>' +
      '<div class="btn-row"><button class="btn primary" id="pr-save">Publish project</button></div></div>' +
      '<div class="card"><h3>Projects</h3>' + (list.length ? '<div class="stack">' + list.map(function (p) {
        return '<div><b>' + ui.esc(p.title) + '</b><div class="small muted">' + ui.esc(p.brief) + ' · max ' + (p.maxScore || 20) + '</div></div>';
      }).join('') + '</div>' : '<p class="small muted">No projects for this class yet.</p>') + '</div></div>' +
      '<aside class="card"><h3>Project ideas</h3><p class="small muted">Ask for a short proposal first, then a final artefact with a reflection note. Grade the process, not only the polish.</p></aside></div>';
  }

  /* ---------- assessments ---------- */
  function parseMcq(text) {
    var out = [];
    String(text || '').split('\n').forEach(function (line) {
      if (!line.trim()) return;
      var p = line.split('|').map(function (x) { return x.trim(); });
      if (p.length < 7) return;
      var idx = Number(p[5]);
      if (!(idx >= 0 && idx <= 3)) return;
      out.push({ q: p[0], options: [p[1], p[2], p[3], p[4]], correct: idx, explanation: p[6] || '' });
    });
    return out;
  }

  function assessments(t, q, year) {
    var subject = store.subject(q.subject) || subsOf(t)[0];
    var list = subject ? store.assessmentsFor(subject.id, year) : [];
    return '<div class="split"><div class="stack"><div class="card"><h3>Conduct an online assessment</h3>' +
      '<p class="small muted">One question per line: <code>Question | A | B | C | D | correct 0-3 | explanation</code></p>' +
      '<div class="grid cols-2"><label class="field"><span class="lbl">Subject</span><select id="as-subject">' + subjectOptions(t, subject && subject.id) + '</select></label>' +
      '<label class="field"><span class="lbl">Class</span><select id="as-year">' + yearOptions(year) + '</select></label></div>' +
      '<label class="field"><span class="lbl">Title</span><input id="as-title" maxlength="120"></label>' +
      '<label class="field"><span class="lbl">Questions</span><textarea id="as-q" rows="7" placeholder="Which unit measures force? | joule | newton | watt | pascal | 1 | Force is measured in newtons."></textarea></label>' +
      '<div class="btn-row"><button class="btn primary" id="as-save">Add to chapter examination</button></div></div>' +
      '<div class="card"><h3>Custom questions</h3>' + (list.length ? '<div class="stack">' + list.map(function (a) {
        return '<div><b>' + ui.esc(a.title) + '</b><div class="small muted">' + a.questions.length + ' questions · added ' + ui.date(a.at) + '</div></div>';
      }).join('') + '</div>' : '<p class="small muted">No custom questions yet. Built-in syllabus questions are still used.</p>') + '</div></div>' +
      '<aside class="card"><h3>How it scores</h3><p class="small muted">Custom questions are appended to the chapter examination for the class and marked automatically. Students see the explanation after submitting.</p></aside></div>';
  }

  /* ---------- evaluate ---------- */
  function evaluate(t, year) {
    var rows = [];
    store.students().forEach(function (st) {
      (t.subjects || []).forEach(function (sid) {
        if ((st.subjects || []).indexOf(sid) < 0) return;
        var subject = store.subject(sid);
        if (!subject) return;
        var p = store.progressOf(st.id);
        store.assignmentsFor(sid, year).forEach(function (a) {
          var rec = p.assignments[a.id];
          if (!rec || rec.status !== 'submitted') return;
          rows.push({ kind: 'assignment', student: st, subject: subject, item: a, rec: rec });
        });
        store.projectsFor(sid, year).forEach(function (pr) {
          var rec = p.projects[pr.id];
          if (!rec || rec.status !== 'submitted') return;
          rows.push({ kind: 'project', student: st, subject: subject, item: pr, rec: rec });
        });
      });
    });
    if (!rows.length) {
      return '<div class="card">' + ui.emptyState('Nothing to evaluate', 'Submitted assignments and projects for Plus ' + (year === 1 ? 'One' : 'Two') + ' appear here.') + '</div>';
    }
    return '<div class="stack">' + rows.map(function (r, i) {
      var max = r.item.maxScore || 20;
      return '<div class="card" data-eval="' + i + '"><div class="row-between"><div><b>' + ui.esc(r.item.title) + '</b>' +
        '<div class="small muted">' + ui.esc(r.student.name) + ' · ' + ui.esc(r.subject.name) + ' · ' + (r.kind === 'project' ? 'project' : 'assignment') + ' · submitted ' + ui.dateTime(r.rec.at) + '</div></div>' +
        '<span class="pill">' + ui.esc(r.kind) + '</span></div>' +
        '<details style="margin-top:.6rem"><summary class="small">View submission</summary>' +
        '<div class="panel soft small" style="white-space:pre-wrap;margin-top:.5rem">' + ui.esc(r.rec.text || '(no text)') + '</div></details>' +
        '<div class="grid cols-2" style="margin-top:.7rem"><label class="field"><span class="lbl">Score out of ' + max + '</span>' +
        '<input type="number" min="0" max="' + max + '" id="score-' + i + '" value="' + Math.round(max * 0.7) + '"></label>' +
        '<label class="field"><span class="lbl">Feedback</span><input id="fb-' + i + '" maxlength="300" placeholder="One strength and one next step"></label></div>' +
        '<div class="btn-row"><button class="btn primary small" data-grade="' + i + '">Save grade</button></div></div>';
    }).join('') + '</div>';
  }

  /* ---------- students ---------- */
  function students(t, year, subjectId) {
    var subject = store.subject(subjectId);
    if (!subject) return '<div class="card">Choose a subject in your profile to monitor students.</div>';
    var rows = store.students().filter(function (s) {
      return (t.streams || []).indexOf(s.stream) >= 0 && (s.subjects || []).indexOf(subjectId) >= 0;
    });
    return '<div class="card"><div class="row-between"><h3 style="margin:0">' + ui.esc(subject.name) + ' · Plus ' + (year === 1 ? 'One' : 'Two') + '</h3>' +
      '<span class="pill">' + rows.length + ' students</span></div>' +
      '<div class="table-wrap" style="margin-top:.7rem"><table><thead><tr><th>Student</th><th>Stream</th><th class="num">Chapters</th>' +
      '<th class="num">Avg score</th><th class="num">Practicals</th><th>Last test</th></tr></thead><tbody>' +
      (rows.length ? rows.map(function (s) {
        var st = store.subjectStats(s.id, subject, year);
        var p = store.progressOf(s.id);
        var lastAt = p.attempts[0] && p.attempts[0].at;
        return '<tr><td><b>' + ui.esc(s.name) + '</b><div class="small muted">' + ui.esc(s.email) + '</div></td>' +
          '<td>' + ui.esc((store.stream(s.stream) || {}).name || s.stream) + '</td>' +
          '<td class="num">' + st.chaptersDone + ' / ' + st.chaptersTotal + '</td>' +
          '<td class="num">' + (st.avgScore === null ? '—' : st.avgScore + '%') + '</td>' +
          '<td class="num">' + st.practicalsDone + ' / ' + st.practicalsTotal + '</td>' +
          '<td class="small">' + (lastAt ? ui.date(lastAt) : 'No tests yet') + '</td></tr>';
      }).join('') : '<tr><td colspan="6" class="muted">No students in this subject yet.</td></tr>') +
      '</tbody></table></div></div>';
  }

  /* ---------- main view ---------- */
  HSE.views.teacher = function (params, query) {
    var t = teacher();
    if (!t) return { html: '<div class="card">Please sign in.</div>' };
    var q = query || {};
    var year = yearOf(q);
    var tab = q.tab || 'overview';
    var body;
    if (tab === 'materials') body = materials(t, q, year);
    else if (tab === 'practicals') body = practicals(t, q, year);
    else if (tab === 'assignments') body = assignments(t, q, year);
    else if (tab === 'projects') body = projects(t, q, year);
    else if (tab === 'assessments') body = assessments(t, q, year);
    else if (tab === 'evaluate') body = evaluate(t, year);
    else if (tab === 'students') body = students(t, year, q.subject || (t.subjects || [])[0]);
    else body = overview(t, year);

    var head = tab === 'overview' ? '' :
      '<div class="section-head"><div><h1 style="margin:0">Teacher console</h1>' +
      '<div class="sub">' + ui.esc(t.name) + ' · ' + ui.esc(store.curriculum().meta.academicYear) + '</div></div>' +
      '<label class="field" style="min-width:150px"><span class="lbl">Class</span><select id="year-pick">' + yearOptions(year) + '</select></label></div>';
    return { title: 'Teacher console', html: head + tabs(tab) + body, mount: function (root) { mount(t, root, tab, year); } };
  };

  function go(tab, extra, year) {
    var q = 'tab=' + tab + '&year=' + year;
    Object.keys(extra || {}).forEach(function (k) { q += '&' + k + '=' + encodeURIComponent(extra[k]); });
    window.location.hash = '#/teacher?' + q;
  }

  function mount(t, root, tab, year) {
    var yp = root.querySelector('#year-pick');
    if (yp) yp.addEventListener('change', function () { go(tab, {}, yp.value); });

    function subjYearWatch(prefix) {
      var s = root.querySelector('#' + prefix + '-subject');
      var y = root.querySelector('#' + prefix + '-year');
      function nav() { go(tab, { subject: s.value }, y.value); }
      if (s) s.addEventListener('change', nav);
      if (y) y.addEventListener('change', nav);
    }
    if (tab === 'materials') subjYearWatch('m');
    if (tab === 'assignments') subjYearWatch('a');
    if (tab === 'practicals') subjYearWatch('p');
    if (tab === 'projects') subjYearWatch('pr');
    if (tab === 'assessments') subjYearWatch('as');

    function val(id) { var el = root.querySelector('#' + id); return el ? el.value.trim() : ''; }

    var mSave = root.querySelector('#m-save');
    if (mSave) mSave.addEventListener('click', function () {
      var subjectId = val('m-subject'), title = val('m-title'), content = val('m-body');
      if (!title) { ui.toast('Add a title.', 'error'); return; }
      if (!content && !val('m-url')) { ui.toast('Add some content or a link.', 'error'); return; }
      store.addMaterial({
        subjectId: subjectId, year: Number(val('m-year')), chapterId: val('m-chapter'),
        title: title, kind: val('m-kind'), url: val('m-url'), content: content, by: t.id
      });
      store.log(t.name + ' published material "' + title + '"');
      ui.toast('Material published.');
      go('materials', { subject: subjectId }, year);
    });

    var pSave = root.querySelector('#p-save');
    if (pSave) pSave.addEventListener('click', function () {
      var subjectId = val('p-subject'), title = val('p-title');
      if (!title) { ui.toast('Add a title.', 'error'); return; }
      store.addPracticalActivity({
        subjectId: subjectId, year: Number(val('p-year')), title: title,
        brief: val('p-brief') || 'Complete the simulation steps and record your observations.',
        sim: val('p-sim'), by: t.id
      });
      store.log(t.name + ' added a practical "' + title + '"');
      ui.toast('Practical added.');
      go('practicals', { subject: subjectId }, year);
    });

    var aSave = root.querySelector('#a-save');
    if (aSave) aSave.addEventListener('click', function () {
      var subjectId = val('a-subject'), title = val('a-title');
      if (!title) { ui.toast('Add a title.', 'error'); return; }
      var max = Number(val('a-max')) || 20;
      store.addAssignment({
        subjectId: subjectId, year: Number(val('a-year')), chapterId: val('a-chapter'), title: title,
        brief: val('a-brief') || 'Complete the task and submit your work.',
        maxScore: Math.max(1, Math.min(100, max)), due: val('a-due'), by: t.id
      });
      store.log(t.name + ' assigned "' + title + '"');
      ui.toast('Assignment published.');
      go('assignments', { subject: subjectId }, year);
    });

    var prSave = root.querySelector('#pr-save');
    if (prSave) prSave.addEventListener('click', function () {
      var subjectId = val('pr-subject'), title = val('pr-title');
      if (!title) { ui.toast('Add a title.', 'error'); return; }
      var max = Number(val('pr-max')) || 20;
      store.addProject({
        subjectId: subjectId, year: Number(val('pr-year')), title: title,
        brief: val('pr-brief') || 'Plan, build and present your project.',
        maxScore: Math.max(1, Math.min(100, max)), by: t.id
      });
      store.log(t.name + ' assigned project "' + title + '"');
      ui.toast('Project published.');
      go('projects', { subject: subjectId }, year);
    });

    var asSave = root.querySelector('#as-save');
    if (asSave) asSave.addEventListener('click', function () {
      var subjectId = val('as-subject'), title = val('as-title');
      var qs = parseMcq(val('as-q'));
      if (!title) { ui.toast('Add a title.', 'error'); return; }
      if (!qs.length) { ui.toast('Add at least one valid question line.', 'error'); return; }
      store.addAssessment({ subjectId: subjectId, year: Number(val('as-year')), title: title, questions: qs, by: t.id });
      store.log(t.name + ' added ' + qs.length + ' assessment questions');
      ui.toast(qs.length + ' questions added.');
      go('assessments', { subject: subjectId }, year);
    });

    root.querySelectorAll('[data-grade]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = btn.getAttribute('data-grade');
        var row = evaluationRows(t, year)[Number(i)];
        if (!row) { ui.toast('That submission is no longer pending.', 'error'); return; }
        var score = Number(root.querySelector('#score-' + i).value);
        var fb = val('fb-' + i);
        if (!(score >= 0 && score <= row.max)) { ui.toast('Enter a score between 0 and ' + row.max + '.', 'error'); return; }
        if (row.kind === 'assignment') store.gradeAssignment(row.student.id, row.item.id, score, fb);
        else store.gradeProject(row.student.id, row.item.id, score, fb);
        store.log(t.name + ' graded ' + row.student.name + ' (' + score + '/' + row.max + ')');
        ui.toast('Grade saved.');
        HSE.app.render();
      });
    });
  }

  function evaluationRows(t, year) {
    var rows = [];
    store.students().forEach(function (st) {
      (t.subjects || []).forEach(function (sid) {
        if ((st.subjects || []).indexOf(sid) < 0) return;
        var subject = store.subject(sid);
        if (!subject) return;
        var p = store.progressOf(st.id);
        store.assignmentsFor(sid, year).forEach(function (a) {
          var rec = p.assignments[a.id];
          if (rec && rec.status === 'submitted') rows.push({ kind: 'assignment', student: st, subject: subject, item: a, rec: rec, max: a.maxScore || 20 });
        });
        store.projectsFor(sid, year).forEach(function (pr) {
          var rec = p.projects[pr.id];
          if (rec && rec.status === 'submitted') rows.push({ kind: 'project', student: st, subject: subject, item: pr, rec: rec, max: pr.maxScore || 20 });
        });
      });
    });
    return rows;
  }
})(window.HSE || (window.HSE = {}));

