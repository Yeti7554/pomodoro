let hour = 0;
let minute = 25;
let second = 0;
let interval;

function updateDisplay() {
    document.getElementById("hours").textContent = hour.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minute.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = second.toString().padStart(2, '0');

    let breakTime = Math.floor(((hour * 60) + minute) / 5);
    document.getElementById("breakTime").textContent = breakTime;
}

document.getElementById("startButton").addEventListener("click", function() {
    if (!interval) {
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
    clearInterval(interval);
    interval = null;
    hour = 0;
    minute = 0;
    second = 0;
    updateDisplay();
});

updateDisplay();