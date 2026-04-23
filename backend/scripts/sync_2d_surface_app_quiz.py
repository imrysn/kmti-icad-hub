import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_surface_app_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data
        new_questions = [
            {
                "text": "Identify the specific manufacturing requirement that must be fulfilled before any surface treatment or coating can be applied to a part.",
                "options": ["Polishing", "Removal of the black skin", "Painting", "Heat treatment"],
                "correct_answer": 1,
                "explanation": "The \"black skin\" (mill scale) must be removed to ensure proper adhesion of coatings and treatments."
            },
            {
                "text": "Name the process that uses high-pressure abrasive material to alter surface texture, remove contaminants, or shape a surface.",
                "options": ["Shotblasting", "Isonite", "Machining", "Electroplating"],
                "correct_answer": 0,
                "explanation": "Shotblasting is the standard mechanical process for aggressive surface cleaning and texture modification."
            },
            {
                "text": "What category of material is specifically mentioned as having no \"black skin\" present in its raw state, thus requiring no specialized skin removal process?",
                "options": ["Cast Iron", "SS400", "Polished material", "Welded assembly"],
                "correct_answer": 2,
                "explanation": "Polished materials are pre-processed and arrive without the oxidation layer known as black skin."
            },
            {
                "text": "Which of the following is a primary reason for applying shotblasting specifically *after* a welding process?",
                "options": ["To increase the thickness of the part.", "To remove internal stress caused by the heat of welding.", "To convert the material into a polished state.", "To change the drawing number to a \"Mirror Part.\""],
                "correct_answer": 1,
                "explanation": "Shotblasting helps relieve localized thermal stresses introduced during the welding operation."
            },
            {
                "text": "According to the lesson, when is \"Machining\" used as an alternative to shotblasting for black skin removal?",
                "options": ["When the part is intended for a cam clutch mounting where all sides must be precise.", "When the part is made of rubber or urethane.", "When the part already has a surface coating of Isonite.", "Only when the material is SS400-D."],
                "correct_answer": 0,
                "explanation": "Precision components like cam clutch mounts require the dimensional accuracy of machining rather than the rough finish of shotblasting."
            },
            {
                "text": "What is a specific risk mentioned regarding the removal of black skin from a part?",
                "options": ["The part will become too smooth to paint.", "The part may become susceptible to corrosion after removal.", "The specific gravity of the material will increase.", "The machining tolerance will automatically change to ± 0.5."],
                "correct_answer": 1,
                "explanation": "Removing the protective mill scale (black skin) exposes raw steel to immediate oxidation/corrosion if not treated."
            },
            {
                "text": "In the provided technical drawings, what is the Japanese phrase used to indicate the application of \"Shotblasting (Black skin Removal)\"?",
                "options": ["エアー抜き", "ショットブラスト施工（黒皮除去）", "勝手違い", "要素"],
                "correct_answer": 1,
                "explanation": "ショットブラスト施工（黒皮除去） is the standard technical notation for shotblasting in Japanese drafting."
            },
            {
                "text": "Scenario: You are designing an adjusting bracket that will be subjected to significant friction and heat. To increase the material's resistance to corrosion and fatigue in this environment, which process should you specify on the drawing?",
                "options": ["Machining only", "Isonite treatment without preparation", "Shotblasting", "Manual cleaning with a wire brush"],
                "correct_answer": 2,
                "explanation": "Shotblasting provides the necessary surface preparation to improve fatigue resistance and prep for further treatments."
            },
            {
                "text": "Scenario: A part serves as a mounting bracket for a cam clutch and rotates with the aid of a bearing. Because precision is required and corrosion is not a major factor for the rotated part, what is the most appropriate surface preparation strategy?",
                "options": ["Apply shotblasting to the entire assembly.", "Use a polished material only.", "Machine all sides to remove the black skin instead of shotblasting.", "Leave the black skin intact to prevent fatigue."],
                "correct_answer": 2,
                "explanation": "Total machining (removing black skin from all sides) ensures the precision required for bearing-supported rotation."
            },
            {
                "text": "Scenario: You are preparing a part for an \"Isonite\" or \"Parsonite\" surface treatment. According to the classification of shotblasting purposes, which specific sub-type of shotblasting must be performed first?",
                "options": ["Shotblasting for Stress Removal", "Shotblasting for Mechanical Cleaning", "Shotblasting for Black skin Removal", "Shotblasting for Painting Prep"],
                "correct_answer": 2,
                "explanation": "Isonite treatment requires a clean, \"skin-free\" surface to chemically interact with the steel correctly."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-surface-app').first()
        if not quiz:
            print("Quiz '2d-surface-app' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-surface-app',
                title='ICAD Surface Preparation and Material Processing Assessment',
                description='Technical requirements for removing "black skin" and applications of shotblasting and machining.',
                course_type='2D_Drawing'
            )
            db.add(quiz)
            db.flush()
        else:
            quiz.title = 'ICAD Surface Preparation and Material Processing Assessment'
            quiz.description = 'Technical requirements for removing "black skin" and applications of shotblasting and machining.'

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
        print("Successfully synced '2d-surface-app' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_surface_app_quiz()
