const effectSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const uploadContainer = document.querySelector('.img-upload__preview');
const effectLevel = document.querySelector('.effect-level');
const effectValue = document.querySelector('.effect-level__value');
const sliderElementContainer = document.querySelector('.img-upload__effect-level');

let currentFilter = 'none';

noUiSlider.create(effectSlider, {
  start: [100],
  range: {
    'min': 0,
    'max': 100
  },
  step: 1,
  connect: 'lower',
}
);

const updateSlider = (filter) => {
  if (filter.name === 'none') {
    sliderElementContainer.classList.add('hidden');
  } else {
    sliderElementContainer.classList.remove('hidden');
    effectSlider.noUiSlider.updateOptions({
      start: [100],
      range: {
        'min': 0,
        'max': 100
      },
      step: 1,
      connect: 'lower',
    });
  }
};

const applyChrome = (filterPosition) => {
  uploadContainer.style.filter = `grayscale(${filterPosition / 100})`;
};

const applyHeat = (filterPosition) => {
  uploadContainer.style.filter = `brightness(${(filterPosition / 100 * 2 + 1).toFixed(1)})`;
};

const applyMarvin = (filterPosition) => {
  uploadContainer.style.filter = `invert(${filterPosition}%)`;
};

const applyPhobos = (filterPosition) => {
  uploadContainer.style.filter = `blur(${(filterPosition / 100 * 3).toFixed(1)}px)`;
};

const applySepia = (filterPosition) => {
  uploadContainer.style.filter = `sepia(${filterPosition / 100})`;
};

const toggleListener =  (evt)  => {
  uploadContainer.className = 'img-upload__preview';
  const target = evt.target.value;
  updateSlider(target);
  effectLevel.classList.remove('hidden');
  currentFilter = target;
  uploadContainer.style.filter = '';
  if (target === 'none') {
    effectLevel.classList.add('hidden');
  }
  uploadContainer.classList.add(`effects__preview--${target}`);
};

const applyFilter = (value) => {
  switch (currentFilter) {
    case 'none':
      uploadContainer.style.filter = '';
      effectLevel.classList.add('hidden');
      uploadContainer.classList.add('effects__preview--none');
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

effectSlider.noUiSlider.on('update', () => {
  effectValue.value = effectSlider.noUiSlider.get();
  applyFilter(effectValue.value);
});

effectsList.addEventListener('change', toggleListener);

