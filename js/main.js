import { createThumbnail } from './thumbnail.js';
import { onModalWindowOpen } from './big-photo.js';
import './api.js';
import './form.js';
import './filters.js';
import { getData } from './api.js';
import './choose-photo.js';
import { changeFilters } from './sorting.js';

export let data = [];

export const photosFilters = (photos) => {
  data = photos;
  createThumbnail(photos);
  changeFilters(photos);
};

getData();
const containerElement = document.querySelector('.pictures');
containerElement.addEventListener('click', onModalWindowOpen);
