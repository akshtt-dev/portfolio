const redirectcdn = document.getElementById('redirectCountdown');

let countdown = 5;
let countdownInterval = setInterval(() => {
    countdown--;
    redirectcdn.innerHTML = countdown;
    if (countdown === 0) {
        clearInterval(countdownInterval);
        window.location.href = '/';
    }
}, 1000);