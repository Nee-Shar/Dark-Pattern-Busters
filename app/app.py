from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from joblib import load
import numpy as np

app = FastAPI()

# Load the trained SVM model, TF-IDF vectorizer, and LabelEncoder
loaded_model = load('../svm_model.joblib')
loaded_vectorizer = load('../tfidf_vectorizer.joblib')
label_encoder = load('../label_encoder.joblib')  # Make sure to save and load your label_encoder object during training

class PredictionRequest(BaseModel):
    text: str

class PredictionResponse(BaseModel):
    predicted_category: str

@app.get("/")  # root path
def read_root():
    return {"Hello": "World"}

@app.post("/predict")
async def predict_category(request: PredictionRequest):
    try:
        # Transform the input text using the loaded TF-IDF vectorizer
        input_tfidf = loaded_vectorizer.transform([request.text])

        # Make predictions using the loaded SVM model
        prediction = loaded_model.predict(input_tfidf)

        # Convert the prediction to a readable category label using the LabelEncoder
        predicted_category = label_encoder.inverse_transform(np.array([prediction]))[0]

        return {"predicted_category": predicted_category}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
