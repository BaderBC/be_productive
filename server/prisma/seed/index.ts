import { populateUsers } from './populateUsers';
import { populateActivities } from './populateActivities';
Promise.all([populateUsers(), populateActivities()]).then(() => {
  console.log('successfully populated db');
});
