// src/notifications.js

import axios from 'axios';
import logger from './utils/logger'; // Assuming you have a logger utility
import nodemailer from 'nodemailer'; // For sending email notifications
import twilio from 'twilio'; // For sending SMS notifications

class Notifications {
    private emailTransporter: nodemailer.Transporter;
    private twilioClient: twilio.Twilio;
    private smsEnabled: boolean;
    private emailEnabled: boolean;

    constructor(emailConfig: any, twilioConfig: any) {
        this.emailTransporter = nodemailer.createTransport(emailConfig);
        this.twilioClient = twilio(twilioConfig.accountSid, twilioConfig.authToken);
        this.smsEnabled = twilioConfig.enabled;
        this.emailEnabled = emailConfig.enabled;
    }

    // Method to send push notifications
    public async sendPushNotification(deviceToken: string, message: string): Promise<void> {
        const payload = {
            to: deviceToken,
            notification: {
                title: 'New Notification',
                body: message,
            },
        };

        try {
            const response = await axios.post('https://api.pushservice.com/send', payload); // Replace with actual push service URL
            logger.info(`Push notification sent: ${response.data}`);
        } catch (error) {
            logger.error(`Error sending push notification: ${error.message}`);
            throw new Error('Push notification failed');
        }
    }

    // Method to send email notifications
    public async sendEmailNotification(to: string, subject: string, text: string): Promise<void> {
        if (!this.emailEnabled) {
            logger.warn('Email notifications are disabled.');
            return;
        }

        const mailOptions = {
            from: 'no-reply@yourapp.com', // Replace with your sender email
            to,
            subject,
            text,
        };

        try {
            const info = await this.emailTransporter.sendMail(mailOptions);
            logger.info(`Email sent: ${info.response}`);
        } catch (error) {
            logger.error(`Error sending email notification: ${error.message}`);
            throw new Error('Email notification failed');
        }
    }

    // Method to send SMS notifications
    public async sendSMSNotification(to: string, message: string): Promise<void> {
        if (!this.smsEnabled) {
            logger.warn('SMS notifications are disabled.');
            return;
        }

        try {
            const messageResponse = await this.twilioClient.messages.create({
                body: message,
                from: '+1234567890', // Replace with your Twilio number
                to,
            });
            logger.info(`SMS sent: ${messageResponse.sid}`);
        } catch (error) {
            logger.error(`Error sending SMS notification: ${error.message}`);
            throw new Error('SMS notification failed');
        }
    }

    // Method to manage user notification preferences
    public async updateUser NotificationPreferences(userId: string, preferences: any): Promise<void> {
        // Implement logic to update user preferences in the database
        logger.info(`Updated notification preferences for user: ${userId}`);
    }

    // Method to log notifications
    private logNotification(type: string, recipient: string, message: string): void {
        logger.info(`Notification sent: Type: ${type}, Recipient: ${recipient}, Message: ${message}`);
    }

    // Method to send batch notifications
    public async sendBatchNotifications(notifications: Array<{ type: string; recipient: string; message: string }>): Promise<void> {
        for (const notification of notifications) {
            try {
                switch (notification.type) {
                    case 'push':
                        await this.sendPushNotification(notification.recipient, notification.message);
                        break;
                    case 'email':
                        await this.sendEmailNotification(notification.recipient, 'Notification', notification.message);
                        break;
                    case 'sms':
                        await this.sendSMSNotification(notification.recipient, notification.message);
                        break;
                    default:
                        logger.warn(`Unknown notification type: ${notification.type}`);
                }
                this.logNotification(notification.type, notification.recipient, notification.message);
            } catch (error) {
                logger.error(`Error sending batch notification: ${error.message }`);
            }
        }
    }
}

export default Notifications;
