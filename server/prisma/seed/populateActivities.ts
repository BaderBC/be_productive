import prisma from './prisma.module';

export function populateActivities() {
  return prisma.activities.createMany({
    data: [
      {
        id: 1,
        name: 'developing be_productive',
        description: "There's need to still develop this app",
        time_to_spend_weekly: 60 * 60 * 1000,
        user_id: 1,
      },
      {
        id: 2,
        name: 'test',
        description: 'test',
        time_to_spend_weekly: 2 * 60 * 60 * 1000,
        user_id: 1,
      },
      {
        id: 3,
        name: 'test2',
        time_to_spend_weekly: 3 * 60 * 60 * 1000,
        user_id: 1,
      },
      {
        id: 4,
        name: 'example name',
        description: 'example description',
        time_to_spend_weekly: 2 * 60 * 60 * 1000,
        user_id: 2,
      },
      {
        id: 5,
        name: 'example activity',
        time_to_spend_weekly: 3 * 60 * 60 * 1000,
        user_id: 3,
      },
    ],
    skipDuplicates: true,
  });
}
