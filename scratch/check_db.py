import sys
sys.path.insert(0, '.')
from backend.database import engine
from sqlalchemy import text, inspect

inspector = inspect(engine)
tables = inspector.get_table_names()
print("All tables:", tables)
assessment_tables = [t for t in tables if 'assessment' in t.lower()]
print("Assessment tables:", assessment_tables)

if 'assessment_submissions' in tables:
    cols = inspector.get_columns('assessment_submissions')
    print("assessment_submissions columns:", [c['name'] for c in cols])
