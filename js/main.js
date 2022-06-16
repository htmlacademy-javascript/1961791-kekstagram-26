// Возвращает случайное целое число из переданного диапазона включительно
function getRandomIntInclusive(min, max) {
  if (min >= max) {
    console.log('Ошибка!');
  }
  const result = min + Math.random() * (max + 1 - min);
  console.log(result);
  return Math.floor(result);
}
console.log(getRandomIntInclusive(100,190));

// Проверка максимальной длины строки
function checkLength(string, maxString = 140) {
  return string.length <= maxString;
}
console.log(checkLength('Хочу проверить длину строки'));


