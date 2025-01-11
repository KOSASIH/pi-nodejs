// src/utils.ts

import winston from 'winston'; // For logging
import { ErrorResponse } from './types'; // Importing types

// Logger configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

// Function to log information
export const logInfo = (message: string, context?: Record<string, any>): void => {
    logger.info(message, context);
};

// Function to log warnings
export const logWarning = (message: string, context?: Record<string, any>): void => {
    logger.warn(message, context);
};

// Function to log errors
export const logError = (message: string, context?: Record<string, any>): void => {
    logger.error(message, context);
};

// Function to handle errors and return a standardized response
export const handleError = (error: any): ErrorResponse => {
    if (error.isAxiosError) {
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
};

// Function to validate email format
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Function to validate required fields
export const validateRequiredFields = (data: Record<string, any>, requiredFields: string[]): boolean => {
    for (const field of requiredFields) {
        if (!data[field]) {
            return false; // Return false if any required field is missing
        }
    }
    return true; // All required fields are present
};

// Function to format dates
export const formatDate = (date: Date, format: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

// Function to generate a unique identifier (UUID)
export const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

// Function to deep clone an object
export const deepClone = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
};

// Exporting the logger for external use
export { logger };
