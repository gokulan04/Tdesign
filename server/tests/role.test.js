import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app.js';
import User from '../src/models/User.js';
import jwt from 'jsonwebtoken';

let mongoServer;

const generateTestToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' });
};

beforeAll(async () => {
    process.env.JWT_SECRET = 'testsecret';
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('Authorization Middleware', () => {
    it('should grant access to admin route for admin user', async () => {
        const admin = await User.create({
            name: 'Admin',
            email: 'admin@test.com',
            password: 'pass',
            role: 'admin'
        });

        const token = generateTestToken(admin._id);

        const res = await request(app)
            .get('/api/admin/test')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Admin access granted');
    });

    it('should deny access to admin route for regular user', async () => {
        const user = await User.create({
            name: 'User',
            email: 'user@test.com',
            password: 'pass',
            role: 'user'
        });

        const token = generateTestToken(user._id);

        const res = await request(app)
            .get('/api/admin/test')
            .set('Authorization', `Bearer ${token}`);

        // Error handler should send 403
        expect(res.status).toBe(403);
        expect(res.body.message).toBe('Access denied');
    });

    it('should return 401 if no token provided', async () => {
        const res = await request(app).get('/api/admin/test');
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Not authorized');
    });
});
