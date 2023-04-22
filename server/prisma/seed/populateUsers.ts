import prisma from './prisma.module';
import { sha512 } from 'js-sha512';

export async function populateUsers() {
  await prisma.users.createMany({
    data: [
      {
        id: 1,
        firstname: 'Bartłomiej',
        lastname: 'Strama',
        email: 'kontakt@bstrama.com',
        password: sha512('12345678'),
      },
      {
        id: 2,
        firstname: 'test',
        lastname: 'test-lastname',
        email: 'test@test.test',
        password: sha512('12345678'),
      },
      {
        id: 3,
        firstname: 'test2',
        lastname: 'test-lastname2',
        email: 'test@example.com',
        password: sha512('12345678'),
      },
    ],
    skipDuplicates: true,
  });
}
