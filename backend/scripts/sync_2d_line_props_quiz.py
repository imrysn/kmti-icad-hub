import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_line_props_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "Identify the standardized line type, color, and thickness used specifically for representing Hidden Lines in a 2D drawing.",
                "options": ["Solid Line, White (1), Thick (0.5mm)", "Broken Line, Green (3), Thin (0.1mm)", "Chain Line, Yellow (4), Thin (0.18mm)", "Dotted Line, Blue (5), Medium (0.3mm)"],
                "correct_answer": 1,
                "explanation": "Hidden lines (Edges obscured by foreground geometry) are strictly defined as Green broken lines in the KEMCO drafting standard."
            },
            {
                "text": "What specific tool is used to replace standard lines with a wave-like geometry when a partial section is performed on a drawing?",
                "options": ["Circle", "Spline", "Trim", "Offset"],
                "correct_answer": 1,
                "explanation": "The Spline tool generates the irregular \"break line\" required to denote a localized sectional cutout."
            },
            {
                "text": "Name the critical setting in the color selection window that must be active to allow an operator to select and change the color of lines.",
                "options": ["Face (面)", "Entity (要素)", "Group", "Window"],
                "correct_answer": 1,
                "explanation": "The selection mode must be set to \"Entity\" to target individual 2D line segments for property modification."
            },
            {
                "text": "When manually adding a center line between two points (L1 and L2), what technical constraint must the operator be aware of regarding the selection order?",
                "options": ["L2 must always be a circular edge", "The center line is always based on the first line (L1) picked", "The offset value must be set to zero before picking L1", "Picking order does not matter as long as both lines are parallel"],
                "correct_answer": 1,
                "explanation": "The generated center line inherits the length and orientation properties from the primary reference (L1)."
            },
            {
                "text": "Which color is designated for Text and Letters in the 2D detailing environment according to the Line Properties table?",
                "options": ["Green (3)", "Cyan (7)", "Yellow (4)", "White (1)"],
                "correct_answer": 2,
                "explanation": "Yellow (Color 4) is the designated standard for technical text and annotations to ensure high visibility."
            },
            {
                "text": "What is the functional consequence of selecting the \"Face\" (面) option instead of \"Entity\" (要素) while attempting to change line colors?",
                "options": ["The lines will automatically change to a thick weight", "No lines will be available for selection", "The system will convert the view to a Phantom line", "The entire view will be hidden from the tree view"],
                "correct_answer": 1,
                "explanation": "In 2D views, selecting \"Face\" is invalid because the view consists of entities, not solid faces; this prevents selection."
            },
            {
                "text": "In the \"Change the representation of parts hierarchically\" tool, which attribute would you select if you wanted a specific part to be displayed as a reference using a double-dot line type?",
                "options": ["Hide Part", "Hidden Line", "Normal", "Phantom"],
                "correct_answer": 3,
                "explanation": "Phantom attributes (double-dot chain lines) are used for \"reference only\" parts like surrounding structures or alternate positions."
            },
            {
                "text": "Scenario: You are detailing an \"OF Piping Assembly.\" Upon inserting the orthographic view, you notice several center lines that are cluttering the drawing. According to the lesson on Piping Center Lines, how should you address this?",
                "options": ["Use the \"Delete Component\" tool to remove them individually", "Uncheck the \"Piping Center Line\" box in the projection settings", "Change the line color to skin color #15 to make them invisible", "Use a Spline to replace the piping paths"],
                "correct_answer": 1,
                "explanation": "Global piping centerlines can be toggled on/off within the Projection Properties to maintain drawing clarity."
            },
            {
                "text": "Scenario: A designer is working on a complex assembly and needs to view the internal components of a specific sub-assembly. However, a large housing (CHHM5-6135-B-35) is blocking the view. According to the \"Representation of Parts\" lesson, what is the most efficient way to clear the view without deleting the housing?",
                "options": ["Select the part in the list and apply the \"Hide Part\" attribute", "Change the housing's line thickness to 0.1mm", "Apply a \"Single Dot Line\" type to the housing", "Paint the housing green using the color selection window"],
                "correct_answer": 0,
                "explanation": "Applying the \"Hide Part\" attribute in the hierarchical representation tool removes the part from the view without deleting it from the model."
            },
            {
                "text": "Scenario: You are modifying a drawing where a thread line is currently showing as a broken line. According to the note on \"Changing line properties,\" what are the two specific requirements to make this thread line technically correct?",
                "options": ["It must be joined and the color must be green", "It must be changed to a single-dot line and colored cyan", "It must be thickened to 0.4mm and colored white", "It must be converted to a spline and colored red"],
                "correct_answer": 0,
                "explanation": "Threaded edges must be represented as joined (continuous) thin green lines according to the detailing standards."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-line-props').first()
        if not quiz:
            print("Quiz '2d-line-props' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-line-props',
                title='iCAD Line Properties and Detailing Assessment',
                description='Understanding the standard line types and physical properties in KEMCO engineering.',
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
        print("Successfully synced '2d-line-props' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_line_props_quiz()
