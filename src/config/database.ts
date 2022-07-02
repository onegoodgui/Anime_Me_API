import { PrismaClient } from "@prisma/client";

export let prisma: PrismaClient;

export const connectDb = (): void => {
  prisma = new PrismaClient();
};

export async function disconnectDb(): Promise<void> {
  await prisma?.$disconnect();
}
