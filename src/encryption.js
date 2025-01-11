// src/encryption.js

import crypto from 'crypto';
import logger from './utils/logger'; // Assuming you have a logger utility

class Encryption {
    constructor() {
        this.algorithm = process.env.ENCRYPTION_ALGORITHM || 'aes-256-cbc'; // Default algorithm
        this.key = crypto.randomBytes(32); // Generate a random key (32 bytes for AES-256)
        this.iv = crypto.randomBytes(16); // Initialization vector
    }

    // Method to encrypt data
    encrypt(data) {
        try {
            const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
            let encrypted = cipher.update(data, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            logger.info('Data encrypted successfully.');
            return {
                iv: this.iv.toString('hex'), // Return the IV with the encrypted data
                encryptedData: encrypted,
            };
        } catch (error) {
            logger.error(`Encryption error: ${error.message}`);
            throw new Error('Encryption failed');
        }
    }

    // Method to decrypt data
    decrypt(encryptedData, iv) {
        try {
            const decipher = crypto.createDecipheriv(this.algorithm, this.key, Buffer.from(iv, 'hex'));
            let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            logger.info('Data decrypted successfully.');
            return decrypted;
        } catch (error) {
            logger.error(`Decryption error: ${error.message}`);
            throw new Error('Decryption failed');
        }
    }

    // Method to generate a new key (for asymmetric encryption)
    generateKeyPair() {
        try {
            const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 2048,
            });
            logger.info('RSA key pair generated successfully.');
            return { publicKey, privateKey };
        } catch (error) {
            logger.error(`Key generation error: ${error.message}`);
            throw new Error('Key generation failed');
        }
    }

    // Method to encrypt data using RSA public key
    rsaEncrypt(data, publicKey) {
        try {
            const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(data));
            logger.info('Data encrypted with RSA successfully.');
            return encryptedData.toString('base64');
        } catch (error) {
            logger.error(`RSA encryption error: ${error.message}`);
            throw new Error('RSA encryption failed');
        }
    }

    // Method to decrypt data using RSA private key
    rsaDecrypt(encryptedData, privateKey) {
        try {
            const decryptedData = crypto.privateDecrypt(privateKey, Buffer.from(encryptedData, 'base64'));
            logger.info('Data decrypted with RSA successfully.');
            return decryptedData.toString('utf8');
        } catch (error) {
            logger.error(`RSA decryption error: ${error.message}`);
            throw new Error('RSA decryption failed');
        }
    }

    // Method to hash data for integrity checks
    hash(data) {
        try {
            const hash = crypto.createHash('sha256').update(data).digest('hex');
            logger.info('Data hashed successfully.');
            return hash;
        } catch (error) {
            logger.error(`Hashing error: ${error.message}`);
            throw new Error('Hashing failed');
        }
    }
}

export default new Encryption();
