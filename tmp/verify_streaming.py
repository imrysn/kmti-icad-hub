import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

def test_streaming():
    url = "http://localhost:8000/chat/stream"
    # Basic auth mock if needed, or use a real token
    # For local test, we might need a valid JWT token
    print("Note: This script requires a running backend and a valid access token in .env or hardcoded.")
    
    token = os.getenv("TEST_TOKEN") # Manually add a token to .env or here
    if not token:
        print("Please set TEST_TOKEN in .env for this script to work.")
        return

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    payload = {
        "message": "Tell me about iCAD basics",
        "history": [],
        "session_id": "test_stream",
        "language": "en-US"
    }

    print(f"Connecting to {url}...")
    try:
        response = requests.post(url, json=payload, headers=headers, stream=True)
        response.raise_for_status()

        print("--- Stream Start ---")
        full_answer = ""
        for line in response.iter_lines():
            if line:
                decoded_line = line.decode('utf-8')
                if decoded_line.startswith('data: '):
                    data = json.loads(decoded_line[6:])
                    if data['type'] == 'content':
                        delta = data.get('delta', '')
                        full_answer += delta
                        print(delta, end='', flush=True)
                    elif data['type'] == 'end':
                        print("\n--- Stream End ---")
                        print(f"Sources: {len(data.get('sources', []))}")
                        print(f"Suggestions: {len(data.get('suggestions', []))}")
                    elif data['type'] == 'metadata':
                        print(f"Logged ID: {data.get('log_id')}")
    except Exception as e:
        print(f"\nError: {e}")

if __name__ == "__main__":
    test_streaming()
