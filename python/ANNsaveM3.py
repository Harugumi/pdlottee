import tensorflow as tf
from tensorflow import keras
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
import numpy as np
from sklearn.metrics import mean_squared_error, mean_absolute_error
from tensorflow.keras import regularizers

# อ่านข้อมูลจากไฟล์ CSV
data = pd.read_csv('modelNN/lotteee.csv')

# แปลงข้อมูลเดือนให้เป็นตัวเลข
month_encoder = LabelEncoder()
data['Month'] = month_encoder.fit_transform(data['Month'])

# เลข 3 หลัก
# แบ่งชุดข้อมูลเป็น features (X) และ target (y)
X = data[['Date', 'Month', 'Year', '3 bottom 1']]
y = data['3 bottom 1']

# แบ่งชุดข้อมูลเป็นชุดข้อมูลการฝึกและชุดข้อมูลทดสอบ
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.00001, random_state=100)

# สร้าง StandardScaler และทำการ Scaling ข้อมูล
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# ปรับ input_shape ตามจำนวน features ที่เหลือ
input_shape = (X_train.shape[1],)

# สร้างโมเดล Neural Network
model = keras.Sequential([
    keras.layers.Dense(2048, activation='relu', kernel_regularizer=regularizers.l2(0.001), input_shape=input_shape),
    keras.layers.Dense(1024, activation='relu', kernel_regularizer=regularizers.l2(0.001)),
    keras.layers.Dense(512, activation='relu', kernel_regularizer=regularizers.l2(0.001)),
    keras.layers.Dense(256, activation='relu', kernel_regularizer=regularizers.l2(0.001)),
    keras.layers.Dense(128, activation='relu', kernel_regularizer=regularizers.l2(0.001)),
    keras.layers.Dense(64, activation='relu', kernel_regularizer=regularizers.l2(0.001)),
    keras.layers.Dense(32, activation='relu', kernel_regularizer=regularizers.l2(0.001)),
    keras.layers.Dense(1)  
])

# ปรับค่า learning rate ของ optimizer Adam
optimizer = keras.optimizers.Adam(learning_rate=0.0001)  # ลองปรับค่า learning rate ตามต้องการ
model.compile(optimizer=optimizer, loss='mean_squared_error', metrics=['mae'])

# ฝึกโมเดล
model.fit(X_train, y_train, epochs=150, validation_data=(X_test, y_test))

# ทดสอบโมเดล
predictions = model.predict(X_test)

# คำนวณ Mean Squared Error (MSE) และ Mean Absolute Error (MAE)
mse = mean_squared_error(y_test, predictions)
mae = mean_absolute_error(y_test, predictions)

print(f"Mean Squared Error: {mse}")
print(f"Mean Absolute Error: {mae}")

# บันทึกโมเดล Keras
model.save('my_model.keras3')
