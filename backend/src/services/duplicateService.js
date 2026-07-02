const VerifiedRecord = require('../models/VerifiedRecord');

const checkDuplicate = async (email, phone) => {

    const existingEmail = await VerifiedRecord.findOne({
        where: { email }
    });

    const existingPhone = await VerifiedRecord.findOne({
        where: { phone }
    });

    if (existingEmail) {
        return {
            isDuplicate: true,
            reason: 'Email already exists'
        };
    }

    if (existingPhone) {
        return {
            isDuplicate: true,
            reason: 'Phone number already exists'
        };
    }

    return {
        isDuplicate: false
    };

};

module.exports = {
    checkDuplicate
};