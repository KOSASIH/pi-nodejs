// src/userManagement.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import logger from './utils/logger'; // Assuming you have a logger utility
import { UserProfile, UserRole, ErrorResponse } from './types'; // Importing types

class UserManagement {
    private apiUrl: string;
    private jwtSecret: string;

    constructor(apiUrl: string, jwtSecret: string) {
        this.apiUrl = apiUrl;
        this.jwtSecret = jwtSecret;
    }

    // Method to register a new user
    public async registerUser (username: string, email: string, password: string): Promise<UserProfile> {
        const hashedPassword = await this.hashPassword(password);
        const userData = { username, email, password: hashedPassword };

        try {
            const response = await axios.post(`${this.apiUrl}/users/register`, userData);
            logger.info(`User  registered: ${response.data.id}`);
            return response.data; // Return the created user profile
        } catch (error) {
            logger.error(`Error registering user: ${error.message}`);
            throw this.handleError(error);
        }
    }

    // Method to authenticate a user
    public async authenticateUser (email: string, password: string): Promise<string> {
        try {
            const response = await axios.post(`${this.apiUrl}/users/login`, { email, password });
            logger.info(`User  authenticated: ${response.data.userId}`);
            return this.generateToken(response.data.userId, response.data.role); // Return JWT token
        } catch (error) {
            logger.error(`Error authenticating user: ${error.message}`);
            throw this.handleError(error);
        }
    }

    // Method to get user profile
    public async getUser Profile(userId: string): Promise<UserProfile> {
        try {
            const response = await axios.get(`${this.apiUrl}/users/${userId}`);
            logger.info(`User  profile retrieved: ${response.data.id}`);
            return response.data; // Return user profile
        } catch (error) {
            logger.error(`Error retrieving user profile: ${error.message}`);
            throw this.handleError(error);
        }
    }

    // Method to update user profile
    public async updateUser Profile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
        try {
            const response = await axios.put(`${this.apiUrl}/users/${userId}`, updates);
            logger.info(`User  profile updated: ${response.data.id}`);
            return response.data; // Return updated user profile
        } catch (error) {
            logger.error(`Error updating user profile: ${error.message}`);
            throw this.handleError(error);
        }
    }

    // Method to change user password
    public async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
        const hashedNewPassword = await this.hashPassword(newPassword);
        try {
            await axios.put(`${this.apiUrl}/users/${userId}/change-password`, { oldPassword, newPassword: hashedNewPassword });
            logger.info(`Password changed for user: ${userId}`);
        } catch (error) {
            logger.error(`Error changing password: ${error.message}`);
            throw this.handleError(error);
        }
    }

    // Method to reset user password
    public async resetPassword(email: string): Promise<void> {
        try {
            await axios.post(`${this.apiUrl}/users/reset-password`, { email });
            logger.info(`Password reset email sent to: ${email}`);
        } catch (error) {
            logger.error(`Error sending password reset email: ${error.message}`);
            throw this.handleError(error);
        }
    }

    // Method to generate JWT token
    private generateToken(userId: string, role: UserRole): string {
        return jwt.sign({ userId, role }, this.jwtSecret, { expiresIn: '1h' });
    }

    // Method to hash a password
    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    // // Method to handle errors
    private handleError(error: any): ErrorResponse {
        if (axios.isAxiosError(error)) {
            return {
                code: error.response?.status || 500,
                message: error.response?.data?.message || 'An error occurred',
                details: error.message,
            };
        }
        return {
            code: 500,
            message: 'An unexpected error occurred',
            details: error.message,
        };
    }
}

export default UserManagement;
