const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"), 
    },
    values: {
        timeId: null,
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,

        lives: 3,
    },
    actions: {
        timerId: null,
        countDownTimerId: null,
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;


    if (state.values.currentTime <= 0) {
        state.values.lives--; 
        state.view.lives.textContent = state.values.lives; 
        resetTime(); 
        if (state.values.lives <= 0) {
            clearInterval(state.actions.countDownTimerId);
            clearInterval(state.actions.timerId);
            alert("Game Over! Você perdeu todas as vidas. Seu resultado final foi: " + state.values.result);
        } else {
            alert("Você perdeu uma vida! Restam " + state.values.lives + " vidas.");
        }
    }
}
function resetTime() {
    state.values.currentTime = 60;
    state.view.timeLeft.textContent = state.values.currentTime;
}


function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * state.view.squares.length);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        });
    });
}

function initialize() {
    moveEnemy();
    addListenerHitBox();
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    state.view.lives.textContent = state.values.lives;
}

initialize();