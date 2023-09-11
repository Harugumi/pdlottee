// ใส่คำแนะนำใน input เมื่อโหลดหน้า
document.getElementById("urlInput").placeholder = "กรุณาใส่ URL หรือเลือกจาก เว็บแนะนำ";

// เพิ่ม event listener บน <select> เพื่อตรวจสอบการเลือกตัวเลือก
document.getElementById("dropdown").addEventListener("change", function () {
    // รับค่าที่ถูกเลือกใน Dropdown
    const selectedOption = this.value;

    // ใส่ค่าที่ถูกเลือกลงในช่อง urlInput
    document.getElementById("urlInput").value = selectedOption;
});

document.getElementById("urlForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const url = document.getElementById("urlInput").value;

    fetch(`/news?url=${url}`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = ""; // เคลียร์ผลลัพธ์ก่อนแสดงผลใหม่

            // แสดงผลลัพธ์ในตารางความถี่

            if (data.twoDigitFrequency) {
                const twoDigitTable = createFrequencyTable(data.twoDigitFrequency, "Two-digit Frequency", data.twoDigitPercentage);
                resultDiv.innerHTML += twoDigitTable;
            }
            
            if (data.threeDigitFrequency) {
                const threeDigitTable = createFrequencyTable(data.threeDigitFrequency, "Three-digit Frequency", data.threeDigitPercentage);
                resultDiv.innerHTML += threeDigitTable;
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});
// ฟังก์ชันสร้างตารางความถี่
function createFrequencyTable(frequencyData, tableName) {
    // ทำการเรียงลำดับความถี่ (value) จากมากไปน้อย
    const sortedFrequencyData = Object.entries(frequencyData).sort((a, b) => b[1] - a[1]);

    let tableHTML = `<h2>${tableName}:</h2><table>`;
    tableHTML += `
        <thead>
            <tr>
                <th>Number</th>
                <th>Frequency</th>
                <th>Percentage</th>
            </tr>
        </thead>
        <tbody>`;
    const totalFrequency = Object.values(frequencyData).reduce((acc, val) => acc + val, 0);

    for (const [number, frequency] of sortedFrequencyData) {
        const percentage = ((frequency / totalFrequency) * 100).toFixed(2);
        tableHTML += `
            <tr>
                <td>${number}</td>
                <td>${frequency}</td>
                <td>${percentage}%</td>
            </tr>`;
            
    }
    tableHTML += `
        </tbody>
    </table>`;
    return tableHTML;
}