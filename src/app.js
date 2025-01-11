// src/app.js

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const securityMiddleware = require('./middleware/security');
const corsSetup = require('./middleware/cors');
const setupSwagger = require('./docs/swagger'); // Swagger setup
const logger = require('./utils/logger'); // Logger utility
const redisClient = require('./utils/redisClient'); // Redis client setup
const notificationQueue = require('./jobs/jobProcessor'); // Job processor for background tasks
const analytics = require('./analytics'); // Import analytics module

const app = express();

// Middleware setup
app.use(express.json());
app.use(rateLimiter);
securityMiddleware(app); // Apply security middleware
corsSetup(app); // Apply CORS middleware
setupSwagger(app); // Setup Swagger for API documentation

// Connect to MongoDB
mongoose.connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => logger.info('MongoDB connected'))
    .catch(err => logger.error('MongoDB connection error:', err));

// Routes setup
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = config.port || 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    
    // Example of adding a job to the queue (for demonstration purposes)
    notificationQueue.add({ message: 'Server started successfully!' });

    // Example of tracking server start event
    analytics.trackEvent('Server Start', { port: PORT });
});

// Graceful shutdown
process.on('SIGINT', async () => {
    logger.info('Shutting down server...');
    await mongoose.connection.close();
    await redisClient.quit(); // Close Redis connection if applicable
    logger.info('Server shut down gracefully.');
    process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
});
