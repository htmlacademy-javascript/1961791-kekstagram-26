import { sendData } from './api.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const MAX_COUNT_HASHTAGS = 5;
const REGULAR_EXPRESSION = /^#[A-Za-zA-Яа-яЁё0-9]+$/;

const textHashtagsElement = document.querySelector('.text__hashtags');
const textareaDescriptionElement = document.querySelector('.text__description');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const bodyElement = document.querySelector('body');
const uploadSubmitElement = document.querySelector('.img-upload__submit');
const uploadInputElement = document.querySelector('.img-upload__input');
const formElement = document.querySelector('.img-upload__form');
const fullPhotoElement = document.querySelector('.img-upload__preview').querySelector('img');
const effectLevelElement = document.querySelector('.effect-level');
const uploadStartElement = document.querySelector('.img-upload__start');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

//Проверка на схожий hashtags.
const checkDouble = (string) => {
  const hashtags = string.toLowerCase().split(' ');
  return new Set(hashtags).size === hashtags.length;
};
pristine.addValidator(textHashtagsElement, checkDouble, 'один и тот же хэш-тег не может быть использован дважды', false);

//Проверка на валидность регулярного выражения строки.
const checkHashtagRegExp = (value) => REGULAR_EXPRESSION.test(value);

//Проверка на валидность каждого элемента.
const checkValidHashtag = (value) => value === '' || value.split(' ').every(checkHashtagRegExp);

pristine.addValidator(textHashtagsElement, checkValidHashtag, 'Хештег должен начинаться с # и не должен состоять из (#, @, $...), и не может содержать пробелы');

//Проверка на MAX длину каждого элемента.
const checkMaxLength = (string) => {
  const hashtags = string.split(' ');

  return hashtags.every((item) => item.length < MAX_HASHTAG_LENGTH);
};
pristine.addValidator(textHashtagsElement, checkMaxLength, 'Слишком длинный хэштег', false);

//Проверка длины комментария.
const checkLengthComment = (comment) => comment.length < MAX_COMMENT_LENGTH;
pristine.addValidator(textareaDescriptionElement, checkLengthComment, 'длина комментария не может составлять больше 140 символов', false);

//Проверка на использование hashtag дважды.
const checkCount = (string) => {
  const hashtags = string.trim().split(' ');
  if (hashtags.length <= MAX_COUNT_HASHTAGS) {
    return hashtags;
  }
  return false;
};
pristine.addValidator(textHashtagsElement, checkCount, `Не больше ${MAX_COUNT_HASHTAGS} хэштегов`, false);

const showMessageError = () => {
  const errorMessage = errorMessageElement.cloneNode(true);
  bodyElement.appendChild(errorMessage);
  document.querySelector('.error').style.zIndex = '100';
  const buttonErrorElement = document.querySelector('.error__button');
  buttonErrorElement.addEventListener('click', () => {
    if (bodyElement.contains(errorMessage)) {
      bodyElement.removeChild(errorMessage);
      uploadSubmitElement.disabled = false;
    }
  });
};

const showMessageSuccess = () => {
  const successMessage = successMessageElement.cloneNode(true);
  bodyElement.appendChild(successMessage);
  const buttonSuccessElement = document.querySelector('.success__button');
  buttonSuccessElement.addEventListener('click', () => {
    if (bodyElement.contains(successMessage)) {
      bodyElement.removeChild(successMessage);
    }
  });
};

const resetForm = () => {
  uploadStartElement.classList.remove('hidden');
  uploadOverlayElement.classList.add('hidden');
  formElement.reset();
  fullPhotoElement.className = 'img-upload__preview';
  fullPhotoElement.style.transform = 'scale(1)';
  fullPhotoElement.style.filter = '';
  effectLevelElement.classList.add('hidden');
  uploadInputElement.value = '';
  uploadSubmitElement.disabled = false;
};

const handleSuccess = () => {
  resetForm();
  showMessageSuccess();
};

formElement.addEventListener('submit', (event) => {
  const valid = pristine.validate();
  event.preventDefault();
  if (valid) {
    uploadSubmitElement.disabled = true;
    sendData(handleSuccess, showMessageError, new FormData(formElement));
  }
});

export { resetForm };
