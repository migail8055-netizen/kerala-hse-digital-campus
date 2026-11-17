/* Science practical simulations. */
(function (HSE) {
  'use strict';
  var L = HSE.labs = HSE.labs || {};

  function grid(ctx, w, h) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0b1713';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#17362c';
    ctx.lineWidth = 1;
    for (var x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (var y = 0; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
  }

  L['sim-projectile'] = {
    id: 'sim-projectile', kind: 'numeric', title: 'Projectile motion laboratory',
    intro: 'Change the launch angle and speed, watch the trajectory, then answer using g = 9.8 m/s².',
    objectives: ['Resolve velocity into horizontal and vertical components', 'Predict range from speed and angle', 'Explain why 45° maximises range on level ground'],
    notes: 'Air resistance is ignored. Range R = v² sin(2θ) / g, maximum height H = v² sin²θ / (2g).',
    stage: true, state: function () { return { angle: 45, speed: 20 }; },
    controls: [
      { key: 'angle', label: 'Launch angle (°)', min: 10, max: 80, step: 1, value: 45 },
      { key: 'speed', label: 'Launch speed (m/s)', min: 10, max: 40, step: 1, value: 20 }
    ],
    readout: function (s) {
      var rad = s.angle * Math.PI / 180;
      var range = s.speed * s.speed * Math.sin(2 * rad) / 9.8;
      var height = s.speed * s.speed * Math.pow(Math.sin(rad), 2) / 19.6;
      return '<div><span class="l">Range</span><b>' + range.toFixed(1) + ' m</b></div>' +
        '<div><span class="l">Max height</span><b>' + height.toFixed(1) + ' m</b></div>' +
        '<div><span class="l">Flight time</span><b>' + (2 * s.speed * Math.sin(rad) / 9.8).toFixed(2) + ' s</b></div>';
    },
    draw: function (ctx, w, h, s) {
      grid(ctx, w, h);
      var rad = s.angle * Math.PI / 180;
      var g = 9.8, v = s.speed;
      var tMax = 2 * v * Math.sin(rad) / g;
      var range = v * v * Math.sin(2 * rad) / g;
      var scaleX = (w - 80) / 90;
      var scaleY = (h - 60) / 25;
      ctx.strokeStyle = '#7fe3c3'; ctx.lineWidth = 2; ctx.beginPath();
      for (var i = 0; i <= 60; i++) {
        var t = tMax * i / 60;
        var x = 40 + v * Math.cos(rad) * t * scaleX;
        var y = h - 30 - (v * Math.sin(rad) * t - 0.5 * g * t * t) * scaleY;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = '#e7c77e';
      ctx.beginPath(); ctx.arc(40, h - 30, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#a9c9be'; ctx.font = '12px sans-serif';
      ctx.fillText('range ' + range.toFixed(1) + ' m', 44, 18);
      ctx.fillText('θ = ' + s.angle + '°, v = ' + s.speed + ' m/s', 44, 36);
    },
    steps: [
      { q: 'With v = 20 m/s at 45°, what is the horizontal range? (g = 9.8 m/s², answer in m, 1 decimal)', answer: 40.8, unit: 'm', digits: 1, tolerance: 0.2, hint: 'R = v² sin(2θ) / g', why: 'R = 400 × sin 90° / 9.8 = 40.8 m.' },
      { q: 'At the same speed, which launch angle gives the greatest range on level ground?', kind: 'choice', options: ['30°', '45°', '60°', '75°'], answer: 1, why: 'Range depends on sin(2θ), which is maximum when 2θ = 90°, so θ = 45°.' },
      { q: 'What is the maximum height reached at 45° and 20 m/s? (m, 1 decimal)', answer: 10.2, unit: 'm', digits: 1, tolerance: 0.2, hint: 'H = v² sin²θ / (2g)', why: 'H = 400 × 0.5 / 19.6 = 10.2 m.' },
      { q: 'At the highest point of the flight, what is the vertical component of velocity?', options: ['Equal to the launch speed', 'Zero', 'Maximum', 'Equal to the horizontal component'], answer: 1, why: 'The vertical velocity decreases steadily and is zero at the top; only the horizontal component remains.' }
    ]
  };

  L['sim-titration'] = {
    id: 'sim-titration', kind: 'numeric', title: 'Chemistry experiment simulator — acid–base titration',
    intro: 'Run a titration of 25.0 mL of 0.10 M HCl against 0.10 M NaOH and calculate the expected results.',
    objectives: ['Use M₁V₁ = M₂V₂ for a 1:1 neutralisation', 'Choose a suitable indicator', 'Read a burette correctly'],
    notes: 'At the equivalence point moles of acid equal moles of base. Phenolphthalein turns pink in base.',
    stage: true, state: function () { return { ml: 0 }; },
    controls: [{ key: 'ml', label: 'NaOH added (mL)', min: 0, max: 40, step: 0.5, value: 0 }],
    readout: function (s) {
      var molesAcid = 0.025 * 0.1;
      var molesBase = (s.ml / 1000) * 0.1;
      var ph = molesBase < molesAcid ? 2 + 3 * molesBase / molesAcid : molesBase === molesAcid ? 7 : 10 + Math.min(2, (molesBase - molesAcid) * 400);
      return '<div><span class="l">Acid moles</span><b>' + molesAcid.toFixed(4) + '</b></div>' +
        '<div><span class="l">Base moles</span><b>' + molesBase.toFixed(4) + '</b></div>' +
        '<div><span class="l">Approx pH</span><b>' + ph.toFixed(1) + '</b></div>';
    },
    draw: function (ctx, w, h, s) {
      grid(ctx, w, h);
      var cx = w / 2;
      ctx.fillStyle = '#cfe5dc';
      ctx.fillRect(cx - 8, 20, 16, 120);
      ctx.fillStyle = '#7fe3c3';
      ctx.fillRect(cx - 6, 22, 12, Math.min(118, s.ml * 3));
      ctx.fillStyle = '#cfe5dc';
      ctx.beginPath(); ctx.moveTo(cx - 55, 190); ctx.lineTo(cx + 55, 190); ctx.lineTo(cx + 40, 270); ctx.lineTo(cx - 40, 270); ctx.closePath(); ctx.fill();
      var base = s.ml / 1000 * 0.1, acid = 0.0025;
      ctx.fillStyle = base >= acid ? '#f08fb0' : '#8fd3f0';
      ctx.beginPath(); ctx.moveTo(cx - 48, 200); ctx.lineTo(cx + 48, 200); ctx.lineTo(cx + 36, 264); ctx.lineTo(cx - 36, 264); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#a9c9be'; ctx.font = '12px sans-serif';
      ctx.fillText('25.0 mL HCl + indicator', 20, 290);
      ctx.fillText('NaOH delivered: ' + s.ml.toFixed(1) + ' mL', w - 190, 30);
    },
    steps: [
      { q: 'How many moles of HCl are in 25.0 mL of 0.10 M solution?', answer: 0.0025, unit: 'mol', digits: 4, tolerance: 0.0002, hint: 'moles = M × V(litres)', why: '0.025 L × 0.10 mol/L = 0.0025 mol.' },
      { q: 'What volume of 0.10 M NaOH is needed to reach the equivalence point? (mL)', answer: 25, unit: 'mL', digits: 1, tolerance: 0.2, hint: 'M₁V₁ = M₂V₂ for a 1:1 reaction', why: 'Equal concentration and 1:1 stoichiometry means equal volume: 25.0 mL.' },
      { q: 'Which indicator is most suitable for this strong acid–strong base titration?', options: ['Methyl orange (pH 3.1–4.4)', 'Phenolphthalein (pH 8.3–10)', 'Litmus only', 'No indicator is needed'], answer: 1, why: 'The equivalence point is near pH 7, so an indicator changing around 8–10 gives a sharp visible endpoint.' },
      { q: 'At the endpoint the solution is faint pink. What has happened chemically?', options: ['Excess acid remains', 'Acid and base have exactly neutralised', 'The indicator has decomposed', 'NaOH has precipitated'], answer: 1, why: 'A persistent faint pink means the first slight excess of base; acid and base have neutralised.' }
    ]
  };

  L['sim-cell'] = {
    id: 'sim-cell', kind: 'match', title: 'Biology interactive laboratory — cell structure',
    intro: 'Match each cell structure to its function, then answer the magnification question.',
    objectives: ['Relate structure to function in eukaryotic cells', 'Calculate total magnification', 'Distinguish plant and animal cells'],
    steps: [
      { q: 'Match each organelle to its main function.', pairs: [
        ['Mitochondrion', 'Aerobic respiration and ATP supply'],
        ['Ribosome', 'Protein synthesis'],
        ['Chloroplast', 'Photosynthesis using light energy'],
        ['Nucleus', 'Stores DNA and controls activity']
      ], why: 'Each organelle is specialised: ATP, protein assembly, light capture and genetic control.' },
      { q: 'Which structure is present in a plant cell but absent in an animal cell?', options: ['Cell membrane', 'Cell wall', 'Ribosome', 'Mitochondrion'], answer: 1, why: 'A cellulose cell wall gives plant cells shape and support.' },
      { q: 'A specimen is viewed with a 10× eyepiece and a 40× objective. What is the total magnification?', answer: 400, unit: '×', digits: 0, tolerance: 0, hint: 'Multiply the two magnifications', why: '10 × 40 = 400×.' },
      { q: 'Why are cells fixed and stained before observation?', options: ['To make them larger', 'To preserve structure and add contrast', 'To kill bacteria only', 'To make them move'], answer: 1, why: 'Fixation preserves structure; stains add contrast so organelles become visible.' }
    ]
  };

  L['sim-circuit'] = {
    id: 'sim-circuit', kind: 'numeric', title: 'Computer hardware and electronics — circuits',
    intro: 'Apply Ohm\'s law and series rules to the circuit, then answer.',
    objectives: ['Use V = IR', 'Add resistances in series', 'Calculate electrical power'],
    notes: 'Series: R = R₁ + R₂, current is the same everywhere. P = VI = I²R.',
    stage: true, state: function () { return { volts: 12 }; },
    controls: [{ key: 'volts', label: 'Supply voltage (V)', min: 3, max: 24, step: 1, value: 12 }],
    readout: function (s) {
      var r = 10;
      return '<div><span class="l">Total R</span><b>10 Ω</b></div><div><span class="l">Current</span><b>' + (s.volts / r).toFixed(2) + ' A</b></div>' +
        '<div><span class="l">Power</span><b>' + (s.volts * s.volts / r).toFixed(1) + ' W</b></div>';
    },
    draw: function (ctx, w, h, s) {
      grid(ctx, w, h);
      ctx.strokeStyle = '#7fe3c3'; ctx.lineWidth = 3;
      ctx.strokeRect(90, 70, 460, 150);
      ctx.fillStyle = '#e7c77e'; ctx.font = '14px sans-serif';
      ctx.fillText('+ ' + s.volts + ' V −', 90, 55);
      ctx.fillStyle = '#cfe5dc';
      ctx.fillRect(250, 60, 90, 22); ctx.fillRect(250, 208, 90, 22);
      ctx.fillStyle = '#0b1713'; ctx.font = '12px sans-serif';
      ctx.fillText('R₁ = 4 Ω', 262, 76); ctx.fillText('R₂ = 6 Ω', 262, 224);
      ctx.fillStyle = '#a9c9be';
      ctx.fillText('I = ' + (s.volts / 10).toFixed(2) + ' A', 90, 250);
    },
    steps: [
      { q: 'Two resistors of 4 Ω and 6 Ω are in series. What is the total resistance?', answer: 10, unit: 'Ω', digits: 1, tolerance: 0.01, hint: 'Series resistances add', why: 'R = 4 + 6 = 10 Ω.' },
      { q: 'With a 12 V supply across 10 Ω, what current flows? (A)', answer: 1.2, unit: 'A', digits: 2, tolerance: 0.02, hint: 'I = V / R', why: 'I = 12 / 10 = 1.2 A.' },
      { q: 'How much power is dissipated in total at 12 V and 1.2 A? (W)', answer: 14.4, unit: 'W', digits: 1, tolerance: 0.2, hint: 'P = V × I', why: 'P = 12 × 1.2 = 14.4 W.' },
      { q: 'How should an ammeter be connected to measure the current through a resistor?', options: ['In parallel with it', 'In series with it', 'Across the supply only', 'It does not matter'], answer: 1, why: 'An ammeter must carry the current, so it is connected in series and has very low resistance.' }
    ]
  };

  L['sim-code'] = {
    id: 'sim-code', kind: 'choice', title: 'Programming laboratory',
    intro: 'Read small programs, predict their output and reason about loops.',
    objectives: ['Trace a loop', 'Understand accumulation', 'Choose correct syntax'],
    steps: [
      { q: 'What does this print?\n\ntotal = 0\nfor i in range(1, 5):\n    total += i\nprint(total)', options: ['4', '10', '15', '5'], answer: 1, why: 'range(1, 5) gives 1, 2, 3, 4; their sum is 10.' },
      { q: 'How many times does the body of `for i in range(3, 8)` run?', options: ['3', '4', '5', '8'], answer: 2, why: 'Values 3, 4, 5, 6, 7 → five iterations.' },
      { q: 'Which line correctly stores a name entered by the user in Python 3?', options: ['name = input("Name: ")', 'name = print("Name")', 'input = name', 'name := input'], answer: 0, why: 'input() returns a string; print() displays and returns None.' },
      { q: 'A list scores = [4, 7, 9]. What is scores[1]?', options: ['4', '7', '9', 'An error'], answer: 1, why: 'Python lists are zero-indexed, so index 1 is the second element, 7.' }
    ]
  };

  L['sim-maths'] = {
    id: 'sim-maths', kind: 'numeric', title: 'Mathematical problem-solving environment',
    intro: 'Work each problem and enter the exact numerical answer.',
    objectives: ['Differentiate polynomials', 'Evaluate a definite integral', 'Calculate probability'],
    notes: 'Use exact values; decimals are accepted to the stated precision.',
    steps: [
      { q: 'If f(x) = x², what is f′(3)?', answer: 6, digits: 0, tolerance: 0, hint: 'f′(x) = 2x', why: 'f′(x) = 2x, so f′(3) = 6.' },
      { q: 'Evaluate ∫₀² 2x dx.', answer: 4, digits: 0, tolerance: 0, hint: 'The antiderivative of 2x is x²', why: '[x²]₀² = 4 − 0 = 4.' },
      { q: 'A fair coin is tossed twice. What is the probability of two heads? (decimal)', answer: 0.25, digits: 2, tolerance: 0.01, hint: 'Multiply independent probabilities', why: '0.5 × 0.5 = 0.25.' },
      { q: 'What is the sum of the first 10 positive integers?', answer: 55, digits: 0, tolerance: 0, hint: 'n(n+1)/2', why: '10 × 11 / 2 = 55.' }
    ]
  };

  L['sim-memory'] = {
    id: 'sim-memory', kind: 'choice', title: 'Memory and cognition laboratory',
    intro: 'Study the digit string, then answer without scrolling back. This demonstrates short-term memory limits.',
    objectives: ['Relate memory span to short-term storage', 'Explain chunking', 'Identify rehearsal strategies'],
    steps: [
      { q: 'Sequence shown for 10 seconds: 4 9 1 7 3 8 2 6 5. Which digit was fourth?', options: ['1', '7', '3', '8'], answer: 1, why: 'The fourth digit was 7. Most people hold about 7 ± 2 items without chunking.' },
      { q: 'Grouping 914 738 265 into three chunks mainly demonstrates:', options: ['Decay', 'Chunking', 'Proactive interference', 'Iconic memory'], answer: 1, why: 'Chunking recodes individual digits into larger meaningful units, expanding effective span.' },
      { q: 'Which strategy best supports long-term retention of a chapter?', options: ['Reading it once quickly', 'Highlighting every line', 'Retrieval practice with spacing', 'Listening to music while scrolling'], answer: 2, why: 'Spaced retrieval practice produces stronger, more durable memory than re-reading.' },
      { q: 'The capacity of short-term memory is commonly estimated at:', options: ['2 ± 1 items', '7 ± 2 items', '20 items', 'Unlimited'], answer: 1, why: 'Miller\'s classic estimate is 7 ± 2 chunks.' }
    ]
  };

  L['sim-perceptron'] = {
    id: 'sim-perceptron', kind: 'numeric', title: 'AI and machine learning beginner project — a perceptron',
    intro: 'A perceptron computes a weighted sum and fires when it exceeds a threshold. Explore the decision boundary.',
    objectives: ['Compute a weighted sum', 'Explain the role of a threshold', 'See how a weight changes the boundary'],
    notes: 'Output = 1 if w₁x₁ + w₂x₂ ≥ threshold, otherwise 0.',
    stage: true, state: function () { return { w1: 0.5, w2: 0.3 }; },
    controls: [
      { key: 'w1', label: 'Weight w₁', min: -1, max: 1, step: 0.1, value: 0.5 },
      { key: 'w2', label: 'Weight w₂', min: -1, max: 1, step: 0.1, value: 0.3 }
    ],
    readout: function (s) {
      return '<div><span class="l">w₁</span><b>' + s.w1.toFixed(1) + '</b></div><div><span class="l">w₂</span><b>' + s.w2.toFixed(1) + '</b></div>' +
        '<div><span class="l">Threshold</span><b>0.5</b></div>';
    },
    draw: function (ctx, w, h, s) {
      grid(ctx, w, h);
      var ox = 40, oy = h - 30, sx = (w - 70), sy = (h - 60);
      ctx.strokeStyle = '#7fe3c3'; ctx.lineWidth = 2;
      ctx.beginPath();
      if (Math.abs(s.w2) > 0.01) {
        var x1 = 0, y1 = (0.5 - s.w1 * 0) / s.w2;
        var x2 = 1, y2 = (0.5 - s.w1 * 1) / s.w2;
        ctx.moveTo(ox + x1 * sx, oy - y1 * sy);
        ctx.lineTo(ox + x2 * sx, oy - y2 * sy);
      }
      ctx.stroke();
      ctx.fillStyle = '#e7c77e';
      [[0.2, 0.7], [0.3, 0.8], [0.1, 0.6], [0.7, 0.2], [0.8, 0.1], [0.9, 0.3]].forEach(function (p) {
        var on = s.w1 * p[0] + s.w2 * p[1] >= 0.5;
        ctx.fillStyle = on ? '#7fe3c3' : '#f08fb0';
        ctx.beginPath(); ctx.arc(ox + p[0] * sx, oy - p[1] * sy, 5, 0, Math.PI * 2); ctx.fill();
      });
      ctx.fillStyle = '#a9c9be'; ctx.font = '12px sans-serif';
      ctx.fillText('x₁ →', w - 50, h - 12); ctx.fillText('x₂ ↑', 12, 20);
    },
    steps: [
      { q: 'With w₁ = 0.5, w₂ = 0.3, x₁ = 2, x₂ = 4, what is the weighted sum?', answer: 2.2, digits: 1, tolerance: 0.05, hint: 'w₁x₁ + w₂x₂', why: '0.5×2 + 0.3×4 = 1.0 + 1.2 = 2.2.' },
      { q: 'Using the same sum and a threshold of 0.5, what does the perceptron output?', options: ['0', '1', '0.5', '2.2'], answer: 1, why: '2.2 ≥ 0.5, so the perceptron fires: output 1.' },
      { q: 'Increasing one weight rotates the decision boundary. What does the boundary represent?', options: ['Points with equal weighted sum', 'Training errors only', 'The data mean', 'The learning rate'], answer: 0, why: 'The boundary is the set of inputs where the weighted sum equals the threshold.' },
      { q: 'A single perceptron cannot solve which problem?', options: ['AND', 'OR', 'XOR', 'NOT'], answer: 2, why: 'XOR is not linearly separable; a single linear boundary cannot separate its classes.' }
    ]
  };

  L['sim-hardware'] = {
    id: 'sim-hardware', kind: 'match', title: 'Computer hardware simulations',
    intro: 'Identify components by function and convert between binary and decimal.',
    objectives: ['Identify CPU, RAM and storage roles', 'Convert binary numbers', 'Distinguish volatile from non-volatile memory'],
    steps: [
      { q: 'Match each component to its function.', pairs: [
        ['CPU', 'Fetches, decodes and executes instructions'],
        ['RAM', 'Volatile working memory for running programs'],
        ['SSD', 'Non-volatile mass storage'],
        ['GPU', 'Parallel processing for graphics and ML']
      ], why: 'Each part has a distinct role in the fetch–execute–store cycle.' },
      { q: 'What is binary 1011 in decimal?', kind: 'numeric', answer: 11, digits: 0, tolerance: 0, hint: '8 + 0 + 2 + 1', why: '8 + 2 + 1 = 11.' },
      { q: 'Which memory loses its contents when power is removed?', options: ['ROM', 'RAM', 'SSD', 'Hard disk'], answer: 1, why: 'RAM is volatile; ROM, SSDs and hard disks retain data without power.' },
      { q: 'Which unit is larger?', options: ['1 MB', '1 GB', '1 KB', '1 TB'], answer: 3, why: 'KB < MB < GB < TB.' }
    ]
  };

  L['sim-stats'] = {
    id: 'sim-stats', kind: 'numeric', title: 'Statistics laboratory',
    intro: 'Use the data set 4, 6, 8, 10, 12 for each question.',
    objectives: ['Calculate mean, median and range', 'Interpret standard deviation', 'Choose appropriate averages'],
    steps: [
      { q: 'What is the mean of 4, 6, 8, 10, 12?', answer: 8, digits: 1, tolerance: 0.01, hint: 'Sum ÷ count', why: '40 ÷ 5 = 8.' },
      { q: 'What is the median?', answer: 8, digits: 1, tolerance: 0.01, hint: 'The middle value of ordered data', why: 'With five ordered values the third is 8.' },
      { q: 'What is the range?', answer: 8, digits: 1, tolerance: 0.01, hint: 'Maximum − minimum', why: '12 − 4 = 8.' },
      { q: 'What is the population standard deviation? (2 decimals)', answer: 2.83, digits: 2, tolerance: 0.05, hint: 'Variance = 40/5 = 8', why: 'Deviations ±4, ±2, 0: variance 8, so σ = √8 ≈ 2.83.' },
      { q: 'Which measure is most affected by a single extreme value?', options: ['Median', 'Mode', 'Mean', 'Range of the middle three'], answer: 2, why: 'The mean uses every value, so an outlier pulls it strongly; the median resists this.' }
    ]
  };
})(window.HSE = window.HSE || {});
