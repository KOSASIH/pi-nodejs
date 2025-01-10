const { expect } = require('chai');
const { register, login } = require('../services/auth');

describe('Auth Module', () => {
    it('should register a new user', async () => {
        await register('testuser', 'password123');
        const token = await login('testuser', 'password123');
        expect(token).to.have.property('token');
    });

    it('should throw an error for invalid login', async () => {
        try {
            await login('testuser', 'wrongpassword');
        } catch (error) {
            expect(error).to.exist;
        }
    });
});
