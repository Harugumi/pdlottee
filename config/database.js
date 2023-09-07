const { MongoClient } = require("mongodb");

const url = "mongodb+srv://thakornn:2B855067mongodb@clusterforlot.nsrhhyn.mongodb.net/";
const client = new MongoClient(url);

function getDatabaseConfig() {
    return client;
}

module.exports = {
    getDatabaseConfig: getDatabaseConfig,
};
