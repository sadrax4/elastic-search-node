const { createBlog, getBlogList, removeBlog, updateBlog, updateBlog2, searchBlogByTitle, searchBlogByMultiField, searchBlogRegexp, searchBlogByMultiRegexp } = require("../controller/blog.controller");
const router = require("express").Router();

router.post("/create", createBlog);
router.get("/list/:searchQuery?", getBlogList);
router.delete("/remove/:id?", removeBlog);
router.post("/update/:id?", updateBlog);
router.post("/update2/:id?", updateBlog2);
router.get("/searchByTitle/:title?", searchBlogByTitle);
router.get("/searchMultiField/:searchQuery?", searchBlogByMultiField);
router.get("/searchByRegexp/:searchQuery?", searchBlogRegexp);
router.get("/searchByMultiRegexp/:searchQuery?", searchBlogByMultiRegexp);

module.exports = {
    BlogRouter: router
}