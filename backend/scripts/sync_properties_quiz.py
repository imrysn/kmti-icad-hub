import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_properties_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "Identify the specific visual property that must be applied to all \"Layer 1\" common parts that require machining or fabrication.",
                "options": ["Black (Color 16)", "Yellow (Color 4)", "White (Color 1)", "Gray (Color 8)"],
                "correct_answer": 2,
                "explanation": "Layer 1 fabricated parts are standardly designated with White (Color 1) in the KEMCO iCAD environment."
            },
            {
                "text": "Which specific measurement tool is used to determine the spatial coordinates of a single point relative to the origin?",
                "options": ["Measures the length of an edge", "Displays coordinates of a point from the origin (Coord tool)", "Measures the angle between two edges", "Displays material weight"],
                "correct_answer": 1,
                "explanation": "The coordinate tool (Coord) provides the X, Y, and Z position of a selected point relative to the active origin."
            },
            {
                "text": "According to the layer standards, what color number is specifically designated for \"Safety Covers\"?",
                "options": ["No. 1 (White)", "No. 3 (Green)", "No. 4 (Yellow)", "No. 8 (Gray)"],
                "correct_answer": 2,
                "explanation": "Yellow (Color 4) is reserved for safety-related components like machine guards and covers."
            },
            {
                "text": "What is the primary functional difference between changing color by \"Entity\" versus by \"Face\"?",
                "options": ["Entity changes only the wireframe; Face changes the solid volume", "Entity modifies the entire solid object; Face modifies only specific selected surfaces", "Entity is used for Purchase Parts; Face is used for Machined Parts", "Entity changes the layer designation; Face only changes the visual appearance"],
                "correct_answer": 1,
                "explanation": "The \"Entity\" option applies color to the whole solid, whereas \"Face\" allows for individual surface coloring."
            },
            {
                "text": "A part undergoes a \"Manganese Phosphate\" heat treatment. According to the Layer 2 standards, what color and code should be assigned to it?",
                "options": ["Gray (No. 8)", "Blue (No. 5)", "White (No. 1)", "Black (No. 16)"],
                "correct_answer": 3,
                "explanation": "Black (No. 16) is the designated color for parts with Manganese Phosphate (Black Oxide) treatment."
            },
            {
                "text": "When using the \"Change Layer\" tool, what is the correct procedural sequence?",
                "options": ["Click the entity > select the color > specify the layer", "Select the tool > specify the layer in Item Entry > click the solid entity", "Right-click the workspace > select \"Layer 1\" > press Enter", "Pick a point > measure the distance > assign the layer number"],
                "correct_answer": 1,
                "explanation": "The standard iCAD workflow for layer changes involves selecting the tool, entering the target layer ID, and then selecting the geometry."
            },
            {
                "text": "For \"Purchase Parts\" like motors or encoders, what is the rule regarding their color designation?",
                "options": ["They must always be painted White (No. 1)", "They must be painted Yellow (No. 4) for safety", "They should use the manufacturer's standard color", "They must be black to indicate they are not fabricated in-house"],
                "correct_answer": 2,
                "explanation": "Purchased components (COTS) are typically modeled using their real-world manufacturer colors for assembly clarity."
            },
            {
                "text": "Scenario: You are inspecting a 3D model of a \"Pointer.\" The body of the pointer is stainless steel, but the tip needs to be highlighted for clarity. According to the instructional notes, which color is reserved specifically for the pointer tip?",
                "options": ["Green", "Yellow", "Red", "Blue"],
                "correct_answer": 2,
                "explanation": "The tip of a pointer is standardly designated with Red to ensure high visibility in technical documentation."
            },
            {
                "text": "Scenario: You have a solid part that has undergone \"Isonite\" heat treatment. You need to verify its current properties to ensure it was assigned to the correct layer. Which tool should you use to see a pop-up window containing the Folder, DrawName, Layer, and Material Info?",
                "options": ["Measures the length of an edge", "Measures the distance between two points", "Displays the information about the selected entity (Solid info tool)", "Measures the angle between two edges"],
                "correct_answer": 2,
                "explanation": "The Solid Info tool provides a comprehensive metadata summary for any selected 3D component."
            },
            {
                "text": "Scenario: A designer is working on a machine guarding system for a belt and gear drive. They need to color the covers to comply with safety standards. Based on the lesson, which color and application rationale should they use?",
                "options": ["White (No. 1); because it is a common fabricated part", "Gray (No. 8); because it requires heat treatment", "Yellow (No. 4); because safety color applies to covers for machine guarding", "Black (No. 16); because it is a purchase part"],
                "correct_answer": 2,
                "explanation": "Yellow is the mandatory industrial safety color for guarding and protective covers."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == 'properties').first()
        if not quiz:
            print("Quiz 'properties' not found in database. Creating it...")
            quiz = Quiz(
                slug='properties',
                title='Structural Properties & BOM Metadata',
                description='Mastering color coding, naming conventions, and documentation properties.',
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
        print("Successfully synced 'properties' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_properties_quiz()
