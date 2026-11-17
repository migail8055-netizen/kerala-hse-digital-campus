/* Student views: dashboard, practical labs, classroom, lesson, progress. */
(function (HSE) {
  'use strict';
  var ui = HSE.ui, store = HSE.store;
  HSE.views = HSE.views || {};

  function me() { return store.currentUser(); }
  function yearLabel(y) { return y === 1 ? 'Plus One' : 'Plus Two'; }

  function overall(user) {
    var subs = store.subjectsOfStudent(user);
    var chaptersDone = 0, chaptersTotal = 0, scored = 0, total = 0, practicals = 0;
    subs.forEach(function (s) {
      var st = store.subjectStats(user.id, s, user.year);
      chaptersDone += st.chaptersDone; chaptersTotal += st.chaptersTotal; practicals += st.practicalsDone;
      var p = store.progressOf(user.id);
      p.attempts.filter(function (a) { return a.subjectId === s.id && a.year === user.year; })
        .forEach(function (a) { scored += a.score; total += a.total; });
    });
    return {
      subs: subs, chaptersDone: chaptersDone, chaptersTotal: chaptersTotal,
      pct: chaptersTotal ? Math.round(chaptersDone * 100 / chaptersTotal) : 0,
      avg: total ? Math.round(scored * 100 / total) : null,
      practicals: practicals
    };
  }

  function openWork(user) {
    var items = [];
    store.state.assignments.concat(store.state.projects).forEach(function (a) {
      if (user.subjects.indexOf(a.subjectId) === -1 || String(a.year) !== String(user.year)) return;
      var p = store.progressOf(user.id);
      var isProject = store.state.projects.indexOf(a) >= 0;
      var rec = (isProject ? p.projects : p.assignments)[a.id];
      if (rec && rec.status === 'graded') return;
      items.push({ item: a, rec: rec, project: isProject });
    });
    return items.sort(function (a, b) { return String(a.item.due).localeCompare(String(b.item.due)); });
  }

  HSE.views.dashboard = function () {
    var user = me();
    var sub = store.stream(user.stream);
    var stats = overall(user);
    var work = openWork(user);
    var next = null;
    stats.subs.some(function (s) {
      var list = s.chapters[user.year] || [];
      for (var i = 0; i < list.length; i++) {
        if (!store.isChapterDone(user.id, s.id, user.year, list[i].id)) { next = { subject: s, chapter: list[i] }; return true; }
      }
      return false;
    });
    var recent = store.progressOf(user.id).attempts.slice(0, 4);

    var subjectCards = stats.subs.map(function (s) {
      var st = store.subjectStats(user.id, s, user.year);
      return '<a class="subject-card" href="#/classroom/' + ui.attr(s.id) + '">' +
        '<div class="top"><span class="subject-icon" style="background:' + ui.streamAccent(s.streams[0]) + '1c;color:' + ui.streamAccent(s.streams[0]) + '">' + ui.esc(s.icon) + '</span>' +
        '<span><h3>' + ui.esc(s.name) + '</h3><span class="stream">' + ui.esc(s.short || '') + '</span></span></div>' +
        '<div><div class="row-between small"><span class="muted">' + st.chaptersDone + '/' + st.chaptersTotal + ' chapters</span>' +
        '<span class="muted">' + (st.avgScore === null ? 'no tests yet' : st.avgScore + '% average') + '</span></div>' +
        '<div class="bar" style="margin-top:.4rem"><span style="width:' + st.chapterPct + '%;background:' + ui.streamAccent(s.streams[0]) + '"></span></div></div>' +
        '<div class="foot"><span>' + st.practicalsDone + '/' + st.practicalsTotal + ' practicals</span><span>' + st.chapterPct + '%</span></div></a>';
    }).join('');

    var workHtml = work.length ? work.map(function (w) {
      var a = w.item;
      var subject = store.subject(a.subjectId);
      var status = w.rec ? (w.rec.status === 'submitted' ? 'submitted · awaiting evaluation' : 'in progress') : 'not started';
      return '<div class="chapter-item" style="align-items:flex-start">' +
        '<span class="no">' + (w.project ? 'P' : 'A') + '</span>' +
        '<span class="t"><b>' + ui.esc(a.title) + '</b><span>' + ui.esc(subject ? subject.name : '') +
        ' · due ' + ui.esc(ui.date(a.due)) + ' · ' + ui.esc(status) + '</span></span>' +
        '<a class="btn small" href="#/classroom/' + ui.attr(a.subjectId) + '">Open</a></div>';
    }).join('') : ui.emptyState('Nothing pending', 'Assignments and projects from your teachers will appear here.');

    var recentHtml = recent.length ? recent.map(function (a) {
      var subject = store.subject(a.subjectId);
      return '<li><div class="row-between"><b>' + ui.esc(a.title) + '</b><span class="pill ' + (a.score / a.total >= 0.6 ? '' : 'red') + '">' +
        a.score + '/' + a.total + '</span></div><div class="small muted">' + ui.esc(subject ? subject.name : '') + ' · ' +
        ui.esc(a.kind) + ' · ' + ui.esc(ui.relative(a.at)) + '</div></li>';
    }).join('') : '<li class="muted small">No tests attempted yet.</li>';

    var html =
      '<section class="hero" style="padding:1.6rem 1.8rem">' +
      '<div class="row-between" style="align-items:flex-start;position:relative;z-index:1">' +
      '<div><div class="tagline">' + ui.esc(yearLabel(user.year)) + ' · ' + ui.esc(sub ? sub.name : '') + '</div>' +
      '<h1 style="font-size:1.7rem">Good to see you, ' + ui.esc(user.name.split(' ')[0]) + '.</h1>' +
      '<p style="margin:0">' + ui.esc(sub ? sub.motivation : 'Learn something new today.') + '</p></div>' +
      '<div style="text-align:center">' + ui.ring(stats.pct, '#e7c77e', 84) + '<div class="small" style="color:#a9c9be;margin-top:.2rem">syllabus covered</div></div>' +
      '</div>' +
      '<div class="hero-stats">' +
      '<div><div class="k">' + stats.chaptersDone + '/' + stats.chaptersTotal + '</div><div class="l">Chapters</div></div>' +
      '<div><div class="k">' + (stats.avg === null ? '—' : stats.avg + '%') + '</div><div class="l">Test average</div></div>' +
      '<div><div class="k">' + stats.practicals + '</div><div class="l">Practicals done</div></div>' +
      '<div><div class="k">' + work.length + '</div><div class="l">Open tasks</div></div>' +
      '</div></section>' +

      (next ? '<div class="card" style="margin-top:1rem"><div class="row-between"><div>' +
        '<div class="small muted">Continue where you left off</div>' +
        '<h3 style="margin:.15rem 0 .2rem">' + ui.esc(next.chapter.title) + '</h3>' +
        '<div class="small muted">' + ui.esc(next.subject.name) + ' · ' + next.chapter.topics.length + ' topics · ' + next.chapter.hours + ' study hours</div></div>' +
        '<a class="btn primary" href="#/chapter/' + ui.attr(next.subject.id) + '/' + ui.attr(next.chapter.id) + '">Continue lesson</a></div></div>' : '') +

      '<div class="section-head"><div><h2>My subjects</h2><div class="sub">Your ' + ui.esc(yearLabel(user.year)) + ' classrooms</div></div>' +
      '<a class="btn small ghost" href="#/progress">Full progress</a></div>' +
      '<div class="grid cols-3">' + subjectCards + '</div>' +

      '<div class="split" style="margin-top:1.4rem">' +
      '<div class="card"><div class="row-between"><h3 style="margin:0">Assignments and projects</h3>' +
      '<span class="pill grey">' + work.length + ' open</span></div><div class="stack" style="margin-top:.8rem">' + workHtml + '</div></div>' +
      '<div class="card"><h3>Recent results</h3><ul class="list-clean">' + recentHtml + '</ul>' +
      '<a class="btn small ghost" style="margin-top:.8rem" href="#/progress">View all results</a></div>' +
      '</div>' +
      '<div class="card flat" style="margin-top:1.2rem"><div class="row-between">' +
      '<div><b>Practical classes</b><div class="small muted">Experiments and simulations for your subjects, open in the browser.</div></div>' +
      '<a class="btn primary small" href="#/practical-classes">Open practical classes</a></div></div>';

    return { title: 'Dashboard', html: html };
  };

  function practicalClassUrl(year, subject, status) {
    return '#/practical-classes?year=' + encodeURIComponent(year) +
      '&subject=' + encodeURIComponent(subject || 'all') +
      '&status=' + encodeURIComponent(status || 'all');
  }

  HSE.views.labs = function (params, query) {
    var user = me();
    var q = query || {};
    var year = String(q.year) === '2' ? 2 : 1;
    var status = ['todo', 'done'].indexOf(q.status) >= 0 ? q.status : 'all';
    var subs = store.subjectsOfStudent(user);
    var subjectIds = subs.map(function (s) { return s.id; });
    var subjectFilter = subjectIds.indexOf(q.subject) >= 0 ? q.subject : 'all';

    var groups = [];
    var totals = { total: 0, done: 0 };
    subs.forEach(function (s) {
      if (subjectFilter !== 'all' && s.id !== subjectFilter) return;
      var seen = {};
      var items = s.practicals.map(function (p) {
        return { id: p.id, title: p.title, brief: p.brief, source: 'Core practical' };
      }).concat(store.practicalActivitiesFor(s.id, year).map(function (p) {
        return { id: p.id, title: p.title, brief: p.brief, source: 'Teacher-set' };
      })).filter(function (p) {
        if (seen[p.id]) return false;
        seen[p.id] = true;
        return true;
      });
      if (!items.length) return;

      items.forEach(function (p) { p.done = store.practicalDone(user.id, p.id); });
      var done = items.filter(function (p) { return p.done; }).length;
      totals.total += items.length;
      totals.done += done;
      var visible = items.filter(function (p) {
        if (status === 'done') return p.done;
        if (status === 'todo') return !p.done;
        return true;
      });
      groups.push({ subject: s, items: visible, done: done, total: items.length, pct: Math.round(done * 100 / items.length) });
    });

    var subjectOptions = '<option value="all">All my subjects</option>' + subs.map(function (s) {
      return '<option value="' + ui.attr(s.id) + '"' + (subjectFilter === s.id ? ' selected' : '') + '>' +
        ui.esc(s.name) + '</option>';
    }).join('');

    var subjectBlocks = groups.filter(function (g) { return g.items.length; }).map(function (g) {
      var s = g.subject;
      var accent = ui.streamAccent(s.streams[0]);
      var tiles = g.items.map(function (p) {
        return '<a class="lab-tile" href="#/lab/' + ui.attr(s.id) + '/' + ui.attr(p.id) + '">' +
          '<span class="ico">' + (p.done ? '✓' : '⚗') + '</span>' +
          '<span style="flex:1"><b>' + ui.esc(p.title) + '</b>' +
          '<span class="meta" style="display:block">' + ui.esc(p.brief) + '</span>' +
          '<span class="small muted" style="display:block;margin-top:.25rem">' + ui.esc(p.source) + '</span></span>' +
          '<span class="pill ' + (p.done ? '' : 'grey') + '">' + (p.done ? 'completed' : 'not started') + '</span></a>';
      }).join('');
      return '<section class="card pc-subject">' +
        '<div class="pc-subject-head">' +
        '<div class="row" style="gap:.65rem">' +
        '<span class="subject-icon" style="background:' + accent + '1c;color:' + accent + '">' + ui.esc(s.icon) + '</span>' +
        '<div><h3 style="margin:0">' + ui.esc(s.name) + '</h3>' +
        '<div class="small muted">' + ui.esc(yearLabel(year)) + ' · ' + g.done + ' of ' + g.total + ' completed</div></div></div>' +
        '<div class="pc-subject-progress"><span class="small muted">' + g.pct + '%</span>' +
        '<div class="bar"><span style="width:' + g.pct + '%;background:' + accent + '"></span></div></div></div>' +
        '<div class="grid" style="margin-top:.85rem;gap:.6rem">' + tiles + '</div></section>';
    }).join('');

    var pct = totals.total ? Math.round(totals.done * 100 / totals.total) : 0;
    var stream = store.stream(user.stream);
    var yearNotice = String(year) === String(user.year) ? '' :
      '<div class="panel soft small" style="margin-bottom:1rem"><b>Previewing ' + ui.esc(yearLabel(year)) +
      '.</b> Your enrolled class is ' + ui.esc(yearLabel(user.year)) +
      '. Core practicals are shared; teacher-set practicals can differ by class.</div>';

    var summary = '<div class="grid cols-3 pc-summary">' +
      '<div class="card"><div class="small muted">In this view</div><div class="pc-k">' + totals.total + '</div>' +
      '<div class="small muted">practical classes for ' + ui.esc(yearLabel(year)) + '</div></div>' +
      '<div class="card"><div class="small muted">Completed</div><div class="pc-k">' + totals.done + '</div>' +
      '<div class="small muted">saved in My progress</div></div>' +
      '<div class="card"><div class="small muted">View progress</div><div class="pc-k">' + pct + '%</div>' +
      '<div class="bar" style="margin-top:.45rem"><span style="width:' + pct + '%"></span></div></div></div>';

    var filter = '<form class="card pc-filter" id="pc-filter">' +
      '<div class="pc-filter-grid">' +
      '<label class="field"><span class="lbl">Class</span><select name="year">' +
      '<option value="1"' + (year === 1 ? ' selected' : '') + '>Plus One</option>' +
      '<option value="2"' + (year === 2 ? ' selected' : '') + '>Plus Two</option></select></label>' +
      '<label class="field"><span class="lbl">Subject</span><select name="subject">' + subjectOptions + '</select></label>' +
      '<label class="field"><span class="lbl">Status</span><select name="status">' +
      '<option value="all"' + (status === 'all' ? ' selected' : '') + '>All practicals</option>' +
      '<option value="todo"' + (status === 'todo' ? ' selected' : '') + '>Not started</option>' +
      '<option value="done"' + (status === 'done' ? ' selected' : '') + '>Completed</option></select></label>' +
      '<div class="pc-filter-actions"><button class="btn primary" type="submit">Show classes</button>' +
      '<a class="btn ghost" href="' + practicalClassUrl(user.year, 'all', 'all') + '">Reset</a></div>' +
      '</div></form>';

    var empty = totals.total ?
      ui.emptyState('No practical classes match these filters', 'Choose another subject or status to see your practical classes.',
        '<a class="btn primary" href="' + practicalClassUrl(year, 'all', 'all') + '">Clear filters</a>') :
      ui.emptyState('No practical classes for your subjects yet', 'Your school can add practical activities from the teacher console.');

    return {
      title: 'Practical classes',
      html: '<div class="section-head"><div><h1 style="margin:0">Practical classes</h1>' +
        '<div class="sub">Experiments, simulations and studio work for ' + ui.esc(yearLabel(year)) +
        ' · ' + ui.esc(stream ? stream.name : '') + '</div></div>' +
        '<a class="btn small ghost" href="#/dashboard">Dashboard</a></div>' +
        yearNotice + summary + filter +
        '<div class="section-head"><div><h2>' + ui.esc(yearLabel(year)) + ' practical classes</h2>' +
        '<div class="sub">' + (subjectFilter === 'all' ? 'All your subjects' : 'One subject') +
        ' · grouped by subject · ' + totals.done + ' of ' + totals.total + ' completed</div></div></div>' +
        (subjectBlocks || empty),
      mount: function (root) {
        var form = root.querySelector('#pc-filter');
        if (!form) return;
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var y = form.querySelector('[name="year"]').value;
          var s = form.querySelector('[name="subject"]').value;
          var st = form.querySelector('[name="status"]').value;
          window.location.hash = practicalClassUrl(y, s, st);
        });
      }
    };
  };

  HSE.views.classroom = function (params) {
    var user = me();
    var subject = store.subject(params.subject);
    if (!subject) return { html: '<div class="card">Subject not found. <a href="#/dashboard">Back</a></div>' };
    if (user.subjects.indexOf(subject.id) === -1) {
      return { html: '<div class="card"><h2>' + ui.esc(subject.name) + '</h2><p class="muted">This subject is not in your combination.</p>' +
        '<a class="btn" href="#/dashboard">Back to dashboard</a></div>' };
    }
    var year = user.year;
    var chapters = subject.chapters[year] || [];
    var st = store.subjectStats(user.id, subject, year);
    var accent = ui.streamAccent(subject.streams[0]);

    var chapterHtml = chapters.map(function (c, i) {
      var done = store.isChapterDone(user.id, subject.id, year, c.id);
      return '<a class="chapter-item ' + (done ? 'done' : '') + '" href="#/chapter/' + ui.attr(subject.id) + '/' + ui.attr(c.id) + '">' +
        '<span class="no">' + (done ? '✓' : (i + 1)) + '</span>' +
        '<span class="t"><b>' + ui.esc(c.title) + '</b><span>' + c.topics.length + ' topics · ' + c.hours + ' hours · ' +
        ui.esc(c.topics.slice(0, 3).join(', ')) + (c.topics.length > 3 ? '…' : '') + '</span></span>' +
        '<span class="pill ' + (done ? '' : 'grey') + '">' + (done ? 'completed' : 'open') + '</span></a>';
    }).join('');

    var labHtml = subject.practicals.concat(store.practicalActivitiesFor(subject.id, year)).map(function (p) {
      var done = store.practicalDone(user.id, p.id);
      return '<a class="lab-tile" href="#/lab/' + ui.attr(subject.id) + '/' + ui.attr(p.id) + '">' +
        '<span class="ico">' + (done ? '✓' : '⚗') + '</span><span style="flex:1"><b>' + ui.esc(p.title) + '</b>' +
        '<span class="meta" style="display:block">' + ui.esc(p.brief) + '</span></span></a>';
    }).join('');

    var mats = store.materialsFor(subject.id, year);
    var matHtml = mats.length ? mats.map(function (m) {
      return '<div class="panel soft"><div class="row-between"><b>' + ui.esc(m.title) + '</b>' +
        '<span class="small muted">' + ui.esc(ui.relative(m.at)) + '</span></div>' +
        '<div class="small muted" style="margin-top:.3rem">' + ui.esc(m.body) + '</div>' +
        (m.url ? '<a class="small" href="' + ui.attr(m.url) + '" target="_blank" rel="noopener">Open link</a>' : '') + '</div>';
    }).join('') : '<div class="small muted">No teacher material uploaded for this class yet.</div>';

    var assigns = store.assignmentsFor(subject.id, year);
    var assignHtml = assigns.length ? assigns.map(function (a) {
      var rec = store.progressOf(user.id).assignments[a.id];
      var status = rec ? (rec.status === 'graded' ? 'graded ' + rec.score + '/' + a.maxScore : 'submitted') : 'not submitted';
      return '<div class="chapter-item" style="align-items:flex-start"><span class="no">A</span>' +
        '<span class="t"><b>' + ui.esc(a.title) + '</b><span>Due ' + ui.esc(ui.date(a.due)) + ' · ' + status + '</span></span>' +
        '<button class="btn small" data-assign="' + ui.attr(a.id) + '">Open</button></div>';
    }).join('') : '<div class="small muted">No assignments for this subject yet.</div>';

    var projects = store.projectsFor(subject.id, year);
    var projectHtml = projects.length ? projects.map(function (p) {
      var rec = store.progressOf(user.id).projects[p.id];
      return '<div class="chapter-item" style="align-items:flex-start"><span class="no">P</span>' +
        '<span class="t"><b>' + ui.esc(p.title) + '</b><span>' + ui.esc(p.brief) + '</span></span>' +
        (rec && rec.status === 'graded' ? '<span class="pill">' + rec.score + '/' + (p.maxScore || 20) + '</span>' :
          rec && rec.status === 'submitted' ? '<span class="pill grey">submitted</span>' :
          '<button class="btn small" data-project="' + ui.attr(p.id) + '">Submit</button>') + '</div>';
    }).join('') : '<div class="small muted">No projects assigned yet.</div>';

    var assessments = store.assessmentsFor(subject.id, year);
    var assessHtml = assessments.length ? assessments.map(function (a) {
      var attempts = store.progressOf(user.id).attempts.filter(function (x) { return x.assessmentId === a.id; });
      var best = attempts.reduce(function (m, x) { return Math.max(m, x.score); }, -1);
      return '<div class="chapter-item"><span class="no">E</span><span class="t"><b>' + ui.esc(a.title) + '</b>' +
        '<span>' + a.questions.length + ' questions' + (best >= 0 ? ' · best ' + best + '/' + a.questions.length : '') + '</span></span>' +
        '<a class="btn small primary" href="#/test/' + ui.attr(subject.id) + '/' + ui.attr(a.id) + '">Take</a></div>';
    }).join('') : '<div class="small muted">No teacher assessments published yet.</div>';

    var html = '<div class="breadcrumb"><a href="#/dashboard">Dashboard</a> / ' + ui.esc(subject.name) + '</div>' +
      '<div class="card" style="border-top:4px solid ' + accent + '">' +
      '<div class="subhead"><div class="row" style="gap:.8rem;align-items:flex-start">' +
      '<span class="subject-icon" style="background:' + accent + '1c;color:' + accent + ';width:48px;height:48px;font-size:1.35rem">' + ui.esc(subject.icon) + '</span>' +
      '<div><h1 style="margin:0;font-size:1.55rem">' + ui.esc(subject.name) + '</h1>' +
      '<div class="small muted">' + ui.esc(yearLabel(year)) + ' · ' + ui.esc(subject.short || '') + ' · ' + ui.esc(subject.description) + '</div></div></div>' +
      '<div class="row" style="text-align:center">' + ui.ring(st.chapterPct, accent, 62) + '</div></div>' +
      '<div class="stat-row" style="margin-top:1rem">' +
      '<div class="readout"><div class="k">Chapters done</div><div class="v">' + st.chaptersDone + '/' + st.chaptersTotal + '</div></div>' +
      '<div class="readout"><div class="k">Test average</div><div class="v">' + (st.avgScore === null ? '—' : st.avgScore + '%') + '</div></div>' +
      '<div class="readout"><div class="k">Practicals</div><div class="v">' + st.practicalsDone + '/' + st.practicalsTotal + '</div></div>' +
      '<div class="readout"><div class="k">Attempts</div><div class="v">' + st.attempts + '</div></div>' +
      '</div></div>' +

      '<div class="split" style="margin-top:1.2rem">' +
      '<div class="stack">' +
      '<div class="card"><div class="row-between"><h2 style="margin:0">Chapters</h2>' +
      '<span class="pill grey">' + chapters.length + ' chapters</span></div>' +
      '<div class="stack" style="margin-top:.8rem">' + chapterHtml + '</div>' +
      '<div class="row" style="margin-top:.9rem"><a class="btn small" href="#/exam/' + ui.attr(subject.id) + '">Full chapter examination</a>' +
      '<span class="small muted">Covers the whole ' + ui.esc(yearLabel(year)) + ' question bank.</span></div></div>' +
      '<div class="card"><h2>Practical classes</h2><div class="grid" style="gap:.6rem">' + (labHtml || '<div class="small muted">No practical classes configured.</div>') + '</div></div>' +
      '<div class="card"><h2>Teacher material</h2><div class="stack">' + matHtml + '</div></div>' +
      '</div>' +
      '<div class="stack">' +
      '<div class="card"><h3>Assignments</h3><div class="stack">' + assignHtml + '</div></div>' +
      '<div class="card"><h3>Projects</h3><div class="stack">' + projectHtml + '</div></div>' +
      '<div class="card"><h3>Assessments</h3><div class="stack">' + assessHtml + '</div></div>' +
      '<div class="card flat"><h3>Study plan</h3><p class="small muted">Aim for one chapter per week and one practical per chapter. ' +
      'Chapter tests are short (three questions); the examination mixes the whole year.</p></div>' +
      '</div></div>';

    return { title: subject.name, html: html, mount: function (root) {
      root.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-assign]');
        if (!btn) return;
        var assignment = store.state.assignments.filter(function (a) { return a.id === btn.getAttribute('data-assign'); })[0];
        if (!assignment) return;
        var rec = store.progressOf(user.id).assignments[assignment.id] || {};
        ui.modal({
          title: assignment.title,
          subtitle: 'Due ' + ui.date(assignment.due) + ' · ' + assignment.maxScore + ' marks',
          confirm: 'Submit work',
          body: '<p class="small muted">' + ui.esc(assignment.brief) + '</p>' +
            (rec.status === 'graded' ? '<div class="panel soft small">Teacher feedback: ' + ui.esc(rec.feedback || '—') +
              ' · score ' + rec.score + '/' + assignment.maxScore + '</div>' : '') +
            '<label class="field"><span class="lbl">Your submission</span>' +
            '<textarea id="submission" maxlength="4000" placeholder="Describe your work, answers or file names…">' +
            ui.esc(rec.text || '') + '</textarea></label>',
          onConfirm: function (bodyEl) {
            var text = bodyEl.querySelector('#submission').value.trim();
            if (text.length < 10) { ui.toast('Write at least a short description of your work.', 'error'); return false; }
            store.submitAssignment(user.id, assignment.id, text);
            store.log(user.name + ' submitted ' + assignment.title + '.');
            ui.toast('Submitted for teacher evaluation.');
            HSE.app.render();
          }
        });
      });
      root.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-project]');
        if (!btn) return;
        var project = store.state.projects.filter(function (p) { return p.id === btn.getAttribute('data-project'); })[0];
        if (!project) return;
        var rec = store.progressOf(user.id).projects[project.id] || {};
        ui.modal({
          title: project.title, subtitle: 'Project · due ' + ui.date(project.due), confirm: 'Submit project',
          body: '<p class="small muted">' + ui.esc(project.brief) + '</p>' +
            '<label class="field"><span class="lbl">Project summary</span><textarea id="project-text" maxlength="4000" ' +
            'placeholder="Summarise your method, findings and conclusion…">' + ui.esc(rec.text || '') + '</textarea></label>',
          onConfirm: function (bodyEl) {
            var text = bodyEl.querySelector('#project-text').value.trim();
            if (text.length < 15) { ui.toast('Add a short project summary first.', 'error'); return false; }
            store.submitProject(user.id, project.id, text);
            store.log(user.name + ' submitted project ' + project.title + '.');
            ui.toast('Project submitted.');
            HSE.app.render();
          }
        });
      });
    } };
  };

  /* ---------- lesson content ---------- */
  var STREAM_LENS = {
    science: {
      why: 'Science learns by measuring, testing and revising. This chapter gives you the vocabulary and the model, and the lab work tests whether the model survives contact with reality.',
      method: 'Work through the derivation or mechanism once with the book closed, then check it. If you cannot reproduce it, the gap is in the previous step, not in this one.',
      exam: 'Examinations reward correct units, labelled diagrams and stated assumptions. Show the formula first, then substitute, then give the unit.'
    },
    commerce: {
      why: 'Commerce is about decisions with numbers attached. Every entry, ratio and policy you meet here has a counterpart in a real firm, so keep asking who pays, who benefits and what is recorded.',
      method: 'Practise with a small firm of your own: a few transactions, a ledger, a trial balance. The arithmetic becomes obvious once the story behind it is clear.',
      exam: 'Examiners look for the correct format, working notes and a clear final figure. A right answer in the wrong format loses marks.'
    },
    humanities: {
      why: 'Humanities explains how people live together: how power, memory, space and meaning are organised. Read this chapter as an argument, not a list.',
      method: 'For every claim, ask what evidence supports it and what a critic would say. Write one paragraph of your own for each major idea.',
      exam: 'Strong answers define terms, give one concrete example and take a position. Dates and names matter, but the reasoning carries the marks.'
    }
  };

  function explainTopic(topic, subject) {
    var openers = [
      'Start with what ' + topic.toLowerCase() + ' means and why the syllabus places it here.',
      'Look for the pattern first: what changes, what stays constant, and what is being compared in ' + topic.toLowerCase() + '?',
      'Break ' + topic.toLowerCase() + ' into its parts, then rebuild it in your own words.',
      'Ask what problem ' + topic.toLowerCase() + ' was invented to solve.'
    ];
    var pick = 0;
    for (var i = 0; i < topic.length; i++) pick = (pick + topic.charCodeAt(i)) % openers.length;
    return openers[pick] + ' In ' + subject.name + ', this topic connects to the rest of the chapter: define the key terms, ' +
      'work one example end to end, and then explain the result to someone who has not read the chapter. ' +
      'If you can teach it, you know it.';
  }

  function lessonSections(subject, chapter, year) {
    var lens = STREAM_LENS[subject.streams[0]] || STREAM_LENS.science;
    var sections = [{ h: 'Why this chapter matters', p: lens.why }];
    chapter.topics.forEach(function (t) {
      sections.push({ h: t, p: explainTopic(t, subject) });
    });
    sections.push({ h: 'How to study this chapter', p: lens.method + ' Plan about ' + chapter.hours + ' hours: read, practise, then test yourself.' });
    if (subject.practicals.length) {
      sections.push({
        h: 'Practical connection',
        p: 'This chapter is used in the lab: ' + subject.practicals[0].title + '. ' + subject.practicals[0].brief +
          ' Record what you did, what you observed and one thing you would change.'
      });
    }
    sections.push({ h: 'Examination focus (' + yearLabel(year) + ')', p: lens.exam });
    return sections;
  }

  HSE.views.chapter = function (params) {
    var user = me();
    var subject = store.subject(params.subject);
    if (!subject) return { html: '<div class="card">Subject not found. <a href="#/dashboard">Back</a></div>' };
    var year = user.year;
    var chapters = subject.chapters[year] || [];
    var idx = -1;
    for (var i = 0; i < chapters.length; i++) if (chapters[i].id === params.chapter) idx = i;
    if (idx < 0) return { html: '<div class="card"><h2>Chapter not found</h2><p class="muted">It may belong to another class.</p>' +
      '<a class="btn" href="#/classroom/' + ui.attr(subject.id) + '">Back to ' + ui.esc(subject.name) + '</a></div>' };
    var chapter = chapters[idx];
    var prev = idx > 0 ? chapters[idx - 1] : null;
    var next = idx < chapters.length - 1 ? chapters[idx + 1] : null;
    var done = store.isChapterDone(user.id, subject.id, year, chapter.id);
    var sections = lessonSections(subject, chapter, year);
    var mats = store.materialsFor(subject.id, year, chapter.id);
    var noteKey = subject.id + ':' + year + ':' + chapter.id;
    var notes = (store.progressOf(user.id).notes || {})[noteKey] || '';

    var html = '<div class="breadcrumb"><a href="#/dashboard">Dashboard</a> / ' +
      '<a href="#/classroom/' + ui.attr(subject.id) + '">' + ui.esc(subject.name) + '</a> / Chapter ' + (idx + 1) + '</div>' +
      '<div class="split"><div class="stack">' +
      '<article class="card card-pad-lg"><div class="row-between"><span class="pill grey">Chapter ' + (idx + 1) + ' of ' + chapters.length + '</span>' +
      '<span class="small muted">' + chapter.hours + ' study hours · ' + ui.esc(yearLabel(year)) + '</span></div>' +
      '<h1 style="margin-top:.6rem">' + ui.esc(chapter.title) + '</h1>' +
      '<div class="row small muted">' + chapter.topics.map(function (t) { return '<span class="pill outline">' + ui.esc(t) + '</span>'; }).join('') + '</div>' +
      '<div class="lesson-body" style="margin-top:1rem">' + sections.map(function (s) {
        return '<h3>' + ui.esc(s.h) + '</h3><p>' + ui.esc(s.p) + '</p>';
      }).join('') + '</div>' +
      '<div class="panel soft" style="margin-top:1rem"><b class="small">Chapter checklist</b>' +
      '<div class="small muted">Define every key term · draw the main diagram or table · solve one full example · ' +
      'attempt the chapter test · record the practical observation.</div></div>' +
      '<div class="btn-row" style="margin-top:1.1rem">' +
      '<button class="btn ' + (done ? 'subtle' : 'primary') + '" data-complete="' + (done ? '0' : '1') + '">' +
      (done ? 'Marked complete ✓' : 'Mark chapter complete') + '</button>' +
      '<a class="btn" href="#/test/' + ui.attr(subject.id) + '/' + ui.attr(chapter.id) + '">Take chapter test</a>' +
      '<a class="btn ghost" href="#/classroom/' + ui.attr(subject.id) + '">All chapters</a></div>' +
      '</article>' +
      (mats.length ? '<div class="card"><h3>Teacher material for this chapter</h3><div class="stack">' +
        mats.map(function (m) {
          return '<div class="panel soft"><b>' + ui.esc(m.title) + '</b><div class="small muted" style="margin-top:.25rem">' +
            ui.esc(m.body) + '</div>' + (m.url ? '<a class="small" href="' + ui.attr(m.url) + '" target="_blank" rel="noopener">Open link</a>' : '') + '</div>';
        }).join('') + '</div></div>' : '') +
      '<div class="card"><h3>My notes</h3><p class="small muted">Saved in this browser for your revision.</p>' +
      '<textarea id="chapter-notes" maxlength="4000" placeholder="Write the ideas you want to remember…">' + ui.esc(notes) + '</textarea>' +
      '<div class="row" style="margin-top:.6rem"><button class="btn small" id="save-notes">Save notes</button>' +
      '<span class="small muted" id="notes-status"></span></div></div>' +
      '<div class="row-between">' + (prev ? '<a class="btn small ghost" href="#/chapter/' + ui.attr(subject.id) + '/' + ui.attr(prev.id) + '">← ' + ui.esc(prev.title) + '</a>' : '<span></span>') +
      (next ? '<a class="btn small" href="#/chapter/' + ui.attr(subject.id) + '/' + ui.attr(next.id) + '">' + ui.esc(next.title) + ' →</a>' : '') + '</div>' +
      '</div>' +
      '<aside class="stack"><div class="card"><h3>Chapter map</h3><div class="topic-list">' +
      chapter.topics.map(function (t) { return '<div class="topic"><span class="dot"></span><span>' + ui.esc(t) + '</span></div>'; }).join('') +
      '</div></div>' +
      '<div class="card"><h3>Practice</h3><div class="stack">' +
      '<a class="lab-tile" href="#/test/' + ui.attr(subject.id) + '/' + ui.attr(chapter.id) + '"><span class="ico">✎</span>' +
      '<span><b>Chapter test</b><span class="meta" style="display:block">Three questions with explanations</span></span></a>' +
      (subject.practicals.length ? '<a class="lab-tile" href="#/lab/' + ui.attr(subject.id) + '/' + ui.attr(subject.practicals[0].id) + '"><span class="ico">⚗</span>' +
        '<span><b>' + ui.esc(subject.practicals[0].title) + '</b><span class="meta" style="display:block">Practical lab</span></span></a>' : '') +
      '</div></div></aside></div>';

    return {
      title: chapter.title, html: html, mount: function (root) {
        var complete = root.querySelector('[data-complete]');
        if (complete) complete.addEventListener('click', function () {
          var makeDone = complete.getAttribute('data-complete') === '1';
          store.markChapter(user.id, subject.id, year, chapter.id, makeDone);
          if (makeDone) store.log(user.name + ' completed ' + chapter.title + ' in ' + subject.name + '.');
          ui.toast(makeDone ? 'Chapter marked complete.' : 'Chapter reopened.');
          HSE.app.render();
        });
        var notesEl = root.querySelector('#chapter-notes');
        root.querySelector('#save-notes').addEventListener('click', function () {
          var p = store.progressOf(user.id);
          if (!p.notes) p.notes = {};
          p.notes[noteKey] = notesEl.value.slice(0, 4000);
          store.save();
          root.querySelector('#notes-status').textContent = 'Saved ' + ui.relative(store.now());
          ui.toast('Notes saved.');
        });
      }
    };
  };

  HSE.views.progress = function () {
    var user = me();
    var subs = store.subjectsOfStudent(user);
    var p = store.progressOf(user.id);
    var stats = overall(user);
    var accent = ui.streamAccent(user.stream);

    var rows = subs.map(function (s) {
      var st = store.subjectStats(user.id, s, user.year);
      var graded = Object.keys(p.assignments).filter(function (id) {
        var a = store.state.assignments.filter(function (x) { return x.id === id; })[0];
        return a && a.subjectId === s.id && p.assignments[id].status === 'graded';
      });
      var scored = graded.reduce(function (n, id) { return n + (p.assignments[id].score || 0); }, 0);
      var max = graded.reduce(function (n, id) {
        var a = store.state.assignments.filter(function (x) { return x.id === id; })[0];
        return n + (a.maxScore || 20);
      }, 0);
      return '<tr><td><b>' + ui.esc(s.name) + '</b></td>' +
        '<td class="num">' + st.chaptersDone + '/' + st.chaptersTotal + '</td>' +
        '<td><div class="bar" style="min-width:90px"><span style="width:' + st.chapterPct + '%;background:' + ui.streamAccent(s.streams[0]) + '"></span></div></td>' +
        '<td class="num">' + st.attempts + '</td>' +
        '<td class="num">' + (st.avgScore === null ? '—' : st.avgScore + '%') + '</td>' +
        '<td class="num">' + st.practicalsDone + '/' + st.practicalsTotal + '</td>' +
        '<td class="num">' + (graded.length ? scored + '/' + max : '—') + '</td></tr>';
    }).join('');

    var attempts = p.attempts.slice(0, 30);
    var attemptRows = attempts.length ? attempts.map(function (a) {
      var s = store.subject(a.subjectId);
      var pct = Math.round(a.score * 100 / a.total);
      return '<tr><td>' + ui.esc(ui.dateTime(a.at)) + '</td><td>' + ui.esc(s ? s.name : a.subjectId) + '</td>' +
        '<td>' + ui.esc(a.title) + '</td><td>' + ui.esc(a.kind) + '</td>' +
        '<td class="num">' + a.score + '/' + a.total + '</td>' +
        '<td class="num"><span class="pill ' + (pct >= 60 ? '' : 'red') + '">' + pct + '%</span></td></tr>';
    }).join('') : '<tr><td colspan="6" class="muted">No attempts yet. Start with a chapter test.</td></tr>';

    var feedback = [];
    Object.keys(p.assignments).forEach(function (id) {
      var rec = p.assignments[id];
      if (rec.status === 'graded') {
        var a = store.state.assignments.filter(function (x) { return x.id === id; })[0];
        if (a) feedback.push({ title: a.title, subject: store.subject(a.subjectId), score: rec.score, max: a.maxScore, text: rec.feedback, at: rec.gradedAt });
      }
    });
    Object.keys(p.projects).forEach(function (id) {
      var rec = p.projects[id];
      if (rec.status === 'graded') {
        var pr = store.state.projects.filter(function (x) { return x.id === id; })[0];
        if (pr) feedback.push({ title: pr.title, subject: store.subject(pr.subjectId), score: rec.score, max: pr.maxScore || 20, text: rec.feedback, at: rec.gradedAt });
      }
    });

    var feedbackHtml = feedback.length ? feedback.map(function (f) {
      return '<div class="panel soft"><div class="row-between"><b>' + ui.esc(f.title) + '</b>' +
        '<span class="pill">' + f.score + '/' + f.max + '</span></div>' +
        '<div class="small muted">' + ui.esc(f.subject ? f.subject.name : '') + ' · evaluated ' + ui.esc(ui.relative(f.at)) + '</div>' +
        (f.text ? '<div class="small" style="margin-top:.35rem">' + ui.esc(f.text) + '</div>' : '') + '</div>';
    }).join('') : '<div class="small muted">No evaluated work yet. Submit an assignment or project for teacher feedback.</div>';

    var labsDone = Object.keys(p.practicals).map(function (id) {
      var r = p.practicals[id];
      return '<li><div class="row-between"><span>' + ui.esc(r.title || id) + '</span>' +
        '<span class="pill">' + r.score + '/' + r.max + '</span></div>' +
        '<div class="small muted">' + ui.esc(ui.relative(r.at)) + '</div></li>';
    }).join('');

    var html = '<div class="section-head"><div><h1 style="margin:0">My progress</h1>' +
      '<div class="sub">' + ui.esc(yearLabel(user.year)) + ' · ' + ui.esc(store.stream(user.stream) ? store.stream(user.stream).name : '') +
      ' · ' + subs.length + ' subjects</div></div>' +
      '<div class="row"><button class="btn small ghost" onclick="window.print()">Print report</button>' +
      '<a class="btn small" href="#/dashboard">Dashboard</a></div></div>' +
      '<div class="grid cols-4">' +
      '<div class="card"><div class="ring-wrap">' + ui.ring(stats.pct, accent, 58) +
      '<div class="kpi"><div class="k">' + stats.chaptersDone + '/' + stats.chaptersTotal + '</div><div class="l">Chapters</div></div></div></div>' +
      '<div class="card"><div class="kpi"><div class="k">' + (stats.avg === null ? '—' : stats.avg + '%') + '</div><div class="l">Test average</div></div>' +
      '<div class="small muted">' + p.attempts.length + ' attempts recorded</div></div>' +
      '<div class="card"><div class="kpi"><div class="k">' + stats.practicals + '</div><div class="l">Practicals done</div></div>' +
      '<div class="small muted">Across your subjects</div></div>' +
      '<div class="card"><div class="kpi"><div class="k">' + feedback.length + '</div><div class="l">Evaluated</div></div>' +
      '<div class="small muted">Assignments and projects</div></div>' +
      '</div>' +
      '<div class="section-head"><h2>Subject-wise progress</h2></div>' +
      '<div class="table-wrap"><table><thead><tr><th>Subject</th><th class="num">Chapters</th><th>Syllabus</th>' +
      '<th class="num">Tests</th><th class="num">Average</th><th class="num">Practicals</th><th class="num">Assignments</th></tr></thead>' +
      '<tbody>' + rows + '</tbody></table></div>' +
      '<div class="split" style="margin-top:1.3rem">' +
      '<div class="card"><h3>Test and examination history</h3><div class="table-wrap"><table><thead><tr>' +
      '<th>When</th><th>Subject</th><th>Title</th><th>Type</th><th class="num">Score</th><th class="num">%</th></tr></thead><tbody>' +
      attemptRows + '</tbody></table></div></div>' +
      '<div class="stack"><div class="card"><h3>Teacher feedback</h3><div class="stack">' + feedbackHtml + '</div></div>' +
      '<div class="card"><h3>Practical work</h3>' + (labsDone ? '<ul class="list-clean">' + labsDone + '</ul>' :
        '<div class="small muted">No practical completed yet. <a href="#/practical-classes">Open practical classes</a>.</div>') + '</div></div>' +
      '</div>';
    return { title: 'My progress', html: html };
  };
})(window.HSE = window.HSE || {});

