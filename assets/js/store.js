/* Local data store. Everything persists in this browser (localStorage).
   No server is involved: accounts and content are local to the device. */
(function (HSE) {
  'use strict';

  var KEY = 'kerala-hse-v1';
  var store = HSE.store = { KEY: KEY, state: null };

  store.uid = function (prefix) {
    return (prefix || 'id') + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
  };
  store.now = function () { return new Date().toISOString(); };

  store.fresh = function () {
    var curriculum = HSE.buildCurriculum();
    var teacherId = 'u-teacher-1';
    var adminId = 'u-admin-1';
    var s1 = 'u-student-1', s2 = 'u-student-2', s3 = 'u-student-3';
    var users = [
      { id: adminId, role: 'admin', name: 'Dr. Anil Kumar', email: 'admin@school.kerala', school: curriculum.school.name, createdAt: store.now() },
      { id: teacherId, role: 'teacher', name: 'Meera Nair', email: 'meera@school.kerala', subjects: ['physics', 'chemistry', 'mathematics', 'english'], streams: ['science'], createdAt: store.now() },
      { id: 'u-teacher-2', role: 'teacher', name: 'Suresh Menon', email: 'suresh@school.kerala', subjects: ['accountancy', 'business-studies', 'economics'], streams: ['commerce'], createdAt: store.now() },
      { id: 'u-teacher-3', role: 'teacher', name: 'Latha Pillai', email: 'latha@school.kerala', subjects: ['history', 'political-science', 'geography', 'sociology', 'psychology', 'malayalam'], streams: ['humanities'], createdAt: store.now() },
      { id: s1, role: 'student', name: 'Aiswarya R.', email: 'aiswarya@student.kerala', stream: 'science', year: 1, subjects: ['english', 'physics', 'chemistry', 'mathematics', 'biology', 'computer-science'], createdAt: store.now() },
      { id: s2, role: 'student', name: 'Rahul K.', email: 'rahul@student.kerala', stream: 'commerce', year: 2, subjects: ['english', 'accountancy', 'business-studies', 'economics', 'business-maths', 'computer-application'], createdAt: store.now() },
      { id: s3, role: 'student', name: 'Fatima S.', email: 'fatima@student.kerala', stream: 'humanities', year: 1, subjects: ['english', 'malayalam', 'history', 'political-science', 'geography', 'psychology'], createdAt: store.now() }
    ];
    var now = store.now();
    var materials = [
      { id: 'm-1', subjectId: 'physics', year: 1, chapterId: 'physics-y1-c1', title: 'SI units and dimensional analysis — teacher notes', body: 'Dimensional analysis is a checking tool. Every physical quantity can be written as a product of powers of M, L, T. Work through the worked examples in the textbook and then attempt the three practice questions at the end of this note.', url: '', teacherId: teacherId, at: now },
      { id: 'm-2', subjectId: 'accountancy', year: 2, chapterId: 'accountancy-y2-c1', title: 'Partnership deed checklist', body: 'Before posting any partnership entry, confirm: profit sharing ratio, interest on capital, salary to partners, interest on drawings, and how a new partner is admitted. Every adjustment changes the capital accounts.', url: '', teacherId: 'u-teacher-2', at: now }
    ];
    var assignments = [
      { id: 'a-1', subjectId: 'physics', year: 1, title: 'Measure a book with dimensional reasoning', brief: 'Take any three measurements at home. Record the instrument, least count and uncertainty, then express one derived quantity with units. Submit your table and a short note on errors.', due: new Date(Date.now() + 6 * 864e5).toISOString().slice(0, 10), maxScore: 20, teacherId: teacherId, at: now },
      { id: 'a-2', subjectId: 'accountancy', year: 2, title: 'Journalise ten transactions', brief: 'Record ten transactions for a trading firm, post them to the ledger and prepare a trial balance. Submit the trial balance totals.', due: new Date(Date.now() + 9 * 864e5).toISOString().slice(0, 10), maxScore: 25, teacherId: 'u-teacher-2', at: now }
    ];
    var projects = [
      { id: 'pr-1', subjectId: 'biology', year: 1, title: 'Local biodiversity survey', brief: 'Choose a 10 m × 10 m patch near your home. Record plant and animal species for one week. Present a table, a photo or sketch, and two observations about diversity.', due: new Date(Date.now() + 14 * 864e5).toISOString().slice(0, 10), teacherId: teacherId, at: now },
      { id: 'pr-2', subjectId: 'political-science', year: 1, title: 'How a bill becomes law', brief: 'Trace one recent Kerala bill from introduction to assent. Prepare a one-page timeline with the stages and the role of each house.', due: new Date(Date.now() + 12 * 864e5).toISOString().slice(0, 10), teacherId: 'u-teacher-3', at: now }
    ];
    var progress = {};
    progress[s1] = {
      chapters: { 'physics:1:physics-y1-c1': now, 'physics:1:physics-y1-c2': now, 'mathematics:1:mathematics-y1-c1': now },
      attempts: [
        { id: 'at-1', subjectId: 'physics', year: 1, kind: 'test', title: 'Units and Measurements — chapter test', score: 2, total: 3, at: now },
        { id: 'at-2', subjectId: 'mathematics', year: 1, kind: 'test', title: 'Sets, Relations and Functions — chapter test', score: 3, total: 3, at: now }
      ],
      practicals: { 'physics-p1': { score: 3, max: 3, at: now, title: 'Virtual Physics Laboratory' } },
      assignments: { 'a-1': { text: 'Draft attached in my notebook; measured the physics textbook with a 15 cm scale (least count 1 mm).', at: now, status: 'submitted' } },
      projects: {}
    };
    progress[s2] = {
      chapters: { 'accountancy:2:accountancy-y2-c1': now, 'business-studies:2:business-studies-y2-c1': now },
      attempts: [{ id: 'at-3', subjectId: 'accountancy', year: 2, kind: 'test', title: 'Partnership — chapter test', score: 4, total: 5, at: now }],
      practicals: { 'accountancy-p1': { score: 4, max: 4, at: now, title: 'Accounting and Bookkeeping Simulator' } },
      assignments: { 'a-2': { text: 'Trial balance totals: debit ₹1,84,500 and credit ₹1,84,500.', at: now, status: 'graded', score: 22, feedback: 'Well presented. Show the narration for each entry next time.', gradedAt: now } },
      projects: {}
    };
    progress[s3] = {
      chapters: { 'history:1:history-y1-c1': now, 'english:1:english-y1-c1': now },
      attempts: [],
      practicals: {},
      assignments: {},
      projects: {}
    };
    return {
      version: 1,
      createdAt: now,
      curriculum: curriculum,
      users: users,
      sessionUserId: null,
      progress: progress,
      materials: materials,
      assignments: assignments,
      projects: projects,
      practicals: [],
      assessments: [],
      activity: [{ id: 'ac-1', at: now, text: 'Platform initialised with the DHSE curriculum seed.' }]
    };
  };

  store.load = function () {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) store.state = JSON.parse(raw);
    } catch (e) { store.state = null; }
    if (!store.state || !store.state.curriculum || !store.state.curriculum.subjects) {
      store.state = store.fresh();
      store.save();
    }
    store.migrate();
    return store.state;
  };

  /* Fill in collections added by later versions without losing user data. */
  store.migrate = function () {
    var s = store.state;
    ['users', 'materials', 'assignments', 'projects', 'practicals', 'assessments', 'activity'].forEach(function (k) {
      if (!Array.isArray(s[k])) s[k] = [];
    });
    if (!s.progress) s.progress = {};
    if (!s.users.some(function (u) { return u.id === 'u-teacher-3'; })) {
      s.users.push({ id: 'u-teacher-3', role: 'teacher', name: 'Latha Pillai', email: 'latha@school.kerala',
        subjects: ['history', 'political-science', 'geography', 'sociology', 'psychology', 'malayalam'],
        streams: ['humanities'], createdAt: store.now() });
    }
    var subjects = (s.curriculum && s.curriculum.subjects) || {};
    Object.keys(subjects).forEach(function (id) {
      var list = subjects[id].practicals || [];
      if (list[0]) list[0].sim = 'sim-sub-' + id;
    });
    s.users.forEach(function (u) {
      if (u.role === 'student') {
        if (!u.subjects) u.subjects = [];
        if (!u.year) u.year = 1;
        if (!s.progress[u.id]) s.progress[u.id] = { chapters: {}, attempts: [], practicals: {}, assignments: {}, projects: {} };
      }
    });
  };

  store.save = function () {
    try { localStorage.setItem(KEY, JSON.stringify(store.state)); }
    catch (e) { console.error('Could not save to localStorage', e); }
  };

  store.reset = function () {
    store.state = store.fresh();
    store.save();
  };

  store.replaceState = function (obj) {
    store.state = obj;
    store.migrate();
    store.save();
  };

  /* ---------- selectors ---------- */
  store.curriculum = function () { return store.state.curriculum; };
  store.user = function (id) {
    return store.state.users.filter(function (u) { return u.id === id; })[0] || null;
  };
  store.currentUser = function () {
    return store.state.sessionUserId ? store.user(store.state.sessionUserId) : null;
  };
  store.students = function () {
    return store.state.users.filter(function (u) { return u.role === 'student'; });
  };
  store.teachers = function () {
    return store.state.users.filter(function (u) { return u.role === 'teacher'; });
  };
  store.subject = function (id) { return store.curriculum().subjects[id] || null; };
  store.chapter = function (subjectId, year, chapterId) {
    var sub = store.subject(subjectId);
    if (!sub) return null;
    return (sub.chapters[year] || []).filter(function (c) { return c.id === chapterId; })[0] || null;
  };
  store.stream = function (id) {
    return store.curriculum().streams.filter(function (s) { return s.id === id; })[0] || null;
  };
  store.language = function (id) {
    return store.curriculum().languages.filter(function (l) { return l.id === id; })[0] || null;
  };
  store.progressOf = function (userId) {
    if (!store.state.progress[userId]) {
      store.state.progress[userId] = { chapters: {}, attempts: [], practicals: {}, assignments: {}, projects: {} };
    }
    return store.state.progress[userId];
  };

  /* Available subjects for a stream — filtered by what this school configures. */
  store.subjectsForStream = function (streamId) {
    var cur = store.curriculum();
    var stream = store.stream(streamId);
    var ids = stream ? stream.subjects.slice() : [];
    var languages = cur.languages.filter(function (l) { return l.enabled !== false; }).map(function (l) { return l.id; });
    var list = ids.map(function (id) { return cur.subjects[id]; }).filter(Boolean);
    languages.forEach(function (id) {
      if (cur.subjects[id] && list.map(function (s) { return s.id; }).indexOf(id) === -1) list.push(cur.subjects[id]);
    });
    return list;
  };

  store.subjectsOfStudent = function (student) {
    if (!student || !student.subjects) return [];
    return student.subjects.map(function (id) { return store.subject(id); }).filter(Boolean);
  };

  /* ---------- progress ---------- */
  store.markChapter = function (userId, subjectId, year, chapterId, done) {
    var p = store.progressOf(userId);
    var key = subjectId + ':' + year + ':' + chapterId;
    if (done) p.chapters[key] = store.now();
    else delete p.chapters[key];
    store.save();
  };
  store.isChapterDone = function (userId, subjectId, year, chapterId) {
    return !!store.progressOf(userId).chapters[subjectId + ':' + year + ':' + chapterId];
  };
  store.recordAttempt = function (userId, attempt) {
    var p = store.progressOf(userId);
    attempt.id = store.uid('at');
    attempt.at = store.now();
    p.attempts.unshift(attempt);
    store.save();
    return attempt;
  };
  store.recordPractical = function (userId, practicalId, score, max, title) {
    var p = store.progressOf(userId);
    p.practicals[practicalId] = { score: score, max: max, at: store.now(), title: title };
    store.save();
  };
  store.practicalDone = function (userId, practicalId) {
    return !!store.progressOf(userId).practicals[practicalId];
  };

  store.subjectStats = function (userId, subject, year) {
    var chapters = (subject.chapters[year] || []);
    var p = store.progressOf(userId);
    var done = chapters.filter(function (c) { return !!p.chapters[subject.id + ':' + year + ':' + c.id]; }).length;
    var attempts = p.attempts.filter(function (a) { return a.subjectId === subject.id && a.year === year; });
    var scored = attempts.reduce(function (s, a) { return s + a.score; }, 0);
    var total = attempts.reduce(function (s, a) { return s + a.total; }, 0);
    var practices = subject.practicals.filter(function (pr) { return !!p.practicals[pr.id]; }).length;
    return {
      chaptersDone: done,
      chaptersTotal: chapters.length,
      chapterPct: chapters.length ? Math.round(done * 100 / chapters.length) : 0,
      attempts: attempts.length,
      avgScore: total ? Math.round(scored * 100 / total) : null,
      practicalsDone: practices,
      practicalsTotal: subject.practicals.length
    };
  };

  /* ---------- accounts ---------- */
  store.login = function (userId) {
    store.state.sessionUserId = userId;
    store.save();
  };
  store.logout = function () {
    store.state.sessionUserId = null;
    store.save();
  };
  store.addStudent = function (data) {
    var user = {
      id: store.uid('u'), role: 'student', name: data.name, email: data.email || '',
      stream: data.stream, year: data.year, subjects: data.subjects || [],
      createdAt: store.now()
    };
    store.state.users.push(user);
    store.progressOf(user.id);
    store.save();
    return user;
  };
  store.addTeacher = function (data) {
    var user = {
      id: store.uid('u'), role: 'teacher', name: data.name, email: data.email || '',
      subjects: data.subjects || [], streams: data.streams || [], createdAt: store.now()
    };
    store.state.users.push(user);
    store.save();
    return user;
  };
  store.updateUser = function (id, patch) {
    var u = store.user(id);
    if (!u) return null;
    Object.keys(patch).forEach(function (k) { u[k] = patch[k]; });
    store.save();
    return u;
  };

  /* ---------- teacher content ---------- */
  store.addMaterial = function (m) {
    var rec = Object.assign({ id: store.uid('m'), at: store.now() }, m);
    store.state.materials.push(rec);
    store.save();
    return rec;
  };
  store.addAssignment = function (a) {
    var rec = Object.assign({ id: store.uid('a'), at: store.now(), maxScore: 20 }, a);
    store.state.assignments.push(rec);
    store.save();
    return rec;
  };
  store.addProject = function (p) {
    var rec = Object.assign({ id: store.uid('pr'), at: store.now() }, p);
    store.state.projects.push(rec);
    store.save();
    return rec;
  };
  store.addPracticalActivity = function (p) {
    var rec = Object.assign({ id: store.uid('pa'), at: store.now() }, p);
    store.state.practicals.push(rec);
    store.save();
    return rec;
  };
  store.addAssessment = function (a) {
    var rec = Object.assign({ id: store.uid('as'), at: store.now() }, a);
    store.state.assessments.push(rec);
    store.save();
    return rec;
  };
  store.materialsFor = function (subjectId, year, chapterId) {
    return store.state.materials.filter(function (m) {
      return m.subjectId === subjectId && String(m.year) === String(year) && (!chapterId || m.chapterId === chapterId);
    });
  };
  store.assignmentsFor = function (subjectId, year) {
    return store.state.assignments.filter(function (a) {
      return a.subjectId === subjectId && String(a.year) === String(year);
    });
  };
  store.projectsFor = function (subjectId, year) {
    return store.state.projects.filter(function (p) {
      return p.subjectId === subjectId && String(p.year) === String(year);
    });
  };
  store.practicalActivitiesFor = function (subjectId, year) {
    return store.state.practicals.filter(function (p) {
      return p.subjectId === subjectId && String(p.year) === String(year);
    });
  };
  store.assessmentsFor = function (subjectId, year) {
    return store.state.assessments.filter(function (a) {
      return a.subjectId === subjectId && String(a.year) === String(year);
    });
  };
  store.submitAssignment = function (userId, assignmentId, text) {
    var p = store.progressOf(userId);
    p.assignments[assignmentId] = { text: text, at: store.now(), status: 'submitted' };
    store.save();
  };
  store.gradeAssignment = function (userId, assignmentId, score, feedback) {
    var p = store.progressOf(userId);
    if (!p.assignments[assignmentId]) p.assignments[assignmentId] = { at: store.now() };
    p.assignments[assignmentId].score = score;
    p.assignments[assignmentId].feedback = feedback;
    p.assignments[assignmentId].status = 'graded';
    p.assignments[assignmentId].gradedAt = store.now();
    store.save();
  };
  store.submitProject = function (userId, projectId, text) {
    var p = store.progressOf(userId);
    p.projects[projectId] = { text: text, at: store.now(), status: 'submitted' };
    store.save();
  };
  store.gradeProject = function (userId, projectId, score, feedback) {
    var p = store.progressOf(userId);
    if (!p.projects[projectId]) p.projects[projectId] = { at: store.now() };
    p.projects[projectId].score = score;
    p.projects[projectId].feedback = feedback;
    p.projects[projectId].status = 'graded';
    p.projects[projectId].gradedAt = store.now();
    store.save();
  };
  store.log = function (text) {
    store.state.activity.unshift({ id: store.uid('ac'), at: store.now(), text: text });
    store.state.activity = store.state.activity.slice(0, 80);
    store.save();
  };

  /* Curriculum (admin) */
  store.updateCurriculum = function (patch) {
    Object.keys(patch).forEach(function (k) { store.state.curriculum[k] = patch[k]; });
    store.state.curriculum.updated = store.now().slice(0, 10);
    store.save();
  };
  store.importCurriculum = function (obj) {
    store.state.curriculum = Object.assign({}, obj, { updated: store.now().slice(0, 10) });
    store.migrate();
    store.save();
  };
})(window.HSE = window.HSE || {});
