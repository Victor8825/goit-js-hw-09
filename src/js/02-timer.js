import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"
import "flatpickr/dist/themes/material_green.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";

Notify.init({
  width: "500px",
  timeout: 2000,
  clickToClose: true,
  position: "center-center",
  fontSize: "30px",
  cssAnimationStyle: "zoom"
})

const refs =  {
  inputField: document.querySelector("#datetime-picker"),
  startBtn: document.querySelector("button[data-start]"),
  timerWrap: document.querySelector(".timer"),
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};

refs.startBtn.setAttribute("disabled", "true");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function choosingDates(selectedDates) {
    selectedDates[0] < options.defaultDate
     ? Notify.warning("Please choose a date in the future!")
     : refs.startBtn.removeAttribute("disabled");
  },
};

const calendar = flatpickr(refs.inputField, options);

const timerCountdown = {
  intervalId: null,
  isActive: false,

  start () {
    if ( this.isActive ) {
      return;
    }
    const countDownTime = calendar.selectedDates[0].getTime();
    if ( countDownTime < new Date().getTime() ) {
      return;
    }
    
    this.isActive = true;
    this.intervalId = setInterval (() => {
      const currentTime = Date.now();
      const timeLeftMs = countDownTime - currentTime;
      const timeConverted = convertMs(timeLeftMs);
      updateClockFace(timeConverted);
      if ( (timeLeftMs / 1000).toFixed(0) <= 0 ) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }
}

refs.startBtn.addEventListener("click", timerCountdown.start );

function updateClockFace ({days, hours, minutes, seconds}) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function addLeadingZero (value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

