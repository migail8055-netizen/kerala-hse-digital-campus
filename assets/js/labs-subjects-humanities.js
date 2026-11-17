/* Dedicated subject simulations — Humanities stream. */
(function (HSE) {
  'use strict';
  var L = HSE.labs = HSE.labs || {};

  L['sim-sub-history'] = {
    id: 'sim-sub-history', kind: 'order', title: 'Historical inquiry laboratory',
    intro: 'Sequence historical periods, weigh sources and read evidence from an Indus Valley site.',
    objectives: ['Order major periods of Indian history', 'Distinguish types of historical source', 'Interpret archaeological evidence'],
    notes: 'Historians compare primary evidence with later accounts and ask who produced each source, when and why.',
    steps: [
      { q: 'Place these periods in chronological order.', kind: 'order', items: ['Indus Valley Civilisation', 'Vedic period', 'Mauryan Empire', 'Mughal Empire', 'British colonial rule'], why: 'The sequence runs from the Bronze Age cities through the Vedic and imperial periods to colonial rule.' },
      { q: 'Match each source to its type.', kind: 'match', pairs: [
        ['Coins', 'Numismatic evidence'],
        ['Stone inscriptions', 'Epigraphic evidence'],
        ['Oral memories', 'Oral history'],
        ['Government files', 'Archival record']
      ], why: 'Different source types answer different questions and need different checks.' },
      { q: 'The Indian National Congress was founded in 1885 and India became independent in 1947. How many years passed?', kind: 'numeric', answer: 62, digits: 0, tolerance: 0, unit: 'years', hint: '1947 − 1885', why: '1947 − 1885 = 62 years.' },
      { q: 'The Great Bath at Mohenjo-daro is best interpreted as evidence of…', options: ['large-scale water management and ritual bathing', 'a royal tomb', 'a grain store', 'a military barracks'], answer: 0, why: 'Its construction, waterproofing and central location suggest public ritual and water management.' }
    ]
  };

  L['sim-sub-political-science'] = {
    id: 'sim-sub-political-science', kind: 'order', title: 'Virtual government and parliament',
    intro: 'Take a bill through the legislature, calculate a majority and test your understanding of institutions.',
    objectives: ['Sequence the passage of a bill', 'Calculate a simple majority', 'Identify the role of each institution'],
    notes: 'A simple majority is more than half of the members voting. A bill becomes law after passage and assent.',
    steps: [
      { q: 'Order the stages by which a bill becomes law.', kind: 'order', items: ['First reading', 'Committee scrutiny', 'Second reading and debate', 'Third reading and vote', 'Presidential assent'], why: 'The bill is introduced, examined, debated, voted on and finally assented to.' },
      { q: 'A house has 140 members. What is the smallest simple majority of the whole house?', kind: 'numeric', answer: 71, digits: 0, tolerance: 0, unit: 'seats', hint: 'More than half of 140', why: 'Half of 140 is 70, so a simple majority needs at least 71.' },
      { q: 'Match each institution to its main role.', kind: 'match', pairs: [
        ['Legislature', 'Makes laws and approves the budget'],
        ['Executive', 'Implements laws and runs administration'],
        ['Judiciary', 'Interprets laws and protects rights'],
        ['Election Commission', 'Conducts elections and enforces rules']
      ], why: 'The separation of functions provides checks and balances.' },
      { q: 'Why are anti-defection rules important in a parliamentary system?', options: ['They protect party stability and the mandate voters gave', 'They prevent all debate', 'They give judges a vote', 'They abolish political parties'], answer: 0, why: 'Anti-defection provisions discourage elected members from switching sides for personal gain.' }
    ]
  };

  L['sim-sub-geography'] = {
    id: 'sim-sub-geography', kind: 'numeric', title: 'Geography and map laboratory',
    intro: 'Read a contour map of Kerala, identify landforms and connect the Western Ghats to rainfall.',
    objectives: ['Calculate contour interval', 'Identify coastal and upland landforms', 'Explain orographic rainfall'],
    notes: 'Contour interval is the height difference between neighbouring contour lines.',
    steps: [
      { q: 'Contours run from 100 m to 200 m with five equal intervals. What is the contour interval?', answer: 20, digits: 0, tolerance: 0, unit: 'm', hint: '100 ÷ 5', why: '(200 − 100) ÷ 5 = 20 m.' },
      { q: 'Match each landform to its description.', kind: 'match', pairs: [
        ['Delta', 'Sediment deposited where a river meets the sea'],
        ['Lagoon', 'Shallow water separated from the sea by a barrier'],
        ['Laterite', 'Weathered soil rich in iron and aluminium'],
        ['Backwater', 'Brackish water body parallel to the coast']
      ], why: 'Kerala\u2019s coast and midlands contain each of these distinctive landforms.' },
      { q: 'How do the Western Ghats contribute to heavy monsoon rain on the Kerala coast?', options: ['They force moist air to rise and cool', 'They block all wind', 'They heat the Arabian Sea', 'They create desert conditions'], answer: 0, why: 'Orographic uplift cools moist south-west monsoon air, producing heavy relief rainfall.' },
      { q: 'Order the stages of the water cycle.', kind: 'order', items: ['Evaporation', 'Condensation', 'Precipitation', 'Runoff and infiltration'], why: 'Water evaporates, condenses into cloud, falls as rain and returns through runoff and soil.' }
    ]
  };

  L['sim-sub-sociology'] = {
    id: 'sim-sub-sociology', kind: 'match', title: 'Society and social research laboratory',
    intro: 'Use sociological concepts, plan a sample and choose the right research method.',
    objectives: ['Match core sociological concepts', 'Calculate a sample size', 'Sequence a research project'],
    notes: 'A sample is a subset selected to represent a population; the sampling method affects bias.',
    steps: [
      { q: 'Match each concept to its meaning.', kind: 'match', pairs: [
        ['Norms', 'Shared expectations of behaviour'],
        ['Values', 'Widely held beliefs about what matters'],
        ['Roles', 'Expected behaviour attached to a position'],
        ['Institutions', 'Established patterns such as family or school']
      ], why: 'These concepts describe how societies coordinate behaviour and meaning.' },
      { q: 'A school has 250 students. You survey a 20% sample. How many students is that?', kind: 'numeric', answer: 50, digits: 0, tolerance: 0, unit: 'students', hint: '20% of 250', why: '0.20 × 250 = 50 students.' },
      { q: 'Order the stages of a social research project.', kind: 'order', items: ['Define the question', 'Review existing research', 'Choose methods and sample', 'Collect data', 'Analyse and report'], why: 'A clear question and method come before collection; analysis answers the question.' },
      { q: 'Which is an example of primary data?', options: ['Census tables published by the government', 'Answers from interviews you conducted', 'A newspaper article from 1990', 'A textbook summary'], answer: 1, why: 'Primary data is collected first-hand for the current study; the others are secondary sources.' }
    ]
  };

  L['sim-sub-psychology'] = {
    id: 'sim-sub-psychology', kind: 'match', title: 'Psychological learning laboratory',
    intro: 'Explore memory systems, conditioning and the sequence of memory processes.',
    objectives: ['Distinguish memory systems', 'Explain classical conditioning', 'Sequence encoding, storage and retrieval'],
    notes: 'Memory involves encoding, storage and retrieval. Conditioning pairs a neutral stimulus with a meaningful one.',
    steps: [
      { q: 'Match each memory system to its description.', kind: 'match', pairs: [
        ['Sensory memory', 'Very brief hold of raw sensory input'],
        ['Short-term memory', 'Limited capacity, conscious workspace'],
        ['Long-term memory', 'Relatively permanent store of knowledge'],
        ['Working memory', 'Active manipulation of information']
      ], why: 'These systems differ in duration, capacity and the kind of processing they support.' },
      { q: 'Miller estimated that short-term memory holds about how many chunks, plus or minus two?', kind: 'numeric', answer: 7, digits: 0, tolerance: 0, unit: 'chunks', hint: 'The classic 7 ± 2', why: 'Miller\u2019s often-cited estimate is 7 ± 2 chunks.' },
      { q: 'A dog learns to salivate when it hears a bell paired with food. The bell is the…', options: ['unconditioned stimulus', 'conditioned stimulus', 'unconditioned response', 'reinforcement schedule'], answer: 1, why: 'The bell begins neutral and becomes a conditioned stimulus after pairing with food.' },
      { q: 'Order the three basic memory processes.', kind: 'order', items: ['Encoding', 'Storage', 'Retrieval'], why: 'Information is encoded, stored over time and later retrieved.' }
    ]
  };

  L['sim-sub-philosophy'] = {
    id: 'sim-sub-philosophy', kind: 'choice', title: 'Ethics and reasoning workshop',
    intro: 'Test arguments for validity, count truth-table rows and identify a fallacy.',
    objectives: ['Recognise a valid argument form', 'Calculate truth-table size', 'Identify ad hominem reasoning'],
    notes: 'An argument is valid when the conclusion cannot be false if the premises are true. A truth table for n propositions has 2ⁿ rows.',
    steps: [
      { q: 'Which argument is valid?', options: ['All humans are mortal; Socrates is human; therefore Socrates is mortal.', 'All birds fly; a penguin is a bird; therefore penguins can swim.', 'Some students are tall; some tall people are kind; therefore all students are kind.', 'It is raining; therefore the ground is wet tomorrow.'], answer: 0, why: 'This is a valid categorical syllogism: the conclusion follows necessarily from the premises.' },
      { q: 'How many rows does a truth table for three propositions need?', kind: 'numeric', answer: 8, digits: 0, tolerance: 0, hint: '2³', why: 'Each proposition can be true or false, giving 2 × 2 × 2 = 8 combinations.' },
      { q: 'Order the steps of analysing an argument.', kind: 'order', items: ['Identify the conclusion', 'Identify the premises', 'Check whether the premises support the conclusion', 'Look for hidden assumptions'], why: 'Reconstructing the argument exposes whether the reasoning actually supports the claim.' },
      { q: '“You cannot be right about climate policy because you are not a scientist” is an example of…', options: ['ad hominem', 'modus ponens', 'a valid deduction', 'a tautology'], answer: 0, why: 'It attacks the person rather than engaging with the evidence or argument.' }
    ]
  };

  L['sim-sub-journalism'] = {
    id: 'sim-sub-journalism', kind: 'order', title: 'Journalism and news reporting studio',
    intro: 'Report a story: verify, interview, write and check the facts before publication.',
    objectives: ['Sequence the reporting process', 'Match news values', 'Apply verification standards'],
    notes: 'A claim is not a fact until it is verified with a reliable source. Seek primary documents and named sources where possible.',
    steps: [
      { q: 'Order the steps of reporting a news story.', kind: 'order', items: ['Receive a tip', 'Verify the claim', 'Interview sources', 'Write the report', 'Fact-check before publication'], why: 'Verification and interviewing come before writing; a final check catches errors.' },
      { q: 'Match each news value to its meaning.', kind: 'match', pairs: [
        ['Timeliness', 'How recent the event is'],
        ['Proximity', 'How close the event is to the audience'],
        ['Impact', 'How many people are affected'],
        ['Novelty', 'How unusual or unexpected the event is']
      ], why: 'News values help editors decide what matters to a particular audience.' },
      { q: 'A WhatsApp forward claims a dam has burst. What should you do first?', options: ['Publish it quickly with “unconfirmed”', 'Check the dam authority, local officials and eyewitnesses', 'Delete it without checking', 'Ask friends to share it'], answer: 1, why: 'Verify with authoritative and independent sources before reporting a safety-critical claim.' },
      { q: 'A 300-word report is read at 150 words per minute. How many minutes does it take?', kind: 'numeric', answer: 2, digits: 0, tolerance: 0, unit: 'minutes', hint: '300 ÷ 150', why: '300 ÷ 150 = 2 minutes.' }
    ]
  };

  L['sim-sub-communicative-english'] = {
    id: 'sim-sub-communicative-english', kind: 'choice', title: 'Discussion and debate practice',
    intro: 'Build a persuasive argument, identify rhetorical devices and practise active listening.',
    objectives: ['Structure a debate speech', 'Recognise rhetorical devices', 'Apply active-listening behaviour'],
    notes: 'A strong argument states a claim, gives reasons and evidence, answers the opposing case and concludes clearly.',
    steps: [
      { q: 'Order the parts of a debate speech.', kind: 'order', items: ['Greet and state the motion', 'Present your main claim', 'Give reasons and evidence', 'Answer the opposing case', 'Summarise and conclude'], why: 'A clear structure helps the audience follow and remember your case.' },
      { q: 'Match each device to its example.', kind: 'match', pairs: [
        ['Metaphor', 'The classroom was a zoo'],
        ['Simile', 'As brave as a lion'],
        ['Alliteration', 'Safe, sound and secure'],
        ['Rhetorical question', 'Can we really ignore this?']
      ], why: 'Each device creates emphasis through comparison, sound or a question.' },
      { q: 'Which behaviour shows active listening?', options: ['Planning your reply while the other person speaks', 'Summarising their point and asking a clarifying question', 'Changing the subject', 'Interrupting to correct a detail'], answer: 1, why: 'Summarising and clarifying shows attention and checks understanding.' },
      { q: 'A two-minute speech is delivered at 130 words per minute. About how many words is the script?', kind: 'numeric', answer: 260, digits: 0, tolerance: 0, unit: 'words', hint: '2 × 130', why: '2 × 130 = 260 words.' }
    ]
  };
})(window.HSE = window.HSE || {});
