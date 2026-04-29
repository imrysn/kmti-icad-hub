import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_standard_library_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data
        new_questions = [
            {
                "text": "Identify the specific ICAD command that contains the templates for both \"Revision History\" and \"Safety Color\" notes used in KEMCO drawings.",
                "options": ["Text Entry", "Standard part library (or part library)", "Material Setting", "Additional Information"],
                "correct_answer": 1,
                "explanation": "The Standard Part Library serves as the repository for pre-formatted administrative and safety documentation templates."
            },
            {
                "text": "What is the designated color code number used to paint parts that are located in accident-prone areas?",
                "options": ["#1 (Red)", "#3 (Green)", "#4 (Yellow)", "#6 (Blue)"],
                "correct_answer": 2,
                "explanation": "Color #4 (Yellow) is the mandatory safety color for guarding and accident-prone machine components."
            },
            {
                "text": "Identify the specific software view state that must be active before a user can successfully insert a safety or revision template from the library.",
                "options": ["Local view", "Global view", "Tree view", "Message Pane"],
                "correct_answer": 1,
                "explanation": "Administrative templates must be inserted while the Global View is active to ensure they anchor correctly to the sheet template."
            },
            {
                "text": "According to the safety protocols, why is a \"Safety Color\" note specifically applied to certain machine areas?",
                "options": ["To indicate the part is a purchased item from a third-party maker.", "To signify that the area contains rotating or moving objects, making it accident-prone.", "To show that the part has been through a thermal refining process.", "To match the color of the hidden lines in the 2D projection."],
                "correct_answer": 1,
                "explanation": "Safety notes are critical warnings that highlight dangerous moving parts to assembly and maintenance personnel."
            },
            {
                "text": "Which of the following components should be painted with \"Machine Color\" and does NOT require a safety color note?",
                "options": ["Chain cover", "Universal joint cover", "Solenoid cover", "Motor cover"],
                "correct_answer": 2,
                "explanation": "Solenoid covers are non-moving electrical enclosures and typically retain standard machine coloring."
            },
            {
                "text": "Where is the designated position for the \"Safety Color\" note on the standard drawing template?",
                "options": ["Upper left portion", "Center of the global view", "Lower right portion", "Directly under the standard notes"],
                "correct_answer": 2,
                "explanation": "Safety Color notes are standardly positioned in the lower right portion of the drawing layout."
            },
            {
                "text": "When managing the Revision History, how is the \"Number of delta\" (the revision count) updated on the template?",
                "options": ["It is automatically calculated by the system based on 3D changes.", "It is manually entered using the text command.", "It is linked from the \"Additional Information\" window.", "It is imported from the original Excel BOM."],
                "correct_answer": 1,
                "explanation": "The delta count in the revision table is a manual text entry to ensure it accurately reflects the intended discrepancy history."
            },
            {
                "text": "Scenario: You are detailing a \"Gear Cover\" for a new machine. Based on the \"Safety Color\" lesson, what are the two specific technical requirements for this part's representation on the drawing?",
                "options": ["It must be painted blue and placed in the upper left.", "It must be painted yellow (#4) and a \"Safety Color\" note must be inserted.", "It must be painted machine color and no notes are required.", "It must be rendered as a phantom line with a \"High Precision\" tag."],
                "correct_answer": 1,
                "explanation": "Mechanical covers protecting moving parts (gears, chains) must follow the Yellow/#4 color and note protocol."
            },
            {
                "text": "Scenario: You are attempting to insert the \"Revision History\" template, but the library icon is greyed out or the template is placing incorrectly. Following the 6-step procedure, what is the very first check you should perform regarding your workspace state?",
                "options": ["Ensure the local view is activated.", "Check if the \"Global view\" is currently activated.", "Verify that the \"Specific Gravity\" is set to 7.85.", "Ensure the \"Scale\" on the tool bar is set to 1/1."],
                "correct_answer": 1,
                "explanation": "The library insertion tools for templates require the Global View frame to be active to function correctly."
            },
            {
                "text": "Scenario: You are updating a drawing to its third revision. You have successfully loaded the \"Revision History\" template. To maintain technical accuracy, how should you document the number of changes (deltas) on the template?",
                "options": ["Use the \"Create Delta\" command to place three symbols in the title block.", "Manually input the number of deltas using the text command based on the reference and instruction.", "Delete the history and re-insert the title block from Excel.", "Change the \"Job Order\" number to reflect the count."],
                "correct_answer": 1,
                "explanation": "Revision tallies must be manually updated via the text tool to synchronize with the physical delta symbols on the drawing."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-standard-library').first()
        if not quiz:
            print("Quiz '2d-standard-library' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-standard-library',
                title='ICAD Standard Part Library and Safety Protocols Assessment',
                description='Knowledge of the ICAD Standard Part Library, the application of safety indicators for accident-prone areas, and the administrative management of drawing revision histories.',
                course_type='2D_Drawing'
            )
            db.add(quiz)
            db.flush()
        else:
            quiz.title = 'ICAD Standard Part Library and Safety Protocols Assessment'
            quiz.description = 'Knowledge of the ICAD Standard Part Library, the application of safety indicators for accident-prone areas, and the administrative management of drawing revision histories.'

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
        print("Successfully synced '2d-standard-library' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_standard_library_quiz()
