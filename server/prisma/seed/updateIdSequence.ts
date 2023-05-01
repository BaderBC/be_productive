import prisma from './prisma.module';

const updateActivitiesSequence = prisma.$executeRaw`
    SELECT setval('activities_id_seq', COALESCE((SELECT MAX(id) FROM activities), 0) + 1)
`;
const updateActivityWeekSessionSequence = prisma.$executeRaw`
    SELECT setval('activity_week_session_id_seq', COALESCE((SELECT MAX(id) FROM activity_week_session), 0) + 1)
`;
const updateUsersSequence = prisma.$executeRaw`
    SELECT setval('users_id_seq', COALESCE((SELECT MAX(id) FROM users), 0) + 1)
`;

export function updateIdSequence() {
  return [
    updateActivitiesSequence,
    updateActivityWeekSessionSequence,
    updateUsersSequence,
  ];
}
