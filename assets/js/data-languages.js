/* Language subjects: one classroom per language, generated from the configurable language list.
   Adding a language in Admin (curriculum.languages) creates its classroom automatically. */
(function (HSE) {
  'use strict';

  function chaptersFor(lang) {
    var a = lang.activities || ['Reading', 'Writing', 'Grammar', 'Communication', 'Assessment'];
    return {
      1: [
        'Reading and Comprehension :: ' + a[0] + ' | Prose and poetry | Vocabulary in context',
        'Writing Skills :: ' + a[1] + ' | Paragraph and letter | Descriptive writing',
        'Grammar Foundations :: ' + a[2] + ' | Tense and agreement | Sentence types',
        'Communication :: ' + a[3] + ' | Listening practice | Pronunciation and fluency',
        'Language Assessment :: ' + a[4] + ' | Comprehension test | Writing task'
      ],
      2: [
        'Advanced Reading :: ' + a[0] + ' | Inference and tone | Literary appreciation',
        'Advanced Writing :: ' + a[1] + ' | Essay and report | Argument and style',
        'Grammar in Context :: ' + a[2] + ' | Voice and modality | Common errors',
        'Public Communication :: ' + a[3] + ' | Discussion | Presentation',
        'Language Assessment :: ' + a[4] + ' | Grammar test | Composition'
      ]
    };
  }

  HSE.languageSeed.forEach(function (lang) {
    HSE.defineSubject(lang.id, {
      name: lang.name,
      short: lang.name,
      icon: '🗣',
      colour: '#0c8599',
      streams: ['science', 'commerce', 'humanities'],
      description: lang.name + ' — reading, writing, grammar, communication and assessment.',
      years: chaptersFor(lang),
      practicals: [
        ['sim-language', lang.name + ' Language Laboratory', 'Read, match vocabulary and complete a grammar and comprehension check with instant feedback.']
      ]
    });
  });
})(window.HSE = window.HSE || {});
