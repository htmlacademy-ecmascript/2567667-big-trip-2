function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNumber(number) {
  const randomNumber = Math.floor(Math.random() * (number - 0 + 1) + 0).toFixed(0);
  return Number(randomNumber);
}

export { getRandomArrayElement, getRandomInteger, getRandomNumber };
