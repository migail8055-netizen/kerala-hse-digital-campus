/* Humanities stream subjects. */
(function (HSE) {
  'use strict';
  var D = HSE.defineSubject;

  D('history', {
    name: 'History', short: 'History', icon: '🏺', colour: '#6b4ea8',
    streams: ['humanities'],
    description: 'Read evidence, weigh causes and understand how societies change.',
    years: {
      1: ['Early Societies :: River valley civilisations | Bronze age trade | Writing and sources',
          'Empires and Exchange :: Mauryas and Guptas | Silk routes | Spread of religions',
          'Medieval Worlds :: Feudalism | Islamic empires | Trade towns',
          'Renaissance and Encounters :: Humanism | Printing | Voyages of discovery',
          'Colonialism and Resistance :: Mercantilism | Slave trade | Anti-colonial movements',
          'Industrialisation and the Modern World :: Industrial revolution | Labour movements | World wars'],
      2: ['Colonial India :: Company rule | Land revenue | Revolt of 1857',
          'Nationalism and Freedom :: Congress | Non-cooperation | Quit India',
          'Kerala Renaissance :: Sree Narayana Guru | Temple entry | Social reform movements',
          'Nation Building :: Integration of states | Language and federalism | Five year plans',
          'Contemporary World :: Cold war | Decolonisation | Globalisation',
          'Local History Project :: Sources | Oral history | Presentation']
    },
    practicals: [
      ['sim-history', 'Historical Interactive Simulation', 'Make the decisions of a reform era and see how the outcome changes with your choices.'],
      ['sim-project', 'Community Development Project', 'Investigate a local heritage or development issue and plan an intervention.'],
      ['sim-map', 'Kerala Geography and Map Laboratory', 'Place districts, rivers and regions on the map and check your accuracy.']
    ]
  });

  D('political-science', {
    name: 'Political Science', short: 'Pol. Science', icon: '🏛', colour: '#364fc7',
    streams: ['humanities'],
    description: 'Power, rights, institutions and the practice of democracy.',
    years: {
      1: ['What is Political Theory :: Politics and power | Freedom | Equality and justice',
          'Rights and Citizenship :: Fundamental rights | Duties | Citizenship',
          'Constitution and Institutions :: Making of the Constitution | Executive | Legislature and judiciary',
          'Elections and Representation :: Election Commission | Voting behaviour | Reforms',
          'Federalism and Local Government :: Centre\u2013state relations | Panchayati Raj | Devolution',
          'Public Administration :: Bureaucracy | Accountability | Good governance'],
      2: ['Cold War and After :: Bipolarity | Non-alignment | New world order',
          'Globalisation :: Economic globalisation | Cultural effects | Resistance',
          'Regional Organisations :: SAARC | ASEAN | European Union',
          'Contemporary South Asia :: Conflicts | Democracy movements | India\u2019s neighbourhood',
          'United Nations and International Law :: Organs | Peacekeeping | Human rights',
          'India\u2019s Foreign Policy :: Principles | Nuclear policy | Diaspora']
    },
    practicals: [
      ['sim-parliament', 'Virtual Government and Parliament', 'Whip the numbers, move amendments and see whether your bill passes.'],
      ['sim-budget', 'Public Administration Simulation', 'Allocate a district budget and watch citizen satisfaction move.'],
      ['sim-case', 'Governance Dilemmas', 'Work through real administrative decisions with competing obligations.']
    ]
  });

  D('geography', {
    name: 'Geography', short: 'Geography', icon: '🗺', colour: '#0b7285',
    streams: ['humanities'],
    description: 'Earth systems, maps and the human use of space.',
    years: {
      1: ['The Earth and Its Grid :: Latitude and longitude | Maps and scales | Projections',
          'Atmosphere and Climate :: Temperature | Pressure and winds | Monsoon',
          'Hydrosphere :: Ocean currents | Water cycle | Rivers and groundwater',
          'Biosphere and Soils :: Ecosystems | Soil formation | Vegetation belts',
          'India: Physical Geography :: Relief | Drainage | Climate regions',
          'Map and Field Skills :: Contours | Surveying | Field observation'],
      2: ['Population Geography :: Distribution | Density | Population policy',
          'Migration :: Types and causes | Remittances | Urbanisation',
          'Human Development :: Indicators | HDI | Regional disparities',
          'Economic Activities :: Agriculture | Industry | Services and tourism',
          'Transport and Communication :: Networks | Ports and airports | Digital connectivity',
          'Kerala Geography :: Backwaters | Western Ghats | Land use and hazards']
    },
    practicals: [
      ['sim-map', 'Geography and Map Laboratory', 'Locate Kerala\u2019s districts on the map and answer physical geography questions.'],
      ['sim-survey', 'Social Research Project', 'Sample a neighbourhood and map what you find.'],
      ['sim-policy', 'Economic Policy Simulation', 'Link regional development choices to measurable indicators.']
    ]
  });

  D('sociology', {
    name: 'Sociology', short: 'Sociology', icon: '👥', colour: '#862e9c',
    streams: ['humanities'],
    description: 'How societies hold together, divide and change.',
    years: {
      1: ['Sociology and Society :: Emergence | Scope | Common sense and sociology',
          'Social Institutions :: Family | Marriage | Kinship',
          'Culture and Socialisation :: Norms and values | Agencies | Identity',
          'Social Stratification :: Caste and class | Gender | Mobility',
          'Social Change :: Modernisation | Social movements | Technology',
          'Doing Sociology :: Methods | Ethics | Fieldwork'],
      2: ['Indian Society :: Diversity | Unity in diversity | Regional identities',
          'Caste and Class in India :: Change and continuity | Reservation debates | Class formation',
          'Gender and Society :: Patriarchy | Women\u2019s movements | Kerala experience',
          'Religion and Community :: Pluralism | Communalism | Secularism',
          'Social Movements :: Peasant and labour | Environmental | New social movements',
          'Kerala Society :: Reform movements | Migration | Development paradoxes']
    },
    practicals: [
      ['sim-survey', 'Social Research Project', 'Design a survey, collect responses and report the pattern you find.'],
      ['sim-project', 'Community Development Project', 'Plan a community intervention with stakeholders and indicators.'],
      ['sim-case', 'Society and Ethics Dilemmas', 'Reason through dilemmas of exclusion, access and representation.']
    ]
  });

  D('psychology', {
    name: 'Psychology', short: 'Psychology', icon: '🧠', colour: '#c2255c',
    streams: ['humanities'],
    description: 'Mind, behaviour and the evidence behind both.',
    years: {
      1: ['What is Psychology :: Schools | Methods | Applications',
          'Biology of Behaviour :: Neurons | Brain structures | Endocrine system',
          'Attention and Perception :: Selective attention | Illusions | Gestalt principles',
          'Learning :: Classical and operant conditioning | Observational learning | Applications',
          'Memory :: Models of memory | Forgetting | Strategies',
          'Motivation and Emotion :: Needs and drives | Maslow | Expression of emotion'],
      2: ['Intelligence :: Theories | Assessment | Creativity',
          'Personality :: Trait theories | Assessment | Determinants',
          'Stress and Coping :: Sources | Physiological response | Coping strategies',
          'Psychological Disorders :: Classification | Anxiety and mood disorders | Stigma',
          'Therapy :: Psychodynamic | Behavioural | Cognitive and humanistic',
          'Social Behaviour :: Attitudes | Conformity | Prosocial behaviour']
    },
    practicals: [
      ['sim-memory', 'Psychological Learning Activities', 'Measure your digit span and reaction time, then interpret your own data.'],
      ['sim-survey', 'Psychology Survey Experiment', 'Collect responses, compute a simple effect and report carefully.'],
      ['sim-case', 'Ethics in Psychology', 'Reason through consent, confidentiality and care in applied cases.']
    ]
  });

  D('philosophy', {
    name: 'Philosophy', short: 'Philosophy', icon: '🕯', colour: '#5c940d',
    streams: ['humanities'],
    description: 'Arguments, evidence, ethics and the examined life.',
    years: {
      1: ['Nature of Philosophy :: Wonder and inquiry | Branches | Philosophy and science',
          'Logic and Argument :: Propositions | Validity and soundness | Fallacies',
          'Epistemology :: Knowledge and belief | Sources of knowledge | Truth and scepticism',
          'Metaphysics :: Being and becoming | Causality | Freedom and determinism',
          'Ethics :: Virtue | Duty | Consequences',
          'Indian Philosophy :: Upanishadic thought | Buddhism and Jainism | Vedanta'],
      2: ['Western Philosophy :: Greek origins | Rationalism and empiricism | Kant',
          'Political Philosophy :: Justice | Rights | Civil disobedience',
          'Aesthetics :: Beauty and taste | Art and meaning | Criticism',
          'Philosophy of Mind :: Mind and body | Consciousness | Personal identity',
          'Applied Ethics :: Bioethics | Environmental ethics | Technology and AI',
          'Existentialism and Meaning :: Freedom | Absurdity | Authentic life']
    },
    practicals: [
      ['sim-case', 'Ethics and Reasoning Workshop', 'Work through moral dilemmas and defend your reasoning.'],
      ['sim-project', 'Philosophical Inquiry Project', 'Frame a question, map positions and argue a conclusion.'],
      ['sim-newsroom', 'Media and Truth', 'Judge sources and claims under pressure of a deadline.']
    ]
  });

  D('journalism', {
    name: 'Journalism', short: 'Journalism', icon: '📰', colour: '#343a40',
    streams: ['humanities'],
    description: 'Report accurately, write clearly and stand behind every claim.',
    years: {
      1: ['Media and Society :: Functions of media | Media landscape in Kerala | Press freedom',
          'News Values :: Timeliness | Proximity | Impact and human interest',
          'Reporting Basics :: Beats | Sources | Note taking and verification',
          'Interviewing :: Preparation | Questioning | Recording and ethics',
          'Writing News :: Structure | Headlines | Editing for clarity',
          'Photojournalism and Design :: Composition | Captions | Page layout'],
      2: ['Print and Broadcast :: Newspapers | Radio and television | Production roles',
          'Digital Journalism :: Social media | SEO | Fact checking',
          'Media Law and Ethics :: Defamation | Privacy | Contempt and copyright',
          'Investigative Reporting :: Documents | Data journalism | Right to information',
          'Media Management :: Revenue | Ownership | Audience measurement',
          'Newsroom Project :: Pitching | Reporting | Publishing']
    },
    practicals: [
      ['sim-newsroom', 'Journalism and News Reporting Studio', 'Pick a story, verify every source and file a headline before the deadline.'],
      ['sim-survey', 'Audience and Social Research', 'Design an audience survey and interpret the results honestly.'],
      ['sim-project', 'Community Reporting Project', 'Investigate a local issue and plan a publication.']
    ]
  });

  D('communicative-english', {
    name: 'Communicative English', short: 'Comm. English', icon: '🗣', colour: '#1864ab',
    streams: ['humanities'],
    description: 'Read closely, speak confidently and write for real audiences.',
    years: {
      1: ['Listening and Comprehension :: Active listening | Note taking | Accents',
          'Speaking Clearly :: Pronunciation | Stress and intonation | Small talk',
          'Reading Strategies :: Skimming and scanning | Inference | Vocabulary in context',
          'Writing Paragraphs :: Topic sentences | Cohesion | Editing',
          'Grammar in Use :: Tenses | Voice | Modals and conditionals',
          'Public Speaking :: Structure | Delivery | Handling questions'],
      2: ['Advanced Reading :: Argument and bias | Literary texts | Critical response',
          'Academic and Business Writing :: Reports | Emails | Applications',
          'Group Discussion :: Turn taking | Building on ideas | Summarising',
          'Interview Skills :: Preparation | STAR answers | Follow up',
          'Presentation Skills :: Slides | Data storytelling | Timing',
          'Media Literacy :: Source evaluation | Misinformation | Digital etiquette']
    },
    practicals: [
      ['sim-language', 'Language Laboratory', 'Practise reading, grammar and vocabulary with instant feedback.'],
      ['sim-newsroom', 'Media Literacy Studio', 'Evaluate sources and write a headline that is accurate.'],
      ['sim-debate', 'Discussion and Debate Practice', 'Build an argument, anticipate the counter-case and present a conclusion.']
    ]
  });
})(window.HSE = window.HSE || {});
