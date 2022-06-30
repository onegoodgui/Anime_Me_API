import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/database";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
export function setNewUser() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

export async function createNewUser(user: Omit<User, "id">) {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  return prisma.user.create({
    data: {
      email: user.email,
      password: hashedPassword,
    },
  });
}
