let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let interval;
let laps = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);


function startStopwatch() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateDisplay, 10); 
    isRunning = true;
  }
}

function pauseStopwatch() {
  if (isRunning) {
    clearInterval(interval);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
}

function resetStopwatch() {
  clearInterval(interval);
  isRunning = false;
  startTime = 0;
  elapsedTime = 0;
  laps = [];
  display.textContent = '00:00:00.00';
  lapsList.innerHTML = ''; 
}

function recordLap() {
  if (isRunning) {
    const currentLapTime = elapsedTime = Date.now() - startTime;
    const lapTimeFormatted = formatTime(currentLapTime);
    laps.push(lapTimeFormatted);

    const li = document.createElement('li');
    li.textContent = `Lap ${laps.length}: ${lapTimeFormatted}`;
    lapsList.appendChild(li);
  }
}

function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(number, digits = 2) {
  return number.toString().padStart(digits, '0');
}
