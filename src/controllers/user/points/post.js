const joi = require('joi');
const httpStatus = require('http-status');

const {saveUserPoints} = require('../../../services/user-service');
const {validatePayload} = require('../../../utils/schema-validator');

const userSpendingPointsSchema =
    joi.object().keys({
        points: joi.number().positive().required()
    });

/*
    This handler saves every spending of a user and credits the payers balances accordingly
    Input:
        JSON object {"points": 3000}

    Error States:
        Invalid Payload: Bad Request
        No transactions to credit: Unprocessable Entity
        Uncaught Exception: Internal Server Error

    Success:
        200 ok with a collection of payer credits for that spend
        example: [{"payer":"bears","points":-2000}]

*/
module.exports.postUserPoints = async (request, h) => {
    const userSpendingPointsPayload = request.payload;
    const error = validatePayload(userSpendingPointsPayload, userSpendingPointsSchema);
    if (error) {
        return h.response(error).code(httpStatus.BAD_REQUEST)
    }

    return saveUserPoints(userSpendingPointsPayload, h);
}