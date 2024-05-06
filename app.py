from flask import Flask, request, render_template, jsonify
import numpy as np
from flask_cors import CORS
import pandas
import sklearn
import pickle

app = Flask(__name__)
CORS(app)

# Load models and scalers
model = pickle.load(open('model.pkl', 'rb'))
sc = pickle.load(open('standscaler.pkl', 'rb'))
ms = pickle.load(open('minmaxscaler.pkl', 'rb'))

# Crop dictionary
crop_dict = {
    1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut", 6: "Papaya", 7: "Orange",
    8: "Apple", 9: "Muskmelon", 10: "Watermelon", 11: "Grapes", 12: "Mango", 13: "Banana",
    14: "Pomegranate", 15: "Lentil", 16: "Blackgram", 17: "Mungbean", 18: "Mothbeans",
    19: "Pigeonpeas", 20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"
}

def load_features_from_request() -> list:
    """Load features from request form data"""
    features = [
        request.form['nitrogen'],
        request.form['phosporus'],
        request.form['potassium'],
        request.form['temperature'],
        request.form['humidity'],
        request.form['ph'],
        request.form['rainfall']
    ]
    return features

def preprocess_features(features: list) -> np.ndarray:
    """Preprocess features using MinMaxScaler and StandardScaler"""
    single_pred = np.array(features).reshape(1, -1)
    scaled_features = ms.transform(single_pred)
    final_features = sc.transform(scaled_features)
    return final_features

def make_prediction(features: np.ndarray) -> str:
    """Make prediction using the model"""
    prediction = model.predict(features)
    crop_id = prediction[0]
    if crop_id in crop_dict:
        crop = crop_dict[crop_id]
        result = "{} is the best crop to be cultivated right there".format(crop)
    else:
        result = "Sorry, we could not determine the best crop to be cultivated with the provided data."
    return result

@app.route('/')
# def index():
#     return render_template("index.html")

@app.route("/", methods=['POST'])
def predict():
    features = load_features_from_request()
    preprocessed_features = preprocess_features(features)
    result = make_prediction(preprocessed_features)
    return jsonify({'result': result})

if __name__ == "__main__":
    app.run(debug=True)

