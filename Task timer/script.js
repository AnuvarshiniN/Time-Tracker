let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;
let isTimerRunning = false;

function toggleTimer() {
  const timerButton = document.getElementById('timerButton');

  if (isTimerRunning) {
    stopTimer();
    timerButton.innerText = 'Start';
    enableInputs();
    recordTask();
    resetTimer();
    timerButton.classList.remove('stop');
  } else {
    startTimer();
    timerButton.innerText = 'Stop';
    disableInputs();
    timerButton.classList.add('stop');
  }

  isTimerRunning = !isTimerRunning;
}

function startTimer() {
  timerInterval = setInterval(updateTimer, 100);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }

  const formattedTime = padNumber(hours) + ':' + padNumber(minutes) + ':' + padNumber(seconds);
  
  document.getElementById('timer').innerText = formattedTime;
}

function padNumber(num) {
  return num.toString().padStart(2, '0');
}

function disableInputs() {
  document.getElementById('taskInput').disabled = true;
  document.getElementById('destinationInput').disabled = true;
}

function enableInputs() {
  document.getElementById('taskInput').disabled = false;
  document.getElementById('destinationInput').disabled = false;
}

function recordTask() {
  const task = document.getElementById('taskInput').value;
  const destination = document.getElementById('destinationInput').value;
  const totalTime = padNumber(hours) + ':' + padNumber(minutes) + ':' + padNumber(seconds);

  const tableBody = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
  const newRow = tableBody.insertRow(tableBody.rows.length);
  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);
  cell1.innerHTML = task;
  cell2.innerHTML = destination;
  cell3.innerHTML = totalTime;
}

function resetTimer() {
  seconds = 0;
  minutes = 0;
  hours = 0;
  document.getElementById('timer').innerText = '00:00:00';
  document.getElementById('taskInput').value = '';
  document.getElementById('destinationInput').value = '';
}

