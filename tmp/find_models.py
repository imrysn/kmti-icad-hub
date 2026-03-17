import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

def find_working_models():
    api_key = os.getenv("GOOGLE_API_KEY")
    client = genai.Client(api_key=api_key)
    
    print("Models supporting 'generateContent':")
    try:
        for model in client.models.list():
            # In step 476, we saw 'supported_actions'
            actions = getattr(model, 'supported_actions', [])
            if 'generateContent' in actions:
                print(f"- {model.name}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    find_working_models()
