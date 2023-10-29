from fastapi import FastAPI, HTTPException, Body
from tensorflow import keras
from datetime import datetime
from pydantic import BaseModel
from fastapi.responses import FileResponse

app = FastAPI()

# Load the saved model
model = keras.models.load_model('I:\prototable (1)\prototable\APIflask\my_model.keras2')

# Define the input data model
class InputData(BaseModel):
    input_data: int

# Serve the HTML page
@app.get("/")
def get_webpage():
    return FileResponse("templates/index.html")

# Handle predictions
@app.post("/predict")
def predict(data: InputData):
    try:
        input_data = data.input_data

        current_date = datetime.now()

        day = current_date.day
        month = current_date.month
        year = current_date.year

        sample_data = [[day, month, year, input_data]]

        predictions = model.predict(sample_data)

        formatted_result = str(float(predictions[0][0]))

        pzero_result = '0' + formatted_result

        point_result = pzero_result.replace('.', '0')

        if len(point_result) > 14:
            point_result = point_result[:14]

        split_result = ' '.join(point_result[i:i+2] for i in range(0, len(point_result), 2))
        
        split_result = split_result[2:]

        return {"prediction": split_result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
