import os
import subprocess
import sys

def sync_all():
    # Path to the scripts directory
    scripts_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Find all sync_*_quiz.py files
    sync_scripts = [f for f in os.listdir(scripts_dir) if f.startswith("sync_") and f.endswith("_quiz.py")]
    
    print(f"Found {len(sync_scripts)} quiz sync scripts. Starting full synchronization...")
    print("="*60)
    
    success_count = 0
    fail_count = 0
    
    for script in sync_scripts:
        script_path = os.path.join(scripts_dir, script)
        print(f"Syncing: {script}...")
        
        try:
            # Run each script as a subprocess
            result = subprocess.run([sys.executable, script_path], capture_output=True, text=True)
            
            if result.returncode == 0:
                print(f"  ✅ {script} synced successfully.")
                success_count += 1
            else:
                print(f"  ❌ {script} failed.")
                print(f"     Error: {result.stderr.strip()}")
                fail_count += 1
        except Exception as e:
            print(f"  ❌ Error running {script}: {e}")
            fail_count += 1
            
    print("="*60)
    print(f"Synchronization complete!")
    print(f"Total Success: {success_count}")
    print(f"Total Failed:  {fail_count}")
    print("="*60)

if __name__ == "__main__":
    sync_all()
