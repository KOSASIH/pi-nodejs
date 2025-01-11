// src/security.js

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import logger from './utils/logger'; // Assuming you have a logger utility

class Security {
    private jwtSecret: string;
    private jwtExpiration: string;

    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use a secure secret
        this.jwtExpiration = process.env.JWT_EXPIRATION || '1h'; // Token expiration time
    }

    // Method to hash a password
    public async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    // Method to compare a password with a hash
    public async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    // Method to generate a JWT token
    public generateToken(userId: string, role: string): string {
        const token = jwt.sign({ userId, role }, this.jwtSecret, { expiresIn: this.jwtExpiration });
        logger.info(`Token generated for user: ${userId}`);
        return token;
    }

    // Middleware to authenticate a user
    public authenticate(req: Request, res: Response, next: NextFunction): void {
        const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        jwt.verify(token, this.jwtSecret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.userId = decoded.userId; // Attach user ID to request
            req.role = decoded.role; // Attach user role to request
            next();
        });
    }

    // Middleware to authorize access based on user role
    public authorize(roles: string[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            if (!roles.includes(req.role)) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            next();
        };
    }

    // Method to validate user input
    public validateInput(data: any): void {
        // Implement input validation logic (e.g., using Joi or express-validator)
        // Example: if (!data.email) throw new Error('Email is required');
    }

    // Method to log security events
    public logSecurityEvent(event: string, details: any): void {
        logger.info(`Security Event: ${event}`, details);
    }

    // Method to implement rate limiting (placeholder)
    public rateLimit(req: Request, res: Response, next: NextFunction): void {
        // Implement rate limiting logic (e.g., using express-rate-limit)
        next();
    }
}

export default new Security();
