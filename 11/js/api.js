import {showMessageError} from './util.js';
import {changeFilters} from './sorting.js';

const dataReceivingAddress = 'https://26.javascript.pages.academy/kekstagram/data';
const dataSendingAddress = 'https://26.javascript.pages.academy/kekstagram';
const filters = document.querySelector('.img-filters');

function getData(onSuccess) {
  fetch(dataReceivingAddress)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error;
    })
    .then((photos) => {
      onSuccess(photos);
      filters.style.opacity = '1';
      changeFilters(photos);
    })
    .catch(() => {
      showMessageError('Отсутствует соединение с сервером, попробуйте позже...');
    });
}

function sendData(onSuccess, onFail, body) {
  fetch(dataSendingAddress,
    {
      method: 'POST',
      body,
    },)
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
}

export { getData, sendData };
