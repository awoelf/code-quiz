let startBtn = $("#start-btn");
let timeLeft = 60;
let score = 0;
let currentQuestion = 0;
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



function createQuestion(num, question, answers, correct) {
    $("#title").text(`Question ${num}`);
    $("#question").text(question);

    let answerContainer = $("#answers");
    for (let i = 0; i < answers.length; i++) {
        let answerChoice = $("<button>").attr("id", `${i}`).attr("class", "btn btn-primary bg-info ans-choice w-auto text-nowrap").text(`${i + 1}. ${answers[i]}`);
        if(i === correct) {
            answerChoice.attr("id", "correct");
        } else {
            answerChoice.attr("id", "incorrect");
        }
        answerContainer.append(answerChoice);
    };
};

function startTimer() {
    let timeSymbol = $("<span>").attr("class", "material-symbols-outlined").text("timer");
    let timeDisplay = $("<p>").attr("id", "time").attr("class", "ml-2").text("60 seconds remaining");
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
        }
    }, 1000)
}

function updateScore() {
    let scoreSymbol = $("<span>").attr("class", "material-symbols-outlined").text("scoreboard");
    let scoreDisplay = $("<p>").attr("id", "score").attr("class", "ml-2").text(`Score: ${score}`);
    $("#scoreContainer").append(scoreSymbol).append(scoreDisplay);
}

function resetQuiz()  {
    timeLeft = 60;
    score = 0;
    currentQuestion = 0;
    // return to start screen
}

function startQuiz() {
    $("#start").remove();
    $("#questionContainer").attr("style", "display: contents");
    createQuestion(questions[currentQuestion].num, questions[currentQuestion].question, questions[currentQuestion].answers, questions[currentQuestion].correct);
    startTimer();
    updateScore();
}

function endQuiz() {
    // remove question container
    // show end screen
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

function correctAns() {
    score += 10;
    // display feedback
    nextQuestion();
}

function wrongAns() {
    timeLeft -= 10;
    score -= 10;
    // display feedback
    nextQuestion();
}

startBtn.on("click", startQuiz);
// incorrect answer
// correct answer
// input initials
// go to scoreboard
// restart quiz




