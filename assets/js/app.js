/* App shell: hash router, header, footer, guards. */
(function (HSE) {
  'use strict';
  var app = HSE.app = {};

  var ROUTES = [
    ['/', 'landing', true],
    ['/login', 'login', true],
    ['/join', 'join', true],
    ['/dashboard', 'dashboard'],
    ['/labs', 'labs'],
    ['/classroom/:subject', 'classroom'],
    ['/chapter/:subject/:chapter', 'chapter'],
    ['/lab/:subject/:practical', 'lab'],
    ['/test/:subject/:chapter', 'test'],
    ['/exam/:subject', 'exam'],
    ['/progress', 'progress'],
    ['/teacher', 'teacher'],
    ['/admin', 'admin']
  ];

  var TITLES = {
    landing: 'Home', login: 'Sign in', join: 'Join', dashboard: 'Dashboard', labs: 'Practical labs',
    classroom: 'Classroom', chapter: 'Lesson', lab: 'Laboratory', test: 'Chapter test', exam: 'Examination',
    progress: 'My progress', teacher: 'Teacher console', admin: 'Curriculum admin'
  };

  app.parse = function () {
    var raw = window.location.hash.replace(/^#/, '') || '/';
    var qi = raw.indexOf('?');
    var query = {};
    if (qi >= 0) {
      raw.slice(qi + 1).split('&').forEach(function (pair) {
        if (!pair) return;
        var kv = pair.split('=');
        query[decodeURIComponent(kv[0])] = decodeURIComponent((kv[1] || '').replace(/\+/g, ' '));
      });
      raw = raw.slice(0, qi);
    }
    var parts = raw.split('/').filter(function (p) { return p !== ''; });
    for (var i = 0; i < ROUTES.length; i++) {
      var route = ROUTES[i];
      var pat = route[0].split('/').filter(Boolean);
      if (pat.length !== parts.length) continue;
      var params = {}, ok = true;
      for (var j = 0; j < pat.length; j++) {
        if (pat[j].charAt(0) === ':') params[pat[j].slice(1)] = decodeURIComponent(parts[j]);
        else if (pat[j] !== parts[j]) { ok = false; break; }
      }
      if (ok) return { view: route[1], params: params, query: query, public: !!route[2] };
    }
    return { view: 'notfound', params: {}, query: {}, public: true };
  };

  app.go = function (path) {
    if (('#/' + path).replace(/^#\/\//, '#/') === window.location.hash) app.render();
    else window.location.hash = '#/' + String(path).replace(/^#?\/?/, '');
  };

  app.homeFor = function (user) {
    if (!user) return '#/';
    if (user.role === 'teacher') return '#/teacher';
    if (user.role === 'admin') return '#/admin';
    return '#/dashboard';
  };

  function navFor(user) {
    if (!user) {
      return '<a href="#/login" data-nav="login">Sign in</a><a href="#/join" data-nav="join">Join as student</a>';
    }
    if (user.role === 'student') {
      return '<a href="#/dashboard" data-nav="dashboard">Dashboard</a>' +
        '<a href="#/labs" data-nav="labs">Practical labs</a>' +
        '<a href="#/progress" data-nav="progress">My progress</a>';
    }
    if (user.role === 'teacher') {
      return '<a href="#/teacher" data-nav="teacher">Teacher console</a>';
    }
    return '<a href="#/admin" data-nav="admin">Curriculum admin</a>';
  }

  function header(user) {
    var cur = HSE.store.curriculum();
    var nav = navFor(user);
    var right;
    if (user) {
      right = '<div class="user-chip">' +
        '<span class="avatar">' + HSE.ui.esc(HSE.ui.initials(user.name)) + '</span>' +
        '<span class="who"><b>' + HSE.ui.esc(user.name) + '</b><span>' +
        HSE.ui.esc(user.role === 'student' ? (HSE.store.stream(user.stream) ? HSE.store.stream(user.stream).name + ' · ' + (user.year === 1 ? 'Plus One' : 'Plus Two') : 'Student') : (user.role === 'teacher' ? 'Teacher' : 'School admin')) +
        '</span></span>' +
        '<button class="linkish" data-action="logout">Sign out</button></div>';
    } else {
      right = '<a class="btn small subtle" href="#/login">Sign in</a>';
    }
    return '<header class="site-header"><div class="wrap wrap-wide bar">' +
      '<a class="brand" href="' + app.homeFor(user) + '">' +
      '<span class="brand-mark">HSE</span>' +
      '<span><span class="brand-name">Kerala HSE Digital Campus</span>' +
      '<span class="brand-sub">' + HSE.ui.esc(cur.school.name) + '</span></span></a>' +
      '<nav class="top-nav" aria-label="Main">' + nav + '</nav>' +
      '<div class="spacer"></div>' + right +
      '</div></header>';
  }

  function footer() {
    return '<footer class="site-footer"><div class="wrap wrap-wide">' +
      '<div><span class="footer-tag">Learn · Practice · Experience · Create Your Future</span><br>' +
      '<span>Curriculum aligned to the Directorate of Higher Secondary Education (DHSE), Kerala. ' +
      'School combinations are configurable by the school.</span></div>' +
      '<div class="small">Offline-first demo · data stays in this browser</div>' +
      '</div></footer>';
  }

  app.render = function () {
    var route = app.parse();
    var user = HSE.store.currentUser();
    var view = HSE.views[route.view];

    if (!route.public && !user) {
      HSE.ui.toast('Please sign in to continue.', 'error');
      window.location.hash = '#/login';
      return;
    }
    if (route.view === 'landing' && user) {
      window.location.hash = app.homeFor(user);
      return;
    }
    if (user && user.role !== 'student' && ['dashboard', 'labs', 'progress', 'classroom', 'chapter', 'lab', 'test', 'exam'].indexOf(route.view) >= 0) {
      window.location.hash = app.homeFor(user);
      return;
    }
    if (user && user.role === 'student' && (route.view === 'teacher' || route.view === 'admin')) {
      window.location.hash = '#/dashboard';
      return;
    }
    if (!view) {
      window.location.hash = '#/';
      return;
    }

    var out;
    try {
      out = view(route.params, route.query) || { html: '' };
    } catch (err) {
      console.error(err);
      out = { html: '<div class="wrap"><div class="card"><h2>Something went wrong</h2><p class="muted">' +
        HSE.ui.esc(err.message) + '</p><a class="btn" href="#/">Go home</a></div></div>' };
    }

    var shell = document.getElementById('shell');
    if (!shell) {
      shell = document.createElement('div');
      shell.id = 'shell';
      shell.className = 'app-shell';
      document.body.appendChild(shell);
    }
    shell.innerHTML = header(user) + '<main id="app"><div class="wrap wrap-wide">' + out.html + '</div></main>' + footer();

    var navKey = route.view === 'classroom' || route.view === 'chapter' || route.view === 'lab' ||
      route.view === 'test' || route.view === 'exam' ? 'dashboard' : route.view;
    var active = shell.querySelector('[data-nav="' + navKey + '"]');
    if (active) active.classList.add('active');

    document.title = (out.title ? out.title + ' · ' : '') + 'Kerala HSE Digital Campus';
    var main = document.getElementById('app');
    if (out.mount) out.mount(main);
    if (!out.keepScroll) window.scrollTo(0, 0);
  };

  app.boot = function () {
    HSE.store.load();
    var logout = function (e) {
      var btn = e.target.closest('[data-action="logout"]');
      if (!btn) return;
      HSE.store.logout();
      window.location.hash = '#/login';
      HSE.ui.toast('Signed out.');
    };
    document.addEventListener('click', logout);
    window.addEventListener('hashchange', app.render);
    app.render();
  };
})(window.HSE = window.HSE || {});
