const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadPreview = document.querySelector('.img-upload__preview img');

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;
scaleControlValue.value = '100%';

const makePictureSmaller =  () => {
  let currentScale = scaleControlValue.value;
  currentScale = parseInt(currentScale, 10);
  if (currentScale > MIN_SCALE) {
    currentScale = currentScale - SCALE_STEP;
    scaleControlValue.value = `${currentScale}%`;
    uploadPreview.style.transform = `scale(${currentScale / 100})`;
  } else {
    scaleControlValue.value = '25%';
  }
};

const makePictureBigger = () => {
  let currentScale = scaleControlValue.value;
  currentScale = parseInt(currentScale, 10);
  if (currentScale < MAX_SCALE) {
    currentScale = currentScale + SCALE_STEP;
    scaleControlValue.value = `${currentScale}%`;
    uploadPreview.style.transform = `scale(${currentScale / 100})`;
  } else {
    scaleControlValue.value = '100%';
  }
};

scaleControlSmaller.addEventListener('click', makePictureSmaller);
scaleControlBigger.addEventListener('click', makePictureBigger);
