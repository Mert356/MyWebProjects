const pomodoro = document.getElementById("pomodoro");
const shortBreak = document.getElementById("shortBreak");
const longBreak = document.getElementById("longBreak");

const start = document.getElementById("start");
const skipButton = document.getElementById("skip");
const hourContainer = document.getElementsByClassName("hourContainer")[0];
const hour = document.getElementById("hour");
const topButtons = document.getElementsByClassName("topButtons");
const writing = document.getElementById("writing");
let newInterval;

let currentStage = "pomodoro";

function formatTime(minutes, seconds) {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
function resetButton(){
    start.textContent = "Start";
    skipButton.style.display = "none";
    clearInterval(newInterval);
}

function pomodoroReset() {
    hour.textContent = "25:00";
    document.body.style.backgroundColor = "var(--primary-color)";
    start.style.color = "var(--primary-color)";
    currentStage = "pomodoro";
    writing.textContent = "Time to focus!";
    resetButton();
}
pomodoro.addEventListener("click", pomodoroReset);

function shortBreakReset() {
    hour.textContent = "05:00";
    document.body.style.backgroundColor = "var(--secondary-color)";
    start.style.color = "var(--secondary-color)";
    currentStage = "shortBreak";
    writing.textContent = "Time for a break!";
    resetButton();
}
shortBreak.addEventListener("click", shortBreakReset);

function longBreakReset() {
    hour.textContent = "15:00";
    document.body.style.backgroundColor = "var(--third-color)";
    start.style.color = "var(--third-color)";
    currentStage = "longBreak";
    writing.textContent = "Time for a break!";
    resetButton();
}
longBreak.addEventListener("click", longBreakReset);

start.addEventListener("click", () => {
    if(start.textContent == "Start") {
        start.textContent = "Pause";
        skipButton.style.display = "block";

        newInterval = setInterval(() => {
            let time = hour.textContent.split(":");
            let minutes = parseInt(time[0]);
            let seconds = parseInt(time[1]);
            seconds--;

            if (seconds < 0) {
                seconds = 59;
                minutes--;
            }

            if (minutes < 0) {
                clearInterval(newInterval);
                start.textContent = "Start";
                skipButton.style.display = "none";
            } else {
                hour.textContent = formatTime(minutes, seconds);
            }
        }, 1000);

    } else {
        start.textContent = "Start";
        skipButton.style.display = "none";
        clearInterval(newInterval);
    }
});

skipButton.addEventListener("click", () => {
    if(currentStage == "pomodoro") {
        shortBreakReset();
    } else if (currentStage == "shortBreak") {
        longBreakReset();
    } else if (currentStage == "longBreak") {
        pomodoroReset();
    }
});
