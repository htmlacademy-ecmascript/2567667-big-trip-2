import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

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

dayjs.extend(duration);

export function calculateDuration(dateFrom, dateTo) {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);
  const diff = dayjs.duration(end.diff(start));

  if (diff.asDays() >= 1) {
    return `${diff.days()}D ${diff.hours()}H ${diff.minutes()}M`;
  } else if (diff.asHours() >= 1) {
    return `${diff.hours()}H ${diff.minutes()}M`;
  } else {
    return `${diff.minutes()}M`;
  }
}

export { getRandomArrayElement, getRandomInteger, getRandomNumber };
