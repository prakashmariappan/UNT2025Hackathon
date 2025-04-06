from . import db
from datetime import datetime
from sqlalchemy import Sequence


class Transactions(db.Model):
    __bind_key__ = 'db'
    id = db.Column(db.Integer, Sequence('MedicineTypes_sequence'), unique=True, nullable=False, primary_key=True)
    source_account_number = db.Column(db.Integer)
    destination_account_number = db.Column(db.Integer)
    amount_before_transaction = db.Column(db.Float)
    amount_debited = db.Column(db.Float)
    transaction_time = db.Column(db.TIMESTAMP, default=datetime.now)
    amount_after_transaction = db.Column(db.Float)
    company_name = db.Column(db.String(255))
    company_website =db.Column(db.String(255))
    risk_score_dest = db.Column(db.Integer)
    is_fraud = db.Column(db.Integer)
    status = db.Column(db.String(255))
    created_at = db.Column(db.TIMESTAMP, default=datetime.now)
