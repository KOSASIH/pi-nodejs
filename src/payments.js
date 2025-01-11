// src/payments.js

import axios from 'axios';
import logger from './utils/logger'; // Assuming you have a logger utility

class Payments {
    private apiUrl: string;
    private apiKey: string;

    constructor(apiUrl: string, apiKey: string) {
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }

    // Method to create a new payment
    public async createPayment(amount: number, currency: string, description: string, userId: string): Promise<string> {
        const paymentData = {
            amount,
            currency,
            description,
            userId,
        };

        try {
            const response = await axios.post(`${this.apiUrl}/payments`, paymentData, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            logger.info(`Payment created: ${response.data.id}`);
            return response.data.id; // Return the payment ID
        } catch (error) {
            logger.error(`Error creating payment: ${error.message}`);
            throw new Error('Payment creation failed');
        }
    }

    // Method to process a payment
    public async processPayment(paymentId: string): Promise<void> {
        try {
            const response = await axios.post(`${this.apiUrl}/payments/${paymentId}/process`, {}, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                },
            });
            logger.info(`Payment processed: ${response.data.id}`);
        } catch (error) {
            logger.error(`Error processing payment: ${error.message}`);
            throw new Error('Payment processing failed');
        }
    }

    // Method to get the status of a payment
    public async getPaymentStatus(paymentId: string): Promise<string> {
        try {
            const response = await axios.get(`${this.apiUrl}/payments/${paymentId}`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                },
            });
            logger.info(`Payment status retrieved: ${response.data.status}`);
            return response.data.status; // Return the payment status
        } catch (error) {
            logger.error(`Error retrieving payment status: ${error.message}`);
            throw new Error('Payment status retrieval failed');
        }
    }

    // Method to process a refund
    public async processRefund(paymentId: string): Promise<void> {
        try {
            const response = await axios.post(`${this.apiUrl}/payments/${paymentId}/refund`, {}, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                },
            });
            logger.info(`Refund processed for payment: ${paymentId}`);
        } catch (error) {
            logger.error(`Error processing refund: ${error.message}`);
            throw new Error('Refund processing failed');
        }
    }

    // Method to handle incoming webhooks from payment gateways
    public async handleWebhook(req: any): Promise<void> {
        const event = req.body;

        // Handle different event types
        switch (event.type) {
            case 'payment.completed':
                logger.info(`Payment completed: ${event.data.id}`);
                // Update payment status in your database
                break;
            case 'payment.failed':
                logger.warn(`Payment failed: ${event.data.id}`);
                // Update payment status in your database
                break;
            case 'refund.completed':
                logger.info(`Refund completed: ${event.data.id}`);
                // Update refund status in your database
                break;
            default:
                logger.warn(`Unhandled event type: ${event.type}`);
        }
    }
}

export default Payments;
