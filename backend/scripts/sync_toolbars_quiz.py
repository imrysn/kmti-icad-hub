import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_toolbars_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "Which specific toolbar allows a user to define the attributes (such as line type or color) for entities that are about to be generated?",
                "options": ["2D View", "System Information", "Edit", "Screen Memory"],
                "correct_answer": 1,
                "explanation": "The System Information toolbar regulates the default properties (color, layer, line type) for new geometry."
            },
            {
                "text": "Identify the function that allows a user to save the state of the current display for later retrieval.",
                "options": ["Screen Operations", "Re-Display", "Screen Memory", "Switch Display"],
                "correct_answer": 2,
                "explanation": "Screen Memory is used to store and quickly recall specific display configurations or zoom states."
            },
            {
                "text": "Name the toolbar that contains the \"Zoom to Fit\" and \"Re-Display\" commands.",
                "options": ["Zoom Toolbar", "Screen Operations", "3D View", "Shading"],
                "correct_answer": 1,
                "explanation": "The Screen Operations toolbar handles global display updates like Zoom to Fit and Re-Display."
            },
            {
                "text": "A designer needs to toggle between different visualization styles, such as \"Wireframe\" and \"Hidden Lines Removed.\" Which toolbar should they access?",
                "options": ["2D Standard Screen", "Shading", "Switch Display", "System Information"],
                "correct_answer": 1,
                "explanation": "The Shading toolbar contains all rendering style toggles including wireframe and hidden line removal."
            },
            {
                "text": "What is the primary purpose of the \"Switch Display\" toolbar?",
                "options": ["To move between Top, Front, and Side views", "To manage file operations like saving and printing", "To adjust the projection method or switch between dimensions", "To undo or redo recent modeling edits"],
                "correct_answer": 2,
                "explanation": "Switch Display is dedicated to projection logic (First/Third angle) and dimension visibility toggles."
            },
            {
                "text": "Which toolbar would be used specifically to navigate through the sequence of previously viewed camera angles?",
                "options": ["2D View", "Screen Memory", "User Views", "3D View"],
                "correct_answer": 0,
                "explanation": "The 2D View toolbar (ironically named) handles the sequence of previous and next camera views."
            },
            {
                "text": "The \"Entry Control\" toolbar is unique because it specifically regulates:",
                "options": ["The isometric angles of the workspace", "The storage of displayed screens in memory slots", "The methods used for choosing entities and entering coordinates", "The visibility of work planes during sectioning"],
                "correct_answer": 2,
                "explanation": "Entry Control manages magnet tools, entity selection filters, and coordinate entry modes."
            },
            {
                "text": "Scenario: You are working on a complex assembly and need to view the internal components by cutting through the model. Which toolbar provides the \"Open Work Plane\" command required to initiate this view?",
                "options": ["3D View", "Section Display", "Shading", "Screen Operations"],
                "correct_answer": 1,
                "explanation": "Section Display tools allow for virtual slicing and managing work planes for internal viewing."
            },
            {
                "text": "Scenario: A user wants to set a specific custom perspective that isn't covered by the standard Top or Front views. They notice four dedicated buttons for \"Isometric Views.\" Which toolbar are they currently utilizing?",
                "options": ["3D View", "2D Standard Screen", "User Views", "Switch Display"],
                "correct_answer": 2,
                "explanation": "The User Views toolbar provides access to isometric presets and custom saved camera positions."
            },
            {
                "text": "Scenario: While modeling, you realize you have made a mistake in the last few steps. You need to revert the project to its previous state. According to the lesson, which toolbar contains the tools necessary for this specific corrective action?",
                "options": ["File", "Edit", "Screen Memory", "Entry Control"],
                "correct_answer": 1,
                "explanation": "The Edit toolbar houses the Undo and Redo commands essential for correcting modeling mistakes."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == 'toolbars').first()
        if not quiz:
            print("Quiz 'toolbars' not found in database. Creating it...")
            quiz = Quiz(
                slug='toolbars',
                title='Tool Bars Mastery',
                description='Advanced assessment of command grouping, icon symbology, and toolbar interaction.',
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
        print("Successfully synced 'toolbars' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_toolbars_quiz()
