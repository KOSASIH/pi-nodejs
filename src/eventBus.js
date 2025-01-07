// src/eventBus.js

import { EventEmitter } from 'events';

class EventBus extends EventEmitter {
    publish(event, data) {
        this.emit(event, data);
    }

    subscribe(event, listener) {
        this.on(event, listener);
    }
}

export default new EventBus();
