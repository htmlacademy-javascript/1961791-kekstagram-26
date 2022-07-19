import { thumbnail } from './data.js';
import { createThumbnail } from './thumbnail.js';
import { openModalWindow } from './big-photo.js';
import './form.js';

createThumbnail(thumbnail);

const container = document.querySelector('.pictures');
container.addEventListener('click', openModalWindow);

const uploadFile = document.querySelector('#upload-file');

uploadFile.disabled = true;
