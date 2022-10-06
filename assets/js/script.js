let timeLeft = 60;
let score = 0;
let currentQuestion = 0;
let highScore = {};

// Questions
let questions = [
    {
        "num": 1,
        "question": "Commonly used data types DO NOT include: ",
        "answers": ["Strings", "Booleans", "Alerts", "Numbers"],
        "correct": 2,
    },
    {
        "num": 2,
        "question": "Arrays in JavaScript can be used to store ______.",
        "answers": ["Numbers and strings", "Other arrays", "Booleans", "All of the above"],
        "correct": 3,
    },
    {
        "num": 3,
        "question": "The condition in an if/else statement is enclosed within: ",
        "answers": ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
        "correct": 2,
    },
    {
        "num": 4,
        "question": "String values must be enclosed within ______ when being assigned to variables.",
        "answers": ["Commas", "Curly brackets", "Quotes", "Parentheses"],
        "correct": 2,
    },
    {
        "num": 5,
        "question": "A very useful tool used during development and debugging for printing content to the debugger is: ",
        "answers": ["JavaScript", "Terminal/bash", "For loops", "console.log"],
        "correct": 3,
    }
];

// Screens
let mainScreen = $("#main-screen");

let startScreen = 
    `<section id="start-screen screen" class="align-items-center justify-content-center text-center p-5">
        <section  class="container">
            <h1>Coding Quiz Challenge</h1>
            <section class="container col-md-8 col-sm-12">
                <p>Answer the following questions to test your JavaScript knowledge! Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p>
            </section>
            <button id="start-btn" class="btn btn-primary bg-info">Start Quiz</button>
        </section>
    </section>`;

let questionScreen = 
    `<section id="question-screen screen" class="col-sm-10 col-md-8 col-lg-6 col-xl-4 align-items-center m-auto p-5">  
        <section class="container">
            <section class="d-flex justify-content-between">
                <section id="timerContainer" class="d-flex">
                </section>
                <section id="scoreContainer" class="d-flex mr-auto ml-3">
                </section>
            </section>
            <h3 id="title"></h3>
            <p id="question"></p>
            <section id="answers" class="p-0 text-left w-25">
            </section>
            <h3 id="feedback"></h3>
        </section>
    </section>`;

let endScreen = 
    `<section id="end-screen screen" class="col-4 m-auto text-center p-5">
        <h1>Your Results</h1>
        <section class="text-center">
            <p id="final-score">Score: </p>
            <section class="text-nowrap row align-items-baseline justify-content-center">
                <label>Your initials: </label>
                <input 
                type="text" 
                placeholder="AAA"
                class="col-sm-3 col-md-2 ml-2"
                > 
            </section>
        </section>                   
        <section class="m-1">
            <button class="btn btn-primary bg-info m-1">Submit Score</button>
            <button id="reset-button" class="btn btn-primary bg-info m-1">Reset Quiz</button>
        </section>
    </section>`;

let scoreboard = 
    `<section id="scoreboard screen" class="col-3 align-items-center justify-content-center text-center p-5 m-auto">
        <ol class="list-group">
        </ol>
    </section>`;

function createQuestion() {
    $("#title").text(`Question ${questions[currentQuestion].num}`);
    $("#question").text(questions[currentQuestion].question);

    let answerContainer = $("#answers");
    for (let i = 0; i < questions[currentQuestion].answers.length; i++) {
        let answerChoice = $("<button>").attr("id", `${i}`).attr("class", "btn btn-primary bg-info ans-choice w-auto text-nowrap").text(`${i + 1}. ${questions[currentQuestion].answers[i]}`);
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
    setInterval(function() {
        if (timeLeft > 1) {
            timeDisplay.text(`${timeLeft} seconds remaining`);
            timeLeft--;
        } else if (timeLeft === 1) {
            timeDisplay.text(`${timeLeft} second remaining`);
            timeLeft--;
        } else {
            timeDisplay.text("Time's up!");
            timeSymbol.text("timer_off")
            clearInterval(startTimer);
            console.log("timer Done!!!");
            endQuiz();
        }
    }, 1000)
}

function updateScore() {
    let scoreSymbol = $("<span>").attr("class", "material-symbols-outlined").text("scoreboard");
    let scoreDisplay = $("<p>").attr("id", "score").attr("class", "ml-2").text(`Score: ${score}`);
    $("#scoreContainer").append(scoreSymbol).append(scoreDisplay);
}

function resetQuiz() {
    timeLeft = 60;
    score = 0;
    currentQuestion = 0;
    goToScreen(startScreen)
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
    $("#screen").empty();
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
    // save high score and initials to local storage
}

function showScoreboard() {
    goToScreen(scoreboard);
    // restart quiz button
    // display initials with score, ordered from highest to lowest
}

function nextQuestion() {
    if (currentQuestion < 5) {
        currentQuestion++;
    } else {
        clearInterval(startTimer);
        endQuiz();
    }
    createQuestion();
}

function showFeedback(message) {
    let feedbackTimer = 3;
    setInterval(function() {
        if (timeLeft > 1) {
            $("#feedback").text(message);
            feedbackTimer--;
        } else {
            $("#feedback").text(" ")
            clearInterval(showFeedback);
        }
    }, 1000)
}

function correctAns() {
    score += 10;
    showFeedback("Correct!");
    nextQuestion();
}

function wrongAns() {
    timeLeft -= 10;
    score -= 10;
    showFeedback("Wrong!");
    nextQuestion();
}


resetQuiz();


$("#start-btn").on("click", startQuiz);
$(".incorrect").on("click", wrongAns);
$(".correct").on("click", correctAns);
$("#reset-button").on("click", resetQuiz);

console.log(mainScreen.text);