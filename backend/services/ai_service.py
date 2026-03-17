import os
import time
import re
from typing import Optional, List, AsyncGenerator
from google import genai
from google.genai import types

class AIService:
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_API_KEY", "")
        self.default_model = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")
        self.models_to_try = [
            self.default_model,
            "models/gemini-2.5-flash",
            "models/gemini-2.5-pro",
            "models/gemini-3.1-flash-lite-preview",
            "models/gemini-3-flash-preview",
            "gemini-1.5-flash"
        ]
        # Remove duplicates and empty strings
        self.models_to_try = list(dict.fromkeys([m for m in self.models_to_try if m]))

    def _get_client(self):
        if not self.api_key or self.api_key == "your_api_key_here":
            return None
        return genai.Client(api_key=self.api_key)

    async def generate_content_stream(
        self, 
        system_instruction: str, 
        user_prompt: str, 
        images: List[dict] = None
    ) -> AsyncGenerator[str, None]:
        client = self._get_client()
        if not client:
            yield "(Gemini API Key missing or invalid)"
            return

        last_err = None
        for model_id in self.models_to_try:
            try:
                parts = [types.Part.from_text(text=user_prompt)]
                if images:
                    for img in images:
                        parts.append(types.Part.from_bytes(data=img["data"], mime_type=img["mime"]))
                
                contents = [types.Content(role="user", parts=parts)]

                stream = await client.aio.models.generate_content_stream(
                    model=model_id,
                    contents=contents,
                    config=types.GenerateContentConfig(
                        system_instruction=system_instruction,
                        temperature=0.7,
                    )
                )
                async for chunk in stream:
                    if chunk.text:
                        yield chunk.text
                return # Success
            except Exception as e:
                print(f"[AIService] Model {model_id} failed: {e}")
                last_err = e
                continue
        
        if last_err:
            yield f"\n\n(Error: All models failed. {str(last_err)})"

    def generate_content(
        self, 
        system_instruction: str, 
        user_prompt: str, 
        images: List[dict] = None,
        temperature: float = 0.3
    ) -> Optional[str]:
        client = self._get_client()
        if not client:
            return None

        max_retries = 3
        backoff = 10
        
        for attempt in range(max_retries):
            try:
                parts = [types.Part.from_text(text=user_prompt)]
                if images:
                    for img in images:
                        parts.append(types.Part.from_bytes(data=img["data"], mime_type=img["mime"]))
                
                contents = [types.Content(role="user", parts=parts)]

                response = client.models.generate_content(
                    model=self.default_model,
                    contents=contents,
                    config=types.GenerateContentConfig(
                        system_instruction=system_instruction,
                        temperature=temperature,
                    )
                )
                return response.text.strip()
            except Exception as e:
                err_str = str(e)
                if "429" in err_str:
                    retry_after = backoff * (2 ** attempt)
                    match = re.search(r'retry_delay\s*\{\s*seconds:\s*(\d+)', err_str)
                    if match:
                        retry_after = int(match.group(1)) + 2
                    print(f"[AIService] Rate limited. Retrying in {retry_after}s...")
                    time.sleep(retry_after)
                else:
                    print(f"[AIService] Non-retryable error: {e}")
                    return None
        return None

ai_service = AIService()
