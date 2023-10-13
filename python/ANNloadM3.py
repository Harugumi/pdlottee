from tensorflow import keras
from datetime import datetime

# Load the saved model
model = keras.models.load_model('my_model.keras3')

# รับวันที่ปัจจุบัน
current_date = datetime.now()

# แปลงวันที่ปัจจุบันเป็นรูปแบบที่ต้องการ เช่น DD, M, YYYY
day = current_date.day
month = current_date.month
year = current_date.year

# ตัวอย่างข้อมูลที่แปลงเป็นตัวเลขโดยใช้วันที่ปัจจุบัน
sample_data = [[day, month, year, 412]]  # ตัวอย่างข้อมูลที่เป็นตัวเลขเสมอ

# ทำนายผล
predictions = model.predict(sample_data)

# แปลงผลลัพธ์เป็นสตริงแบบไม่มีทศนิยม
formatted_result = str(float(predictions[0][0]))

# เพิ่มเลข 0 หน้าผลลัพธ์
pzero_result = '0' + formatted_result

# เอาจุดทศนิยมออก
point_result = pzero_result.replace('.', '0')

# เอาจุดทศนิยมออกและจำกัดตำแหน่งไม่เกิน 16 ตำแหน่ง
if len(point_result) > 12:
    point_result = point_result[:12]

# แบ่งเลขออกเป็น 2 ตัว
split_result = ' '.join(point_result[i:i+3] for i in range(0, len(point_result), 3))

# แสดงผลลัพธ์
print(split_result)
