import { createThumbnail } from './thumbnails.js';
import { getRandomArrayUniqueNumbers, debounce } from './util.js';

const NEW_PHOTOS_COUNT = 10;

const formFiltersElement = document.querySelector('.img-filters__form');
const buttonDefaultElement = document.querySelector('#filter-default');
const buttonRandomElement = document.querySelector('#filter-random');
const buttonDiscussedElement = document.querySelector('#filter-discussed');
const filtersElement = document.querySelector('.img-filters');

filtersElement.classList.remove('img-filters--inactive');

let currentFilter = buttonDefaultElement;

const getRandomPictures = (photos) => {
  const randomUniqueNumbers = getRandomArrayUniqueNumbers(photos.length);
  const randomPictures = [];
  randomUniqueNumbers.slice(0, NEW_PHOTOS_COUNT).forEach((randomNumber) => {
    randomPictures.push(photos[randomNumber]);
  });
  return randomPictures;
};

const compareCommentsLength = (a, b) => b.comments.length - a.comments.length;

const getFilteredPictures = (photos) => {

  switch (currentFilter) {
    case  buttonRandomElement:
      return getRandomPictures(photos);

    case buttonDiscussedElement:
      return photos.slice().sort(compareCommentsLength);

    case buttonDefaultElement:
      return photos;

    default: return photos;
  }
};

const onFilterClick = (evt, photos) => {
  const pictureElements = document.querySelectorAll('.picture');
  currentFilter.classList.remove('img-filters__button--active');
  currentFilter = evt.target;
  currentFilter.classList.add('img-filters__button--active');

  pictureElements.forEach((element) => {
    element.remove();
  });
  createThumbnail(getFilteredPictures(photos));
};

const changeFilters = (photos) => {
  formFiltersElement.addEventListener('click', debounce((evt) => onFilterClick(evt, photos)));
};

export { changeFilters };
