const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", () => {
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;
    fetch(`/search?month=${month}&year=${year}`)
        .then((response) => response.json())
        .then((data) => {
            const sortedData = sortDataByCount(data);
            createTable(sortedData);

        });
});

function createTable(data) {
    console.log(data);

    const output = document.getElementById("output");
    if (output.childNodes.length) {
        output.removeChild(output.childNodes[0]);
    }

    const table = document.createElement("TABLE");
    output.appendChild(table);

    const tableHeaderRow = document.createElement("TR");
    table.appendChild(tableHeaderRow);

    const column = ["2 bottom", "count", "3 front", "count", "3 bottom", "count",];
    for (let i = 0; i < 2; i++) {
        const tableHeader = document.createElement("TH");
        tableHeader.innerHTML = column[i];
        table.appendChild(tableHeader);
    }
    const keys = Object.keys(data);
    const values = Object.values(data);

    keys.forEach((item, index) => {
        const tableRow = document.createElement("TR");
        for (let i = 0; i < 2; i++) {
            const tableData = document.createElement("TD");
            if (i === 0) {
                tableData.innerHTML = item;
            } else if (i === 1) {
                tableData.innerHTML = values[index];
            }
            tableRow.appendChild(tableData);
        }
        table.appendChild(tableRow);
    });
}

function sortDataByCount(data) {
    const keys = Object.keys(data);

    keys.sort((a, b) => data[b] - data[a]);

    const sortedData = {};
    keys.forEach((key) => {
        sortedData[key] = data[key];
    });

    return sortedData;
}