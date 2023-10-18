import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btn = document.querySelector('[data-start]');
const input = document.querySelector("#datetime-picker");
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let timerId;

btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0].getTime() <= options.defaultDate.getTime()) {
          btn.disabled = true;
        Notify.failure('Please choose a date in the future');
        return;
        } else {
        btn.disabled = false;
      };
  },
};

flatpickr(input, options);
btn.addEventListener("click", handlerClick);

function handlerClick (){
  timerId = setInterval(() => {
  updateTimer();

    if (days.textContent === "00" && hours.textContent === "00" && minutes.textContent === "00" && seconds.textContent === "00") {
      clearInterval(timerId);
      btn.disabled = false;
    }
  }, 1000);


  btn.disabled = true;
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer() {
  const selectedDate = new Date(input.value);
  const diffOfTime = selectedDate.getTime() - Date.now();
  
  const result = convertMs(diffOfTime);
  days.textContent = String(result.days).padStart(2, 0);
  hours.textContent = String(result.hours).padStart(2, 0);
  minutes.textContent = String(result.minutes).padStart(2, 0);
  seconds.textContent = String(result.seconds).padStart(2, 0);
}

// function addLeadingZero(value) {
//   return value < 10 ? `0${value}` : value;
// }