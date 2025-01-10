const Queue = require('bull');
const notificationQueue = new Queue('notificationQueue');

notificationQueue.process(async (job) => {
    // Process the job (e.g., send a notification)
    console.log(`Processing job ${job.id}:`, job.data);
    // Simulate sending a notification
    await sendNotification(job.data);
});

const sendNotification = async (data) => {
    // Logic to send notification (e.g., email, SMS)
    console.log('Sending notification:', data);
};

module.exports = notificationQueue;
