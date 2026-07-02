const Joi = require('joi');

const recordSchema = Joi.object({
    full_name: Joi.string()
        .min(3)
        .max(100)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    phone: Joi.string()
        .pattern(/^[0-9]+$/)
        .min(8)
        .max(15)
        .required()
});

const validateRecord = (req, res, next) => {

    const { error } = recordSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    next();
};

module.exports = validateRecord;