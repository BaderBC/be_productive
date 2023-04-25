import prisma from './prisma.module';
import { sha512 } from 'js-sha512';

export function populateUsers() {
  return prisma.users.createMany({
    data: [
      {
        id: 1,
        firstname: 'Bartłomiej',
        lastname: 'Strama',
        email: 'kontakt@bstrama.com',
        password: sha512('12345678'),
        timezone: 'Europe/Warsaw',
      },
      {
        id: 2,
        firstname: 'test',
        lastname: 'test-lastname',
        email: 'test@test.test',
        password: sha512('12345678'),
        timezone: 'Europe/Warsaw',
      },
      {
        id: 3,
        firstname: 'test2',
        lastname: 'test-lastname2',
        email: 'test@example.com',
        password: sha512('12345678'),
        timezone: 'Europe/Berlin',
      },
    ],
    skipDuplicates: true,
  });
}
