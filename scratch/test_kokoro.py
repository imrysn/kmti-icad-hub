import os
import soundfile as sf
from kokoro_onnx import Kokoro

def test_tts():
    model_dir = r"\\KMTI-NAS\Shared\data\models\tts"
    onnx_path = os.path.join(model_dir, "kokoro-v1.0.onnx")
    voices_path = os.path.join(model_dir, "voices-v1.0.bin")

    print(f"Loading model from: {onnx_path}")
    print(f"Loading voices from: {voices_path}")

    # Initialize Kokoro
    try:
        kokoro = Kokoro(onnx_path, voices_path)
        print("Model loaded successfully!")
        
        text = "Hello, testing Kokoro Text to Speech from KMTI NAS."
        voice = "af_sarah"
        print(f"Generating speech for text: '{text}' using voice: '{voice}'")
        
        samples, sample_rate = kokoro.create(
            text,
            voice=voice,
            speed=1.0,
            lang="en-us"
        )
        
        output_file = os.path.join(os.path.dirname(__file__), "test_audio.wav")
        sf.write(output_file, samples, sample_rate)
        print(f"Successfully generated and saved to: {output_file}")
        
    except Exception as e:
        print(f"An error occurred during TTS: {e}")

if __name__ == "__main__":
    test_tts()
