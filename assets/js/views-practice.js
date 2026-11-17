/* Chapter tests and examinations: multiple-choice, scored immediately, saved to progress. */
(function (HSE) {
  'use strict';
  var ui = HSE.ui, store = HSE.store;
  HSE.views = HSE.views || {};

  function me() { return store.currentUser(); }

  function quizView(opts) {
    var user = me();
    var subject = store.subject(opts.subjectId);
    if (!subject) return { html: '<div class="card">Subject not found. <a href="#/dashboard">Back</a></div>' };
    if (user.subjects.indexOf(subject.id) === -1) {
      return { html: '<div class="card"><h2>' + ui.esc(subject.name) + '</h2><p class="muted">This subject is not in your combination.</p></div>' };
    }
    var questions = opts.questions;
    if (!questions.length) {
      return {
        title: opts.title, html: '<div class="breadcrumb"><a href="#/classroom/' + ui.attr(subject.id) + '">' + ui.esc(subject.name) + '</a></div>' +
          '<div class="card"><h2>' + ui.esc(opts.heading) + '</h2><p class="muted">No questions are available for this class yet. ' +
          'Your teacher can add an assessment from the teacher console.</p>' +
          '<a class="btn" href="#/classroom/' + ui.attr(subject.id) + '">Back to classroom</a></div>'
      };
    }

    var accent = ui.streamAccent(subject.streams[0]);
    var body = questions.map(function (q, i) {
      return '<div class="card question" data-q="' + i + '">' +
        '<div class="row-between"><span class="pill grey">Question ' + (i + 1) + ' of ' + questions.length + '</span>' +
        '<span class="small muted">1 mark</span></div>' +
        '<h3 style="margin:.7rem 0 .6rem">' + ui.esc(q[0]) + '</h3>' +
        '<div class="options">' + q[1].map(function (opt, j) {
          return '<label class="option"><input type="radio" name="q' + i + '" value="' + j + '">' +
            '<span class="mark">' + String.fromCharCode(65 + j) + '</span><span>' + ui.esc(opt) + '</span></label>';
        }).join('') + '</div>' +
        '<div class="feedback" hidden></div></div>';
    }).join('');

    var html = '<div class="breadcrumb"><a href="#/dashboard">Dashboard</a> / ' +
      '<a href="#/classroom/' + ui.attr(subject.id) + '">' + ui.esc(subject.name) + '</a> / ' + ui.esc(opts.crumb) + '</div>' +
      '<div class="section-head"><div><h1 style="margin:0">' + ui.esc(opts.heading) + '</h1>' +
      '<div class="sub">' + ui.esc(subject.name) + ' · ' + questions.length + ' questions · multiple choice</div></div>' +
      '<div class="pill" style="background:' + accent + '1c;color:' + accent + '">' + (opts.kind === 'exam' ? 'Examination' : 'Chapter test') + '</div></div>' +
      '<div class="panel soft small">Answer every question, then submit. ' +
      (opts.kind === 'exam' ? 'Explanations are shown after you submit.' : 'You will see the explanation for each answer.') +
      ' Your score is saved to <a href="#/progress">My progress</a>.</div>' +
      '<div class="stack" style="margin-top:1rem">' + body + '</div>' +
      '<div class="row-between" style="margin-top:1rem"><span class="small muted" id="answered">0 of ' + questions.length + ' answered</span>' +
      '<button class="btn primary" id="submit-quiz">Submit ' + (opts.kind === 'exam' ? 'examination' : 'test') + '</button></div>' +
      '<div id="quiz-result"></div>';

    return {
      title: opts.title, html: html, mount: function (root) {
        var answered = root.querySelector('#answered');
        root.addEventListener('change', function () {
          var n = questions.filter(function (_, i) { return root.querySelector('input[name="q' + i + '"]:checked'); }).length;
          answered.textContent = n + ' of ' + questions.length + ' answered';
        });

        root.querySelector('#submit-quiz').addEventListener('click', function () {
          var answers = [], correct = 0;
          questions.forEach(function (q, i) {
            var picked = root.querySelector('input[name="q' + i + '"]:checked');
            var val = picked ? Number(picked.value) : -1;
            answers.push(val);
            if (val === q[2]) correct++;
          });
          if (answers.indexOf(-1) !== -1) {
            ui.toast('Answer all ' + questions.length + ' questions before submitting.', 'error');
            return;
          }
          questions.forEach(function (q, i) {
            var card = root.querySelector('[data-q="' + i + '"]');
            card.querySelectorAll('input').forEach(function (inp) { inp.disabled = true; });
            card.querySelectorAll('.option').forEach(function (lab) {
              var j = Number(lab.querySelector('input').value);
              if (j === q[2]) lab.classList.add('is-correct');
              if (j === answers[i] && j !== q[2]) lab.classList.add('is-wrong');
            });
            var fb = card.querySelector('.feedback');
            fb.hidden = false;
            fb.innerHTML = '<b>' + (answers[i] === q[2] ? 'Correct.' : 'Answer: ' + String.fromCharCode(65 + q[2]) + '. ') + '</b>' +
              ui.esc(q[3] || '');
          });
          store.recordAttempt(user.id, {
            subjectId: subject.id, year: user.year, kind: opts.kind === 'exam' ? 'Examination' : 'Chapter test',
            title: opts.attemptTitle, score: correct, total: questions.length
          });
          store.log(user.name + ' scored ' + correct + '/' + questions.length + ' in ' + opts.attemptTitle + '.');
          var pct = Math.round(correct * 100 / questions.length);
          var verdict = pct >= 80 ? 'Excellent — you can move on.' : pct >= 50 ? 'A fair start. Revise the explanations below and try again.' : 'Revise this chapter and attempt it again.';
          root.querySelector('#quiz-result').innerHTML = '<div class="card" style="margin-top:1rem;border-left:5px solid ' + accent + '">' +
            '<div class="row-between"><div><div class="small muted">Result</div>' +
            '<h2 style="margin:.1rem 0">' + correct + ' / ' + questions.length + ' · ' + pct + '%</h2>' +
            '<p class="muted" style="margin:0">' + ui.esc(verdict) + '</p></div>' + ui.ring(pct, accent, 72) + '</div>' +
            '<div class="btn-row" style="margin-top:.9rem"><a class="btn" href="#/progress">See progress</a>' +
            '<a class="btn ghost" href="#/classroom/' + ui.attr(subject.id) + '">Back to classroom</a>' +
            (opts.backHref ? '<a class="btn ghost" href="' + ui.attr(opts.backHref) + '">Back to chapter</a>' : '') + '</div></div>';
          root.querySelector('#submit-quiz').disabled = true;
          root.querySelector('#submit-quiz').textContent = 'Submitted';
          root.querySelector('#quiz-result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      }
    };
  }

  HSE.views.test = function (params) {
    var user = me();
    var subject = store.subject(params.subject);
    if (!subject) return { html: '<div class="card">Subject not found. <a href="#/dashboard">Back</a></div>' };
    var chapter = store.chapter(subject.id, user.year, params.chapter);
    if (!chapter) return { html: '<div class="card"><h2>Chapter not found</h2><a class="btn" href="#/classroom/' + ui.attr(subject.id) + '">Back</a></div>' };
    return quizView({
      subjectId: subject.id, questions: HSE.chapterQuestions(subject, user.year, chapter.id),
      title: chapter.title + ' test', heading: chapter.title + ' — chapter test', crumb: 'Chapter test',
      attemptTitle: chapter.title + ' (chapter test)', backHref: '#/chapter/' + subject.id + '/' + chapter.id
    });
  };

  HSE.views.exam = function (params) {
    var user = me();
    var subject = store.subject(params.subject);
    if (!subject) return { html: '<div class="card">Subject not found. <a href="#/dashboard">Back</a></div>' };
    var year = user.year;
    var questions = HSE.questionsFor(subject.id, year);
    var assessments = store.assessmentsFor(subject.id, year);
    if (assessments.length) {
      var qs = [];
      assessments.forEach(function (a) {
        (a.questions || []).forEach(function (q) {
          qs.push([q.q, q.options, q.correct, q.explanation || '']);
        });
      });
      if (qs.length) questions = questions.concat(qs);
    }
    return quizView({
      subjectId: subject.id, questions: questions, kind: 'exam',
      title: subject.name + ' examination', heading: subject.name + ' — ' + (year === 1 ? 'Plus One' : 'Plus Two') + ' examination',
      crumb: 'Examination', attemptTitle: subject.name + ' examination'
    });
  };
})(window.HSE = window.HSE || {});
