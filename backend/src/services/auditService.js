const AuditLog = require('../models/AuditLog');

const createAuditLog = async (status, message) => {

    try {

        await AuditLog.create({
            status,
            message
        });

    } catch (error) {

        console.error('Audit Log Error:', error);

    }
};

module.exports = {
    createAuditLog
};