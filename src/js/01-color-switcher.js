const body = document.body;
const startBtnRef = document.querySelector("button[data-start]");
const stopBtnRef = document.querySelector("button[data-stop]");
let timerId = null;

startBtnRef.addEventListener("click", onClickStartBtn);
stopBtnRef.addEventListener("click", onClickStopBtn);

function onClickStartBtn () {
  timerId = setInterval (() => {
    body.style.backgroundColor = getRandomHexColor()
  }, 1000);
  stopBtnRef.removeAttribute("disabled");
  startBtnRef.setAttribute("disabled", "true");
}

function onClickStopBtn () {
clearInterval(timerId);
startBtnRef.removeAttribute("disabled");
stopBtnRef.setAttribute("disabled", "true");
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
