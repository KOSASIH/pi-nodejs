// src/constants.js

/**
 * Pi Network Configuration Constants
 * This module contains constants related to the Pi Network cryptocurrency, configured as a stablecoin with advanced features.
 * It supports dynamic loading from environment variables for flexibility and security.
 */

// Load environment variables
require('dotenv').config();
const logger = require('./utils/logger'); // Assuming you have a logger utility

// General Configuration
const PI_NETWORK_VERSION = process.env.PI_NETWORK_VERSION || "2.0.0";  // Current version of the Pi Network application
const PI_NETWORK_RELEASE_DATE = process.env.PI_NETWORK_RELEASE_DATE || "2025-01-10";  // Release date of the current version
const PI_NETWORK_NAME = process.env.PI_NETWORK_NAME || "Pi Network";  // Name of the application
const PI_NETWORK_DESCRIPTION = process.env.PI_NETWORK_DESCRIPTION || "The most advanced data access and analysis platform for the Pi Network.";  // Description of the application

// Pi Coin Configuration
const PI_COIN_SYMBOL = process.env.PI_COIN_SYMBOL || "PI";  // Symbol for Pi Coin
const PI_COIN_VALUE = parseFloat(process.env.PI_COIN_VALUE) || 314159.00;  // Fixed value of Pi Coin in USD
const PI_COIN_SUPPLY = parseInt(process.env.PI_COIN_SUPPLY) || 100_000_000_000;  // Total supply of Pi Coin
const PI_COIN_DYNAMIC_SUPPLY = process.env.PI_COIN_DYNAMIC_SUPPLY === 'true';  // Disable dynamic supply adjustments for stability

// Stablecoin Mechanisms
const PI_COIN_IS_STABLECOIN = true;  // Indicates that Pi Coin is a stablecoin
const PI_COIN_STABILITY_MECHANISM = process.env.PI_COIN_STABILITY_MECHANISM || "Collateralized";  // Mechanism for maintaining stability
const PI_COIN_COLLATERAL_RATIO = parseFloat(process.env.PI_COIN_COLLATERAL_RATIO) || 1.5;  // Collateralization ratio
const PI_COIN_RESERVE_ASSETS = (process.env.PI_COIN_RESERVE_ASSETS || "USD,BTC,ETH").split(',');  // List of assets backing the stablecoin

// Transaction Fees
const PI_COIN_TRANSACTION_FEE = parseFloat(process.env.PI_COIN_TRANSACTION_FEE) || 0.005;  // Reduced transaction fee in USD for higher adoption
const PI_COIN_TRANSACTION_FEE_ADJUSTMENT = parseFloat(process.env.PI_COIN_TRANSACTION_FEE_ADJUSTMENT) || 0.0005;  // Dynamic adjustment factor for transaction fees

// Block Configuration
const PI_COIN_BLOCK_TIME = parseInt(process.env.PI_COIN_BLOCK_TIME) || 5;  // Average block time in seconds for faster transactions
const PI_COIN_BLOCK_TIME_ADJUSTMENT = parseFloat(process.env.PI_COIN_BLOCK_TIME_ADJUSTMENT) || 0.5;  // Adjustment factor for block time based on network load

// Mining Configuration
const PI_COIN_MINING_DIFFICULTY = parseInt(process.env.PI_COIN_MINING_DIFFICULTY) || 500;  // Reduced difficulty for increased mining participation
const PI_COIN_MINING_DIFFICULTY_ADJUSTMENT = parseFloat(process.env.PI_COIN_MINING_DIFFICULTY_ADJUSTMENT) || 0.05;  // Adjustment factor for mining difficulty
const PI_COIN_MINING_REWARD = parseInt(process.env.PI_COIN_MINING_REWARD) || 25;  // Increased reward for mining a block
const PI_COIN_MINING_REWARD_ADJUSTMENT = parseFloat(process.env.PI_COIN_MINING_REWARD_ADJUSTMENT) || 1.0;  // Dynamic adjustment for mining rewards

// Network Protocol
const PI_COIN_NETWORK_PROTOCOL = process.env.PI_COIN_NETWORK_PROTOCOL || "PoS";  // Proof of Stake for energy efficiency
const PI_COIN_NETWORK_PROTOCOL_VERSION = process.env.PI_COIN_NETWORK_PROTOCOL_VERSION || "2.0.0";  // Updated version of the network protocol

// Transaction Configuration
const PI_COIN_MAX_TRANSACTION_SIZE = parseInt(process.env.PI_COIN_MAX_TRANSACTION_SIZE) ||  2_000_000;  // Increased maximum transaction size in bytes
const PI_COIN_DECIMALS = parseInt(process.env.PI_COIN_DECIMALS) || 18;  // Number of decimal places for Pi Coin

// Genesis Block Configuration
const PI_COIN_GENESIS_BLOCK_TIMESTAMP = process.env.PI_COIN_GENESIS_BLOCK_TIMESTAMP || "2025-01-01T00:00:00Z";  // Timestamp of the genesis block

// Governance Model
const PI_COIN_GOVERNANCE_MODEL = process.env.PI_COIN_GOVERNANCE_MODEL || "Decentralized";  // Governance model for Pi Coin
const PI_COIN_GOVERNANCE_VOTING_PERIOD = parseInt(process.env.PI_COIN_GOVERNANCE_VOTING_PERIOD) || 1_209_600;  // Voting period in seconds, 2 weeks

// Security Features
const PI_COIN_ENCRYPTION_ALGORITHM = process.env.PI_COIN_ENCRYPTION_ALGORITHM || "AES-512";  // Enhanced encryption algorithm for securing transactions
const PI_COIN_HASHING_ALGORITHM = process.env.PI_COIN_HASHING_ALGORITHM || "SHA-3";  // Advanced hashing algorithm for block verification
const PI_COIN_SIGNATURE_SCHEME = process.env.PI_COIN_SIGNATURE_SCHEME || "EdDSA";  // More secure digital signature scheme for transaction signing
const PI_COIN_SECURITY_AUDIT_INTERVAL = parseInt(process.env.PI_COIN_SECURITY_AUDIT_INTERVAL) || 43200;  // Security audit interval in seconds, 12 hours

// Network Parameters
const PI_COIN_MAX_PEERS = parseInt(process.env.PI_COIN_MAX_PEERS) || 500;  // Increased maximum number of peers in the network
const PI_COIN_NODE_TIMEOUT = parseInt(process.env.PI_COIN_NODE_TIMEOUT) || 15;  // Reduced timeout for node responses in seconds
const PI_COIN_CONNECTION_RETRY_INTERVAL = parseInt(process.env.PI_COIN_CONNECTION_RETRY_INTERVAL) || 2;  // Reduced retry interval for node connections in seconds

// Staking Parameters
const PI_COIN_STAKING_REWARD = parseFloat(process.env.PI_COIN_STAKING_REWARD) || 0.1;  // Reward for staking Pi Coins
const PI_COIN_MINIMUM_STAKE = parseInt(process.env.PI_COIN_MINIMUM_STAKE) || 100;  // Minimum amount required to stake
const PI_COIN_STAKING_PERIOD = parseInt(process.env.PI_COIN_STAKING_PERIOD) || 604800;  // Staking period in seconds, 1 week
const PI_COIN_STAKING_REWARD_ADJUSTMENT = parseFloat(process.env.PI_COIN_STAKING_REWARD_ADJUSTMENT) || 0.01;  // Dynamic adjustment for staking rewards

// Advanced Features
const PI_COIN_SMART_CONTRACT_SUPPORT = process.env.PI_COIN_SMART_CONTRACT_SUPPORT === 'true';  // Enable smart contract functionality
const PI_COIN_INTEROPERABILITY = process.env.PI_COIN_INTEROPERABILITY === 'true';  // Support for cross-chain transactions
const PI_COIN_MAX_CONTRACT_SIZE = parseInt(process.env.PI_COIN_MAX_CONTRACT_SIZE) || 1_000_000;  // Maximum size for smart contracts in bytes
const PI_COIN_ORACLE_SUPPORT = process.env.PI_COIN_ORACLE_SUPPORT === 'true';  // Enable oracle support for real-world data integration
const PI_COIN_GOVERNANCE_TOKEN = process.env.PI_COIN_GOVERNANCE_TOKEN || "GOV";  // Token used for governance voting
const PI_COIN_VOTING_WEIGHT = process.env.PI_COIN_VOTING_WEIGHT || "proportional";  // Voting weight based on the amount of tokens held

// Environmental Considerations
const PI_COIN_CARBON_CREDITS = process.env.PI_COIN_CARBON_CREDITS === 'true';  // Enable carbon credit tracking for sustainability
const PI_COIN_ENERGY_CONSUMPTION_LIMIT = parseInt(process.env.PI_COIN_ENERGY_CONSUMPTION_LIMIT) || 1000;  // Maximum energy consumption for network operations in kWh

// User Experience Enhancements
const PI_COIN_USER_FRIENDLY_INTERFACE = process.env.PI_COIN_USER_FRIENDLY_INTERFACE === 'true';  // Flag for user-friendly interface
const PI_COIN_MULTILINGUAL_SUPPORT = process.env.PI_COIN_MULTILINGUAL_SUPPORT === 'true';  // Enable support for multiple languages
const PI_COIN_TUTORIALS_AVAILABLE = process.env.PI_COIN_TUTORIALS_AVAILABLE === 'true';  // Availability of tutorials for new users

// API Configuration
const PI_COIN_API_VERSION = process.env.PI_COIN_API_VERSION || "1.0";  // Current version of the API
const PI_COIN_API_RATE_LIMIT = parseInt(process.env.PI_COIN_API_RATE_LIMIT) || 1000;  // Rate limit for API requests per hour

// Logging and Monitoring
const PI_COIN_LOGGING_LEVEL = process.env.PI_COIN_LOGGING_LEVEL || "INFO";  // Default logging level
const PI_COIN_MONITORING_INTERVAL = parseInt(process.env.PI_COIN_MONITORING_INTERVAL) || 60;  // Monitoring interval in seconds

// Validation Function
const validateConstants = () => {
    const errors = [];
    if (PI_COIN_VALUE <= 0) errors.push("PI_COIN_VALUE must be greater than 0");
    if (PI_COIN_SUPPLY <= 0) errors.push("PI_COIN_SUPPLY must be greater than 0");
    if (PI_COIN_COLLATERAL_RATIO <= 0) errors.push("PI_COIN_COLLATERAL_RATIO must be greater than 0");
    if (PI_COIN_MINING_DIFFICULTY <= 0) errors.push("PI_COIN_MINING_DIFFICULTY must be greater than 0");
    if (PI_COIN_MINING_REWARD <= 0) errors.push("PI_COIN_MINING_REWARD must be greater than 0");
    if (PI_COIN_STAKING_REWARD < 0) errors.push("PI_COIN_STAKING_REWARD cannot be negative");
    if (PI_COIN_MINIMUM_STAKE <= 0) errors.push("PI_COIN_MINIMUM_STAKE must be greater than 0");

    if (errors.length > 0) {
        logger.error("Validation Errors: ", errors);
        throw new Error(errors.join(", "));
    }
};

// Validate constants on module load
try {
    validateConstants();
    logger.info("Constants validated successfully.");
} catch (error) {
    logger.error("Failed to validate constants: ", error.message);
    process.exit(1);  // Exit the process if validation fails
}

// Exporting constants
module.exports = {
    PI_NETWORK_VERSION,
    PI_NETWORK_RELEASE_DATE,
    PI_NETWORK_NAME,
    PI_NETWORK_DESCRIPTION,
    PI_COIN_SYMBOL,
    PI_COIN_VALUE,
    PI_COIN_SUPPLY,
    PI_COIN_DYNAMIC_SUPPLY,
    PI_COIN_IS_STABLECOIN,
    PI_COIN_STABILITY_MECHANISM,
    PI_COIN_COLLATERAL_RATIO,
    PI_COIN_RESERVE_ASSETS,
    PI_COIN_TRANSACTION_FEE,
    PI_COIN_TRANSACTION_FEE_ADJUSTMENT,
    PI_COIN_BLOCK_TIME,
    PI_COIN_BLOCK_TIME_ADJUSTMENT,
    PI_COIN_MINING_DIFFICULTY,
    PI_COIN_MINING_DIFFICULTY_ADJUSTMENT,
    PI_COIN_MINING_REWARD,
    PI_COIN_MINING_REWARD_ADJUSTMENT,
    PI_COIN_NETWORK_PROTOCOL,
    PI_COIN_NETWORK_PROTOCOL_VERSION,
    PI_COIN_MAX_TRANSACTION_SIZE,
    PI_COIN_DECIMALS,
    PI_COIN_GENESIS_BLOCK_TIMESTAMP,
    PI_COIN_GOVERNANCE_MODEL,
    PI_COIN_GOVERNANCE_VOTING_PERIOD,
    PI_COIN_ENCRYPTION_ALGORITHM,
    PI_COIN_HASHING_ALGORITHM,
    PI_COIN_SIGNATURE_SCHEME,
    PI_COIN_SECURITY_AUDIT_INTERVAL,
    PI_COIN_MAX_PEERS,
    PI_COIN_NODE_TIMEOUT,
    PI_COIN_CONNECTION_RETRY_INTERVAL,
    PI_COIN_STAKING_REWARD,
    PI_COIN_MINIMUM_STAKE,
    PI_COIN_STAKING_PERIOD,
    PI_COIN_STAKING_REWARD_ADJUSTMENT,
    PI_COIN_SMART_CONTRACT_SUPPORT,
    PI_COIN_INTEROPERABILITY,
    PI_COIN_MAX_CONTRACT_SIZE,
    PI_COIN_ORACLE_SUPPORT,
    PI_COIN_GOVERNANCE_TOKEN,
    PI_COIN_VOTING_WEIGHT,
    PI_COIN_CARBON_CREDITS,
    PI_COIN_ENERGY_CONSUMPTION_LIMIT,
    PI_COIN_USER_FRIENDLY_INTERFACE,
    PI_COIN_MULTILINGUAL_SUPPORT,
    PI_COIN_TUTORIALS_AVAILABLE,
    PI_COIN_API_VERSION,
    PI_COIN_API_RATE_LIMIT,
    PI_COIN_LOGGING_LEVEL,
    PI_COIN_MONITORING_INTERVAL,
};
