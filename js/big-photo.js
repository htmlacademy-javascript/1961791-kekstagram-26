import { isEscapeKey } from './util.js';
import { thumbnail } from './data.js';

const bigPhotoTemlate = document.querySelector('.big-picture');
const bigPhotoButton = document.querySelector('.big-picture__cancel');
const commentTemplate = bigPhotoTemlate.querySelector('.social__comment');
const commentsCount = document.querySelector('.comments-count');

const COMMENTS_INCREMENT = 5;
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

//создание карточки большого фото
function createPhotoFull (event) {
  const url = event.target.src;
  bigPhotoTemlate.querySelector('img').src = url;
  const photo = thumbnail.find((item) => item.id.toString() === event.target.id);
  bigPhotoTemlate.querySelector('.likes-count').textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  bigPhotoTemlate.querySelector('.social__caption').textContent = photo.description;

  //комментарии
  const commentsList = document.querySelector('.social__comments');
  const commentsLoaderButton = document.querySelector('.social__comments-loader');
  let shownCommentsNum = Math.min(COMMENTS_INCREMENT, photo.comments.length);

  bigPhotoTemlate.querySelector('.comments-count-shown').textContent = shownCommentsNum;

  commentsList.innerHTML = '';

  if (photo.comments.length === 0) {
    commentsList.remove();
  }

  for (let j = 0; j < shownCommentsNum; j++) {
    commentsList.appendChild(createUsersComment(photo.comments[j]));
  }

  if (photo.comments.length <= COMMENTS_INCREMENT) {
    commentsLoaderButton.classList.add ('hidden');
  }
  //создаем обработчик для кнопки подгрузки комментариев
  const commentsLoaderButtonClickHandler = () => {

    for (let i = shownCommentsNum; i < Math.min(shownCommentsNum + COMMENTS_INCREMENT, photo.comments.length); i++) {
      commentsList.appendChild(createUsersComment(photo.comments[i]));
    }
    shownCommentsNum = Math.min(shownCommentsNum + COMMENTS_INCREMENT, photo.comments.length);
    document.querySelector('.comments-count-shown').textContent = shownCommentsNum;

    if (shownCommentsNum === photo.comments.length) {
      commentsLoaderButton.classList.add ('hidden');

      commentsLoaderButton.removeEventListener('click', commentsLoaderButtonClickHandler);
    }
  };

  commentsLoaderButton.addEventListener('click', commentsLoaderButtonClickHandler);

  //добавляем обработчик на кнопку закрытия фото
  bigPhotoButton.addEventListener('click', closeModalWindow);

  return bigPhotoTemlate;
}

//открытие фото
function openModalWindow(event) {
  if (!event.target.classList.contains('picture__img')) {
    return;
  }
  const photoFull = createPhotoFull(event);
  photoFull.classList.remove('hidden');

  document.body.classList.add('modal-open');

  //добавление обработчика по нажатию эскейп
  document.addEventListener('keydown', addKeydownEscHandler);

  document.body.appendChild(photoFull);
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

export {openModalWindow, closeModalWindow, addKeydownEscHandler};
