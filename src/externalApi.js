// src/externalApi.js

import axios from 'axios';
import NodeCache from 'node-cache'; // For caching
import logger from './utils/logger'; // Assuming you have a logger utility
import rateLimit from 'axios-rate-limit'; // For rate limiting

// Create a rate-limited Axios instance
const http = rateLimit(axios.create(), { maxRequests: 5, perMilliseconds: 1000 }); // 5 requests per second

// Create a cache instance
const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

class ExternalApi {
    constructor() {
        this.apiBaseUrl = process.env.EXTERNAL_API_BASE_URL || 'https://api.example.com'; // Base URL for the external API
    }

    // Method to make a GET request
    async get(endpoint, params = {}) {
        const cacheKey = `${endpoint}-${JSON.stringify(params)}`;
        const cachedResponse = cache.get(cacheKey);

        if (cachedResponse) {
            logger.info(`Cache hit for GET ${endpoint}`);
            return cachedResponse;
        }

        try {
            const response = await http.get(`${this.apiBaseUrl}${endpoint}`, { params });
            cache.set(cacheKey, response.data); // Cache the response
            logger.info(`GET request to ${endpoint} successful`);
            return response.data;
        } catch (error) {
            logger.error(`Error making GET request to ${endpoint}: ${error.message}`);
            throw new Error('GET request failed');
        }
    }

    // Method to make a POST request
    async post(endpoint, data) {
        try {
            const response = await http.post(`${this.apiBaseUrl}${endpoint}`, data);
            logger.info(`POST request to ${endpoint} successful`);
            return response.data;
        } catch (error) {
            logger.error(`Error making POST request to ${endpoint}: ${error.message}`);
            throw new Error('POST request failed');
        }
    }

    // Method to make a PUT request
    async put(endpoint, data) {
        try {
            const response = await http.put(`${this.apiBaseUrl}${endpoint}`, data);
            logger.info(`PUT request to ${endpoint} successful`);
            return response.data;
        } catch (error) {
            logger.error(`Error making PUT request to ${endpoint}: ${error.message}`);
            throw new Error('PUT request failed');
        }
    }

    // Method to make a DELETE request
    async delete(endpoint) {
        try {
            const response = await http.delete(`${this.apiBaseUrl}${endpoint}`);
            logger.info(`DELETE request to ${endpoint} successful`);
            return response.data;
        } catch (error) {
            logger.error(`Error making DELETE request to ${endpoint}: ${error.message}`);
            throw new Error('DELETE request failed');
        }
    }
}

export default new ExternalApi();
