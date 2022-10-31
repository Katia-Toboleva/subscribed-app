import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const data = Array.from({ length: 10 }).map(() => ({
  username: faker.internet.userName(),
  name: faker.name.firstName(),
  surname: faker.name.lastName(),
  title: faker.name.prefix(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  phoneNumber: faker.phone.number(),
  profileImage: faker.image.imageUrl(),   
  role: faker.helpers.arrayElement(['GUEST', 'MEMBER', 'ADMIN']),
}));

async function main() {
  await prisma.user.createMany({
    data,
  });
};

main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect;
})