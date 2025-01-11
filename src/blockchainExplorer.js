// src/blockchainExplorer.js

import axios from 'axios'; // Assuming you're using axios for HTTP requests
import logger from './utils/logger'; // Assuming you have a logger utility
import NodeCache from 'node-cache'; // For caching

class BlockchainExplorer {
    constructor() {
        this.cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes
        this.apiBaseUrl = process.env.BLOCKCHAIN_API_URL || 'https://api.blockchain.com/v3'; // Example API URL
    }

    async getTransaction(transactionId) {
        // Validate transactionId format
        if (!this.isValidTransactionId(transactionId)) {
            throw new Error('Invalid transaction ID format');
        }

        // Check cache first
        const cachedTransaction = this.cache.get(transactionId);
        if (cachedTransaction) {
            logger.info(`Retrieved transaction ${transactionId} from cache.`);
            return cachedTransaction;
        }

        try {
            const response = await axios.get(`${this.apiBaseUrl}/transactions/${transactionId}`);
            this.cache.set(transactionId, response.data); // Cache the result
            logger.info(`Fetched transaction ${transactionId} from API.`);
            return response.data;
        } catch (error) {
            logger.error(`Error fetching transaction ${transactionId}: ${error.message}`);
            throw new Error('Failed to retrieve transaction details');
        }
    }

    async getBlock(blockNumber) {
        // Validate blockNumber format
        if (!this.isValidBlockNumber(blockNumber)) {
            throw new Error('Invalid block number format');
        }

        // Check cache first
        const cachedBlock = this.cache.get(blockNumber);
        if (cachedBlock) {
            logger.info(`Retrieved block ${blockNumber} from cache.`);
            return cachedBlock;
        }

        try {
            const response = await axios.get(`${this.apiBaseUrl}/blocks/${blockNumber}`);
            this.cache.set(blockNumber, response.data); // Cache the result
            logger.info(`Fetched block ${blockNumber} from API.`);
            return response.data;
        } catch (error) {
            logger.error(`Error fetching block ${blockNumber}: ${error.message}`);
            throw new Error('Failed to retrieve block details');
        }
    }

    async getLatestBlocks(limit = 10) {
        try {
            const response = await axios.get(`${this.apiBaseUrl}/blocks/latest?limit=${limit}`);
            logger.info(`Fetched latest ${limit} blocks from API.`);
            return response.data;
        } catch (error) {
            logger.error(`Error fetching latest blocks: ${error.message}`);
            throw new Error('Failed to retrieve latest blocks');
        }
    }

    // Helper method to validate transaction ID format
    isValidTransactionId(transactionId) {
        // Example validation: check if it's a valid hex string (modify as needed)
        return /^[0-9a-fA-F]{64}$/.test(transactionId);
    }

    // Helper method to validate block number format
    isValidBlockNumber(blockNumber) {
        // Example validation: check if it's a positive integer
        return Number.isInteger(blockNumber) && blockNumber > 0;
    }
}

export default new BlockchainExplorer();
