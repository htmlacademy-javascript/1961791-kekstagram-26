const template = document.querySelector('#picture');
const container = document.querySelector('.pictures');

// thumbnail.forEach(({url, likes, comments}) => {
//   const clone = template.content.cloneNode(true);
//   clone.querySelector('.picture__img').src = url;
//   clone.querySelector('.picture__likes').textContent = likes;
//   clone.querySelector('.picture__comments').textContent = comments.length;
//   container.appendChild(clone);
// });
const createThumbnail = (thumbnail) => {
  const fragment = document.createDocumentFragment();

  thumbnail.forEach(({url, likes, comments}) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.picture__img').src = url;
    clone.querySelector('.picture__likes').textContent = likes;
    clone.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(clone);
  });
  container.appendChild(fragment);
};

export {createThumbnail};
