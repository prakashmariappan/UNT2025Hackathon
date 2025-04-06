from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)
model = joblib.load('fraud_detection_model.pkl')


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        # Now expecting 'destination_account_number' as part of the input
        features = {
            'destination_account_number': [data['destination_account_number']],
            'amount_before_transaction': [data['amount_before_transaction']],
            'amount_debited': [data['amount_debited']],
            'amount_after_transaction': [data['amount_after_transaction']]
        }

        # DataFrame to match the training structure
        features_df = pd.DataFrame(features)

        # Make prediction
        prediction = model.predict(features_df)
        return jsonify({'fraud': bool(prediction[0])})
    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)
