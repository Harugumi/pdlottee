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
    const input = document.getElementById("input").value;
    const output = document.getElementById("output");
    fetch(`/search?input=${input}`)
        .then((response) => response.json())
        .then((data) => {
            output.innerHTML = "";
            data.forEach((item) => {
                output.innerHTML += `
                    Date: ${item.Date}\n
                    jackpot: ${item.jackpot}\n
                    2 bottom: ${item["2 bottom"]}\n
                    3 front 1: ${item["3 front 1"]}\n
                    3 front 2: ${item["3 front 2"]}\n
                    3 bottom 1: ${item["3 bottom 1"]}\n
                    3 bottom 2: ${item["3 bottom 2"]}\n
                `;
            });
        });
});
