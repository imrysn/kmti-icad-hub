import sqlite3

def inspect():
    conn = sqlite3.connect('kmti_icad.db')
    cursor = conn.cursor()
    
    print("--- COURSES ---")
    cursor.execute("SELECT id, title, course_type FROM courses")
    for row in cursor.fetchall():
        print(row)
        
    print("\n--- LESSONS (first 5) ---")
    cursor.execute("SELECT id, title, slug, course_id FROM lessons LIMIT 5")
    for row in cursor.fetchall():
        print(row)
        
    print("\n--- QUIZZES ---")
    cursor.execute("SELECT id, slug, title FROM quizzes LIMIT 5")
    for row in cursor.fetchall():
        print(row)
        
    print("\n--- QUIZ SCORES ---")
    cursor.execute("SELECT user_id, course_id, lesson_id, score FROM quiz_scores")
    for row in cursor.fetchall():
        print(row)
        
    conn.close()

if __name__ == "__main__":
    inspect()
