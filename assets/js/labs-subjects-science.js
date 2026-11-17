/* Dedicated subject simulations — Science stream. */
(function (HSE) {
  'use strict';
  var L = HSE.labs = HSE.labs || {};

  L['sim-sub-physics'] = {
    id: 'sim-sub-physics', kind: 'numeric', title: 'Virtual physics laboratory — motion',
    intro: 'A ball is launched at 20 m/s at 30° above level ground. Use g = 9.8 m/s² and ignore air resistance.',
    objectives: ['Resolve velocity into components', 'Calculate range, maximum height and time of flight', 'Explain why 45° gives maximum range'],
    notes: 'Range R = v² sin(2θ) / g. Maximum height H = v² sin²θ / (2g). Time of flight T = 2v sinθ / g.',
    steps: [
      { q: 'What is the horizontal range of the launch? (1 decimal place)', answer: 35.3, digits: 1, tolerance: 0.2, unit: 'm', hint: 'R = 400 × sin 60° ÷ 9.8', why: 'R = 20² sin 60° / 9.8 = 400 × 0.866 / 9.8 ≈ 35.3 m.' },
      { q: 'What is the maximum height reached? (1 decimal place)', answer: 5.1, digits: 1, tolerance: 0.1, unit: 'm', hint: 'Use the vertical component, 20 sin 30° = 10 m/s', why: 'H = 10² / (2 × 9.8) ≈ 5.1 m.' },
      { q: 'How long is the ball in the air? (2 decimal places)', answer: 2.04, digits: 2, tolerance: 0.03, unit: 's', hint: 'T = 2 × 10 ÷ 9.8', why: 'T = 2v sinθ / g = 20 / 9.8 ≈ 2.04 s.' },
      { q: 'Why does a 45° launch give the greatest range on level ground?', options: ['sin(2θ) is largest at 90°', 'The vertical velocity is zero', 'Air resistance is smallest there', 'The mass is reduced'], answer: 0, why: 'Range depends on sin(2θ), which reaches its maximum value of 1 when 2θ = 90°.' }
    ]
  };

  L['sim-sub-chemistry'] = {
    id: 'sim-sub-chemistry', kind: 'numeric', title: 'Chemistry experiment simulator — titration',
    intro: 'You titrate 25.0 mL of 0.100 M sodium hydroxide with 0.100 M hydrochloric acid.',
    objectives: ['Calculate amount of substance from concentration and volume', 'Identify the equivalence point', 'Choose a suitable indicator'],
    notes: 'n = c × V (V in litres). At equivalence, moles of acid equal moles of base.',
    steps: [
      { q: 'How many moles of NaOH are in the 25.0 mL sample? (4 decimal places)', answer: 0.0025, digits: 4, tolerance: 0.0001, unit: 'mol', hint: '0.100 × 0.0250', why: 'n = cV = 0.100 × 0.0250 = 0.00250 mol.' },
      { q: 'What volume of 0.100 M HCl reaches the equivalence point? (1 decimal place)', answer: 25.0, digits: 1, tolerance: 0.1, unit: 'mL', hint: 'The acid and base react 1:1 at equal concentration', why: 'Equal moles are needed, so equal volumes of equal concentration react: 25.0 mL.' },
      { q: 'What is the pH at the equivalence point of this strong acid–strong base titration?', answer: 7, digits: 0, tolerance: 0.1, hint: 'Neither ion hydrolyses', why: 'The salt formed is neutral, so the equivalence point is pH 7 at 25 °C.' },
      { q: 'Match each titration to a suitable indicator.', pairs: [
        ['Strong acid + strong base', 'Phenolphthalein or methyl orange'],
        ['Weak acid + strong base', 'Phenolphthalein'],
        ['Strong acid + weak base', 'Methyl orange']
      ], why: 'The indicator range must lie on the steep part of the pH curve.' }
    ]
  };

  L['sim-sub-mathematics'] = {
    id: 'sim-sub-mathematics', kind: 'numeric', title: 'Mathematical problem-solving environment — quadratics',
    intro: 'Work with the quadratic f(x) = x² − 4x + 1 and connect its algebra to its graph.',
    objectives: ['Evaluate the discriminant', 'Locate the vertex', 'Interpret the number of real roots'],
    notes: 'For ax² + bx + c: discriminant Δ = b² − 4ac, vertex x = −b/(2a), minimum value = f(−b/(2a)).',
    steps: [
      { q: 'What is the discriminant of x² − 4x + 1?', answer: 12, digits: 0, tolerance: 0, hint: 'b² − 4ac with a = 1, b = −4, c = 1', why: 'Δ = (−4)² − 4(1)(1) = 16 − 4 = 12.' },
      { q: 'At what x-value is the vertex?', answer: 2, digits: 0, tolerance: 0, hint: 'x = −b/(2a)', why: 'x = 4 / 2 = 2.' },
      { q: 'What is the minimum value of f(x)?', answer: -3, digits: 0, tolerance: 0, hint: 'Substitute x = 2 into f', why: 'f(2) = 4 − 8 + 1 = −3.' },
      { q: 'How many times does the graph cross the x-axis?', options: ['0', '1', '2', 'It cannot be determined'], answer: 2, why: 'Δ = 12 > 0, so there are two distinct real roots and two crossings.' }
    ]
  };

  L['sim-sub-biology'] = {
    id: 'sim-sub-biology', kind: 'match', title: 'Biology interactive laboratory — cells',
    intro: 'Identify cell organelles, calculate microscope magnification and put cell division in order.',
    objectives: ['Relate organelle structure to function', 'Calculate total magnification', 'Sequence the stages of mitosis'],
    notes: 'Total magnification = eyepiece magnification × objective magnification.',
    steps: [
      { q: 'Match each organelle to its main function.', pairs: [
        ['Mitochondrion', 'Releases energy through aerobic respiration'],
        ['Ribosome', 'Assembles proteins from amino acids'],
        ['Chloroplast', 'Carries out photosynthesis'],
        ['Nucleus', 'Contains DNA and controls the cell']
      ], why: 'Each organelle has a specialised structure that supports its function in the cell.' },
      { q: 'A cell is viewed with a 10× eyepiece and a 40× objective. What is the total magnification?', kind: 'numeric', answer: 400, digits: 0, tolerance: 0, unit: '×', hint: 'Multiply the two magnifications', why: '10 × 40 = 400×.' },
      { q: 'Which structure is present in plant cells but absent in animal cells?', options: ['Cell membrane', 'Chloroplast', 'Ribosome', 'Mitochondrion'], answer: 1, why: 'Chloroplasts carry out photosynthesis and occur in plant cells, not animal cells.' },
      { q: 'Put the stages of mitosis in the correct order.', kind: 'order', items: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'], why: 'Chromosomes condense, align, separate and then the nucleus reforms.' }
    ]
  };

  L['sim-sub-computer-science'] = {
    id: 'sim-sub-computer-science', kind: 'numeric', title: 'Programming and computing laboratory',
    intro: 'Trace a loop, convert binary data and order the stages of building a program.',
    objectives: ['Trace the result of a loop', 'Convert binary to decimal', 'Follow a disciplined development cycle'],
    notes: 'A while loop repeats while its condition is true. Binary 1101 means 8 + 4 + 1.',
    steps: [
      { q: 'What is printed by: total = 0; for i in 1..5: total += i; print(total)?', answer: 15, digits: 0, tolerance: 0, hint: 'Add 1 + 2 + 3 + 4 + 5', why: 'The loop sums 1 through 5: 15.' },
      { q: 'What is binary 1101 in decimal?', answer: 13, digits: 0, tolerance: 0, hint: '8 + 4 + 0 + 1', why: '1×8 + 1×4 + 0×2 + 1×1 = 13.' },
      { q: 'Order the stages of developing a program.', kind: 'order', items: ['Analyse the problem', 'Design the algorithm', 'Write the code', 'Test and debug'], why: 'Analysis and design come before coding; testing verifies the result.' },
      { q: 'A while loop continues repeating when…', options: ['its condition is true', 'its condition is false', 'it has run once', 'the program ends'], answer: 0, why: 'The condition is checked before each iteration and the loop continues while it is true.' }
    ]
  };

  L['sim-sub-computer-application'] = {
    id: 'sim-sub-computer-application', kind: 'match', title: 'Computer applications studio',
    intro: 'Choose the right application for a task, work with file sizes and follow a web request.',
    objectives: ['Match software to a real task', 'Convert between storage units', 'Describe how a web page is fetched'],
    notes: '1 GB = 1024 MB. A spreadsheet formula begins with = and can total a range.',
    steps: [
      { q: 'Match each application to its best use.', pairs: [
        ['Spreadsheet', 'Calculating totals and drawing charts'],
        ['Word processor', 'Writing and formatting a report'],
        ['Database', 'Storing and querying student records'],
        ['Web browser', 'Opening and displaying web pages']
      ], why: 'Each kind of application is designed around a different information task.' },
      { q: 'How many megabytes are in 1 gigabyte?', kind: 'numeric', answer: 1024, digits: 0, tolerance: 0, unit: 'MB', hint: 'Storage units step by 1024', why: '1 GB = 1024 MB in binary storage units.' },
      { q: 'Order the steps that load a web page.', kind: 'order', items: ['Type the address', 'Look up the domain name', 'Send an HTTP request', 'Receive the server response', 'Render the page'], why: 'The browser resolves the name, requests the resource, then renders the response.' },
      { q: 'What does the spreadsheet formula =SUM(A1:A5) do?', options: ['Adds the values in A1 to A5', 'Counts the cells in A1 to A5', 'Averages A1 to A5', 'Copies A1 into A5'], answer: 0, why: 'SUM adds every value in the given range.' }
    ]
  };

  L['sim-sub-electronics'] = {
    id: 'sim-sub-electronics', kind: 'numeric', title: 'Electronics and circuit laboratory',
    intro: 'Work with series and parallel circuits and identify common electronic components.',
    objectives: ['Add resistances in series', 'Apply Ohm\u2019s law', 'Recognise components by their function'],
    notes: 'Series: R = R1 + R2. Ohm\u2019s law: V = IR. Parallel branches share the same voltage.',
    steps: [
      { q: 'Two resistors of 2 kΩ and 3 kΩ are in series. What is the total resistance?', answer: 5, digits: 0, tolerance: 0, unit: 'kΩ', hint: 'Add the resistances', why: 'In series, R = 2 + 3 = 5 kΩ.' },
      { q: 'A 10 V supply is across 5 kΩ. What current flows?', answer: 2, digits: 0, tolerance: 0, unit: 'mA', hint: 'I = V/R = 10/5000 A', why: 'I = 10 / 5000 = 0.002 A = 2 mA.' },
      { q: 'Match each component to its function.', kind: 'match', pairs: [
        ['Diode', 'Allows current mainly in one direction'],
        ['Capacitor', 'Stores charge temporarily'],
        ['Transistor', 'Switches or amplifies a signal'],
        ['LED', 'Emits light when current flows']
      ], why: 'Each component exploits a different electrical property.' },
      { q: 'In a parallel circuit, what is the same across every branch?', options: ['Current', 'Resistance', 'Voltage', 'Power'], answer: 2, why: 'Parallel branches are connected across the same two nodes, so the voltage is equal.' }
    ]
  };

  L['sim-sub-statistics'] = {
    id: 'sim-sub-statistics', kind: 'numeric', title: 'Data and statistics studio',
    intro: 'Use the data set 4, 8, 12, 16, 20 to calculate averages and spread.',
    objectives: ['Calculate mean, median and range', 'Calculate population standard deviation', 'Recognise the effect of outliers'],
    notes: 'Mean = sum ÷ count. Population variance = mean of squared deviations. σ = √variance.',
    steps: [
      { q: 'What is the mean of the data set?', answer: 12, digits: 0, tolerance: 0, hint: '60 ÷ 5', why: 'The total is 60 and there are 5 values, so the mean is 12.' },
      { q: 'What is the median?', answer: 12, digits: 0, tolerance: 0, hint: 'The middle ordered value', why: 'The third of five ordered values is 12.' },
      { q: 'What is the range?', answer: 16, digits: 0, tolerance: 0, hint: 'Maximum − minimum', why: '20 − 4 = 16.' },
      { q: 'What is the population standard deviation? (2 decimal places)', answer: 5.66, digits: 2, tolerance: 0.05, hint: 'Variance = 160 ÷ 5 = 32', why: 'Squared deviations total 160; variance 32; σ = √32 ≈ 5.66.' },
      { q: 'Which average is most affected by one very large value?', options: ['Median', 'Mode', 'Mean', 'Range of the middle three'], answer: 2, why: 'The mean uses every value, so an extreme value pulls it strongly.' }
    ]
  };
})(window.HSE = window.HSE || {});
