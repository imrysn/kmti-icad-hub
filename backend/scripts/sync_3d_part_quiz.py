import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_3d_part_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "According to the naming conventions for round-shaped materials, which specific Greek symbol must be used as a prefix?",
                "options": ["Alpha α", "Beta β", "FAI φ", "Omega Ω"],
                "correct_answer": 2,
                "explanation": "The symbol φ (FAI) is used as a prefix to denote diameters in part naming."
            },
            {
                "text": "Name the interface panel where all successfully created 3D Part names are listed in a hierarchical structure.",
                "options": ["Message Pane", "Command Menu", "Tree view", "Key Entry Area"],
                "correct_answer": 2,
                "explanation": "The Tree view (Scene Browser) provides the hierarchical list of all parts and features."
            },
            {
                "text": "Identify the symbol used for \"BATSU\" when describing material dimensions in the ICAD system.",
                "options": ["+ (plus)", "÷ (divide)", "× (multiply)", "- (minus)"],
                "correct_answer": 2,
                "explanation": "The multiplication symbol (×) is referred to as \"BATSU\" in the dimensioning standards."
            },
            {
                "text": "Why is the \"Create 3D Part\" process considered a critical step for the overall design workflow?",
                "options": ["It automatically renders the object in a green color", "It is essential for the generation of information in 2D Dimensions", "It reduces the file size of the JIS Shaped Materials", "It allows the user to skip the origin setting process"],
                "correct_answer": 1,
                "explanation": "Defining a 3D Part is necessary for the system to link the 3D volume to its 2D orthographic documentation."
            },
            {
                "text": "What occurs if there is a discrepancy between a 3D part name and its corresponding 2D part name?",
                "options": ["The 2D dimension will automatically update to match the 3D name", "The material description will switch to a \"Rubber\" format", "The link between the 3D and 2D data will be severed", "The Tree View will highlight the part in red"],
                "correct_answer": 2,
                "explanation": "Mismatching names breaks the digital link between the 3D solid and its 2D drawing data."
            },
            {
                "text": "When using the \"Change 3D Part Name\" tool, what does checking the box for \"Batch change same name data\" accomplish?",
                "options": ["It renames all parts in the file to \"NewDraw_2\"", "It allows for the modification of external drawing names only", "It ensures the linked 2D Part Name is updated simultaneously with the 3D Part", "It deletes the comment history for that specific entity"],
                "correct_answer": 2,
                "explanation": "Batch change ensures that both the 3D and 2D parts are renamed together for consistency."
            },
            {
                "text": "According to the Material Description standards, how should the dimensions for \"Rubber\" be formatted?",
                "options": ["(Size × Thickness)", "(Length × Width × Depth)", "(Thickness × Size)", "(Diameter × Pitch)"],
                "correct_answer": 2,
                "explanation": "Rubber materials follow a specific (Thickness × Size) format in the documentation."
            },
            {
                "text": "Scenario: You are documenting an \"I-Beam\" using the JIS Shaped Material standards. The material is 150mm wide, 100mm high, and has a thickness of 8mm with a length of 1000mm. Based on the provided chart, what is the correct string to enter?",
                "options": ["I-Beam 150 × 100 × 8 - 1000", "I-Beam φ 150 × 100 × 8", "SS400 150 × 100 × 1000", "JIS I-Beam φ 150 - 1000"],
                "correct_answer": 0,
                "explanation": "Standard JIS shaped material nomenclature follows the (Width × Height × Thickness - Length) format."
            },
            {
                "text": "Scenario: A designer is working on a complex assembly and realizes a specific 3D Part needs a more descriptive name. Instead of deleting and recreating the part, they use the \"Change 3D Part Name\" tool. After entering the new name and clicking OK, a dialog box appears. To ensure that every orthographic view in the 2D workspace reflects this new name, how should they respond?",
                "options": ["Select \"No\" to keep 2D data separate", "Select \"Yes\" to change the 2D Part Name together with the 3D Part", "Right-click on the 3D space to bypass the prompt", "Press the Muhenkan key to toggle the link"],
                "correct_answer": 1,
                "explanation": "Selecting \"Yes\" propagates the name change to the 2D environment, maintaining synchronization."
            },
            {
                "text": "Scenario: You are reviewing a parts list and see a JIS Plate material listed with a thickness of 7mm. You check the \"Available Plate Thickness (JIS)\" table. Is this a standard thickness according to the lesson?",
                "options": ["Yes, all whole numbers are standard", "No, the closest standard options are 6mm or 9mm", "Yes, it falls between the 6mm and 9mm range", "No, plates only come in sizes greater than 10mm"],
                "correct_answer": 1,
                "explanation": "7mm is not a standard JIS plate thickness; standard sizes follow a specific industrial list (e.g., 6, 9, 12)."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '3d-part').first()
        if not quiz:
            print("Quiz '3d-part' not found in database. Creating it...")
            quiz = Quiz(
                slug='3d-part',
                title='3D Part Management',
                description='Understanding naming protocols, synchronization, and modification history.',
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
        print("Successfully synced '3d-part' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_3d_part_quiz()
