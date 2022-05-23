import {createUser, loggedUser} from './factories/authFactory.js'
import supertest from 'supertest'
import { prisma } from '../database.js';
import app from '../app.js'
import userServices from '../services/userServices.js';
import { sign } from 'crypto';

const agent = supertest(app);

describe('POST /sign-up', () => {

    beforeEach(async () => {
       await prisma.$executeRaw`TRUNCATE TABLE users, "animesUsers";`
    }); 

    it('should answer with status 201 when credentials are valid', async () => {
        const userData = await createUser();
        console.log(userData);
        const response = await agent.post('/sign-up').send({email: userData.user.email, password: userData.user.password});
        expect(response.status).toBe(201);
    }),

    it('should answer with status 201 when credentials are valid', async () => {
        const user = await loggedUser();
        const response = await agent.post('/sign-in').send({email: user.email, password: user.password});
        const {token} = response.body;
        expect(typeof token).toBe('string');
    })
})

