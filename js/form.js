import { isEscapeKey } from './util.js';
import { resetForm } from './validate.js';
import { addScaleListener, removeScaleListener } from './scale.js';
import { onEffectChange } from './filters.js';

const uploadFileElement = document.querySelector('#upload-file');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFormCloseElement = document.querySelector('.img-upload__cancel');
const textHashtagsElement = document.querySelector('.text__hashtags');
const textareaDescriptionElement = document.querySelector('.text__description');
const effectsListElement = document.querySelector('.effects__list');

const isFocused = () => (document.activeElement === textareaDescriptionElement || document.activeElement === textHashtagsElement
);

const onUploadFieldClose = () => {
  resetForm();
  document.body.classList.remove('modal-open');
  uploadFormElement.reset();
  uploadFormCloseElement.removeEventListener('click', () => onUploadFieldClose());
  effectsListElement.removeEventListener('change', onEffectChange);

  removeScaleListener();
};

const onUploadFieldClickEsc = (evt) => {
  if (isEscapeKey(evt) && !isFocused()) {
    evt.preventDefault();
    onUploadFieldClose();
  }
  document.removeEventListener('keydown', onUploadFieldClickEsc);
};

const onUploadFieldOpen = () => {
  uploadOverlayElement.classList.remove ('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.scale__control--value').value = '100%';

  document.addEventListener('keydown', onUploadFieldClickEsc);
  addScaleListener();
};

uploadFileElement.addEventListener('change', () => onUploadFieldOpen());

uploadFormCloseElement.addEventListener('click', () => onUploadFieldClose());
