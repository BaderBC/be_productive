import prisma from './prisma.module';
import { populateUsers } from './populateUsers';
import { populateActivities } from './populateActivities';
import { populateActivityWeekSession } from './populateActivityWeekSession';
prisma
  .$transaction([
    populateUsers(),
    populateActivities(),
    populateActivityWeekSession(),
  ])
  .then(() => {
    console.log('successfully populated db');
  });
