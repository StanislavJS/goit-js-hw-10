import 'flatpickr/dist/flatpickr.min.css';

import 'izitoast/dist/css/iziToast.min.css';


export const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
export const daysElement = document.querySelector('[data-days]');
export const hoursElement = document.querySelector('[data-hours]');
export const minutesElement = document.querySelector('[data-minutes]');
export const secondsElement = document.querySelector('[data-seconds]');

startButton.disabled = true;

export let selectedDate = null;
export let countdownInterval = null;

