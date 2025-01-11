// src/governance.js

import mongoose from 'mongoose';
import logger from './utils/logger'; // Assuming you have a logger utility
import NotificationService from './notificationService'; // Assuming you have a notification service

// Define Mongoose schemas for governance features
const proposalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
    votes: { type: Number, default: 0 },
    votesFor: { type: Number, default: 0 },
    votesAgainst: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'active', 'completed'], default: 'pending' },
    quorum: { type: Number, default: 0 }, // Minimum votes required for the proposal to be valid
});

const Proposal = mongoose.model('Proposal', proposalSchema);

class Governance {
    // Create a new proposal
    async createProposal(title, description, creatorId) {
        try {
            const proposal = new Proposal({ title, description, creator: creatorId });
            await proposal.save();
            logger.info(`Proposal created: ${title}`);
            NotificationService.notifyAll(`New proposal created: ${title}`);
            return proposal;
        } catch (error) {
            logger.error(`Error creating proposal: ${error.message}`);
            throw new Error('Proposal creation failed');
        }
    }

    // Get all proposals
    async getAllProposals() {
        try {
            const proposals = await Proposal.find().populate('creator', 'username').sort({ createdAt: -1 });
            logger.info('Fetched all proposals');
            return proposals;
        } catch (error) {
            logger.error(`Error fetching proposals: ${error.message}`);
            throw new Error('Fetching proposals failed');
        }
    }

    // Get a proposal by ID
    async getProposalById(proposalId) {
        try {
            const proposal = await Proposal.findById(proposalId).populate('creator', 'username');
            if (!proposal) {
                throw new Error('Proposal not found');
            }
            logger.info(`Fetched proposal: ${proposal.title}`);
            return proposal;
        } catch (error) {
            logger.error(`Error fetching proposal: ${error.message}`);
            throw new Error('Fetching proposal failed');
        }
    }

    // Vote on a proposal
    async voteOnProposal(proposalId, userId, voteType) {
        try {
            const proposal = await Proposal.findById(proposalId);
            if (!proposal) {
                throw new Error('Proposal not found');
            }

            if (voteType === 'for') {
                proposal.votesFor += 1;
            } else if (voteType === 'against') {
                proposal.votesAgainst += 1;
            } else {
                throw new Error('Invalid vote type');
            }

            proposal.votes += 1; // Increment total votes
            await proposal.save();
            logger.info(`User  ${userId} voted ${voteType} on proposal: ${proposal.title}`);

            // Notify users about the vote
            NotificationService.notifyAll(`User  ${userId} voted ${voteType} on proposal: ${proposal.title}`);
            return proposal;
        } catch (error) {
            logger.error(`Error voting on proposal: ${error.message}`);
            throw new Error('Voting failed');
        }
    }

    // Complete a proposal
    async completeProposal(proposalId) {
        try {
            const proposal = await Proposal.findById(proposalId);
            if (!proposal) {
                throw new Error('Proposal not found');
            }

            // Check if quorum is met (for example, at least 50% of total votes)
            const totalVotes = proposal.votesFor + proposal.votesAgainst;
            if (totalVotes < proposal.quorum) {
                throw new Error('Quorum not met');
            }

            proposal.status = 'completed';
            await proposal.save();
            logger.info(`Proposal completed: ${proposal.title}`);
            NotificationService.notifyAll(`Proposal completed: ${proposal.title}`);
            return proposal;
        } catch (error) {
            logger.error(`Error completing proposal: ${error.message}`);
            throw new Error('Completing proposal failed');
        }
    }

    // Delete a proposal
    async deleteProposal(proposalId) {
        try {
            const proposal = await Proposal.findByIdAndDelete(proposalId);
            if (!proposal) {
                throw new Error('Proposal not found');
            }
            logger.info(`Proposal deleted: ${proposal.title}`);
            NotificationService.notifyAll(`Proposal deleted: ${proposal.title}`);
            return proposal;
        } catch (error) {
            logger.error(`Error deleting proposal: ${error.message}`);
            throw new Error('Deleting proposal failed');
        }
    }
}

export default new Governance();
