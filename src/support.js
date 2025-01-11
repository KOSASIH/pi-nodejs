// src/support.js

import axios from 'axios';
import logger from './utils/logger'; // Assuming you have a logger utility

class Support {
    private apiUrl: string;
    private apiKey: string;

    constructor(apiUrl: string, apiKey: string) {
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }

    // Method to create a new support ticket
    public async createTicket(userId: string, subject: string, description: string): Promise<string> {
        const ticketData = {
            userId,
            subject,
            description,
            status: 'open',
        };

        try {
            const response = await axios.post(`${this.apiUrl}/tickets`, ticketData, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            logger.info(`Support ticket created: ${response.data.id}`);
            return response.data.id; // Return the ticket ID
        } catch (error) {
            logger.error(`Error creating support ticket: ${error.message}`);
            throw new Error('Support ticket creation failed');
        }
    }

    // Method to update a support ticket
    public async updateTicket(ticketId: string, updates: any): Promise<void> {
        try {
            const response = await axios.put(`${this.apiUrl}/tickets/${ticketId}`, updates, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                },
            });
            logger.info(`Support ticket updated: ${response.data.id}`);
        } catch (error) {
            logger.error(`Error updating support ticket: ${error.message}`);
            throw new Error('Support ticket update failed');
        }
    }

    // Method to delete a support ticket
    public async deleteTicket(ticketId: string): Promise<void> {
        try {
            await axios.delete(`${this.apiUrl}/tickets/${ticketId}`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                },
            });
            logger.info(`Support ticket deleted: ${ticketId}`);
        } catch (error) {
            logger.error(`Error deleting support ticket: ${error.message}`);
            throw new Error('Support ticket deletion failed');
        }
    }

    // Method to get a support ticket by ID
    public async getTicket(ticketId: string): Promise<any> {
        try {
            const response = await axios.get(`${this.apiUrl}/tickets/${ticketId}`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                },
            });
            logger.info(`Support ticket retrieved: ${response.data.id}`);
            return response.data;
        } catch (error) {
            logger.error(`Error retrieving support ticket: ${error.message}`);
            throw new Error('Support ticket retrieval failed');
        }
    }

    // Method to get all support tickets for a user
    public async getUser Tickets(userId: string): Promise<any[]> {
        try {
            const response = await axios.get(`${this.apiUrl}/tickets?userId=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                },
            });
            logger.info(`Retrieved tickets for user: ${userId}`);
            return response.data;
        } catch (error) {
            logger.error(`Error retrieving user tickets: ${error.message}`);
            throw new Error('User  tickets retrieval failed');
        }
    }

    // Method to notify users about ticket updates
    private async notifyUser (ticketId: string, message: string): Promise<void> {
        // Implement notification logic (e.g., email, SMS)
        logger.info(`Notification sent for ticket ${ticketId}: ${message}`);
    }

    // Method to search and filter tickets
    public async searchTickets(query: string): Promise<any[]> {
        try {
            const response = await axios.get(`${this.apiUrl}/tickets/search`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                },
                params: { query },
            });
            logger.info(`Search results for query "${query}": ${response.data.length} tickets found`);
            return response.data;
        } catch (error) {
            logger.error(`Error searching tickets: ${error.message}`);
            throw new Error ('Ticket search failed');
        }
    }
}

export default Support;
