let payerMap = new Map();

const updatePayerBalance = (payer, balance) =>
    payerMap.set(payer, Number(payerMap.get(payer) + balance));

const addPayerBalance = (payer, balance) => payerMap.set(payer, balance);

const selectAllPayers = () => Array.from(payerMap).map(([key, value]) => ({[key]: value}));

module.exports = {
    updatePayerBalance,
    addPayerBalance,
    selectAllPayers
}