import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_geometric_tol_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data
        new_questions = [
            {
                "text": "Identify the specific term used to describe a fixed reference point in a drawing from which other machining operations are calculated and measured.",
                "options": ["Scale", "Datum", "Layer", "Annotation"],
                "correct_answer": 1,
                "explanation": "Datums are theoretically exact references used for positioning and measurement."
            },
            {
                "text": "Name the interface area in the ICAD window where a user must enter the specific character (e.g., 'A' or 'B') when setting a reference point for machining.",
                "options": ["Message Pane", "Tree view", "Item entry box", "Icon menu"],
                "correct_answer": 2,
                "explanation": "The Item Entry box is the primary input field for text-based parameters in ICAD."
            },
            {
                "text": "In a 3D modeling workflow, which specific orientation must a designer always start with when creating a new model?",
                "options": ["Side view", "Top view", "Front view", "Isometric view"],
                "correct_answer": 2,
                "explanation": "Starting with the Front View ensures consistent part orientation across the entire assembly."
            },
            {
                "text": "When setting up a Geometric Tolerance in the dialog box, which three specific details must be completed to define the tolerance correctly?",
                "options": ["Line color, Font style, and Layer number", "Tolerance Symbol, Tolerance Value, and Datum", "Pitch length, Scale factor, and Item entry", "X-axis, Y-axis, and Z-axis coordinates"],
                "correct_answer": 1,
                "explanation": "A complete GD&T callout requires the symbol (type), the numerical value, and the reference datum."
            },
            {
                "text": "What is the primary purpose of the \"Autoballoon\" command in the 2D detailing menu?",
                "options": ["To automatically scale the drawing to fit the template.", "To pick out parts and groups to create identification bubbles automatically.", "To calculate the total weight of the assembly based on specific gravity.", "To convert a 3D solid into a 2D wireframe view."],
                "correct_answer": 1,
                "explanation": "Autoballoon streamlines the creation of BOM identification bubbles for assembly drawings."
            },
            {
                "text": "According to the lesson on Spiral Forms, what is the mandatory mathematical relationship between \"Pitch\" and \"Thickness\"?",
                "options": ["Thickness must be exactly 1.5 times the Pitch.", "Pitch and Thickness must be equal to avoid errors.", "Pitch must be greater than Thickness.", "The sum of Pitch and Thickness must be zero in the Item Entry."],
                "correct_answer": 2,
                "explanation": "Geometrically, the pitch of a spiral must exceed its thickness to allow for physical material formation."
            },
            {
                "text": "In the ICAD window structure, which specific component is used to manage and display 3D parts and groups currently being worked on?",
                "options": ["Command Menu", "Icon Menu", "Tree view", "Message Pane"],
                "correct_answer": 2,
                "explanation": "The Tree View displays the hierarchical structure of all parts and groups in the workspace."
            },
            {
                "text": "Scenario: You are applying a geometric tolerance to a shaft. You have selected the command and picked the target line (P1). The dialog box appears. You need to indicate a \"Parallelism\" requirement of 0.02 relative to reference \"B\". In which specific field of the \"Geometric Tolerance\" window should you input the character \"B\"?",
                "options": ["Tolerance Symbol", "Tolerance Value", "Datum", "Note"],
                "correct_answer": 2,
                "explanation": "The Datum field is specifically reserved for the alphabetic character representing the reference surface."
            },
            {
                "text": "Scenario: A designer has finished an extrusion and a dialog box appears asking if the work plane should be deleted. The designer wants to ensure that all 2D sketches used for the extrusion remain available for future edits. Which action should they take?",
                "options": ["Select \"OK\" to store the sketches in the Tree view.", "Select \"Cancel\" to keep the work plane and the 2D sketches together.", "Press \"Enter\" to automatically save the sketches to the Server.", "Use the \"Muhenkan + W\" shortcut to hide the sketches instead of deleting."],
                "correct_answer": 1,
                "explanation": "Canceling the deletion preserves the work plane and its associated 2D sketches for future modifications."
            },
            {
                "text": "Scenario: You are creating a Datum on a finished drawing. After applying the command, you click the target line (L1) and enter the character 'A'. What is the final step required to complete the placement and end the command?",
                "options": ["Right-click the Message Pane.", "Click a second point (P2) to position the datum, then select \"GO\".", "Double-click the Icon Menu.", "Press \"Muhenkan + Q\" to align the datum with the Front View."],
                "correct_answer": 1,
                "explanation": "Placement is finalized by defining the visual position (P2) and confirming with the GO command."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-geometric-tol').first()
        if not quiz:
            print("Quiz '2d-geometric-tol' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-geometric-tol',
                title='ICAD Geometric Dimensioning and Tolerancing (GD&T) Assessment',
                description='Technical proficiency in applying geometric tolerances, identifying interface components, and managing reference datums within ICAD.',
                course_type='2D_Drawing'
            )
            db.add(quiz)
            db.flush()
        else:
            quiz.title = 'ICAD Geometric Dimensioning and Tolerancing (GD&T) Assessment'
            quiz.description = 'Technical proficiency in applying geometric tolerances, identifying interface components, and managing reference datums within ICAD.'

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
        print("Successfully synced '2d-geometric-tol' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_geometric_tol_quiz()
