import app, { close, init } from "../../src/app";
import supertest from "supertest";
import * as usersFactory from "../factories/usersFactory";
import * as jwt from "jsonwebtoken";
import * as userController from "../../src/controllers/userController";
import { prisma } from "../../src/config/database";

beforeAll(async () => {
  await init();
});

afterAll(async () => {
  await close();
});

const server = supertest(app);

describe("POST - /sign-up", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users, "animesUsers";`;
  });

  it("should return status 201 when valid e-mail is provided", async () => {
    const newUser = usersFactory.setNewUser();
    const result = await server.post("/sign-up").send(newUser);

    expect(result.status).toEqual(201);
  });

  it("should return status 422 and an error message when invalid e-mail is provided", async () => {
    const newUser = usersFactory.setNewUser();
    newUser.email = "emailerrado@email";

    const result = await server.post("/sign-up").send(newUser);

    expect(result.status).toEqual(422);
    expect(result.text).toBe('"email" must be a valid email');
  });

  it("should return status 409 when e-mail already exists in DB", async () => {
    const newUser = usersFactory.setNewUser();
    await server.post("/sign-up").send(newUser);
    const result = await server.post("/sign-up").send(newUser);

    expect(result.status).toBe(409);
    expect(result.text).toBe("Email must be unique");
  });
});

describe("POST - /sign-in", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users, "animesUsers";`;
  });
  describe("when valid user is provided", () => {
    const user = usersFactory.setNewUser();

    it("should return status 401 if not in the DB ", async () => {
      const result = await server.post("/sign-in").send(user);

      expect(result.status).toEqual(401);
      expect(result.text).toBe("User not registered");
    });

    it("should return status 401 if password does not match with the one in the DB ", async () => {
      await usersFactory.createNewUser(user);

      const result = await server
        .post("/sign-in")
        .send({ ...user, password: user.password + "123" });

      expect(result.status).toEqual(401);
      expect(result.text).toBe("Invalid password");
    });

    it("should return status 200 if both email and password matches the one in DB ", async () => {
      await usersFactory.createNewUser(user);

      const result = await server.post("/sign-in").send(user);

      expect(result.status).toEqual(200);
    });
  });
});
