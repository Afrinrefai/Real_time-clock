// THEME TOGGLE
const btn = document.getElementById("toggle");
const body = document.body;
btn.addEventListener("click", () => {
    body.classList.toggle("dark");
    btn.textContent = body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
});

// LIVE CLOCK
function startLiveClock() {
    const clock = document.getElementById("live-clock");
    setInterval(() => {
        clock.textContent = new Date().toLocaleTimeString();
    }, 1000);
}
startLiveClock();

// STOPWATCH
const swDisplay = document.getElementById("sw-display");
let swTime = 0, swInterval;
document.getElementById("sw-start").addEventListener("click", () => {
    clearInterval(swInterval);
    swInterval = setInterval(() => swDisplay.textContent = formatTime(swTime++), 1000);
});
document.getElementById("sw-pause").addEventListener("click", () => clearInterval(swInterval));
document.getElementById("sw-reset").addEventListener("click", () => {
    clearInterval(swInterval); swTime = 0; swDisplay.textContent = "00:00:00";
});

const cdDisplay = document.getElementById("cd-display");
let cdTime = 0, cdInterval;

function formatTime(t){
    let h = String(Math.floor(t/3600)).padStart(2,"0");
    let m = String(Math.floor((t%3600)/60)).padStart(2,"0");
    let s = String(t%60).padStart(2,"0");
    return `${h}:${m}:${s}`;
}

document.getElementById("cd-start").addEventListener("click", ()=>{
    if(cdTime === 0){
        const h = +document.getElementById("cd-h").value || 0;
        const m = +document.getElementById("cd-m").value || 0;
        const s = +document.getElementById("cd-s").value || 0;
        cdTime = h*3600 + m*60 + s;
        if(cdTime === 0) return; // Do nothing if all fields are 0
    }

    clearInterval(cdInterval);
    cdInterval = setInterval(() => {
        cdDisplay.textContent = formatTime(cdTime); // show current time
        if(cdTime <= 0){
            clearInterval(cdInterval);
            cdDisplay.textContent = "Time's up!";
            return;
        }
        cdTime--; // decrement after displaying
    }, 1000);
});

document.getElementById("cd-pause").addEventListener("click", () => clearInterval(cdInterval));

document.getElementById("cd-reset").addEventListener("click", () => {
    clearInterval(cdInterval);
    cdTime = 0;
    cdDisplay.textContent = "00:00:00";
    document.getElementById("cd-h").value = "";
    document.getElementById("cd-m").value = "";
    document.getElementById("cd-s").value = "";
});