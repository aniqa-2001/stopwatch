// Select DOM elements

const hoursDisplay = document.querySelector(' .hours');
const minutesDisplay = document.querySelector(' .minutes');
const secondsDisplay = document.querySelector(' .seconds');
const millisecondsDisplay = document.querySelector(' .milli.seconds');

const startPauseBtn = document.querySelector('.startPauseBtn');
const splitBtn = document.querySelector('.splitBtn');
const resetBtn = document.querySelector('.resetBtn');
const logEntries = document.getElementById('logEntries');

// Timer variables

let timer = null;
let elapsedTime = 0;   // In milliseconds
let isRunning = false;

// Function to format time

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 100);

    return {
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        milliseconds: String(milliseconds),
    };
}

// Function to update the display

function updateDisplay() {
const time = formatTime(elapsedTime);

    hoursDisplay.textContent = `${time.hours}:`;
    minutesDisplay.textContent = `${time.minutes}:`;
    secondsDisplay.textContent = `${time.seconds}:`;
    millisecondsDisplay.textContent =  time.milliseconds;
}

// Function to start the stopwatch

function startStopwatch() {
    timer = setInterval(function() {
        elapsedTime += 100;    
        updateDisplay();     
    }, 100);
}


// Function to stop the stopwatch

function stopStopwatch() {
    clearInterval(timer);
}

// Event listener for Start/Pause button

startPauseBtn.addEventListener('click', function() {

    if (isRunning) {
        stopStopwatch();
        startPauseBtn.textContent = 'Start';
        startPauseBtn.classList.remove('active');
        startPauseBtn.style.backgroundColor = 'green';
        startPauseBtn.style.color = 'white';
        splitBtn.disabled = true;
        resetBtn.disabled = false;
        logEvent('Pause');

    } else {
        startStopwatch();
        startPauseBtn.textContent = 'Pause';
        startPauseBtn.classList.add('active');
        startPauseBtn.style.backgroundColor = 'pink';
        startPauseBtn.style.color = 'white';
        splitBtn.disabled = false;
        resetBtn.disabled = true;
    }

    isRunning = !isRunning;
});



// Event listener for Split button

splitBtn.addEventListener('click', function() {
    logEvent('Split');
     // Add the active class
     splitBtn.classList.add('active');
     splitBtn.style.backgroundColor = 'orange';

     splitBtn.style.color = 'white';

 });



// Event listener for Reset button

resetBtn.addEventListener('click', function() {
    stopStopwatch();
    elapsedTime = 0; // Reset elapsed time
    updateDisplay(); // Reset the display
    startPauseBtn.textContent = 'Start';
    splitBtn.disabled = true;
    resetBtn.disabled = true;
    isRunning = false;
    logEntries.innerHTML = ''; // Clear the log
    
    // Add the active class
    resetBtn.classList.add('active');
    resetBtn.style.backgroundColor = 'rgb(30, 105, 196';
    resetBtn.style.color = 'white';
    
});


// Function to log events
function logEvent(type) {
    const time = formatTime(elapsedTime);
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.textContent = `${type} at ${time.hours}:${time.minutes}:${time.seconds}:${time.milliseconds}`;
    logEntries.appendChild(logEntry);
}

