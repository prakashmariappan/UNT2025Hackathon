from . import db
from datetime import datetime
from sqlalchemy import Sequence


class UserCreditCard(db.Model):
    __bind_key__ = 'db'
    id = db.Column(db.Integer, Sequence('UserCreditCard_sequence'), unique=True, nullable=False, primary_key=True)
    account_number = db.Column(db.String(255))
    card_number = db.Column(db.String(255))
    name_on_card = db.Column(db.String(255))
    expire_month = db.Column(db.Integer)
    expire_year = db.Column(db.Integer)
    cvv = db.Column(db.Integer)
    amount = db.Column(db.Float)
    mail_id = db.Column(db.String(255))
    created_at = db.Column(db.TIMESTAMP, default=datetime.now)