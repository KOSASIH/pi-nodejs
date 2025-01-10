# src/constants.py

"""
Pi Network Configuration Constants
This module contains constants related to the Pi Network cryptocurrency, configured as a stablecoin with advanced features.
"""

# General Configuration
PI_NETWORK_VERSION = "2.0.0"  # Current version of the Pi Network application
PI_NETWORK_RELEASE_DATE = "2025-01-10"  # Release date of the current version
PI_NETWORK_NAME = "Pi Network"  # Name of the application
PI_NETWORK_DESCRIPTION = "The most advanced data access and analysis platform for the Pi Network."  # Description of the application

# Pi Coin Configuration
PI_COIN_SYMBOL = "PI"  # Symbol for Pi Coin
PI_COIN_VALUE = 314159.00  # Fixed value of Pi Coin in USD
PI_COIN_SUPPLY = 100_000_000_000  # Total supply of Pi Coin
PI_COIN_DYNAMIC_SUPPLY = False  # Disable dynamic supply adjustments for stability

# Stablecoin Mechanisms
PI_COIN_IS_STABLECOIN = True  # Indicates that Pi Coin is a stablecoin
PI_COIN_STABILITY_MECHANISM = "Collateralized"  # Mechanism for maintaining stability
PI_COIN_COLLATERAL_RATIO = 1.5  # Collateralization ratio (1.5 means $1.50 in collateral for every $1 of Pi Coin)
PI_COIN_RESERVE_ASSETS = ["USD", "BTC", "ETH"]  # List of assets backing the stablecoin

# Transaction Fees
PI_COIN_TRANSACTION_FEE = 0.005  # Reduced transaction fee in USD for higher adoption
PI_COIN_TRANSACTION_FEE_ADJUSTMENT = 0.0005  # Dynamic adjustment factor for transaction fees

# Block Configuration
PI_COIN_BLOCK_TIME = 5  # Average block time in seconds for faster transactions
PI_COIN_BLOCK_TIME_ADJUSTMENT = 0.5  # Adjustment factor for block time based on network load

# Mining Configuration
PI_COIN_MINING_DIFFICULTY = 500  # Reduced difficulty for increased mining participation
PI_COIN_MINING_DIFFICULTY_ADJUSTMENT = 0.05  # Adjustment factor for mining difficulty
PI_COIN_MINING_REWARD = 25  # Increased reward for mining a block
PI_COIN_MINING_REWARD_ADJUSTMENT = 1.0  # Dynamic adjustment for mining rewards

# Network Protocol
PI_COIN_NETWORK_PROTOCOL = "PoS"  # Proof of Stake for energy efficiency
PI_COIN_NETWORK_PROTOCOL_VERSION = "2.0.0"  # Updated version of the network protocol

# Transaction Configuration
PI_COIN_MAX_TRANSACTION_SIZE = 2_000_000  # Increased maximum transaction size in bytes
PI_COIN_DECIMALS = 18  # Number of decimal places for Pi Coin

# Genesis Block Configuration
PI_COIN_GENESIS_BLOCK_TIMESTAMP = "2025-01-01T00:00:00Z"  # Timestamp of the genesis block

# Governance Model
PI_COIN_GOVERNANCE_MODEL = "Decentralized"  # Governance model for Pi Coin
PI_COIN_GOVERNANCE_VOTING_PERIOD = 1_209_600  # Voting period in seconds, 2 weeks

# Security Features
PI_COIN_ENCRYPTION_ALGORITHM = "AES-512"  # Enhanced encryption algorithm for securing transactions
PI_COIN_HASHING_ALGORITHM = "SHA-3"  # Advanced hashing algorithm for block verification
PI_COIN_SIGNATURE_SCHEME = "EdDSA"  # More secure digital signature scheme for transaction signing
PI_COIN_SECURITY_AUDIT_INTERVAL = 43200  # Security audit interval in seconds, 12 hours

# Network Parameters
PI_COIN_MAX_PEERS = 500  # Increased maximum number of peers in the network
PI_COIN_NODE_TIMEOUT = 15  # Reduced timeout for node responses in seconds
PI_COIN_CONNECTION_RETRY_INTERVAL = 2  # Reduced retry interval for node connections in seconds

# Staking Parameters
PI_COIN_STAKING_REWARD = 0.1  # Reward for staking Pi Coins
PI_COIN_MINIMUM_STAKE = 100  # Minimum amount required to stake
PI_COIN_STAKING_PERIOD = 604800  # Staking period in seconds, 1 week
PI_COIN_STAKING_REWARD_ADJUSTMENT = 0.01  # Dynamic adjustment for staking rewards

# Advanced Features
PI_COIN_SMART_CONTRACT_SUPPORT = True  # Enable smart contract functionality
PI_COIN_INTEROPERABILITY = True  # Support for cross-chain transactions
PI_COIN_DEC IMALS = 18  # Number of decimal places for Pi Coin
PI_COIN_MAX_CONTRACT_SIZE = 1_000_000  # Maximum size for smart contracts in bytes
PI_COIN_ORACLE_SUPPORT = True  # Enable oracle support for real-world data integration
PI_COIN_GOVERNANCE_TOKEN = "GOV"  # Token used for governance voting
PI_COIN_VOTING_WEIGHT = "proportional"  # Voting weight based on the amount of tokens held

# Environmental Considerations
PI_COIN_CARBON_CREDITS = True  # Enable carbon credit tracking for sustainability
PI_COIN_ENERGY_CONSUMPTION_LIMIT = 1000  # Maximum energy consumption for network operations in kWh

# User Experience Enhancements
PI_COIN_USER_FRIENDLY_INTERFACE = True  # Flag for user-friendly interface
PI_COIN_MULTILINGUAL_SUPPORT = True  # Enable support for multiple languages
PI_COIN_TUTORIALS_AVAILABLE = True  # Availability of tutorials for new users

# API Configuration
PI_COIN_API_VERSION = "1.0"  # Current version of the API
PI_COIN_API_RATE_LIMIT = 1000  # Rate limit for API requests per hour

# Logging and Monitoring
PI_COIN_LOGGING_LEVEL = "INFO"  # Default logging level
PI_COIN_MONITORING_INTERVAL = 60  # Monitoring interval in seconds

# End of constants.py
