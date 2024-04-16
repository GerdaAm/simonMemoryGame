let buttons = ['green', 'red', 'yellow', 'blue'];
let gameSeq = [];
let playerSeq = [];

var started = false;

document.querySelector('h1').addEventListener('click', function () {
    if (!started) {
        setTimeout(buildGameSeq, 500);
        started = true;
    }
});

for (button of buttons) {
    let buttonColor = this.button;
    document
        .querySelector(`#${buttonColor}`)
        .addEventListener('click', function () {
            soundButton(buttonColor);
            animateButton(buttonColor);
            playerSeq.push(buttonColor);
            checkAnswer(playerSeq.length - 1);
        });
}

function setHeading(message) {
    let heading = document.querySelector('h1');
    heading.innerHTML = message;
}

function soundButton(btn) {
    soundName = `./sounds/${btn}.mp3`;
    let sound = new Audio(soundName);
    sound.play();
}

function animateButton(btn) {
    let activeBtn = document.querySelector(`#${btn}`);
    activeBtn.classList.add('pressed');
    setTimeout(() => {
        activeBtn.classList.remove('pressed');
    }, 100);
}

function buildGameSeq() {
    playerSeq = [];
    let randomChoice = Math.floor(Math.random() * buttons.length);
    gameSeq.push(buttons[randomChoice]);
    let gameSeqActive = gameSeq[gameSeq.length - 1];
    setHeading(`Level ${gameSeq.length}`);
    soundButton(gameSeqActive);
    animateButton(gameSeqActive);
}

function checkAnswer(currentLevelStep) {
    if (playerSeq[currentLevelStep] === gameSeq[currentLevelStep]) {
        if (playerSeq.length === gameSeq.length) {
            setTimeout(buildGameSeq, 1000);
        }
    } else {
        setHeading('Game Over! Click here to start.');
        document.body.classList.add('game-over');
        setTimeout(() => {
            document.body.classList.remove('game-over');
        }, 200);
        soundButton('wrong');
        gameSeq = [];
        started = false;
    }
}
