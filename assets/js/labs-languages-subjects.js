/* Dedicated language-subject simulations, generated from the configurable language list.
   Adding a language in Admin creates its own laboratory automatically. */
(function (HSE) {
  'use strict';
  var L = HSE.labs = HSE.labs || {};

  function makeLanguageLab(lang) {
    var vocab = lang.vocab || [];
    var activities = lang.activities || ['Reading', 'Writing', 'Grammar', 'Communication', 'Assessment'];
    var pairs = vocab.slice(0, 4).map(function (v) { return [v[0], v[1]]; });
    var focus = vocab[4] || vocab[0] || ['language', 'language'];
    var wrongs = vocab.filter(function (v) { return v[1] !== focus[1]; })
      .slice(0, 3).map(function (v) { return v[1]; });
    while (wrongs.length < 3) wrongs.push('an unrelated meaning ' + (wrongs.length + 1));
    var correctAt = lang.id.length % 4;
    var meaningOptions = wrongs.slice();
    meaningOptions.splice(correctAt, 0, focus[1]);
    var scripts = ['Latin', 'Malayalam', 'Devanagari', 'Arabic'].filter(function (s, i, all) {
      return all.indexOf(s) === i;
    });
    var scriptAt = scripts.indexOf(lang.script || 'Latin');
    if (scriptAt < 0) { scripts.unshift(lang.script); scriptAt = 0; }

    L['sim-sub-' + lang.id] = {
      id: 'sim-sub-' + lang.id,
      kind: 'match',
      title: lang.name + ' language laboratory',
      intro: 'Read, match vocabulary and connect each language activity to the skill it builds.',
      objectives: [
        'Recognise core ' + lang.name + ' vocabulary',
        'Connect reading, writing, grammar and communication',
        'Identify the script used by ' + lang.name
      ],
      notes: 'Read each word aloud, then use it in a sentence of your own. Match meaning before memorising form.',
      steps: [
        { q: 'Match each ' + lang.name + ' word to its meaning.', kind: 'match', pairs: pairs,
          why: 'Vocabulary is strongest when a word is linked to meaning, not only to a translation list.' },
        { q: 'Which is the closest meaning of “' + focus[0] + '”?', options: meaningOptions, answer: correctAt,
          why: '“' + focus[0] + '” means ' + focus[1] + '.' },
        { q: 'Match each activity to the skill it develops.', kind: 'match', pairs: [
          [activities[0], 'Reading and comprehension'],
          [activities[1], 'Writing and expression'],
          [activities[2], 'Grammar and usage'],
          [activities[3] || activities[0], 'Speaking and listening']
        ], why: 'A language course balances input, production, accuracy and communication.' },
        { q: 'Which script does ' + lang.name + ' use?', options: scripts, answer: scriptAt,
          why: lang.name + ' is written in the ' + (lang.script || 'Latin') + ' script.' }
      ]
    };
  }

  HSE.languageSeed.forEach(makeLanguageLab);
})(window.HSE = window.HSE || {});
