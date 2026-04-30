from backend.database import engine
from sqlalchemy import text

def migrate():
    print(f"Connecting to {engine.url.host}...")
    with engine.connect() as conn:
        print("Checking quiz_scores table...")
        
        # MySQL syntax for adding columns
        try:
            print("Adding first_attempt_score...")
            conn.execute(text("ALTER TABLE quiz_scores ADD COLUMN first_attempt_score FLOAT NULL"))
            conn.commit()
        except Exception as e:
            print(f"first_attempt_score: {e}")

        try:
            print("Adding first_attempt_at...")
            conn.execute(text("ALTER TABLE quiz_scores ADD COLUMN first_attempt_at DATETIME NULL"))
            conn.commit()
        except Exception as e:
            print(f"first_attempt_at: {e}")

    print("Migration finished.")

if __name__ == "__main__":
    migrate()
