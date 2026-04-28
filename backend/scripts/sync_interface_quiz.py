import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_interface_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "Identify the specific UI element where a user would look to confirm the filename of the project they are currently editing.",
                "options": ["Status bar", "Title bar", "Tool bar", "Menu bar"],
                "correct_answer": 1,
                "explanation": "The Title bar at the very top of the window displays the software name and the current project filename."
            },
            {
                "text": "When a user needs to input precise numerical coordinates for a specific operation, which interface area is dedicated to this task?",
                "options": ["Message Pane", "Item Entry", "Key Entry", "Workspace"],
                "correct_answer": 2,
                "explanation": "Key Entry is the specific field used for direct numerical coordinate input (X, Y, Z)."
            },
            {
                "text": "Name the navigation panel that provides a hierarchical display of 3D components and assemblies within the current drawing.",
                "options": ["Icon Menu", "Command Menu", "Tree view", "Status bar"],
                "correct_answer": 2,
                "explanation": "The Tree view (or Parts List) shows the structural hierarchy of the model and its history."
            },
            {
                "text": "A designer needs to access the \"Information\" or \"Set\" categories. Which part of the interface houses these specific drop-down menus?",
                "options": ["Tool Bar", "Command Menu", "Menu bar", "Icon Menu"],
                "correct_answer": 2,
                "explanation": "The Menu bar contains high-level text menus like File, Edit, Information, and Set."
            },
            {
                "text": "How does the ICAD interface visually distinguish critical error messages from standard operational feedback?",
                "options": ["Error messages appear in the Command Menu rather than the Message Pane", "Errors are highlighted in red text within the Message Pane", "The Title bar flashes when a coordinate error occurs in Key Entry", "Error messages are only displayed within the Item Entry field"],
                "correct_answer": 1,
                "explanation": "The Message Pane uses color coding (typically red) to signal errors or warnings to the user."
            },
            {
                "text": "Which interface component is described as being primarily optimized for 2D functional commands?",
                "options": ["Icon Menu", "Command Menu", "Workspace", "Tool Bar"],
                "correct_answer": 1,
                "explanation": "The Command Menu is a text-based hierarchy often optimized for 2D operations and legacy command access."
            },
            {
                "text": "What is the primary functional difference between the Icon Menu and the Tool Bar?",
                "options": ["The Icon Menu is for 2D, while the Tool Bar is for 3D", "The Tool Bar can be toggled between visible and hidden states, while the Icon Menu contains 3D modeling commands", "The Icon Menu handles coordinate entry, while the Tool Bar handles file management", "The Tool Bar for assembly operations, while the Icon Menu is for part naming"],
                "correct_answer": 1,
                "explanation": "Toolbars are customizable/toggleable strips of icons, whereas the Icon Menu is a fixed region containing core modeling tools."
            },
            {
                "text": "Scenario: A user is attempting to run a command that requires entering a specific text string and a set of parameters. They are currently looking at the 3D model in the Workspace. Which specific area should they navigate to for typing in these required characters to execute the command?",
                "options": ["Key Entry", "Item Entry", "Title Bar", "Status Bar"],
                "correct_answer": 1,
                "explanation": "The Item Entry (or Message Bar) is the primary location for entering command parameters and text-based values."
            },
            {
                "text": "Scenario: You are performing complex 3D Modeling and Assembly operations. According to the window structure, in which specific central region of the ICAD interface will these visual manipulations and modeling tasks take place?",
                "options": ["Workspace", "Command Menu", "Tree View", "Message Pane"],
                "correct_answer": 0,
                "explanation": "The Workspace is the large central 3D viewport where all modeling and visual manipulation occurs."
            },
            {
                "text": "Scenario: A trainee is looking for a specific modeling shortcut. They are told that the command is not currently visible on the \"Icon Menu.\" Based on the lesson, where is the most logical alternative location they should check to find additional modeling options?",
                "options": ["Status Bar", "Title Bar", "Command menu", "Message Pane"],
                "correct_answer": 2,
                "explanation": "The Command Menu provides a comprehensive tree-based alternative to the Icon Menu for finding any available system command."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == 'interface').first()
        if not quiz:
            print("Quiz 'interface' not found in database. Creating it...")
            quiz = Quiz(
                slug='interface',
                title='iCAD Interface Competency',
                description='Comprehensive assessment of window structure, command locations, and functional interface zones.',
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
        print("Successfully synced 'interface' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_interface_quiz()
