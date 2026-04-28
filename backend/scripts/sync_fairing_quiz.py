import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_fairing_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "Identify the specific modeling operation used to create a rounded, smooth transition on the sharp corners of a solid.",
                "options": ["Union", "Subtract", "Fillet", "Chamfer"],
                "correct_answer": 2,
                "explanation": "Fillets produce rounded transitions on sharp geometric edges to improve aesthetics and safety."
            },
            {
                "text": "In the Shell operation, what is the technical name of the parameter used in the item entry to define the remaining wall depth of the hollowed object?",
                "options": ["Radius", "COMMNTHICK", "Offset", "Shelling Depth"],
                "correct_answer": 1,
                "explanation": "COMMNTHICK (Common Thickness) is the iCAD parameter for defining the wall thickness of a shelled solid."
            },
            {
                "text": "Name the tool intended specifically for generating angled \"chamfer dimensions\" on the edges of a 3D part.",
                "options": ["Round edge", "Shell", "Chamfer edge", "Separate All"],
                "correct_answer": 2,
                "explanation": "The Chamfer edge tool creates beveled transitions on sharp edges."
            },
            {
                "text": "When preparing to apply a Fillet to a part, which value must be entered into the item entry field before selecting the target edges?",
                "options": ["Chamfer length", "Common thickness", "Fillet radius", "Endface diameter"],
                "correct_answer": 2,
                "explanation": "The radius must be defined in the Item Entry before selecting the edges to be filleted."
            },
            {
                "text": "According to the instructional notes for Chamfer and Fillet operations, what is a key efficiency feature when dealing with multiple edges?",
                "options": ["Only one edge can be processed per command execution", "Several edges can be modified simultaneously in a single operation", "The user must restart the software to apply different lengths to different edges", "The item entry must be cleared after every single edge selection"],
                "correct_answer": 1,
                "explanation": "iCAD allows multiple edges to be selected and processed in a single Fillet or Chamfer operation."
            },
            {
                "text": "What is the primary functional purpose of the Shell tool?",
                "options": ["To join two separate entities into a single unified solid", "To create a 2D sketch plane on a 3D dimension", "To hollow out a solid entity based on a set wall thickness", "To rotate a component around a central axis"],
                "correct_answer": 2,
                "explanation": "Shelling transforms a solid into a hollowed-out hull with a consistent wall thickness."
            },
            {
                "text": "Which mouse action is required to finalize the wall thickness and execute the shell command after selecting the endfaces?",
                "options": ["Double-click the workspace", "Right-click the icon menu", "Double-click the \"GO\" icon or press Enter", "Use the Muhenkan + W shortcut"],
                "correct_answer": 2,
                "explanation": "A \"Double GO\" (clicking the GO icon twice or pressing Enter) is required to finalize complex operations like Shell."
            },
            {
                "text": "Scenario: You are designing a rectangular protective cap. You want the edges to have a 45-degree flat sloped cut rather than a rounded curve. Which tool from the Fairing menu should you select, and which parameter will you define?",
                "options": ["Fillet; Radius", "Shell; COMMNTHICK", "Chamfer; Chamfer length", "Union; Target entity"],
                "correct_answer": 2,
                "explanation": "Chamfers create flat, angled (beveled) transitions on edges."
            },
            {
                "text": "Scenario: You have a solid long bar and you need to transform it into a hollow tube. To ensure the tube is open at both ends, how many faces of the original solid must you select during the Shell process?",
                "options": ["Only the top face", "The four side faces", "Two endfaces", "The entire entity with one click"],
                "correct_answer": 2,
                "explanation": "Selecting the two endfaces as \"Open Surfaces\" during shelling creates a hollow tube with openings at both ends."
            },
            {
                "text": "Scenario: A trainee is attempting to apply a fillet to a block. They select the tool, click the \"GO\" button immediately, and then click an edge. The system does not produce the desired roundness. Based on the 3-step process shown in the lesson, what did the trainee likely forget to do?",
                "options": ["Paint the edge green", "Specify the radius value in the item entry before selecting the edge", "Select the endfaces of the block first", "Rotate the work plane to the Y-Z orientation"],
                "correct_answer": 1,
                "explanation": "iCAD requires the dimension (radius or length) to be set in the Item Entry area BEFORE selecting the target geometry."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == 'fairing').first()
        if not quiz:
            print("Quiz 'fairing' not found in database. Creating it...")
            quiz = Quiz(
                slug='fairing',
                title='Fairing & Advanced Shaping',
                description='Mastering smooth transitions, curvature continuity, and hollow solids.',
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
        print("Successfully synced 'fairing' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_fairing_quiz()
