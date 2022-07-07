import {thumbnail} from './data.js';

const template = document.querySelector('#picture');
const container = document.querySelector('.pictures');

thumbnail.forEach((element) => {
  const clone = template.content.cloneNode(true);
  clone.querySelector('.picture__img').src = element.url;
  clone.querySelector('.picture__likes').textContent = element.likes;
  clone.querySelector('.picture__comments').textContent = element.comments;
  container.appendChild(clone);
});
