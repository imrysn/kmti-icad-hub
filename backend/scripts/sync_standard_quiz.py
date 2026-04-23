import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_standard_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "Identify the designated color used for the text and linear graduations of a Scale when viewed in the 3D modeling environment.",
                "options": ["White", "Red", "Black", "Yellow"],
                "correct_answer": 2,
                "explanation": "For visual clarity in the 3D environment, scale markings and text are standardized as Black."
            },
            {
                "text": "What is the standard depth of manufacturing for an Oil Groove designed to distribute lubricating oil on a machine part surface?",
                "options": ["0.5mm", "1.0mm", "1.5mm", "3.0mm"],
                "correct_answer": 2,
                "explanation": "Lubrication oil grooves are machined to a standard depth of 1.5mm per engineering specifications."
            },
            {
                "text": "Name the specific note that must be added to a 2D detailing drawing when square pipes are utilized to prevent deformation from heat and gas during welding.",
                "options": ["Oil Hole", "Air discharge (エアー抜き)", "Drainage", "Safety Note"],
                "correct_answer": 1,
                "explanation": "Welded square pipes require an \"Air discharge\" (エアー抜き) note to ensure pressure release during the welding process."
            },
            {
                "text": "When representing a Sprocket in a 3D model, what is the correct procedural approach for applying the safety color?",
                "options": ["The entire sprocket entity should be colored yellow", "Only the teeth of the sprocket should be colored yellow", "Only the selected flat surfaces should be yellow, leaving the teeth unpainted", "The sprocket should remain machine color (white) in all instances"],
                "correct_answer": 2,
                "explanation": "Safety color (Yellow) is applied only to the flat faces of sprockets, not to the teeth themselves."
            },
            {
                "text": "According to the Bolt Length calculation standard, if the result of your calculation does not match a standard bolt length, what action should be taken?",
                "options": ["Select the next smaller standard size to ensure a tight fit", "Use the exact calculated decimal value for the part order", "Round up to the nearest standard bolt length", "Multiply the final result by an additional factor of 2"],
                "correct_answer": 2,
                "explanation": "To ensure sufficient thread engagement, bolt lengths must always be rounded up to the next available standard size."
            },
            {
                "text": "How are SGP (White) pipes distinguished from SGP (Black) pipes in a 3D model based on their application?",
                "options": ["SGP (White) for outfitting are red; SGP (Black) for handrails are yellow", "SGP (White) for handrails are black; SGP (Black) for fluids are white", "SGP (White) are always skin color #15; SGP (Black) are always red #3", "There is no visual distinction between them in the 3D environment"],
                "correct_answer": 0,
                "explanation": "Visual standards use Red for White SGP outfitting pipes and Yellow for Black SGP handrail pipes."
            },
            {
                "text": "Which hardware component should be used in a Pillow Block setup specifically when the hole is slotted?",
                "options": ["Spring Washer (SW) only", "Hexagonal Bolt (HB) and Spring Washer (SW)", "Hexagonal Bolt (HB), Spring Washer (SW), and Hardened Flat Washer", "Hex Sockethead Cap Screw (CS) and Hex Nut (HN1)"],
                "correct_answer": 2,
                "explanation": "Slotted holes require a hardened flat washer in addition to the bolt and spring washer to provide a stable bearing surface."
            },
            {
                "text": "Scenario: You are designing a connection for a C-Channel. The design requires a slotted hole for future adjustments. According to the hardware standard for connections, which specific combination of components must you implement to ensure a secure fastening?",
                "options": ["Hexagonal Bolt, Spring Washer, and Hex Nut", "Hexagonal Bolt, Taper Washer (AW5), Flat Washer (FWH), Spring Washer, and Hex Nut", "Hex Sockethead Cap Screw and Spring Washer", "Hexagonal Bolt and Taper Washer (AW5) only"],
                "correct_answer": 1,
                "explanation": "C-Channel connections with slots require a comprehensive hardware stack including taper and flat washers for proper seating."
            },
            {
                "text": "Scenario: You are calculating the bolt length for an M8 bolt that must fasten through a material thickness of 9mm with a washer thickness of 2mm. Using the standard formula Bolt Length=(Bolt size×1.5)+(∑of thickness), what is the calculated length?",
                "options": ["11mm", "21mm", "23mm", "25mm"],
                "correct_answer": 2,
                "explanation": "Calculation: (8 * 1.5) + 9 + 2 = 12 + 11 = 23mm."
            },
            {
                "text": "Scenario: A designer is placing a Keyway on a sprocket that is a \"Purchase Part with Additional Process.\" According to the standard diagrams, where should the keyway be positioned relative to the sprocket's geometry?",
                "options": ["At the \"Valley\" of the sprocket teeth", "At any random location on the inner diameter", "Aligned with the center of a tooth", "Opposite the safety color note"],
                "correct_answer": 2,
                "explanation": "For mechanical alignment, keyways must be positioned at the center of a sprocket tooth."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == 'standard').first()
        if not quiz:
            print("Quiz 'standard' not found in database. Creating it...")
            quiz = Quiz(
                slug='standard',
                title='iCAD Standard Library & JIS Compliance',
                description='Mastering the usage of standardized industrial hardware and components.',
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
        print("Successfully synced 'standard' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_standard_quiz()
