import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_surface_coating_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data
        new_questions = [
            {
                "text": "Identify the plating process that is explicitly recommended to be applied before the chromate process.",
                "options": ["Zinc Plating", "Nickel Plating", "Anodizing", "Black Oxide"],
                "correct_answer": 1,
                "explanation": "Nickel plating provides a superior base layer for subsequent chromate treatments to enhance durability."
            },
            {
                "text": "Name the specific physical property of Hard Chromate that allows for a low friction coefficient and the ability to coat only targeted areas of a part.",
                "options": ["High magnetic permeability", "Less friction coefficient (or target specific area)", "Extreme flexibility", "Porous texture for oil retention"],
                "correct_answer": 1,
                "explanation": "Hard Chromate is selected for its low friction and its suitability for selective surface application."
            },
            {
                "text": "According to the Special Notes guidelines, if a drawing requires two or more notes, what specific logic must be used to determine their arrangement order?",
                "options": ["Alphabetical order", "Numerical order by dimension", "The order of the process to be done first (process sequence)", "Order of importance to the designer"],
                "correct_answer": 2,
                "explanation": "Manufacturing notes must follow the chronological sequence of production steps."
            },
            {
                "text": "What is the mandatory minimum plating thickness (per side) for a part receiving a Hard Chromate treatment?",
                "options": ["0.1 mm", "0.03 mm", "0.2 mm", "0.5 mm"],
                "correct_answer": 1,
                "explanation": "Standard engineering specifications for Hard Chromate require a minimum of 0.03mm thickness per surface."
            },
            {
                "text": "Which plating type is categorized as a \"Low-cost process\" and is commonly used for electrical brackets?",
                "options": ["Chrome Plating", "Hard Chromate", "Nickel Plating", "Colored Plating (Dipping)"],
                "correct_answer": 3,
                "explanation": "Dipped colored plating is an economical solution for non-critical structural brackets in electrical assemblies."
            },
            {
                "text": "When using the Copy or Move commands, what is the primary functional difference between the two operations?",
                "options": ["Move requires a reference point P2, while Copy does not.", "Copy increases the quantity of the entity, while Move only alters its location.", "Move requires the \"GO\" command, while Copy executes instantly after P1.", "Copy is only applicable to text, while Move is for solids."],
                "correct_answer": 1,
                "explanation": "The Copy tool generates new geometry, whereas Move simply translates existing geometry without duplication."
            },
            {
                "text": "For Nickel Plating applied to a \"reader ring,\" what is the required technical specification for the fitting gap?",
                "options": ["0.03 mm", "0.1 ~ 0.2 mm", "Over 0.5 mm", "No gap is required"],
                "correct_answer": 1,
                "explanation": "A fitting gap of 0.1 ~ 0.2 mm is necessary to accommodate nickel plating thickness on precision reader rings."
            },
            {
                "text": "Scenario: You are detailing a shaft made of STKM18A. The design requires high resistance to corrosion and friction. You choose Hard Chromate. According to the \"RECOMMEND\" section, what specific documentation must you provide regarding the dimensions?",
                "options": ["Only the final dimension after the plating is finished.", "Dimensions before and after the plating process.", "The specific gravity of the STKM18A material.", "The total weight of the plating material used."],
                "correct_answer": 1,
                "explanation": "For thick plating like Hard Chromate, both pre-process and post-process dimensions are required for quality control."
            },
            {
                "text": "Scenario: You are working on a 2D drawing for a very large welded part. The welding details are too crowded to be placed near the joint. Based on the Special Notes lesson, how should you handle this information?",
                "options": ["Use the \"Autoballoon\" tool to force the details into the assembly.", "Move the welding details to the \"Special Notes\" section in the template.", "Delete the welding hatch to make room for text.", "Place the notes at the origin (0,0,0) of the 3D space."],
                "correct_answer": 1,
                "explanation": "The Special Notes section provides a centralized location for detailed instructions when on-joint annotation is impractical."
            },
            {
                "text": "Scenario: You need to relocate a line of text in your drawing. You select the Move command and click the text (P1) and then \"GO\". What are the final two steps required to successfully reposition the text to a specific new coordinate?",
                "options": ["Click P2 for the new location and P3 for reference.", "Click P2 for reference and P3 for the new location.", "Double-click the Icon Menu and select \"Properties.\"", "Type the new quantity in the Item Entry box and click OK."],
                "correct_answer": 1,
                "explanation": "Moving entities in ICAD requires defining a source reference point (P2) and a destination point (P3)."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-surface-coating').first()
        if not quiz:
            print("Quiz '2d-surface-coating' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-surface-coating',
                title='ICAD Surface Plating and Documentation Assessment',
                description='Technical knowledge of surface plating standards, management of special notes within drafting templates, and procedural logic for entity manipulation.',
                course_type='2D_Drawing'
            )
            db.add(quiz)
            db.flush()
        else:
            quiz.title = 'ICAD Surface Plating and Documentation Assessment'
            quiz.description = 'Technical knowledge of surface plating standards, management of special notes within drafting templates, and procedural logic for entity manipulation.'

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
        print("Successfully synced '2d-surface-coating' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_surface_coating_quiz()
