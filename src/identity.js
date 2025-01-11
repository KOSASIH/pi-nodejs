// src/identity.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import logger from './utils/logger'; // Assuming you have a logger utility

// Define Mongoose schema for users
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    verified: { type: Boolean, default: false },
});

// Create Mongoose model for users
const User = mongoose.model('User ', userSchema);

class Identity {
    // Create a new user
    async createUser(username, email, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, email, password: hashedPassword });
            await user.save();
            logger.info(`User  created: ${username}`);
            return user;
        } catch (error) {
            logger.error(`Error creating user: ${error.message}`);
            throw new Error('User  creation failed');
        }
    }

    // Authenticate a user
    async authenticateUser(username, password) {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('User not found');
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new Error('Invalid password');
            }

            const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            logger.info(`User  authenticated: ${username}`);
            return token;
        } catch (error) {
            logger.error(`Error authenticating user: ${error.message}`);
            throw new Error('Authentication failed');
        }
    }

    // Verify a user's identity
    async verifyIdentity(userId, verificationCode) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            if (user.verificationCode === verificationCode) {
                user.verified = true;
                await user.save();
                logger.info(`User  verified: ${user.username}`);
                return user;
            } else {
                throw new Error('Invalid verification code');
            }
        } catch (error) {
            logger.error(`Error verifying user identity: ${error.message}`);
            throw new Error('Verification failed');
        }
    }

    // Reset a user's password
    async resetPassword(userId, newPassword) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();
            logger.info(`User  password reset: ${user.username}`);
            return user;
        } catch (error) {
            logger.error(`Error resetting user password: ${error.message}`);
            throw new Error('Password reset failed');
        }
    }

    // Check if a user is authenticated
    async isAuthenticated(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);
            if (!user) {
                throw new Error('User not found');
            }
            logger.info(`User  authenticated: ${user.username}`);
            return user;
        } catch (error) {
            logger.error(`Error checking user authentication: ${error.message}`);
            throw new Error('Authentication failed');
        }
    }
}

export default new Identity();
