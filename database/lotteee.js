const { getDatabaseConfig } = require("../config/database");

const client = getDatabaseConfig();

async function searchData(month, year) {
    const dbName = "lottee";
    await client.connect();
    // console.log("Connected successfully to server");
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

    //-----------------------------------------------------------
    const front3Array = [];
    findResult.forEach((item) => {
        front3Array.push(item["3 front 1"], item["3 front 2"]);
    });
    const front3ArrayNoRepeat = [...new Set(front3Array)];
    const front3Obj = {};
    front3ArrayNoRepeat.forEach((item) => {
        const results = front3Array.filter((num) => {
            return num === item;
        });

        front3Obj[`${item}`] = results.length;
    });
    //-----------------------------------------------------------

    return front3Obj;
}

module.exports = {
    searchData: searchData,
};
