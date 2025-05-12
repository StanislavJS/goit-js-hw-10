import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';


import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';


const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');


startButton.disabled = true;

let selectedDate = null;
let countdownInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

  
    if (selectedDate <= new Date()) {
   
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topCenter',
      });

      startButton.disabled = true;
      return;
    }

    
    startButton.disabled = false;
  },
};


flatpickr(datetimePicker, options);


function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}


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


function updateTimerUI({ days, hours, minutes, seconds }) {

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}


function startCountdown() {

  if (countdownInterval) return;

  
  startButton.disabled = true;
  datetimePicker.disabled = true;

  
  iziToast.success({
    title: 'Success',
    message: 'Countdown timer started!',
    position: 'topRight',
    timeout: 3000,
  });

  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const remainingTime = selectedDate - currentTime;

  
    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      countdownInterval = null;
      updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });

   
      iziToast.info({
        title: 'Countdown completed',
        message: 'The countdown timer has reached zero!',
        position: 'topCenter',
        timeout: 5000,
      });

      
      datetimePicker.disabled = false;
      return;
    }

    const time = convertMs(remainingTime);
    updateTimerUI(time);
  }, 1000);
}


startButton.addEventListener('click', startCountdown);