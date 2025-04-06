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
        {
            id: 'CG1A2-II',
            title: 'Climate Shadow Concept',
            content: `The enormity of the global climate crisis is so vast that individual actions may seem meaningless: can installing LED lighting in my home or keeping my car tires inflated really help save the polar bears?

First coined by Portland, Oregon-based writer Emma Pattee, the climate shadow aims to paint a picture of the full sum of one's choices — and the impact they have on the planet.

In an article she wrote in 2021, Pattee detailed her concept for measuring an individual's impact: "Your climate shadow is a dark shape stretching out behind you. Everywhere you go, it goes too, tallying not just your air conditioning use and the gas mileage of your car, but also how you vote, how many children you choose to have, where you work, how you invest your money, how much you talk about climate change, and whether your words amplify urgency, apathy, or denial." The larger the shadow — the greater an individual's impact on doing good for the planet.

In other words, rather than incentivizing purely individual actions, your climate shadow grows when those actions inspire others, knowingly or otherwise.`,
            questions: [
                {
                    question: "Choose the option that presents a conclusion which can be correctly drawn from text CG1A2-II",
                    options: [
                        "The last sentence of the text makes it clear that the climate shadow is only about individual actions.",
                        "The text suggests that individual actions are meaningless when we talk about the enormity of the global climate crisis.",
                        "It is clear in the text that the climate shadow is something dangerous for the planet.",
                        "The text suggests that one's climate shadow grows if individual actions inspire others, even if those are intentional or not.",
                        "The climate shadow highlights the impact of large industries on the planet."
                    ],
                    correctAnswer: 3,
                    explanation: "The text explicitly states that 'your climate shadow grows when those actions inspire others, knowingly or otherwise'.",
                    category: "reading",
                    vocabulary: {
                        term: "climate shadow",
                        definition: "The cumulative impact of all an individual's choices and actions on the climate",
                        usage: "Your climate shadow includes not just your direct emissions but also your influence on others."
                    }
                }
            ]
        },
        {
            id: 'CG1A2-I',
            title: 'William Shakespeare Biography',
            content: `William Shakespeare (baptized April 26, 1564, Stratford-upon-Avon, Warwickshire, England — died April 23, 1616, Stratford-upon-Avon) was an English poet, dramatist, and actor often called the English national poet and considered by many to be the greatest dramatist of all time.

Stratford enjoyed a grammar school of good quality, and the education there was free, the schoolmaster's salary being paid by the borough. No lists of the pupils who were at the school in the 16th century have survived, but it would be absurd to suppose the bailiff of the town did not send his son there. The boy's education would consist mostly of Latin studies — learning to read, write, and speak the language fairly well and studying some of the Classical historians, moralists, and poets. Shakespeare did not go on to the university, and indeed it is unlikely that the scholarly round of logic, rhetoric, and other studies then followed there would have interested him.`,
            questions: [
                {
                    question: "About the ideas and the linguistic aspects of text CG1A2-I, choose the correct option.",
                    options: [
                        "Shakespeare had the opportunity to learn more about the Classical historians, moralists, and poets in university.",
                        "The word 'bailiff' has the same meaning as mayor.",
                        "The word 'schoolmaster' has the same meaning as school director.",
                        "The last sentence of the text gives the idea that Shakespeare did not like to study.",
                        "The text is not clear about Shakespeare's date of birth."
                    ],
                    correctAnswer: 4,
                    explanation: "The text mentions Shakespeare's baptism date but doesn't explicitly state his birth date, which could be different in that historical period.",
                    category: "reading",
                    vocabulary: {
                        term: "bailiff",
                        definition: "A local official with administrative duties in medieval England",
                        synonyms: ["town official", "magistrate"],
                        usage: "The bailiff was responsible for maintaining order in the town."
                    }
                },
                {
                    question: "About text CG1A2-I, judge the following items.",
                    options: [
                        "It can be inferred from the sentence 'Stratford enjoyed a grammar school of good quality' that the school in Stratford that time taught only grammatical topics.",
                        "Although there are no school records available, it is believed that Shakespeare attended the Stratford grammar school.",
                        "It is correct to infer from the text that Shakespeare's father was the bailiff of the town.",
                        "In school, Shakespeare did not like subjects about logic and rhetoric."
                    ],
                    correctAnswer: 1,
                    explanation: "The text states it would be 'absurd to suppose the bailiff of the town did not send his son there', strongly implying Shakespeare attended.",
                    category: "inference",
                    vocabulary: {
                        term: "grammar school",
                        definition: "In Renaissance England, a school that taught Latin and classical literature",
                        usage: "Grammar schools in Shakespeare's time focused on classical education."
                    }
                }
            ]
        },
        {
            id: '18A3-I',
            title: 'Hydroelectric Power',
            content: `The roar of a waterfall suggests the power of water. Rampaging floodwaters can uproot strong trees and twist railroad tracks. When the power of water is harnessed, however, it can do useful work for humans.

Since ancient times, people have put the energy in the flow of water to work. They first made water work for them with the waterwheel, a wheel with paddles around its rim. Flowing water rotated the waterwheel, which in turn ran machinery that was linked to it. Today, new kinds of waterwheels – turbines – spin generators that produce electricity. Electricity from water-turned generators is known as hydroelectricity.

By building a dam across a river, the natural upstream water level is elevated and a difference in head is created that can be used to drive turbines and generate electricity. A large upstream reservoir may balance seasonal water flow; rain or melted snow can be stored in the reservoir during the wet season to provide electricity during dry seasons.

Waterpower is distributed unevenly among the continents and nations of the world. Europe and North America have developed much of their waterpower. Asia, South America, and Africa have abundant waterpower potential, but while countries such as China and Brazil have become leading hydroelectric producers, much of the waterpower resource on those continents remains undeveloped.`,
            questions: [
                {
                    question: "In the first paragraph of text 18A3-I, the expression which best suggests an image of the power of man over rivers is",
                    options: [
                        "uproot strong trees",
                        "the power of water is harnessed",
                        "twist railroad tracks",
                        "the power of water",
                        "The roar of a waterfall"
                    ],
                    correctAnswer: 1,
                    explanation: "'Harnessed' implies human control and utilization of natural power, contrasting with the destructive natural power described in other options.",
                    category: "vocabulary",
                    vocabulary: {
                        term: "harness",
                        synonyms: ["utilize", "control", "channel"],
                        antonyms: ["release", "free"],
                        usage: "Modern technology allows us to harness wind energy efficiently."
                    }
                }
            ]
        },
        {
            id: '9A2-II',
            title: 'Teaching Methods',
            content: `As I was driving, the snow had started falling in earnest. The light was flat, although it was midmorning, making it almost impossible to distinguish the highway. I turned on the radio to help me concentrate on the road ahead; the announcer was talking about the snow. "The state Highway department advises motorists to use extreme caution and to drive with their headlights on to ensure maximum visibility." He went on. "The state highway supervisor just called to say that one of the plows almost hit a car because the person driving hadn't turned on his lights." I checked, almost reflexively, to be sure that my headlights were on.

How can information serve those who hear or read it in making sense of their own worlds? How can it enable them to reason about what they do and to take appropriate actions based on that reasoning? My experience with the radio illustrates two different ways of providing the same message: the need to use your headlights when you drive in heavy snow. The first offers dispassionate information; the second tells the same content in a personal, compelling story. The first disguises its point of view; the second explicitly grounds the general information in a particular time and place. Each means of giving information has its role, but I believe the second is ultimately more useful in helping people make sense of what they are doing. When I heard the story about the plow, I made sure my headlights were on.

In what is written about teaching, it is rare to find accounts in which the author's experience and point of view are central. A point of view is not simply an opinion; neither is it a whimsical or impressionistic claim. Rather, a point of view lays out what the author thinks and why. The problem is that much of what is available in professional development in language-teacher education concentrates on telling rather than on point of view. The telling is prescriptive, like the radio announcer's first statement. It emphasizes what is important to know and do, what is current in theory and research, and therefore what you — as a practicing teacher — should do. But this telling disguises the teller; it hides the point of view that can enable you to make sense of what is told.`,
            questions: [
                {
                    question: "Choose the option that presents a correct rewriting of the sentence about 'telling' (sixth sentence of the last paragraph), maintaining the original meaning and grammar correctness.",
                    options: [
                        "The telling way of information has to do with things a practicing teacher should know and do, and with what theory and research indicates, notwithstanding what he or she must do.",
                        "The telling shows how important it is to know and do what is prescribed in theory and research, and consequently what a real teacher should do.",
                        "This way of giving information focuses on what is important to know and do, and on what can be found in theory and research, and, thus, on what one — as a practicing teacher — should do.",
                        "By placing the emphases on what a practicing teacher does, because it is a trend in theoretical and research areas, it is telling of what is important to know and to do.",
                        "It shows what one should know and do that is prescribed for theory and research, and consequently, what guidance you, as a practicing teacher, should follow."
                    ],
                    correctAnswer: 2,
                    explanation: "This option perfectly maintains the original meaning about focusing on important knowledge and research-based practices for teachers.",
                    category: "grammar",
                    vocabulary: {
                        term: "prescriptive",
                        definition: "Relating to the imposition or enforcement of rules",
                        synonyms: ["authoritative", "dogmatic"],
                        antonyms: ["descriptive", "flexible"]
                    }
                },
                {
                    question: "Choose the option that presents a conclusion which can be correctly drawn from the story reported by the announcer in the fragment about the plow almost hitting a car.",
                    options: [
                        "If the car driver turned his lights, the plow wouldn't have hit his car",
                        "Had the car driver turned his lights on, the plow wouldn't have almost hit his car.",
                        "The plows wouldn't have almost hit the car, had the driver kept the car lights off.",
                        "There wouldn't have been an accident with the plows if the driver had turned his lights on.",
                        "Had the car driver turned his lights on, there wouldn't have been an accident."
                    ],
                    correctAnswer: 1,
                    explanation: "This correctly uses the conditional perfect tense to show the relationship between the lights being on and the near-miss.",
                    category: "grammar",
                    vocabulary: {
                        term: "conditional perfect",
                        definition: "A verb tense used to describe hypothetical past situations",
                        example: "Had I known, I would have acted differently."
                    }
                },
                {
                    question: "According to the author of text 9A2-II,",
                    options: [
                        "by concentrating on point of view, language-teacher education would show future teachers what they should do and what kind of literature they should read.",
                        "a point of view is too subjective to be taken seriously.",
                        "language-teacher education should be more humane, subjective and personal.",
                        "the telling method in language-teacher education leaves out the point of view on which what is being told is based.",
                        "the language of telling is much more useful in language-teacher education than presenting people with points of view."
                    ],
                    correctAnswer: 3,
                    explanation: "The author criticizes the 'telling' approach for hiding the underlying point of view that gives meaning to the information.",
                    category: "reading",
                    vocabulary: {
                        term: "point of view",
                        synonyms: ["perspective", "standpoint", "viewpoint"],
                        usage: "The author's point of view becomes clear in the final chapter."
                    }
                }
            ]
        },
        {
            id: '9A2-I',
            title: 'Theory in Language Teaching',
            content: `In what is written about teaching, it is rare to find accounts in which the author's experience and point of view are central. A point of view is not simply an opinion; neither is it a whimsical or impressionistic claim. Rather, a point of view lays out what the author thinks and why. The problem is that much of what is available in professional development in language-teacher education concentrates on telling rather than on point of view. The telling is prescriptive, like the radio announcer's first statement. It emphasizes what is important to know and do, what is current in theory and research, and therefore what you — as a practicing teacher — should do. But this telling disguises the teller; it hides the point of view that can enable you to make sense of what is told.`,
            questions: [
                {
                    question: "About the semantic and grammatical features of text 9A2-I, choose the correct option.",
                    options: [
                        "The word 'however' (second sentence of the first paragraph) is an adverb that can be correctly replaced with nonetheless.",
                        "The pronoun 'them', in 'many of them' (first sentence of the text), refers back to 'language teaching and research circles'.",
                        "The word 'that', in 'hold that' (first sentence of the second paragraph), is a pronoun which is the object of 'hold', and refers back to 'those who subscribe'.",
                        "In 'for theorizing to be productive' (last sentence of the first paragraph), the word 'theorizing' is used as a noun and, as such, is the object of 'feel'.",
                        "The fragment '(or think they don't)' (last sentence of the first paragraph) shows that the authors doubt some people don't have problems with theory."
                    ],
                    correctAnswer: 4,
                    explanation: "The parenthetical remark suggests the authors are skeptical about claims of not having problems with theory.",
                    category: "grammar",
                    vocabulary: {
                        term: "parenthetical",
                        definition: "A word or phrase inserted as an explanation or afterthought",
                        usage: "Parenthetical remarks are often set off by commas or parentheses."
                    }
                },
                {
                    question: "The expression 'theoretical red herring' (second sentence of the last paragraph) characterizes",
                    options: [
                        "a theorization that would take attention away from more important things.",
                        "a very interesting hypothesis that has yet to be proved.",
                        "a theoretical standpoint that gets attention for being popular in the media.",
                        "a theory that has received considerable funding from a government or research institution.",
                        "an opinion that is agreed upon by many theoreticians but has not been object of articles or books."
                    ],
                    correctAnswer: 0,
                    explanation: "A 'red herring' is something that misleads or distracts from relevant issues, in this case theoretical distractions.",
                    category: "vocabulary",
                    vocabulary: {
                        term: "red herring",
                        definition: "Something that draws attention away from the central issue",
                        origin: "From the practice of using strong-smelling fish to distract hunting dogs from a trail",
                        usage: "The politician's response was a red herring that avoided the real question."
                    }
                }
            ]
        }
    ];

    // [Rest of the JavaScript code remains exactly the same...]
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
