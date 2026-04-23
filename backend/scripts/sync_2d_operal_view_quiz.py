import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_operal_view_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data
        new_questions = [
            {
                "text": "Identify the specific graphical indicator (line) that appears when moving a projected view to ensure it remains perfectly leveled with its parent view.",
                "options": ["Center line", "Snap line", "Cutting line", "Grid line"],
                "correct_answer": 1,
                "explanation": "The snap line acts as a dynamic guide to maintain orthographic alignment between projected views during relocation."
            },
            {
                "text": "Name the specific location on the drawing template where an Isometric view should ideally be positioned, according to the standard layout notes.",
                "options": ["Lower left corner", "Upper left portion", "Upper right portion", "Bottom right corner"],
                "correct_answer": 2,
                "explanation": "Standard KEMCO/JIS practices place the reference Isometric view in the upper right quadrant of the drawing sheet."
            },
            {
                "text": "Identify the specific status of a projected view that, when moved, causes all other associated standard views to move simultaneously.",
                "options": ["Locked", "Aligned (or highlighted)", "Frozen", "Hidden"],
                "correct_answer": 1,
                "explanation": "When views are highlighted in their aligned state, the system moves the entire projection set together to preserve geometric relationships."
            },
            {
                "text": "What is the technical consequence of executing the \"Delete View\" command on a local view?",
                "options": ["The view is hidden but can be restored using the Tree View.", "Only the dimensions are removed, leaving the geometry intact.", "The local view and all details contained within it are removed and cannot be restored.", "The system automatically replaces it with a 3D isometric view."],
                "correct_answer": 2,
                "explanation": "Delete View is a permanent operation that erases the projection and all its associated annotations from the 2D workspace."
            },
            {
                "text": "When attempting to adjust the location of a view, what occurs if the \"Create three-view\" icon is selected and the Front view is highlighted?",
                "options": ["A new set of views will be generated automatically.", "It indicates that the views are currently aligned with each other.", "An error message will appear in the Message Pane.", "The scale of the view will be reset to 1/1."],
                "correct_answer": 1,
                "explanation": "Selecting the projection tool while a view is active serves as a diagnostic to confirm alignment between orthographic planes."
            },
            {
                "text": "Why is the normal \"delete\" command insufficient for removing a projection from a drawing?",
                "options": ["It only deletes the 3D part name from the tree.", "Unnecessary views cannot be eliminated using the normal delete command; the specific \"Delete View\" icon must be used.", "The normal delete command only works for 2D character strings.", "It would cause a DRAM initialization failure in the workstation."],
                "correct_answer": 1,
                "explanation": "Projections are complex grouped entities that require the specialized Delete View tool to safely remove them from the drawing database."
            },
            {
                "text": "What is the correct sequence of mouse actions to move an Isometric view to a new location?",
                "options": ["Select Delete View > Click P1 > Click OK.", "Click P1 to select the view > Click P2 on the desired location.", "Right-click the Tree View > Select Properties > Enter coordinates.", "Double-click the Icon Menu > Select \"High Precision\" > Click Go."],
                "correct_answer": 1,
                "explanation": "The Move View workflow involves a primary click to select the view frame (P1) and a secondary click to define the target destination (P2)."
            },
            {
                "text": "Scenario: You are trying to move a side view to the far left of the template. As you drag the view, a dashed line connects it back to the Front view. Based on the \"Orthographic view\" lesson, how do you complete the move while ensuring the views are technically correct?",
                "options": ["Ignore the line and click P2 anywhere to save space.", "Move until the snap line is created, then click P2 to ensure the viewing is aligned.", "Release the mouse button immediately to cancel the command.", "Delete the Front view so the snap line disappears."],
                "correct_answer": 1,
                "explanation": "Maintaining orthographic alignment is critical; the move should only be finalized when the system snaps the view back into its correct horizontal or vertical projection path."
            },
            {
                "text": "Scenario: A trainee has accidentally projected a Bottom View that is not needed for the final fabrication drawing. They have selected the \"Delete View\" command and clicked on the unnecessary view. A dialog box appears. What must the trainee do to ensure the view is gone, and what is the risk?",
                "options": ["Click CANCEL; the risk is losing the BOM data.", "Click OK; the risk is that the command cannot be undone once executed.", "Click GO; the risk is changing the scale of the Isometric view.", "Click the Tree View; the risk is creating a duplicate part."],
                "correct_answer": 1,
                "explanation": "Confirming the deletion (OK) permanently removes the projection data, a destructive action that cannot be reversed by the Undo command."
            },
            {
                "text": "Scenario: You are reviewing a drawing where the views are not aligned, making it difficult to read the dimensions across the sheet. Aside from the \"Move View\" command, what is the \"other way\" mentioned in the lesson to check or adjust the location to ensure orthographic views are aligned to each other?",
                "options": ["Use the \"Create three-view\" icon.", "Use the \"Edit Attribute\" tool.", "Use the \"Lighten B-rep\" tool.", "Use the \"Material Information Setting\" window."],
                "correct_answer": 0,
                "explanation": "The \"Create three-view\" icon can be used as an alignment checker to verify that all projections are correctly mapped to the Front view."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-operal-view').first()
        if not quiz:
            print("Quiz '2d-operal-view' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-operal-view',
                title='ICAD View Management and Deletion Assessment',
                description='Technical proficiency in manipulating 2D local views, maintaining projection alignment, and executing permanent deletion protocols within the ICAD drafting environment.',
                course_type='2D_Drawing'
            )
            db.add(quiz)
            db.flush()
        else:
            quiz.title = 'ICAD View Management and Deletion Assessment'
            quiz.description = 'Technical proficiency in manipulating 2D local views, maintaining projection alignment, and executing permanent deletion protocols within the ICAD drafting environment.'

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
        print("Successfully synced '2d-operal-view' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_operal_view_quiz()
