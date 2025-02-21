import { getRandomInteger } from '../utils.js';

const mockDestinations = [
  {
    id: 1,
    name: 'Amsterdam',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    pictures: [
      { src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}` },
      { src: `https://loremflickr.com/248/152?random=${getRandomInteger(101, 200)}` }
    ]
  },
  {
    id: 2,
    name: 'Geneva',
    description: 'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    pictures: [
      { src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}` },
      { src: `https://loremflickr.com/248/152?random=${getRandomInteger(101, 200)}` },
      { src: `https://loremflickr.com/248/152?random=${getRandomInteger(101, 200)}` },
      { src: `https://loremflickr.com/248/152?random=${getRandomInteger(101, 200)}` },
      { src: `https://loremflickr.com/248/152?random=${getRandomInteger(101, 200)}` }
    ]
  },
  {
    id: 3,
    name: 'Chamonix',
    description: 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}`
      }
    ]
  },
  {
    id: 4,
    name: 'Moscow',
    description: 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    pictures: []
  }
];

export { mockDestinations };
