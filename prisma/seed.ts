import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  /**
   * ROLES
   */
  await prisma.role.upsert({
    create: {
      type: 'ADMIN',
    },
    where: { type: 'ADMIN' },
    update: {},
  });

  await prisma.role.upsert({
    create: {
      type: 'USER',
    },
    where: { type: 'USER' },
    update: {},
  });

  await prisma.role.upsert({
    create: {
      type: 'MODERATOR',
    },
    update: {},
    where: { type: 'MODERATOR' },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
