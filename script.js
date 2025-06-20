let mode = "stopwatch";
let timer = null;
let time = 0;
let isRunning = false;

const display = document.getElementById("display");
const timerInputs = document.getElementById("timerInputs");
const hrInput = document.getElementById("hrInput");
const minInput = document.getElementById("minInput");
const secInput = document.getElementById("secInput");
const modeLabel = document.getElementById("modeLabel");

function timeUpdate() {
    const hours = parseInt(hrInput.value) || 0;
    const mins = parseInt(minInput.value) || 0;
    const secs = parseInt(secInput.value) || 0;
    time = hours * 3600 + mins * 60 + secs;
    updateDisplay();
}

function switchMode() {
    reset();
    if (mode === "stopwatch") {
        mode = "timer";
        timerInputs.classList.remove("hidden");
        modeLabel.innerText = "Таймер";
        timeUpdate()
    } else {
        mode = "stopwatch";
        timerInputs.classList.add("hidden");
        modeLabel.innerText = "Секундомер";
        time = 0;
        updateDisplay();
    }
}

function start() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        return;
    }

    isRunning = true;

    if (mode === "timer") {
        timer = setInterval(() => {
            console.log(time);
            time--;
            if (time <= 0) {
                clearInterval(timer);
                isRunning = false;
                alert("Время вышло!");
            }
            updateDisplay();
        }, 1000);
    }

    if (mode === "stopwatch") {
        timer = setInterval(() => { 
            console.log(time);
            time++;
            updateDisplay();
        }, 1000);
    }
    
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    time = 0;
    updateDisplay();
    
}

function updateDisplay() {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    display.innerText = `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

function pad(n) {
    return n.toString().padStart(2, "0");
}