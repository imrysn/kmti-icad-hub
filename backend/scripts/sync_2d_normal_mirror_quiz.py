import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_normal_mirror_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data
        new_questions = [
            {
                "text": "Identify the specific hardware component designated by the code \"SWS\" according to the Kusakabe Standard.",
                "options": ["Standard Flat Washer", "Spring Lock Washer (For Hexagon Socket head)", "Square Taper Washer", "Split Pin"],
                "correct_answer": 1,
                "explanation": "SWS is the shorthand code for spring washers specifically sized for use with socket head cap screws."
            },
            {
                "text": "According to the SGP Pipe standards, what is the required 3D modeling color for pipes used specifically for Hand Rails?",
                "options": ["Red (No. 1)", "Yellow (No. 4)", "White (No. 0)", "Blue (No. 6)"],
                "correct_answer": 1,
                "explanation": "Yellow (No. 4) is the designated safety color for handrails and guarding in the piping standard."
            },
            {
                "text": "Name the 2D detailing command used to flip a drawing's lines, symbols, and dimensions at an equal distance from a specified axis.",
                "options": ["Rotate movement", "Offset Copy", "Mirror movement command", "Scale Entity"],
                "correct_answer": 2,
                "explanation": "Mirror movement is used to generate the symmetrical reflection of a part layout across a defined axis."
            },
            {
                "text": "When calculating the appropriate Bolt Length for a project, what is the mandatory action if the mathematical result does not match a standard bolt length?",
                "options": ["Use the next smaller standard size to prevent bottoming out.", "Round the result up to the nearest standard bolt length.", "Manually machine the bolt to the calculated decimal length.", "Increase the material thickness to match the bolt."],
                "correct_answer": 1,
                "explanation": "Standard engineering practice requires rounding up to the nearest commercially available bolt length (e.g., 22mm becomes 25mm)."
            },
            {
                "text": "For a Class 2 (Machine Parts) application using an M10 bolt, what is the standard diameter required for the bolt hole?",
                "options": ["9 mm", "11 mm", "12 mm", "14 mm"],
                "correct_answer": 1,
                "explanation": "A Class 2 clearance hole for an M10 fastener is 11mm in diameter."
            },
            {
                "text": "According to the rules for detailing mirror parts, what is the required procedure for handling the Isometric View?",
                "options": ["Delete the isometric view as it cannot be mirrored.", "Update the isometric view by switching the user view as needed.", "Manually redraw the isometric view using single dot lines.", "Keep the isometric view of Part A for both drawings."],
                "correct_answer": 1,
                "explanation": "Mirrored part documentation requires a correctly oriented isometric view representing the \"B\" (mirrored) geometry."
            },
            {
                "text": "What is the designated usage and application for SGP (White) pipes in ICAD?",
                "options": ["Structural and Fabricated Parts", "Fluid applications (Oil, Air, and Coolant)", "Safety Covers and Guarding", "Electrical and Sensor mounting"],
                "correct_answer": 1,
                "explanation": "SGP (White) pipes are standardized for fluid transport systems within machine assemblies."
            },
            {
                "text": "Scenario: You are detailing a mirrored part (Part B). You have successfully mirrored the main views using the origin as a reference. You notice the title block still shows the drawing number for Part A. According to step 9 of the mirroring rules, what must you do?",
                "options": ["Edit the text using the \"Edit Characters\" command.", "Insert a new title block to update the drawing number on the template.", "Leave it as is, as the \"B\" suffix is implied.", "Change the layer of the title block to Layer 2."],
                "correct_answer": 1,
                "explanation": "Replacing the Title Block ensures that the Part B drawing number is correctly mapped and synchronized with the template."
            },
            {
                "text": "Scenario: You are designing a bolting setup for a Pillow Block where the mounting hole is SLOTTED. Based on the Bolting Setup standards, which hardware combination is required to ensure a secure fit?",
                "options": ["Hexagonal Bolt (HB) and Spring Washer (SW).", "Hexagonal Bolt (HB), Spring Washer (SW), and Hardened Flat Washer.", "Hex Sockethead Cap Screw (CS) and Hex Nut.", "Hexagonal Bolt (HB) and Taper Washer (AW5)."],
                "correct_answer": 1,
                "explanation": "Slotted holes require a flat washer to provide a wider bearing surface and prevent the spring washer from deforming the slot."
            },
            {
                "text": "Scenario: You are performing a Mirror movement command on a complex 2D plate detail. After selecting the lines, dimensions, and symbols, the system prompts for \"point1 and point2.\" What do these two points define?",
                "options": ["The start and end of the dimension line.", "The axis of symmetry for the flip.", "The new coordinates for the origin.", "The scale and rotation angle of the mirrored entity."],
                "correct_answer": 1,
                "explanation": "The two-point selection establishes the physical mirror line (axis of symmetry) for the operation."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-normal-mirror').first()
        if not quiz:
            print("Quiz '2d-normal-mirror' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-normal-mirror',
                title='ICAD Standards and Advanced Detailing Assessment',
                description='Proficiency in hardware selection, piping standards, and the procedural rules for detailing mirrored parts within the ICAD drafting environment.',
                course_type='2D_Drawing'
            )
            db.add(quiz)
            db.flush()
        else:
            quiz.title = 'ICAD Standards and Advanced Detailing Assessment'
            quiz.description = 'Proficiency in hardware selection, piping standards, and the procedural rules for detailing mirrored parts within the ICAD drafting environment.'

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
        print("Successfully synced '2d-normal-mirror' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_normal_mirror_quiz()
