let startTime, updatedTime, difference, tInterval;
let running = false;
let paused = false;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimes = document.getElementById('lapTimes');

function startTimer() {
  if (!running && !paused) {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    running = true;
    paused = false;
    startButton.innerHTML = "Stop";
    display.classList.remove('blink');
  } else if (!running && paused) {
    startTime = new Date().getTime() - difference;
    tInterval = setInterval(getShowTime, 1);
    running = true;
    paused = false;
    startButton.innerHTML = "Stop";
    pauseButton.innerHTML = "Pause";
    display.classList.remove('blink');
  }
}

function stopTimer() {
  if (running) {
    clearInterval(tInterval);
    running = false;
    paused = true;
    difference = new Date().getTime() - startTime;
    startButton.innerHTML = "Start";
    pauseButton.innerHTML = "Resume";
    display.classList.add('blink');
  }
}

function resetTimer() {
  clearInterval(tInterval);
  display.innerHTML = "00:00:00.000";
  running = false;
  paused = false;
  laps = [];
  lapTimes.innerHTML = '';
  startButton.innerHTML = "Start";
  pauseButton.innerHTML = "Pause";
  display.classList.remove('blink');
}

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((difference % 1000));

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;
  milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

  display.innerHTML = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

function addLap() {
  if (running || paused) {
    let lapTime = display.innerHTML;
    laps.push(lapTime);
    let lapElement = document.createElement('li');
    lapElement.innerText = lapTime;
    lapTimes.appendChild(lapElement);
    lapTimes.scrollTop = lapTimes.scrollHeight;
  }
}

startButton.addEventListener('click', function() {
  if (running) {
    stopTimer();
  } else {
    startTimer();
  }
});

pauseButton.addEventListener('click', function() {
  if (running) {
    stopTimer();
  } else if (paused) {
    startTimer();
  }
});

resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', addLap);
