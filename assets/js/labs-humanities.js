/* Humanities and language practical simulations. */
(function (HSE) {
  'use strict';
  var L = HSE.labs = HSE.labs || {};

  L['sim-history'] = {
    id: 'sim-history', kind: 'choice', title: 'Historical interactive simulation — a day in the past',
    intro: 'Travel to the Harappan city of Mohenjo-daro and interpret what the evidence tells us.',
    objectives: ['Read archaeological evidence', 'Distinguish primary and secondary sources', 'Place events in chronological order'],
    steps: [
      { q: 'You find a covered drain running along a street. What does this suggest?', options: ['The city had planned sanitation', 'The city was abandoned', 'People lived in caves', 'There was no government'], answer: 0, why: 'Standardised covered drains and grid streets point to central planning and public sanitation.' },
      { q: 'Which is a primary source for studying the Indian freedom movement?', options: ['A 2020 school textbook', 'A 1942 newspaper report', 'A documentary made in 2010', 'A modern encyclopaedia'], answer: 1, why: 'A newspaper from the period was produced at the time, so it is a primary source.' },
      { q: 'In which year did the Indian National Congress pass the Quit India resolution?', options: ['1919', '1930', '1942', '1947'], answer: 2, why: 'The Quit India Movement began in August 1942.' },
      { q: 'Place these events in order, earliest first.', kind: 'order', items: ['Harappan civilisation flourishes', 'Mauryan empire established', 'Revolt of 1857', 'India gains independence'] }
    ]
  };

  L['sim-parliament'] = {
    id: 'sim-parliament', kind: 'choice', title: 'Virtual government and parliament',
    intro: 'Take a seat in the legislature and follow a bill from introduction to law.',
    objectives: ['Sequence the stages of a bill', 'Explain a simple majority', 'Describe the role of the opposition'],
    steps: [
      { q: 'What is the correct order of stages for an ordinary bill?', kind: 'order', items: ['First reading — introduction', 'Second reading — debate', 'Committee stage', 'Third reading and vote', 'Assent by the President'] },
      { q: 'In a house of 100 members, what is the minimum simple majority?', kind: 'numeric', answer: 51, digits: 0, tolerance: 0, hint: 'More than half', why: 'A simple majority means more than 50 of 100: at least 51.' },
      { q: 'Which house is called the house of the people?', options: ['Rajya Sabha', 'Lok Sabha', 'Vidhan Parishad', 'Supreme Court'], answer: 1, why: 'The Lok Sabha is directly elected by the people and is known as the lower house.' },
      { q: 'The main role of the opposition is to:', options: ['Block all legislation', 'Scrutinise the government and hold it accountable', 'Appoint judges', 'Collect taxes'], answer: 1, why: 'Opposition scrutiny is essential to accountability in a parliamentary democracy.' }
    ]
  };

  L['sim-policy'] = {
    id: 'sim-policy', kind: 'numeric', title: 'Economic policy simulation',
    intro: 'You advise the finance department. Use the data to answer.',
    objectives: ['Interpret inflation and growth figures', 'Understand fiscal trade-offs', 'Recommend a policy instrument'],
    notes: 'Nominal growth includes price changes; real growth does not. Fiscal deficit = expenditure − receipts.',
    steps: [
      { q: 'An economy grows 9% in nominal terms while prices rise 4%. What is real growth? (%)', answer: 5, digits: 1, tolerance: 0.1, hint: 'Nominal − inflation (approximately)', why: 'About 9% − 4% = 5% real growth.' },
      { q: 'Government spending is ₹500 crore and receipts ₹430 crore. What is the fiscal deficit? (₹ crore)', answer: 70, digits: 0, tolerance: 0, hint: 'Expenditure − receipts', why: '500 − 430 = ₹70 crore.' },
      { q: 'Inflation is 9% and growth is slowing. Which instrument does the central bank most likely use?', options: ['Raise the repo rate', 'Cut taxes directly', 'Increase government spending', 'Print more currency'], answer: 0, why: 'Raising the policy rate reduces money supply and demand, cooling inflation; taxes and spending are fiscal tools.' },
      { q: 'Which group is hurt most by unexpected inflation?', options: ['Borrowers with fixed-rate loans', 'People on fixed cash incomes', 'Owners of gold', 'Exporters paid in foreign currency'], answer: 1, why: 'Fixed nominal incomes lose purchasing power, while fixed-rate borrowers benefit.' }
    ]
  };

  L['sim-map'] = {
    id: 'sim-map', kind: 'match', title: 'Geography and map laboratory',
    intro: 'Work with a map of India: match, measure and interpret.',
    objectives: ['Locate states and capitals', 'Convert map scale to ground distance', 'Read relief and rainfall patterns'],
    steps: [
      { q: 'Match each state to its capital.', pairs: [
        ['Kerala', 'Thiruvananthapuram'],
        ['Tamil Nadu', 'Chennai'],
        ['Karnataka', 'Bengaluru'],
        ['Maharashtra', 'Mumbai']
      ], why: 'State capitals are a core locational skill on a political map.' },
      { q: 'On a map with scale 1 cm = 50 km, two towns are 7 cm apart. What is the ground distance? (km)', kind: 'numeric', answer: 350, digits: 0, tolerance: 0, hint: '7 × 50', why: '7 × 50 = 350 km.' },
      { q: 'Which force of erosion shapes a V-shaped river valley most directly?', options: ['Wind', 'Running water', 'Glaciers', 'Waves'], answer: 1, why: 'Vertical river erosion cuts a V-shaped valley in the upper course.' },
      { q: 'Kerala receives most of its rain from:', options: ['Western disturbances', 'The south-west monsoon', 'Cyclones only', 'The north-east monsoon only'], answer: 1, why: 'The south-west monsoon from June to September brings the bulk of Kerala\'s rainfall, with a second contribution from the north-east monsoon.' }
    ]
  };

  L['sim-newsroom'] = {
    id: 'sim-newsroom', kind: 'choice', title: 'Journalism and news reporting studio',
    intro: 'Edit a story from raw notes into a clear, fair report.',
    objectives: ['Write a headline with the main point', 'Order information by importance', 'Avoid bias and unverified claims'],
    steps: [
      { q: 'Which lede is strongest for a school arts festival story?', options: ['The festival was held today.', 'Over 900 students from 40 schools competed in the district arts festival, which opened on Monday.', 'Everyone was very happy.', 'The chief guest gave a speech.'], answer: 1, why: 'A strong lede answers who, what, where and when with the most newsworthy fact.' },
      { q: 'What is the standard news structure that places the most important information first?', options: ['Inverted pyramid', 'Chronological narrative', 'Climax first hidden', 'Spiral'], answer: 0, why: 'The inverted pyramid puts the essential facts first so a reader can stop at any point.' },
      { q: 'A source makes a serious allegation against a teacher. What should the reporter do first?', options: ['Publish it immediately', 'Verify with evidence and seek the person\'s response', 'Remove all names', 'Publish as opinion'], answer: 1, why: 'Fairness requires verification and a right of reply before publication.' },
      { q: 'A 500-word report is cut to 300 words. What must be preserved?', options: ['All adjectives', 'The key facts and attributions', 'Every quote', 'The reporter\'s opinions'], answer: 1, why: 'Cutting copy must not remove essential facts or the attribution the facts rest on.' }
    ]
  };

  L['sim-debate'] = {
    id: 'sim-debate', kind: 'choice', title: 'Debate and communication practice',
    intro: 'Build and defend an argument on a public issue.',
    objectives: ['Structure an argument with evidence', 'Refute a counter-argument', 'Speak with clarity'],
    notes: 'A strong argument states a claim, gives evidence and explains the link to the claim.',
    steps: [
      { q: 'Place the parts of a speech in the most effective order.', kind: 'order', items: ['Hook and a clear claim', 'Two supporting arguments with evidence', 'Anticipate and refute the main objection', 'Call to action and conclusion'] },
      { q: 'Which sentence is evidence rather than opinion?', options: ['School buses are clearly unsafe.', 'Of 60 buses inspected, 21 had faulty brakes.', 'Everyone knows buses are old.', 'The government should do something.'], answer: 1, why: 'It reports a measurable finding, which can be checked and cited.' },
      { q: 'A speaker says: "You only want this because you are lazy." This is:', options: ['A valid refutation', 'A personal attack (ad hominem)', 'A statistical claim', 'A concession'], answer: 1, why: 'Attacking the person instead of the argument is a fallacy, not a refutation.' },
      { q: 'Which practice most improves clarity in a two-minute speech?', options: ['Speaking faster to cover more points', 'Pacing, pausing and stressing key words', 'Reading every word from paper', 'Adding more quotations'], answer: 1, why: 'Pace and pause give the audience time to absorb the key points.' }
    ]
  };

  L['sim-survey'] = {
    id: 'sim-survey', kind: 'numeric', title: 'Social research and survey project',
    intro: 'You surveyed 200 students about study hours: 30 students study 5 hours, 90 study 3 hours, 80 study 1 hour.',
    objectives: ['Compute averages from a frequency table', 'Judge sample quality', 'Report findings honestly'],
    notes: 'Mean = Σ(f × x) ÷ Σf.',
    steps: [
      { q: 'What is the mean number of study hours? (1 decimal)', answer: 2.45, digits: 2, tolerance: 0.05, hint: '(30×5 + 90×3 + 80×1) ÷ 200', why: '(150 + 270 + 80) ÷ 200 = 500/200 = 2.5 hours.' },
      { q: 'What percentage study 5 hours? (%)', answer: 15, digits: 1, tolerance: 0.1, hint: '30 ÷ 200 × 100', why: '30/200 = 15%.' },
      { q: 'The survey only asked students in one tuition centre. The main problem is:', options: ['The sample is biased and not representative', 'The sample is too large', 'The mean is wrong', 'Percentages cannot be used'], answer: 0, why: 'A sample drawn from one centre cannot represent all students; selection bias limits the conclusion.' },
      { q: 'What is the modal (most common) study time? (hours)', answer: 3, digits: 0, tolerance: 0, hint: 'Which group has the most students?', why: '90 students study 3 hours, the largest group.' }
    ]
  };

  L['sim-language'] = {
    id: 'sim-language', kind: 'choice', title: 'Language laboratory',
    intro: 'Practise reading, grammar and communication, then check your own writing against the checklist.',
    objectives: ['Infer meaning from context', 'Apply grammar rules', 'Write clear, courteous communication'],
    notes: 'Read each question carefully. For the writing task, keep subject, verb and object clear and be courteous.',
    steps: [
      { q: 'Choose the grammatically correct sentence.', options: ['She have completed her project.', 'She has completed her project.', 'She has complete her project.', 'She have complete her project.'], answer: 1, why: 'Third person singular takes "has" plus the past participle "completed".' },
      { q: 'Read: "The results were inconclusive, so the team repeated the experiment." Why was it repeated?', options: ['It failed', 'The earlier results did not lead to a firm conclusion', 'The team was bored', 'It was too cheap'], answer: 1, why: '"Inconclusive" means no firm conclusion was reached.' },
      { q: 'Which word is closest in meaning to "scarce"?', options: ['Plentiful', 'Rare', 'Cheap', 'Heavy'], answer: 1, why: 'Scarce means in short supply, that is, rare.' },
      { q: 'Match each word to its meaning.', kind: 'match', pairs: [
        ['Diligent', 'Working with steady effort'],
        ['Candid', 'Honest and direct'],
        ['Concise', 'Brief and clear'],
        ['Reluctant', 'Unwilling to act']
      ], why: 'Precise vocabulary makes both writing and comprehension stronger.' }
    ]
  };
})(window.HSE = window.HSE || {});
