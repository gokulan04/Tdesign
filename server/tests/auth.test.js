import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app.js';
import User from '../src/models/User.js';

let mongoServer;

beforeAll(async () => {
    process.env.JWT_SECRET = 'testsecret';
    process.env.JWT_EXPIRES_IN = '1h';
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

beforeEach(async () => {
    await User.deleteMany({});
});

describe('Auth API', () => {
    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Test User',
                    email: 'test@test.com',
                    password: 'password123'
                });

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('token');
            expect(res.body.user.email).toBe('test@test.com');
        });

        it('should not register user with existing email', async () => {
            await User.create({
                name: 'Existing User',
                email: 'test@test.com',
                password: 'password123'
            });

            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'New User',
                    email: 'test@test.com',
                    password: 'password123'
                });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('User already exists');
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login existing user', async () => {
            // Manual registration to bypass register login logic
            const bcrypt = (await import('bcrypt')).default;
            const hashedPassword = await bcrypt.hash('password123', 10);
            await User.create({
                name: 'Login User',
                email: 'login@test.com',
                password: hashedPassword
            });

            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'login@test.com',
                    password: 'password123'
                });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
        });

        it('should fail with wrong password', async () => {
            const bcrypt = (await import('bcrypt')).default;
            const hashedPassword = await bcrypt.hash('password123', 10);
            await User.create({
                name: 'Login User',
                email: 'login@test.com',
                password: hashedPassword
            });

            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'login@test.com',
                    password: 'wrongpassword'
                });

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('Invalid passowrd');
        });
    });
});
