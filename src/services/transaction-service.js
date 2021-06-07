const uuid = require('uuid');
const {insertTransaction} = require('../repositories/transaction-repository');
const {upsertPayerBalance} = require('../services/payer-service');

module.exports.savePayerTransaction = (transactionPayload) => {
    const transactionPayloadWithId = {
        ...transactionPayload,
        transactionId: uuid.v4()
    };
    insertTransaction(transactionPayloadWithId);
    upsertPayerBalance(transactionPayloadWithId.payer, transactionPayloadWithId.points);
}