const { BlogRouter } = require("./blog.roues");
const { IndiceRouter } = require("./indices.routes");
const router = require("express").Router();

router.use("/indice", IndiceRouter);
router.use("/blog", BlogRouter)
router.get("/", (req, res, next) => {
    return res.render("pages/index")
})
module.exports = {
    AllRouter: router
}