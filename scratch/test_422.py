import requests

# 1. Login
login_data = {
    "username": "admin",
    "password": "admin123"
}
response = requests.post("http://127.0.0.1:8000/api/v1/auth/login", json=login_data)
if response.status_code != 200:
    print("Login failed:", response.text)
    exit(1)

token = response.json()["access_token"]
headers = {"Authorization": f"Bearer {token}"}

# 2. Make PUT request
task_id = 467 # from console output
form_data = {
    "set_number": "1",
    "task_code": "A",
    "title": "FH2A114N01.dwg"
}

# we don't send 'file' or 'description'
res = requests.put(f"http://127.0.0.1:8000/api/v1/assessments/admin/tasks/{task_id}", data=form_data, headers=headers)
print("Status:", res.status_code)
print("Response:", res.json())
