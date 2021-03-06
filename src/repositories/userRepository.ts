import { prisma } from "../config/database.js";
import { CreateUserData } from "../services/userServices.js";

async function findById(id: number) {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}

async function findByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email: email,
    },
  });
}

async function insert(createUserData: CreateUserData) {
  return prisma.user.create({
    data: createUserData,
  });
}

async function truncate() {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
}

const userRepository = {
  findByEmail,
  findById,
  insert,
  truncate,
};

export default userRepository;
