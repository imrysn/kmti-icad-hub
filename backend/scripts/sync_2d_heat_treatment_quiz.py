import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_heat_treatment_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data
        new_questions = [
            {
                "text": "Identify the heat treatment process that is specifically recommended for removing slugs and preparing parts for painting, often involving shotblasting.",
                "options": ["Through Hardening", "Induction Hardening", "Annealing (or Annealing shotblast)", "Vacuum Hardening"],
                "correct_answer": 2,
                "explanation": "Annealing shotblast is the standard process for stress relief and surface preparation for large welded or cast structures."
            },
            {
                "text": "Which heat treatment process is characterized by having no oxidation left after hardening, resulting in less deformation and potentially eliminating the need for additional processing?",
                "options": ["Salt-bath nitrocarburizing", "Vacuum Hardening", "Normalizing", "Ion nitriding"],
                "correct_answer": 1,
                "explanation": "Vacuum hardening protects the part from atmospheric oxidation, ensuring high precision and minimal deformation."
            },
            {
                "text": "According to the \"Isonite\" and \"Ionite\" standards, what is the minimum required thickness (hardening depth) for the chemical compound layer?",
                "options": ["Over 1μ", "Over 5μ", "Over 10μ (microns)", "Over 50μ"],
                "correct_answer": 2,
                "explanation": "A minimum of 10 microns is required to ensure the anti-friction and corrosion-resistant properties of the nitride layer."
            },
            {
                "text": "When utilizing Induction Hardening, what is the mandatory prerequisite process that must be performed first?",
                "options": ["Normalizing", "Thermal refining", "Vacuum hardening", "Salt-bath nitrocarburizing"],
                "correct_answer": 1,
                "explanation": "Thermal refining provides the structural foundation required for effective surface induction hardening."
            },
            {
                "text": "Why is Parsonite construction sometimes preferred over Ion nitriding, specifically according to the Rev6 revision notes?",
                "options": ["It achieves a much higher hardness of HV1000.", "The process is simpler and cheaper.", "It is done at a lower temperature (480°C), making it less likely to cause part warping.", "It does not require thermal refining at 650°C."],
                "correct_answer": 2,
                "explanation": "The lower process temperature of Parsonite (480°C vs higher alternatives) minimizes thermal deformation in precision parts."
            },
            {
                "text": "For S50C and S55C materials, what is the applicable hardness range when subjected to Through Hardening?",
                "options": ["35~40 HS", "55~60 HS", "60~70 HS", "80~83 HS"],
                "correct_answer": 2,
                "explanation": "JIS standards for S50C/S55C specify a hardness range of 60~70 HS for through-hardened components."
            },
            {
                "text": "Which process is specifically noted for its \"Fine Cosmetic Finish\" and is applied to Slide Guides and Rail Guides?",
                "options": ["Induction Hardening", "QPQ (Quench Polish Quench)", "Surface Grinding (G ▽▽)", "Normalizing"],
                "correct_answer": 2,
                "explanation": "Surface grinding (G ▽▽) provides the mirror-like cosmetic finish and geometric accuracy required for guides."
            },
            {
                "text": "Scenario: You are selecting a process for a Roller Shaft made of SCM440. The part requires high-class accuracy. According to the \"Induction Hardening\" recommendations, what must be done to achieve the required precision after the hardening process?",
                "options": ["Apply a manganese phosphate film.", "Perform additional processes such as polishing, grinding, or buffing.", "Immediately perform Ion nitriding to HV700.", "Increase the hardening depth to exactly 1.5mm."],
                "correct_answer": 1,
                "explanation": "Hardening causes slight deformation; high-accuracy parts must be finished (ground/polished) post-treatment."
            },
            {
                "text": "Scenario: A drawing requires a part to be treated with Ionite to a hardness of HV1000UP. Based on the \"Applicable Material\" table, which specific material should be used for this component?",
                "options": ["S45C", "SCM440", "SUS304 (or SACM645)", "SNC631"],
                "correct_answer": 2,
                "explanation": "Materials like SUS304 or SACM645 are optimized for extreme nitriding hardness levels exceeding HV1000."
            },
            {
                "text": "Scenario: You are designing a Gear made of S45C that requires anti-friction and anti-fatigue properties. You are considering Through Hardening. While the process is simple and cheap, what is the primary \"RECOMEND\" (recommendation) you must follow if high accuracy is needed for the gear teeth?",
                "options": ["Use Vacuum Hardening instead to avoid oxidation.", "Ensure the material is normalized at 600°C first.", "Plan for additional post-process machining like grinding or polishing to correct accuracy.", "Apply a QPQ finish for decoration."],
                "correct_answer": 2,
                "explanation": "Standard hardening processes introduce dimensional errors that must be corrected via precision machining for gear engagement."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-heat-treatment').first()
        if not quiz:
            print("Quiz '2d-heat-treatment' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-heat-treatment',
                title='ICAD Heat Treatment and Material Standards Assessment',
                description='Technical evaluation of heat treatment processes, material-specific hardness requirements, and Japanese (KEM Style) drawing indications.',
                course_type='2D_Drawing'
            )
            db.add(quiz)
            db.flush()
        else:
            quiz.title = 'ICAD Heat Treatment and Material Standards Assessment'
            quiz.description = 'Technical evaluation of heat treatment processes, material-specific hardness requirements, and Japanese (KEM Style) drawing indications.'

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
        print("Successfully synced '2d-heat-treatment' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_heat_treatment_quiz()
