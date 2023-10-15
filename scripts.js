const questions = [
    // Travel Questions
    {
        question: "What language is spoken in the Philippines?",
        answers: [
            {text: "English", correct: false},
            {text: "Spanish", correct: false},
            {text: "Filipino", correct: true},
            {text: "Tagalog", correct: false},
        ]
    },
    {
        question: "What currency is used in the Philippines?",
        answers: [
            {text: "Philippine Dollars (PH$)", correct: false},
            {text: "Philippine Yen (PH¥)", correct: false},
            {text: "Philippine Peso (PH₱)", correct: true},
            {text: "Philippine Pound (PH£)", correct: false},
        ]
    },
    {
        question: "What is the Capital of the Philippines?",
        answers: [
            {text: "Baguio", correct: false},
            {text: "Manila", correct: true},
            {text: "Cebu", correct: false},
            {text: "Davao", correct: false},
        ]
    },
    {
        question: "Where is the most famous beach destination in the Philippines?",
        answers: [
            {text: "Manila Bay in Metro Manila", correct: false},
            {text: "El Nido in Palawan", correct: false},
            {text: "Boracay in Aklan", correct: true},
            {text: "Pagudpud Beach in Ilocos Norte", correct: false},
        ]
    },
];

const questionText = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

// Start Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Show Question
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionText.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
              button.innerHTML = answer.text;
              button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
              button.dataset.correct = answer.correct; 
        }
              button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionText.innerHTML = `Score: ${score} / ${questions.length}!`;
    nextButton.innerHTML = "Take Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
