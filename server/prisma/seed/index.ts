import prisma from './prisma.module';
import { populateUsers } from './populateUsers';
import { populateActivities } from './populateActivities';
import { populateActivityWeekSession } from './populateActivityWeekSession';
import { updateIdSequence } from './updateIdSequence';
prisma
  .$transaction([
    populateUsers(),
    populateActivities(),
    populateActivityWeekSession(),
    ...updateIdSequence(),
  ])
  .then(() => {
    console.log('successfully populated db');
  });
