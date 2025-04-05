document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const textDisplay = document.getElementById('text-display');
    const questionContainer = document.getElementById('question-container');
    const feedbackContainer = document.getElementById('feedback-container');
    const explanationText = document.getElementById('explanation-text');
    const vocabularyTip = document.getElementById('vocabulary-tip');
    const nextBtn = document.getElementById('next-btn');
    const reviewBtn = document.getElementById('review-btn');
    const scoreElement = document.getElementById('score');
    const streakElement = document.getElementById('streak');
    const accuracyElement = document.getElementById('accuracy');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const categorySelect = document.getElementById('category-select');
    const statsPanel = document.getElementById('stats-panel');
    const correctCountElement = document.getElementById('correct-count');
    const incorrectCountElement = document.getElementById('incorrect-count');
    const finalAccuracyElement = document.getElementById('final-accuracy');
    const finalStreakElement = document.getElementById('final-streak');
    const restartBtn = document.getElementById('restart-btn');

    // Quiz state
    let currentQuestionIndex = 0;
    let score = 0;
    let streak = 0;
    let maxStreak = 0;
    let totalAttempted = 0;
    let selectedOption = null;
    let currentQuestions = [];
    let currentText = {};
    let allQuestions = [];

    // All texts database
    const textsDatabase = [
        {
            id: 'CB1A7',
            title: 'Global Economic Transformation',
            content: `Whenever a global economic transformation takes place, a single city usually drives it forward. Ghent, in modern-day Belgium, was at the core of the burgeoning global wool trade in the 13th century. The first initial public offering took place in Amsterdam in 1602. London was the financial centre of the first wave of globalisation during the 19th century. Today the city is San Francisco.

California's commercial capital has no serious rival in generative artificial intelligence (AI), a breakthrough technology that has caused a bull market in American stocks and which, many economists hope, will power a global productivity surge. Almost all big AI start-up companies are based in the Bay Area, which comprises the city of San Francisco and Silicon Valley (largely based in Santa Clara county, to the south). OpenAI is there, of course; so are Anthropic, Databricks and Scale AI. Tech giants, including Meta and Microsoft, are also spending big on AI in San Francisco. According to Brookings Metro, a think tank, last year San Francisco accounted for close to a tenth of generative AI job postings in America, more than any other city of the country. New York, with four times as many residents, was second.`,
            questions: [
                {
                    question: "In text CB1A7, the expression 'California's commercial capital' (in the beginning of the second paragraph) refers to",
                    options: [
                        "Silicon Valley",
                        "Bay Area",
                        "Santa Clara",
                        "San Francisco"
                    ],
                    correctAnswer: 3,
                    explanation: "The text explicitly states that today the city driving global economic transformation is San Francisco, which is California's commercial capital.",
                    category: "reference",
                    vocabulary: {
                        term: "commercial capital",
                        synonyms: ["business hub", "economic center", "financial capital"],
                        usage: "New York is often considered the commercial capital of the United States."
                    }
                },
                {
                    question: "Maintaining the original meaning and the grammatical correctness of text CB1A7, the word 'burgeoning' (second sentence) could be replaced with",
                    options: [
                        "shrinking",
                        "flourishing",
                        "withering",
                        "outstanding"
                    ],
                    correctAnswer: 1,
                    explanation: "'Flourishing' means developing rapidly and successfully, which matches the meaning of 'burgeoning' in this context.",
                    category: "vocabulary",
                    vocabulary: {
                        term: "burgeoning",
                        synonyms: ["flourishing", "thriving", "expanding", "growing rapidly"],
                        antonyms: ["declining", "shrinking"],
                        usage: "The burgeoning tech industry in the city has created many new jobs."
                    }
                },
                {
                    question: "In text CB1A7, the word 'which', in the first sentence of the second paragraph, refers back to",
                    options: [
                        "'American stocks'",
                        "'a bull market'",
                        "'serious rival'",
                        "'a breakthrough technology'"
                    ],
                    correctAnswer: 3,
                    explanation: "The relative pronoun 'which' refers to the nearest preceding noun phrase, which is 'a breakthrough technology'.",
                    category: "grammar",
                    vocabulary: {
                        term: "relative pronoun",
                        definition: "A pronoun that introduces a relative clause and refers to an antecedent",
                        examples: ["which", "that", "who", "whom"]
                    }
                },
                {
                    question: "Based on the ideas conveyed in text CB1A7, choose the correct option.",
                    options: [
                        "Most of the big tech companies that have been investing in AI are based in the Silicon Valley.",
                        "There are more generative artificial intelligence companies hiring in New York than in San Francisco.",
                        "An organization of experts has affirmed that almost ten percent of all job postings related to generative AI in the US happened in San Francisco.",
                        "The advent of generative artificial intelligence caused American stocks to sink."
                    ],
                    correctAnswer: 2,
                    explanation: "The text states that according to Brookings Metro, San Francisco accounted for close to a tenth of generative AI job postings in America.",
                    category: "reading",
                    vocabulary: {
                        term: "advent",
                        synonyms: ["arrival", "emergence", "appearance"],
                        antonyms: ["disappearance", "departure"]
                    }
                }
            ]
        },
        {
            id: 'CB4A1',
            title: 'Private International Law',
            content: `When parties to a private law dispute are based in different countries, or the facts and issues giving rise to the dispute cross national borders, questions of private international law arise. In which country's courts should the parties litigate their dispute? Which country's law should be applied to resolve it? How can the judgment be enforced in another country? Private international law is the body of domestic law that supplies the rules used to determine these questions.

Problems of private international law are by no means a recent phenomenon. The conditions that give rise to problems of private international law date from at least the fourth century BC. The problems are, however, becoming more difficult and increasingly pervasive because modern technologies challenge the territorial premise on which the existing rules of private international law have been developed.

In this respect, the advent of the Internet in the late 1980s has been a catalyst of socio-economic change that has posed significant challenges for private international law. More recent innovations, such as crypto-tokens and distributed ledgers, add novel and arguably intractable problems to these existing challenges.

The British Law Commission has a project that particularly focuses on crypto-tokens, electronic bills of lading, and electronic bills of exchange. This is because these assets are prevalent in market practice, whilst also posing novel theoretical challenges to the methods by which issues of private international law have traditionally been resolved.`,
            questions: [
                {
                    question: "Based on the ideas conveyed in text CB4A1, choose the correct option.",
                    options: [
                        "The origins of the issues in private international law can be traced back to at least the fourth century BC.",
                        "Private international law primarily deals with disputes that arise within a single country.",
                        "The British Law Commission's project focuses on assets like crypto-tokens, electronic bills of lading, and electronic bills of exchange because they are not prevalent in the market practice.",
                        "The problems of private international law are a recent phenomenon."
                    ],
                    correctAnswer: 0,
                    explanation: "The text explicitly states that the conditions giving rise to private international law problems date from at least the fourth century BC.",
                    category: "reading",
                    vocabulary: {
                        term: "phenomenon",
                        synonyms: ["occurrence", "event", "fact"],
                        usage: "Globalization is not a new phenomenon."
                    }
                },
                {
                    question: "According to text CB4A1, the factor that most significantly contributes to the increasing difficulty of resolving disputes related to private international law is",
                    options: [
                        "socio-economic changes.",
                        "the challenging of the territorial premise.",
                        "fourth-century BC conditions.",
                        "electronic bills of lading."
                    ],
                    correctAnswer: 1,
                    explanation: "The text states that modern technologies challenge the territorial premise on which the existing rules of private international law have been developed.",
                    category: "reading",
                    vocabulary: {
                        term: "territorial premise",
                        definition: "the fundamental assumption that laws are tied to specific geographic locations",
                        usage: "Digital technologies challenge the territorial premise of traditional legal systems."
                    }
                }
            ]
        },
        // Additional texts would be added here following the same structure
        // Each with their complete content and full set of questions
    ];

    // Initialize the app
    function init() {
        // Combine all questions from all texts
        allQuestions = [];
        textsDatabase.forEach(text => {
            text.questions.forEach(question => {
                question.textId = text.id;
                question.textTitle = text.title;
                allQuestions.push(question);
            });
        });

        loadQuestions('all');
        setupEventListeners();
    }

    // Set up event listeners
    function setupEventListeners() {
        nextBtn.addEventListener('click', nextQuestion);
        reviewBtn.addEventListener('click', reviewText);
        categorySelect.addEventListener('change', () => loadQuestions(categorySelect.value));
        restartBtn.addEventListener('click', restartQuiz);
    }

    // Load questions by category
    function loadQuestions(category) {
        if (category === 'all') {
            currentQuestions = [...allQuestions];
        } else {
            currentQuestions = allQuestions.filter(q => q.category === category || 
                (category === 'reference' && q.category === 'grammar' && q.question.includes('refers')));
        }

        // Shuffle questions
        currentQuestions = shuffleArray(currentQuestions);
        
        currentQuestionIndex = 0;
        score = 0;
        streak = 0;
        maxStreak = 0;
        totalAttempted = 0;
        updateScore();
        displayQuestion();
        statsPanel.classList.add('hidden');
    }

    // Display current question with full text
    function displayQuestion() {
        if (currentQuestionIndex >= currentQuestions.length) {
            // Quiz completed
            showResults();
            return;
        }

        const question = currentQuestions[currentQuestionIndex];
        const text = textsDatabase.find(t => t.id === question.textId);

        // Display the full text
        textDisplay.innerHTML = `
            <h2>${text.title}</h2>
            <div class="text-content">${formatTextContent(text.content)}</div>
        `;

        // Highlight text references in the question if any
        let questionText = question.question;
        if (questionText.includes("(in the beginning of the second paragraph)")) {
            // You could add more sophisticated text highlighting here
        }

        // Display the question and options
        let optionsHTML = question.options.map((option, index) => `
            <div class="option" data-index="${index}">
                ${String.fromCharCode(65 + index)}. ${option}
            </div>
        `).join('');

        questionContainer.innerHTML = `
            <div class="question-text">${questionText}</div>
            <div class="options-container">
                ${optionsHTML}
            </div>
        `;

        feedbackContainer.classList.add('hidden');
        
        // Add event listeners to options
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', selectOption);
        });
        
        // Update progress
        updateProgress();
    }

    // Format text content with paragraphs
    function formatTextContent(content) {
        return content.split('\n\n').map(paragraph => 
            `<p>${paragraph}</p>`
        ).join('');
    }

    // Handle option selection
    function selectOption(e) {
        if (feedbackContainer.classList.contains('hidden')) {
            const selectedIndex = parseInt(e.target.getAttribute('data-index'));
            const question = currentQuestions[currentQuestionIndex];
            
            // Highlight selected option
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            e.target.classList.add('selected');
            
            selectedOption = selectedIndex;
            
            // Check answer
            const isCorrect = selectedIndex === question.correctAnswer;
            
            // Show feedback
            showFeedback(isCorrect, question);
        }
    }

    // Show feedback for the answer
    function showFeedback(isCorrect, question) {
        totalAttempted++;
        
        // Mark correct/incorrect options
        document.querySelectorAll('.option').forEach((opt, index) => {
            if (index === question.correctAnswer) {
                opt.classList.add('correct');
            } else if (index === selectedOption && !isCorrect) {
                opt.classList.add('incorrect');
            }
        });
        
        // Update score and streak
        if (isCorrect) {
            score++;
            streak++;
            if (streak > maxStreak) maxStreak = streak;
        } else {
            streak = 0;
        }
        updateScore();
        
        // Show explanation and vocabulary tip
        explanationText.textContent = question.explanation;
        
        let vocabHTML = `<p><strong>${question.vocabulary.term}</strong></p>`;
        if (question.vocabulary.definition) {
            vocabHTML += `<p><strong>Definition:</strong> ${question.vocabulary.definition}</p>`;
        }
        if (question.vocabulary.synonyms) {
            vocabHTML += `<p><strong>Synonyms:</strong> ${question.vocabulary.synonyms.join(', ')}</p>`;
        }
        if (question.vocabulary.antonyms) {
            vocabHTML += `<p><strong>Antonyms:</strong> ${question.vocabulary.antonyms.join(', ')}</p>`;
        }
        if (question.vocabulary.usage) {
            vocabHTML += `<p><strong>Example:</strong> ${question.vocabulary.usage}</p>`;
        }
        
        vocabularyTip.innerHTML = vocabHTML;
        
        feedbackContainer.classList.remove('hidden');
    }

    // Move to next question
    function nextQuestion() {
        currentQuestionIndex++;
        displayQuestion();
    }

    // Review the current text
    function reviewText() {
        feedbackContainer.classList.add('hidden');
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected', 'correct', 'incorrect');
        });
    }

    // Show final results
    function showResults() {
        const accuracy = totalAttempted > 0 ? Math.round((score / totalAttempted) * 100) : 0;
        
        correctCountElement.textContent = score;
        incorrectCountElement.textContent = totalAttempted - score;
        finalAccuracyElement.textContent = `${accuracy}%`;
        finalStreakElement.textContent = maxStreak;
        
        statsPanel.classList.remove('hidden');
        questionContainer.innerHTML = '';
        textDisplay.innerHTML = '<h2>Quiz Completed!</h2>';
    }

    // Restart the quiz
    function restartQuiz() {
        loadQuestions(categorySelect.value);
    }

    // Update score display
    function updateScore() {
        const accuracy = totalAttempted > 0 ? Math.round((score / totalAttempted) * 100) : 0;
        
        scoreElement.textContent = score;
        streakElement.textContent = streak;
        accuracyElement.textContent = `${accuracy}%`;
    }

    // Update progress bar
    function updateProgress() {
        const progress = ((currentQuestionIndex) / currentQuestions.length) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
    }

    // Shuffle array
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // Initialize the app
    init();
});
