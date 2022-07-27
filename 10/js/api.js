import {showMessageError} from './util.js';

const dataReceivingAddress = 'https://26.javascript.pages.academy/kekstagram/data';
const dataSendingAddress = 'https://26.javascript.pages.academy/kekstagram';

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
