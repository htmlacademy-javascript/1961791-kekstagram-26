const MIN_HASHTAG_LENGTH = 1;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const MAX_COUNT_HASHTAGS = 5;
const textHashtags = document.querySelector('.text__hashtags');
const textareaDescription = document.querySelector('.text__description');

const checkDouble = (hashtags) => {
  const hashtagsArray = hashtags.trim().split(' ');
  const result = [];
  hashtagsArray.forEach((item) => {
    if (result.indexOf(item.toLowerCase()) === -1) {
      result.push(item);
    }
  });
  if (result.length === hashtagsArray.length) {
    return true;
  }
  return false;
};

const checkFirstSymbol = (hashtags) => {
  let result = true;
  const hashtagsArray = hashtags.trim().split(' ');
  for (let index = 0; index < hashtagsArray.length; index++) {
    if (!hashtagsArray[index].startsWith('#')) {
      result = false;
    }
  }
  return result;
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

const checkLengthComment = (comment) => {
  let result = true;
  if (comment.length > MAX_COMMENT_LENGTH) {
    result = false;
  }
  return result;
};

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
  let result = true;
  const hashtagsArray = hashtags.trim().split(' ');
  for (let index = 0; index < hashtagsArray.length; index++) {
    if (hashtagsArray.length > MAX_COUNT_HASHTAGS) {
      result = false;
    }
  }
  return result;
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

form.addEventListener('submit', (e) => {
  const valid = pristine.validate();
  if (!valid) {
    e.preventDefault();
  }
});
