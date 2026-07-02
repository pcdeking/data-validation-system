const VerifiedRecord = require('../models/VerifiedRecord');
const DuplicateRecord = require('../models/DuplicateRecord');
const FalsePositiveRecord = require('../models/FalsePositiveRecord');

const {
    checkDuplicate
} = require('../services/duplicateService');

const {
    checkSimilarity
} = require('../services/similarityService');

const {
    createAuditLog
} = require('../services/auditService');

const createRecord = async (req, res) => {

    try {

        const { full_name, email, phone } = req.body;

        // Duplicate Check
        const duplicate =
            await checkDuplicate(email, phone);

        if (duplicate.isDuplicate) {

            await DuplicateRecord.create({
                full_name,
                email,
                phone,
                reason: duplicate.reason
            });

            await createAuditLog(
                'rejected',
                duplicate.reason
            );

            return res.status(409).json({
                success: false,
                message: duplicate.reason
            });

        }

        // Similarity Check
        const similarity =
            await checkSimilarity(full_name);

        if (similarity.isSimilar) {

            await FalsePositiveRecord.create({
                full_name,
                email,
                phone,
                similarity_score:
                    similarity.similarityScore
            });

            await createAuditLog(
                'review',
                `Possible false positive detected (${similarity.similarityScore})`
            );

            return res.status(202).json({
                success: false,
                message:
                    'Possible false positive detected',
                similarity_score:
                    similarity.similarityScore
            });

        }

        // Save verified record
        const record = await VerifiedRecord.create({
            full_name,
            email,
            phone
        });

        await createAuditLog(
            'accepted',
            'Unique record stored successfully'
        );

        return res.status(201).json({
            success: true,
            message: 'Record created successfully',
            data: record
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });

    }

};

module.exports = {
    createRecord
};