import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector("form");

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    setTimeout (() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}

function onClick (event) {
  event.preventDefault();
  let delay = Number(document.querySelectorAll("input")[0].value);
  const step = Number(document.querySelectorAll("input")[1].value);
  const amount = Number(document.querySelectorAll("input")[2].value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise (i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
      delay += step;
  };
    form.reset();
};

form.addEventListener("submit", onClick );