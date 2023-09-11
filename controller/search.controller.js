const { searchData } = require("../database/lotteee");

async function callSearchData(month, year, cb) {
    const result = await searchData(month, year);
    cb(result);
}

module.exports = {
    callSearchData: callSearchData,
};
