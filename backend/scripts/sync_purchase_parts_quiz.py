import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_purchase_parts_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "Identify the specific person responsible for filing manufacturer catalogs and controlling the final data uploaded to the server.",
                "options": ["Junior Designer", "Person-in-charge", "Sales Representative", "Warehouse Manager"],
                "correct_answer": 1,
                "explanation": "The Person-in-charge manages the library integrity and catalog filing on the company server."
            },
            {
                "text": "Name the three specific criteria required to conduct an effective search for a purchase part on the internet or in a catalog.",
                "options": ["Price, Color, and Weight", "Manufacturer’s Name, Model No., and Specifications", "File Size, Created Date, and Author", "Layer Number, Material, and Drawing Name"],
                "correct_answer": 1,
                "explanation": "Effective sourcing requires the Manufacturer name, the specific Model ID, and technical specifications."
            },
            {
                "text": "According to the sample organizational chart, which specific manufacturer is associated with \"Cylinders & Actuators\"?",
                "options": ["KHK", "SUMITOMO", "TAIYO", "SUNTES"],
                "correct_answer": 2,
                "explanation": "TAIYO is the primary manufacturer for cylinder and actuator data in the sample hierarchy."
            },
            {
                "text": "If a purchased part is already available on the company Server, what is the first action a designer should take?",
                "options": ["Perform a new internet search", "Copy the existing data", "Re-model the part in ICAD", "Contact the manufacturer for a PDF"],
                "correct_answer": 1,
                "explanation": "Reusing existing verified server data is the most efficient workflow to ensure consistency."
            },
            {
                "text": "When sourcing data from the internet, which file formats are categorized strictly as 2D Data?",
                "options": ["PARASOLID and SOLIDWORKS", "DXF and PDF", "ICAD and PARASOLID", "JPG and PNG"],
                "correct_answer": 1,
                "explanation": "DXF and PDF are standard formats for 2D technical drawings and specifications."
            },
            {
                "text": "Under what specific condition must a designer \"Make 3D Modeling\" even if 3D Data (such as Parasolid) was already found?",
                "options": ["If the manufacturer is SUMITOMO", "If the data needs to be modified", "If the file is stored in the manufacturer's catalog", "If the server is currently offline"],
                "correct_answer": 1,
                "explanation": "Even if 3D data exists, manual modeling is required if modifications are necessary to meet project needs."
            },
            {
                "text": "In the server's organizational hierarchy, \"Machine Elements\" includes which of the following groups of parts?",
                "options": ["Motors, Hyponic, and Reducers", "Elbow, Nipple, and Plug", "Bolts, Nuts, Washers, Set Screws, and Handles", "Spiral, Miter, Bevel, and Worm"],
                "correct_answer": 2,
                "explanation": "Machine elements comprise standard hardware like bolts, nuts, washers, and handles."
            },
            {
                "text": "Scenario: You are searching for a specific \"Gear Motor\" from the manufacturer \"SUMITOMO.\" According to the sample flow chart, in which sub-folder should this part be uploaded once the ICAD data is ready?",
                "options": ["Server > Purchased Parts > Motors > Sumitomo > Gear Motor", "Server > Purchased Parts > Gears > KHK", "Server > Purchased Parts > Couplings > Seisa", "Server > Machine Elements > Sumitomo"],
                "correct_answer": 0,
                "explanation": "Parts must be filed under the correct functional category and manufacturer sub-folder (Motors > Sumitomo)."
            },
            {
                "text": "Scenario: A designer finds a 3D model of a \"Suntes\" Disc Brake on the internet in Parasolid format. The model matches the specifications perfectly and requires no changes. Following the \"Purchase Part 3D Modeling\" flow chart, what is the next step?",
                "options": ["Convert it to a DXF file", "Proceed directly to saving it as Solidworks, ICAD, or Parasolid data for the server", "Delete the data and start \"Make 3D Modeling\" from scratch", "File it in the manufacturer's catalog"],
                "correct_answer": 1,
                "explanation": "If high-fidelity 3D data is found and matches perfectly, it can be saved directly to the server formats."
            },
            {
                "text": "Scenario: You are looking for a \"Hydraulic Actuator\" from \"TAIYO.\" You check the server and it is not there. You then check the manufacturer's catalog and find only a PDF drawing. According to the workflow, what must you do to obtain the final ICAD data for the server?",
                "options": ["Upload the PDF directly to the server", "Use the 2D data from the PDF to \"Make 3D Modeling.\"", "Skip the part and search for a \"Pneumatic\" version instead", "Ask the Person-in-charge to copy it from the internet."],
                "correct_answer": 1,
                "explanation": "If 3D data is unavailable, the designer must create the 3D model based on the 2D dimensions provided in the PDF."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == 'purchase-parts').first()
        if not quiz:
            print("Quiz 'purchase-parts' not found in database. Creating it...")
            quiz = Quiz(
                slug='purchase-parts',
                title='3D Purchase Parts & STEP Handling',
                description='Understanding manual-based workflows for vendor data and external solids.',
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
        print("Successfully synced 'purchase-parts' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_purchase_parts_quiz()
