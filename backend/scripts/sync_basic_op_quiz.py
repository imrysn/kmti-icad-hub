import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_basic_op_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "When initiating a new 3D model, which specific standard orientation is required for the starting view?",
                "options": ["Top view", "Side view", "Front view", "Isometric view"],
                "correct_answer": 2,
                "explanation": "All new 3D models in the KEMCO iCAD workflow must start from the Front View for proper projection alignment."
            },
            {
                "text": "In the \"Arrange Machine Part\" interface, which international standard is used to define the available specifications for shape steels (e.g., C-Channels or H-Beams)?",
                "options": ["ISO standard", "ANSI standard", "JIS standard", "DIN standard"],
                "correct_answer": 2,
                "explanation": "The iCAD library is standardized around the JIS (Japanese Industrial Standards) for mechanical components."
            },
            {
                "text": "Identify the command used to toggle the visibility of specific elements such as dimensions, cutting lines, and welding symbols.",
                "options": ["Delete Entity", "Show/Hide Drafting Entity", "Change Level", "System Information"],
                "correct_answer": 1,
                "explanation": "The \"Show/Hide Drafting Entity\" command allows users to declutter the workspace by toggling annotations."
            },
            {
                "text": "When creating a Cylinder, which two specific parameters must be defined within the Item Entry field before setting the origin?",
                "options": ["Radius and Rotation Angle", "Diameter and Height", "Circumscribed Diameter and Number of Sides", "Path Radius and Section Diameter"],
                "correct_answer": 1,
                "explanation": "Cylindrical primitives require both the base Diameter and the extrusion Height to be defined."
            },
            {
                "text": "What visual indicator appears on the workspace to signify that a specific area of a sketch has been successfully designated for an Extrusion or Revolve operation?",
                "options": ["The lines turn red", "A crosshair appears at the origin", "A hatch pattern fills the specified area", "The sketch automatically enters 3D mode"],
                "correct_answer": 2,
                "explanation": "Hatching is the visual feedback in iCAD that an enclosed profile is ready for solid generation."
            },
            {
                "text": "How does the Stretch tool differ from the Resize tool in practical application?",
                "options": ["Stretch only works on circular surfaces, while Resize works on polygons", "Stretch increases the length of a specific face, while Resize scales the overall size of the solid entity", "Stretch requires 3-points to set a plane, while Resize requires an axis of rotation", "Stretch is used for 2D sketches, while Resize is strictly for 3D Machine Parts"],
                "correct_answer": 1,
                "explanation": "Stretch modifies a specific vector length, whereas Resize performs a global scale operation on the entity."
            },
            {
                "text": "Which of the following is required to successfully perform a Mirror operation on an existing entity?",
                "options": ["Selecting a single point to act as the reflection center", "Defining an axis of rotation using 2 points", "Selecting 3 points to establish the plane of symmetry", "Entering a scale value of -1.0 in the Item Entry"],
                "correct_answer": 2,
                "explanation": "A 3D mirror requires a defined plane, which is mathematically established using three points."
            },
            {
                "text": "Scenario: You are tasked with creating a hex-headed bolt. You select the Polygonal Prism tool. To ensure it has the correct hexagonal shape, which specific attribute must you adjust in the Item Entry?",
                "options": ["Diameter (Circumscribed)", "Top Number (Number of sides)", "Base Diameter", "Section Diameter"],
                "correct_answer": 1,
                "explanation": "The \"Top Number\" parameter in the polygonal tool dictates the number of geometric sides (e.g., 6 for a hexagon)."
            },
            {
                "text": "Scenario: A user wants to create a circular 3D ring with a specific thickness. They select the Torus tool. Which parameter must they define to control the thickness of the ring itself, rather than the size of the circle it follows?",
                "options": ["Path Radius", "Turn Angle", "Section Diameter", "Move Length Z"],
                "correct_answer": 2,
                "explanation": "In a Torus, the Path Radius is the ring size, while the Section Diameter is the thickness of the ring material."
            },
            {
                "text": "Scenario: You have a 3D block and need to create a second identical block exactly 50mm away on the X-axis. You wish to do this in a single step without deleting the original. Which command should you use?",
                "options": ["Move", "Copy", "Rotate Copy", "Stretch"],
                "correct_answer": 1,
                "explanation": "The Copy command creates a duplicate at a specified distance while preserving the original entity."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == 'basic-op').first()
        if not quiz:
            print("Quiz 'basic-op' not found in database. Creating it...")
            quiz = Quiz(
                slug='basic-op',
                title='Basic iCAD Operations',
                description='Understanding command sequencing, input logic, and modification tools.',
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
        print("Successfully synced 'basic-op' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_basic_op_quiz()
