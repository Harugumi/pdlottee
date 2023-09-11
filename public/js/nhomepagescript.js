window.addEventListener("scroll", function () {
    var scrolled = window.scrollY;

    if (scrolled > 50) {
        document.getElementById("navbar").classList.add("sticky");
    } else {
        document.getElementById("navbar").classList.remove("sticky");
    }
});

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
    const output = document.getElementById("output");
    console.log(data[0]);
    const table = document.createElement("TABLE");
    output.appendChild(table);
    const tableHeaderRow = document.createElement("TR");
    table.appendChild(tableHeaderRow);

    const column = ["Date", "2 bottom", "3 front 1", "3 front 2", "3 bottom 1", "3 bottom 2"];
    for (let i = 0; i < 6; i++) {
        const tableHeader = document.createElement("TH");
        tableHeader.innerHTML = column[i];
        table.appendChild(tableHeader);
    }
    data.forEach((item) => {
        const tableRow = document.createElement("TR");
        for (let i = 0; i < 6; i++) {
            const tableData = document.createElement("TD");
            if (i === 0) {
                tableData.innerHTML = `${item.Date}/${item.Month}/${item.Year}`;
            } else {
                tableData.innerHTML = item[column[i]];
            }
            tableRow.appendChild(tableData);
        }
        table.appendChild(tableRow);
    });
}
