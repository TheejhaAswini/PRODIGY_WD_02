let startTime;
let difference;
let tInterval;
let running = false;
let lapArray = [];

const display = document.querySelector('.display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimes = document.getElementById('lap-times');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(showTime, 1);
        startButton.style.display = 'none';
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        startButton.style.display = 'inline';
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    display.textContent = '00:00:00.00';
    difference = 0;
    lapArray = [];
    lapTimes.innerHTML = '';
    startButton.style.display = 'inline';
}

function lapTimer() {
    if (running) {
        const lapTime = display.textContent;
        lapArray.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapArray.length}: ${lapTime}`;
        lapTimes.appendChild(lapItem);
    }
}

function showTime() {
    const updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = String(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const seconds = String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, '0');
    const milliseconds = String(Math.floor((difference % 1000) / 10)).padStart(2, '0');

    display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);
