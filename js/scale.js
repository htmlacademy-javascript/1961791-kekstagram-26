const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const uploadPreviewElement = document.querySelector('.img-upload__preview img');

const onPictureSmaller =  () => {
  const {STEP, MIN, MAX} = Scale;
  let currentScale = scaleControlValueElement.value;
  currentScale = parseInt(currentScale, 10);
  if (currentScale > MIN) {
    currentScale = currentScale - STEP;
    scaleControlValueElement.value = `${currentScale}%`;
    uploadPreviewElement.style.transform = `scale(${currentScale / MAX})`;
  } else {
    scaleControlValueElement.value = `${MIN}%`;
  }
};

const onPictureBigger = () => {
  const {STEP, MAX} = Scale;
  let currentScale = scaleControlValueElement.value;
  currentScale = parseInt(currentScale, 10);
  if (currentScale < MAX) {
    currentScale = currentScale + STEP;
    scaleControlValueElement.value = `${currentScale}%`;
    uploadPreviewElement.style.transform = `scale(${currentScale / MAX})`;
  } else {
    scaleControlValueElement.value = `${MAX}%`;
  }
};

const addScaleListener = () => {
  scaleControlSmallerElement.addEventListener('click', onPictureSmaller);
  scaleControlBiggerElement.addEventListener('click', onPictureBigger);
};

const removeScaleListener = () => {
  scaleControlSmallerElement.removeEventListener('click', onPictureSmaller);
  scaleControlBiggerElement.removeEventListener('click', onPictureBigger);
};

export { addScaleListener, removeScaleListener };
