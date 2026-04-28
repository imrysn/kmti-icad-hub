import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_titleblock_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data
        new_questions = [
            {
                "text": "Identify the physical property that serves as the basis for calculating the weight of a part in the Material Setting window.",
                "options": ["Surface Area", "Specific Gravity (SPGR)", "Thermal Conductivity", "Young's Modulus"],
                "correct_answer": 1,
                "explanation": "Weight calculation in ICAD is derived from the part volume multiplied by its Specific Gravity (SPGR)."
            },
            {
                "text": "Name the default color that must be assigned to materials that do not have a specific designated color code in the Material list.",
                "options": ["BLACK (0)", "GREEN (3)", "WHITE (Machine Color)", "CYAN (4)"],
                "correct_answer": 2,
                "explanation": "Standard KEMCO protocol assigns White (Machine Color) as the default for non-specified material surfaces."
            },
            {
                "text": "Identify the drawing element that displays administrative data such as Job Order, Unit Code, and Designer Name.",
                "options": ["BOM List", "Tree View", "Title Block", "Message Pane"],
                "correct_answer": 2,
                "explanation": "The Title Block is the primary repository for project-specific administrative and ownership metadata."
            },
            {
                "text": "When a material has already been assigned to an entity, how does ICAD visually distinguish that entity from others in the workspace?",
                "options": ["It becomes transparent.", "It is automatically moved to a different layer.", "It is highlighted to show distinction.", "It changes its drawing number automatically."],
                "correct_answer": 2,
                "explanation": "Materials assignment triggers a visual highlight or color change to confirm successful data mapping."
            },
            {
                "text": "If you need to use S35C material for a project, which material should you select from the ICAD 3D Material List, and why?",
                "options": ["SS400; because the color code is the same.", "S45C; because the specific gravity is nearly identical.", "S35C; because it is natively included in the list.", "VP; because it is the standard equivalent for all carbon steels."],
                "correct_answer": 1,
                "explanation": "S45C is used as a substitute in the 3D environment because its density (7.84) matches S35C, ensuring accurate weight computation."
            },
            {
                "text": "According to the Title Block lesson, where should the data changes be performed if the information displayed in the title block needs to be updated?",
                "options": ["Directly in the Title Block on the drawing.", "In the Material Setting window.", "Within the \"Additional Information\" settings.", "In the BOM (Bill of Materials) list."],
                "correct_answer": 2,
                "explanation": "Administrative metadata is managed through the \"Additional Information\" interface to ensure system-wide synchronization."
            },
            {
                "text": "What is the correct sequence for placing the Title Block in its designated location on a drawing template?",
                "options": ["Select the entity > Click Go > Press OK.", "Click Create Title Block > Choose Template > Click Go > Click P1 and P2.", "Open 2D Detailing > Set Material > Click P1 and P2.", "Right-click the entity > Select Properties > Click OK."],
                "correct_answer": 1,
                "explanation": "Placing the title block requires selecting the tool, choosing the template, confirming (Go), and defining the placement points."
            },
            {
                "text": "Scenario: You are performing 2D detailing for a part that was modeled using S45C as a 3D substitute. According to the instructional standards for material equivalency, what material name must be manually entered into the BOM?",
                "options": ["S45C", "S45C-D", "S35C", "SS400"],
                "correct_answer": 2,
                "explanation": "If S45C was used for density in 3D, the actual intended material (S35C) must be manually corrected in the parts list documentation."
            },
            {
                "text": "Scenario: You have just placed a Title Block on a drawing, but you realize the \"Quantity\" field is incorrect. Based on the \"Note\" regarding title block edits, how should you correct this specific field?",
                "options": ["Delete the entire Title Block and start over.", "The quantity must be manually edited.", "Re-select the material in the 3D model.", "Toggle the \"Mirror Part\" setting."],
                "correct_answer": 1,
                "explanation": "Certain fields like Quantity may require manual intervention if the automated link does not capture specialized assembly counts."
            },
            {
                "text": "Scenario: A designer is working with a material called \"BSP\" which is not in the ICAD Material List. Based on the provided \"Equivalent Material\" table, which material notation should the designer select to ensure the specific gravity is correct for weight computation?",
                "options": ["C1220", "C1100", "C2680", "VP"],
                "correct_answer": 2,
                "explanation": "C2680 is the designated equivalent for BSP in the ICAD material library to maintain density accuracy."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-titleblock').first()
        if not quiz:
            print("Quiz '2d-titleblock' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-titleblock',
                title='ICAD Material Setting and Title Block Assessment',
                description='Proficiency in managing material attributes and final drawing documentation within the ICAD environment.',
                course_type='2D_Drawing'
            )
            db.add(quiz)
            db.flush()
        else:
            quiz.title = 'ICAD Material Setting and Title Block Assessment'
            quiz.description = 'Proficiency in managing material attributes and final drawing documentation within the ICAD environment.'

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
        print("Successfully synced '2d-titleblock' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_titleblock_quiz()
