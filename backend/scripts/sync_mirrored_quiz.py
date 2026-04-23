import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_mirrored_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "According to KEMCO standards, which specific letter must be included in the drawing number to identify a part that remains unchanged when a mirror copy is performed?",
                "options": ["A", "B", "N", "X"],
                "correct_answer": 2,
                "explanation": "The letter \"N\" signifies a \"Normal\" part that is identical even when reflected."
            },
            {
                "text": "Identify the Japanese term often found on reference drawings that indicates a \"Mirror Image\" requirement.",
                "options": ["勝手違い (Katte-chigai)", "そのまま (Sono-mama)", "穴あけ (Ana-ake)", "面取り (Mentori)"],
                "correct_answer": 0,
                "explanation": "Katte-chigai is the technical term for mirrored or opposite-hand components."
            },
            {
                "text": "When converting Part A to Part B using the Mirror tool, what is the mandatory starting point for picking the three consecutive reference points?",
                "options": ["The part center", "The origin", "Any corner", "The highest face"],
                "correct_answer": 1,
                "explanation": "Precise mirroring for KEMCO standards requires the origin to be the first reference point selected."
            },
            {
                "text": "What is the fundamental relationship between Mirror Part A and Mirror Part B in terms of file management?",
                "options": ["Part A and Part B are stored in the same file to save space", "Part B must be modeled from scratch to ensure accuracy", "Part B is a mirror copy of Part A and cannot exist independently without Part A", "Part B is always named with an \"N\" suffix"],
                "correct_answer": 2,
                "explanation": "Part B is derived from Part A; it is a reflection of the source geometry."
            },
            {
                "text": "How does a designer technically verify if a part should be classified as \"Normal\" or \"Mirror\" within the ICAD environment?",
                "options": ["By checking if the part is painted green", "By placing a mirror copy over the original and checking for discrepancies in details like hole locations", "By measuring the distance from the origin to the center of the part", "By looking for the \"A\" or \"B\" suffix in the manufacturer's catalog"],
                "correct_answer": 1,
                "explanation": "Superimposing the reflected copy over the original reveals if the features (like hole patterns) are symmetric or mirrored."
            },
            {
                "text": "If a part is symmetrically different (e.g., a left-hand version of a right-hand bracket), what suffixes are used for the original and its mirrored counterpart?",
                "options": ["N01 and N02", "A01 and B01", "X01 and Y01", "S01 and M01"],
                "correct_answer": 1,
                "explanation": "KEMCO uses A and B suffixes to differentiate between the primary and mirrored versions of asymmetric parts."
            },
            {
                "text": "What is a critical constraint regarding the origin point when a 3D model is converted from Part A to Part B?",
                "options": ["The origin of Part B must be moved to the opposite end of the part", "The origin of Part B must be deleted before saving", "The origin of Part B must remain in the exact same location as it was in Part A", "The origin of Part B must be set using the \"Center tool\" instead of the Mirror tool"],
                "correct_answer": 2,
                "explanation": "Maintaining a constant origin position between A and B is vital for assembly alignment."
            },
            {
                "text": "Scenario: You are creating a brand new part that has no existing version to be mirrored from. However, you know a mirrored version will eventually be required. According to the naming notes, which suffix should you use for this initial part?",
                "options": ["Use \"N\" because it is currently the only version", "Use \"B\" to indicate it is the first of a pair", "Use \"A\" when naming the part if there is no existing part to be mirrored", "Use \"Mirror\" as a prefix in the drawing number"],
                "correct_answer": 2,
                "explanation": "Anticipating a pair requires the first part to be designated with an \"A\" suffix."
            },
            {
                "text": "Scenario: A trainee performs a mirror copy of a plate. They notice that after placing the copy over the original, a cutout that was on the left side is now on the right side. Based on the lesson, how should this part be classified?",
                "options": ["It is a Normal Part because the dimensions are the same", "It is a Mirror Part because the function or detail location has changed", "It is an Intersecting Part because it overlaps the original", "It is a Purchase Part because it cannot be recognized"],
                "correct_answer": 1,
                "explanation": "Asymmetric feature shifts define a mirror (opposite-hand) part."
            },
            {
                "text": "Scenario: You have finished modeling Part A and saved it. You need to create Part B. You have opened the \"Move/Copy/Delete\" menu and selected the Mirror tool. You are prompted to pick 3 points. In what order and location must these points be selected to ensure a successful conversion?",
                "options": ["Pick 3 points at random on the outermost face of the solid", "Pick 3 points on the XY plane only", "Pick 3 points consecutively, beginning specifically at the origin point", "Pick 2 points for the axis and 1 point for the direction"],
                "correct_answer": 2,
                "explanation": "The standard conversion workflow requires three consecutive points starting from the origin."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == 'mirrored').first()
        if not quiz:
            print("Quiz 'mirrored' not found in database. Creating it...")
            quiz = Quiz(
                slug='mirrored',
                title='Mirror Symmetry & LH/RH Logic',
                description='Understanding Chiral geometry and associative symmetry in iCAD.',
                course_type='3D_Modeling'
            )
            db.add(quiz)
            db.flush()

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
        print("Successfully synced 'mirrored' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_mirrored_quiz()
