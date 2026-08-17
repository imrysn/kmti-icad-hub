import requests

try:
    response = requests.get('http://localhost:3001/api/v1/tts/voices')
    print("Status Code:", response.status_code)
    print("Response JSON:", response.json())
except Exception as e:
    print("Error:", e)
