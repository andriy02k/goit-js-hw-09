import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');
const inputDelay = document.querySelector("input[name='delay']");
const inputStep = document.querySelector("input[name='step']");
const inputAmount = document.querySelector("input[name='amount']");

form.addEventListener('submit', handlerSubmit);

function createPromise(position, delay) {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({position, delay});
      } else {
        rej({position, delay});
      };
    }, delay);
  });
  return promise;
};

function handlerSubmit(evt) {
  evt.preventDefault();

  let amountVal = Number(inputAmount.value);
  let delayVal = Number(inputDelay.value);
  let stepVal = Number(inputStep.value);

  for (let i = 1; i <= amountVal; i++){
    createPromise(i, delayVal)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  })
  delayVal += stepVal;
  };
  evt.currentTarget.reset();
};

