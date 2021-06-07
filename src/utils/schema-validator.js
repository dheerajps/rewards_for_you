module.exports.validatePayload = (payload, schema, options = {}) => {
    const result = schema.validate(payload, {
        abortEarly: false,
        ...options
    });

    if (result.error) {
        const message = result.error.details.map((detail) => detail.message).join('\n ');

        return message;
    }
};