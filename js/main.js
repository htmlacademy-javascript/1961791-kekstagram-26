import { createThumbnail } from './thumbnails.js';
import { onModalWindowChange } from './big-photo.js';
import './api.js';
import './form.js';
import './filters.js';
import { getData } from './api.js';
import './choose-photo.js';
import { changeFilters } from './sorting.js';

export let data = [];

const showPhoto = (photos) => {
  data = photos;
  createThumbnail(photos);
  changeFilters(photos);
};

getData(showPhoto);
const containerElement = document.querySelector('.pictures');
containerElement.addEventListener('click', onModalWindowChange);
