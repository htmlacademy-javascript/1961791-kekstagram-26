import './data.js';
import { createThumbnail } from './thumbnail.js';
import { openModalWindow } from './big-photo.js';
import './api.js';
import './form.js';
import './validate.js';
import './scale.js';
import './filters.js';
import './messages.js';
import { getData } from './api.js';
import './sorting.js';
import './choose-photo.js';

// createThumbnail(thumbnail);
getData(createThumbnail);
const container = document.querySelector('.pictures');
container.addEventListener('click', openModalWindow);
