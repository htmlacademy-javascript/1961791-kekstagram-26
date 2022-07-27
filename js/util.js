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

const showMessageError = (message) => {
  const messageBlock = document.createElement('div');
  messageBlock.style.zIndex = '100';
  messageBlock.style.position = 'absolute';
  messageBlock.style.minHeight = '100px';
  messageBlock.style.border = 'dashed 2px #000';
  messageBlock.style.opacity = '0.7';
  messageBlock.style.width = '50%';
  messageBlock.style.margin = '0 auto';
  messageBlock.style.left = '0';
  messageBlock.style.right = '0';
  messageBlock.style.top = '0';
  messageBlock.style.padding = '30px 10px';
  messageBlock.style.fontSize = '20px';
  messageBlock.style.textAlign = 'center';
  messageBlock.style.color = '#000';
  messageBlock.style.backgroundColor = '#ffffff';

  messageBlock.textContent = message;
  document.body.append(messageBlock);

  setTimeout(() => {
    messageBlock.remove();
  }, 5000);
};

export {getRandomIntInclusive, checkStringLength, isEscapeKey, showMessageError};
