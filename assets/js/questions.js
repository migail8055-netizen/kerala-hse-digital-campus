/* Question source: subject banks by year, plus generated vocabulary quizzes for languages. */
(function (HSE) {
  'use strict';

  function bank(subjectId, year) {
    var b = (HSE.rawQuestions || {})[subjectId];
    return (b && b[year]) ? b[year] : [];
  }

  function languageQuestions(langId, year) {
    var cur = HSE.store && HSE.store.state ? HSE.store.curriculum() : HSE.buildCurriculum();
    var lang = cur.languages.filter(function (l) { return l.id === langId; })[0];
    if (!lang || !lang.vocab) return [];
    var vocab = lang.vocab.slice();
    var start = (year - 1) * 5;
    var out = [];
    for (var i = 0; i < 5; i++) {
      var entry = vocab[(start + i) % vocab.length];
      var others = vocab.filter(function (v) { return v[0] !== entry[0]; });
      var opts = [entry[1]];
      for (var j = 0; j < 3; j++) {
        var cand = others[(i * 3 + j) % others.length][1];
        if (opts.indexOf(cand) === -1) opts.push(cand);
      }
      while (opts.length < 4) opts.push('none of these');
      var correct = opts.indexOf(entry[1]);
      // deterministic rotation so the answer is not always first
      var shift = (i + year) % 4;
      opts = opts.slice(shift).concat(opts.slice(0, shift));
      correct = (correct - shift + 4) % 4;
      out.push(['What does "' + entry[0] + '" mean?', opts, correct,
        '"' + entry[0] + '" means ' + entry[1] + '.']);
    }
    return out;
  }

  HSE.questionsFor = function (subjectId, year) {
    var list = bank(subjectId, year);
    if (list.length) return list.slice();
    return languageQuestions(subjectId, Number(year));
  };

  HSE.hasQuestions = function (subjectId, year) {
    return HSE.questionsFor(subjectId, year).length > 0;
  };

  /* A chapter test takes three questions, rotated by chapter position so each chapter feels different. */
  HSE.chapterQuestions = function (subject, year, chapterId) {
    var all = HSE.questionsFor(subject.id, year);
    if (!all.length) return [];
    var list = (subject.chapters[year] || []);
    var idx = 0;
    for (var i = 0; i < list.length; i++) if (list[i].id === chapterId) idx = i;
    var out = [];
    for (var k = 0; k < Math.min(3, all.length); k++) out.push(all[(idx + k) % all.length]);
    return out;
  };
})(window.HSE = window.HSE || {});
