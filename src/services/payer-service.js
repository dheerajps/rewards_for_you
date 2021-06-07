const {selectAllPayers, updatePayerBalance, addPayerBalance} = require('../repositories/payer-repository');

module.exports.upsertPayerBalance = (payer, balance) => {
    const payerAlreadyExists = selectAllPayers().some((payerEntry) => Object.keys(payerEntry).includes(payer))

    if(payerAlreadyExists) {
        updatePayerBalance(payer, balance);
    } else {
        addPayerBalance(payer, balance)
    }
}