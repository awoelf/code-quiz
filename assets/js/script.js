let timeLeft = 60;
let score = 0;
let currentQuestion = 0;
let highScore = {};
let quizInterval;

// Questions
let questions = [
    {
        "question": "Which of the following languages adds interactivity to webpages and apps?",
        "answers": ["HTML", "Bootstrap", "JavaScript", "CSS"],
        "correct": 2,
    },
    {
        "question": "How do you implement a script into your code?",
        "answers": ["Use an <import> tag", "Use a <javascript> tag", "Use a <link> tag", "Use a <script> tag"],
        "correct": 3,
    },
    {
        "question": "Given a = 10, b = 9, and c = true; which of the following statements results in a false value?",
        "answers": ["a === '10'", "a === 10", "c == !false", "b == a - 1"],
        "correct": 0,
    },
    {
        "question": "Which of the following creates a JavaScript function called sortNums?",
        "answers": ["sortNums() {}", "function sortNums() {}", "void sortNums() {}", "function sortNums {}"],
        "correct": 1,
    },
    {
        "question": "Which built-in JavaScript function allows you to create a timer?",
        "answers": ["setInterval", "createTimer", "timer", "timer.setInterval"],
        "correct": 0,
    }
];

// Screens
let mainScreen = $("#main-screen");

let startScreen = 
    `<section id="start-screen" class="align-items-center justify-content-center text-center p-5 screen">
        <section  class="container">
            <h1>Coding Quiz Challenge</h1>
            <section class="container col-md-8 col-sm-12">
                <p>Answer the following questions to test your JavaScript knowledge! Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p>
            </section>
            <button id="scoreboard-btn" class="btn btn-primary bg-info m-1">Scoreboard</button>
            <button id="start-btn" class="btn btn-primary bg-info m-1">Start Quiz</button>
        </section>
    </section>`;

let questionScreen = 
    `<section id="question-screen" class="col-sm-10 col-md-8 col-lg-6 col-xl-4 align-items-center m-auto p-5 screen">  
        <section class="container">
            <section class="d-flex justify-content-between">
                <section id="timerContainer" class="d-flex">
                </section>
                <section id="scoreContainer" class="d-flex mr-auto ml-3">
                    <span class="material-symbols-outlined">scoreboard</span>
                    <p id="score" class="ml-2"></p>
                </section>
            </section>
            <h3 id="title"></h3>
            <p id="question"></p>
            <section id="answers" class="p-0 text-left w-25">
            </section>
            <h3 id="feedback" class="m2"></h3>
        </section>
    </section>`;

let endScreen = 
    `<section id="end-screen" class="col-5 m-auto text-center p-5 screen">
        <h1>Your Results</h1>
        <section class="text-center">
            <section class="d-flex justify-content-center">
                <span class="material-symbols-outlined mr-2">scoreboard</span>
                <p id="final-score"></p>
            </section>
            
            <section class="text-nowrap row align-items-baseline justify-content-center">
                <span class="material-symbols-outlined mr-2 align-self-center">abc</span>
                <label>Your initials: </label>
                <input
                id="text-input"
                maxlength="3" 
                type="text" 
                placeholder="AAA"
                class="col-sm-4 col-md-3 ml-2"
                > 
            </section>
        </section>                   
        <section class="m-1">
            <button id="scoreboard-btn" class="btn btn-primary bg-info m-2">Submit Score</button>
        </section>
    </section>`;

let scoreboard = 
    `<section id="scoreboard" class="col-sm-6 col-md-5 col-xl-3 justify-content-center text-center p-5 m-auto screen">
        <h1>Scoreboard</h1>
        <ul id="score-list" class="list-group-flush bg-transparent m-auto p-0">
        </ul>
        <button id="reset-button" class="btn btn-primary bg-info m-2">Reset Quiz</button>
    </section>`;

let listItem = 
    `<li class="d-flex justify-content-between list-group-item align-items-center bg-transparent border-white text-white">
            <p class="initials-scoreboard mb-0"></p><p class="score-scoreboard text-right mb-0"></p>
    </li>`;

                // <p id="initials-scoreboard" class="text-white"></p>
                // <p id="score-scoreboard" class="text-white"></p>
function createQuestion() {
    clearQuestion();
    $("#title").text(`Question ${currentQuestion + 1}`);
    $("#question").text(questions[currentQuestion].question);

    let answerContainer = $("#answers");
    for (let i = 0; i < questions[currentQuestion].answers.length; i++) {
        let answerChoice = $("<button>").attr("class", "btn btn-primary bg-info ans-choice w-auto text-nowrap").text(`${i + 1}. ${questions[currentQuestion].answers[i]}`);
        if(i === questions[currentQuestion].correct) {
            answerChoice.addClass("correct");
        } else {
            answerChoice.addClass("incorrect");
        }
        answerContainer.append(answerChoice);
    };
};

function startTimer() {
    let timeSymbol = $("<span>").attr("class", "material-symbols-outlined").text("timer");
    let timeDisplay = $("<p>").attr("id", "time").attr("class", "ml-2").text(`${timeLeft} seconds remaining`);
    $("#timerContainer").append(timeSymbol).append(timeDisplay);
    quizInterval = setInterval(function() {
        if (timeLeft > 1) {
            timeDisplay.text(`${timeLeft} seconds remaining`);
            timeLeft--;
        } else if (timeLeft === 1) {
            timeDisplay.text(`${timeLeft} second remaining`);
            timeLeft--;
        } else {
            timeDisplay.text("Time's up!");
            timeSymbol.text("timer_off")
            clearInterval(quizInterval);
            endQuiz();
        }
    }, 1000)
}

function updateScore() {
    $("#score").text(`Score: ${score}`);
}

function resetQuiz() {
    timeLeft = 60;
    score = 0;
    currentQuestion = 0;
    goToScreen(startScreen);
}

function startQuiz() {
    timeLeft = 60;
    score = 0;
    currentQuestion = 0;
    goToScreen(questionScreen)
    createQuestion();
    startTimer();
    updateScore();
}

function goToScreen(screen) {
    $("#main-screen .screen").remove();
    mainScreen.prepend(screen)
}

function clearQuestion() {
    $("#title").text(" ");
    $("#question").text(" ");
    $("#answers").empty();
}

function endQuiz() {
    clearQuestion();
    goToScreen(endScreen);
    $("#final-score").text(`Score: ${score}`);
}

function nextQuestion() {
    if (currentQuestion < 4) {
        currentQuestion++;
    } else {
        clearInterval(quizInterval);
        endQuiz();
    }
    createQuestion();
}

function showFeedback(message) {
    $("#feedback").text(message);
    let feedbackTimer = setInterval(function() {
        $("#feedback").text(" ");
        clearInterval(feedbackTimer);
    }, 2000)
}

function correctAns() {
    score += 10;
    updateScore();
    showFeedback("Correct!");
    nextQuestion();
}

function wrongAns() {
    timeLeft -= 10;
    score -= 10;
    updateScore();
    showFeedback("Wrong!");
    nextQuestion();
}

function updateScoreboard() {
    if ($("#text-input").val()) {
        localStorage.setItem($("#text-input").val(), JSON.stringify(score));
    }
    goToScreen(scoreboard);
    for (let i = 0; i < localStorage.length; i++) {
        mainScreen.find("#score-list").append(listItem);
        mainScreen.find(".initials-scoreboard:last").text(`${localStorage.key(i)}`);
        mainScreen.find(".score-scoreboard:last").text(`${localStorage.getItem(localStorage.key(i))}`);
    }
}

resetQuiz();
$(document).on("click", "#start-btn", startQuiz);
$(document).on("click", ".incorrect", wrongAns);
$(document).on("click", ".correct", correctAns);
$(document).on("click", "#reset-button", resetQuiz);
$(document).on("click", "#scoreboard-btn", updateScoreboard);