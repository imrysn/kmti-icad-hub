import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_keyway_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data
        new_questions = [
            {
                "text": "Identify the specific unit of measurement used for all numerical values provided in this technical standard table.",
                "options": ["inch", "cm", "mm", "µm"],
                "correct_answer": 2,
                "explanation": "All technical dimensions in JIS/KEMCO keyway standards are specified in millimeters."
            },
            {
                "text": "Based on the \"Keyway Cross-section\" diagram, which variable (b1 or b2) represents the width of the keyway specifically located on the hub/bore?",
                "options": ["b1", "b2", "h", "t1"],
                "correct_answer": 1,
                "explanation": "In standard keyway diagrams, b1 refers to the shaft keyway width and b2 refers to the hub (bore) keyway width."
            },
            {
                "text": "In the shaft reference column, what does the variable d represent in relation to the key selection?",
                "options": ["Depth of the slot", "Shaft diameter (or adapted shaft diameter)", "Distance from edge", "Drive type"],
                "correct_answer": 1,
                "explanation": "Key selection is fundamentally based on the nominal shaft diameter (d) to ensure sufficient torque transmission."
            },
            {
                "text": "A designer is implementing a \"Regular Joint\" (普通形) for a coupling. According to the table, which tolerance class should be applied to the b2 dimension?",
                "options": ["D10", "H9", "Js9", "P9"],
                "correct_answer": 2,
                "explanation": "Js9 is the standard tolerance for regular joints to ensure a balanced fit."
            },
            {
                "text": "For a key with a nominal dimension of 12×8, what is the reference depth for the keyway in the shaft (t1)?",
                "options": ["3.3", "5.0", "4.4", "0.25"],
                "correct_answer": 1,
                "explanation": "Standard JIS tables specify a 5.0mm depth (t1) for 12x8 parallel keys."
            },
            {
                "text": "If a shaft diameter falls within the range of 22∼30 mm, what is the standard nominal key size (b×h) that should be utilized?",
                "options": ["6×6", "7×7", "8×7", "10×8"],
                "correct_answer": 2,
                "explanation": "For shaft diameters between 22 and 30mm, the standard key size is 8x7."
            },
            {
                "text": "According to the \"Note\" (備考) at the bottom of the table, how should nominal dimensions enclosed in parentheses (e.g., (7×7) or (15×10)) be treated for new designs?",
                "options": ["They are preferred for high-torque applications.", "They are only used for \"Drive Side\" (滑动形) fits.", "They are not defined in international standards and should not be used for new designs.", "They require a tolerance of +0.3/0."],
                "correct_answer": 2,
                "explanation": "Parenthesized dimensions are legacy standards and are discouraged for new engineering designs."
            },
            {
                "text": "Scenario: You are designing a high-precision \"Force Fit\" (締込み形) assembly for a shaft with a diameter of 40mm. Based on the table, what is the required tolerance range for the width of the keyway (b1 and b2)?",
                "options": ["±0.0180", "−0.015 to −0.051", "−0.018 to −0.061", "+0.036 to 0"],
                "correct_answer": 2,
                "explanation": "A Force Fit for this size requires a tighter negative tolerance range of −0.018 to −0.061 for a secure interference fit."
            },
            {
                "text": "Scenario: A technician is measuring a keyway depth on a hub for a shaft diameter of 100mm. The table specifies a reference dimension for t2. What is the standard value they should find, and what is its associated tolerance?",
                "options": ["8.4 with a tolerance of +0.2/0", "11.4 with a tolerance of +0.3/0", "12.4 with a tolerance of +0.3/0", "15.4 with a tolerance of +0.3/0"],
                "correct_answer": 1,
                "explanation": "For a 100mm shaft, the hub keyway depth t2 is 11.4mm with a standard +0.3/0 tolerance."
            },
            {
                "text": "Scenario: You are reviewing a design for a \"Drive Side\" (滑动形) application using a 16×10 key. To ensure the part can slide effectively, what are the specific upper and lower tolerance limits for the hub keyway (b2)?",
                "options": ["+0.043 and 0", "+0.120 and +0.050", "−0.018 and −0.061", "0 and −0.043"],
                "correct_answer": 1,
                "explanation": "Drive Side (sliding) fits require a D10 tolerance, which for this size results in a positive +0.120 to +0.050 range."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-keyway').first()
        if not quiz:
            print("Quiz '2d-keyway' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-keyway',
                title='ICAD Mechanical Design: Key and Keyway Standards Assessment',
                description='Technical standards for parallel keys and keyways, focusing on dimensions, fit tolerances, and application-specific standards.',
                course_type='2D_Drawing'
            )
            db.add(quiz)
            db.flush()
        else:
            quiz.title = 'ICAD Mechanical Design: Key and Keyway Standards Assessment'
            quiz.description = 'Technical standards for parallel keys and keyways, focusing on dimensions, fit tolerances, and application-specific standards.'

        # 3. Update Questions
        existing_questions = db.query(Question).filter(Question.quiz_id == quiz.id).order_by(Question.order).all()
        
        for i, q_data in enumerate(new_questions):
            options_json = json.dumps(q_data['options'])
            if i < len(existing_questions):
                # Update existing
                q = existing_questions[i]
                q.text = q_data['text']
                q.options_json = options_json
                q.correct_answer = q_data['correct_answer']
                q.explanation = q_data['explanation']
                print(f"Updated question {i+1}")
            else:
                # Add new
                q = Question(
                    quiz_id=quiz.id,
                    text=q_data['text'],
                    options_json=options_json,
                    correct_answer=q_data['correct_answer'],
                    explanation=q_data['explanation'],
                    order=i
                )
                db.add(q)
                print(f"Added question {i+1}")

        # Delete extra questions if any
        if len(existing_questions) > len(new_questions):
            for j in range(len(new_questions), len(existing_questions)):
                db.delete(existing_questions[j])
                print(f"Deleted extra question {j+1}")

        db.commit()
        print("Successfully synced '2d-keyway' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_keyway_quiz()
