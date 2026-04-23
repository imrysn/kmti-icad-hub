import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_3d_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "Name the command required to initialize a 2D drawing surface within a 3D environment.",
                "options": ["Create Part", "Open Work Plane", "New Sketch", "Drafting Palette"],
                "correct_answer": 1,
                "explanation": "The \"Open Work Plane\" command is necessary to create the 2D surface where sketches are drawn before conversion."
            },
            {
                "text": "Which specific keyboard shortcut allows a user to toggle the orientation of the work plane between the X-Y, X-Z, and Y-Z planes?",
                "options": ["Ctrl + Tab", "Alt + F4", "無変換 (Muhenkan) + W", "Shift + Space"],
                "correct_answer": 2,
                "explanation": "The Muhenkan + W combination is the standard iCAD shortcut for cycling through work plane orientations."
            },
            {
                "text": "Identify the interface component that allows a designer to view and select specific options (such as \"Limited\" or \"Unlimited\") for a chosen drafting tool.",
                "options": ["Menu Bar", "Tool options", "Status Bar", "Key Entry"],
                "correct_answer": 1,
                "explanation": "The Tool Options area displays context-sensitive settings for the currently active drafting command."
            },
            {
                "text": "When performing an Extrude or Revolve operation, what is the significance of a hatch pattern appearing on your 2D sketch?",
                "options": ["It indicates the sketch is an open path and cannot be solid", "It confirms that the sketch is a fully enclosed figure ready for transformation", "It signals that the work plane has been automatically deleted", "It marks the axis of rotation for the spiral form"],
                "correct_answer": 1,
                "explanation": "Hatching confirms that iCAD recognizes a closed geometric loop suitable for creating a 3D solid."
            },
            {
                "text": "During the Spiral Form process, which mathematical constraint is explicitly noted regarding the relationship between \"Pitch\" and \"Thickness\"?",
                "options": ["The Pitch must be exactly double the Thickness", "The Thickness must be greater than the Pitch", "The Pitch must be greater than the Thickness", "The Pitch and Thickness must be equal values"],
                "correct_answer": 2,
                "explanation": "For a valid spiral form, the Pitch (distance between coils) must be greater than the material Thickness to prevent self-intersection."
            },
            {
                "text": "What happens if a user selects \"OK\" on the dialog box that appears immediately after a successful extrusion?",
                "options": ["The 3D entity is saved to the library", "The work plane and all associated 2D sketches are permanently removed", "The 3D entity is mirrored across the Y-Z plane", "The command menu switches from \"Drafting\" to \"Sketching\""],
                "correct_answer": 1,
                "explanation": "Clicking OK on the post-operation dialog clears the temporary work plane and drafting geometry used to create the solid."
            },
            {
                "text": "Which of the following best describes the Revolve command?",
                "options": ["It creates a solid entity by projecting a cross-section vertically", "It creates a 3D spiral by following a pitch along an axis", "It creates a solid by rotating a section form around a designated axis", "It rotates the work plane 90 degrees to the current view"],
                "correct_answer": 2,
                "explanation": "The Revolve tool generates a solid by sweeping a 2D profile around a center line or axis."
            },
            {
                "text": "Scenario: A designer has completed a 2D profile for a pulley. They want to turn this profile into a 3D object that is symmetrical around a center point. After selecting the profile, what is the next critical geometric element they must \"pick\" to complete the operation?",
                "options": ["The height of extrusion", "The axis of rotation", "The X-Y Plane shortcut", "The \"Cancel\" button on the dialog box"],
                "correct_answer": 1,
                "explanation": "Rotational symmetry in 3D requires a defined axis of rotation to be selected after the profile."
            },
            {
                "text": "Scenario: You are creating a spring using the Spiral Form tool. You have set your pitch to 50.0 and your thickness to 60.0. When you attempt to press \"GO,\" the system likely presents an error or fails. Based on the lesson's notes, why is this configuration invalid?",
                "options": ["Spiral forms cannot have a pitch value higher than 10.0", "The pitch value is not greater than the thickness value", "You failed to select \"Open Work Plane\" before setting the pitch", "The scale value must be set to 0.0 for springs"],
                "correct_answer": 1,
                "explanation": "In iCAD, a spiral cannot be generated if the material thickness exceeds the pitch, as the geometry would overlap."
            },
            {
                "text": "Scenario: A trainee wants to keep their 2D sketches visible for future reference even after they have finished extruding them into 3D blocks. When the post-extrusion dialog box appears, what action should they take?",
                "options": ["Select \"OK\" to store the sketches in the Command Menu", "Use Muhenkan + W to hide the sketches", "Select \"Cancel\" to retain the work plane and the sketches", "Delete the drafting entities manually in the Tool Options"],
                "correct_answer": 2,
                "explanation": "Selecting \"Cancel\" prevents iCAD from deleting the source work plane and drafting lines, allowing them to remain visible."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-3d').first()
        if not quiz:
            print("Quiz '2d-3d' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-3d',
                title='2D to 3D Conversion Workflow',
                description='Understanding the KEMCO methodology for solid generation from orthographic geometry.',
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
        print("Successfully synced '2d-3d' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_3d_quiz()
