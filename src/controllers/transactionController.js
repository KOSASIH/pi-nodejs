const { sendPi, getTransactionHistory } = require('../services/transaction');

const sendPiCurrency = async (req, res) => {
    try {
        const transaction = await sendPi(req.body.recipient, req.body.amount);
        res.json(transaction);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const transactionHistory = async (req, res) => {
    try {
        const history = await getTransactionHistory(req.user.id);
        res.json(history);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { sendPiCurrency, transactionHistory };
