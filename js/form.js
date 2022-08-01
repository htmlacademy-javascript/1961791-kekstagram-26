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

const onCloseElementClick = () => {

  document.body.classList.remove('modal-open');
  uploadFormCloseElement.removeEventListener('click', onCloseElementClick);
  effectsListElement.removeEventListener('change', onEffectChange);
  resetForm();
  removeScaleListener();
};

const onDocumentEscKeydown  = (evt) => {
  if (isEscapeKey(evt) && !isFocused()) {
    evt.preventDefault();
    onCloseElementClick();
  }
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

const onUploadFieldChange = () => {
  uploadOverlayElement.classList.remove ('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.scale__control--value').value = '100%';

  document.addEventListener('keydown', onDocumentEscKeydown );
  uploadFormCloseElement.addEventListener('click', onUploadFieldChange);
  addScaleListener();
};

uploadFileElement.addEventListener('change', onUploadFieldChange);


