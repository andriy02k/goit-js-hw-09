const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener("click", handlerClick);
stopBtn.addEventListener("click", handlerClickStop);

let timerId;

function handlerClick(e) {
    e.target.disabled = true;
    document.body.style.backgroundColor = getRandomHexColor();

    timerId = setInterval(() => {
    // e.target.disabled = true;
    document.body.style.backgroundColor = getRandomHexColor();
}, 1000)
};

function handlerClickStop(){
    startBtn.disabled = false;
    clearInterval(timerId);
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
// console.log(stopBtn);