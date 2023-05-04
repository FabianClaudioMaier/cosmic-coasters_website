const launchDate = new Date("2023-07-01T00:00:00").getTime();
const countdownEl = document.getElementById("countdown");

function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.innerHTML = `
        <div class="col-auto">
            <div class="bg-primary text-white rounded p-3">
                <h1 class="countdown-value">${days}</h1>
                <h6 class="countdown-label">Days</h6>
            </div>
        </div>
        <div class="col-auto">
            <div class="bg-success text-white rounded p-3">
                <h1 class="countdown-value">${hours}</h1>
                <h6 class="countdown-label">Hours</h6>
            </div>
        </div>
        <div class="col-auto">
            <div class="bg-warning text-dark rounded p-3">
                <h1 class="countdown-value">${minutes}</h1>
                <h6 class="countdown-label">Minutes</h6>
            </div>
        </div>
        <div class="col-auto">
            <div class="bg-danger text-white rounded p-3">
                <h1 class="countdown-value">${seconds}</h1>
                <h6 class="countdown-label">Seconds</h6>
            </div>
        </div>
    `;

    if (distance < 0) {
        clearInterval(countdownInterval);
        countdownEl.innerHTML = "<h4>Rocket Launched!</h4>";
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();
