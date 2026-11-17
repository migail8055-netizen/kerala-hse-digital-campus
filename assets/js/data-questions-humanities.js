/* Humanities question bank. */
(function (HSE) {
  'use strict';
  var bank = {
    history: {
      1: [
        ['The Harappan civilisation is best known for', ['iron weapons', 'planned cities and drainage', 'coinage', 'cave paintings only'], 1, 'Grid streets and covered drains show urban planning.'],
        ['The capital of the Mauryan empire was', ['Ujjain', 'Pataliputra', 'Taxila', 'Kanchipuram'], 1, 'Pataliputra (modern Patna) was the imperial capital.'],
        ['The printing press in Europe was developed by', ['Copernicus', 'Gutenberg', 'Galileo', 'Erasmus'], 1, 'Movable type transformed the spread of ideas.'],
        ['The Industrial Revolution began in', ['France', 'Britain', 'Germany', 'the United States'], 1, 'Coal, textiles and empire gave Britain an early lead.'],
        ['The French Revolution began in', ['1688', '1776', '1789', '1848'], 2, 'The Bastille was stormed in July 1789.']
      ],
      2: [
        ['The Revolt of 1857 began at', ['Delhi', 'Meerut', 'Kanpur', 'Jhansi'], 1, 'Sepoys at Meerut rose first in May 1857.'],
        ['Sree Narayana Guru\u2019s message is often summarised as', ['one caste, one religion, one god', 'back to the Vedas', 'scientific temper only', 'self-rule first'], 0, 'He argued for a casteless, unified humanity.'],
        ['The Quit India Movement was launched in', ['1930', '1935', '1942', '1946'], 2, 'Gandhi called for British withdrawal in August 1942.'],
        ['Travancore and Cochin were merged in', ['1947', '1949', '1956', '1960'], 1, 'The united state was formed in 1949.'],
        ['Non-alignment meant', ['joining NATO', 'not joining either Cold War bloc', 'aligning with China', 'disarming fully'], 1, 'India kept independence from both superpower blocs.']
      ]
    },
    'political-science': {
      1: [
        ['Fundamental rights are listed in which Part of the Constitution?', ['Part II', 'Part III', 'Part IV', 'Part V'], 1, 'Part III (Articles 12–35).'],
        ['Which house is a permanent house?', ['Lok Sabha', 'Rajya Sabha', 'State Assembly', 'Panchayat'], 1, 'Rajya Sabha is never dissolved; one third retires every two years.'],
        ['The Election Commission is established under Article', ['324', '356', '368', '370'], 0, 'Article 324 provides for the Commission.'],
        ['Panchayati Raj was given constitutional status by the', ['42nd Amendment', '73rd Amendment', '44th Amendment', '52nd Amendment'], 1, 'The 73rd Amendment (1992) dealt with panchayats.'],
        ['Judicial review means courts can', ['make laws', 'examine whether laws violate the Constitution', 'appoint the executive', 'collect taxes'], 1, 'Courts test state action against the Constitution.']
      ],
      2: [
        ['The UN Security Council has how many permanent members?', ['3', '5', '10', '15'], 1, 'China, France, Russia, the UK and the USA.'],
        ['The headquarters of SAARC is in', ['Colombo', 'Kathmandu', 'New Delhi', 'Dhaka'], 1, 'SAARC has been based in Kathmandu since 1985.'],
        ['Non-alignment was a response to', ['colonialism in Africa', 'Cold War bipolarity', 'globalisation', 'the Kyoto protocol'], 1, 'It offered a third position between the blocs.'],
        ['The WTO deals with', ['human rights', 'international trade rules', 'atomic energy', 'health standards only'], 1, 'It administers trade agreements.'],
        ['India\u2019s nuclear doctrine declares', ['first use', 'no first use', 'no civilian use', 'abolition'], 1, 'Credible minimum deterrence with no first use.']
      ]
    },
    geography: {
      1: [
        ['The latitude of the equator is', ['0°', '23.5° N', '66.5° N', '90° N'], 0, 'The equator is the zero latitude line.'],
        ['The Indian monsoon is best described as', ['seasonal reversal of winds', 'a permanent wind', 'a local breeze', 'an ocean current'], 0, 'Summer and winter winds reverse direction.'],
        ['Contour lines join places of equal', ['rainfall', 'elevation', 'temperature', 'population'], 1, 'They show relief on a topographic map.'],
        ['The Western Ghats are important because they', ['are deserts', 'form the water divide and biodiversity hotspot', 'are coral reefs', 'lie in the Bay of Bengal'], 1, 'They shed rivers and host rich endemic life.'],
        ['Soil erosion is accelerated by', ['contour ploughing', 'deforestation on slopes', 'terracing', 'crop rotation'], 1, 'Loss of vegetation exposes soil to runoff.']
      ],
      2: [
        ['The census in India is conducted by the', ['RBI', 'Office of the Registrar General and Census Commissioner', 'NITI Aayog', 'Election Commission'], 1, 'It conducts the decennial census.'],
        ['HDI combines income with', ['health and education', 'military spending', 'exports', 'urbanisation'], 0, 'Life expectancy, schooling and per capita income.'],
        ['Kerala\u2019s literacy rate is notable because it is', ['among the lowest', 'among the highest in India', 'equal to the national average', 'falling sharply'], 1, 'Near-universal literacy is a long-standing achievement.'],
        ['The Kerala backwaters are', ['glacial lakes', 'a network of brackish lagoons and canals', 'desert oases', 'coral atolls'], 1, 'They are formed by sea water and river mouths.'],
        ['Remittances are money sent by', ['tourists', 'migrant workers to their home country', 'exporters', 'banks'], 1, 'Kerala\u2019s economy relies heavily on Gulf remittances.']
      ]
    },
    sociology: {
      1: [
        ['The term sociology was coined by', ['Durkheim', 'Auguste Comte', 'Weber', 'Marx'], 1, 'Comte used the term in the 1830s.'],
        ['Which institution is found in every known society?', ['the stock market', 'the family', 'the parliament', 'the factory'], 1, 'Family is a universal social institution.'],
        ['Socialisation is mainly carried out by', ['courts', 'family, school and peers', 'banks', 'the army'], 1, 'These are agencies of socialisation.'],
        ['Caste in India is an example of', ['achieved status', 'ascribed status', 'class mobility', 'voluntary association'], 1, 'Status is fixed by birth.'],
        ['Participant observation requires the researcher to', ['stay outside the setting', 'live among the people studied', 'use only statistics', 'avoid ethics'], 1, 'The researcher joins the setting to understand it.']
      ],
      2: [
        ['Kerala\u2019s social reform movements mainly challenged', ['caste and ritual exclusion', 'industrialisation', 'globalisation', 'urban planning'], 0, 'Movements attacked untouchability and exclusion.'],
        ['Patriarchy refers to', ['rule by women', 'male dominance in social structures', 'equal inheritance', 'matrilineal systems only'], 1, 'It describes systemic male dominance.'],
        ['A social movement is', ['a government department', 'organised collective action for change', 'a family ritual', 'a market trend'], 1, 'Movements mobilise for or against change.'],
        ['Secularism in the Indian Constitution means', ['no religion allowed', 'the state treats all religions equally', 'one state religion', 'religion in schools only'], 1, 'Equal respect, no state religion.'],
        ['Sanskritisation, as described by M. N. Srinivas, is', ['learning Sanskrit', 'lower castes adopting upper caste practices', 'abolishing caste', 'migration to cities'], 1, 'It describes upward ritual mobility.']
      ]
    },
    psychology: {
      1: [
        ['Psychology is the scientific study of', ['only the brain', 'behaviour and mental processes', 'society', 'morals'], 1, 'Both observable behaviour and inner processes.'],
        ['The basic unit of the nervous system is the', ['neuron', 'hormone', 'synapse', 'axon only'], 0, 'Neurons transmit electrochemical signals.'],
        ['Classical conditioning was demonstrated by', ['Skinner', 'Pavlov', 'Freud', 'Piaget'], 1, 'Pavlov\u2019s dogs learned to salivate to a bell.'],
        ['Short-term memory holds about', ['2 ± 1 items', '7 ± 2 items', '20 items', 'unlimited items'], 1, 'Miller\u2019s classic estimate.'],
        ['Gestalt psychology emphasises that perception is', ['a sum of parts', 'organised wholes', 'purely learned', 'random'], 1, 'The whole differs from the sum of parts.']
      ],
      2: [
        ['IQ is traditionally computed as', ['CA/MA × 100', 'MA/CA × 100', 'MA + CA', 'CA − MA'], 1, 'Mental age divided by chronological age, times 100.'],
        ['The Big Five personality model includes', ['openness, conscientiousness, extraversion, agreeableness, neuroticism', 'id, ego, superego', 'introversion only', 'sanguine and phlegmatic'], 0, 'These five traits are widely used.'],
        ['Stress is best described as', ['a stimulus only', 'a transaction between person and environment', 'always harmful', 'a personality type'], 1, 'Appraisal of demands against resources.'],
        ['Cognitive therapy focuses on', ['childhood only', 'changing distorted thoughts', 'drugs only', 'dream analysis'], 1, 'It restructures unhelpful thinking.'],
        ['Asch\u2019s experiments demonstrated', ['obedience to authority', 'conformity to group judgement', 'classical conditioning', 'memory decay'], 1, 'Participants conformed to an obviously wrong majority.']
      ]
    },
    philosophy: {
      1: [
        ['An argument is valid when', ['its premises are true', 'the conclusion follows necessarily from the premises', 'it is popular', 'it is long'], 1, 'Validity concerns form, not truth of premises.'],
        ['Socrates is associated with', ['the dialectical method of questioning', 'the categorical imperative', 'logical positivism', 'utilitarianism'], 0, 'The Socratic elenchus proceeds by questions.'],
        ['Ethics is the study of', ['beauty', 'right and wrong conduct', 'knowledge', 'being'], 1, 'Moral philosophy examines conduct and values.'],
        ['The Four Noble Truths belong to', ['Jainism', 'Buddhism', 'Vedanta', 'Charvaka'], 1, 'They are central to Buddhist teaching.'],
        ['Epistemology studies', ['knowledge and justification', 'beauty', 'political power', 'matter'], 0, 'It asks what knowledge is and how we get it.']
      ],
      2: [
        ['Kant\u2019s categorical imperative asks us to act', ['only for profit', 'on maxims we could will as universal law', 'by custom', 'by majority vote'], 1, 'Universalisation is the test of moral maxims.'],
        ['Plato\u2019s theory of Forms holds that', ['only particulars exist', 'universal Forms are more real than particulars', 'matter is mind', 'knowledge is impossible'], 1, 'Forms are eternal realities behind appearances.'],
        ['Sartre\u2019s existentialism stresses', ['essence before existence', 'existence before essence and radical freedom', 'determinism', 'divine command'], 1, 'Humans create themselves through choice.'],
        ['Applied ethics includes', ['logic', 'bioethics and environmental ethics', 'metaphysics', 'aesthetics only'], 1, 'It applies moral theory to practical problems.'],
        ['The mind–body problem asks', ['how language works', 'how mental states relate to physical states', 'what beauty is', 'who should rule'], 1, 'It concerns the relation of mind and matter.']
      ]
    },
    journalism: {
      1: [
        ['Which is NOT a standard news value?', ['timeliness', 'proximity', 'impact', 'advertisement revenue'], 3, 'Revenue is commercial, not editorial news value.'],
        ['The inverted pyramid structure puts the most important information', ['at the end', 'at the beginning', 'in the middle', 'in footnotes'], 1, 'Readers get the key facts first.'],
        ['A byline names the', ['editor', 'reporter who wrote the story', 'printer', 'subscriber'], 1, 'It credits the journalist.'],
        ['Verification in journalism means', ['publishing quickly', 'confirming facts and sources', 'adding opinion', 'using one source'], 1, 'Accuracy depends on checking.'],
        ['Press freedom in India is protected under', ['Article 19(1)(a)', 'Article 21', 'Article 32', 'Article 44'], 0, 'Freedom of speech and expression.']
      ],
      2: [
        ['Defamation is', ['publishing false statements that harm reputation', 'copying a design', 'recording an interview', 'editing a headline'], 0, 'It can be civil or criminal.'],
        ['The Right to Information Act was passed in', ['1995', '2000', '2005', '2013'], 2, 'The RTI Act came into force in 2005.'],
        ['Yellow journalism is characterised by', ['deep investigation', 'sensationalism and distortion', 'data analysis', 'strict verification'], 1, 'It prioritises sensation over accuracy.'],
        ['Fact-checking primarily protects against', ['high printing costs', 'misinformation', 'low readership', 'copyright'], 1, 'It prevents the spread of false claims.'],
        ['Media ethics requires a journalist to', ['accept gifts for coverage', 'avoid conflicts of interest', 'hide sources always', 'publish unverified leaks'], 1, 'Independence from influence is basic.']
      ]
    },
    'communicative-english': {
      1: [
        ['Choose the synonym of "diligent".', ['lazy', 'hard-working', 'careless', 'angry'], 1, 'Diligent means showing persistent effort.'],
        ['Change to passive: "The teacher explained the lesson."', ['The lesson was explained by the teacher.', 'The lesson explained the teacher.', 'The teacher was explained.', 'The lesson is explaining.'], 0, 'Object becomes subject in the passive.'],
        ['The sentence that states a paragraph\u2019s main idea is the', ['conclusion', 'topic sentence', 'example', 'transition'], 1, 'It usually opens the paragraph.'],
        ['"Their" and "there" are examples of', ['synonyms', 'homophones', 'antonyms', 'prefixes'], 1, 'They sound alike but differ in meaning.'],
        ['Active listening includes', ['interrupting', 'paraphrasing and asking questions', 'planning your reply only', 'looking away'], 1, 'It requires engagement with the speaker.']
      ],
      2: [
        ['A formal report should begin with', ['opinions', 'a clear statement of purpose', 'a joke', 'appendices'], 1, 'Purpose and scope come first.'],
        ['In group discussion, the best behaviour is to', ['dominate', 'build on others\u2019 points', 'stay silent', 'reject every idea'], 1, 'Constructive contribution is valued.'],
        ['Bias in a text means', ['balanced coverage', 'a one-sided slant', 'a citation style', 'a typo'], 1, 'It unfairly favours a position.'],
        ['The STAR method is used in interviews to describe', ['situation, task, action, result', 'salary, time, area, role', 'skills, tests, awards, references', 'story, theme, action, review'], 0, 'It structures behavioural answers.'],
        ['Media literacy includes', ['believing all shares', 'evaluating sources and claims', 'avoiding all news', 'sharing without reading'], 1, 'It is critical engagement with media.']
      ]
    }
  };
  HSE.rawQuestions = Object.assign(HSE.rawQuestions || {}, bank);
})(window.HSE = window.HSE || {});
