let timeLeft = 1;
let score = 0;
let currentQuestion = 0;
let highScore = {};

// Screens
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

function createQuestion() {
    $("#title").text(`Question ${questions[currentQuestion].num}`);
    $("#question").text(questions[currentQuestion].question);

    let answerContainer = $("#answers");
    for (let i = 0; i < questions[currentQuestion].answers.length; i++) {
        let answerChoice = $("<button>").attr("id", `${i}`).attr("class", "btn btn-primary bg-info ans-choice w-auto text-nowrap").text(`${i + 1}. ${questions[currentQuestion].answers[i]}`);
        if(i === questions[currentQuestion].correct) {
            answerChoice.attr("id", "correct");
        } else {
            answerChoice.attr("id", "incorrect");
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
            endQuiz();
        }
    }, 1000)
}

function updateScore() {
    let scoreSymbol = $("<span>").attr("class", "material-symbols-outlined").text("scoreboard");
    let scoreDisplay = $("<p>").attr("id", "score").attr("class", "ml-2").text(`Score: ${score}`);
    $("#scoreContainer").append(scoreSymbol).append(scoreDisplay);
}

function resetQuiz(screen)  {
    timeLeft = 60;
    score = 0;
    currentQuestion = 0;
    hideScreen(screen);
    $("#main-screen").prepend($("#startScreen"));
}

function startQuiz() {
    hideScreen("#start-screen");
    createQuestion();
    startTimer();
    updateScore();
}

function hideScreen(screen) {
    $(screen).attr("class", "d-none");
}

function showScreen(screen) {
    $(screen).removeAttr("class", "d-none");
}

function clearQuestion() {
    $("#title").text(" ");
    $("#question").text(" ");
    $("#answers").empty();
}

function endQuiz() {
    clearQuestion();
    showScreen("#end-screen");
    // prompt initials
    // save high score to local storage
}

function showScoreboard() {
    // remove end screen
    // show scoreboard
    // restart quiz button
    // display initials with score, ordered from highest to lowest
}

function nextQuestion() {
    if (currentQuestion < 5) {
        currentQuestion++;
    } else {
        clearInterval(startTimer);
    }
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

$("#start-btn").on("click", startQuiz);
// incorrect answer
// correct answer
// input initials
// go to scoreboard
// restart quiz




let startScreen = $("<section>").attr("id", "start-screen").attr("class", "align-items-center justify-content-center text-center p-5");
startScreen.append($("<section>").attr("class", "container"));
startScreen.children("section").append($())