
import { prisma } from '../../database.js';
import bcrypt from 'bcrypt'
import supertest from 'supertest';
import { User} from '@prisma/client';
import app from '../../app.js';

const agent = supertest(app)

export async function createUser () {
  const user = {
    email: 'thisisthetime@email.com',
    password: "123456",
    hashedPassword: bcrypt.hashSync("123456", 10)
  };

  return {user};
} 

export async function loggedUser(){
  const {user: user} = await createUser();

  await agent.post('/sign-up').send({email: user.email, password: user.password});

  return user
}
