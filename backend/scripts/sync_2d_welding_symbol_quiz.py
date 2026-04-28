import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_welding_symbol_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data
        new_questions = [
            {
                "text": "Identify the specific graphical representation that must be placed on the drawing before the welding symbol to represent the actual fabrication.",
                "options": ["Center lines", "Welding hatches", "Reference dimensions", "Title blocks"],
                "correct_answer": 1,
                "explanation": "Welding hatches are the visual indicators of the weld deposit location on the 2D drawing."
            },
            {
                "text": "According to the instructional notes, which drafting element acts as a representation of the \"welding torch\" on the actual job site?",
                "options": ["Reference line", "Arrow line", "Tail fork", "Weld symbol"],
                "correct_answer": 1,
                "explanation": "The arrow line points exactly where the \"torch\" (weld) should be applied."
            },
            {
                "text": "Name the specific area of the drawing template where standard notes are always positioned.",
                "options": ["Lower right corner", "Center of the part", "Upper left corner", "Inside the Title block"],
                "correct_answer": 2,
                "explanation": "Standard drafting protocols in ICAD place administrative and manufacturing notes in the upper-left quadrant."
            },
            {
                "text": "Unless otherwise specified, what is the mandatory calculation for determining the \"leg length\" of a weld?",
                "options": ["100% of the thickest plate.", "50% of the total assembly width.", "60% of the plate thickness on the thinner side.", "Exactly 6mm regardless of plate thickness."],
                "correct_answer": 2,
                "explanation": "Standard leg length is typically calculated as 60% of the thinner plate's thickness to ensure structural integrity."
            },
            {
                "text": "Under which condition is a designer permitted to eliminate the first line of the \"Standard Notes\"?",
                "options": ["If the drawing is for a 3D model only.", "If the part is made of urethane or rubber.", "If tapping holes and drill holes are not present on the drawing.", "If the welding hatch is located in a hidden area."],
                "correct_answer": 2,
                "explanation": "Certain notes are conditional; for example, drilling/tapping notes are irrelevant if no holes exist."
            },
            {
                "text": "What constraint is applied to the text properties of the \"Standard Notes\" within the template?",
                "options": ["They must be changed to \"High Precision\" font.", "They are not allowed to be changed.", "They must be colored red to match error messages.", "They must be underlined for fake dimensions."],
                "correct_answer": 1,
                "explanation": "Standard notes are protected template elements to ensure consistency across all engineering drawings."
            },
            {
                "text": "In the Welding Symbol dialog box, which field is used to specify that the weld should be performed all the way around the joint?",
                "options": ["Welding surface finishing process", "surface shape finish", "Weld all around / weld on site", "Additional instruction"],
                "correct_answer": 2,
                "explanation": "The \"Weld all around\" option adds the circular symbol at the junction of the arrow and reference line."
            },
            {
                "text": "Scenario: You are detailing a very small bracket where the space for annotation is extremely limited. According to the \"Notes\" section regarding welding, how should you handle the application of welding hatches in this specific instance?",
                "options": ["Force the hatch to fit by scaling the template higher.", "Omit the hatches because the detail is too small.", "Use a \"Phantom Line\" instead of a hatch.", "Paint the entire part yellow to indicate a safety weld."],
                "correct_answer": 1,
                "explanation": "Legibility is a priority; if a feature is too small for a hatch, it may be omitted provided the symbol is clear."
            },
            {
                "text": "Scenario: A trainee is configuring a welding symbol and needs to define the spacing between individual weld segments. Which specific field in the dialog box should they use to input the \"Length, width, and pitch\" of the welding?",
                "options": ["Leg Length (Manual Input)", "surface shape finish", "Length, width and pitch of welding", "List of welding symbols"],
                "correct_answer": 2,
                "explanation": "Pitch and segment length for intermittent welds are managed in the dedicated \"Length, width and pitch\" field."
            },
            {
                "text": "Scenario: You are finalizing a drawing and reviewing the \"Standard Notes\" that automatically appeared. The notes state that \"When completed, burrs and dust must not exist.\" You want to move this specific note to the bottom right of the template for better visibility. Based on the lesson, is this action allowed?",
                "options": ["Yes, as long as the text is not deleted.", "No, notes are always located in the upper left corner and properties are not allowed to change.", "Yes, but only if you use the \"Move Component\" tool.", "No, because the note must be placed under the Title bar instead."],
                "correct_answer": 1,
                "explanation": "Drafting standards strictly dictate the location of general notes to maintain a uniform corporate style."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-welding-symbol').first()
        if not quiz:
            print("Quiz '2d-welding-symbol' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-welding-symbol',
                title='ICAD Welding Symbols and Standard Notes Assessment',
                description='Technical evaluation of 2D welding documentation, welding symbol configuration, and the application of standard notes within the ICAD drafting template.',
                course_type='2D_Drawing'
            )
            db.add(quiz)
            db.flush()
        else:
            quiz.title = 'ICAD Welding Symbols and Standard Notes Assessment'
            quiz.description = 'Technical evaluation of 2D welding documentation, welding symbol configuration, and the application of standard notes within the ICAD drafting template.'

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
        print("Successfully synced '2d-welding-symbol' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_welding_symbol_quiz()
