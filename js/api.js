import { showMessageError } from './util.js';

const DATA_GET = 'https://26.javascript.pages.academy/kekstagram/data';
const DATA_POST = 'https://26.javascript.pages.academy/kekstagram';
const ERROR_MESSAGE = 'Отсутствует соединение с сервером, попробуйте позже...';

const getData = (onSuccess) => {
  fetch(DATA_GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(ERROR_MESSAGE);
    })
    .then(onSuccess)
    .catch((error) => showMessageError(error.message) );
};

const sendData = (onSuccess, onFail, body) => {
  fetch(DATA_POST,
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
};

export { getData, sendData };
