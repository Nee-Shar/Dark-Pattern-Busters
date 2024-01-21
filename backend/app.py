from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from joblib import load
import numpy as np
from typing import List 

app = FastAPI()
# # Load the trained SVM model, TF-IDF vectorizer, and LabelEncoder

loaded_model = load('./svm_model.joblib')
loaded_vectorizer = load('./tfidf_vectorizer.joblib')
label_encoder = load('./label_encoder.joblib')

class PredictionRequest(BaseModel):
    texts: List[str]


# ... (omitted loading of model, vectorizer, and label encoder)


class PredictionResponse(BaseModel):
    predicted_categories: List[str]

# Configure CORS to allow requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You might want to replace "*" with a specific origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")  # root path
def read_root():
    return {"Hello": "World"}

@app.post("/predict")
async def predict_category(request: PredictionRequest):
    try:
        # Transform the input texts using the loaded TF-IDF vectorizer
        input_tfidf = loaded_vectorizer.transform(request.texts)

        # Make predictions using the loaded SVM model
        predictions = loaded_model.predict(input_tfidf)

        # Convert the predictions to readable category labels using the LabelEncoder
        predicted_categories = label_encoder.inverse_transform(predictions)

        return {"predicted_categories": predicted_categories.tolist()}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
