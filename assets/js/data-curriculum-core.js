/* Kerala HSE — curriculum seed.
   Everything here is data, not code: a school can replace it from the Admin console
   (edit, import JSON, export JSON) without touching the application. */
(function (HSE) {
  'use strict';

  HSE.subjectsSeed = {};
  HSE.subjectsSeedOrder = [];

  /* Chapter shorthand: "Title :: topic | topic | topic" */
  HSE.parseChapters = function (list, subjectId, year) {
    return (list || []).map(function (entry, i) {
      var parts = String(entry).split('::');
      var topics = (parts[1] || '').split('|').map(function (t) { return t.trim(); }).filter(Boolean);
      return {
        id: subjectId + '-y' + year + '-c' + (i + 1),
        title: parts[0].trim(),
        topics: topics,
        hours: 8 + (i % 4) * 2
      };
    });
  };

  /* A subject: id, name, short, icon, colour, streams it belongs to, chapters per year,
     and practicals (sim id + title + brief). */
  HSE.defineSubject = function (id, cfg) {
    if (!HSE.subjectsSeed[id]) HSE.subjectsSeedOrder.push(id);
    HSE.subjectsSeed[id] = cfg;
  };

  HSE.meta = {
    board: 'Directorate of Higher Secondary Education (DHSE), Kerala',
    syllabus: 'Kerala Higher Secondary Curriculum — configurable scheme',
    version: 1,
    updated: '2026-11-17',
    academicYear: '2026-27',
    tagline: 'Learn • Practice • Experience • Create Your Future'
  };

  HSE.schoolSeed = {
    name: 'Kerala Higher Secondary Digital Campus',
    code: 'KL-HSE-001',
    district: 'Ernakulam',
    academicYear: '2026-27'
  };

  /* Configurable rules for subject selection. */
  HSE.rulesSeed = {
    subjectsPerStudent: 6,
    compulsorySubjects: ['english'],
    minLanguages: 1,
    maxLanguages: 2,
    yearLabels: { 1: 'Plus One', 2: 'Plus Two' }
  };

  HSE.streamsSeed = [
    {
      id: 'science', name: 'Science', icon: '⚛', colour: '#0e7c66',
      blurb: 'Experiment, measure and innovate — physics, chemistry, biology, mathematics and computing.',
      subjects: ['physics', 'chemistry', 'mathematics', 'biology', 'computer-science', 'computer-application', 'electronics', 'statistics'],
      headlinePracticals: ['Experiment in virtual laboratories', 'Build circuits and machines', 'Code, model and train a first AI', 'Run a scientific research project']
    },
    {
      id: 'commerce', name: 'Commerce', icon: '📈', colour: '#b26a00',
      blurb: 'Build a venture, keep the books, read the market and manage profit like a practitioner.',
      subjects: ['accountancy', 'business-studies', 'economics', 'business-maths', 'statistics', 'computer-application', 'computer-science', 'entrepreneurship'],
      headlinePracticals: ['Create and run a virtual business', 'Post real journal entries', 'Simulate banking and inventory', 'Prepare financial statements']
    },
    {
      id: 'humanities', name: 'Humanities', icon: '🏛', colour: '#6b4ea8',
      blurb: 'Experience society, government, economy and research — then argue, report and act.',
      subjects: ['history', 'political-science', 'economics', 'geography', 'sociology', 'psychology', 'philosophy', 'journalism', 'communicative-english', 'computer-application', 'statistics'],
      headlinePracticals: ['Run a parliament and pass a bill', 'Allocate a district budget', 'Report from a newsroom', 'Design a social research study']
    }
  ];

  /* Language subjects: vocabulary packs + activity templates used by the language lab. */
  HSE.languageSeed = [
    {
      id: 'english', name: 'English', native: 'English', script: 'Latin', compulsory: true,
      activities: ['Reading comprehension', 'Guided writing', 'Grammar clinic', 'Listening & speaking', 'Language assessment'],
      vocab: [['hypothesis', 'a testable explanation'], ['sustainable', 'able to continue without exhausting resources'], ['biodiversity', 'variety of life in a habitat'], ['entrepreneur', 'a person who starts and runs a venture'], ['evidence', 'facts that support a claim'], ['democracy', 'government by the people'], ['photosynthesis', 'food-making in green plants'], ['momentum', 'mass multiplied by velocity'], ['equilibrium', 'a balanced state'], ['correlation', 'a statistical relationship between variables']]
    },
    {
      id: 'malayalam', name: 'Malayalam', native: 'മലയാളം', script: 'Malayalam',
      activities: ['വായന (Reading)', 'രചന (Writing)', 'വ്യാകരണം (Grammar)', 'സംഭാഷണം (Communication)', 'മൂല്യനിർണ്ണയം (Assessment)'],
      vocab: [['വിദ്യാഭ്യാസം', 'education'], ['പരീക്ഷണം', 'experiment'], ['സംരംഭം', 'enterprise'], ['പരിസ്ഥിതി', 'environment'], ['ജനാധിപത്യം', 'democracy'], ['ആരോഗ്യം', 'health'], ['കൃഷി', 'agriculture'], ['സാഹിത്യം', 'literature'], ['ചരിത്രം', 'history'], ['സാങ്കേതികവിദ്യ', 'technology']]
    },
    {
      id: 'hindi', name: 'Hindi', native: 'हिन्दी', script: 'Devanagari',
      activities: ['पठन (Reading)', 'लेखन (Writing)', 'व्याकरण (Grammar)', 'संवाद (Communication)', 'मूल्यांकन (Assessment)'],
      vocab: [['विद्यालय', 'school'], ['प्रयोग', 'experiment'], ['उद्यम', 'enterprise'], ['पर्यावरण', 'environment'], ['लोकतंत्र', 'democracy'], ['स्वास्थ्य', 'health'], ['कृषि', 'agriculture'], ['साहित्य', 'literature'], ['इतिहास', 'history'], ['तकनीक', 'technology']]
    },
    {
      id: 'arabic', name: 'Arabic', native: 'العربية', script: 'Arabic',
      activities: ['القراءة (Reading)', 'الكتابة (Writing)', 'القواعد (Grammar)', 'المحادثة (Communication)', 'التقييم (Assessment)'],
      vocab: [['مدرسة', 'school'], ['تجربة', 'experiment'], ['مشروع', 'project'], ['بيئة', 'environment'], ['ديمقراطية', 'democracy'], ['صحة', 'health'], ['زراعة', 'agriculture'], ['أدب', 'literature'], ['تاريخ', 'history'], ['تقنية', 'technology']]
    },
    {
      id: 'sanskrit', name: 'Sanskrit', native: 'संस्कृतम्', script: 'Devanagari',
      activities: ['पठनम् (Reading)', 'लेखनम् (Writing)', 'व्याकरणम् (Grammar)', 'संभाषणम् (Communication)', 'मूल्याङ्कनम् (Assessment)'],
      vocab: [['विद्यालयः', 'school'], ['प्रयोगः', 'experiment'], ['उद्यमः', 'enterprise'], ['परिसरः', 'environment'], ['लोकतन्त्रम्', 'democracy'], ['स्वास्थ्यम्', 'health'], ['कृषिः', 'agriculture'], ['साहित्यम्', 'literature'], ['इतिहासः', 'history'], ['तन्त्रज्ञानम्', 'technology']]
    },
    {
      id: 'urdu', name: 'Urdu', native: 'اردو', script: 'Arabic',
      activities: ['مطالعہ (Reading)', 'تحریر (Writing)', 'قواعد (Grammar)', 'گفتگو (Communication)', 'جانچ (Assessment)'],
      vocab: [['مدرسہ', 'school'], ['تجربہ', 'experiment'], ['منصوبہ', 'project'], ['ماحول', 'environment'], ['جمہوریت', 'democracy'], ['صحت', 'health'], ['زراعت', 'agriculture'], ['ادب', 'literature'], ['تاریخ', 'history'], ['ٹیکنالوجی', 'technology']]
    }
  ];

  /* Build a plain curriculum object from the seed parts, expanded and normalised. */
  HSE.buildCurriculum = function () {
    var subjects = {};
    Object.keys(HSE.subjectsSeed).forEach(function (id) {
      var raw = HSE.subjectsSeed[id];
      subjects[id] = {
        id: id,
        name: raw.name,
        short: raw.short || raw.name,
        icon: raw.icon || '📘',
        colour: raw.colour || '#0e7c66',
        streams: raw.streams.slice(),
        description: raw.description || '',
        chapters: {
          1: HSE.parseChapters(raw.years && raw.years[1], id, 1),
          2: HSE.parseChapters(raw.years && raw.years[2], id, 2)
        },
        practicals: (raw.practicals || []).map(function (p, i) {
          return { id: id + '-p' + (i + 1), sim: p[0], title: p[1], brief: p[2], subject: id };
        })
      };
    });
    return {
      meta: JSON.parse(JSON.stringify(HSE.meta)),
      school: JSON.parse(JSON.stringify(HSE.schoolSeed)),
      rules: JSON.parse(JSON.stringify(HSE.rulesSeed)),
      streams: JSON.parse(JSON.stringify(HSE.streamsSeed)),
      languages: JSON.parse(JSON.stringify(HSE.languageSeed)),
      subjects: subjects,
      version: HSE.meta.version,
      updated: HSE.meta.updated
    };
  };
})(window.HSE = window.HSE || {});
