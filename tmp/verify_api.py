import requests

url = "http://localhost:8000/admin/chat-logs/stats"
# We need to bypass auth or use a token. Since I don't have a token, 
# I'll just check if the endpoint exists and if it returns CORS headers on OPTION.
try:
    response = requests.options(url, headers={
        "Origin": "http://localhost:5173",
        "Access-Control-Request-Method": "GET"
    })
    print(f"OPTIONS Status: {response.status_code}")
    print(f"CORS Headers: {response.headers.get('Access-Control-Allow-Origin')}")
    
    # Try a GET request (will probably give 401/403 but should have CORS headers)
    response = requests.get(url, headers={"Origin": "http://localhost:5173"})
    print(f"GET Status: {response.status_code}")
    print(f"CORS Headers: {response.headers.get('Access-Control-Allow-Origin')}")
    if response.status_code == 500:
        print("Still getting 500 error!")
except Exception as e:
    print(f"Error: {e}")
