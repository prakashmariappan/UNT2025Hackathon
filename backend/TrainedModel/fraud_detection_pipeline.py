import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import make_pipeline
from sklearn.metrics import classification_report
import joblib

# Load the data
df = pd.read_csv('enhanced_transactions_with_rules2.csv')

# Prepare the data with one-hot encoding for the account number
X = df[['destination_account_number', 'amount_before_transaction', 'amount_debited', 'amount_after_transaction']]
y = df['is_fraud']

# Define a column transformer
column_transformer = ColumnTransformer(
    [
        ('ohe', OneHotEncoder(handle_unknown='ignore'), ['destination_account_number']),
        ('scaler', StandardScaler(), ['amount_before_transaction', 'amount_debited', 'amount_after_transaction',])
    ],
    remainder='passthrough'
)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the model
model = make_pipeline(column_transformer, RandomForestClassifier(random_state=42))
model.fit(X_train, y_train)

# Evaluate the model
predictions = model.predict(X_test)
print(classification_report(y_test, predictions))

# Save the model
joblib.dump(model, 'fraud_detection_model.pkl')
