function getNews(req, res) {
    const url = req.query.url;

    if (!url) {
        res.status(400).send("กรุณาระบุ URL ในพารามิเตอร์ 'url'");
        return;
    }

    fetch(url)
        .then((response) => response.text())
        .then((data) => {
            
            const twoDigitMatches = data.match(/\b\d{2}\b/g) || [];
            const threeDigitMatches = data.match(/\b\d{3}\b/g) || [];

            const twoDigitFrequency = {};
            const threeDigitFrequency = {};

            // นับความถี่ของตัวเลข
            twoDigitMatches.forEach((number) => {
                if (twoDigitFrequency[number]) {
                    twoDigitFrequency[number]++;
                } else {
                    twoDigitFrequency[number] = 1;
                }
            });

            threeDigitMatches.forEach((number) => {
                if (threeDigitFrequency[number]) {
                    threeDigitFrequency[number]++;
                } else {
                    threeDigitFrequency[number] = 1;
                }
            });

            const numbersToProcess = ['1', '2', '16', '17', '30', '31'];
            for (const number of numbersToProcess) {
                if (twoDigitFrequency[number] > 100) {
                    twoDigitFrequency[number] = Math.floor((twoDigitFrequency[number] - 30) / 4);
                }
            }
            
            const numbersToProcess10 = ["0", "00", "10", "15", "25", "50"];
            for (const number of numbersToProcess10) {
                if (twoDigitFrequency[number] > 60) {
                    twoDigitFrequency[number] = Math.floor((twoDigitFrequency[number] - 30) / 3.5);
                }
            }

            const numbersToProcessYear = ["2566", "66", "/66", "-66"];
            for (const number of numbersToProcessYear) {
                if (twoDigitFrequency[number] > 50) {
                    twoDigitFrequency[number] = Math.floor((twoDigitFrequency[number] - 30) / 5);
                }
            }

            for (const number in twoDigitFrequency) {
                twoDigitFrequency[number] = Math.floor(twoDigitFrequency[number]);
            }

            for (const number in threeDigitFrequency) {
                threeDigitFrequency[number] = Math.floor(threeDigitFrequency[number]);
            }

            res.json({
                twoDigitFrequency,
                threeDigitFrequency,
            });
        })
        .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
            res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
        });
}

module.exports = getNews;
