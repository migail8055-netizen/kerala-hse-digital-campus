/* Public views: landing, sign in, student onboarding. */
(function (HSE) {
  'use strict';
  var ui = HSE.ui, store = HSE.store;
  HSE.views = HSE.views || {};

  HSE.views.notfound = function () {
    return {
      title: 'Not found',
      html: '<div class="card card-pad-lg center"><h1>Page not found</h1>' +
        '<p class="muted">That page does not exist in the campus.</p>' +
        '<a class="btn primary" href="#/">Back to the campus</a></div>'
    };
  };

  HSE.views.landing = function () {
    var cur = store.curriculum();
    var streamCards = cur.streams.map(function (s) {
      var accent = ui.streamAccent(s.id);
      var subjects = s.subjects.map(function (id) { return store.subject(id); }).filter(Boolean);
      return '<div class="stream-card" style="background:linear-gradient(150deg,' + accent + ',' + accent + 'cc)">' +
        '<span class="glyph">' + ui.esc(s.icon) + '</span>' +
        '<h3>' + ui.esc(s.name) + '</h3>' +
        '<p style="font-size:.86rem;opacity:.9;margin:.2rem 0 .1rem">' + ui.esc(s.blurb) + '</p>' +
        '<ul>' + subjects.slice(0, 5).map(function (sub) { return '<li>' + ui.esc(sub.name) + '</li>'; }).join('') + '</ul>' +
        '<div style="margin-top:.9rem;font-size:.78rem;opacity:.85">' + subjects.length + ' subjects · ' +
        subjects.reduce(function (n, sub) { return n + sub.practicals.length; }, 0) + ' practical labs</div>' +
        '</div>';
    }).join('');

    var html =
      '<section class="hero">' +
      '<div class="tagline">Learn · Practice · Experience · Create Your Future</div>' +
      '<h1>One digital campus for every Kerala Higher Secondary student</h1>' +
      '<p>Science, Commerce and Humanities — Plus One and Plus Two. Chapter classrooms, virtual laboratories, ' +
      'business simulations, research projects and assessments, all in one place.</p>' +
      '<div class="btn-row" style="position:relative;z-index:1">' +
      '<a class="btn gold" href="#/join">Create your student profile</a>' +
      '<a class="btn" href="#/login" style="background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.25);color:#fff">Sign in to a demo profile</a>' +
      '</div>' +
      '<div class="hero-stats">' +
      '<div><div class="k">' + Object.keys(cur.subjects).length + '</div><div class="l">Subjects</div></div>' +
      '<div><div class="k">' + cur.streams.length + '</div><div class="l">Streams</div></div>' +
      '<div><div class="k">2</div><div class="l">Academic years</div></div>' +
      '<div><div class="k">' + cur.languages.length + '</div><div class="l">Languages</div></div>' +
      '</div></section>' +

      '<div class="section-head"><div><h2>Choose your stream</h2>' +
      '<div class="sub">Each stream opens its own classrooms and practical world.</div></div></div>' +
      '<div class="grid cols-3">' + streamCards + '</div>' +

      '<div class="section-head"><h2>How the campus works</h2></div>' +
      '<div class="grid cols-4">' +
      feature('📚', 'Chapter classrooms', 'Every subject has chapter-wise material, interactive lessons and teacher-uploaded notes.') +
      feature('🧪', 'Learn by doing', 'Virtual laboratories and live simulations for physics, chemistry, business, government and newsrooms.') +
      feature('📝', 'Tests and evaluation', 'Chapter tests, examinations, assignments and projects, with teacher feedback and marks.') +
      feature('📈', 'Progress tracking', 'See chapters completed, scores, practical work and teacher evaluations in one view.') +
      '</div>' +

      '<div class="section-head"><div><h2>Built for schools, not one school</h2>' +
      '<div class="sub">' + ui.esc(cur.meta.board) + ' · academic year ' + ui.esc(cur.meta.academicYear) + '</div></div></div>' +
      '<div class="grid cols-2">' +
      '<div class="card"><h3>Configurable curriculum</h3><p class="muted">Subject combinations, languages, chapters and practicals are data. ' +
      'A school admin can change them for the year and export or import the whole curriculum as JSON — no rebuild needed.</p>' +
      '<a class="btn small" href="#/login">Open the admin console</a></div>' +
      '<div class="card"><h3>Teacher control</h3><p class="muted">Teachers choose their subjects, upload chapter material, create practical activities, ' +
      'assign projects, run assessments and evaluate submissions.</p><a class="btn small" href="#/login">See the teacher console</a></div>' +
      '</div>' +

      '<div class="card tinted" style="margin-top:1.6rem">' +
      '<div class="row-between"><div><h3 style="margin:0">Try it with a demo profile</h3>' +
      '<div class="small muted">Aiswarya (Plus One Science), Rahul (Plus Two Commerce), Fatima (Plus One Humanities), ' +
      'Meera Nair (teacher) and the school admin.</div></div>' +
      '<a class="btn primary" href="#/login">Sign in</a></div></div>';

    function feature(icon, title, text) {
      return '<div class="card"><div class="subject-icon" style="margin-bottom:.6rem">' + icon + '</div>' +
        '<h3>' + ui.esc(title) + '</h3><p class="small muted" style="margin:0">' + ui.esc(text) + '</p></div>';
    }

    return { title: 'Home', html: html };
  };

  HSE.views.login = function () {
    var users = store.state.users;
    var students = users.filter(function (u) { return u.role === 'student'; });
    var staff = users.filter(function (u) { return u.role !== 'student'; });

    function card(u) {
      var meta = u.role === 'student'
        ? (store.stream(u.stream) ? store.stream(u.stream).name : '') + ' · ' + (u.year === 1 ? 'Plus One' : 'Plus Two')
        : (u.role === 'teacher' ? 'Teacher' + (u.subjects && u.subjects.length ? ' · ' + u.subjects.length + ' subjects' : '') : 'School administrator');
      return '<button class="subject-card" style="text-align:left;cursor:pointer" data-login="' + ui.attr(u.id) + '">' +
        '<div class="top"><span class="avatar">' + ui.esc(ui.initials(u.name)) + '</span>' +
        '<span><h3>' + ui.esc(u.name) + '</h3><span class="stream">' + ui.esc(meta) + '</span></span></div>' +
        '<div class="foot"><span>' + ui.esc(u.email || '') + '</span><span class="pill ' + (u.role === 'student' ? '' : u.role === 'teacher' ? 'gold' : 'grey') + '">' +
        ui.esc(u.role) + '</span></div></button>';
    }

    var html = '<div class="split">' +
      '<div class="card card-pad-lg"><h1>Sign in</h1>' +
      '<p class="muted">This campus keeps everything in your browser. Pick a profile to explore each role.</p>' +
      '<h3 style="margin-top:1.4rem">Students</h3><div class="grid cols-2">' + students.map(card).join('') + '</div>' +
      '<h3 style="margin-top:1.4rem">Teachers and administration</h3><div class="grid cols-2">' + staff.map(card).join('') + '</div>' +
      '</div>' +
      '<div class="stack">' +
      '<div class="card"><h3>New here?</h3><p class="small muted">Create a student profile and choose your stream, class and subject combination.</p>' +
      '<a class="btn primary block" href="#/join">Create a student profile</a></div>' +
      '<div class="card flat"><h4>About these profiles</h4><p class="small muted" style="margin:0">' +
      'Accounts are demo profiles stored in this browser; there is no password and no server. ' +
      'In a school deployment, connect real authentication (for example Kerala school SSO) before collecting student data.</p></div>' +
      '<div class="card flat"><h4>Curriculum</h4><p class="small muted" style="margin:0">' +
      ui.esc(store.curriculum().school.name) + '<br>' + ui.esc(store.curriculum().meta.board) + '<br>Version ' +
      ui.esc(store.curriculum().version) + ' · updated ' + ui.esc(ui.date(store.curriculum().updated)) + '</p></div>' +
      '</div></div>';

    return {
      title: 'Sign in',
      html: html,
      mount: function (root) {
        root.addEventListener('click', function (e) {
          var btn = e.target.closest('[data-login]');
          if (!btn) return;
          var user = store.user(btn.getAttribute('data-login'));
          if (!user) return;
          store.login(user.id);
          HSE.ui.toast('Welcome, ' + user.name + '.');
          window.location.hash = HSE.app.homeFor(user);
        });
      }
    };
  };

  HSE.views.join = function () {
    var cur = store.curriculum();
    var html = '<div class="split">' +
      '<div class="card card-pad-lg"><h1>Create your student profile</h1>' +
      '<p class="muted">Choose your stream, class and the subjects your school offers you. You can change these later from your dashboard.</p>' +
      '<form id="join-form" novalidate>' +
      '<div class="grid cols-2">' +
      '<label class="field"><span class="lbl">Full name</span><input type="text" name="name" required maxlength="60" autocomplete="name" placeholder="e.g. Aiswarya R."></label>' +
      '<label class="field"><span class="lbl">Email (optional)</span><input type="email" name="email" maxlength="80" autocomplete="email" placeholder="you@example.com"></label>' +
      '</div>' +
      '<div class="grid cols-2">' +
      '<label class="field"><span class="lbl">Stream</span><select name="stream" id="stream-select">' +
      cur.streams.map(function (s) { return '<option value="' + ui.attr(s.id) + '">' + ui.esc(s.name) + '</option>'; }).join('') +
      '</select></label>' +
      '<label class="field"><span class="lbl">Class</span><select name="year">' +
      '<option value="1">Plus One (First Year)</option><option value="2">Plus Two (Second Year)</option>' +
      '</select></label>' +
      '</div>' +
      '<div class="field"><span class="lbl">Language subjects</span>' +
      '<div class="check-list" id="language-list">' + cur.languages.filter(function (l) { return l.enabled !== false; }).map(function (l) {
        return '<label class="check-item"><input type="checkbox" name="language" value="' + ui.attr(l.id) + '">' +
          '<span><b>' + ui.esc(l.name) + '</b><span class="meta" style="display:block">' + ui.esc(l.note || '') + '</span></span></label>';
      }).join('') + '</div></div>' +
      '<div class="field"><span class="lbl">Core subjects <span class="small muted" id="subject-count"></span></span>' +
      '<div class="check-list" id="subject-list"></div>' +
      '<div class="hint">Choose the combination your school allows. Typical Kerala combination: one language plus four or five core subjects.</div></div>' +
      '<div id="join-errors"></div>' +
      '<button class="btn primary" type="submit">Create profile and enter campus</button>' +
      '</form></div>' +
      '<div class="stack"><div class="card"><h3>What you get</h3><ul class="small muted" style="padding-left:1.1rem">' +
      '<li>A digital classroom for every subject you choose</li>' +
      '<li>Virtual laboratories and practical simulations</li>' +
      '<li>Chapter tests, examinations and project work</li>' +
      '<li>Progress tracking and teacher feedback</li></ul></div>' +
      '<div class="card flat"><h4>Privacy</h4><p class="small muted" style="margin:0">Your profile and progress stay in this browser. Nothing is uploaded.</p></div>' +
      '</div></div>';

    return {
      title: 'Join',
      html: html,
      mount: function (root) {
        var form = root.querySelector('#join-form');
        var streamSel = root.querySelector('#stream-select');
        var subjectList = root.querySelector('#subject-list');
        var countEl = root.querySelector('#subject-count');

        function renderSubjects() {
          var stream = store.stream(streamSel.value);
          var subs = stream.subjects.map(function (id) { return store.subject(id); }).filter(Boolean);
          subjectList.innerHTML = subs.map(function (s) {
            return '<label class="check-item"><input type="checkbox" name="subject" value="' + ui.attr(s.id) + '">' +
              '<span><b>' + ui.esc(s.name) + '</b><span class="meta" style="display:block">' +
              s.chapters[1].length + ' chapters · ' + s.practicals.length + ' practicals</span></span></label>';
          }).join('');
          updateCount();
        }
        function updateCount() {
          var n = form.querySelectorAll('input[name="subject"]:checked').length;
          var l = form.querySelectorAll('input[name="language"]:checked').length;
          countEl.textContent = '(' + n + ' selected' + (l ? ', ' + l + ' language' + (l > 1 ? 's' : '') : '') + ')';
        }
        streamSel.addEventListener('change', renderSubjects);
        form.addEventListener('change', function (e) {
          if (e.target.type === 'checkbox') {
            var item = e.target.closest('.check-item');
            if (item) item.classList.toggle('selected', e.target.checked);
            updateCount();
          }
        });
        renderSubjects();

        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var errors = [];
          /* form.name is the form's own name property, so query the fields explicitly. */
          var name = form.querySelector('[name="name"]').value.trim();
          var email = form.querySelector('[name="email"]').value.trim();
          if (name.length < 2) errors.push('Enter your full name.');
          if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push('Enter a valid email address or leave it blank.');
          var languages = [].map.call(form.querySelectorAll('input[name="language"]:checked'), function (i) { return i.value; });
          var subjects = [].map.call(form.querySelectorAll('input[name="subject"]:checked'), function (i) { return i.value; });
          if (!languages.length) errors.push('Choose at least one language.');
          if (subjects.length < 3) errors.push('Choose at least three core subjects.');
          if (subjects.length + languages.length > 8) errors.push('Choose at most eight subjects in total.');
          var box = root.querySelector('#join-errors');
          if (errors.length) {
            box.innerHTML = '<div class="panel" style="border-color:#e3a3a3;background:#fdf2f2;margin-bottom:.9rem">' +
              errors.map(function (m) { return '<div class="small">' + ui.esc(m) + '</div>'; }).join('') + '</div>';
            box.scrollIntoView({ block: 'nearest' });
            return;
          }
          var user = store.addStudent({
            name: name, email: email, stream: streamSel.value,
            year: parseInt(form.querySelector('[name="year"]').value, 10),
            subjects: languages.concat(subjects)
          });
          store.login(user.id);
          store.log('New student profile: ' + user.name + '.');
          window.location.hash = '#/dashboard';
          ui.toast('Profile created. Welcome to the campus, ' + name.split(' ')[0] + '!');
        });
      }
    };
  };
})(window.HSE = window.HSE || {});
