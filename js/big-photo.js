import { isEscapeKey } from './util.js';
import { thumbnail } from './data.js';

const bigPhotoTemlate = document.querySelector('.big-picture');
const bigPhotoButton = document.querySelector('.big-picture__cancel');
const commentTemplate = bigPhotoTemlate.querySelector('.social__comment');

//открытие фото
function openModalWindow(event) {

  const photoFull = createPhotoFull(event);

  photoFull.classList.remove('hidden');

  photoFull.querySelector('.social__comment-count').classList.add ('hidden');
  photoFull.querySelector('.comments-loader').classList.add ('hidden');

  document.body.classList.add('modal-open');

  //добавление обработчика по нажатию эскейп
  document.addEventListener('keydown', addKeydownEscHandler);
}

//создание карточки большого фото
function createPhotoFull (event) {
  const url = event.target.src;
  bigPhotoTemlate.querySelector('img').src = url;
  const photo = thumbnail.find((item) => item.id.toString() === event.target.id);
  bigPhotoTemlate.querySelector('.likes-count').textContent = photo.likes;
  bigPhotoTemlate.querySelector('.comments-count').textContent = photo.comments.length;
  bigPhotoTemlate.querySelector('.social__caption').textContent = photo.description;

  //комментарии
  const commentsList = bigPhotoTemlate.querySelector('.social__comments');
  commentsList.innerHTML = '';

  for (let j = 0; j < photo.comments.length; j++) {
    commentsList.appendChild(createUsersComment(photo.comments[j]));
  }
  //добавляем обработчик на кнопку закрытия фото
  bigPhotoButton.addEventListener('click', closeModalWindow);

  return bigPhotoTemlate;
}

// создание комментария
function createUsersComment ({avatar, name, message}) {
  const usersComment = commentTemplate.cloneNode(true);

  const socialPicture = usersComment.querySelector('.social__picture');
  socialPicture.src = avatar;
  socialPicture.alt = name;
  socialPicture.width = '35';
  socialPicture.height = '35';

  usersComment.querySelector('.social__text').textContent = message;

  return usersComment;
}

//закрытие большого фото
function closeModalWindow() {
  const photoFull = document.querySelector('.big-picture:not(.hidden)');
  if (photoFull) {
    photoFull.classList.add('hidden');
    document.body.classList.remove('modal-open');

    //удаление обработчика на эскейп
    document.removeEventListener('keydown', addKeydownEscHandler);
    bigPhotoButton.removeEventListener('click', closeModalWindow);
  }
}

//закрытие фото по клавише esc
function addKeydownEscHandler(evt, photo) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalWindow(photo);
  }
}

export {openModalWindow, closeModalWindow};
