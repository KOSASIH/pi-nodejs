// src/eventBus.js

import EventEmitter from 'events';
import logger from './utils/logger'; // Assuming you have a logger utility

class EventBus extends EventEmitter {
    constructor() {
        super();
        this.eventNamespaces = {};
    }

    // Method to create a namespace for events
    createNamespace(namespace) {
        if (!this.eventNamespaces[namespace]) {
            this.eventNamespaces[namespace] = new EventEmitter();
            logger.info(`Event namespace created: ${namespace}`);
        } else {
            logger.warn(`Event namespace already exists: ${namespace}`);
        }
    }

    // Method to emit an event within a namespace
    emitEvent(namespace, eventName, data) {
        if (this.eventNamespaces[namespace]) {
            this.eventNamespaces[namespace].emit(eventName, data);
            logger.info(`Event emitted in namespace ${namespace}: ${eventName}`, data);
        } else {
            logger.error(`Namespace not found: ${namespace}`);
        }
    }

    // Method to listen for an event within a namespace
    onEvent(namespace, eventName, listener) {
        if (this.eventNamespaces[namespace]) {
            this.eventNamespaces[namespace].on(eventName, listener);
            logger.info(`Listener added for event ${eventName} in namespace ${namespace}`);
        } else {
            logger.error(`Namespace not found: ${namespace}`);
        }
    }

    // Method to remove a listener for an event within a namespace
    removeEventListener(namespace, eventName, listener) {
        if (this.eventNamespaces[namespace]) {
            this.eventNamespaces[namespace].removeListener(eventName, listener);
            logger.info(`Listener removed for event ${eventName} in namespace ${namespace}`);
        } else {
            logger.error(`Namespace not found: ${namespace}`);
        }
    }

    // Method to handle asynchronous events
    async emitAsyncEvent(namespace, eventName, data) {
        if (this.eventNamespaces[namespace]) {
            const listeners = this.eventNamespaces[namespace].listeners(eventName);
            for (const listener of listeners) {
                try {
                    await listener(data);
                } catch (error) {
                    logger.error(`Error processing event ${eventName} in namespace ${namespace}: ${error.message}`);
                }
            }
            logger.info(`Asynchronous event emitted in namespace ${namespace}: ${eventName}`, data);
        } else {
            logger.error(`Namespace not found: ${namespace}`);
        }
    }
}

// Export a singleton instance of the EventBus
const eventBus = new EventBus();
export default eventBus;
