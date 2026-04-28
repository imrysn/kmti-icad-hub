import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_balloon_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data
        new_questions = [
            {
                "text": "Identify the specific document that must be properly linked with the 2D drawing properties to enable the automatic appearance of balloon letters or numbers.",
                "options": ["Specific Gravity table", "Bill of Materials (BOM)", "Assembly Tree View", "Material hardness chart"],
                "correct_answer": 1,
                "explanation": "The BOM acts as the data source for all automated part identification labels (balloons) in the 2D workspace."
            },
            {
                "text": "Name the command specifically used in assembly drawings to insert a new balloon into an existing one, indicating that parts are assembled together.",
                "options": ["Repeat Copy", "Part Balloon", "Add Balloon (or Edit Balloon)", "Mirror Balloon"],
                "correct_answer": 2,
                "explanation": "The \"Add Balloon\" feature allows for stacking multiple identifiers (e.g., bolt, washer, nut) on a single leader line."
            },
            {
                "text": "According to the positioning rules, what are the two graphical elements that a part balloon is strictly forbidden from overlapping?",
                "options": ["The drawing border and Title Block", "Other lines or dimensions", "Center lines and hidden lines", "Text notes and welding hatches"],
                "correct_answer": 1,
                "explanation": "Professional drafting standards require that balloons remain clear of other geometry and dimensions for legibility."
            },
            {
                "text": "What is the primary reason why a part balloon might fail to display a letter or number automatically when attached to a part?",
                "options": ["The part is not colored yellow for safety.", "The drawing properties and the BOM properties are not correctly linked.", "The scale on the tool bar is set to 1/1.", "The balloon was placed in a hidden area of the template."],
                "correct_answer": 1,
                "explanation": "Automatic data population requires a valid link between the drawing's attribute mapping and the active BOM document."
            },
            {
                "text": "Which of the following is a prohibited practice when a part balloon does not display the expected information?",
                "options": ["Checking the 3D part link.", "Re-creating the BOM.", "Manually typing the letters or numbers into the item entry box.", "Deleting the view and re-projecting."],
                "correct_answer": 2,
                "explanation": "Manual overrides (hardcoding text) break the dynamic link to the BOM and lead to documentation errors if the assembly changes."
            },
            {
                "text": "When placing a balloon on a part drawing, what is the correct procedural sequence for mouse clicks?",
                "options": ["Click P1 to locate the balloon, then click L1 of the part.", "Click L1 of the part to be identified, then click P1 to position the balloon.", "Double-click the part image and select \"Properties.\"", "Select \"Edit Characters\" and click the center of the part."],
                "correct_answer": 1,
                "explanation": "The workflow requires selecting the target geometry (L1) first, followed by the placement point (P1)."
            },
            {
                "text": "What is the technical constraint regarding the modification of balloon text after it has been placed?",
                "options": ["Text should be translated into Japanese.", "Text height should be doubled for assembly drawings.", "Text should not be changed using the \"edit characters\" command.", "Text color must match the hidden line color (green)."],
                "correct_answer": 2,
                "explanation": "Editing the characters manually disconnects the balloon from its associative database entry in the BOM."
            },
            {
                "text": "Scenario: You are working on a complex assembly drawing. You need to show that a bolt, a washer, and a nut are a single fastened group. Which specific sub-command within the Balloon menu should you use to stack these identifications?",
                "options": ["Part Balloon", "Add Balloon", "Delete Views", "Auto-generate BOM"],
                "correct_answer": 1,
                "explanation": "Add Balloon is specifically designed to stack multiple components on a shared leader line."
            },
            {
                "text": "Scenario: A trainee is placing balloons on a 2D detail. They place a balloon directly over a dimension line to save space in a crowded area of the drawing. Based on the \"Notes\" in the lesson, what is the correct evaluation of this action?",
                "options": ["It is acceptable if the balloon is clearly shown.", "It is incorrect because balloons should not overlap with other lines or dimensions.", "It is only allowed if the \"High Precision\" box is checked.", "It is mandatory to overlap if the BOM is not linked."],
                "correct_answer": 1,
                "explanation": "Clarity is paramount; overlapping critical dimensions with balloon graphics is a major drafting error."
            },
            {
                "text": "Scenario: You have successfully linked your 3D model properties to the BOM. You are now applying balloons to an assembly drawing. You click the part ($L1$) and then click a second point ($P2$). Where should $P2$ be located to correctly \"Add\" a balloon to an existing one?",
                "options": ["At the origin (0,0,0) of the drawing.", "Directly on the arrow line of the welding symbol.", "Beside the existing balloon where the new one will be attached.", "In the upper left corner of the template."],
                "correct_answer": 2,
                "explanation": "To stack balloons, the placement point (P2) must be targeted at the perimeter of the existing balloon bubble."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-balloon').first()
        if not quiz:
            print("Quiz '2d-balloon' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-balloon',
                title='ICAD Part Balloon and Annotation Assessment',
                description='Technical understanding of the relationship between 3D modeling properties, the Bill of Materials (BOM), and the automated generation of part balloons in 2D detailing.',
                course_type='2D_Drawing'
            )
            db.add(quiz)
            db.flush()
        else:
            quiz.title = 'ICAD Part Balloon and Annotation Assessment'
            quiz.description = 'Technical understanding of the relationship between 3D modeling properties, the Bill of Materials (BOM), and the automated generation of part balloons in 2D detailing.'

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
        print("Successfully synced '2d-balloon' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_balloon_quiz()
