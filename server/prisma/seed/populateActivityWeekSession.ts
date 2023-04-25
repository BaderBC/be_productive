import prisma from './prisma.module';
import moment from 'moment-timezone';

export function populateActivityWeekSession() {
  const local_date = moment.tz(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );

  return prisma.activity_week_session.createMany({
    data: [
      {
        activity_id: 1,
        time_to_spend_weekly: 60 * 60 * 1000,
        session_start: new Date(),
        is_active: true,
        week_number: local_date.week(),
        year: local_date.year(),
      },
      {
        activity_id: 2,
        time_to_spend_weekly: 2 * 60 * 60 * 1000,
        session_start: new Date(),
        is_active: true,
        week_number: local_date.week(),
        year: local_date.year(),
      },
    ],
  });
}
