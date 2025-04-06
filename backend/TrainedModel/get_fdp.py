import os.path
import random
import pandas as pd


def get_histroy_data(df):
    all_source_accounts = set(df['source_account_number'])
    fraud_accounts = set(df[df['is_fraud'] == 4]['destination_account_number'].unique())
    fraud_transactions = df[df['is_fraud'] == 1][['source_account_number', 'destination_account_number']].apply(tuple,
                                                                                                                axis=1).to_list()
    all_transactions = set(zip(df['source_account_number'], df['destination_account_number']))

    return all_source_accounts, fraud_accounts, fraud_transactions, all_transactions


def predict_fdp(app, source_account, dest_account, all_transactions):
    print(os.path.join(app.config["TrainedModel"], "enhanced_transactions_with_rules4.csv"))
    df_excel = pd.read_csv(os.path.join(app.config["TrainedModel"], "enhanced_transactions_with_rules4.csv"))

    # Convert the SQLAlchemy model instances into a list of dictionaries
    if all_transactions:
        data = [{column.name: getattr(transaction, column.name) for column in transaction.__table__.columns} for
                transaction
                in all_transactions]
        df_db = pd.DataFrame(data)
    else:
        df_db = pd.DataFrame()

    combined_df = pd.concat([df_db, df_excel], ignore_index=True)

    # Check if the source account exists in the dataset
    all_source_accounts, fraud_accounts, fraud_transactions, all_transactions = get_histroy_data(combined_df)
    # Convert source_account to integer for correct comparison
    try:
        source_account_int = int(source_account)  # Convert source_account to integer
    except ValueError:
        pass

    try:
        dest_account_int = int(dest_account)  # Convert source_account to integer
    except ValueError:
        pass

    if source_account_int not in all_source_accounts:
        return {'result': 'Account not found', "value": 1}

    # Check if destination account has history of fraud with this specific source account
    if (source_account_int, dest_account_int) in fraud_transactions:
        return {'result': 'Fraud', "value": 1}

    if dest_account_int in fraud_accounts:
        return {'result': 'Fraud', "value": 1}

    # Check if this is the first time transfer from this source to this destination
    if (source_account_int, dest_account_int) not in all_transactions:
        return {'result': 'User review needed', "value": 2}

    return {'result': 'Not fraud', "value": 0}

# # Example call to the function
# result = predict_fdp(1099, 1069)
# print(result)
