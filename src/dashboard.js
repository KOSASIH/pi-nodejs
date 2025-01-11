// src/dashboard.js

import mongoose from 'mongoose';
import logger from './utils/logger'; // Assuming you have a logger utility
import { ChartJSNodeCanvas } from 'chartjs-node-canvas'; // For generating charts
import { User, Transaction, Thread } from './models'; // Assuming you have these models defined

class Dashboard {
    constructor() {
        this.chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 800, height: 600 });
    }

    // Method to get user activity data
    async getUser ActivityData() {
        try {
            const userCount = await User.countDocuments();
            const activeUsers = await User.countDocuments({ lastActive: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } });
            logger.info('User  activity data retrieved successfully.');
            return { userCount, activeUsers };
        } catch (error) {
            logger.error(`Error retrieving user activity data: ${error.message}`);
            throw new Error('Failed to retrieve user activity data');
        }
    }

    // Method to get transaction data
    async getTransactionData() {
        try {
            const totalTransactions = await Transaction.countDocuments();
            const recentTransactions = await Transaction.find().sort({ createdAt: -1 }).limit(10);
            logger.info('Transaction data retrieved successfully.');
            return { totalTransactions, recentTransactions };
        } catch (error) {
            logger.error(`Error retrieving transaction data: ${error.message}`);
            throw new Error('Failed to retrieve transaction data');
        }
    }

    // Method to get community engagement data
    async getCommunityEngagementData() {
        try {
            const totalThreads = await Thread.countDocuments();
            const recentThreads = await Thread.find().sort({ createdAt: -1 }).limit(10);
            logger.info('Community engagement data retrieved successfully.');
            return { totalThreads, recentThreads };
        } catch (error) {
            logger.error(`Error retrieving community engagement data: ${error.message}`);
            throw new Error('Failed to retrieve community engagement data');
        }
    }

    // Method to generate a user activity chart
    async generateUser ActivityChart() {
        try {
            const data = await this.getUser ActivityData();
            const chartData = {
                type: 'line',
                data: {
                    labels: ['Total Users', 'Active Users'],
                    datasets: [{
                        label: 'User  Activity',
                        data: [data.userCount, data.activeUsers],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    }],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            };

            const image = await this.chartJSNodeCanvas.renderToBuffer(chartData);
            logger.info('User  activity chart generated successfully.');
            return image; // Return the chart image buffer
        } catch (error) {
            logger.error(`Error generating user activity chart: ${error.message}`);
            throw new Error('Failed to generate user activity chart');
        }
    }

    // Method to export dashboard data to CSV
    async exportDataToCSV(data, filename) {
        const csv = require('csv-writer').createObjectCsvWriter({
            path: filename,
            header: Object.keys(data[0]).map(key => ({ id: key, title: key })),
        });

        try {
            await csv.writeRecords(data);
            logger.info(`Data exported to CSV: ${filename}`);
        } catch (error) {
            logger.error(`Error exporting data to CSV: ${error.message}`);
            throw new Error('Failed to export data to CSV');
        }
    }

    // Method to get dashboard metrics
    async getDashboardMetrics() {
        try {
            const userActivity = await this.getUser ActivityData();
            const transactionData = await this.getTransaction Data();
            const communityEngagement = await this.getCommunityEngagementData();
            logger.info('Dashboard metrics retrieved successfully.');
            return { userActivity, transactionData, communityEngagement };
        } catch (error) {
            logger.error(`Error retrieving dashboard metrics: ${error.message}`);
            throw new Error('Failed to retrieve dashboard metrics');
        }
    }

    // Method to customize dashboard view
    async customizeDashboard(userId, preferences) {
        try {
            // Assuming you have a User model with a preferences field
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User  not found');
            }
            user.preferences = preferences;
            await user.save();
            logger.info(`Dashboard customized for user: ${userId}`);
            return user.preferences;
        } catch (error) {
            logger.error(`Error customizing dashboard: ${error.message}`);
            throw new Error('Dashboard customization failed');
        }
    }
}

export default new Dashboard();
