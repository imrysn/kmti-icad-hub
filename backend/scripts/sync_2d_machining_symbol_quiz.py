import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_machining_symbol_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data
        new_questions = [
            {
                "text": "Identify the specific machining symbol, characterized by three inverted triangles, that indicates a surface must be smooth and possess high-class accuracy.",
                "options": ["Rough surface (∇)", "Machine Surface (∇∇)", "Fine Surface (∇∇∇)", "Grinding Surface (G∇∇)"],
                "correct_answer": 2,
                "explanation": "The ∇∇∇ symbol represents the highest standard of precision machining for high-accuracy components."
            },
            {
                "text": "Name the formatting convention (visual mark) used on a machining symbol to indicate that a part must be processed before the welding stage.",
                "options": ["Square brackets [ ]", "Asterisk *", "Parentheses ( )", "Underline _"],
                "correct_answer": 2,
                "explanation": "Parentheses around a machining symbol denote pre-processing requirements, typically prior to assembly or welding."
            },
            {
                "text": "What specific component manipulation tool allows a user to move a feature by establishing a pivot line using exactly 2-points?",
                "options": ["Move Component", "Rotate Component", "Mirror Component", "Repeat Component"],
                "correct_answer": 1,
                "explanation": "Rotation in ICAD requires a 2-point definition to establish the axis or pivot line."
            },
            {
                "text": "A designer is detailing a \"Pillow block installation surface.\" According to the Machining Surface Condition table, which symbol and accuracy class should be applied?",
                "options": ["Rough surface (∇)", "Machine Surface (∇∇) - Middle class accuracy", "Surface Grinding (G∇∇)", "Fine Surface (∇∇∇)"],
                "correct_answer": 1,
                "explanation": "Standard mounting surfaces for pillow blocks require middle-class accuracy (∇∇) for proper seating."
            },
            {
                "text": "What is the primary difference between the Mirror Component and Mirror Copy Component tools?",
                "options": ["Mirror Component deletes the original; Mirror Copy Component does not.", "Mirror Component moves/relocates the feature; Mirror Copy Component creates a duplicate.", "Mirror Component requires 3-points; Mirror Copy Component requires only 1.", "There is no functional difference between the two tools."],
                "correct_answer": 1,
                "explanation": "Copy variants of manipulation tools preserve the original geometry while creating a reflected or rotated duplicate."
            },
            {
                "text": "When using the Copy Component tool, which specific data must be entered into the item entry to determine the quantity of duplicates?",
                "options": ["RotaAngl", "MOVELENGX", "NUMBER", "SPGR"],
                "correct_answer": 2,
                "explanation": "The \"NUMBER\" parameter in the item entry field dictates the total count of copies to be generated."
            },
            {
                "text": "For applications requiring a \"Mirror finish surface\" (1.6S~), such as a roller or shaft surface, which letter prefix accompanies the machining triangles?",
                "options": ["S", "M", "G", "F"],
                "correct_answer": 2,
                "explanation": "The \"G\" prefix indicates a Grinding process, which is necessary to achieve mirror-like surface finishes."
            },
            {
                "text": "Scenario: You are modifying a 3D model of a flange. You need to take one existing bolt hole and duplicate it three times around the center axis at 90-degree intervals. Which specific tool from the manipulation menu should you select?",
                "options": ["Repeat Copy Component", "Rotate Copy Component", "Mirror Copy Component", "Move Component"],
                "correct_answer": 1,
                "explanation": "Rotate Copy Component allows for the creation of radial patterns by duplicating features around a central axis."
            },
            {
                "text": "Scenario: A technical drawing for a welded assembly has a machining symbol (∇∇) on the mating faces. Based on the instructional notes, what is the critical manufacturing sequence for these specific faces?",
                "options": ["They must be machined only after the entire assembly is welded.", "They must be machined before welding because machining after welding will be impossible.", "They should be shotblasted instead of machined to remove black skin.", "No machining is required if the material is SS400-D."],
                "correct_answer": 1,
                "explanation": "Certain internal or mating faces must be pre-machined if the post-welded geometry prevents tool access."
            },
            {
                "text": "Scenario: You are detailing the internal surface of a cover. The surface is not mating with any other parts and has no specific accuracy requirements. According to the \"Machining Surface Condition\" table, which symbol represents the most appropriate \"Rough surface\" for this application?",
                "options": ["∇∇∇", "(∇∇)", "∇", "G ∇∇"],
                "correct_answer": 2,
                "explanation": "Non-functional, non-mating surfaces are standardly specified with a single triangle (∇) for cost-effective rough machining."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-machining-symbol').first()
        if not quiz:
            print("Quiz '2d-machining-symbol' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-machining-symbol',
                title='ICAD Machining Symbols and Component Manipulation Assessment',
                description='Understanding of surface finish requirements, machining standards, and technical procedures for modifying internal part features.',
                course_type='2D_Drawing'
            )
            db.add(quiz)
            db.flush()
        else:
            quiz.title = 'ICAD Machining Symbols and Component Manipulation Assessment'
            quiz.description = 'Understanding of surface finish requirements, machining standards, and technical procedures for modifying internal part features.'

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
        print("Successfully synced '2d-machining-symbol' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_machining_symbol_quiz()
