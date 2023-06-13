const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    blinkButton(randomChosenColour);
    playSound(randomChosenColour);
    level++;
    $("#level-title").html("Level " + level);
}

function blinkButton(colour) {
    $("#" + colour)
        .animate({ opacity: "0%" }, 200)
        .animate({ opacity: "100%" }, 200);
}

function animatePress(colour) {
    $("#" + colour).addClass("pressed");
    setTimeout(() => { $("#" + colour).removeClass("pressed") }, 100);
}

function playSound(colour) {
    let sound = new Audio("./sounds/" + colour + ".mp3");
    sound.play();
}

function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => { $("body").removeClass("game-over") }, 200)
    $("#level-title").html("Game Over!<br>Press Any Key to Restart");
    startOver();
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
}

function buttonHandler(userChosenColour) {
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
}

// Event listener: User button click
$(".btn").on("click", (event) => {
    let userChosenColour = event.target.id;
    buttonHandler(userChosenColour);
});

// Game initialization
$(document).on("keydown", (event) => {
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();
    } else {
        switch (event.key) {
            case "s":
                buttonHandler("green");
                break;
            case "k":
                buttonHandler("red");
                break;
            case "x":
                buttonHandler("yellow");
                break;
            case "m":
                buttonHandler("blue");
                break;
            default:
                console.log(event.key)
                break;
        }
    }
});

// Game progress check
function checkAnswer(currentLevel) {
    let isCorrect = gamePattern[currentLevel] == userClickedPattern[currentLevel];
    if (!isCorrect) {
        gameOver();
        return;
    }
    if (userClickedPattern.length == gamePattern.length) {
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
    }
}