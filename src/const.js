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
    name: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e06',
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

const MOCK_POINTS = [
  {
    id: '0',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55',
    dateTo: '2019-07-11T11:22',
    destination: [2],
    isFavorite: false,
    offers: [2],
    type: 'taxi'
  },
  {
    id: '1',
    basePrice: 3470,
    dateFrom: '2019-03-18T12:25',
    dateTo: '2019-03-18T13:35',
    destination: [2],
    isFavorite: false,
    offers: [1, 2],
    type: 'flight'
  },
  {
    id: '2',
    basePrice: 1000,
    dateFrom: '2019-03-18T14:30',
    dateTo: '2019-03-18T16:05',
    destination: [1],
    isFavorite: false,
    offers: [1],
    type: 'drive'
  },
  {
    id: '3',
    basePrice: 1500,
    dateFrom: '2019-03-18T12:25',
    dateTo: '2019-03-18T13:35',
    destination: [3],
    isFavorite: false,
    offers: '',
    type: 'drive'
  },
  {
    id: '4',
    basePrice: 6000,
    dateFrom: '2019-03-19T11:20',
    dateTo: '2019-03-19T13:00',
    destination: [1],
    isFavorite: false,
    offers: [1],
    type: 'check-in'
  }
];

export { POINT_TYPES, DESTINATIONS, OFFERS, MOCK_POINTS };
