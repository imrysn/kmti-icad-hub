import asyncio
import os
import sys

# Add current directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.services.search_service import chat_service

async def test():
    print("Testing chat_service.chat...")
    try:
        # We don't need a real prompt, just see if it's a coroutine
        coro = chat_service.chat("test", [])
        print(f"Type of call result: {type(coro)}")
        if asyncio.iscoroutine(coro):
            print("Confirmed: It is a coroutine.")
        else:
            print("Error: It is NOT a coroutine.")
    except Exception as e:
        print(f"Error during test: {e}")

if __name__ == "__main__":
    asyncio.run(test())
