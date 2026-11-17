/* Commerce practical simulations: business, accounts, banking and markets. */
(function (HSE) {
  'use strict';
  var L = HSE.labs = HSE.labs || {};
  var ACCOUNTS = ['Cash', 'Bank', 'Capital', 'Purchases', 'Sales', 'Rent', 'Salaries', 'Furniture', 'Debtors', 'Creditors', 'Stock', 'Drawings'];

  L['sim-journal'] = {
    id: 'sim-journal', kind: 'journal', title: 'Accounting and bookkeeping simulator',
    intro: 'Record each transaction in the journal. Choose the account, the side and the amount.',
    objectives: ['Apply the double-entry rule', 'Identify debit and credit accounts', 'Keep the journal balanced'],
    notes: 'Debit the receiver, credit the giver. Every transaction has equal debits and credits.',
    steps: [
      {
        q: 'Transaction 1: The owner starts the business with ₹50,000 cash.', accounts: ACCOUNTS,
        entries: [['Cash', 'dr', 50000], ['Capital', 'cr', 50000]],
        why: 'Cash comes into the business (debit Cash) and the owner\'s capital increases (credit Capital).'
      },
      {
        q: 'Transaction 2: Goods bought for cash, ₹20,000.', accounts: ACCOUNTS,
        entries: [['Purchases', 'dr', 20000], ['Cash', 'cr', 20000]],
        why: 'Purchases is an expense (debit); cash goes out (credit).'
      },
      {
        q: 'Transaction 3: Goods sold on credit to Ravi, ₹12,000.', accounts: ACCOUNTS,
        entries: [['Debtors', 'dr', 12000], ['Sales', 'cr', 12000]],
        why: 'Ravi becomes a debtor (debit) and sales revenue increases (credit).'
      },
      {
        q: 'Transaction 4: Rent paid by cheque, ₹4,000.', accounts: ACCOUNTS,
        entries: [['Rent', 'dr', 4000], ['Bank', 'cr', 4000]],
        why: 'Rent is an expense (debit); the bank balance falls (credit).'
      }
    ]
  };

  L['sim-financials'] = {
    id: 'sim-financials', kind: 'numeric', title: 'Financial statement preparation',
    intro: 'From the trial balance figures given, prepare the trading and profit and loss account. Opening stock ₹15,000; purchases ₹80,000; sales ₹1,40,000; closing stock ₹20,000; wages ₹10,000; rent ₹6,000.',
    objectives: ['Compute cost of goods sold', 'Compute gross and net profit', 'Interpret the results'],
    notes: 'COGS = opening stock + purchases + direct expenses − closing stock.',
    steps: [
      { q: 'What is cost of goods sold? (₹)', answer: 85000, digits: 0, tolerance: 0, hint: '15,000 + 80,000 + 10,000 − 20,000', why: 'COGS = 15,000 + 80,000 + 10,000 − 20,000 = ₹85,000.' },
      { q: 'What is gross profit? (₹)', answer: 55000, digits: 0, tolerance: 0, hint: 'Sales − COGS', why: '1,40,000 − 85,000 = ₹55,000.' },
      { q: 'What is net profit? (₹)', answer: 49000, digits: 0, tolerance: 0, hint: 'Gross profit − indirect expenses', why: '55,000 − rent 6,000 = ₹49,000.' },
      { q: 'If current assets are ₹60,000 and current liabilities ₹30,000, what is the current ratio?', answer: 2, digits: 1, tolerance: 0.01, hint: 'Current assets ÷ current liabilities', why: '60,000 / 30,000 = 2:1, a comfortable liquidity position.' }
    ]
  };

  L['sim-banking'] = {
    id: 'sim-banking', kind: 'numeric', title: 'Banking simulator',
    intro: 'Work as a bank officer: post transactions and check the customer\'s balance.',
    objectives: ['Distinguish deposits and withdrawals', 'Compute interest', 'Explain KYC requirements'],
    notes: 'Simple interest = P × R × T / 100.',
    steps: [
      { q: 'A customer opens an account with ₹10,000 and deposits ₹4,500. What is the balance? (₹)', answer: 14500, digits: 0, tolerance: 0, hint: 'Opening balance + deposit', why: '10,000 + 4,500 = ₹14,500.' },
      { q: 'The customer then withdraws ₹6,000. What is the balance? (₹)', answer: 8500, digits: 0, tolerance: 0, hint: 'Balance − withdrawal', why: '14,500 − 6,000 = ₹8,500.' },
      { q: 'Simple interest on ₹8,500 at 6% for 2 years? (₹)', answer: 1020, digits: 0, tolerance: 0, hint: 'P × R × T / 100', why: '8,500 × 6 × 2 / 100 = ₹1,020.' },
      { q: 'Which document is essential for opening a savings account?', options: ['A school report card', 'A valid KYC identity and address proof', 'A business licence only', 'Nothing at all'], answer: 1, why: 'Banks must verify identity and address under KYC rules before opening an account.' }
    ]
  };

  L['sim-inventory'] = {
    id: 'sim-inventory', kind: 'numeric', title: 'Virtual stock and inventory management',
    intro: 'A shop starts with 100 units at ₹40 each. It buys 50 units at ₹46 and sells 120 units at ₹70.',
    objectives: ['Value closing stock under FIFO', 'Compute gross profit', 'Explain reorder level'],
    notes: 'FIFO: the oldest stock is sold first. Closing stock = 30 units from the ₹46 purchase.',
    steps: [
      { q: 'How many units remain in stock?', answer: 30, digits: 0, tolerance: 0, hint: '100 + 50 − 120', why: '150 − 120 = 30 units.' },
      { q: 'Under FIFO, what is the value of closing stock? (₹)', answer: 1380, digits: 0, tolerance: 0, hint: '30 × ₹46', why: 'The remaining 30 units come from the later purchase at ₹46: ₹1,380.' },
      { q: 'What is the cost of goods sold? (₹)', answer: 4000 + 920, digits: 0, tolerance: 0, hint: '100 × 40 + 20 × 46', why: '4,000 + 920 = ₹4,920.' },
      { q: 'What is gross profit if sales are 120 × ₹70? (₹)', answer: 8400 - 4920, digits: 0, tolerance: 0, hint: 'Sales − COGS', why: '8,400 − 4,920 = ₹3,480.' },
      { q: 'Which document records goods returned by a customer?', options: ['Credit note', 'Debit note', 'Invoice', 'Cheque'], answer: 0, why: 'A credit note is issued to the customer when goods are returned, reducing the amount owed.' }
    ]
  };

  L['sim-business'] = {
    id: 'sim-business', kind: 'choice', title: 'Virtual business creation',
    intro: 'You are starting a small enterprise in your town. Make the decisions a founder must make.',
    objectives: ['Choose a viable business idea', 'Distinguish fixed and variable costs', 'Identify the first legal step'],
    notes: 'A viable plan names the customer, the problem, the price and the cost. Profit = revenue − total cost.',
    steps: [
      { q: 'Which is the best first step for a new venture?', options: ['Buy stock in bulk', 'Identify a customer problem and validate demand', 'Design a logo', 'Hire ten employees'], answer: 1, why: 'Demand validation comes before spending; otherwise the venture builds something nobody wants.' },
      { q: 'Rent of ₹8,000 per month is an example of:', options: ['Variable cost', 'Fixed cost', 'Opportunity cost', 'Sunk revenue'], answer: 1, why: 'Rent does not change with output in the short run, so it is a fixed cost.' },
      { q: 'A firm sells 200 units at ₹50 with variable cost ₹30 per unit and fixed cost ₹3,000. What is profit? (₹)', kind: 'numeric', answer: 1000, digits: 0, tolerance: 0, hint: 'Contribution per unit × units − fixed cost', why: 'Contribution = 20 × 200 = 4,000; minus 3,000 fixed = ₹1,000.' },
      { q: 'Which registration is required for a small private company in India?', options: ['GST only', 'MCA registration under the Companies Act', 'A trade union licence', 'No registration'], answer: 1, why: 'A private limited company is incorporated through the Ministry of Corporate Affairs; GST applies separately by turnover.' }
    ]
  };

  L['sim-marketing'] = {
    id: 'sim-marketing', kind: 'choice', title: 'Marketing campaign studio',
    intro: 'Design a campaign for a local brand and defend each choice.',
    objectives: ['Define a target segment', 'Choose an appropriate channel', 'Set a measurable objective'],
    steps: [
      { q: 'A new stationery brand with ₹20,000 wants students in nearby schools. Which channel fits best?', options: ['National television', 'School partnerships and social media', 'Airport billboards', 'Newspaper front page'], answer: 1, why: 'A limited budget needs a tightly targeted channel where the audience already is.' },
      { q: 'Which objective is measurable?', options: ['Become famous', 'Increase repeat purchases by 15% in three months', 'Be the best brand', 'Post more often'], answer: 1, why: 'A usable objective has a metric, a target and a time frame.' },
      { q: 'The campaign reaches 50,000 people and 2,500 buy. What is the conversion rate? (%)', kind: 'numeric', answer: 5, digits: 1, tolerance: 0.1, hint: 'Buyers ÷ reach × 100', why: '2,500 / 50,000 = 5%.' },
      { q: 'Which price change usually protects margin when costs rise?', options: ['Keep price and accept losses', 'Raise price with clear value communication', 'Double the quantity for free', 'Stop advertising'], answer: 1, why: 'A justified price increase preserves unit margin; silent cuts in value erode trust.' }
    ]
  };

  L['sim-project'] = {
    id: 'sim-project', kind: 'choice', title: 'Entrepreneurship project studio',
    intro: 'Turn an idea into a project plan with milestones, risks and a pitch.',
    objectives: ['Write a problem statement', 'Plan milestones', 'Identify the biggest risk'],
    steps: [
      { q: 'Which problem statement is strongest?', options: ['Students need better lives', 'Small shops in Kozhikode lose 3 hours a week on manual stock counts', 'Everyone likes apps', 'Our team wants marks'], answer: 1, why: 'A strong statement names a specific user, a specific problem and a measurable cost.' },
      { q: 'A project has a fixed ₹10,000 budget and 3 weeks. Which milestone comes first?', options: ['Launch marketing', 'Validate the problem with 10 interviews', 'Hire staff', 'Buy a laptop'], answer: 1, why: 'Cheap validation reduces risk before money is committed.' },
      { q: 'Which is the biggest risk to a student venture?', options: ['No customer demand', 'A slow website', 'A plain logo', 'Too little stationery'], answer: 0, why: 'Without demand nothing else matters; every other risk is secondary.' },
      { q: 'A pitch says "₹500 for a service 200 customers need monthly". What is annual revenue? (₹)', kind: 'numeric', answer: 1200000, digits: 0, tolerance: 0, hint: 'Price × customers × 12', why: '500 × 200 × 12 = ₹12,00,000.' }
    ]
  };

  L['sim-partnership'] = {
    id: 'sim-partnership', kind: 'numeric', title: 'Partnership business simulation',
    intro: 'Anil and Bina share profits 3:2. The firm earned ₹1,50,000 this year.',
    objectives: ['Divide profit in the agreed ratio', 'Apply interest on capital', 'Handle a new partner'],
    notes: 'Profit share = ratio part ÷ total parts × profit.',
    steps: [
      { q: 'What is Anil\'s share of ₹1,50,000 in the ratio 3:2? (₹)', answer: 90000, digits: 0, tolerance: 0, hint: '3/5 of the profit', why: '3/5 × 1,50,000 = ₹90,000.' },
      { q: 'What is Bina\'s share? (₹)', answer: 60000, digits: 0, tolerance: 0, hint: '2/5 of the profit', why: '2/5 × 1,50,000 = ₹60,000.' },
      { q: 'Anil\'s capital is ₹4,00,000 and interest is allowed at 6% per annum. What interest does he receive? (₹)', answer: 24000, digits: 0, tolerance: 0, hint: 'Capital × rate', why: '4,00,000 × 6% = ₹24,000.' },
      { q: 'A new partner is admitted. Which account is credited with the premium they pay?', options: ['Revaluation account', 'Premium for goodwill account / partners\' capital', 'Trading account', 'Drawings account'], answer: 1, why: 'The premium for goodwill is shared by the existing partners in their sacrificing ratio.' }
    ]
  };

  L['sim-breakeven'] = {
    id: 'sim-breakeven', kind: 'numeric', title: 'Break-even and profit planning',
    intro: 'A unit sells for ₹100, variable cost is ₹60 and fixed cost is ₹20,000.',
    objectives: ['Compute contribution', 'Compute break-even quantity', 'Relate margin of safety to profit'],
    notes: 'Contribution = price − variable cost. Break-even units = fixed cost ÷ contribution.',
    steps: [
      { q: 'What is the contribution per unit? (₹)', answer: 40, digits: 0, tolerance: 0, hint: '100 − 60', why: 'Each unit contributes ₹40 towards fixed costs.' },
      { q: 'How many units must be sold to break even?', answer: 500, digits: 0, tolerance: 0, hint: '20,000 ÷ 40', why: '20,000 / 40 = 500 units.' },
      { q: 'If 800 units are sold, what is the profit? (₹)', answer: 12000, digits: 0, tolerance: 0, hint: '(800 − 500) × 40', why: '300 units beyond break-even × ₹40 = ₹12,000.' },
      { q: 'A 25% increase in variable cost will:', options: ['Lower break-even units', 'Raise break-even units', 'Not affect break-even', 'Double profit'], answer: 1, why: 'Lower contribution per unit means more units are needed to cover the same fixed cost.' }
    ]
  };

  L['sim-budget'] = {
    id: 'sim-budget', kind: 'numeric', title: 'Business budgeting workshop',
    intro: 'Plan a month for a small firm. Revenue budget ₹90,000; materials ₹30,000; wages ₹20,000; rent ₹8,000; other expenses ₹7,000.',
    objectives: ['Prepare a simple budget', 'Calculate surplus', 'Use a contingency reserve'],
    notes: 'Surplus = income − expenditure. Keep a contingency of at least 5% of expenditure.',
    steps: [
      { q: 'What is total expenditure? (₹)', answer: 65000, digits: 0, tolerance: 0, hint: 'Add all cost lines', why: '30,000 + 20,000 + 8,000 + 7,000 = ₹65,000.' },
      { q: 'What is the budgeted surplus? (₹)', answer: 25000, digits: 0, tolerance: 0, hint: 'Budget − expenditure', why: '90,000 − 65,000 = ₹25,000.' },
      { q: 'A 10% contingency on expenditure is reserved. How much is left as surplus? (₹)', answer: 18500, digits: 0, tolerance: 0, hint: 'Contingency = 10% of 65,000', why: '25,000 − 6,500 = ₹18,500.' },
      { q: 'Revenue falls 20% but all planned costs remain. What happens?', options: ['Surplus rises', 'Surplus falls by 18,000', 'Break-even', 'Costs fall automatically'], answer: 1, why: '20% of 90,000 is ₹18,000, which comes straight off the surplus.' }
    ]
  };

  L['sim-case'] = {
    id: 'sim-case', kind: 'choice', title: 'Business case study challenge',
    intro: 'Read the case and answer as a management consultant.',
    objectives: ['Diagnose a business problem', 'Weigh alternatives', 'Recommend a course of action'],
    steps: [
      { q: 'A bakery\'s sales are flat but costs rose 18%. Its first response should be:', options: ['Raise prices immediately by 30%', 'Analyse cost drivers and set a measured price revision', 'Close the shop', 'Cut product quality'], answer: 1, why: 'Diagnose before acting; a measured repricing with value communication protects customers and margin.' },
      { q: 'Which figure best shows whether the bakery can pay short-term bills?', options: ['Gross margin', 'Current ratio', 'Fixed assets', 'Owner\'s drawings'], answer: 1, why: 'The current ratio compares current assets with current liabilities, a direct liquidity test.' },
      { q: 'The bakery can invest in one of two options. Which criterion matters most?', options: ['Cost of the option', 'Expected return relative to risk and payback', 'The owner\'s preference alone', 'The vendor\'s reputation'], answer: 1, why: 'Investment decisions compare return, risk and payback, not headline cost alone.' },
      { q: 'A loyal customer segment is willing to pay more. The safest strategy is:', options: ['Uniform price rise for all', 'A premium range alongside the existing products', 'Discount everything', 'Stop serving that segment'], answer: 1, why: 'A premium tier captures willingness to pay without losing price-sensitive customers.' }
    ]
  };
})(window.HSE = window.HSE || {});
