const { sendPi } = require('../services/transaction');

describe('Transaction Module', () => {
    it('should send Pi currency successfully', async () => {
        const result = await sendPi('recipient_address', 10);
        expect(result).to.have.property('id');
    });

    it('should throw an error for invalid transaction', async () => {
        try {
            await sendPi('invalid_address', 10);
        } catch (error) {
            expect(error).to.exist;
        }
    });
});
