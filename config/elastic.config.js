const { ELASTIC_USER, ELASTIC_PASS, ELASTIC_HOST } = process.env;
const { Client } = require("@elastic/elasticsearch");
console.log(ELASTIC_HOST, ELASTIC_PASS, ELASTIC_USER)
const elasticClient = new Client({
    node: ELASTIC_HOST,
    auth: {
        username: ELASTIC_USER,
        password: ELASTIC_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})
module.exports = {
    elasticClient
}