const httpStatus = require('http-status');
const {
    selectAllTransactionsSortedByOldestFirst, updateTransaction
} = require('../repositories/transaction-repository');

const {updatePayerBalance} = require('../repositories/payer-repository');

const upsertPayerPointsForSpend = (payer, pointsToDeduct, payerPointsForSpendMap) => {
    const deductedPoints = -1 * pointsToDeduct;
    if (payerPointsForSpendMap.has(payer)) {
        const currentPoints = payerPointsForSpendMap.get(payer);
        payerPointsForSpendMap.set(payer, currentPoints + deductedPoints)
    } else {
        payerPointsForSpendMap.set(payer, deductedPoints)
    }
}

module.exports.saveUserPoints = ({points}, hapiToolKit) => {
    const allTransactionsSortedByOldestFirst = selectAllTransactionsSortedByOldestFirst();
    const allTransactionsWithValidPoints = allTransactionsSortedByOldestFirst.filter(transaction => transaction.points !== 0);

    if (!allTransactionsWithValidPoints.length) {
        return hapiToolKit.response('Unable to process this spending as there are no available transactions').code(httpStatus.UNPROCESSABLE_ENTITY);
    }

    try {
        let pointsToDeduct = points;
        const payerPointsForSpendMap = new Map();

        for (const transaction of allTransactionsWithValidPoints) {
            const {points: pointsForThisTransaction, payer} = transaction;

            if (pointsToDeduct === 0) {
                break;
            } else if (pointsForThisTransaction < pointsToDeduct) {
                pointsToDeduct -= pointsForThisTransaction;
                upsertPayerPointsForSpend(payer, pointsForThisTransaction, payerPointsForSpendMap);
                updateTransaction({
                    ...transaction,
                    points: 0
                });
            } else {
                upsertPayerPointsForSpend(payer, pointsToDeduct, payerPointsForSpendMap)
                updateTransaction({
                    ...transaction,
                    points: pointsForThisTransaction - pointsToDeduct
                });
                pointsToDeduct = 0;
            }
        }

        const payerPointsCollectionsAfterCurrentSpending = Array
            .from(payerPointsForSpendMap)
            .map(([key, value]) => {
                updatePayerBalance(key, value);

                return {
                    payer: key,
                    points: value
                }
            });

        payerPointsForSpendMap.clear();

        return hapiToolKit.response(payerPointsCollectionsAfterCurrentSpending).code(httpStatus.OK);
    } catch (error) {
        console.log('An uncaught exception occurred while saving users spendings', error);

        return hapiToolKit.response('An internal server error occurred').code(httpStatus.INTERNAL_SERVER_ERROR)
    }
}