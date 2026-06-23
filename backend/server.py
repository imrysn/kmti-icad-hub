import os
import sys

# Safe stream redirection for PyInstaller windowed (--noconsole) mode to prevent 'lost sys.stdin' errors
if getattr(sys, 'frozen', False):
    try:
        if sys.stdin is None:
            sys.stdin = open(os.devnull, 'r')
    except Exception:
        pass
    try:
        if sys.stdout is None:
            sys.stdout = open(os.devnull, 'w')
    except Exception:
        pass
    try:
        if sys.stderr is None:
            sys.stderr = open(os.devnull, 'w')
    except Exception:
        pass

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
{Fore.WHITE}                KMTI Training Hub - Management System v1.0
{Fore.GREEN}=======================================================================
    """
    print(banner)

def print_status(db_mode):
    ip = get_local_ip()
    port = int(os.getenv("SERVER_PORT", 3001))
    
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
    
    # 1. Show Banner in Console (if console exists)
    print_banner()
    print("Initializing KMTI iCAD Hub Server components...")
    
    # 2. Configure environment before heavy imports
    if getattr(sys, 'frozen', False):
        os.environ["ENV_FILE_PATH"] = os.path.join(BASE_PATH, ".env")
        # Disable ChromaDB telemetry which can cause hangs/delays
        os.environ["ANONYMIZED_TELEMETRY"] = "False"
        # Ensure we can find our own package
        sys.path.append(BASE_PATH)

    # 3. Defer heavy imports until after banner is shown
    print("Loading libraries (FastAPI, ChromaDB, Pandas)...")
    try:
        import uvicorn
        from backend.main import app
        from backend.database import get_db_mode, engine, SessionLocal
        from backend.models import Base, User
        from backend.create_test_users import create_test_users
        
        # 4. Verify/initialize database schema and seed default users if empty
        try:
            print("Verifying database schema...")
            Base.metadata.create_all(bind=engine)
            db = SessionLocal()
            if db.query(User).count() == 0:
                print("No users found in database. Seeding default accounts (admin, employee, trainee)...")
                create_test_users()
            db.close()
        except Exception as db_init_err:
            print(f"[!] Database initialization/seeding warning: {db_init_err}")

        # Start SQLite-to-MySQL background sync worker
        try:
            from backend.sync_worker import start_sync_worker
            start_sync_worker()
            print("[+] SQLite-to-MySQL sync worker started successfully.")
        except Exception as se:
            print(f"[!] Sync worker could not be started: {se}")
        
        port = int(os.getenv("SERVER_PORT", 3001))
        host = "0.0.0.0"
        db_mode = get_db_mode()
        print_status(db_mode)
        
        # Run Tkinter GUI on main thread, and Uvicorn on background thread
        import threading
        import webbrowser
        import queue
        import tkinter as tk
        from tkinter import scrolledtext
        
        # Redirection helper to capture print outputs to GUI console safely via thread-safe queuec
        log_queue = queue.Queue()

        class TextRedirector:
            def __init__(self, widget, msg_queue):
                self.widget = widget
                self.msg_queue = msg_queue

            def write(self, string):
                self.msg_queue.put(string)
                if sys.__stdout__ is not None:
                    sys.__stdout__.write(string)

            def flush(self):
                if sys.__stdout__ is not None:
                    sys.__stdout__.flush()

        def start_uvicorn():
            try:
                uvicorn.run(app, host=host, port=port, log_level="info")
            except Exception as e:
                print(f"Uvicorn error: {e}")

        # Start server in background thread
        server_thread = threading.Thread(target=start_uvicorn, daemon=True)
        server_thread.start()

        # Build Tkinter GUI
        root = tk.Tk()
        root.title("KMTI Training Hub - Server Console")
        root.geometry("760x520")
        root.configure(bg="#0f172a") # Slate 900
        root.resizable(True, True)

        # Set Icon
        ico_path = os.path.join(BASE_PATH, "backend", "kmti_logo.ico")
        if not os.path.exists(ico_path) and getattr(sys, 'frozen', False):
            ico_path = os.path.join(BASE_PATH, "kmti_logo.ico")
        if not os.path.exists(ico_path) and getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
            ico_path = os.path.join(sys._MEIPASS, "kmti_logo.ico")
            
        if os.path.exists(ico_path):
            try:
                root.iconbitmap(ico_path)
            except Exception as e:
                print(f"Could not load icon: {e}")

        # Title / Header
        header_frame = tk.Frame(root, bg="#1e293b", height=70) # Slate 800
        header_frame.pack(fill="x", padx=0, pady=0)
        
        title_label = tk.Label(
            header_frame, 
            text="KMTI TRAINING HUB SERVER", 
            font=("Segoe UI", 14, "bold"), 
            bg="#1e293b", 
            fg="#38bdf8" # Sky 400
        )
        title_label.pack(side="left", padx=20, pady=20)
        
        version_label = tk.Label(
            header_frame, 
            text="v1.0.0", 
            font=("Segoe UI", 10, "normal"), 
            bg="#1e293b", 
            fg="#94a3b8" # Slate 400
        )
        version_label.pack(side="right", padx=20, pady=24)

        # Info Dashboard Frame
        info_frame = tk.Frame(root, bg="#0f172a")
        info_frame.pack(fill="x", padx=20, pady=15)

        # Left Column info
        left_info = tk.Frame(info_frame, bg="#0f172a")
        left_info.pack(side="left", fill="y")

        local_ip = get_local_ip()
        api_url = f"http://{local_ip}:{port}"
        
        url_title = tk.Label(left_info, text="API Endpoint:", font=("Segoe UI", 10, "bold"), bg="#0f172a", fg="#94a3b8")
        url_title.pack(anchor="w")
        url_val = tk.Label(left_info, text=api_url, font=("Consolas", 11), bg="#0f172a", fg="#f8fafc", cursor="hand2")
        url_val.pack(anchor="w", pady=(2, 8))
        url_val.bind("<Button-1>", lambda e: webbrowser.open(api_url))

        db_title = tk.Label(left_info, text="Database Mode:", font=("Segoe UI", 10, "bold"), bg="#0f172a", fg="#94a3b8")
        db_title.pack(anchor="w")
        
        db_text = "Network Mode (MySQL)" if db_mode == "mysql" else "Local Fallback Mode (SQLite)"
        db_color = "#22c55e" if db_mode == "mysql" else "#f59e0b"
        
        db_val = tk.Label(left_info, text=db_text, font=("Segoe UI", 11, "bold"), bg="#0f172a", fg=db_color)
        db_val.pack(anchor="w", pady=(2, 2))

        # Right Column Actions
        right_actions = tk.Frame(info_frame, bg="#0f172a")
        right_actions.pack(side="right", fill="y", padx=10)

        def open_browser():
            webbrowser.open(api_url)

        btn_style = {
            "font": ("Segoe UI", 10, "bold"),
            "bg": "#0284c7", # Sky 600
            "fg": "#ffffff",
            "activebackground": "#0369a1",
            "activeforeground": "#ffffff",
            "bd": 0,
            "padx": 15,
            "pady": 8,
            "cursor": "hand2"
        }
        
        open_btn = tk.Button(right_actions, text="Open Web Admin", command=open_browser, **btn_style)
        open_btn.pack(side="top", fill="x", pady=5)

        def stop_server():
            root.destroy()
            sys.exit(0)

        stop_style = btn_style.copy()
        stop_style.update({
            "bg": "#ef4444", # Red 500
            "activebackground": "#dc2626"
        })
        stop_btn = tk.Button(right_actions, text="Stop Server", command=stop_server, **stop_style)
        stop_btn.pack(side="top", fill="x", pady=5)

        # Logging Console Section
        console_title = tk.Label(root, text="Server Activities & Logs:", font=("Segoe UI", 10, "bold"), bg="#0f172a", fg="#94a3b8")
        console_title.pack(anchor="w", padx=20, pady=(10, 2))

        log_widget = scrolledtext.ScrolledText(
            root, 
            bg="#1e293b", 
            fg="#f1f5f9", 
            font=("Consolas", 9), 
            state="disabled",
            insertbackground="white",
            relief="flat"
        )
        log_widget.pack(fill="both", expand=True, padx=20, pady=(0, 20))

        # Redirect standard stdout/stderr to Tkinter console
        sys.stdout = TextRedirector(log_widget, log_queue)
        sys.stderr = sys.stdout

        # Periodic processing queue loop to insert logs on the main thread safely
        def process_log_queue():
            try:
                changed = False
                while True:
                    try:
                        string = log_queue.get_nowait()
                        log_widget.configure(state="normal")
                        log_widget.insert("end", string)
                        log_widget.configure(state="disabled")
                        changed = True
                    except queue.Empty:
                        break
                if changed:
                    log_widget.see("end")
            except Exception:
                pass
            root.after(50, process_log_queue)

        # Start periodic log update loop
        root.after(50, process_log_queue)

        print("=======================================================================")
        print("    KMTI Training Hub Standalone Server Running Successfully")
        print("=======================================================================")
        print(f"[+] Server Status: ONLINE")
        print(f"[+] API Endpoint : {api_url}")
        print(f"[+] Database Mode: {db_text}")
        if db_mode == "mysql":
            print(f"[+] Database Host: {os.getenv('DB_HOST', 'KMTI-NAS')}")
        else:
            print("[!] Warning: NAS connection failed. Using local storage fallback.")
        print("=======================================================================")

        root.mainloop()

    except KeyboardInterrupt:
        print("\n[!] Server shutting down...")
        sys.exit(0)
    except Exception as e:
        # Write to startup log file
        try:
            log_path = os.path.join(BASE_PATH, "server_startup_error.log")
            with open(log_path, "w") as f:
                f.write(f"Critical Error during startup: {e}\n")
                import traceback
                traceback.print_exc(file=f)
        except Exception:
            pass
        print(f"\n[X] Critical Error during startup: {e}")
        # If GUI fails to load, print to stdout/stderr and pause
        import traceback
        traceback.print_exc()
        try:
            input("Press Enter to exit...")
        except Exception:
            pass
        sys.exit(1)
