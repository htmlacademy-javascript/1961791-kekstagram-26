import { isEscapeKey } from './util.js';

const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFormClose = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textareaDescription = document.querySelector('.text__description');

uploadFile.addEventListener('change', () => openUploadField());

uploadFormClose.addEventListener('click', () => closeUploadField());

const isFocused = () => (document.activeElement === textareaDescription || document.activeElement === textHashtags
);

function addKeydownEscHandler(evt) {
  if (isEscapeKey(evt) && !isFocused()) {
    evt.preventDefault();
    closeUploadField();
  }
}

function openUploadField() {
  uploadOverlay.classList.remove ('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', addKeydownEscHandler);
}

function closeUploadField() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', addKeydownEscHandler);

  uploadForm.reset();
}
