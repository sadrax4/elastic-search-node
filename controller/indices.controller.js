const { elasticClient } = require("../config/elastic.config");
const createHttpError = require("http-errors");
async function createIndices(req, res, next) {
    try {
        const { indexName: index } = req.body;
        if (!index) throw createHttpError.BadRequest("can not empty");
        const result = await elasticClient.indices.create({ index });
        if (result.acknowledged == true) {
            return res.json({
                message: "index successfully created"
            })
        }
        throw createHttpError.BadRequest("index not created");
    } catch (error) {
        next(error);
    }
}
async function getIndices(req, res, next) {
    try {
        const indices = await elasticClient.indices.getAlias()
        return res.json({
            indices
        })
    } catch (error) {
        next(error);
    }
}
async function removeIndices(req, res, next) {
    try {
        const { indexName } = req.query;
        await elasticClient.indices.delete({ index: indexName })
        return res.json({
            message: "index successfully deleted"
        })
    } catch (error) {
        next(error);
    }
}
module.exports = {
    createIndices,
    getIndices,
    removeIndices,
}
