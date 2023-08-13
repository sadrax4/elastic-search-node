const express = require("express");
const app = express();;
require("dotenv").config();
const server = require("http").createServer(app);
const { PORT } = process.env;
const expressEjsLayouts = require("express-ejs-layouts");
const { AllRouter } = require("./router/router");
const { elasticClient } = require("./config/elastic.config");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.set("views", "views");
app.set("layout", "./layouts/master");
app.use(AllRouter);
app.use((req, res, next) => {
    return res.status(404).json({
        status: 404,
        message: "notFound"
    })
})
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message
    })
})
server.listen(PORT, () => {
    console.log(`server run on port ${PORT}`);
})