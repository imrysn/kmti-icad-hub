import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_hole_details_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "Identify the specific visual requirement for Tapped Holes used to differentiate them from standard drill holes in a 3D model.",
                "options": ["Polished finish", "Painted green", "Engraved with M-size", "Left unpainted"],
                "correct_answer": 1,
                "explanation": "In the iCAD standard, tapped (threaded) holes must be painted green for immediate visual recognition in the assembly."
            },
            {
                "text": "Which keyboard shortcut is utilized to align the orientation of the machine part entity with a chosen work plane?",
                "options": ["Ctrl + A", "Shift + S", "無変換 (Muhenkan) + Q", "Alt + R"],
                "correct_answer": 2,
                "explanation": "Muhenkan + Q is the shortcut used to match the entity direction with the active work plane during placement."
            },
            {
                "text": "Name the main menu category under which the \"Arrange Machine Part\" tool is located within the icon menu.",
                "options": ["Basic Functions", "Part Placement", "2D Commands", "System Information"],
                "correct_answer": 1,
                "explanation": "The tool for placing standardized components like holes and shape steels is located under the \"Part Placement\" category."
            },
            {
                "text": "When using the \"Arrange Machine Part\" window, what does the interface provide to help the user verify they have selected the correct dimensions before placement?",
                "options": ["A text-based warning in the Message Pane", "A real-time 3D rotation of the entire assembly", "A cross-sectional preview of the specifications", "An automatic green highlight on the icon menu"],
                "correct_answer": 2,
                "explanation": "The selection window displays a cross-sectional diagram/preview of the hole or part specifications for verification."
            },
            {
                "text": "What is the final required user action to actually \"create the cut\" on a solid block after the hole specifications are set?",
                "options": ["Press the \"GO\" button on the Tool Bar", "Click the desired location on the solid entity", "Right-click the workspace to confirm the origin", "Use the \"Extrude\" command on the hole's diameter"],
                "correct_answer": 1,
                "explanation": "After setting parameters, a left-click on the target solid is required to finalize the hole creation/cut."
            },
            {
                "text": "Which of the following is NOT listed as a standard hole tool available in the ICAD machine part list?",
                "options": ["Counterbores", "Tapping holes", "Drill holes", "Spiral grooves"],
                "correct_answer": 3,
                "explanation": "While iCAD offers various hole types, \"Spiral grooves\" are typically features or separate commands, not standard hole tool presets."
            },
            {
                "text": "In the specification settings of the hole tool, what types of measurements can typically be adjusted by the user?",
                "options": ["Lens angle and lighting intensity", "Material density and weight", "Lengths, depths, and diameters", "Hatch pattern thickness and color hex codes"],
                "correct_answer": 2,
                "explanation": "Hole tools allow for precise adjustment of physical dimensions like depth, nominal diameter, and shoulder length."
            },
            {
                "text": "Scenario: You are adding a series of mounting holes to a plate. You have selected a \"Metric Coarse Thread\" from the list. After placing it, you notice the hole appears as a standard grey circle. What step was missed according to the technical requirements for threaded holes?",
                "options": ["The pitch was not greater than the diameter", "The entity was not matched to the plane using the Muhenkan shortcut", "The hole was not painted green to indicate it is a tapped hole", "The \"3-point orientation\" tool was not active"],
                "correct_answer": 2,
                "explanation": "Following standard protocol, all tapped holes must be painted green to differentiate them from non-threaded drill holes."
            },
            {
                "text": "Scenario: A trainee is trying to place a counterbore on a slanted surface, but the hole is appearing perpendicular to the ground rather than the surface of the part. Which operation should they perform to fix the alignment?",
                "options": ["Use the \"Arrange Machine Part\" tool again to reset the depth", "Press Muhenkan + Q to match the entity direction to the specified plane", "Change the Item Entry coordinate to (0,0,0)", "Apply a green paint finish to the surface of the slant"],
                "correct_answer": 1,
                "explanation": "The Muhenkan + Q shortcut forces the entity (the hole) to align perfectly with the normal vector of the selected work plane."
            },
            {
                "text": "Scenario: You open the \"Arrange Machine Part\" window and see a folder-tree structure on the left. You need to find a specific \"Metric Fine Thread.\" Based on the interface layout, where should you look to find the specific standard sizes (like M6 or M8) for that tool?",
                "options": ["The \"3D part name\" header at the top", "The \"List of available specifications based on standards\" in the middle-bottom column", "The \"Tool Options\" menu in the Command Bar", "The \"Key Entry Area\" at the bottom-left of the main screen"],
                "correct_answer": 1,
                "explanation": "Standardized sizes (M-values) are listed in the specification column within the Arrange Machine Part dialog."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == 'hole-details').first()
        if not quiz:
            print("Quiz 'hole-details' not found in database. Creating it...")
            quiz = Quiz(
                slug='hole-details',
                title='Hole Engineering & iCAD Logic',
                description='Assessment of hole standardization, color coding, and parameter entry.',
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
        print("Successfully synced 'hole-details' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_hole_details_quiz()
