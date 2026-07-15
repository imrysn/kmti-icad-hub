import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv('backend/.env')

db_url = os.getenv('DATABASE_URL')
if not db_url:
    db_url = f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}?charset=utf8"

engine = create_engine(db_url)
with engine.connect() as conn:
    res = conn.execute(text('SHOW COLUMNS FROM assessment_submissions')).fetchall()
    for row in res:
        print(row)
