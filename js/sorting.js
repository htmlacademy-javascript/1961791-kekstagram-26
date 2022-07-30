import { createThumbnail } from './thumbnail.js';
import { getRandomIntInclusive, debounce } from './util.js';

const NEW_PHOTOS_COUNT = 10;
const PHOTO_ELEMENTS_COUNT = 25;
const DEBOUNCE_TIMEOUT = 500;

const buttonDefaultElement = document.querySelector('#filter-default');
const buttonRandomElement = document.querySelector('#filter-random');
const buttonDiscussedElement = document.querySelector('#filter-discussed');
const similarListElement = document.querySelector('.pictures');
const filtersElement = document.querySelector('.img-filters');
filtersElement.style.opacity = '1';

const changeFilters = (photos) => {
  const toggleFilter = (picturesArray) => {

    const photosElement = similarListElement.querySelectorAll('.picture');
    photosElement.forEach((photo)=>photo.remove());

    const fragment = document.createDocumentFragment();

    createThumbnail(picturesArray);
    similarListElement.appendChild(fragment);
  };


  buttonDiscussedElement.addEventListener('click', debounce(() => {
    buttonDiscussedElement.classList.add('img-filters__button--active');
    buttonDefaultElement.classList.remove('img-filters__button--active');
    buttonRandomElement.classList.remove('img-filters__button--active');

    const commentsArrayCopy = photos.slice();
    commentsArrayCopy.sort((a, b) => {
      if (a.comments.length > b.comments.length) {
        return -1;
      } else if (a.comments.length < b.comments.length) {
        return 1;
      }
      return 0;
    });
    toggleFilter(commentsArrayCopy);

  },DEBOUNCE_TIMEOUT));

  buttonDefaultElement.addEventListener('click', debounce(() => {
    buttonDefaultElement.classList.add('img-filters__button--active');
    buttonRandomElement.classList.remove('img-filters__button--active');
    buttonDiscussedElement.classList.remove('img-filters__button--active');

    toggleFilter(photos);
  },DEBOUNCE_TIMEOUT));

  const toggleFilterNew = (picturesArrays) => {
    const newPhotosArrays = [];
    for (let i = 1; newPhotosArrays.length !== NEW_PHOTOS_COUNT; i++) {
      const newPhotosElement = picturesArrays[getRandomIntInclusive(0, PHOTO_ELEMENTS_COUNT)];
      if (!newPhotosArrays.includes(newPhotosElement) && newPhotosElement) {
        newPhotosArrays.push(newPhotosElement);
      }
    }
    return newPhotosArrays;
  };

  buttonRandomElement.addEventListener('click', debounce(() => {
    buttonRandomElement.classList.add('img-filters__button--active');
    buttonDefaultElement.classList.remove('img-filters__button--active');
    buttonDiscussedElement.classList.remove('img-filters__button--active');

    let commentsArrayCopy = photos.slice();
    commentsArrayCopy = toggleFilterNew(commentsArrayCopy);
    toggleFilter(commentsArrayCopy);
  },DEBOUNCE_TIMEOUT));
};

export {changeFilters};
