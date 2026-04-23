import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_material_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "Name the specific physical property that the ICAD system uses to calculate the total weight of a 3D component.",
                "options": ["Surface Area", "Specific gravity (SPGR)", "Refractive Index", "Hardness"],
                "correct_answer": 1,
                "explanation": "Specific Gravity (Density) is the primary coefficient used by iCAD to determine part mass from its volume."
            },
            {
                "text": "What specific color must be assigned to a material if it does not have a designated color code in the Material Setting window?",
                "options": ["Red", "Green", "White", "Blue"],
                "correct_answer": 2,
                "explanation": "Materials without a specific designated color in the library default to White (Color 1) for modeling."
            },
            {
                "text": "Identify the visual change that occurs to an entity within the workspace to indicate that its material has already been successfully assigned.",
                "options": ["It turns transparent", "It is highlighted (shows distinction)", "It is permanently locked", "It disappears from the tree view"],
                "correct_answer": 1,
                "explanation": "iCAD highlights or changes the display state of an entity once a material attribute is successfully applied."
            },
            {
                "text": "In the Material Settings window, which three data points are provided for each entry in the list?",
                "options": ["Part Name, Layer Number, and Color Code", "Notation, Specific Gravity, and Color", "Material Thickness, Volume, and Specific Gravity", "Notation, Weight, and 2D Detailing Code"],
                "correct_answer": 1,
                "explanation": "The library entries provide the material Notation (Name), its SPGR value, and its default Color index."
            },
            {
                "text": "If you need to assign a material to an entity that has already been set, what is the first step in the \"Proceed in changing\" process?",
                "options": ["Delete the entity and recreate it", "Select \"Cancel\" on the initial dialog box to reset the attributes", "Select \"Set Material\" from the icon menu and then select \"OK\" on the resulting dialog prompt"],
                "correct_answer": 2,
                "explanation": "To update an existing material, you must re-run the \"Set Material\" command and confirm the intent to modify via the OK prompt."
            },
            {
                "text": "Why is S45C used as a 3D material substitute for S35C within the ICAD environment?",
                "options": ["S45C is significantly stronger than S35C", "The two materials have almost identical specific gravity values", "S45C is the only material that allows for green highlighting", "It is a requirement for the 2D detailing Bill of Materials (BOM)"],
                "correct_answer": 1,
                "explanation": "The manual suggests S45C as a substitute for S35C because their densities are nearly identical, ensuring correct weight calculations."
            },
            {
                "text": "According to the lesson, if a designer is working with \"PVC,\" which entry from the ICAD Material List should they select as the equivalent?",
                "options": ["C1100", "C2680", "VP (塩化ビニール管)", "S45C"],
                "correct_answer": 2,
                "explanation": "PVC piping and materials are represented by the \"VP\" notation in the standard library."
            },
            {
                "text": "Scenario: You are performing 2D detailing for a part that was modeled in 3D using S45C as a substitute. According to the instructional notes, what material name must be manually entered into the Bill of Materials (BOM) to ensure accuracy in the final documentation?",
                "options": ["S45C", "S35C", "S45C-D", "Machine Color (White)"],
                "correct_answer": 1,
                "explanation": "Even if S45C was used for modeling weight calculation, the actual engineering requirement (S35C) must be manually corrected in the BOM."
            },
            {
                "text": "Scenario: A user selects an entity and the Material Settings window appears. They notice the Specific Gravity (SPGR) for their chosen material is 8.4300. Based on the lesson images, which material are they most likely assigning?",
                "options": ["SS400", "S45C", "C3604", "STKM13A"],
                "correct_answer": 2,
                "explanation": "C3604 (Brass) has a specific gravity of approximately 8.43 in the iCAD library."
            },
            {
                "text": "Scenario: You are working with a part made of \"BSP\" material, which is not natively in the ICAD list. Looking at the \"Other materials\" equivalency table, which notation should you look for in the library to ensure the weight calculation is correct?",
                "options": ["C1100", "C2680", "C1220", "VP"],
                "correct_answer": 1,
                "explanation": "BSP is functionally equivalent to C2680 in terms of specific gravity for iCAD modeling."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == 'material').first()
        if not quiz:
            print("Quiz 'material' not found in database. Creating it...")
            quiz = Quiz(
                slug='material',
                title='iCAD Material & Weight Logic',
                description='Understanding physical properties in the KEMCO iCAD workflow.',
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
        print("Successfully synced 'material' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_material_quiz()
