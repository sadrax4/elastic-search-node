const { createIndices, getIndices, removeIndices } = require("../controller/indices.controller");
const router = require("express").Router();

router.post("/create", createIndices);
router.get("/list", getIndices);
router.delete("/remove", removeIndices);

module.exports = {
    IndiceRouter: router
}