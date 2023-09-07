const { getDatabaseConfig } = require("../config/database");

const client = getDatabaseConfig();

async function searchData(year, month) {
    const dbName = "lottee";
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection("allmonth");

    const findResult = await collection.find({ Month: month, Year: year }).toArray();

    client.close();
    return findResult;
}

module.exports = {
    searchData: searchData,
};
