const questionText = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const progressBar = document.getElementById("progress-bar");

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Load questions from localStorage or fetch if not present.
if (localStorage.getItem("questions")) {
  questions = JSON.parse(localStorage.getItem("questions"));
  startQuiz();
} else {
  fetch('questions.json')
    .then(response => response.json())
    .then(data => {
      questions = data;
      localStorage.setItem("questions", JSON.stringify(questions)); // Store questions in localStorage.
      startQuiz();
    });
}

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

// Refresh State
function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

// Check if answer is right or wrong
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

// Show Score
function showScore() {
  resetState();
  questionText.innerHTML = `Score: ${score} / ${questions.length}!`;
  nextButton.innerHTML = "Take Again";
  nextButton.style.display = "block";
}

// Update Progress Bar
function updateProgressBar() {
  if (currentQuestionIndex >= questions.length) {
    progressBar.style.width = '100%';
  } else {
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
  }
}

// Increments question number/index and nextButton appears after the user selects an answer
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

// If an answer is selected, the next button appears
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
