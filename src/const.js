import { getRandomInteger } from './utils';

const POINT_TYPES = ['bus', 'check-in', 'drive', 'flight', 'restaurant', 'ship', 'sightseeing', 'taxi', 'train'];

const DESTINATIONS = [
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
    name: 'Chamonix',
    description: 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}`
      }
    ]
  }
];

const OFFERS = [
  {
    type: 'flight',
    offers: [
      {
        'id': 1,
        'title': 'Add luggage',
        'price': 50
      },
      {
        'id': 2,
        'title': 'Switch to comfort',
        'price': 80
      },
    ]
  },
  {
    type: 'taxi',
    offers: [
      {
        'id': 1,
        'title': 'Order Uber',
        'price': 20
      },
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        'id': 1,
        'title': 'Rent a car',
        'price': 200
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        'id': 1,
        'title': 'Add breakfast',
        'price': 50
      }
    ]
  }
];

export { POINT_TYPES, DESTINATIONS, OFFERS };
