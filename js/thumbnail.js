const templateElement = document.querySelector('#picture');
const containerElement = document.querySelector('.pictures');

const createThumbnail = (thumbnails) => {
  const fragment = document.createDocumentFragment();

  thumbnails.forEach(({url, likes, comments, id}) => {
    const clone = templateElement.content.cloneNode(true);
    clone.querySelector('.picture__img').id = id;
    clone.querySelector('.picture__img').src = url;
    clone.querySelector('.picture__likes').textContent = likes;
    clone.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(clone);

  });
  containerElement.appendChild(fragment);
};

export { createThumbnail };
