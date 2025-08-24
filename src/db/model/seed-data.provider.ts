import { ValueProvider } from '@nestjs/common';
import { SEED_DATA_TOKEN } from './constant';

export const SeedDataProvider: ValueProvider = {
  provide: SEED_DATA_TOKEN,
  useValue: {
    habits: [
      {
        id: 'a',
        habitId: 1,
        name: 'drink water',
        description: 'drink 2L of water daily',
        createdAt: new Date('2023-01-02').toString(),
        updatedAt: new Date('2023-01-03').toString(),
      },
      {
        id: 'b',
        habitId: 2,
        name: 'sleep 8 hours',
        createdAt: new Date('2024-01-04').toString(),
        updatedAt: new Date('2024-01-05').toString(),
      },
      {
        id: 'c',
        habitId: 3,
        name: 'walk 5K',
        createdAt: new Date('2025-02-10').toString(),
        updatedAt: new Date('2025-02-11').toString(),
      },
    ],
  },
};
