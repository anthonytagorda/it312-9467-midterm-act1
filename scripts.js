const questionText = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const progressBar = document.getElementById("progress-bar");

let currentQuestionIndex = 0;
let score = 0;
let questions = []; // Ensure to declare the 'questions' array

// Fetch the questions from the external JSON file
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    startQuiz();
  });

// Start Quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  updateProgressBar();
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
    while (answerButton.firstChild) {
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
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        updateProgressBar();
    } else {
        showScore();
        updateProgressBar();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

function updateProgressBar() {
    if (currentQuestionIndex >= questions.length) {
        progressBar.style.width = '100%';
    } else {
        const progress = (currentQuestionIndex / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
}
