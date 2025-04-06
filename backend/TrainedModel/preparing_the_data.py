import pandas as pd
import numpy as np
from datetime import datetime, timedelta


def generate_account_details(n_accounts):
    account_numbers = np.arange(1001, 1001 + n_accounts)
    account_names = ["Account_" + str(i) for i in account_numbers]
    company_names = ["Company_" + str(i) for i in account_numbers]
    company_websites = ["www.company" + str(i) + ".com" for i in account_numbers]
    risk_scores = np.random.choice([0, 1, 2, 3, 4], size=n_accounts, p=[0.5, 0.2, 0.15, 0.1, 0.05])
    return pd.DataFrame({
        'account_number': account_numbers,
        'account_name': account_names,
        'company_name': company_names,
        'company_website': company_websites,
        'risk_score': risk_scores
    })


def generate_credit_card_details(accounts):
    today = datetime.now()
    accounts['card_number'] = [
        f'{np.random.randint(1000, 9999)}-{np.random.randint(1000, 9999)}-{np.random.randint(1000, 9999)}-{np.random.randint(1000, 9999)}'
        for _ in range(accounts.shape[0])]
    accounts['name_on_card'] = accounts['account_name']
    accounts['expire_date'] = [(today + timedelta(days=365 * 5)).strftime('%m/%Y') for _ in range(accounts.shape[0])]
    accounts['cvv'] = [f'{np.random.randint(100, 999)}' for _ in range(accounts.shape[0])]
    return accounts[['account_number', 'card_number', 'name_on_card', 'expire_date', 'cvv']]




def generate_data(n_samples, accounts):
    # Generate synthetic transaction data
    data = {
        'source_account_number': np.random.choice(accounts['account_number'], size=n_samples),
        'destination_account_number': np.random.choice(accounts['account_number'], size=n_samples),
        'amount_before_transaction': np.random.uniform(1000, 10000, size=n_samples),
        'amount_debited': np.random.uniform(100, 500, size=n_samples),
        'transaction_time': np.random.choice(pd.date_range(start='2022-01-01', periods=100, freq='D'), size=n_samples)
    }
    df = pd.DataFrame(data)
    df['amount_after_transaction'] = df['amount_before_transaction'] - df['amount_debited']

    # Merge company details and risk scores
    df = df.merge(accounts[['account_number', 'company_name', 'company_website', 'risk_score']],
                  how='left', left_on='destination_account_number', right_on='account_number')
    df.rename(columns={'risk_score': 'risk_score_dest'}, inplace=True)

    # Flag potential fraud
    df['is_fraud'] = (df['risk_score_dest'] >= 1).astype(int)

    # Rule: A cheated account cannot cheat
    fraud_victim_accounts = df[df['is_fraud'] == 1]['destination_account_number'].unique()
    df.loc[df['source_account_number'].isin(fraud_victim_accounts), 'is_fraud'] = 0

    # Cleanup
    df.drop(columns=['account_number'], inplace=True)

    return df


# Generate account details
accounts = generate_account_details(100)

# Generate credit card details
credit_card_details = generate_credit_card_details(accounts)

# Save credit card details to a separate Excel file
credit_card_details.to_excel('credit_card_details4.xlsx', index=False)


# Generate 1000 transactions
df = generate_data(1000, accounts)

# Save transaction data to a CSV file
df.to_csv('enhanced_transactions_with_rules4.csv', index=False)