/* Commerce question bank. */
(function (HSE) {
  'use strict';
  var bank = {
    accountancy: {
      1: [
        ['The accounting equation is', ['Assets = Liabilities + Capital', 'Assets = Capital − Liabilities', 'Capital = Assets + Liabilities', 'Liabilities = Assets + Capital'], 0, 'Resources equal claims of outsiders plus owners.'],
        ['The golden rule for a real account is', ['Debit the receiver', 'Debit what comes in, credit what goes out', 'Debit expenses', 'Debit all incomes'], 1, 'Real accounts record assets.'],
        ['A trial balance is prepared to check', ['profit', 'arithmetical accuracy of the ledger', 'liquidity', 'creditworthiness'], 1, 'Debit and credit totals must agree.'],
        ['Depreciation is', ['a cash expense', 'a non-cash expense', 'a liability', 'an asset'], 1, 'It allocates the cost of an asset over its life.'],
        ['A bank reconciliation statement reconciles the cash book with the', ['trial balance', 'bank passbook or statement', 'profit and loss account', 'balance sheet'], 1, 'It explains differences between the two records.']
      ],
      2: [
        ['In the absence of a partnership deed, profits are shared', ['in capital ratio', 'equally', 'in the ratio of drawings', 'by seniority'], 1, 'The Partnership Act defaults to equal sharing.'],
        ['Goodwill is a', ['current asset', 'intangible asset', 'current liability', 'contingent liability'], 1, 'It is an unidentifiable intangible asset.'],
        ['Debentures represent', ['owner\u2019s capital', 'borrowed capital', 'reserves', 'trade payables'], 1, 'Debenture holders are creditors of the company.'],
        ['Current ratio equals', ['current assets / current liabilities', 'quick assets / current liabilities', 'profit / sales', 'debt / equity'], 0, 'It measures short-term liquidity.'],
        ['Cash flow from operating activities includes', ['issue of shares', 'purchase of machinery', 'cash received from customers', 'repayment of long-term loan'], 2, 'Customer receipts are part of daily operations.']
      ]
    },
    'business-studies': {
      1: [
        ['A sole proprietor has', ['limited liability', 'unlimited liability', 'no liability', 'liability limited to capital'], 1, 'Personal assets are at risk for business debts.'],
        ['In a cooperative society, voting follows', ['one share one vote', 'one member one vote', 'capital contribution', 'seniority'], 1, 'Members are equal regardless of capital.'],
        ['E-business primarily uses', ['postal orders', 'electronic networks', 'only physical stores', 'telegrams'], 1, 'Transactions happen over digital networks.'],
        ['The principle of indemnity applies to', ['life insurance', 'marine and fire insurance', 'partnership', 'bank loans'], 1, 'General insurance restores the loss, not more.'],
        ['Corporate social responsibility means', ['maximising profit only', 'obligation towards stakeholders and society', 'paying taxes', 'advertising'], 1, 'Firms owe duties beyond shareholders.']
      ],
      2: [
        ['The principle of unity of command means', ['one boss for one subordinate', 'many bosses', 'shared authority', 'no supervision'], 0, 'Fayol held that dual command causes confusion.'],
        ['Planning is described as the', ['last function of management', 'primary function of management', 'optional activity', 'accounting function'], 1, 'It precedes organising, staffing and control.'],
        ['Selection is called a', ['positive process', 'negative process', 'financial process', 'marketing process'], 1, 'It rejects unsuitable candidates.'],
        ['The four Ps of the marketing mix are', ['product, price, place, promotion', 'people, process, product, price', 'plan, price, place, profit', 'product, profit, place, people'], 0, 'The classic marketing mix.'],
        ['Controlling involves comparing', ['plans with budgets only', 'actual performance with standards', 'profits with taxes', 'staff with managers'], 1, 'Deviations trigger corrective action.']
      ]
    },
    economics: {
      1: [
        ['In India, the poverty line is estimated mainly using', ['income tax data', 'calorie-based consumption expenditure', 'number of cars', 'literacy rate'], 1, 'Consumption expenditure needed for a calorie norm.'],
        ['NITI Aayog replaced the', ['Finance Commission', 'Planning Commission', 'Reserve Bank of India', 'Census Office'], 1, 'It was set up in 2015.'],
        ['Human capital formation is investment in', ['machinery', 'education and health', 'foreign exchange', 'gold'], 1, 'People\u2019s skills and health are productive capital.'],
        ['Sustainable development means development that', ['maximises present output', 'meets present needs without harming future generations', 'stops all industry', 'depends only on aid'], 1, 'Intergenerational equity is central.'],
        ['The informal sector is characterised by', ['written contracts and social security', 'casual work without protection', 'government ownership', 'high capital intensity'], 1, 'Workers lack formal protection and records.']
      ],
      2: [
        ['GDP measures the value of', ['intermediate goods', 'final goods and services produced domestically', 'exports only', 'government spending only'], 1, 'Only final output avoids double counting.'],
        ['CRR and SLR are instruments of', ['fiscal policy', 'monetary policy', 'trade policy', 'industrial policy'], 1, 'The RBI controls money supply with them.'],
        ['If MPC is 0.8, the multiplier is', ['1.25', '4', '5', '8'], 2, 'k = 1/(1 − 0.8) = 5.'],
        ['Fiscal deficit is', ['total expenditure minus total receipts excluding borrowings', 'revenue minus expenditure', 'exports minus imports', 'tax minus subsidy'], 0, 'It shows how much the government must borrow.'],
        ['A depreciation of the rupee tends to make', ['exports cheaper and imports dearer', 'exports dearer', 'no difference', 'imports cheaper'], 0, 'Foreign buyers need fewer dollars per rupee of export.']
      ]
    },
    'business-maths': {
      1: [
        ['Simple interest is calculated as', ['P(1 + r)ⁿ', 'PTR/100', 'P × r × n', 'P/(1 + r)'], 1, 'Interest = principal × time × rate / 100.'],
        ['The nth term of an AP is', ['a + nd', 'a + (n − 1)d', 'a(n − 1)d', 'aⁿ'], 1, 'First term plus (n − 1) common differences.'],
        ['nPr equals', ['n!/(n − r)!', 'n!/r!', 'n!/(r!(n − r)!)', 'nʳ'], 0, 'Arrangements of r items from n.'],
        ['Break-even occurs when', ['revenue exceeds cost', 'revenue equals total cost', 'fixed cost is zero', 'profit is maximum'], 1, 'At break-even there is neither profit nor loss.'],
        ['The compound amount formula is', ['P(1 + r)ⁿ', 'P + PTR', 'P/(1 + r)ⁿ', 'P × r × n'], 0, 'Interest is added to principal each period.']
      ],
      2: [
        ['A square matrix has an inverse only if its determinant is', ['zero', 'non-zero', 'positive', 'an integer'], 1, 'A zero determinant makes the matrix singular.'],
        ['Marginal cost is the', ['total cost divided by output', 'derivative of total cost with respect to output', 'fixed cost', 'average revenue'], 1, 'It is the cost of one more unit.'],
        ['∫₀¹ x dx equals', ['0', '0.5', '1', '2'], 1, 'x²/2 evaluated 0 to 1 = 0.5.'],
        ['At a local maximum, the second derivative is', ['positive', 'negative', 'zero always', 'undefined'], 1, 'The curve is concave down.'],
        ['The sum of all probabilities in a sample space is', ['0', '1', '100', 'equal to the number of outcomes'], 1, 'Probabilities are normalised to 1.']
      ]
    },
    entrepreneurship: {
      1: [
        ['An entrepreneur is best described as someone who', ['avoids risk', 'takes calculated risk to create value', 'only invests in shares', 'works for a salary'], 1, 'Risk-bearing and value creation define the role.'],
        ['A business plan is mainly used to', ['hire staff only', 'communicate the venture to investors and guide execution', 'pay taxes', 'register a trademark'], 1, 'It aligns strategy, market and finance.'],
        ['Market research helps an entrepreneur to', ['avoid customers', 'understand customer needs and demand', 'reduce taxes', 'choose a logo'], 1, 'Evidence about customers reduces guesswork.'],
        ['Seed capital is the', ['loan for expansion', 'initial funding to start', 'profit reinvested', 'government tax'], 1, 'It funds the earliest stage.'],
        ['A value proposition explains', ['why customers should choose you', 'the tax rate', 'the office layout', 'employee salaries'], 0, 'It states the benefit you deliver.']
      ],
      2: [
        ['Scaling a venture means', ['reducing customers', 'growing operations without breaking quality', 'closing branches', 'raising prices only'], 1, 'Growth must stay operationally sound.'],
        ['Working capital is used for', ['buying land', 'day-to-day operations', 'repaying long-term debt only', 'paying dividends'], 1, 'It funds the operating cycle.'],
        ['GST in India is a', ['direct tax on income', 'indirect tax on supply of goods and services', 'property tax', 'customs duty only'], 1, 'It is a destination-based indirect tax.'],
        ['Social entrepreneurship primarily pursues', ['maximum profit', 'social impact with a sustainable model', 'government contracts', 'exports'], 1, 'Impact and sustainability are the twin goals.'],
        ['A trademark protects', ['an invention', 'a brand name or logo', 'a literary work', 'a design of a machine'], 1, 'It identifies the source of goods or services.']
      ]
    }
  };
  HSE.rawQuestions = Object.assign(HSE.rawQuestions || {}, bank);
})(window.HSE = window.HSE || {});
