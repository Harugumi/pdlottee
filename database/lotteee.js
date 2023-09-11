const { getDatabaseConfig } = require("../config/database");

const client = getDatabaseConfig();

async function searchData(month, year) {
    const dbName = "lottee";
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection("allmonth");

    let findResult;

    if (month === "all" && year === "all") {
        findResult = await collection.find().toArray();
    } else if (month === "all") {
        findResult = await collection.find({ Year: year }).toArray();
    } else if (year === "all") {
        findResult = await collection.find({ Month: month }).toArray();
    } else {
        findResult = await collection.find({ Month: month, Year: year }).toArray();
    }

    client.close();
    return findResult;
}

module.exports = {
    searchData: searchData,
};
