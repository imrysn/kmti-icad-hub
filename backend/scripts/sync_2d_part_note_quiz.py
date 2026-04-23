import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_part_note_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data
        new_questions = [
            {
                "text": "Identify the specific interface window where a user manually types out technical strings to be placed on the drawing.",
                "options": ["Message Pane", "Text Entry window (文字列入力ウィンドウ)", "Tree view", "Item entry box"],
                "correct_answer": 1,
                "explanation": "The Text Entry window is the specialized interface for multi-line and single-line drafting annotations."
            },
            {
                "text": "Apart from processing instructions, what other primary piece of information is frequently indicated using notes to provide cross-referencing on a drawing?",
                "options": ["The designer's birthday", "Assembly names and drawing numbers", "The file size in MB", "The computer's IP address"],
                "correct_answer": 1,
                "explanation": "Notes are critical for linking a 2D part to its parent assembly and associated documentation."
            },
            {
                "text": "Name the specific menu category where the \"Text\" (文書入力) command is located within the 2D drafting icon menu.",
                "options": ["ファイル (File)", "編集 (Edit)", "製図 (Drafting)", "表示 (View)"],
                "correct_answer": 2,
                "explanation": "Annotation and text tools are categorized under the \"Drafting\" (製図) menu block in the ICAD interface."
            },
            {
                "text": "When adding an \"Additional Instruction\" note to a drawing, what is the standard visual practice for emphasizing the text, as shown in the lesson samples?",
                "options": ["The text is written in vertical orientation.", "The note is enclosed within a colored cloud or border.", "The text must be colored green (3).", "The note must be attached to the Title bar."],
                "correct_answer": 1,
                "explanation": "Clouding or bordering notes is the industrial standard for highlighting critical manual instructions."
            },
            {
                "text": "According to the sample drawing of a threaded part (M14×1), why is a specific note applied regarding the \"Isonite process\"?",
                "options": ["To indicate that the process must be applied twice.", "To specify that the process cannot be applied to the threaded portion.", "To change the thread pitch from 1.0 to 1.5.", "To confirm that the part has already been through heat treatment."],
                "correct_answer": 1,
                "explanation": "Certain surface treatments like Isonite must be excluded from threads to prevent dimensional interference."
            },
            {
                "text": "Which statement best describes the application of the \"note\" command based on the instructional content?",
                "options": ["Notes are only used for indicating hole quantities.", "Note application is strictly fixed and cannot be changed by the user.", "Note usage depends on the specific purpose and the required process to be applied.", "Notes must always be placed at the coordinates (0,0,0)."],
                "correct_answer": 2,
                "explanation": "Drafting notes are flexible tools used to communicate specific manufacturing and processing requirements."
            },
            {
                "text": "What is the final action required in the Text Entry window to prepare the text for placement on the 3D space?",
                "options": ["Pressing the \"Muhenkan + Q\" shortcut.", "Clicking the \"OK\" button.", "Selecting the \"Limited\" option in tool settings.", "Right-clicking the Message Pane."],
                "correct_answer": 1,
                "explanation": "The \"OK\" button commits the text buffer for physical placement on the drafting sheet."
            },
            {
                "text": "Scenario: You are detailing a part that requires its length to be increased by 20mm and a pin position to be changed. Based on the \"Additional Instruction\" sample, how should this be represented on the drawing?",
                "options": ["By using a \"Linear Dimension\" tool to overwrite the current measurement.", "By placing a text note enclosed in a border with the specific change instructions.", "By using the \"Autoballoon\" tool to point to the pin.", "By changing the part name in the Tree view."],
                "correct_answer": 1,
                "explanation": "Significant design modifications are explicitly called out using bordered instructional notes."
            },
            {
                "text": "Scenario: A designer is working on a complex assembly drawing and needs to provide a reference for a specific sub-assembly used in the layout. According to the lesson, what specific data should be included in the note for this reference?",
                "options": ["The material's specific gravity and weight.", "The assembly name and the assembly drawing number.", "The X, Y, and Z coordinates of the assembly origin.", "The list of all 3D parts included in that sub-assembly."],
                "correct_answer": 1,
                "explanation": "Clear cross-referencing requires both the human-readable assembly name and its unique drawing number."
            },
            {
                "text": "Scenario: You have opened the Text Entry window to add a note. You notice that the text orientation needs to be horizontal rather than vertical. Which specific button in the Text interface (as shown in the red highlighted options) should you select to control the alignment and flow?",
                "options": ["The \"OK\" button at the bottom.", "The orientation/alignment toggles located at the top of the text field.", "The \"3D PARTS\" icon on the main menu.", "The \"Message Pane\" error alert."],
                "correct_answer": 1,
                "explanation": "Text flow and orientation are controlled by the dedicated alignment toggles within the Text Entry UI."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-part-note').first()
        if not quiz:
            print("Quiz '2d-part-note' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-part-note',
                title='ICAD Technical Instruction and Drafting Assessment',
                description='Technical understanding of 2D drafting notes, additional instruction protocols, and the use of the Text Entry interface within ICAD.',
                course_type='2D_Drawing'
            )
            db.add(quiz)
            db.flush()
        else:
            quiz.title = 'ICAD Technical Instruction and Drafting Assessment'
            quiz.description = 'Technical understanding of 2D drafting notes, additional instruction protocols, and the use of the Text Entry interface within ICAD.'

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
        print("Successfully synced '2d-part-note' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_part_note_quiz()
