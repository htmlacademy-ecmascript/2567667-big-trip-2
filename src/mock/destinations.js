import { getRandomInteger } from '../utils.js';

const mockDestinations = [
  {
    id: 1,
    name: 'Amsterdam',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}`
      }
    ]
  },
  {
    id: 2,
    name: 'Geneva',
    description: 'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}`
      }
    ]
  },
  {
    id: 3,
    name: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e06',
    description: 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}`
      }
    ]
  }
];

export { mockDestinations };
