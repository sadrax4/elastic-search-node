const createHttpError = require("http-errors");
const { elasticClient } = require("../config/elastic.config");
const indexName = 'blog';
async function getBlogList(req, res, next) {
    try {
        console.log(req.query)
        const { searchQuery } = req.query;
        const blogs = await elasticClient.search({
            index: indexName,
            q: searchQuery
        });
        return res.json(blogs.hits.hits);
    } catch (error) {
        next(error);
    }
}
async function createBlog(req, res, next) {
    try {
        const { title, text, author } = req.body;
        const createResult = await elasticClient.index({
            index: indexName,
            document: {
                title,
                text,
                author
            }
        });
        if (createResult.result == 'created') {
            return res.json({
                message: "blog successfully created"
            })
        }
        throw createHttpError.BadRequest("blog not created");
    } catch (error) {
        next(error);
    }
}
async function removeBlog(req, res, next) {
    try {
        const { id } = req.query;
        const deleteResult = await elasticClient.deleteByQuery({
            index: indexName,
            query: {
                match: { _id: id }
            }
        })
        if (deleteResult.deleted == 1) {
            return res.json({
                message: "deleted successfully"
            })
        }
        throw createHttpError.BadRequest("deleted not successfuly")
    } catch (error) {
        next(error);
    }
}
async function updateBlog(req, res, next) {
    try {
        const { id } = req.query;
        const bodyData = req.body
        const blog = (await elasticClient.search({
            index: indexName,
            query: { match: { _id: id } }
        })).hits.hits?.[0] || {};
        const blogData = blog?._source || {};
        const body = { ...blogData, ...bodyData };
        const updateResult = await elasticClient.index({
            index: indexName,
            id,
            body
        })
        console.log(updateResult)
        if (updateResult.result == 'updated') {
            return res.json({
                message: "updated successfully"
            })
        }
        throw createHttpError.BadRequest("update failed")
    } catch (error) {
        next(error);
    }
}
async function updateBlog2(req, res, next) {
    try {
        const { id } = req.query;
        const body = req.body
        const updateResult = await elasticClient.update({
            index: indexName,
            id,
            doc: body
        })
        if (updateResult.result == 'updated') {
            return res.json({
                message: "updated successfully"
            })
        } else if (updateResult.result == "noop") {
            return res.json({
                message: "please change value too save"
            })
        }
        throw createHttpError.BadRequest("update failed")
    } catch (error) {
        next(error);
    }
}
async function searchBlogByTitle(req, res, next) {
    try {
        const { title } = req.query;
        const blogs = (await elasticClient.search({
            index: indexName,
            query: {
                match: { title }
            }
        })).hits.hits;
        return res.json(blogs);
    } catch (error) {
        next(error);
    }
}
async function searchBlogByMultiField(req, res, next) {
    try {
        const { searchQuery } = req.query;
        const blogs = (await elasticClient.search({
            index: indexName,
            query: {
                multi_match: {
                    query: searchQuery,
                    fields: ["title", "text"]
                }
            }
        })).hits.hits;
        return res.json(blogs);
    } catch (error) {
        next(error);
    }
}
async function searchBlogRegexp(req, res, next) {
    try {
        const { searchQuery } = req.query;
        const regexPattern = `.*${searchQuery}.*`;
        const blogs = (await elasticClient.search({
            index: indexName,
            query: {
                regexp: {
                    title: regexPattern
                }
            }
        })).hits.hits;
        return res.json(blogs);
    } catch (error) {
        next(error);
    }
}
async function searchBlogByMultiRegexp(req, res, next) {
    try {
        const { searchQuery } = req.query;
        const regexPattern = `.*${searchQuery}.*`;
        const blogs = (await elasticClient.search({
            index: indexName,
            query: {
                bool: {
                    should: [
                        { regexp: { title: regexPattern } },
                        { regexp: { text: regexPattern } },
                        { regexp: { author: regexPattern } }
                    ]
                }
            }
        })).hits.hits;
        return res.json(blogs);
    } catch (error) {
        next(error);
    }
}
module.exports = {
    createBlog,
    removeBlog,
    searchBlogByMultiField,
    searchBlogRegexp,
    getBlogList,
    updateBlog,
    updateBlog2,
    searchBlogByTitle,
    searchBlogByMultiRegexp
}