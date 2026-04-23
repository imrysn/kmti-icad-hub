import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_dimensioning_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "Identify the specific feature in the \"Edit Dimension Characters\" window that must be toggled to show the equivalent numerical value for a fitting tolerance.",
                "options": ["\"convert\" button", "\"Round\" toggle", "\"Scale\" field", "\"Metadata\" link"],
                "correct_answer": 0,
                "explanation": "The \"convert\" button translates fitting codes (like g6 or h7) into their corresponding numerical tolerance range (+/-) for manufacturing clarity."
            },
            {
                "text": "Which visual formatting style is mandatory for \"fake dimensions\" used on broken view details of long parts like shafts?",
                "options": ["Italicized", "Bold Red", "Underline", "Dashed text"],
                "correct_answer": 2,
                "explanation": "Underlining a dimension value is the universal drafting indicator that the geometry is not to scale due to a break view."
            },
            {
                "text": "Name the specific alignment tool used when multiple dimensions across different views need to be perfectly leveled with one another.",
                "options": ["AutoAlign", "Lackey Entity", "Snap Center", "Grid Lock"],
                "correct_answer": 1,
                "explanation": "Lackey Entity allows for horizontal or vertical alignment of annotations between projected views to maintain sheet aesthetics."
            },
            {
                "text": "When utilizing the Part Note command, which of the following is true regarding the quantity of holes?",
                "options": ["The system automatically calculates and displays the quantity", "Quantity is never included in a part note", "The quantity must be manually entered using the \"Edit Characters\" command", "The quantity only appears if the part is mirrored"],
                "correct_answer": 2,
                "explanation": "Unlike automated balloons, part notes require manual text entry for hole patterns and specific counts."
            },
            {
                "text": "According to the lesson on Polished Materials, why is there no need to use the \"convert\" tool for an h9 fitting tolerance on S45C−D?",
                "options": ["Polished materials do not allow for tolerance conversion", "The h9 tolerance is already assured by the processing of the drawing/material", "Polished materials must use h7 instead of h9", "The specific gravity of the material makes the conversion invalid"],
                "correct_answer": 1,
                "explanation": "Standard polished stock (like S45C-D) is manufactured to h9 precision, so no secondary tolerance notes are required."
            },
            {
                "text": "What is the correct mouse sequence for establishing a Break view on a long part?",
                "options": ["Click the origin > Pick P1 > Select \"UNION\"", "Pick P1 (start) to P2 (end), then drag P3 back to P1 location", "Pick P1 > Select \"High Precision\" > Pick P3", "Pick P1, P2, and P3, then select \"Autoballoon\""],
                "correct_answer": 1,
                "explanation": "The 3-point sequence defines the section to be removed (P1 to P2) and the final condensed position (P3)."
            },
            {
                "text": "In the \"Edit Dimension Characters\" window, which field is used to add the diameter symbol (Ø) or other symbols like \"C\" or \"R\"?",
                "options": ["Marking", "Quantity", "Fitting Tolerance", "Additional notes"],
                "correct_answer": 0,
                "explanation": "The \"Marking\" field prepends technical symbols (Ø, C, R, SQ) to the numerical dimension value."
            },
            {
                "text": "Scenario: You are adding dimensions to a series of holes in a single line. Instead of placing individual measurements, you want to display a continuous string of linear dimensions. Which specific command from the \"製図\" (Drafting) menu should you select, and what is the final action required after picking the lines?",
                "options": ["Standard dimension; Click OK", "Series dimension; Select \"GO\" and place at the desired location", "Part note; Click P1 and P2", "Positional alignment; Select \"convert\""],
                "correct_answer": 1,
                "explanation": "Series dimensioning creates a chained string of measurements in a single operation, finalized with the \"GO\" command."
            },
            {
                "text": "Scenario: You have several dimensions that are too close together, making the drawing difficult to read. You want to move a single dimension to a new position while maintaining the link to the geometry. According to the 4-step \"Change Position\" process, what should you do after selecting the command and the dimension?",
                "options": ["Click the tree view", "Click a point P2 to relocate the dimension", "Select \"Lackey Entity\" to align it with the front view", "Re-paint the dimension green to match the hidden lines"],
                "correct_answer": 1,
                "explanation": "The Change Position tool requires the user to select the target entity and then pick a new anchor point (P2) for the text."
            },
            {
                "text": "Scenario: You are creating a break view on an Isometric view of a long shaft. You find it difficult to maintain the correct angle for the cutting line. Based on the \"Dimension for Breakviews\" lesson, what temporary visual aid should you create to resolve this?",
                "options": ["A green hidden line", "A red reference line for the cutting angle", "A collective dimension", "A spline with a wave radius of 10.0"],
                "correct_answer": 1,
                "explanation": "Temporary reference geometry (drawn in red) ensures that break cuts remain perpendicular or aligned to the part's axis."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-dimensioning').first()
        if not quiz:
            print("Quiz '2d-dimensioning' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-dimensioning',
                title='iCAD 2D Dimensioning and Detailing Assessment',
                description='Precision 2D Dimensioning Logic for accurate manufacturing communication.',
                course_type='2D_Drawing'
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
        print("Successfully synced '2d-dimensioning' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_dimensioning_quiz()
