// src/community.js

import mongoose from 'mongoose';
import logger from './utils/logger'; // Assuming you have a logger utility
import NotificationService from './notificationService'; // Assuming you have a notification service

// Define Mongoose schemas for community features
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'moderator', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
});

const threadSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    votes: { type: Number, default: 0 },
});

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
    thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread' },
    createdAt: { type: Date, default: Date.now },
    votes: { type: Number, default: 0 },
});

// Create Mongoose models
const User = mongoose.model('User ', userSchema);
const Thread = mongoose.model('Thread', threadSchema);
const Comment = mongoose.model('Comment', commentSchema);

class Community {
    // Create a new user
    async createUser (username, email) {
        try {
            const user = new User({ username, email });
            await user.save();
            logger.info(`User  created: ${username}`);
            return user;
        } catch (error) {
            logger.error(`Error creating user: ${error.message}`);
            throw new Error('User  creation failed');
        }
    }

    // Create a new thread
    async createThread(title, content, authorId) {
        try {
            const thread = new Thread({ title, content, author: authorId });
            await thread.save();
            logger.info(`Thread created: ${title}`);
            return thread;
        } catch (error) {
            logger.error(`Error creating thread: ${error.message}`);
            throw new Error('Thread creation failed');
        }
    }

    // Add a comment to a thread
    async addComment(threadId, content, authorId) {
        try {
            const comment = new Comment({ content, thread: threadId, author: authorId });
            await comment.save();
            logger.info(`Comment added to thread ${threadId}`);
            // Notify the thread author
            const thread = await Thread.findById(threadId).populate('author');
            if (thread.author) {
                NotificationService.notify(thread.author._id, `New comment on your thread: ${thread.title}`);
            }
            return comment;
        } catch (error) {
            logger.error(`Error adding comment: ${error.message}`);
            throw new Error('Comment addition failed');
        }
    }

    // Upvote a thread or comment
    async upvote(entityId, entityType) {
        try {
            if (entityType === 'thread') {
                await Thread.findByIdAndUpdate(entityId, { $inc: { votes: 1 } });
                logger.info(`Thread ${entityId} upvoted`);
            } else if (entityType === 'comment') {
                await Comment.findByIdAndUpdate(entityId, { $inc: { votes: 1 } });
                logger.info(`Comment ${entityId} upvoted`);
            } else {
                throw new Error('Invalid entity type');
            }
        } catch (error) {
            logger.error(`Error upvoting ${entityType}: ${error.message}`);
            throw new Error('Upvote failed');
        }
    }

    // Get all threads
    async getAllThreads() {
        try const threads = await Thread.find().populate('author', 'username').sort({ createdAt: -1 });
            logger.info('Fetched all threads');
            return threads;
        } catch (error) {
            logger.error(`Error fetching threads: ${error.message}`);
            throw new Error('Fetching threads failed');
        }
    }

    // Get a thread by ID
    async getThreadById(threadId) {
        try {
            const thread = await Thread.findById(threadId).populate('author', 'username').populate({
                path: 'comments',
                populate: { path: 'author', select: 'username' }
            });
            if (!thread) {
                throw new Error('Thread not found');
            }
            logger.info(`Fetched thread: ${thread.title}`);
            return thread;
        } catch (error) {
            logger.error(`Error fetching thread: ${error.message}`);
            throw new Error('Fetching thread failed');
        }
    }

    // Get comments for a thread
    async getCommentsForThread(threadId) {
        try {
            const comments = await Comment.find({ thread: threadId }).populate('author', 'username').sort({ createdAt: -1 });
            logger.info(`Fetched comments for thread: ${threadId}`);
            return comments;
        } catch (error) {
            logger.error(`Error fetching comments: ${error.message}`);
            throw new Error('Fetching comments failed');
        }
    }

    // Moderate a user (e.g., ban or unban)
    async moderateUser (userId, action) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User  not found');
            }
            if (action === 'ban') {
                user.isBanned = true;
                logger.info(`User  ${user.username} has been banned`);
            } else if (action === 'unban') {
                user.isBanned = false;
                logger.info(`User  ${user.username} has been unbanned`);
            } else {
                throw new Error('Invalid action');
            }
            await user.save();
            return user;
        } catch (error) {
            logger.error(`Error moderating user: ${error.message}`);
            throw new Error('Moderation failed');
        }
    }
}

export default new Community();
