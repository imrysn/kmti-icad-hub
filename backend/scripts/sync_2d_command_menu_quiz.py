import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_command_menu_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "Identify the specific visual indicator that signifies an entity or line property is currently selectable within the system.",
                "options": ["Blinking red", "Highlighted in blue", "Shows a green checkmark", "Turns transparent"],
                "correct_answer": 1,
                "explanation": "In the iCAD detailing environment, a blue highlight confirms that a geometric entity is ready for selection or modification."
            },
            {
                "text": "In a Detail View, where exactly is the local view origin located by default?",
                "options": ["At the bottom-left of the sheet", "On the center of the ellipse used for the detail view", "At the geometric center of the part", "On the title block corner"],
                "correct_answer": 1,
                "explanation": "Detail views derive their local coordinate system from the center point of the capture boundary (usually an ellipse)."
            },
            {
                "text": "Which specific command is used to pick out parts, groups, and arranged drawings automatically to generate identification bubbles?",
                "options": ["Autoballoon", "Smart Bubble", "Group Labeler", "BOM Link"],
                "correct_answer": 0,
                "explanation": "Autoballoon streamlines the assembly documentation process by generating item callouts based on the assembly tree."
            },
            {
                "text": "During the 2D detailing process, what is the recommended practice regarding the interface menus?",
                "options": ["The Icon Menu is more efficient than the Command Menu", "The Command Menu is more effective to use than the Icon Menu", "Both menus should be disabled to prevent overlapping line selection", "Only the Tool Bar should be used for choosing drafting commands"],
                "correct_answer": 1,
                "explanation": "The Command Menu provides more granular control and a clearer hierarchy for technical drafting operations."
            },
            {
                "text": "What occurs if a user attempts to perform a command on an \"unactivated\" view?",
                "options": ["The command is applied to the global drawing instead", "A red CGS solid will appear in the Message Pane", "No lines can be selected, and the command will not be executed", "The system will automatically activate the nearest next view"],
                "correct_answer": 2,
                "explanation": "Commands are view-specific; if a view is not \"Active\" (surrounded by a dashed frame), geometric selection is disabled."
            },
            {
                "text": "How is a Section View's local view typically positioned within the drawing?",
                "options": ["It is always attached to the part's geometric center", "It is located at the coordinates (0,0,0) of the template", "It is aligned with the section line", "It can be moved manually by right-clicking the red origin"],
                "correct_answer": 2,
                "explanation": "Sectional views are projectively linked and aligned to the path of the section cut line."
            },
            {
                "text": "Why might a designer choose to remove a chamfer line from a 2D orthographic view?",
                "options": ["To change the material's specific gravity", "Because the line is too close to the object line and may cause selection errors or printing issues", "To automatically convert the view into a high-precision assembly", "To enable the \"Autoballoon\" feature for that specific part"],
                "correct_answer": 1,
                "explanation": "Removing extremely close parallel lines (like small chamfers) improves drawing clarity and prevents \"bleeding\" during printing."
            },
            {
                "text": "Scenario: You are working on a 2D drawing and want to ensure that your selection tool ignores all line weights and colors while searching. Which icon in the line properties settings should you click to achieve this?",
                "options": ["The blue icon (Select All)", "The grey icon (Unselect All)", "The \"Next View\" icon on the tool bar", "The \"SmartDraw\" icon in the command menu"],
                "correct_answer": 1,
                "explanation": "Unselecting all property filters allows for universal selection regardless of the entity's visual attributes."
            },
            {
                "text": "Scenario: A trainee needs to add a specific hatching pattern to a cross-section. Looking at the 製図 (Drafting) section of the command menu, which command must they select to fill a specified area with a pattern?",
                "options": ["Texture", "Symbols", "Hatch", "Dimensioning"],
                "correct_answer": 2,
                "explanation": "The \"Hatch\" command is the standard tool for applying material patterns to closed 2D boundaries."
            },
            {
                "text": "Scenario: You have multiple views on a sheet. You need to move from the current active view to the one immediately following it in the system sequence. Which tool bar function allows you to do this without manually clicking a line in the new view?",
                "options": ["Switch View", "Previous View", "Next View", "2D Standard Screen"],
                "correct_answer": 2,
                "explanation": "The \"Next View\" button cycles through view activations sequentially, facilitating rapid sheet navigation."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-command-menu').first()
        if not quiz:
            print("Quiz '2d-command-menu' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-command-menu',
                title='iCAD 2D Detailing and Command Management Assessment',
                description='Understanding the 2D drafting interface and core geometric toolsets.',
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
        print("Successfully synced '2d-command-menu' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_command_menu_quiz()
