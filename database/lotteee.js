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
    /*
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
    const sortedfront3Obj = Object.fromEntries(
        Object.entries(front3Obj).sort((a, b) => b[1] - a[1])
    );
    return sortedfront3Obj;
    */
    //-----------------------------------------------------------

    /*
    const bottom3Array = [];
    findResult.forEach((item) => {
        bottom3Array.push(item["3 bottom 1"], item["3 bottom 2"]);
    });
    const bottom3ArrayNoRepeat = [...new Set(bottom3Array)];
    const bottom3Obj = {};
    bottom3ArrayNoRepeat.forEach((item) => {
        const results = bottom3Array.filter((num) => {
            return num === item;
        });

        bottom3Obj[`${item}`] = results.length;
    });
    const sortedBottom3Obj = Object.fromEntries(
        Object.entries(bottom3Obj).sort((a, b) => b[1] - a[1])
    );
    return sortedBottom3Obj;
    */
    //---------------------------------------------------------------------------------//
    
    const bottom2Array = [];
    findResult.forEach((item) => {
        bottom2Array.push(item["2 bottom"]);
    });

    const bottom2ArrayNoRepeat = [...new Set(bottom2Array)];
    const bottom2Obj = {};
    bottom2ArrayNoRepeat.forEach((item) => {
        const results = bottom2Array.filter((num) => {
            return num === item;
        });

        bottom2Obj[`${item}`] = results.length;
    });

    // เรียงลำดับค่าตามจำนวน count
    const sortedBottom2Obj = Object.fromEntries(
        Object.entries(bottom2Obj).sort((a, b) => b[1] - a[1])
    );

    return sortedBottom2Obj;

}

module.exports = {
    searchData: searchData,
};