import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def test_health():
    print("Testing Health Check...")
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Status: {response.status_code}")
        print(f"Content: {response.json()}")
    except Exception as e:
        print(f"Failed: {e}")

def test_chat():
    print("\nTesting Chat Endpoint...")
    try:
        payload = {
            "message": "Hello, how do I create a cylinder in iCAD?",
            "history": []
        }
        response = requests.post(f"{BASE_URL}/api/chat", json=payload)
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            print(f"Response: {response.json().get('response')[:100]}...")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Failed: {e}")

def test_lessons():
    print("\nTesting Lessons Endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/api/lessons/courses")
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            courses = response.json()
            print(f"Found {len(courses)} courses.")
            if len(courses) > 0:
                print(f"First course: {courses[0]['title']}")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Failed: {e}")

if __name__ == "__main__":
    test_health()
    test_chat()
    test_lessons()
