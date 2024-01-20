let hour = 0;
let minute = 0;
let second = 0;
let interval;
let isCountdown = false;

function updateDisplay() {
    document.getElementById("hours").textContent = hour.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minute.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = second.toString().padStart(2, '0');
    
    // Update break time only if not in countdown mode
    if (!isCountdown) {
        let breakTime = Math.floor(((hour * 60) + minute) / 5);
        document.getElementById("breakTime").textContent = breakTime;
    }

    // Check if countdown has ended
    if (isCountdown && hour === 0 && minute === 0 && second === 0) {
        clearInterval(interval);
        interval = null; // Reset the interval variable
        alert("Time's up!");
        isCountdown = false;
        resetTimer(); // Reset the timer after countdown
    }
}

document.getElementById("startButton").addEventListener("click", function() {
    if (!interval) {
        isCountdown = false;
        interval = setInterval(function() {
            second++;
            if (second >= 60) {
                second = 0;
                minute++;
            }
            if (minute >= 60) {
                minute = 0;
                hour++;
            }
            updateDisplay();
        }, 1000);
    }
});

document.getElementById("stopButton").addEventListener("click", function() {
    clearInterval(interval);
    interval = null;
});

document.getElementById("resetButton").addEventListener("click", function() {
    resetTimer();
});

function resetTimer() {
    clearInterval(interval);
    interval = null;
    hour = 0;
    minute = 0;
    second = 0;
    isCountdown = false;
    updateDisplay();
}

document.getElementById("breakTime").addEventListener("click", function() {
    if (!isCountdown) {
        let breakTimeMinutes = parseInt(document.getElementById("breakTime").textContent);
        hour = Math.floor(breakTimeMinutes / 60);
        minute = breakTimeMinutes % 60;
        second = 0;
        isCountdown = true;
        startCountdown();
    }
});

function startCountdown() {
    clearInterval(interval);
    interval = setInterval(function() {
        if (second > 0 || minute > 0 || hour > 0) {
            if (second === 0) {
                second = 59;
                if (minute > 0) {
                    minute--;
                } else if (hour > 0) {
                    minute = 59;
                    hour--;
                }
            } else {
                second--;
            }
        }
        updateDisplay();
    }, 1000);
}

updateDisplay();
