import json
import re

log_path = r"C:\Users\Enduser\.gemini\antigravity\brain\55e9b4b3-98b1-46b3-a2bb-4ed43bceb42a\.system_generated\logs\overview.txt"

with open(log_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines in log: {len(lines)}")

for idx, line in enumerate(lines):
    try:
        data = json.loads(line)
        # Check if the step has code/replacement related to PracticalTrainerDashboard
        text = json.dumps(data)
        if "PracticalTrainerDashboard.tsx" in text or "PracticalTrainerDashboard.css" in text:
            print(f"\n--- Line {idx+1} | Source: {data.get('source')} | Type: {data.get('type')} ---")
            
            # Print keys or some summary
            keys = list(data.keys())
            print(f"Keys: {keys}")
            
            # Look for nested arguments
            if 'arguments' in data:
                args = data['arguments']
                if isinstance(args, dict):
                    print(f"Args keys: {list(args.keys())}")
                    if 'TargetFile' in args:
                        print(f"TargetFile: {args['TargetFile']}")
                    if 'CodeContent' in args:
                        print("Found CodeContent!")
                        # Save it
                        out_name = f"extracted_step_{idx+1}_dashboard.tsx"
                        with open(out_name, 'w', encoding='utf-8') as out:
                            out.write(args['CodeContent'])
                        print(f"Saved to {out_name}")
                    if 'ReplacementChunks' in args:
                        print(f"ReplacementChunks: {len(args['ReplacementChunks'])} chunks")
            
            if 'response' in data:
                resp = data['response']
                if isinstance(resp, dict) and 'output' in resp:
                    print("Found response output!")
    except Exception as e:
        pass
