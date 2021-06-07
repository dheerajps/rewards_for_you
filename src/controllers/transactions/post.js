const httpStatus = require('http-status');
const joi = require('joi');

const {validatePayload} = require('../../utils/schema-validator');
const {savePayerTransaction} = require('../../services/transaction-service');


const transactionPayloadSchema =
    joi.object().keys({
        payer: joi.string().uppercase().required(),
        points: joi.number().required(),
        timestamp: joi.string().isoDate().required()
    });

/*
    This handler saves every transaction
    Input:
        JSON object { "payer": "bears", "points": 200, "timestamp": "2020-10-31T11:00:00Z" }

    Error States:
        Invalid Payload: Bad Request
        Uncaught Exception: Internal Server Error

    Success:
        200 ok with a collection of payer credits for that spend
        example: [{"payer":"bears","points":-2000}]

*/

module.exports.postPayerTransaction = (request, h) => {
    const transactionPayload = request.payload;
    try {
        const error = validatePayload(transactionPayload, transactionPayloadSchema);
        if (error) {
            return h.response(error).code(httpStatus.BAD_REQUEST);
        }

        savePayerTransaction(transactionPayload);

        return h.response('').code(httpStatus.CREATED);
    } catch (error) {
        console.log('An uncaught exception occurred while saving a transaction', error);

        return h.response('An internal server error occurred').code(httpStatus.INTERNAL_SERVER_ERROR)
    }
}