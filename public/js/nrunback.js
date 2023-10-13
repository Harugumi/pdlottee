const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", () => {
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;
    fetch(`/search?month=${month}&year=${year}`)
        .then((response) => response.json())
        .then((data) => {
            createTable(data);
            // output.innerHTML = "";
            // data.forEach((item) => {
            //     output.innerHTML += `
            //         Date: ${item.Date}\n
            //         jackpot: ${item.jackpot}\n
            //         2 bottom: ${item["2 bottom"]}\n
            //         3 front 1: ${item["3 front 1"]}\n
            //         3 front 2: ${item["3 front 2"]}\n
            //         3 bottom 1: ${item["3 bottom 1"]}\n
            //         3 bottom 2: ${item["3 bottom 2"]}\n
            //     `;
            // });
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