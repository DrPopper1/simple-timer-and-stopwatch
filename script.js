let mode = "stopwatch"; // или "timer"
let timer = null;
let time = 0;
let isRunning = false;

const display = document.getElementById("display");
const timerInputs = document.getElementById("timerInputs");
const minInput = document.getElementById("minInput");
const secInput = document.getElementById("secInput");
const modeLabel = document.getElementById("modeLabel");

function timeUpdate() {
    const mins = parseInt(minInput.value) || 0;
    const secs = parseInt(secInput.value) || 0;
    time = mins * 60 + secs;
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
        return
    }

    if (mode === "timer") {
        const mins = parseInt(minInput.value) || 0;
        const secs = parseInt(secInput.value) || 0;
        time = mins * 60 + secs;
        if (time <= 0) return;
    }

    isRunning = true;
    updateDisplay();
    timer = setInterval(() => {
        if (mode === "stopwatch") {
            time++;
            updateDisplay();
        } else {
            time--;
            if (time <= 0) {
            clearInterval(timer);
            isRunning = false;
            alert("Время вышло!");
            }
            updateDisplay();
        }
    }, 1000);
    
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