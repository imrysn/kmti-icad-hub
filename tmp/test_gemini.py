import os
import asyncio
from google import genai
from dotenv import load_dotenv

load_dotenv()

async def test_models():
    api_key = os.getenv("GOOGLE_API_KEY")
    client = genai.Client(api_key=api_key)
    
    models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-2.0-flash-exp", "gemini-1.5-pro"]
    
    for m_id in models:
        print(f"Testing {m_id}...")
        try:
            response = await client.aio.models.generate_content(
                model=m_id,
                contents="Hi"
            )
            print(f"✅ {m_id} works!")
            return m_id
        except Exception as e:
            print(f"❌ {m_id} failed: {e}")
    
    return None

if __name__ == "__main__":
    asyncio.run(test_models())
