const { broadcast } = require('./websocket');

const notifyTransaction = (transaction) => {
    const message = {
        type: 'transaction',
        data: transaction,
    };
    broadcast(message);
};

module.exports = { notifyTransaction };
