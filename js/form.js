const formElement = document.querySelector('.img-upload__form');
const hashtagsElement = formElement.querySelector('[name=hashtags]');
const descriptionElement = formElement.querySelector('[name=description]');
const submitElement = formElement.querySelector('#upload-submit');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'field-error'
});

pristine.addValidator(hashtagsElement, (value) => {
  const hashtags = value.trim().split(' ');

  for (let i = 0; i < hashtags.length; i++) {
    if (!(/^#/).test(hashtags[i]) && hashtags[i].length) {
      return false;
    }
  }

  return true;
}, 'Хэш-тег начинается с символа # (решётка)');

pristine.addValidator(hashtagsElement, (value) => {
  const hashtags = value.trim().split(' ');

  for (let i = 0; i < hashtags.length; i++) {
    if (!(/[A-Za-zА-Яа-я0-9]$/).test(hashtags[i]) && hashtags[i].length > 1) {
      return false;
    }
  }

  return true;
}, 'Cтрока после решётки должна состоять из букв и чисел');

pristine.addValidator(hashtagsElement, (value) => {
  const hashtags = value.trim().split(' ');

  for (let i = 0; i < hashtags.length; i++) {
    if ((/^#/).test(hashtags[i]) && hashtags[i].length === 1) {
      return false;
    }
  }

  return true;
}, 'Хеш-тег не может состоять только из одной решётки');

pristine.addValidator(hashtagsElement, (value) => {
  const hashtags = value.trim().split(' ');

  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags[i].length > 20) {
      return false;
    }
  }

  return true;
}, 'Максимальная длина одного хэш-тега 20 символов, включая решётку');

pristine.addValidator(hashtagsElement, (value) => {
  const hashtags = value.toLowerCase().trim().split(' ');

  const countItems = hashtags.reduce((acc, item) => {
    acc[item] = acc[item] ? acc[item] + 1 : 1;
    return acc;
  }, {});

  return Object.values(countItems).find((el) => el === 1);
}, 'один и тот же хэш-тег не может быть использован дважды');

pristine.addValidator(hashtagsElement, (value) => value.trim().split(' ').length <= 5, 'Нельзя указать больше пяти хэш-тегов');
pristine.addValidator(descriptionElement, (value) => value.length < 140, 'Максимальная длина 140 символов');

const onFieldInput = () => {
  submitElement.disabled = !pristine.validate();
};

const addUploadFormValidation = () => {
  hashtagsElement.addEventListener('input', onFieldInput);
  descriptionElement.addEventListener('input', onFieldInput);
};

const resetUploadFormValidation = () => {
  if (pristine) {
    pristine.reset();
    hashtagsElement.removeEventListener('input', onFieldInput);
    descriptionElement.removeEventListener('input', onFieldInput);
    submitElement.disabled = false;
  }
};

export { addUploadFormValidation, resetUploadFormValidation };
