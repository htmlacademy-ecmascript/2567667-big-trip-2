import { getRandomInteger } from '../utils/utils.js';

export const mockDestinations = [
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcaq',
    name: 'Amsterdam',
    description: 'The capital of the Netherlands, known for its canals, tulip fields, and vibrant cultural scene.',
    pictures: [
      { src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}` },
      { src: `https://loremflickr.com/248/152?random=${getRandomInteger(101, 200)}` }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcaw',
    name: 'Geneva',
    description: 'A global city in Switzerland, famous for the United Nations headquarters and stunning lake views.',
    pictures: [
      { src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}` },
      { src: `https://loremflickr.com/248/152?random=${getRandomInteger(101, 200)}` },
      { src: `https://loremflickr.com/248/152?random=${getRandomInteger(201, 300)}` }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcae',
    name: 'Chamonix',
    description: 'A picturesque alpine town in France, nestled at the foot of Mont Blanc, a paradise for skiers and hikers.',
    pictures: [
      { src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}` }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcar',
    name: 'Moscow',
    description: 'The capital of Russia, home to Red Square, the Kremlin, and a rich history dating back centuries.',
    pictures: []
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcat',
    name: 'Tokyo',
    description: 'A high-tech metropolis blending ancient temples with neon-lit skyscrapers, a hub of innovation and culture.',
    pictures: [
      { src: `https://loremflickr.com/248/152?random=${getRandomInteger(301, 400)}` }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcay',
    name: 'New York',
    description: 'The city that never sleeps, famous for Times Square, Broadway, and the Statue of Liberty.',
    pictures: [
      { src: `https://loremflickr.com/248/152?random=${getRandomInteger(401, 500)}` }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcau',
    name: 'Barcelona',
    description: 'A Spanish coastal city known for its Gaudí architecture, vibrant beaches, and delicious tapas.',
    pictures: [
      { src: `https://loremflickr.com/248/152?random=${getRandomInteger(501, 600)}` },
      { src: `https://loremflickr.com/248/152?random=${getRandomInteger(601, 700)}` }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcai',
    name: 'Dubai',
    description: 'A futuristic city in the UAE, home to the world’s tallest building and luxury shopping experiences.',
    pictures: [
      { src: `https://loremflickr.com/248/152?random=${getRandomInteger(701, 800)}` }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcao',
    name: 'London',
    description: 'The capital of the UK, steeped in history with landmarks like Big Ben, Buckingham Palace, and the Thames River.',
    pictures: [
      { src: `https://loremflickr.com/248/152?random=${getRandomInteger(801, 900)}` },
      { src: `https://loremflickr.com/248/152?random=${getRandomInteger(901, 1000)}` }
    ]
  }
];
