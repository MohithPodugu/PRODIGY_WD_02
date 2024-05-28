let startTime;
let updatedTime;
let difference = 0; // Initialize difference
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimes = document.getElementById('lapTimes');

function start() {
  if (!running) {
    startTime = new Date().getTime() - difference;
    tInterval = setInterval(getShowTime, 1000); // Update every second
    running = true;
    startButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
  }
}

function pause() {
  if (running) {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    running = false;
    startButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
  }
}

function reset() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  display.innerHTML = '00:00:00';
  lapTimes.innerHTML = '';
  startButton.style.display = 'inline-block';
  pauseButton.style.display = 'none';
}

function lap() {
  if (running) {
    lapCounter++;
    const lapTime = document.createElement('li');
    lapTime.textContent = `Lap ${lapCounter}: ${display.innerHTML}`;
    lapTimes.appendChild(lapTime);
  }
}

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  display.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
