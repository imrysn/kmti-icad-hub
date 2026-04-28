import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_additional_view_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data
        new_questions = [
            {
                "text": "Identify the specific visual property (line type) that a detail circle or ellipse initially defaults to before it is manually changed to a solid line.",
                "options": ["Solid line", "Phantom line", "Dashed line", "Dotted line"],
                "correct_answer": 1,
                "explanation": "In ICAD detailing, the boundary circle for a detail view is initially rendered as a phantom line."
            },
            {
                "text": "What specific visual element is automatically added to a \"Cross Section View\" to represent the internal solid material of the part?",
                "options": ["Solid fill", "Shadowing", "Hatch (or hatching)", "Hidden lines"],
                "correct_answer": 2,
                "explanation": "Hatching represents the cut material surface in a cross-sectional view."
            },
            {
                "text": "Identify the command used to remove specific portions of a view that are not required, which notably cannot be applied to a \"Detail Drawing.\"",
                "options": ["Delete", "Erase", "Trim", "Hide"],
                "correct_answer": 2,
                "explanation": "The Trim command is used to crop views but is restricted from being used on sub-generated detail drawings."
            },
            {
                "text": "When generating a Cross Section View, what is the mandatory orientation rule for the placement of the view relative to the cutting line arrows?",
                "options": ["It must be placed in the same direction as the arrows.", "It must be placed in the center of the original orthographic view.", "It must be located in the opposite direction of the arrows.", "It must be placed at the coordinates (0,0,0) of the template."],
                "correct_answer": 2,
                "explanation": "By projection standard, the section view is projected in the opposite direction of the arrows to show the internal surface."
            },
            {
                "text": "Which tool is specifically used to eliminate unnecessary parts that are not related to the desired section by limiting the depth of the cut?",
                "options": ["Trim", "Partial Section", "Cross-sectional depth", "High Precision"],
                "correct_answer": 2,
                "explanation": "The \"Cross-sectional depth\" setting limits the longitudinal extent of the section projection."
            },
            {
                "text": "How does the system determine the initial scale of a Detail Drawing upon its creation?",
                "options": ["It defaults to a 1/1 scale regardless of the source.", "It is automatically double the scale of the main view.", "It adopts the same scale as the view it originated from.", "It prompts the user to enter the scale in the Item Entry box first."],
                "correct_answer": 2,
                "explanation": "A new detail drawing inherits the scale of its parent view by default until manually adjusted by the designer."
            },
            {
                "text": "According to the instructional notes, why must a \"Section Name\" (e.g., A-A) have an underline applied in the Text Entry window?",
                "options": ["To ensure the text height matches the dimension text.", "For easy identification of the view within the drawing.", "To indicate that the view has been trimmed.", "It is a requirement for the Japanese version of ICAD only."],
                "correct_answer": 1,
                "explanation": "Underlining section titles is a standard visual practice for clear document organization and rapid identification."
            },
            {
                "text": "Scenario: You are creating a Partial Section of a complex gear. You have drawn an enclosed polygon around the target area. However, when you select the icon and the polygon, the section fails to generate. What is the most likely cause based on the \"Notes\" for this process?",
                "options": ["The view was not active before proceeding.", "The polygon lines are not colored green.", "The polygon was drawn using a solid line instead of a phantom line.", "The scale of the view was changed on the tool bar."],
                "correct_answer": 0,
                "explanation": "View-specific operations like Partial Sectioning require the target view frame to be active (highlighted) first."
            },
            {
                "text": "Scenario: You have inserted an Isometric View and want it to show a specific angle that isn't the default. After picking the icon and a location, how do you manually adjust the rotation of the view?",
                "options": ["Change the \"Arrow angle\" in the Change Properties window.", "Select the icon again to make the rotate arrow appear.", "Type the rotation degree into the \"Section Name\" field.", "Use the \"Lackey Entity\" command to align it with the Front View."],
                "correct_answer": 1,
                "explanation": "Re-selecting the command icon triggers the interactive rotation handle for isometric views."
            },
            {
                "text": "Scenario: You have applied Trim and set the Cross-sectional depth to a view, but there are still small, unrelated components visible that clutter the section. According to the \"Note\" in the Trim section, what is the final method recommended to eliminate these remaining parts?",
                "options": ["Use the \"Undo\" command and recreate the cutting line.", "Use the \"Hide\" function for detailed parts (referencing page 9).", "Delete the Hatching box in the Projection Properties.", "Change the \"Terminal Marks\" to \"Dot diameter.\""],
                "correct_answer": 1,
                "explanation": "For visual clutter that persists after trimming, manual \"Hide\" operations for specific sub-components are required."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-additional-view').first()
        if not quiz:
            print("Quiz '2d-additional-view' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-additional-view',
                title='ICAD Advanced 2D Projection and View Manipulation Assessment',
                description='Technical knowledge of complex 2D view generation, including sectioning, detailing, and the management of visual depth and precision in ICAD drawings.',
                course_type='2D_Drawing'
            )
            db.add(quiz)
            db.flush()
        else:
            quiz.title = 'ICAD Advanced 2D Projection and View Manipulation Assessment'
            quiz.description = 'Technical knowledge of complex 2D view generation, including sectioning, detailing, and the management of visual depth and precision in ICAD drawings.'

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
        print("Successfully synced '2d-additional-view' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_additional_view_quiz()
