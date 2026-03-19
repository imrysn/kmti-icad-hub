import asyncio
import os
import sys
from pathlib import Path

# Add project root to sys.path
project_root = Path(__file__).resolve().parents[1]
sys.path.append(str(project_root))

from backend.services.search_service import chat_service
from backend.schemas import ChatMessage

async def verify_phase4_backend():
    print("--- Phase 4 Backend Verification ---")
    
    import time
    unique_msg = f"Give me a detailed guide on iCAD basics {time.time()}"
    
    # 1. Test Streaming and Citations
    print("\n1. Testing Chat Stream & Citations...")
    full_answer = ""
    sources = []
    
    async for chunk in chat_service.chat_stream(message=unique_msg, history=[]):
        if chunk['type'] == 'content':
            delta = chunk.get('delta', '')
            full_answer += delta
            print(delta, end='', flush=True)
        elif chunk['type'] == 'end':
            sources = chunk.get('sources', [])
            print("\n--- Stream Finished ---")
            print(f"Sources found: {len(sources)}")
            
    # Check for citation markers
    import re
    citations = re.findall(r'\[\d+\]', full_answer)
    print(f"Citation markers found: {citations}")
    
    if len(citations) > 0:
        print("✅ Citations [N] generated correctly")
    else:
        print("⚠️ No citations found in response (might depend on context)")

    # 2. Test History Pruning
    print("\n2. Testing History Pruning...")
    # Create a long history
    long_history = [ChatMessage(role="user" if i % 2 == 0 else "assistant", content=f"msg {i}") for i in range(20)]
    pruned = chat_service._prune_history(long_history, limit=10)
    print(f"History length after pruning: {len(pruned)}")
    if len(pruned) == 10:
        print("✅ History pruning OK")
    else:
        print("❌ History pruning FAILED")

if __name__ == "__main__":
    asyncio.run(verify_phase4_backend())
