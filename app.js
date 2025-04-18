const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const stopBtn = document.querySelector('.btn-stop'); // Tombol Stop
const session = document.querySelector('.minutes');
let myInterval;
let breakInterval;
let state = true;
let isOnBreak = false;

const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent);

    if (state) {
        state = false;
        let totalSeconds = sessionAmount * 60;

        const updateSeconds = () => {
            const minuteDiv = document.querySelector('.minutes');
            const secondDiv = document.querySelector('.seconds');

            totalSeconds--;

            let minutesLeft = Math.floor(totalSeconds / 60);
            let secondsLeft = totalSeconds % 60;

            if (secondsLeft < 10) {
                secondDiv.textContent = '0' + secondsLeft;
            } else {
                secondDiv.textContent = secondsLeft;
            }
            minuteDiv.textContent = `${minutesLeft}`;

            if (minutesLeft === 0 && secondsLeft === 0) {
                bells.play();
                clearInterval(myInterval);
                startBreak(); // Mulai break setelah sesi selesai
            }
        };

        myInterval = setInterval(updateSeconds, 1000);
    } else {
        alert('Session has already started.');
    }
};

const startBreak = () => {
    isOnBreak = true;
    let breakTime = 5 * 60; // 5 menit break
    const breakUpdate = () => {
        const minuteDiv = document.querySelector('.minutes');
        const secondDiv = document.querySelector('.seconds');

        breakTime--;

        let minutesLeft = Math.floor(breakTime / 60);
        let secondsLeft = breakTime % 60;

        if (secondsLeft < 10) {
            secondDiv.textContent = '0' + secondsLeft;
        } else {
            secondDiv.textContent = secondsLeft;
        }
        minuteDiv.textContent = `${minutesLeft}`;

        if (minutesLeft === 0 && secondsLeft === 0) {
            bells.play();
            clearInterval(breakInterval);
            alert('Break is over!');
            isOnBreak = false;
        }
    };
    breakInterval = setInterval(breakUpdate, 1000);
};

const stopTimer = () => {
    if (!state) {
        clearInterval(myInterval);
        clearInterval(breakInterval);
        alert('Session stopped');
        state = true;
        isOnBreak = false;
    }
};

startBtn.addEventListener('click', appTimer);
stopBtn.addEventListener('click', stopTimer); // Event listener untuk tombol Stop