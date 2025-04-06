from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import random
import pandas as pd
from TrainedModel.get_fdp import predict_fdp
from models.user_creadit_card import UserCreditCard
from models.transactions import Transactions
from models import db, init_app
from datetime import datetime
import os

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)
init_app(app)
app.config['Instance'] = 'instance'
app.config['models'] = 'models'
app.config['TrainedModel'] = 'TrainedModel'


def verify_card_detials(name_on_card, card_number, expire_month, expire_year, cvv):
    account_fount_ = False
    amount_before_transaction = 0
    account_number = 0
    mail_id = ''
    user_id = 0
    users = UserCreditCard.query.filter_by(card_number=str(card_number),
                                           name_on_card=str(name_on_card), expire_month=expire_month,
                                           expire_year=expire_year, cvv=cvv).one()

    if users:
        account_fount_ = True

        amount_before_transaction = users.amount
        account_number = users.account_number
        mail_id = users.mail_id
        user_id = users.id
        return account_fount_, amount_before_transaction, account_number, mail_id, user_id
    else:
        return False, amount_before_transaction, account_number, mail_id, user_id


def update_user_data(account_number, amount_after_transaction, user_id):
    head = UserCreditCard(id=user_id, account_number=account_number,
                          amount=amount_after_transaction)
    try:
        db.session.merge(head)
        db.session.commit()
        db.session.close()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error while user updating data", 'error': e}), 400
    return jsonify({"message": "Your Transaction Is Marked As Fraud"}), 201


@app.route('/')
def home():
    data = jsonify({"Home": "Online Pharmacy API is running!"})
    return data


@app.route('/predict', methods=['POST'])
def predict():
    destination_account_number = request.form.get('destination_account_number')
    card_number = request.form.get('card_number')
    expire_month = request.form.get('expire_month')
    expire_year = request.form.get('expire_year')
    name_on_card = request.form.get('name_on_card')
    Amount = request.form.get('Amount')
    # source_account_number = request.form.get('source_account_number')
    company_website = request.form.get('company_website')
    company_name = request.form.get('company_name')
    # print(source_account_number)
    cvv = request.form.get('cvv')
    #
    account_fount_, amount_before_transaction, account_number, mail_id, user_id = verify_card_detials(name_on_card,
                                                                                                      card_number,
                                                                                                      expire_month,
                                                                                                      expire_year, cvv)

    # tfv = UserCreditCard.query.filter_by(account_number=str(source_account_number)).one()
    if account_fount_:
        source_account = int(account_number)
        dest_account = destination_account_number
        all_transactions = Transactions.query.all()
        print(source_account)
        data_ = predict_fdp(app, source_account, dest_account, all_transactions)

        if data_["value"] == 0:
            amount_after_transaction = float(amount_before_transaction) - float(Amount)
            update_user_data(str(account_number), amount_after_transaction, user_id)
        else:
            amount_after_transaction = amount_before_transaction
        if data_:
            head = Transactions(source_account_number=int(source_account),
                                destination_account_number=destination_account_number,
                                amount_before_transaction=amount_before_transaction,
                                amount_after_transaction=amount_after_transaction,
                                company_name=company_name,
                                company_website=company_website,
                                risk_score_dest=1,
                                is_fraud=data_["value"],
                                status=data_['result'],
                                amount_debited=Amount)
            # try:
            db.session.add(head)
            db.session.commit()
            transaction_id = head.id
            transaction_id_transaction_time = head.transaction_time
            db.session.close()
            # except Exception as e:
            #     db.session.rollback()
            #     return jsonify({"message": "Error while user pushing data", 'error': e}), 400
        print(mail_id)
        if mail_id and (data_['result'] == "Fraud" or data_['result'] == "User review needed"):
            send_fraud_review_email(transaction_id, Amount, transaction_id_transaction_time, mail_id, company_name,
                                    company_website)
        return jsonify({"message": "Transaction Completed", "data_": data_}), 201
    else:
        return jsonify({"Message": "Incorrect card details", "data_": ""})


def load_excel_data(file_path):
    return pd.read_excel(file_path)


def send_mail(mail):
    print('send_mail')
    return "send_mail"


def send_fraud_review_email(transaction_id, amount, date, email_id_, company_name, company_website):
    import smtplib
    from email.message import EmailMessage

    from_ = 'sandeep.kumar.rudhravaram@gmail.com'
    password_ = "exjulkvhparxwnna"

    msg = EmailMessage()
    msg['Subject'] = "Transaction Review Needed For A Transaction ID " + str(transaction_id)
    msg['From'] = from_
    msg['To'] = email_id_

    # Define the HTML content directly with style and dynamic placeholders
    html_content = f"""
<html>
<head>
    <style>
        body {{
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }}
        .content {{
            max-width: 600px;
            margin: 20px auto;
            background: white;
            padding: 20px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            border-radius: 8px;
        }}
        h1 {{
            color: #333;
        }}
        p {{
            color: #666;
            font-size: 16px;
            line-height: 1.5;
        }}
        .button {{
            display: inline-block;
            padding: 10px 20px;
            margin: 10px 0;
            font-size: 16px;
            cursor: pointer;
            text-align: center;
            text-decoration: none;
            outline: none;
            color: #fff;
            border: none;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        }}
        .button-red {{
            background-color: #f44336;
        }}
        .button-red:hover {{
            background-color: #d32f2f;
        }}
        .button-green {{
            background-color: #4CAF50;
        }}
        .button-green:hover {{
            background-color: #388e3c;
        }}
    </style>
</head>
<body>
    <div class="content">
        <h1>Transaction Review Required</h1>
        <p>Please review the details of the transaction below and confirm whether it is fraudulent:</p>
        <p><strong>Transaction ID:</strong> {transaction_id}</p>
        <p><strong>Company Name:</strong> {company_name}</p>
        <p><strong>Company Website</strong> {company_website}</p>
        <p><strong>Amount:</strong> ${amount}</p>
        <p><strong>Date:</strong> {date}</p>
        <a href="http://127.0.0.1:5000/mark_fraud/{transaction_id}" class="button button-red">A Fraud</a>
        <a href="http://127.0.0.1:5000/mark_safe/{transaction_id}" class="button button-green">Not A Fraud</a>
    </div>
</body>
</html>
    """

    msg.add_alternative(html_content, subtype='html')

    # Connect to SMTP server and send the email
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(from_, password_)
        smtp.send_message(msg)


@app.route('/mark_fraud/<string:_id>')
def mark_fraud(_id):
    head = Transactions(id=_id,
                        is_fraud=1,
                        status="Fraud",
                        transaction_time=datetime.now())
    try:
        db.session.merge(head)
        db.session.commit()
        db.session.close()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error while user updating data", 'error': e}), 400
    return jsonify({"message": "Your Transaction Is Marked As Fraud"}), 201


@app.route('/mark_safe/<string:_id>')
def mark_safe(_id):
    try:
        tfv = Transactions.query.filter_by(id=_id).one()

        # head = Transactions(source_account_number=int(source_account),
        #                     destination_account_number=destination_account_number,
        #                     amount_before_transaction=amount_before_transaction,
        #                     amount_after_transaction=amount_after_transaction,
        #                     company_name=company_name,
        #                     company_website=company_website,
        #                     risk_score_dest=1,
        #                     is_fraud=data_["value"],
        #                     status=data_['result'],
        #                     amount_debited=Amount)

        fraud_count = UserCreditCard.query.filter_by(account_number=tfv.source_account_number).count()

        amount_after_transaction = float(tfv.amount_before_transaction) - float(tfv.amount_debited)

        update_user_data(str(tfv.source_account_number), amount_after_transaction, fraud_count.id)
    except:
        amount_after_transaction = 0

    head = Transactions(id=_id,
                        is_fraud=0,
                        status="Not Fraud",
                        transaction_time=datetime.now(),
                        amount_after_transaction=amount_after_transaction)
    try:
        db.session.merge(head)
        db.session.commit()
        db.session.close()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error while user updating data", 'error': e}), 400
    return jsonify({"message": "Your Transaction Is Marked As Not A Fraud"}), 201


@app.route('/insert_credit_card', methods=['POST'])
def insert_credit_card_data():
    file_path = os.path.join(app.config["TrainedModel"], "credit_card_details4.xlsx")
    data = load_excel_data(file_path)

    for _, row in data.iterrows():
        expire_month, expire_year = map(int,
                                        row['expire_date'].split('/'))  # Splitting the date and converting to integers

        credit_card = UserCreditCard(
            account_number=row['account_number'],
            card_number=row['card_number'],
            name_on_card=row['name_on_card'],
            expire_year=expire_year,
            expire_month=expire_month,
            cvv=int(row['cvv']),
            amount=row['amount'],
            mail_id=row['mail_id']
        )
        db.session.add(credit_card)
    db.session.commit()

    return jsonify({"success": "Yo"})


@app.route('/credit_card_data', methods=['GET'])
def credit_card_data():
    users = UserCreditCard.query.all()
    return jsonify([{k: v for k, v in u.__dict__.items() if not k.startswith('_')} for u in users])


@app.route('/data', methods=['GET'])
def transactions_data():
    users = Transactions.query.all()
    return jsonify([{k: v for k, v in u.__dict__.items() if not k.startswith('_')} for u in users])


@app.route('/count_fraud', methods=['GET'])
def count_fraud():
    try:
        # Query the number of fraudulent transactions
        fraud_count = Transactions.query.filter_by(is_fraud=1).count()
        return jsonify({'fraud_count': fraud_count}), 200
    except Exception as e:
        # Handle errors in database query or connection
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    # gcloud run deploy --image gcr.io/htunt2025/htunt2025 --platform managed  --project=htunt2025
    # gcloud builds submit --tag gcr.io/htunt2025/htunt2025 --project=htunt2025
    app.run(debug=True)
