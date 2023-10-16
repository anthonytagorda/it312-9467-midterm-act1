    
   const questions = [
    {
        "question": "Type of programming language used to <i>combine existing components together</i>",
        "answers": [
            {"text": "Object-oriented (OOP)", "correct": false},
            {"text": "Logic programming languages", "correct": false},
            {"text": "Scripting language", "correct": true},
            {"text": "Functional programming language", "correct": false}
        ]
    },
    {
        "question": "A programming language that is one of the core technologies of the World Wide Web,<i> alongside HTML and CSS </i>",
        "answers": [
            {"text": "ActionScript", "correct": false},
            {"text": "LuaScript", "correct": false},
            {"text": "CoffeeScript", "correct": false},
            {"text": "JavaScript", "correct": true}
        ]
    },
    {
        "question": "Executes only <i>after</i> document has been parsed, but <i>before</i> firing DOMContentLoaded",
        "answers": [
            {"text": "Let", "correct": false},
            {"text": "Defer", "correct": true},
            {"text": "Async", "correct": false},
            {"text": "Const", "correct": false}
        ]
    },
    {
        "question": "Executes <i>as soon as</i> it has been fetched in full, but <i>before</i> the load event is fired",
        "answers": [
            {"text": "Let", "correct": false},
            {"text": "Defer", "correct": false},
            {"text": "Async", "correct": true},
            {"text": "Const", "correct": false}
        ]
    },
    {
        "question": "<i>Displays output</i> on the console",
        "answers": [
            {"text": "console.log()", "correct": true},
            {"text": "console.warn()", "correct": false},
            {"text": "console.info()", "correct": false},
            {"text": "console.debug()", "correct": false}
        ]
    },
    {
        "question": "<u>Loose Equality Operator</u> or the '___' operator, compares two values for equality <i>after performing type conversion if needed.</i>",
        "answers": [
            {"text": "===", "correct": false},
            {"text": "==", "correct": true},
            {"text": "!=", "correct": false},
            {"text": "+=", "correct": false}
        ]
    },
    {
        "question": "<u>Strict Equality Operator</u> or the '___' operator, compares two values for equality <i>without performing type conversion.</i>",
        "answers": [
            {"text": "===", "correct": true},
            {"text": "==", "correct": false},
            {"text": "!=", "correct": false},
            {"text": "+=", "correct": false}
        ]
    },
    {
        "question": "Variables declared with ____ are <i>Block-scoped</i>, <i>accessible within the block</i>; after the point they are declared.",
        "answers": [
            {"text": "const", "correct": false},
            {"text": "var", "correct": false},
            {"text": "let", "correct": true},
            {"text": "function", "correct": false}
        ]
    },
    {
        "question": "Variables declared with ____ are <i>Function-scoped</i>, <i>accessible within the entire function</i>; becomes global if declared outside a function",
        "answers": [
            {"text": "let", "correct": false},
            {"text": "var", "correct": true},
            {"text": "const", "correct": false},
            {"text": "function", "correct": false}
        ]
    },
    {
        "question": "A lightweight, human-readable data interchange format",
        "answers": [
            {"text": "XML (Extensible Markup Language)", "correct": false},
            {"text": "CSV (Comma-Separated Values)", "correct": false},
            {"text": "YAML (YAML Ain't Markup Language)", "correct": false},
            {"text": "JSON (JavaScript Object Notation)", "correct": true}
        ]
    },
    {
        "question": "What is part of a database that holds only one type of information?",
        "answers": [
            {"text": "Report", "correct": false},
            {"text": "Field", "correct": true},
            {"text": "Record", "correct": false},
            {"text": "File", "correct": false}
        ]
    },
    {
        "question": "How many font sizes are permitted by HTML to display text?",
        "answers": [
            {"text": "4", "correct": false},
            {"text": "5", "correct": false},
            {"text": "6", "correct": false},
            {"text": "7", "correct": true}
        ]
    },
    {
        "question": "Which of the following specifies the space between the border of the cell and its contents?",
        "answers": [
            {"text": "Cellpadding", "correct": true},
            {"text": "CellSpacing", "correct": false},
            {"text": "Border", "correct": false},
            {"text": "Width", "correct": false}
        ]
    },
    {
        "question": "To set up the window to capture all Click events, we use which of the following statement?",
        "answers": [
            {"text": "window.captureEvents(Even.CLICK);", "correct": true},
            {"text": "window.handleEvents(Even.CLICK);", "correct": false},
            {"text": "window.routeEvents(Even.CLICK);", "correct": false},
            {"text": "window.raiseEvents(Even.CLICK);", "correct": false}
        ]
    },
    {
        "question": "Which built-in method combines the text of two strings and returns a new string?",
        "answers": [
            {"text": "append()", "correct": false},
            {"text": "concat()", "correct": true},
            {"text": "attach()", "correct": false},
            {"text": "None of the above", "correct": false}
        ]
    }
]

const questionText = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const progressBar = document.getElementById("progress-bar");

let currentQuestionIndex = 0;
let score = 0;
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
        updateProgressBar();
        showQuestion();
    } else {
        showScore();
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
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
  }

