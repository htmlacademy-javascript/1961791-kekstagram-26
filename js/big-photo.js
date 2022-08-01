import { isEscapeKey } from './util.js';
import { data } from './main.js';

const COMMENTS_INCREMENT = 5;
const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;

const bigPhotoElement = document.querySelector('.big-picture');
const closeButtonElement = document.querySelector('.big-picture__cancel');
const commentTemplateElement = bigPhotoElement.querySelector('.social__comment');
const commentsCountElement = document.querySelector('.comments-count');
const commentsListElement = document.querySelector('.social__comments');
const buttonLoadElement = document.querySelector('.social__comments-loader');

let onCommentsClick = null;

//закрытие большого фото
const onCloseModalWindowClick = () =>{
  const photoFullElement = document.querySelector('.big-picture:not(.hidden)');

  if (photoFullElement) {
    photoFullElement.classList.add('hidden');
    document.body.classList.remove('modal-open');

    //удаление обработчика на эскейп
    closeButtonElement.removeEventListener('click', onCloseModalWindowClick);
    buttonLoadElement.removeEventListener('click', onCommentsClick);
  }
};

//закрытие фото по клавише esc
const onModalWindowClickEsc = (evt, photo) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseModalWindowClick(photo);

  }
};

// создание комментария
const createUsersComment = ({avatar, name, message}) => {
  const usersComment = commentTemplateElement.cloneNode(true);

  const socialPictureElement = usersComment.querySelector('.social__picture');
  socialPictureElement.src = avatar;
  socialPictureElement.alt = name;
  socialPictureElement.width = AVATAR_WIDTH;
  socialPictureElement.height = AVATAR_HEIGHT;

  usersComment.querySelector('.social__text').textContent = message;

  return usersComment;
};

//создание карточки большого фото
const createPhotoFull = (event) => {
  const url = event.target.src;
  bigPhotoElement.querySelector('img').src = url;
  const photo = data.find((item) => item.id.toString() === event.target.id);
  bigPhotoElement.querySelector('.likes-count').textContent = photo.likes;
  commentsCountElement.textContent = photo.comments.length;
  bigPhotoElement.querySelector('.social__caption').textContent = photo.description;
  document.removeEventListener('keydown', onModalWindowClickEsc);
  //комментарии

  let shownCommentsNum = Math.min(COMMENTS_INCREMENT, photo.comments.length);

  bigPhotoElement.querySelector('.comments-count-shown').textContent = shownCommentsNum;

  commentsListElement.innerHTML = '';

  if (photo.comments.length === 0) {
    commentsListElement.remove();
  }

  //создаем фрагмент
  const commentsFragment = document.createDocumentFragment();

  //вставляем комменты
  for (let j = 0; j < shownCommentsNum; j++) {
    commentsFragment.appendChild(createUsersComment(photo.comments[j]));
  }

  commentsListElement.appendChild(commentsFragment);

  //создаем обработчик для кнопки подгрузки комментариев
  onCommentsClick = () => {

    const commentsNewFragment = document.createDocumentFragment();

    for (let i = shownCommentsNum; i < Math.min(shownCommentsNum + COMMENTS_INCREMENT, photo.comments.length); i++) {
      commentsNewFragment.appendChild(createUsersComment(photo.comments[i]));
    }
    commentsListElement.appendChild(commentsNewFragment);

    shownCommentsNum = Math.min(shownCommentsNum + COMMENTS_INCREMENT, photo.comments.length);
    document.querySelector('.comments-count-shown').textContent = shownCommentsNum;

    if (shownCommentsNum === photo.comments.length) {
      buttonLoadElement.classList.add('hidden');
    }
  };

  if (photo.comments.length <= COMMENTS_INCREMENT) {
    buttonLoadElement.classList.add('hidden');
  }
  else {
    buttonLoadElement.classList.remove('hidden');
  }
  buttonLoadElement.addEventListener('click', onCommentsClick);

  //добавляем обработчик на кнопку закрытия фото
  closeButtonElement.addEventListener('click', onCloseModalWindowClick);

  return bigPhotoElement;
};

//открытие фото
const onModalWindowChange = (event) => {
  if (!event.target.classList.contains('picture__img')) {
    return;
  }
  const photoFull = createPhotoFull(event);
  photoFull.classList.remove('hidden');

  // buttonLoadElement.classList.remove('hidden');

  document.body.classList.add('modal-open');

  //добавление обработчика по нажатию эскейп
  document.addEventListener('keydown', onModalWindowClickEsc);

  document.body.appendChild(photoFull);
};

export { onModalWindowChange, onCloseModalWindowClick, onModalWindowClickEsc };
