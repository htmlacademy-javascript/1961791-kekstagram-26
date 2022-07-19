// Возвращает случайное целое число из переданного диапазона включительно
function getRandomIntInclusive (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Проверка максимальной длины строки
function checkStringLength (string, maxString = 140) {
  return string.length <= maxString;
}

//кнопка клавиатуры esc
const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomIntInclusive, checkStringLength, isEscapeKey};


