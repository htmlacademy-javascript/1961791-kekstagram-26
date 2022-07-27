import { sendData } from './api.js';

const MIN_HASHTAG_LENGTH = 1;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const MAX_COUNT_HASHTAGS = 5;
const textHashtags = document.querySelector('.text__hashtags');
const textareaDescription = document.querySelector('.text__description');
const errorrMessageTemplate = document.querySelector('#error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const bodyElement = document.querySelector('body');

const checkDouble = (hashtags) => {
  const hashtagsArray = hashtags.trim().split(' ');
  const result = [];
  hashtagsArray.forEach((item) => {
    if (result.indexOf(item.toLowerCase()) === -1) {
      result.push(item);
    }
  });
  return result.length === hashtagsArray.length;
};

const checkFirstSymbol = (hashtags) => {
  const hashtagsArray = hashtags.trim().split(' ');
  for (let index = 0; index < hashtagsArray.length; index++) {
    if (!hashtagsArray[index].startsWith('#')) {
      return false;
    }
  }
  return true;
};

const checkMaxLength = (hashtags) => {
  let result = true;
  const hashtagsArray = hashtags.trim().split(' ');
  for (let index = 0; index < hashtagsArray.length; index++) {
    if (hashtagsArray[index].length > MAX_HASHTAG_LENGTH) {
      result = false;
    }
  }
  return result;
};

const checkLengthComment = (comment) => comment.length < MAX_COMMENT_LENGTH;


const checkMinLength = (hashtags) => {
  let result = true;
  const hashtagsArray = hashtags.trim().split(' ');
  for (let index = 0; index < hashtagsArray.length; index++) {
    if (hashtagsArray[index].length <= MIN_HASHTAG_LENGTH) {
      result = false;
    }
  }
  return result;
};

const checkCount = (hashtags) => {
  const hashtagsArray = hashtags.trim().split(' ');
  if (hashtagsArray.length <= MAX_COUNT_HASHTAGS) {
    return hashtagsArray;
  }
  return false;
};

const checkSpecialSymbols = (hashtags) => {
  let result = true;
  const hashtagsArray = hashtags.trim().split(' ');
  for (let index = 0; index < hashtagsArray.length; index++) {
    if (!/^#?[а-яА-ЯёЁa-zA-Z0-9]+$/.test(hashtagsArray[index])) {
      result = false;
    }
  }
  return result;
};


const form = document.querySelector('.img-upload__form');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});
pristine.addValidator(textHashtags, checkFirstSymbol, '# - первый символ в хэштеге');

pristine.addValidator(textHashtags, checkMinLength, 'Слишком короткий хэштег', false);

pristine.addValidator(textHashtags, checkSpecialSymbols, 'Хэш-тег состоит из букв и чисел', false);

pristine.addValidator(textHashtags, checkMaxLength, 'Слишком длинный хэштег', false);

pristine.addValidator(textHashtags, checkCount, `Не больше ${MAX_COUNT_HASHTAGS} хэштегов`, false);

pristine.addValidator(textHashtags, checkDouble, 'один и тот же хэш-тег не может быть использован дважды', false);

pristine.addValidator(textareaDescription, checkLengthComment, 'длина комментария не может составлять больше 140 символов', false);

const fullPhotoContainer = document.querySelector('.img-upload__preview').querySelector('IMG');
const effectLevel = document.querySelector('.effect-level');
const uploadStart = document.querySelector('.img-upload__start');
const uploadOverlay = document.querySelector('.img-upload__overlay');

const showMessageError = () => {
  const errorrMessage = errorrMessageTemplate.cloneNode(true);

  bodyElement.appendChild(errorrMessage);
};

const showMessageSuccess = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  const fragment = document.createDocumentFragment();
  fragment.appendChild(successMessage);
  bodyElement.appendChild(fragment);
};

const resetForm = () => {
  uploadStart.classList.remove('hidden');

  uploadOverlay.classList.add('hidden');
  fullPhotoContainer.querySelector('img').src = '';
  form.reset();
  fullPhotoContainer.style.transform = 'scale(1)';
  fullPhotoContainer.style.filter = '';
  effectLevel.classList.add('hidden');
  showMessageSuccess();
};

form.addEventListener('submit', (e) => {
  const valid = pristine.validate();
  e.preventDefault();
  if (valid) {
    sendData(resetForm,showMessageError,new FormData(form));
  }
});
