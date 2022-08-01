import { isEscapeKey } from './util.js';
import { resetForm } from './validate.js';
import { addScaleListener, removeScaleListener } from './scale.js';
import { onEffectChange } from './filters.js';

const uploadFileElement = document.querySelector('#upload-file');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadFormCloseElement = uploadOverlayElement.querySelector('#upload-cancel');
const effectsListElement = document.querySelector('.effects__list');

const onCloseElementClick = () => {

  document.body.classList.remove('modal-open');
  uploadFormCloseElement.removeEventListener('click', onCloseElementClick);
  effectsListElement.removeEventListener('change', onEffectChange);
  resetForm();
  removeScaleListener();
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

function onDocumentEscKeydown (evt) {
  if(isEscapeKey(evt)) {
    onCloseElementClick();
  }
}

const onUploadFieldChange = () => {
  uploadOverlayElement.classList.remove ('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.scale__control--value').value = '100%';

  document.addEventListener('keydown', onDocumentEscKeydown );
  uploadFormCloseElement.addEventListener('click', onCloseElementClick);
  addScaleListener();
};

uploadFileElement.addEventListener('change', onUploadFieldChange);

export { onDocumentEscKeydown };
