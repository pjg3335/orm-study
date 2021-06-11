import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //   await create();
  //   await update();

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.log(allUsers);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

async function create() {
  await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      posts: {
        create: { title: "Hello world" },
      },
      profile: {
        create: { bio: "I like turtles" },
      },
    },
  });
}

async function update() {
  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  });
  console.log(post);
}
