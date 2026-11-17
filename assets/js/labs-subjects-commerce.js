/* Dedicated subject simulations — Commerce stream. */
(function (HSE) {
  'use strict';
  var L = HSE.labs = HSE.labs || {};

  L['sim-sub-accountancy'] = {
    id: 'sim-sub-accountancy', kind: 'choice', title: 'Accounting and bookkeeping simulator',
    intro: 'Record a credit purchase, use the accounting equation and check a trial balance.',
    objectives: ['Apply the double-entry rule', 'Use assets = liabilities + capital', 'Find a trial-balance difference'],
    notes: 'Every transaction has two effects. Debit the receiver of value and credit the giver of value.',
    steps: [
      { q: 'Goods worth ₹20,000 are bought on credit. Which entry is correct?', options: ['Debit Purchases, credit Creditors', 'Debit Creditors, credit Purchases', 'Debit Cash, credit Purchases', 'Debit Sales, credit Debtors'], answer: 0, why: 'Purchases (an expense) increases on the debit side and the creditor is credited.' },
      { q: 'Assets are ₹2,50,000 and liabilities are ₹90,000. What is capital?', kind: 'numeric', answer: 160000, digits: 0, tolerance: 0, unit: '₹', hint: 'Capital = Assets − Liabilities', why: '2,50,000 − 90,000 = ₹1,60,000.' },
      { q: 'Match each item to its type.', kind: 'match', pairs: [
        ['Machinery', 'Asset'],
        ['Bank loan', 'Liability'],
        ['Sales revenue', 'Income'],
        ['Salaries', 'Expense']
      ], why: 'Assets are resources, liabilities are obligations, income increases capital and expenses reduce it.' },
      { q: 'A trial balance shows debits of ₹84,500 and credits of ₹84,000. What is the difference?', kind: 'numeric', answer: 500, digits: 0, tolerance: 0, unit: '₹', hint: 'Subtract the smaller total', why: 'The totals differ by ₹500, so at least one entry needs checking.' }
    ]
  };

  L['sim-sub-business-studies'] = {
    id: 'sim-sub-business-studies', kind: 'match', title: 'Business management simulation',
    intro: 'Run a small firm: plan the work, calculate break-even and choose a business structure.',
    objectives: ['Match the functions of management', 'Calculate break-even output', 'Compare business structures'],
    notes: 'Break-even units = fixed costs ÷ (selling price − variable cost per unit).',
    steps: [
      { q: 'Match each management function to what it involves.', pairs: [
        ['Planning', 'Setting objectives and choosing a course of action'],
        ['Organising', 'Arranging resources and tasks'],
        ['Staffing', 'Recruiting and developing people'],
        ['Controlling', 'Comparing performance with standards']
      ], why: 'Management coordinates these functions to achieve objectives efficiently.' },
      { q: 'Fixed costs are ₹50,000, price is ₹100 and variable cost is ₹60 per unit. What is break-even output?', kind: 'numeric', answer: 1250, digits: 0, tolerance: 0, unit: 'units', hint: 'Contribution per unit = ₹40', why: '50,000 ÷ 40 = 1,250 units.' },
      { q: 'Order the stages of the management process.', kind: 'order', items: ['Set objectives', 'Plan the work', 'Organise resources', 'Direct the team', 'Control and review'], why: 'Objectives drive planning, organisation, direction and finally control.' },
      { q: 'Which feature is true of a partnership?', options: ['It must have at least seven owners', 'Profits and risks are shared by the partners', 'It is always a separate legal person', 'Shares are freely sold on a stock exchange'], answer: 1, why: 'Partners share profits, losses and mutual responsibility under a partnership agreement.' }
    ]
  };

  L['sim-sub-economics'] = {
    id: 'sim-sub-economics', kind: 'numeric', title: 'Economic policy simulation',
    intro: 'Read the indicators, calculate a budget deficit and reason about policy choices.',
    objectives: ['Calculate a budget deficit', 'Match indicators to what they measure', 'Explain opportunity cost and demand shifts'],
    notes: 'Budget deficit = government spending − government revenue.',
    steps: [
      { q: 'Government spending is ₹1,200 crore and revenue is ₹950 crore. What is the deficit?', answer: 250, digits: 0, tolerance: 0, unit: 'crore', hint: 'Spending − revenue', why: '1,200 − 950 = ₹250 crore.' },
      { q: 'Match each indicator to what it measures.', kind: 'match', pairs: [
        ['CPI', 'Change in the price of a basket of goods'],
        ['GDP', 'Value of final goods and services produced'],
        ['Unemployment rate', 'Share of the labour force without work'],
        ['Fiscal deficit', 'Gap between government spending and revenue']
      ], why: 'Each indicator summarises a different part of the economy.' },
      { q: 'A student gives up a part-time job to study full time. What is the opportunity cost?', options: ['The tuition fee only', 'The wages given up', 'The value of the degree', 'Nothing, because studying is free'], answer: 1, why: 'Opportunity cost is the value of the next best alternative forgone — the wages.' },
      { q: 'For a normal good, what happens to demand when household income rises?', options: ['Demand shifts to the right', 'Demand shifts to the left', 'The supply curve shifts right', 'Price falls to zero'], answer: 0, why: 'Higher income increases demand for a normal good, shifting the demand curve right.' }
    ]
  };

  L['sim-sub-business-maths'] = {
    id: 'sim-sub-business-maths', kind: 'numeric', title: 'Banking and business mathematics simulator',
    intro: 'Compare simple and compound interest, then model a break-even decision.',
    objectives: ['Calculate simple interest', 'Calculate compound amount', 'Find break-even output'],
    notes: 'SI = P × R × T / 100. Compound amount A = P(1 + R/100)^T.',
    steps: [
      { q: 'What is the simple interest on ₹10,000 at 8% for 2 years?', answer: 1600, digits: 0, tolerance: 0, unit: '₹', hint: '10,000 × 8 × 2 ÷ 100', why: 'SI = 10,000 × 0.08 × 2 = ₹1,600.' },
      { q: 'What is the compound amount on ₹10,000 at 8% for 2 years?', answer: 11664, digits: 0, tolerance: 0, unit: '₹', hint: '10,000 × 1.08²', why: 'A = 10,000 × 1.1664 = ₹11,664.' },
      { q: 'Fixed costs are ₹20,000, price ₹50 and variable cost ₹30. What is break-even output?', answer: 1000, digits: 0, tolerance: 0, unit: 'units', hint: 'Contribution is ₹20 per unit', why: '20,000 ÷ 20 = 1,000 units.' },
      { q: 'Why is the effective annual rate higher than the nominal rate when interest compounds monthly?', options: ['Interest is charged on interest during the year', 'The nominal rate is always wrong', 'Simple interest is added twice', 'Inflation is ignored'], answer: 0, why: 'Monthly compounding adds interest to the balance, so later months earn interest on it.' }
    ]
  };

  L['sim-sub-entrepreneurship'] = {
    id: 'sim-sub-entrepreneurship', kind: 'choice', title: 'Entrepreneurship venture studio',
    intro: 'Take a venture from idea to launch, calculate profit and test the business model.',
    objectives: ['Sequence the venture-building process', 'Calculate profit', 'Explain a minimum viable product'],
    notes: 'Validate demand before scaling. Profit = total revenue − total costs.',
    steps: [
      { q: 'Order the stages of building a venture.', kind: 'order', items: ['Spot a problem', 'Validate demand', 'Build a minimum viable product', 'Measure customer response', 'Scale what works'], why: 'Each stage reduces uncertainty before more money is committed.' },
      { q: 'Revenue is ₹80,000 and total costs are ₹55,000. What is the profit?', kind: 'numeric', answer: 25000, digits: 0, tolerance: 0, unit: '₹', hint: 'Revenue − costs', why: '80,000 − 55,000 = ₹25,000.' },
      { q: 'What is a minimum viable product (MVP)?', options: ['The smallest version that tests the core value for real users', 'A product with no features', 'The final product before launch', 'A free sample with no feedback'], answer: 0, why: 'An MVP delivers enough value to learn from real customer behaviour with minimal effort.' },
      { q: 'Match each term to its meaning.', kind: 'match', pairs: [
        ['Revenue model', 'How the venture earns money'],
        ['Value proposition', 'Why customers choose the product'],
        ['Target segment', 'The group of customers served first'],
        ['Runway', 'How long available cash can fund operations']
      ], why: 'These choices together describe a testable business model.' }
    ]
  };
})(window.HSE = window.HSE || {});
