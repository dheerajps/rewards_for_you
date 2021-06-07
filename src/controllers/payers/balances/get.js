const httpStatus = require('http-status');
const {selectAllPayers} = require('../../../repositories/payer-repository');

/*
    This handler retrieves the balances of all the payers

    Error States:
        Uncaught Exception: Internal Server Error

    Success:
        200 ok with a collection of payer-balance key value pair
        example:
        [
            {"Bears": 111},
            {"Bulls": 500}
       ]

*/

module.exports.getPayerBalances = (request, h) => {
    try {
        return h.response(selectAllPayers()).code(httpStatus.OK);
    } catch (error) {
        console.log('An uncaught exception occurred while fetching payer point balances', error);

        return h.response('An internal server error occurred').code(httpStatus.INTERNAL_SERVER_ERROR)
    }
}