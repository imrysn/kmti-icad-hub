import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_retaining_ring_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data
        new_questions = [
            {
                "text": "In the \"Retaining Rings-C Type-External\" table, what specific unit of measurement is used for all dimensional values?",
                "options": ["inch", "cm", "mm", "µm"],
                "correct_answer": 2,
                "explanation": "Mechanical components in the ICAD environment strictly adhere to the metric system (mm)."
            },
            {
                "text": "According to the \"Origin\" lesson, what are the specific numerical coordinates (X,Y,Z) for the point where the axes intersect?",
                "options": ["(1,1,1)", "(10,10,10)", "(0,0,0)", "(100,100,100)"],
                "correct_answer": 2,
                "explanation": "The global and local origin (absolute zero) is defined as (0,0,0) in 3D coordinate space."
            },
            {
                "text": "Identify the specific ICAD menu category where the \"Change 3D Part Layout\" command is located.",
                "options": ["FILE", "EDIT", "3D PARTS (or Parts)", "VIEW"],
                "correct_answer": 2,
                "explanation": "Layout and origin modifications for 3D components are managed within the \"Parts\" or \"3D Parts\" menu."
            },
            {
                "text": "When utilizing the \"Change 3D Part Layout\" tool, which mouse action is required to display the current location of the origin?",
                "options": ["Left-click on the Item Entry.", "Double-click the Workspace.", "Right-click on the model.", "Middle-click the Tool Bar."],
                "correct_answer": 2,
                "explanation": "Right-clicking the model while in the layout tool activates the visualization of the current coordinate system."
            },
            {
                "text": "According to the technical tables for C-Type Retaining Rings, what is the mandatory relationship between the ring's width and the plate thickness (t)?",
                "options": ["The width should be exactly double the plate thickness.", "The minimum width of the ring should be less than the plate thickness t.", "The plate thickness must always be 1.6mm.", "The width is independent of the plate thickness."],
                "correct_answer": 1,
                "explanation": "Engineering standards ensure the ring fits within the groove by specifying a width smaller than the nominal plate thickness (t)."
            },
            {
                "text": "In the ICAD window structure, which specific area is used for displaying error messages in red text?",
                "options": ["Tree view", "Message Pane", "Command Menu", "Item Entry"],
                "correct_answer": 1,
                "explanation": "The Message Pane at the bottom of the interface provides real-time feedback and error alerts to the operator."
            },
            {
                "text": "When re-setting a 3D Part Layout, after selecting the new origin and the X-axis, what does the third left-click define?",
                "options": ["The Z-axis height.", "The Front view plane (XY-plane).", "The Y-axis direction.", "The scale of the part."],
                "correct_answer": 2,
                "explanation": "The standard orientation sequence is: Origin -> X-axis Direction -> Y-axis Direction."
            },
            {
                "text": "Scenario: You are selecting an External Retaining Ring for a shaft with a reference diameter (d1) of 25mm. Based on the technical table, what is the required reference dimension for the groove diameter (d2)?",
                "options": ["23.2mm", "24.2mm", "23.9mm", "25.9mm"],
                "correct_answer": 2,
                "explanation": "For a 25mm shaft, the standardized groove diameter (d2) is 23.9mm to ensure proper ring tension."
            },
            {
                "text": "Scenario: A designer is looking at a technical table and sees a nominal value of (13) enclosed in parentheses. According to the priority notes at the bottom of the retaining ring standards, how should this value be treated?",
                "options": ["It must be used as the primary dimension for the drawing.", "Priority should be given to values NOT in parentheses; this value is only used if necessary.", "It indicates a value that is strictly for 2D drafting only.", "It represents a value that has been deprecated in the latest ICAD version."],
                "correct_answer": 1,
                "explanation": "Dimensions in parentheses are secondary or legacy sizes and should only be used when standard sizes are not viable."
            },
            {
                "text": "Scenario: You have modeled a complex part in the Workspace, but the standard \"Top View\" is currently showing the side of the object. To fix the orientation of the views for 2D detailing, which software process should you execute?",
                "options": ["Use the \"Item Entry\" to type in new rotation coordinates.", "Use the \"Change 3D Part Layout\" tool to redefine the origin and XY-plane.", "Select \"Tree view\" and rename the part to \"Top View.\"", "Move the part manually using the \"Key Entry\" area until it looks correct."],
                "correct_answer": 1,
                "explanation": "Redefining the 3D Part Layout synchronizes the model's orientation with the drafting views (Top, Front, Side)."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-retaining-ring').first()
        if not quiz:
            print("Quiz '2d-retaining-ring' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-retaining-ring',
                title='ICAD Retaining Rings and Layout Management Assessment',
                description='Technical engineering tables for Retaining Rings (C-Type) and proficiency in managing origin and layout settings within ICAD.',
                course_type='2D_Drawing'
            )
            db.add(quiz)
            db.flush()
        else:
            quiz.title = 'ICAD Retaining Rings and Layout Management Assessment'
            quiz.description = 'Technical engineering tables for Retaining Rings (C-Type) and proficiency in managing origin and layout settings within ICAD.'

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
        print("Successfully synced '2d-retaining-ring' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_retaining_ring_quiz()
