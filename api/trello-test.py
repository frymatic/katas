import requests

# Replace these placeholders with your actual Trello credentials


# Trello API URL for the card's checklist
url = f"https://api.trello.com/1/cards/{CARD_ID}/checklists"

# Query parameters
params = {
    "key": TRELLO_API_KEY,
    "token": TRELLO_API_TOKEN
}

# Make the request
try:
    response = requests.get(url, params=params)

    if response.status_code == 200:
        print("Checklist Data:", response.json())  # Success: Print the JSON response
    else:
        print("Failed to fetch data.")
        print("Status Code:", response.status_code)
        print("Response Text:", response.text)  # Error details from Trello
except Exception as e:
    print("An error occurred:", str(e))
