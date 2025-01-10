const PiNetwork = require('pi-network-sdk'); // Hypothetical SDK
const logger = require('../utils/logger'); // Custom logger module

const sendPi = async (recipient, amount) => {
    try {
        const transaction = await PiNetwork.send(recipient, amount);
        logger.info(`Transaction successful: ${transaction.id}`);
        return transaction;
    } catch (error) {
        logger.error(`Transaction failed: ${error.message}`);
        throw error;
    }
};

const getTransactionHistory = async (userId) => {
    return await PiNetwork.getTransactionHistory(userId);
};

module.exports = { sendPi, getTransactionHistory };
