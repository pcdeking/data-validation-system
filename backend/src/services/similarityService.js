const stringSimilarity = require('string-similarity');
const VerifiedRecord = require('../models/VerifiedRecord');

const checkSimilarity = async (full_name) => {

    const allRecords = await VerifiedRecord.findAll();

    for (const existing of allRecords) {

        const similarity =
            stringSimilarity.compareTwoStrings(
                full_name.toLowerCase(),
                existing.full_name.toLowerCase()
            );

        console.log(
            `${full_name} vs ${existing.full_name} = ${similarity}`
        );

        if (similarity >= 0.70) {

            return {
                isSimilar: true,
                similarityScore: similarity
            };

        }
    }

    return {
        isSimilar: false
    };

};

module.exports = {
    checkSimilarity
};