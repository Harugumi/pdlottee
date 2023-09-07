function calculateAge() {
    // ดึงข้อมูลวันเดือนปีเกิดจาก input
    const birthdateInput = document.getElementById("birthdate");
    const birthdate = new Date(birthdateInput.value);

    // ดึงข้อมูลวันเดือนปีปัจจุบัน
    const now = new Date();

    // คำนวณผลต่าง input กับ ปัจจุบัน
    const ageMilliseconds = now - birthdate;
    const ageDate = new Date(ageMilliseconds);

    // คำนวณ วันเดือนปี แยกออกมาเป็น 3 ตัวและไม่ให้ติดลบ
    const ageDay = Math.abs(now.getUTCDate() - birthdate.getUTCDate());
    const ageMonth = Math.abs(now.getUTCMonth() - birthdate.getUTCMonth());
    const ageYear = Math.abs(now.getUTCFullYear() - birthdate.getUTCFullYear());
    
    // เพิ่มเงื่อนไขให้เพิ่ม 3 เมื่อตัวแปรมีค่าเป็น 0
    const resultDay = ageDay === 0 ? ageDay + 3 : ageDay;
    const resultMonth = ageMonth === 0 ? ageMonth + 3 : ageMonth;
    const resultYear = ageYear === 0 ? ageYear + 4 : ageYear;

    // result วัน เดือน ปี
    const resultdmy = document.getElementById("result");
    resultdmy.textContent = `${resultDay} / ${resultMonth} / ${resultYear}`;

    // คำนวณ วัน เดือน ปี รวมกัน
    const sumResult = ageDay + ageMonth + ageYear;

     // คำนวณเวลาเฉพาะ (เวลาชั่วโมง) ปัจจุบัน
    const currentHour = now.getUTCHours();
    const specificTime = Math.abs(currentHour - 12) / 4;

    // ปัดค่า specificTime ขึ้นหรือลงตามเงื่อนไข
    const roundedSpecificTime = Math.round(specificTime);

    // คำนวณผลลัพธ์ที่รวมผลการคำนวณอายุและเวลาเฉพาะ
    let Resultmul2 = sumResult * 2 + roundedSpecificTime;

    // ตรวจสอบว่าผลลัพธ์เกิน 99 หรือไม่
    if (Resultmul2 <= 99) {
        // กรณีผลลัพธ์ไม่เกิน 99
        const finalResult1 = Resultmul2 + ageDay;

        // ตรวจสอบว่าผลลัพธ์หลังบวก ageDay เกิน 99 หรือไม่
        if (finalResult1 <= 99) {
            // ถ้าไม่เกิน 99 แสดงผลลัพธ์ในรูปแบบจำนวนเต็ม
            const finalResult1String = finalResult1 <= 9 ? `0${finalResult1}` : `${finalResult1}`;
            const resultdmy = document.getElementById("result");
            resultdmy.textContent = `${finalResult1String}`;
        } 
        else 
        {
            // ถ้าเกิน 99 แสดงผลลัพธ์หารด้วย 1.5 ในรูปแบบจำนวนเต็ม
            const finalResult2 = Math.floor(finalResult1 / 1.5);
            const finalResult2String = finalResult2 <= 9 ? `0${finalResult2}` : `${finalResult2}`;
            const resultdmy = document.getElementById("result");
            resultdmy.textContent = `${finalResult2String}`;
        }
    } 
    else {
        // กรณีผลลัพธ์เกิน 99
        const finalResult3 = Resultmul2 - ageDay ;

        // ตรวจสอบว่าผลลัพธ์หลังลบ ageDay เกิน 99 หรือไม่
        if (finalResult3 <= 99) {
            // ถ้าไม่เกิน 99 แสดงผลลัพธ์ในรูปแบบจำนวนเต็ม
            const finalResult4 = Math.floor(finalResult3 / 2.5);
            const finalResult4String = finalResult4 <= 9 ? `0${finalResult4}` : `${finalResult4}`;
            const resultdmy = document.getElementById("result");
            resultdmy.textContent = `${finalResult4String}`;
        } 
        else 
        {
            // ถ้าเกิน 99 แสดงผลลัพธ์หารด้วย 1.5 ในรูปแบบจำนวนเต็ม
            const finalResult5 = Math.floor(finalResult3 / 3.5);
            const finalResult5String = finalResult5 <= 9 ? `0${finalResult5}` : `${finalResult5}`;
            const resultdmy = document.getElementById("result");
            resultdmy.textContent = `${finalResult5String}`;
        }
    }
}

