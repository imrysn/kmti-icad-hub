import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_revision_code_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data
        new_questions = [
            {
                "text": "Identify the specific geometric symbol used in 2D detailing to indicate that a particular dimension or feature has undergone a change.",
                "options": ["Circle", "Delta (Triangle)", "Square", "Hexagon"],
                "correct_answer": 1,
                "explanation": "The Delta symbol is the universal indicator for revisions, marking exactly where a drawing change has occurred."
            },
            {
                "text": "In which specific interface component must the revision character be entered while executing the \"Create Delta\" command?",
                "options": ["Message Pane", "Item entry box", "Tree View", "Title Block"],
                "correct_answer": 1,
                "explanation": "The Item Entry box is used to input the alphanumeric character (e.g., A, B, 1) that will appear inside the Delta symbol."
            },
            {
                "text": "Name the specific software application used to manually input the final revision code during the title block insertion process.",
                "options": ["Word", "Excel", "PowerPoint", "Notepad"],
                "correct_answer": 1,
                "explanation": "KEMCO-style title block management uses Excel as the data-entry bridge for administrative metadata like revision codes."
            },
            {
                "text": "Under what specific condition does a \"Revision\" officially occur in the engineering workflow?",
                "options": ["When the designer decided to change the material from S45C to SS400.", "When the finished drawing is already approved, but a discrepancy notice is issued during fabrication.", "When the 3D model is mirrored for the first time.", "When the specific gravity of the part exceeds 7850 kg/m³."],
                "correct_answer": 1,
                "explanation": "A formal revision is triggered only after a drawing has been officially released and requires post-approval modifications."
            },
            {
                "text": "What is a mandatory requirement for the local view when placing a revised detail symbol (Delta)?",
                "options": ["It must be moved to the upper right portion of the template.", "The local view where the delta belongs must be activated.", "The view must be converted to a \"High Precision\" projection.", "It must be hidden to prevent overlap with the revision history."],
                "correct_answer": 1,
                "explanation": "Deltas must be anchored to a specific active view frame to maintain their correct geometric relationship to the part."
            },
            {
                "text": "Where is the \"Revision History\" located on the standard ICAD drawing template?",
                "options": ["Lower left side near the origin.", "Upper left corner under the standard notes.", "Directly above the main drawing title and assembly name in the title block area.", "In the \"Safety Color\" section only."],
                "correct_answer": 2,
                "explanation": "The Revision History table is standardly positioned directly above the Title Block for easy reference to the drawing's evolution."
            },
            {
                "text": "What is the technical purpose of the \"Revision Code\" (e.g., 'A' or 'B') found at the end of a drawing number?",
                "options": ["It indicates the specific gravity of the material.", "It signifies the current version or iteration of the approved drawing.", "It identifies whether the part is a \"Purchased\" or \"Fabricated\" item.", "It links the drawing to the \"Muhenkan\" shortcut menu."],
                "correct_answer": 1,
                "explanation": "The revision suffix identifies the specific iteration of the document, ensuring everyone uses the most current design."
            },
            {
                "text": "Scenario: You are updating a drawing from Revision '-' to Revision 'A'. You have successfully placed the Delta symbol near the modified hole. Where else must this change be documented to ensure the fabrication team can track the timeline of the update?",
                "options": ["In the \"Additional Information\" setting only.", "In the Revision History row, including the date and discrepancy notice number.", "On the first line of the Standard Notes.", "In the specific gravity column of the BOM."],
                "correct_answer": 1,
                "explanation": "A complete revision record requires both the geometric pointer (Delta) and an entry in the Revision History table."
            },
            {
                "text": "Scenario: A designer is attempting to place a Delta symbol on a Side View, but the symbol keeps appearing in the Front View instead. Based on the \"Revised detail\" instructions, what technical step did the designer likely skip?",
                "options": ["They didn't enter the character in the item entry box.", "They failed to activate the specific local view (Side View) before placing the delta.", "They used the \"Edit Attribute\" command instead of \"Create Delta.\"", "They did not change the color of the symbol to \"Safety Color.\""],
                "correct_answer": 1,
                "explanation": "Symbols like Deltas inherit the coordinate space of the active view; failing to switch views causes them to anchor to the wrong frame."
            },
            {
                "text": "Scenario: You are inserting a new Title Block via the Excel interface for a part that has undergone its first major revision. How should you ensure the \"Revision code\" on the bottom right of the template reflects this?",
                "options": ["Type the code directly onto the 2D template using \"Text Entry.\"", "Manually input the revision letter in the designated cell in Excel during the title block insertion process.", "The system will automatically detect the Delta symbol and update the code.", "Change the \"Job Order\" number to include the revision letter."],
                "correct_answer": 1,
                "explanation": "Revision codes in the Title Block are manually updated via the Excel data bridge to ensure they match the Revision History table."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-revision-code').first()
        if not quiz:
            print("Quiz '2d-revision-code' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-revision-code',
                title='ICAD Revision Control and Documentation Assessment',
                description='Technical knowledge of engineering change protocols, the application of revision symbols, and the management of drawing history within the ICAD environment.',
                course_type='2D_Drawing'
            )
            db.add(quiz)
            db.flush()
        else:
            quiz.title = 'ICAD Revision Control and Documentation Assessment'
            quiz.description = 'Technical knowledge of engineering change protocols, the application of revision symbols, and the management of drawing history within the ICAD environment.'

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
        print("Successfully synced '2d-revision-code' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_revision_code_quiz()
