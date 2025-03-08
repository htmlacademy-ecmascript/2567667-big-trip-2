import { getRandomArrayElement, getRandomNumber } from '../utils/utils.js';

const mockPoints = [
  {
    id: 'point-1',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55',
    dateTo: '2019-07-11T11:22',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcaq',
    isFavorite: !!getRandomNumber(1),
    offers: [
      '58f27849-c4f9-42e5-88ab-48267d282369',
      '5df4f3e4-f677-4318-a3f5-458b16f30969',
      'cde29377-f0d4-4626-949a-ab5709a2ad55',
      '009ed2cd-714f-4ce2-aae1-7e85683eeedf',
      'effb2e14-3447-497b-a5bb-113083704bbd'

    ],
    type: 'taxi'
  },
  {
    id: 'point-2',
    basePrice: 3470,
    dateFrom: '2019-03-18T12:25',
    dateTo: '2019-03-18T13:35',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcaw',
    isFavorite: !!getRandomNumber(1),
    offers: [
      'cafbbdd8-6dea-432f-bb37-f6b8ae635ae4',
      'b371fb66-c631-4bca-b1f8-f80f48692674',
      'bbc01c4e-2318-426b-bfef-6af93548e45c'
    ],
    type: 'bus'
  },
  {
    id: 'point-3',
    basePrice: 1000,
    dateFrom: '2019-03-18T14:30',
    dateTo: '2019-03-18T16:05',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcae',
    isFavorite: !!getRandomNumber(1),
    offers: [
      '525b9ce2-5919-4039-9495-2a931663302a',
      'cc002a26-9f8b-478f-b5e2-7dc4faa57b4c',
      '4305666f-a227-4a63-a600-9856bd1a5639'
    ],
    type: 'train'
  },
  {
    id: 'point-4',
    basePrice: 1500,
    dateFrom: '2019-03-18T12:25',
    dateTo: '2019-03-18T13:35',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcar',
    isFavorite: !!getRandomNumber(1),
    offers: [
      'a3506d95-4022-4a8e-a438-7b793dc202a0',
      '055ba681-0802-460d-8b60-9d222286bd59',
      '3cb40b64-e480-4fff-9f18-8156e5c4e0de',
      '4aac35e9-e161-4da9-8c69-6fd2c40a465e',
      '81101dc4-8c37-48a4-8707-015ed5d84335',
      '91bd7e2d-1e94-4ca9-afbd-3bc281c0ab83'
    ],
    type: 'ship'
  },
  {
    id: 'point-5',
    basePrice: 6000,
    dateFrom: '2019-03-19T11:20',
    dateTo: '2019-03-19T13:00',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcat',
    isFavorite: !!getRandomNumber(1),
    offers: [
      'e6ae2c76-a259-4de0-b816-189d0324c821',
      '8b5bf11e-995b-48ef-9261-0ba6b3cf1b9f'
    ],
    type: 'drive'
  },
  {
    id: 'point-6',
    basePrice: 6000,
    dateFrom: '2019-03-19T11:20',
    dateTo: '2019-03-19T13:00',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcay',
    isFavorite: !!getRandomNumber(1),
    offers: [
      'e68cd6be-f967-438b-b6c1-15a007daca30',
      'f859f23c-2dee-4a6c-8c72-4ec659562db6',
      '512e3870-1beb-469c-9cee-bf783820c0c6',
      '98c665ca-d858-4a99-94ab-4f202344a3c8',
      'd85ef0fe-e0c0-484b-a07e-5c6c3619fc46',
      '1c5b2003-4d91-4ea9-9cdb-5061f3610785'
    ],
    type: 'flight'
  },
  {
    id: 'point-7',
    basePrice: 6000,
    dateFrom: '2025-03-19T11:20',
    dateTo: '2025-03-19T13:00',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcau',
    isFavorite: !!getRandomNumber(1),
    offers: [
      '5d04657e-be30-4db7-b3ea-e961c94ceed4',
      'fcb41394-879a-4de4-afa7-a4ca4a0288c7',
      'a899dc84-65a1-413b-a3f6-697e0d62a2af',
      'bf3adb23-ca52-4725-90dd-c408a87a1d95',
      '5a3581b3-bb76-42e9-976c-92af11b21d06'
    ],
    type: 'check-in'
  },
  {
    id: 'point-8',
    basePrice: 6000,
    dateFrom: '2025-03-08T11:20',
    dateTo: '2025-03-09T13:00',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcai',
    isFavorite: !!getRandomNumber(1),
    offers: [],
    type: 'sightseeing'
  },
  {
    id: 'point-9',
    basePrice: 6000,
    dateFrom: '2026-03-19T11:20',
    dateTo: '2026-03-19T13:00',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcao',
    isFavorite: !!getRandomNumber(1),
    offers: [
      '856d9ea4-7560-4ca7-9133-9c8591dffdbe',
      'a3470ca1-9e12-4fb2-a57d-3472911ab61a'
    ],
    type: 'restaurant'
  }
];

function getRandomPoints() {
  const pointsRandom = Array.from({length: 0});

  while (pointsRandom.length < 4) {
    const item = getRandomArrayElement(mockPoints);

    if (!pointsRandom.includes(item)) {
      pointsRandom.push(item);
    }
  }

  return pointsRandom;
}

export { getRandomPoints };
