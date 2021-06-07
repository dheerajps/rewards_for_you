let transactionMap = new Map();

const insertTransaction = (transactionPayload) => {
    const {transactionId, ...payload} = transactionPayload;

    return transactionMap.set(transactionId, payload)
}

const selectAllTransactions = () =>
    Array.from(transactionMap).map(([key, value]) => ({transactionId: key, ...value}))

const selectAllTransactionsSortedByOldestFirst = () =>
    (selectAllTransactions()).sort((transactionA, transactionB) => new Date(transactionA.timestamp) - new Date(transactionB.timestamp));

const updateTransaction = (transactionPayload) => {
    const {transactionId, ...payload} = transactionPayload;

    return transactionMap.set(transactionId, payload)
}

module.exports = {
    insertTransaction,
    selectAllTransactions,
    selectAllTransactionsSortedByOldestFirst,
    updateTransaction
}