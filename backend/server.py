import os
import sys
import socket
from colorama import init, Fore, Style

# Initialize colorama
init(autoreset=True)

# Path helper for PyInstaller bundles
def get_base_path():
    if getattr(sys, 'frozen', False):
        # If running as a bundled executable
        return os.path.dirname(sys.executable)
    # Default for development
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

BASE_PATH = get_base_path()

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

def print_banner():
    # Professional KMTI Banner
    banner = f"""
{Fore.GREEN}=======================================================================
{Fore.CYAN}    _  ____  __ _____ ___   _  _____  ___    _   _ _   _ ___ 
{Fore.CYAN}   | |/ /  \/  |_   _|_ _| | |/ /  \/  |   | | | | | | | _ )
{Fore.CYAN}   | ' /| |\/| | | |  | |  | ' /| |\/| |   | |_| | |_| | _ \\
{Fore.CYAN}   | . \\| |  | | | |  | |  | . \\| |  | |   |  _  |  _  |___/
{Fore.CYAN}   |_|\_\\_|  |_| |_| |___| |_|\_\\_|  |_|   |_| |_|_| |_|     
{Fore.GREEN}
{Fore.WHITE}                KMTI iCAD Hub - Management System v1.0
{Fore.GREEN}=======================================================================
    """
    print(banner)

def print_status(db_mode):
    ip = get_local_ip()
    port = int(os.getenv("SERVER_PORT", 8000))
    
    db_color = Fore.CYAN if db_mode == "mysql" else Fore.YELLOW
    db_text = "Network Mode (MySQL)" if db_mode == "mysql" else "Local Fallback Mode (SQLite)"
    
    print(f"{Fore.GREEN}[+] {Fore.WHITE}Server Status: {Fore.GREEN}ONLINE")
    print(f"{Fore.GREEN}[+] {Fore.WHITE}API Endpoint : {Fore.CYAN}http://{ip}:{port}")
    print(f"{Fore.GREEN}[+] {Fore.WHITE}Database Mode: {db_color}{db_text}")
    
    if db_mode == "mysql":
        print(f"{Fore.GREEN}[+] {Fore.WHITE}Database Host: {Fore.CYAN}{os.getenv('DB_HOST', 'KMTI-NAS')}")
    else:
        print(f"{Fore.YELLOW}[!] {Fore.WHITE}Warning: NAS connection failed. Using local storage.")
    
    print(f"{Fore.GREEN}[+] {Fore.WHITE}Network Path : {Fore.CYAN}\\\\KMTI-NAS\\Shared\\data")
    print(f"{Fore.GREEN}=======================================================================")
    print(f"{Fore.WHITE}Press {Fore.RED}Ctrl+C{Fore.WHITE} to shut down the server safely.")
    print("")

if __name__ == "__main__":
    # Ensure backend folder is in path for imports
    root_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    if root_path not in sys.path:
        sys.path.append(root_path)
    
    # 1. Show Banner Immediately
    print_banner()
    print(f"{Fore.WHITE}Initializing KMTI iCAD Hub Server components...")
    
    # 2. Configure environment before heavy imports
    if getattr(sys, 'frozen', False):
        os.environ["ENV_FILE_PATH"] = os.path.join(BASE_PATH, ".env")
        # Disable ChromaDB telemetry which can cause hangs/delays
        os.environ["ANONYMIZED_TELEMETRY"] = "False"
        # Ensure we can find our own package
        sys.path.append(BASE_PATH)

    # 3. Defer heavy imports until after banner is shown
    print(f"{Fore.WHITE}Loading libraries (FastAPI, ChromaDB, Pandas)...")
    try:
        import uvicorn
        from backend.main import app
        from backend.database import get_db_mode
        
        # 4. Show Status and Start
        db_mode = get_db_mode()
        print_status(db_mode)
        
        port = int(os.getenv("SERVER_PORT", 8000))
        host = "0.0.0.0"
        
        uvicorn.run(app, host=host, port=port, log_level="info")
        
    except KeyboardInterrupt:
        print(f"\n{Fore.YELLOW}[!] Server shutting down...")
        sys.exit(0)
    except Exception as e:
        print(f"\n{Fore.RED}[X] Critical Error during startup: {e}")
        # Keep window open on error
        input("Press Enter to exit...")
        sys.exit(1)
