const EFFECT_START = 100;
const EFFECT_MAX = 100;
const EFFECT_MIN = 0;
const STEP = 1;

const effectSliderElement = document.querySelector('.effect-level__slider');
const effectsListElement = document.querySelector('.effects__list');
const uploadContainerElement = document.querySelector('.img-upload__preview');
const effectLevelElement = document.querySelector('.effect-level');
const effectValueElement = document.querySelector('.effect-level__value');
const blockEffectsElement = document.querySelector('.img-upload__effect-level');

let currentFilter = 'none';

noUiSlider.create(effectSliderElement, {
  start: [EFFECT_START],
  range: {
    'min': EFFECT_MIN,
    'max': EFFECT_MAX
  },
  step: STEP,
  connect: 'lower',
}
);

const updateSlider = (filter) => {
  if (filter.name === 'none') {
    blockEffectsElement.classList.add('hidden');
  } else {
    blockEffectsElement.classList.remove('hidden');
    effectSliderElement.noUiSlider.updateOptions({
      start: [EFFECT_START],
      range: {
        'min': EFFECT_MIN,
        'max': EFFECT_MAX
      },
      step: STEP,
      connect: 'lower',
    });
  }
};

const applyChrome = (filterPosition) => {
  uploadContainerElement.style.filter = `grayscale(${filterPosition / 100})`;
};

const applyHeat = (filterPosition) => {
  uploadContainerElement.style.filter = `brightness(${(filterPosition / 100 * 2 + 1).toFixed(1)})`;
};

const applyMarvin = (filterPosition) => {
  uploadContainerElement.style.filter = `invert(${filterPosition}%)`;
};

const applyPhobos = (filterPosition) => {
  uploadContainerElement.style.filter = `blur(${(filterPosition / 100 * 3).toFixed(1)}px)`;
};

const applySepia = (filterPosition) => {
  uploadContainerElement.style.filter = `sepia(${filterPosition / 100})`;
};

const onEffectChange =  (evt)  => {
  uploadContainerElement.className = 'img-upload__preview';
  const target = evt.target.value;
  updateSlider(target);
  effectLevelElement.classList.remove('hidden');
  currentFilter = target;
  uploadContainerElement.style.filter = '';
  if (target === 'none') {
    effectLevelElement.classList.add('hidden');
  }
  uploadContainerElement.classList.add(`effects__preview--${target}`);
};

const applyFilter = (value) => {
  switch (currentFilter) {
    case 'none':
      uploadContainerElement.style.filter = '';
      effectLevelElement.classList.add('hidden');
      uploadContainerElement.classList.add('effects__preview--none');
      break;
    case 'chrome':
      applyChrome(value);
      break;
    case 'sepia':
      applySepia(value);
      break;
    case 'marvin':
      applyMarvin(value);
      break;
    case 'phobos':
      applyPhobos(value);
      break;
    case 'heat':
      applyHeat(value);
      break;
  }
};

effectSliderElement.noUiSlider.on('update', () => {
  effectValueElement.value = effectSliderElement.noUiSlider.get();
  applyFilter(effectValueElement.value);
});

effectsListElement.addEventListener('change', onEffectChange);

export { onEffectChange };
