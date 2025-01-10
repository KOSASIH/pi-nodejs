const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const rateLimiter = require('./middleware/rateLimiter');

const app = express();
app.use(express.json());
app.use(rateLimiter);

mongoose.connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
