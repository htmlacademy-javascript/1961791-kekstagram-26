import {getRandomIntInclusive} from './util.js';

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = ['Катя', 'Миша', 'Ира', 'Леша', 'Дима', 'Толик', 'Маша', 'Света', 'Алла', 'Наташа', 'Саша', 'Зина', 'Юля', 'Сережа'];

const descriptions = [
  'Приехали в поход. Расставили палатки.',
  'Сегодня погода порадовала нас красивым закатом!',
  'Как вам мой наряд? Купила на распрадаже',
  'На день рождение подарили собаку. Йоркширский терьер - назвали Джуся.',
  'Первые шаги нашего сыночка',
  'Каждый день делаю зарядку по утрам!'
];

let commentsId = 1;

const createComments = () => ({
  id: commentsId++,
  avatar: `img/avatar-${getRandomIntInclusive(1,6)}.svg`,
  message: messages[getRandomIntInclusive(0, messages.length - 1)],
  name: names[getRandomIntInclusive(0, names.length - 1)]
});

const createPhoto = () => {
  const result =[];
  for (let i = 1; i <= 25; i++) {
    result.push({
      id: i,
      url: `photos/${i + 1}.jpg`,
      description: descriptions[getRandomIntInclusive(0, descriptions.length - 1)],
      likes: getRandomIntInclusive(15, 200),
      comments: Array.from({length:getRandomIntInclusive(1, 2)}, createComments),
    });
  }
  return result;
};
console.log(createPhoto());
