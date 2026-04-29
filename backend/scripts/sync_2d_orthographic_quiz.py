import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_orthographic_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "Identify the specific interface window where a user must change the scale to ensure that dimensions and notes update correctly.",
                "options": ["Scale Tool Bar", "Projection Properties", "Layer Settings", "Title Block Edit"],
                "correct_answer": 1,
                "explanation": "Changing scale via Projection Properties ensures all associated annotations and dimensions are mathematically synchronized."
            },
            {
                "text": "Which visual setting must be toggled on to display the edges formed by fillets that are otherwise hidden in a standard orthographic view?",
                "options": ["Hidden Line", "Tangent Line", "High Precision", "Center Line"],
                "correct_answer": 1,
                "explanation": "Tangent Lines represent the theoretical transition edges formed by fillets and curved surfaces."
            },
            {
                "text": "Name the command icon that will remove all projected views from the template at once without affecting the title block or BOM.",
                "options": ["Erase command", "Delete Views (or the \"wrong projected front view\" icon)", "Format Template", "Reset Workspace"],
                "correct_answer": 1,
                "explanation": "The \"Delete Views\" tool is designed to clear the drafting area while preserving the structural template."
            },
            {
                "text": "When creating additional views by dragging the cursor from the Front View, which direction must the mouse be moved to generate a Left View?",
                "options": ["Upward", "Downward", "Left Direction", "Right Direction"],
                "correct_answer": 2,
                "explanation": "In iCAD drafting logic, dragging the cursor to the left projects the Left side view."
            },
            {
                "text": "What is the primary technical consequence of changing a view's scale using the standard Tool Bar instead of the Projection Properties?",
                "options": ["The projected view will be deleted automatically", "The drawing template will be resized", "Dimensions and notes will fail to update according to the new scale", "Hidden lines will be permanently disabled for that view"],
                "correct_answer": 2,
                "explanation": "Ad-hoc scale changes on the toolbar break the link between geometry and annotation scaling."
            },
            {
                "text": "Under what specific circumstances is the High Precision setting most commonly recommended?",
                "options": ["When inserting a basic drawing template for a single part", "To fix broken lines or missing details in complex assembly drawings", "To automatically show tangent lines from chamfers", "When the drawing needs to be translated into Japanese"],
                "correct_answer": 1,
                "explanation": "High Precision recalculates geometry more thoroughly, fixing rendering gaps in dense assemblies."
            },
            {
                "text": "How does the visibility of Tangent Lines differ between chamfers and fillets during the initial insertion of an orthographic view?",
                "options": ["Both must be turned on manually in the settings box", "Fillet lines show automatically, but chamfer lines are hidden", "Chamfer lines show automatically, while fillet lines require manual activation", "Neither are supported in the new version (V8L1) of ICAD"],
                "correct_answer": 2,
                "explanation": "iCAD default settings render chamfer edges automatically but treat fillets as tangents that require user activation."
            },
            {
                "text": "Scenario: You have inserted a Front View and a Top View into your drawing. You notice that the internal geometry of the part is not visible in these views. According to the lesson, what specific action must you take to reveal the internal holes and cutouts?",
                "options": ["Drag the cursor downward to create a Bottom View", "Select the \"Create Three-view Detail\" icon again", "Open Projection Properties and check the box for Hidden Lines", "Change the scale on the Tool Bar to 1/1"],
                "correct_answer": 2,
                "explanation": "Internal geometry is toggled via the \"Hidden Lines\" parameter within the view's Projection Properties."
            },
            {
                "text": "Scenario: A designer is working on a standard part and changes the scale of the Front View to 1/2 using the Projection Properties window. What will happen to the scale of the other standard views (Top, Side, etc.) associated with that part?",
                "options": ["Only the Front View will change; others remain at the original scale", "The other standard views will automatically update to the 1/2 scale", "The other views will be deleted and must be re-projected", "The entire template will shrink to match the 1/2 scale"],
                "correct_answer": 1,
                "explanation": "Standard views are linked; updating the scale of the parent view propagates the change to all projections."
            },
            {
                "text": "Scenario: You are reviewing an assembly drawing and notice that the small chain and sprocket details appear to have missing or \"broken\" line segments. Based on the \"High Precision\" lesson, what is the procedural requirement to fix this visibility issue across the entire drawing?",
                "options": ["Uncheck \"Hidden Lines\" in the Projection Properties of the Front View", "Check the \"High Precision\" box, but note that this must be done individually for every view", "Use the \"Change the Front Orientation\" tool to reset the assembly", "Drag the cursor to the Right Direction to refresh the rendering engine"],
                "correct_answer": 1,
                "explanation": "High Precision is a per-view setting that must be enabled on every projected view requiring higher fidelity."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-orthographic').first()
        if not quiz:
            print("Quiz '2d-orthographic' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-orthographic',
                title='iCAD 2D Projection and View Management Assessment',
                description='Mastering the standards of engineering views according to JIS and KEMCO manuals.',
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
        print("Successfully synced '2d-orthographic' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_orthographic_quiz()
