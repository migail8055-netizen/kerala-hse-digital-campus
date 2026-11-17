/* Commerce stream subjects. */
(function (HSE) {
  'use strict';
  var D = HSE.defineSubject;

  D('accountancy', {
    name: 'Accountancy', short: 'Accountancy', icon: '📒', colour: '#b26a00',
    streams: ['commerce'],
    description: 'Record, classify, summarise and report — the language of business.',
    years: {
      1: ['Introduction to Accounting :: Objectives | Users of accounts | Basic terms',
          'Theory Base of Accounting :: Accounting concepts | Conventions | Accounting standards',
          'Recording of Transactions :: Source documents | Journal | Ledger posting',
          'Bank Reconciliation Statement :: Cash book | Causes of difference | Preparation',
          'Trial Balance and Rectification :: Preparation | Errors | Suspense account',
          'Depreciation and Provisions :: Straight line | Written down value | Reserves',
          'Financial Statements of Sole Proprietor :: Trading account | Profit and loss | Balance sheet'],
      2: ['Accounting for Partnership :: Profit sharing ratio | Capital accounts | Interest on capital',
          'Admission of a Partner :: Sacrificing ratio | Revaluation | Goodwill',
          'Retirement and Death of a Partner :: Gaining ratio | Settlement | Executor\u2019s account',
          'Company Accounts :: Share capital | Issue and forfeiture | Debentures',
          'Financial Statement Analysis :: Comparative and common size | Ratio analysis | Interpretation',
          'Cash Flow Statement :: Operating activities | Investing and financing | Preparation',
          'Project Work :: Voucher analysis | Ledger preparation | Project presentation']
    },
    practicals: [
      ['sim-journal', 'Accounting and Bookkeeping Simulator', 'Post journal entries, see the ledger update and check whether the trial balance agrees.'],
      ['sim-financials', 'Financial Statement Preparation', 'Build a trading and profit and loss account from a trial balance and check the totals.'],
      ['sim-business', 'Virtual Business Creation', 'Design a product, set price and cost, and see whether the venture earns profit.'],
      ['sim-partnership', 'Partnership Business Simulation', 'Write a profit-sharing deed and settle a partnership dispute with numbers.'],
      ['sim-breakeven', 'Profit and Loss Management', 'Find the break-even point and test pricing decisions against fixed costs.']
    ]
  });

  D('business-studies', {
    name: 'Business Studies', short: 'Business', icon: '🏢', colour: '#e8590c',
    streams: ['commerce'],
    description: 'How organisations are formed, financed, managed and held to account.',
    years: {
      1: ['Nature and Purpose of Business :: Economic activity | Objectives | Business risks',
          'Forms of Business Organisation :: Sole proprietorship | Partnership | Companies',
          'Public and Private Sector :: Departmental undertakings | Statutory corporations | Disinvestment',
          'Business Services :: Banking | Insurance | Transport and warehousing',
          'Emerging Modes of Business :: E-business | Outsourcing | Digital payments',
          'Social Responsibility and Ethics :: Stakeholders | CSR | Business ethics'],
      2: ['Nature of Management :: Management as science and art | Levels | Coordination',
          'Principles of Management :: Taylor | Fayol | Applicability today',
          'Planning and Organising :: Types of plans | Delegation | Decentralisation',
          'Staffing and Directing :: Recruitment | Training | Motivation and leadership',
          'Controlling :: Process | Techniques | Management by exception',
          'Financial and Marketing Management :: Capital structure | Marketing mix | Consumer protection']
    },
    practicals: [
      ['sim-business', 'Virtual Business Creation', 'Turn an idea into a venture with pricing, costs and a first year of trade.'],
      ['sim-case', 'Business Management Challenges', 'Handle staffing, quality and cash-flow decisions and watch the effect on your indicators.'],
      ['sim-marketing', 'Marketing Campaign', 'Split a campaign budget across channels and measure the return.'],
      ['sim-inventory', 'Virtual Stock and Inventory Management', 'Run thirty days of demand and keep stockouts and holding cost under control.']
    ]
  });

  D('economics', {
    name: 'Economics', short: 'Economics', icon: '💹', colour: '#087f5b',
    streams: ['commerce', 'humanities'],
    description: 'Scarcity, choice and the forces that shape incomes, prices and policy.',
    years: {
      1: ['Indian Economy at Independence :: Agrarian structure | Industry | Trade and infrastructure',
          'Planning and Development :: Five year plans | Liberalisation | NITI Aayog',
          'Poverty and Inequality :: Measurement | Causes | Policy responses',
          'Human Capital and Rural Development :: Education and health | Credit | Rural infrastructure',
          'Employment and Infrastructure :: Workforce patterns | Informal sector | Energy and transport',
          'Environment and Sustainable Development :: Resource depletion | Pollution | Sustainable goals'],
      2: ['National Income Accounting :: GDP and GNP | Methods of measurement | Real vs nominal',
          'Money and Banking :: Functions of money | Credit creation | Central bank policy',
          'Determination of Income :: Aggregate demand | Multiplier | Equilibrium output',
          'Government Budget :: Receipts and expenditure | Deficits | Fiscal policy',
          'Balance of Payments :: Current and capital account | Exchange rate | Trade policy',
          'Development Experience of India :: Growth and structural change | Kerala model | Comparisons']
    },
    practicals: [
      ['sim-policy', 'Economic Policy Simulation', 'Move fiscal and monetary levers and read the effect on growth, prices and jobs.'],
      ['sim-breakeven', 'Profit and Loss Management', 'Model costs, price and break-even for a small enterprise.'],
      ['sim-survey', 'Social Research Project', 'Collect household data, analyse it and report a finding.']
    ]
  });

  D('business-maths', {
    name: 'Business Mathematics', short: 'Business Maths', icon: '➗', colour: '#a61e4d',
    streams: ['commerce'],
    description: 'Interest, annuities, matrices and optimisation applied to business decisions.',
    years: {
      1: ['Sets and Relations :: Set operations | Venn diagrams | Relations',
          'Functions and Graphs :: Linear and quadratic | Break-even graphs | Interpretation',
          'Sequences and Series :: AP and GP | Summation | Applications',
          'Permutations and Combinations :: Counting | Arrangements | Selection problems',
          'Straight Lines and Linear Programming :: Equations | Graphical method | Feasible region',
          'Mathematics of Finance :: Simple interest | Compound interest | Annuities'],
      2: ['Matrices and Determinants :: Operations | Inverse | Cramer\u2019s rule',
          'Differentiation :: Rules | Marginal functions | Elasticity',
          'Applications of Derivatives :: Cost and revenue | Maxima and minima | Optimisation',
          'Integration :: Standard integrals | Area under curves | Consumer surplus',
          'Probability :: Rules | Expectation | Decision problems',
          'Linear Programming :: Formulation | Graphical solution | Business applications']
    },
    practicals: [
      ['sim-banking', 'Banking Simulator', 'Compare simple and compound interest and build a loan repayment schedule.'],
      ['sim-breakeven', 'Break-even Analysis', 'Plot cost and revenue, then find the break-even quantity and margin of safety.'],
      ['sim-inventory', 'Stock and Order Modelling', 'Balance ordering cost against holding cost in a live simulation.']
    ]
  });

  D('entrepreneurship', {
    name: 'Entrepreneurship', short: 'Entrepreneurship', icon: '🚀', colour: '#d9480f',
    streams: ['commerce'],
    description: 'Spot an opportunity, validate it and build something that lasts.',
    years: {
      1: ['Entrepreneurial Mindset :: Traits | Myths | Role in the economy',
          'Idea Generation and Opportunity :: Observation | Feasibility | Value proposition',
          'Market Assessment :: Customers | Competitors | Market research',
          'Business Plan :: Components | Financial projections | Pitching',
          'Enterprise Finance :: Sources of funds | Cost of capital | Government schemes',
          'Marketing the Venture :: Segmentation | Branding | Digital channels'],
      2: ['Enterprise Growth :: Stages | Scaling | Franchising',
          'Managing Finance and Operations :: Working capital | Quality | Supply chain',
          'People and Legal Framework :: Hiring | GST and licences | Intellectual property',
          'Risk and Resilience :: Risk assessment | Insurance | Crisis response',
          'Social Entrepreneurship :: Impact models | Sustainability | Case studies',
          'Startup Project :: Prototype | Market test | Final presentation']
    },
    practicals: [
      ['sim-business', 'Virtual Business Creation', 'Build a venture with capital, unit economics and a first trading year.'],
      ['sim-marketing', 'Marketing Campaign', 'Allocate a budget across channels and justify the return.'],
      ['sim-project', 'Entrepreneurship Project', 'Complete a lean canvas and a validation plan for your own idea.'],
      ['sim-case', 'Business Management Challenges', 'React to operational and ethical dilemmas as a founder.']
    ]
  });
})(window.HSE = window.HSE || {});
