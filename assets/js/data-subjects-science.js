/* Science stream subjects. */
(function (HSE) {
  'use strict';
  var D = HSE.defineSubject;

  D('physics', {
    name: 'Physics', short: 'Physics', icon: '⚛', colour: '#0e7c66',
    streams: ['science'],
    description: 'Measure the world, build models and test them against experiment.',
    years: {
      1: ['Units and Measurements :: SI units | Dimensional analysis | Errors and significant figures',
          'Motion in a Straight Line :: Position and displacement | Uniform and non-uniform motion | Kinematic graphs',
          'Laws of Motion :: Newton\u2019s laws | Friction | Circular motion and banking',
          'Work, Energy and Power :: Work-energy theorem | Conservation of energy | Collisions and power',
          'Gravitation :: Kepler\u2019s laws | Universal gravitation | Satellites and escape velocity',
          'Thermodynamics :: Thermal equilibrium | First law | Heat engines and efficiency',
          'Oscillations and Waves :: Simple harmonic motion | Wave equation | Superposition and beats'],
      2: ['Electric Charges and Fields :: Coulomb\u2019s law | Electric field and flux | Gauss\u2019s law',
          'Current Electricity :: Ohm\u2019s law | Kirchhoff\u2019s rules | Wheatstone bridge and potentiometer',
          'Magnetic Effects and Magnetism :: Biot\u2013Savart law | Ampere\u2019s law | Moving coil galvanometer',
          'Electromagnetic Induction and AC :: Faraday\u2019s laws | Self and mutual inductance | AC circuits and resonance',
          'Ray Optics and Optical Instruments :: Reflection and refraction | Lenses and prisms | Microscope and telescope',
          'Dual Nature, Atoms and Nuclei :: Photoelectric effect | Bohr model | Nuclear binding energy',
          'Semiconductor Electronics :: p-n junction | Rectifiers | Transistors and logic gates']
    },
    practicals: [
      ['sim-projectile', 'Virtual Physics Laboratory', 'Launch a projectile, plot the trajectory and measure range, height and time of flight.'],
      ['sim-circuit', 'Circuit Builder', 'Build series and parallel circuits, measure current and voltage, and verify Ohm\u2019s law.'],
      ['sim-project', 'Scientific Research Project', 'Frame a research question, plan variables and record a method for an investigation.']
    ]
  });

  D('chemistry', {
    name: 'Chemistry', short: 'Chemistry', icon: '🧪', colour: '#1c7ed6',
    streams: ['science'],
    description: 'From atoms and bonds to reactions you can run safely on screen.',
    years: {
      1: ['Some Basic Concepts of Chemistry :: Mole concept | Stoichiometry | Concentration terms',
          'Structure of Atom :: Quantum numbers | Orbitals and shapes | Electronic configuration',
          'Classification and Periodicity :: Periodic trends | Ionisation enthalpy | Anomalies',
          'Chemical Bonding :: Lewis structures | VSEPR and geometry | Hybridisation',
          'Thermodynamics and Equilibrium :: Enthalpy and entropy | Le Chatelier | pH and buffers',
          'Redox Reactions :: Oxidation numbers | Balancing redox | Electrode potentials',
          'Organic Chemistry Basics :: IUPAC naming | Isomerism | Reaction mechanisms'],
      2: ['Solutions :: Colligative properties | Raoult\u2019s law | Henry\u2019s law',
          'Electrochemistry :: Nernst equation | Conductance | Batteries and corrosion',
          'Chemical Kinetics :: Rate laws | Order of reaction | Arrhenius equation',
          'd and f Block Elements :: Transition metal trends | Interstitial compounds | Lanthanoid contraction',
          'Coordination Compounds :: Werner\u2019s theory | Crystal field | Isomerism',
          'Organic Compounds :: Haloalkanes | Alcohols and phenols | Aldehydes, ketones and acids',
          'Biomolecules and Polymers :: Carbohydrates | Proteins and enzymes | Addition and condensation polymers']
    },
    practicals: [
      ['sim-titration', 'Chemistry Experiment Simulator', 'Titrate an acid against a base, read the pH curve live and choose the right indicator.'],
      ['sim-maths', 'Mole and Concentration Problems', 'Work quantitative chemistry problems and check each step numerically.']
    ]
  });

  D('mathematics', {
    name: 'Mathematics', short: 'Maths', icon: '∑', colour: '#7048e8',
    streams: ['science', 'commerce'],
    description: 'Solve, plot and generalise — mathematics as a working tool.',
    years: {
      1: ['Sets, Relations and Functions :: Set operations | Types of relations | Domain and range',
          'Trigonometric Functions :: Identities | Graphs | Inverse trigonometric basics',
          'Complex Numbers and Quadratics :: Argand plane | Modulus and argument | Roots of equations',
          'Permutations, Combinations and Binomial :: Counting principles | nCr | Binomial expansion',
          'Sequences and Series :: AP and GP | Sums of series | Special series',
          'Straight Lines and Conic Sections :: Slope forms | Circle | Parabola, ellipse, hyperbola',
          'Limits, Statistics and Probability :: Standard limits | Mean and variance | Classical probability'],
      2: ['Relations, Functions and Inverse Trigonometry :: Composition | Invertible functions | Principal values',
          'Matrices and Determinants :: Matrix algebra | Determinant properties | Solving linear systems',
          'Continuity and Differentiability :: Limits and continuity | Chain rule | Logarithmic differentiation',
          'Applications of Derivatives :: Tangents and normals | Maxima and minima | Rate of change',
          'Integrals and Differential Equations :: Standard integrals | Definite integrals | First order equations',
          'Vectors and Three-Dimensional Geometry :: Dot and cross product | Lines and planes | Shortest distance',
          'Probability :: Conditional probability | Bayes\u2019 theorem | Random variables and mean']
    },
    practicals: [
      ['sim-maths', 'Mathematical Problem-Solving Environment', 'Solve quadratics and see exactly how each coefficient reshapes the parabola.'],
      ['sim-stats', 'Data and Statistics Studio', 'Load data, draw a histogram and watch mean, median and spread respond.']
    ]
  });

  D('biology', {
    name: 'Biology', short: 'Biology', icon: '🧬', colour: '#2b8a3e',
    streams: ['science'],
    description: 'Life from the cell to the ecosystem, explored interactively.',
    years: {
      1: ['The Living World :: Taxonomy | Nomenclature | Classification systems',
          'Plant and Animal Kingdom :: Algae to angiosperms | Phylum characteristics | Symmetry and body plans',
          'Cell: Structure and Function :: Cell organelles | Cell cycle | Biomolecules',
          'Plant Physiology :: Photosynthesis | Respiration | Transport in plants',
          'Human Physiology I :: Digestion | Breathing and gas exchange | Circulation',
          'Human Physiology II :: Excretion | Locomotion | Neural and chemical coordination'],
      2: ['Reproduction in Organisms :: Sexual reproduction in plants | Human reproductive system | Reproductive health',
          'Genetics and Inheritance :: Mendel\u2019s laws | Chromosomal disorders | Molecular basis of inheritance',
          'Evolution :: Evidence for evolution | Natural selection | Human evolution',
          'Human Health and Disease :: Immunity | Pathogens | Cancer and drug abuse',
          'Microbes and Biotechnology :: Industrial microbes | rDNA technology | Applications',
          'Ecology and Environment :: Ecosystem energy flow | Biodiversity | Conservation']
    },
    practicals: [
      ['sim-cell', 'Biology Interactive Laboratory', 'Explore plant and animal cells, identify organelles and test your identification.'],
      ['sim-survey', 'Field Study and Sampling', 'Plan a quadrat or survey sample and analyse what you recorded.'],
      ['sim-project', 'Scientific Research Project', 'Design an investigation into a living system with variables and controls.']
    ]
  });

  D('computer-science', {
    name: 'Computer Science', short: 'Computer Sci', icon: '💻', colour: '#0b7285',
    streams: ['science', 'commerce'],
    description: 'Programming, data structures, databases and a first taste of machine learning.',
    years: {
      1: ['Computer Systems :: Number systems | Boolean logic | Hardware and software',
          'Problem Solving and Python Basics :: Algorithms | Data types | Input and output',
          'Control Flow :: Conditionals | Loops | Nested control structures',
          'Functions and Modules :: Parameters and scope | Recursion | Standard library',
          'Strings and Lists :: String methods | List operations | Slicing',
          'Tuples, Dictionaries and Sets :: Immutable sequences | Key-value data | Set operations'],
      2: ['Data Structures :: Stacks and queues | Linked lists | Searching and sorting',
          'Object Oriented Programming :: Classes and objects | Inheritance | Polymorphism',
          'Database Concepts and SQL :: Relational model | DDL and DML | Joins and aggregation',
          'Boolean Algebra and Logic Circuits :: Truth tables | Karnaugh maps | Adders and flip-flops',
          'Computer Networks :: Topologies | Protocols | Internet and security',
          'Python and SQL Integration :: Connectors | Parameterised queries | Mini applications']
    },
    practicals: [
      ['sim-code', 'Programming and Coding Laboratory', 'Write and debug programs against automated tests, with instant feedback.'],
      ['sim-perceptron', 'AI and Machine Learning Beginner Project', 'Train a perceptron to separate two classes and watch the boundary learn.'],
      ['sim-hardware', 'Computer Hardware Simulation', 'Assemble a machine that meets a workload brief without exceeding budget.']
    ]
  });

  D('computer-application', {
    name: 'Computer Application', short: 'Computer App', icon: '🖥', colour: '#495057',
    streams: ['science', 'commerce', 'humanities'],
    description: 'Practical computing — office tools, web pages, databases and digital citizenship.',
    years: {
      1: ['IT and the Digital World :: Computer organisation | Storage | Open source',
          'Word Processing and Documentation :: Formatting | Tables | Mail merge',
          'Spreadsheets and Data Handling :: Formulas | Functions | Charts',
          'Databases and Information Retrieval :: Tables and records | Queries | Reports',
          'Web Page Design :: HTML structure | Links and images | Tables and forms',
          'Digital Citizenship :: Cyber safety | Netiquette | Data privacy'],
      2: ['Networking and the Internet :: IP addressing | Services | Cloud computing',
          'Advanced HTML and CSS :: Semantic markup | Layout | Responsive design',
          'Client-side Scripting :: JavaScript basics | DOM | Events and validation',
          'Database Applications :: SQL queries | Forms and reports | Data integrity',
          'E-Governance and E-Commerce :: Digital payments | Public services | Security',
          'Cyber Ethics and Law :: IT Act | Copyright | Responsible use']
    },
    practicals: [
      ['sim-hardware', 'Computer Hardware Simulations', 'Match components to requirements and assemble a working computer.'],
      ['sim-code', 'Web and Scripting Laboratory', 'Practise logic and small scripts with automated tests.'],
      ['sim-newsroom', 'Digital Content Studio', 'Verify sources and write responsibly for a digital audience.']
    ]
  });

  D('electronics', {
    name: 'Electronics', short: 'Electronics', icon: '🔌', colour: '#c92a2a',
    streams: ['science'],
    description: 'Components, circuits and the logic gates inside every device.',
    years: {
      1: ['Passive Components :: Resistors and capacitors | Inductors | Colour codes and tolerances',
          'Semiconductor Physics :: Intrinsic and extrinsic | p-n junction | Diode characteristics',
          'Rectifiers and Filters :: Half wave | Full wave bridge | Ripple and filters',
          'Transistors :: BJT operation | Biasing | Small signal amplifier',
          'Amplifiers and Oscillators :: Gain and feedback | RC oscillator | Operational amplifier basics',
          'Power Supplies :: Transformers | Regulators | Protection circuits'],
      2: ['Operational Amplifiers :: Inverting and non-inverting | Summing and integration | Comparators',
          'Digital Logic :: Gates | Boolean simplification | Combinational circuits',
          'Number Systems and Codes :: Binary arithmetic | BCD and Gray code | Parity',
          'Sequential Logic :: Flip-flops | Counters | Registers',
          'Microcontrollers :: Architecture | Input and output | Simple control programs',
          'Communication Systems :: Modulation | Antennas | Optical fibre']
    },
    practicals: [
      ['sim-circuit', 'Circuit and Electronics Laboratory', 'Build series and parallel circuits, measure current and voltage, verify Kirchhoff\u2019s laws.'],
      ['sim-hardware', 'Hardware and Component Simulation', 'Assemble a system from compatible components within a budget.']
    ]
  });

  D('statistics', {
    name: 'Statistics', short: 'Statistics', icon: '📊', colour: '#5f3dc4',
    streams: ['science', 'commerce', 'humanities'],
    description: 'Collect data, describe it honestly and draw defensible conclusions.',
    years: {
      1: ['Data Collection and Presentation :: Primary and secondary data | Frequency tables | Diagrams',
          'Measures of Central Tendency :: Mean | Median | Mode and weighted averages',
          'Measures of Dispersion :: Range and quartiles | Standard deviation | Coefficient of variation',
          'Correlation and Regression :: Scatter diagrams | Karl Pearson coefficient | Lines of fit',
          'Probability :: Sample space | Addition and multiplication rules | Conditional probability',
          'Sampling and Surveys :: Sampling methods | Questionnaire design | Sources of bias'],
      2: ['Random Variables :: Discrete and continuous | Expectation | Variance',
          'Probability Distributions :: Binomial | Poisson | Normal curve',
          'Statistical Inference :: Estimation | Confidence intervals | Tests of significance',
          'Chi-square and Goodness of Fit :: Contingency tables | Test procedure | Interpretation',
          'Index Numbers and Time Series :: Price indices | Trends | Moving averages',
          'Applied Statistics :: Official statistics | Data interpretation | Report writing']
    },
    practicals: [
      ['sim-stats', 'Data and Statistics Studio', 'Explore a dataset, draw the histogram and read mean, median and spread.'],
      ['sim-survey', 'Survey Design and Analysis', 'Design a questionnaire, collect responses and analyse the result.'],
      ['sim-policy', 'Economic Policy Simulation', 'Use indicators to reason about policy trade-offs with data.']
    ]
  });
})(window.HSE = window.HSE || {});
