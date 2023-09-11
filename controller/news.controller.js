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

            const numbersToProcess100 = [ "556", "255", "000",  "100", "200", "300", "400", "500", "600", "700", "800", "900"];
            for (const number of numbersToProcess100) {
                if (threeDigitFrequency[number] > 60) {
                    threeDigitFrequency[number] = Math.floor((threeDigitFrequency[number] - 30) / 3.5);
                }
            }

            // ทำการปัดลงเป็นจำนวนเต็มก่อนแสดงผล
            for (const number in twoDigitFrequency) {
                twoDigitFrequency[number] = Math.floor(twoDigitFrequency[number]);
            }

            for (const number in threeDigitFrequency) {
                threeDigitFrequency[number] = Math.floor(threeDigitFrequency[number]);
            }

            // คำนวณเปอร์เซ็นต์
            const totalTwoDigitFrequency = Object.values(twoDigitFrequency).reduce((acc, val) => acc + val, 0);
            const totalThreeDigitFrequency = Object.values(threeDigitFrequency).reduce((acc, val) => acc + val, 0);

            const twoDigitPercentage = {};
            const threeDigitPercentage = {};

            for (const number in twoDigitFrequency) {
                twoDigitPercentage[number] = ((twoDigitFrequency[number] / totalTwoDigitFrequency) * 100).toFixed(2);
            }

            for (const number in threeDigitFrequency) {
                threeDigitPercentage[number] = ((threeDigitFrequency[number] / totalThreeDigitFrequency) * 100).toFixed(2);
            }

            // ส่งข้อมูลที่ค้นพบกลับเป็น JSON ในการตอบสนอง
            res.json({
                twoDigitFrequency,
                threeDigitFrequency,
                twoDigitPercentage,
                threeDigitPercentage
            });
        })
        .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
            res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
        });
}

module.exports = getNews;
