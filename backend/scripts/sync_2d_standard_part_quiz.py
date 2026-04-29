import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_standard_part_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "Identify the specific term used to describe the machining process often added to the shoulder of a shaft to provide cutting tool clearance and prevent damage.",
                "options": ["Shoulder Chamfer", "Relief process", "Fillet radius", "Undercutting"],
                "correct_answer": 1,
                "explanation": "The Relief process creates a specific clearance zone at shaft shoulders to ensure tool accessibility and prevent stress concentration."
            },
            {
                "text": "Name the surface finish symbol that must accompany the relief process detail on a shaft drawing, typically characterized by three triangles and a specific letter.",
                "options": ["M (Machined)", "C (Cast)", "G (Grinding process)", "P (Polished)"],
                "correct_answer": 2,
                "explanation": "Relief details on precision shafts require a Grinding process (G) finish to ensure surface integrity at the transition."
            },
            {
                "text": "According to the KEMCO standard for PCD (Pitch Center Diameter), what specific visual element must replace the \"PCD\" text on a 2D drawing to prevent fabrication misinterpretation?",
                "options": ["The word \"CENTER\"", "Diameter symbol (Ø)", "A red box", "No symbol is required"],
                "correct_answer": 1,
                "explanation": "The Diameter symbol (Ø) is the mandatory KEMCO indicator for PCD measurements to ensure international standards compliance."
            },
            {
                "text": "When dimensioning a Key Plate for a shaft, which specific part of the shaft geometry must be used as the reference point for the key groove dimension?",
                "options": ["The bottom tangent of the shaft", "The center line of the shaft", "The top portion of the shaft", "The relief process shoulder"],
                "correct_answer": 2,
                "explanation": "Groove depths for key plates are measured from the shaft's outer top surface to ensure the key fits correctly within the assembly."
            },
            {
                "text": "Under what circumstances is a machining tolerance of ±0.1 typically applied to a collar?",
                "options": ["When the collar is used as a mechanical stopper", "When both sides of the collar can be adjusted", "When the collar must be fitted with little to no movement", "When the collar is fitted on a shaft with an h7 tolerance"],
                "correct_answer": 1,
                "explanation": "Adjustable collars use a loose ±0.1 tolerance because their final position is calibrated during assembly."
            },
            {
                "text": "According to the JIS Z 8314 scale standards, which of the following is considered a standard \"Down Size (1)\" ratio?",
                "options": ["1:3", "1:10", "1:2.5", "1:250"],
                "correct_answer": 1,
                "explanation": "JIS Z 8314 defines 1:10 as a primary standard reduction scale for mechanical drawings."
            },
            {
                "text": "What is the mandatory technical requirement for the tolerance of a width groove on a shaft and key plate assembly?",
                "options": ["+0.1/0.0", "+0.3/+0.2", "±0.1", "h9"],
                "correct_answer": 1,
                "explanation": "Keyplate width grooves utilize a specific +0.3/+0.2 positive tolerance to ensure clearance for the key insertion."
            },
            {
                "text": "Scenario: You are working on an assembly drawing that requires a non-standard scale to fit all details onto the template. According to the KEMCO Scale standard, how should you prioritize the use of scales?",
                "options": ["Always use a non-standard scale first to save space", "Use standard scales for parts drawings and assembly drawings", "Standard scale must be used on parts drawings; non-standard scale is only a second option for assembly drawings", "Never use non-standard scales as they violate JIS Z 8314"],
                "correct_answer": 2,
                "explanation": "KEMCO mandates standard scales for manufacturing parts; non-standard scales are restricted to high-level assembly visuals."
            },
            {
                "text": "Scenario: You need to insert a standardized \"Relief process detail\" template into your current drawing. Following the 4-step loading procedure, which specific menu path leads to the \"STANDARD PART\" selection?",
                "options": ["SUBDRAWING/LIBRARY > LOAD PART", "PROJECTION PROPERTIES > HIDDEN LINE", "FILE > NEW > TEMPLATE", "TREE VIEW > PROPERTIES > COMMENT"],
                "correct_answer": 0,
                "explanation": "Standard details and relief templates are housed within the SUBDRAWING/LIBRARY interface."
            },
            {
                "text": "Scenario: You are detailing an Oil Groove for a circular portion of a machine part. You notice the drawing calls for a Radius 2 finish. According to the \"New Revised\" notes, what is the correct implementation for this specific scenario?",
                "options": ["Apply the Radius 2 as requested because circular portions are easier to machine", "Use a Radius 4 instead to match the flat surface standard", "Ensure the surface has a smooth finish (R 滑らかに仕上) because Radius 2 cannot be achieved on actual circular portions", "Increase the depth of the grease line to 2.0mm to compensate for the circularity"],
                "correct_answer": 2,
                "explanation": "Geometric limitations in machining circular oil grooves require a \"Smooth Finish\" notation rather than a fixed numerical radius."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-standard-part').first()
        if not quiz:
            print("Quiz '2d-standard-part' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-standard-part',
                title='iCAD Technical Standards and Detailing Assessment',
                description='Understanding symbolic representation and placement of industrial hardware.',
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
        print("Successfully synced '2d-standard-part' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_standard_part_quiz()
