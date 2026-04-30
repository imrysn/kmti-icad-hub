from backend.database import engine
print(f"Engine URL: {engine.url}")

from sqlalchemy import inspect
inspector = inspect(engine)
columns = [c['name'] for c in inspector.get_columns('quiz_scores')]
print(f"Columns in quiz_scores: {columns}")
