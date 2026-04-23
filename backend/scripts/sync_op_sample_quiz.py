import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_op_sample_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "Identify the specific tool used to unite the various segments (A, B, C, D, and E) into a single, cohesive solid entity once modeling is finished.",
                "options": ["SUBTRACT", "UNION", "SEPARATE", "REVOLVE"],
                "correct_answer": 1,
                "explanation": "The UNION operation combines independent solid segments into a single unified part."
            },
            {
                "text": "When creating a reamed hole in the bracket project, which keyboard command is used to toggle the tool’s orientation to match the target face?",
                "options": ["Ctrl + S", "Shift + W", "無変換 (Muhenkan) + Q", "Alt + F4"],
                "correct_answer": 2,
                "explanation": "Muhenkan + Q is the standard shortcut to align the active tool plane with a selected face."
            },
            {
                "text": "Name the modeling technique recommended for creating the complex \"Segment C\" of the shaft to ensure the required dimensions and angles are captured precisely.",
                "options": ["Arrange Box", "2D Sketch (or Revolve)", "Manual surfacing", "Hole tool"],
                "correct_answer": 1,
                "explanation": "Complex cylindrical segments with specific profiles are best created via a 2D sketch followed by a revolve or extrude operation."
            },
            {
                "text": "When initiating a new project, what is the standard protocol for choosing a filename?",
                "options": ["Use the creator's name and the current date", "Use the Material Notation (e.g., SS400)", "Use the Drawing Number as the file name", "Use the machine color code"],
                "correct_answer": 2,
                "explanation": "To ensure traceability, files must be named using the official Drawing Number."
            },
            {
                "text": "In the creation of a \"long hole\" (slot), what is the first step required before performing a subtraction?",
                "options": ["Apply a 7mm Fillet to the main body", "Create a tool entity using the \"Arrange Box\" command", "Set the specific gravity to 7.8500", "Change the work plane to the Y-Z orientation"],
                "correct_answer": 1,
                "explanation": "For custom slots, a \"tool\" solid (like a box) must first be placed to define the volume to be removed."
            },
            {
                "text": "According to the lesson on the shaft assembly, what must be done to the five individual segments (A through E) after they are modeled?",
                "options": ["They must be saved as five separate files", "They must be attached together using the \"Center tool.\"", "They must be lightened using the B-rep tool", "They must be mirrored across the X-Y plane"],
                "correct_answer": 1,
                "explanation": "The center tool is used to align and join the multiple segments of a complex shaft into their final arrangement."
            },
            {
                "text": "What is the designated radius value for the Fillet applied specifically to the \"key groove\" feature?",
                "options": ["7mm", "20mm", "3mm", "16mm"],
                "correct_answer": 2,
                "explanation": "The training manual specifies a 3mm radius for fillets within the keyway grooves."
            },
            {
                "text": "Scenario: You are modeling Segment A of the shaft, which includes a retainer ring groove. You have created Cylinder 1 (Diameter 20) and Cylinder 3 (Diameter 20). What are the specific dimensions required for Cylinder 2 to successfully create the groove between them?",
                "options": ["Diameter = 30mm; Height = 22.25mm", "Diameter = 19mm; Height = 1.35mm", "Diameter = 16mm; Height = 210mm", "Diameter = 20mm; Height = 3.65mm"],
                "correct_answer": 1,
                "explanation": "The groove is created by a smaller diameter cylinder (19mm) with a specific width (1.35mm) representing the ring seat."
            },
            {
                "text": "Scenario: You are modeling the bracket body (Step 2). You enter the width as 100mm and height as 210mm. If the drawing requires a thickness of 16mm, which field in the \"Arrange Box\" tool must receive this 16mm input?",
                "options": ["Depth", "Coordinates", "MOVELENGY", "Radius"],
                "correct_answer": 0,
                "explanation": "The \"Depth\" field in the Arrange Box dialog defines the thickness of the primitive solid."
            },
            {
                "text": "Scenario: While modeling the shaft, you encounter a dimension enclosed in parentheses (22.25) in the 2D sketch. Based on the lesson’s priority notes, how should you treat this specific value?",
                "options": ["It is a critical priority and must be exact", "It is a reference dimension and may be slightly higher or lower in the 3D model", "It must be subtracted from the total length of Segment C", "It indicates the number of sides for a polygonal prism"],
                "correct_answer": 1,
                "explanation": "Dimensions in parentheses are reference values used for verification, not primary design drivers."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == 'op-sample').first()
        if not quiz:
            print("Quiz 'op-sample' not found in database. Creating it...")
            quiz = Quiz(
                slug='op-sample',
                title='Full Workflow Integration Sample',
                description='Applying manual-based workflows to finished industrial assemblies.',
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
        print("Successfully synced 'op-sample' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_op_sample_quiz()
