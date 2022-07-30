import {showMessageError} from './util.js';
import { photosFilters } from './main.js';

const DATA_GET = 'https://26.javascript.pages.academy/kekstagram/data';
const DATA_POST = 'https://26.javascript.pages.academy/kekstagram';
const showMessage = 'Отсутствует соединение с сервером, попробуйте позже...';

const getData = () => {
  fetch(DATA_GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error;
    })
    .then((photos) => {
      photosFilters(photos);
    })
    .catch(() => {
      showMessageError(showMessage);
    });
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
