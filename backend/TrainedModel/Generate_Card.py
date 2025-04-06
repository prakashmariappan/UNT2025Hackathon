import random

def generate_account_numbers(count=4, length=10):
    """ Generate random account numbers. """
    account_numbers = []
    for _ in range(count):
        number = ''.join([str(random.randint(0, 9)) for _ in range(length)])
        account_numbers.append(number)
    return account_numbers

def generate_card_details(count=4):
    """ Generate random credit card numbers and expiry dates. """
    card_details = []
    for _ in range(count):
        # Generate a card number (typically 16 digits)
        card_number = ''.join([str(random.randint(0, 9)) for _ in range(16)])
        # Generate an expiry date (MM/YY format)
        expiry_month = random.randint(1, 12)
        expiry_year = random.randint(22, 30)  # Assuming the card expires sometime between 2022 and 2030
        expiry_date = f'{expiry_month:02d}/{expiry_year}'
        # Generate a CVV (3 digits)
        cvv = ''.join([str(random.randint(0, 9)) for _ in range(3)])
        card_details.append({
            'card_number': card_number,
            'expiry_date': expiry_date,
            'cvv': cvv
        })
    return card_details

# Generate and print account numbers
account_numbers = generate_account_numbers()
print("Generated Account Numbers:", account_numbers)

# Generate and print card details
card_details = generate_card_details()
print("Generated Card Details:", card_details)
