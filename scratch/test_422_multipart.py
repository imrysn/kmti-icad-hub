import requests
import json

# 1. Login
login_data = {
    "username": "admin",
    "password": "admin123"
}
response = requests.post("http://127.0.0.1:8000/api/v1/auth/login", json=login_data)
token = response.json()["access_token"]
headers = {"Authorization": f"Bearer {token}"}

# 2. Make PUT request
task_id = 467 # from console output
form_data = {
    "set_number": (None, "1"),
    "task_code": (None, "A"),
    "title": (None, "FH2A114N01.dwg")
}

# Sending as multipart/form-data using the `files` argument in requests
res = requests.put(f"http://127.0.0.1:8000/api/v1/assessments/admin/tasks/{task_id}", files=form_data, headers=headers)
print("Status:", res.status_code)
print("Response:", res.json())
