import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_component_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "Identify the command that enables a user to create a continuous duplication of a component across a specified distance.",
                "options": ["Copy Component", "Mirror Component", "Repeat Copy Component", "Move Component"],
                "correct_answer": 2,
                "explanation": "The Repeat Copy Component tool allows for the sequential duplication of a feature over a set distance."
            },
            {
                "text": "When using the Mirror Component tool, what is the alternative to selecting 3-points for setting the reflection plane?",
                "options": ["Right-click the origin", "Left-click on the face", "Double-click the model", "Press Escape"],
                "correct_answer": 1,
                "explanation": "A reflection plane can be defined by three points or by simply left-clicking an existing flat face."
            },
            {
                "text": "Name the input area where a user must specify the exact movement distance on the X, Y, and Z axes to relocate a feature.",
                "options": ["Status bar", "Tool options", "Item entry", "Parts list"],
                "correct_answer": 2,
                "explanation": "Numerical relocation values (MOVELENGX/Y/Z) are entered into the Item Entry field."
            },
            {
                "text": "What is the fundamental requirement for performing a Rotate Component operation?",
                "options": ["Selecting 3-points to define the surface area", "Establishing an axis of rotation by selecting 2-points", "Setting the movement distance to 0.0 on the X-axis", "Painting the component green before rotation"],
                "correct_answer": 1,
                "explanation": "Rotation requires a pivot axis, which is established by selecting two geometric points."
            },
            {
                "text": "How does the Mirror Copy Component function differ from the standard Mirror Component tool?",
                "options": ["It creates a new duplicate at the reflection point instead of just moving the original", "It requires 4 points to define the plane instead of 3", "It can only be used on circular drill holes", "It automatically deletes the target entity after the process"],
                "correct_answer": 0,
                "explanation": "Mirror Copy creates a symmetrical duplicate, while Mirror Component simply relocates the original feature."
            },
            {
                "text": "When performing a Copy Component task, what additional parameter must be entered in the Item Entry that is NOT required for a simple Move Component task?",
                "options": ["Rotation Angle", "Axis of Rotation", "Number of copies", "Plane selection"],
                "correct_answer": 2,
                "explanation": "The Copy command requires specifying how many duplicates are to be generated."
            },
            {
                "text": "To remove a specific drill hole or cutout from a merged entity, which tool icon should be selected?",
                "options": ["The icon with the red 'X' (Delete Component)", "The icon with the circular arrow (Rotate Component)", "The icon with the two overlapping green shapes (Union)", "The icon with the single blue arrow (Move Component)"],
                "correct_answer": 0,
                "explanation": "The Delete Component tool (represented by a red X) is used to remove internal Boolean features."
            },
            {
                "text": "Scenario: You are working on a gear-like component and need to take a single lubrication hole and duplicate it three times around the center of the hub at 90-degree intervals. Which specific tool is designed for this rotational duplication?",
                "options": ["Repeat Copy Component", "Rotate Copy Component", "Mirror Copy Component", "Move Component"],
                "correct_answer": 1,
                "explanation": "Rotate Copy is the tool for creating radial arrays or symmetrical patterns around an axis."
            },
            {
                "text": "Scenario: A designer wants to move a cutout exactly 30mm to the left on the X-axis. After selecting the Move Component tool and clicking the cutout, they see the Item Entry fields. What values should they input for MOVELENGX, MOVELENGY, and MOVELENGZ?",
                "options": ["30.0, 30.0, 30.0", "0.0, -30.0, 0.0", " -30.0, 0.0, 0.0", "30.0, 0.0, 0.0"],
                "correct_answer": 2,
                "explanation": "Moving left on the X-axis requires a negative value (-30.0) in the X-length field."
            },
            {
                "text": "Scenario: You are modifying a symmetrical bracket. You have already placed a complex cutout on the left side and need an exact version of it on the right side. You decide to use the Mirror Copy Component tool. To define the center \"mirror\" line effectively, how many points on the entity's face should you select?",
                "options": ["1 point", "2 points", "3 points", "5 points"],
                "correct_answer": 2,
                "explanation": "Setting a precise reflection plane in 3D requires three points to mathematically define the symmetry."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == 'component').first()
        if not quiz:
            print("Quiz 'component' not found in database. Creating it...")
            quiz = Quiz(
                slug='component',
                title='iCAD Component Management',
                description='Understanding hierarchical structures, metadata association, and assembly logic.',
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
        print("Successfully synced 'component' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_component_quiz()
