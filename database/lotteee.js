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
    return bottom3Obj;
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
    return bottom2Obj;
    
//---------------------------------------------------------------------------------//
    /*
    const jackpot6Array = [];
    findResult.forEach((item) => {
        jackpot6Array.push(item["jackpot"]);
    });
    const jackpot6ArrayNoRepeat = [...new Set(jackpot6Array)];
    const jackpotObj = {};
    jackpot6ArrayNoRepeat.forEach((item) => {
        const results = jackpot6Array.filter((num) => {
            return num === item;
        });

        jackpotObj[`${item}`] = results.length;
    });
     return jackpotObj;
    */
}

module.exports = {
    searchData: searchData,
};
