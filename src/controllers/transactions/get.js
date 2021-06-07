const httpStatus = require('http-status');
const {selectAllTransactions} = require('../../repositories/transaction-repository');

/*
    This handler retrieves all the transactions currently saved

    Error States:
        Uncaught Exception: Internal Server Error

    Success:
        200 ok with a collection of transaction objects
        example:
        [
            {
                "transactionId": "a8954aeb-b295-4b2c-8639-136722833f5c",
                "payer": "bulls",
                "points": 1000,
                "timestamp": "2020-11-02T14:00:00Z"
            },
            {
                "transactionId": "3439a23a-646a-4b8e-8f11-222be75da6d6",
                "payer": "bears",
                "points": 0,
                "timestamp": "2020-10-31T11:00:00Z"
            }
       ]

*/

module.exports.getTransactions = async (request, h) => {
    try {
        return h.response(selectAllTransactions()).code(httpStatus.OK);
    } catch (error) {
        console.log('An uncaught exception occurred while fetching all transactions', error);

        return h.response('An internal server error occurred').code(httpStatus.INTERNAL_SERVER_ERROR);
    }
}