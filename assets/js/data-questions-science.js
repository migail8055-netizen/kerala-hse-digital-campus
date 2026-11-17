/* Question bank: [question, [options], correctIndex, explanation].
   Chapter tests sample 3, chapter examinations use all 5. Teachers can also build
   their own assessments in the Teacher console. */
(function (HSE) {
  'use strict';
  HSE.rawQuestions = {
    physics: {
      1: [
        ['The SI unit of force is', ['joule', 'newton', 'watt', 'pascal'], 1, 'Force = mass × acceleration, so the unit is kg m s⁻² = newton.'],
        ['The dimensional formula of energy is', ['[MLT⁻²]', '[ML²T⁻²]', '[ML²T⁻¹]', '[MLT⁻¹]'], 1, 'Energy = force × distance = [MLT⁻²][L] = [ML²T⁻²].'],
        ['A body in uniform circular motion has constant', ['velocity', 'speed', 'acceleration vector', 'momentum'], 1, 'The direction changes continuously, so velocity and momentum change; only speed is constant.'],
        ['The work done by the centripetal force on a body in circular motion is', ['maximum', 'zero', 'negative', 'equal to kinetic energy'], 1, 'Centripetal force is perpendicular to displacement, so W = F·s cos 90° = 0.'],
        ['The escape velocity from the Earth is about', ['7.9 km/s', '9.8 km/s', '11.2 km/s', '3.0 × 10⁸ m/s'], 2, 'v = √(2GM/R) ≈ 11.2 km/s for Earth.']
      ],
      2: [
        ['The SI unit of electric flux is', ['N C⁻¹', 'N m² C⁻¹', 'C m⁻²', 'V m⁻¹'], 1, 'Flux = E·A, so (N C⁻¹)(m²) = N m² C⁻¹.'],
        ['Kirchhoff\u2019s junction rule is based on the conservation of', ['energy', 'charge', 'momentum', 'mass'], 1, 'Charge entering a junction equals charge leaving it.'],
        ['The photoelectric effect demonstrates the', ['wave nature of light', 'particle nature of light', 'polarisation of light', 'interference of light'], 1, 'Discrete ejection of electrons shows light behaves as photons.'],
        ['A transformer works on the principle of', ['self induction', 'mutual induction', 'electrostatic induction', 'resonance'], 1, 'Changing flux in the primary links the secondary by mutual induction.'],
        ['The output of an AND gate is high only when', ['any input is high', 'all inputs are high', 'all inputs are low', 'inputs differ'], 1, 'AND requires every input to be 1.']
      ]
    },
    chemistry: {
      1: [
        ['One mole of a substance contains', ['6.022 × 10²³ particles', '1.6 × 10⁻¹⁹ particles', '22.4 particles', '9.1 × 10³¹ particles'], 0, 'Avogadro constant is 6.022 × 10²³ mol⁻¹.'],
        ['The pH of 0.01 M HCl is', ['1', '2', '7', '12'], 1, 'pH = −log(10⁻²) = 2 for a strong monobasic acid.'],
        ['The hybridisation of carbon in methane is', ['sp', 'sp²', 'sp³', 'sp³d'], 2, 'Four sigma bonds give tetrahedral sp³ carbon.'],
        ['The number of orbitals in the n = 2 shell is', ['1', '2', '4', '9'], 2, 'One 2s and three 2p orbitals = 4.'],
        ['The oxidation number of Mn in KMnO₄ is', ['+2', '+4', '+6', '+7'], 3, 'K = +1, O = −2 each, so Mn = +7 to balance.']
      ],
      2: [
        ['The unit of the rate constant of a first order reaction is', ['mol L⁻¹ s⁻¹', 's⁻¹', 'L mol⁻¹ s⁻¹', 'L² mol⁻² s⁻¹'], 1, 'For first order, k has units of reciprocal time.'],
        ['The standard electrode potential of the standard hydrogen electrode is', ['+1.00 V', '0.00 V', '−0.76 V', '−1.00 V'], 1, 'It is the reference electrode, defined as 0.00 V.'],
        ['Colligative properties depend on', ['nature of solute', 'number of solute particles', 'colour of solution', 'size of vessel'], 1, 'They depend on particle count, not identity.'],
        ['The carbohydrate stored in animal liver and muscle is', ['starch', 'glycogen', 'cellulose', 'sucrose'], 1, 'Glycogen is the animal storage polysaccharide.'],
        ['The coordination number of Fe in [Fe(CN)₆]⁴⁻ is', ['2', '4', '6', '8'], 2, 'Six cyanide ligands surround the iron centre.']
      ]
    },
    mathematics: {
      1: [
        ['A set with 3 elements has how many subsets?', ['3', '6', '8', '9'], 2, 'Number of subsets = 2³ = 8.'],
        ['sin²θ + cos²θ equals', ['0', '1', '2 sinθ cosθ', 'tanθ'], 1, 'This is the fundamental Pythagorean identity.'],
        ['The sum of the first n natural numbers is', ['n(n+1)', 'n(n+1)/2', 'n²', 'n(n−1)/2'], 1, 'Standard arithmetic series result.'],
        ['The slope of the line 2x + 3y = 6 is', ['2/3', '−2/3', '3/2', '−3/2'], 1, 'Rewrite as y = −(2/3)x + 2.'],
        ['The number of terms in the expansion of (a + b)ⁿ is', ['n', 'n − 1', 'n + 1', '2n'], 2, 'Powers of a run from n down to 0.']
      ],
      2: [
        ['d/dx (sin x) equals', ['cos x', '−cos x', 'sin x', '−sin x'], 0, 'The derivative of sine is cosine.'],
        ['The determinant of [[a, b], [c, d]] is', ['ab − cd', 'ad − bc', 'ac − bd', 'a + d'], 1, 'Expand along the first row.'],
        ['∫ x dx equals', ['x² + C', 'x²/2 + C', '2x + C', 'ln x + C'], 1, 'Reverse the power rule: x²/2.'],
        ['If P(A) = 0.5 and P(B) = 0.4 and A, B are independent, P(A ∩ B) is', ['0.1', '0.2', '0.9', '0.45'], 1, 'Independence multiplies: 0.5 × 0.4 = 0.2.'],
        ['Two non-zero vectors are perpendicular when their dot product is', ['1', '0', '−1', 'equal to their magnitudes'], 1, 'a·b = |a||b| cos 90° = 0.']
      ]
    },
    biology: {
      1: [
        ['The organelle known as the powerhouse of the cell is the', ['ribosome', 'mitochondrion', 'lysosome', 'Golgi body'], 1, 'Mitochondria generate ATP by oxidative phosphorylation.'],
        ['The pigment that absorbs light in photosynthesis is', ['haemoglobin', 'chlorophyll', 'melanin', 'carotene only'], 1, 'Chlorophyll a and b drive the light reactions.'],
        ['The smallest taxonomic category is', ['genus', 'family', 'species', 'order'], 2, 'Species is the basic unit of classification.'],
        ['The normal pH of human blood is about', ['6.4', '7.0', '7.4', '8.4'], 2, 'Blood is slightly alkaline at pH 7.35–7.45.'],
        ['The plant cell wall is mainly made of', ['chitin', 'cellulose', 'protein', 'lipid'], 1, 'Cellulose microfibrils give plant walls their strength.']
      ],
      2: [
        ['Mendel\u2019s law of segregation concerns', ['two genes on one chromosome', 'separation of alleles during gamete formation', 'blending of traits', 'linkage of genes'], 1, 'Each gamete receives one allele of a pair.'],
        ['DNA replication is described as', ['conservative', 'semi-conservative', 'dispersive', 'random'], 1, 'Each daughter molecule keeps one parental strand.'],
        ['The enzyme used to cut DNA in rDNA technology is a', ['ligase', 'restriction endonuclease', 'polymerase', 'helicase'], 1, 'Restriction enzymes cut at specific recognition sites.'],
        ['The number of chromosomes in a normal human somatic cell is', ['23', '44', '46', '48'], 2, '23 pairs = 46 chromosomes.'],
        ['In an ecosystem, the ultimate source of energy is', ['the sun', 'soil nutrients', 'decomposers', 'water'], 0, 'Solar energy drives photosynthesis and the food chain.']
      ]
    },
    'computer-science': {
      1: [
        ['The binary number 1010 equals decimal', ['8', '10', '12', '20'], 1, '8 + 0 + 2 + 0 = 10.'],
        ['A Python list is', ['immutable', 'mutable', 'unordered only', 'a key-value store'], 1, 'List elements can be changed in place.'],
        ['A while loop is preferred when', ['iterations are known', 'iterations are not known in advance', 'there is no condition', 'only strings are used'], 1, 'It runs while a condition holds.'],
        ['len("Kerala") evaluates to', ['5', '6', '7', 'an error'], 1, 'The string has six characters.'],
        ['Which of these is NOT a built-in Python type?', ['list', 'tuple', 'dictionary', 'array'], 3, 'array needs the array module; the others are built in.']
      ],
      2: [
        ['A stack follows the order', ['FIFO', 'LIFO', 'random access', 'priority order'], 1, 'Last in, first out.'],
        ['The SQL command used to retrieve rows is', ['INSERT', 'UPDATE', 'SELECT', 'ALTER'], 2, 'SELECT reads data from tables.'],
        ['Inheritance is a feature of', ['procedural programming', 'object oriented programming', 'assembly language', 'SQL'], 1, 'OOP supports inheritance, encapsulation and polymorphism.'],
        ['Decimal 13 in binary is', ['1011', '1100', '1101', '1110'], 2, '8 + 4 + 1 = 1101.'],
        ['A primary key in a table must be', ['unique and not null', 'numeric', 'sorted', 'optional'], 0, 'It identifies each row uniquely.']
      ]
    },
    'computer-application': {
      1: [
        ['The HTML tag for the largest heading is', ['<head>', '<h1>', '<h6>', '<header>'], 1, '<h1> is the top-level heading.'],
        ['A spreadsheet cell reference is written as', ['1A', 'A1', 'A-1', '#A1'], 1, 'Column letter followed by row number.'],
        ['One kilobyte equals', ['1000 bits', '1024 bytes', '1024 bits', '1000 bytes'], 1, 'Binary multiples use 1024.'],
        ['Which of the following is an operating system?', ['Linux', 'Excel', 'Chrome', 'Photoshop'], 0, 'Linux is a kernel and OS.'],
        ['Mail merge is used to', ['format images', 'create many personalised letters', 'compress files', 'scan documents'], 1, 'One template merges with a data list.']
      ],
      2: [
        ['CSS is used to', ['store data', 'style web pages', 'query databases', 'compile programs'], 1, 'Cascading Style Sheets control presentation.'],
        ['An IPv4 address is how many bits long?', ['8', '16', '32', '128'], 2, 'Four octets = 32 bits.'],
        ['JavaScript in a web page runs', ['only on the server', 'in the browser', 'in the database', 'in CSS'], 1, 'It executes client-side in the browser.'],
        ['The SQL clause that filters rows is', ['ORDER BY', 'GROUP BY', 'WHERE', 'JOIN'], 2, 'WHERE sets a row condition.'],
        ['Phishing is', ['a network topology', 'a fraudulent attempt to obtain credentials', 'a backup method', 'a CSS framework'], 1, 'Attackers impersonate a trusted source.']
      ]
    },
    electronics: {
      1: [
        ['The unit of resistance is the', ['farad', 'ohm', 'henry', 'tesla'], 1, 'R = V/I, measured in ohms.'],
        ['A diode allows current to flow', ['equally both ways', 'mainly in one direction', 'only when heated', 'only in AC'], 1, 'The p-n junction conducts in forward bias.'],
        ['A bridge rectifier uses how many diodes?', ['1', '2', '4', '6'], 2, 'Four diodes give full-wave rectification.'],
        ['A capacitor stores energy in the', ['magnetic field', 'electric field', 'chemical form', 'thermal form'], 1, 'Charge separation creates an electric field.'],
        ['The colour code red-red-brown-gold gives', ['22 Ω ±5%', '220 Ω ±5%', '2200 Ω ±5%', '22 kΩ ±10%'], 1, '22 × 10¹ = 220 Ω, gold = ±5%.']
      ],
      2: [
        ['An ideal operational amplifier has', ['zero input impedance', 'infinite input impedance', 'zero open loop gain', 'infinite output impedance'], 1, 'Ideally no current enters the inputs.'],
        ['An AND gate gives output 1 when', ['any input is 1', 'all inputs are 1', 'all inputs are 0', 'inputs are unequal'], 1, 'Logical conjunction.'],
        ['The binary number 1101 equals decimal', ['11', '12', '13', '14'], 2, '8 + 4 + 0 + 1 = 13.'],
        ['A flip-flop is a', ['combinational circuit', 'sequential circuit', 'rectifier', 'filter'], 1, 'It stores one bit of state.'],
        ['Modulation is used to', ['reduce antenna size and carry information', 'increase distortion', 'remove the carrier', 'convert AC to DC'], 0, 'A high-frequency carrier carries the signal efficiently.']
      ]
    },
    statistics: {
      1: [
        ['The mean of 2, 4, 6, 8 is', ['4', '5', '6', '8'], 1, 'Sum 20 divided by 4 = 5.'],
        ['The median of 3, 7, 9 is', ['3', '7', '9', '6.33'], 1, 'The middle value of the ordered data.'],
        ['Range is defined as', ['mean − median', 'maximum − minimum', 'variance²', 'sum of deviations'], 1, 'It is the simplest measure of spread.'],
        ['Standard deviation is the', ['square of variance', 'square root of variance', 'mean absolute deviation', 'median of squares'], 1, 'SD = √variance.'],
        ['The correlation coefficient always lies between', ['0 and 1', '−1 and 1', '−∞ and ∞', '0 and 100'], 1, 'It measures direction and strength of a linear relation.']
      ],
      2: [
        ['The binomial distribution is defined by', ['mean and variance', 'n and p', 'median and mode', 'only n'], 1, 'Number of trials and probability of success.'],
        ['In a normal distribution, mean, median and mode are', ['all different', 'equal', 'zero', 'undefined'], 1, 'The curve is symmetric about the mean.'],
        ['The null hypothesis usually states that', ['there is no effect or difference', 'the sample is biased', 'the result is significant', 'the data are normal'], 0, 'It is the default "no difference" position.'],
        ['The chi-square test is commonly used to test', ['association between categorical variables', 'the mean of one sample', 'correlation of two continuous variables', 'variance of a population'], 0, 'It compares observed and expected frequencies.'],
        ['An index number measures', ['absolute values', 'relative change over time', 'probability', 'dispersion'], 1, 'It expresses change relative to a base period.']
      ]
    }
  };
})(window.HSE = window.HSE || {});
