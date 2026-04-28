import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_boolean_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "Identify the specific Boolean operation used to combine multiple independent 3D volumes into a single, unified entity.",
                "options": ["Subtract", "Intersect", "Union", "Separate Entity"],
                "correct_answer": 2,
                "explanation": "The Union operation merges two or more distinct solids into a single continuous volume."
            },
            {
                "text": "In a subtraction process, what is the technical term for the secondary entities that are used to create the cutout before they disappear or become components?",
                "options": ["Target entity", "Master part", "Tool entity", "Reference sketch"],
                "correct_answer": 2,
                "explanation": "The \"Tool entity\" is the geometry that defines the shape to be removed from the main \"Target entity.\""
            },
            {
                "text": "Name the resulting form or data type that entities are converted into when the \"Separate Entity\" tool is used to reverse a Boolean operation.",
                "options": ["B-Rep solid", "CSG solid", "Drafting entity", "Meshed body"],
                "correct_answer": 1,
                "explanation": "Separating a Boolean product converts it into editable \"CSG solids,\" representing its original constructive geometry."
            },
            {
                "text": "When performing a standard Subtract operation, what is the primary difference between the \"Target Entity\" and the \"Tool Entity\"?",
                "options": ["The Target is the part to be removed; the Tool is the part that remains", "The Target is the main body; the Tool is the volume subtracted from it", "The Target must be green; the Tool must be a wireframe", "The Target is a 2D sketch; the Tool is a 3D solid"],
                "correct_answer": 1,
                "explanation": "The Target is the solid being modified, while the Tool is the volume defining the cut."
            },
            {
                "text": "Which Boolean tool creates a new solid consisting only of the volume where two entities overlap, without the intersecting entities disappearing?",
                "options": ["Union", "Subtract", "Intersect", "Separate All"],
                "correct_answer": 2,
                "explanation": "The Intersect operation calculates the logical overlap between entities to create a new shared volume."
            },
            {
                "text": "There are two variations of the Subtract tool shown in the lesson. What is the unique function of the second variation (the icon with the transparent cylinder)?",
                "options": ["It deletes the Target Entity after the cut is made", "It converts the cutout into a tapped hole automatically", "It allows the user to keep the tool entities after the subtraction is finished", "It reverses the operation and joins the entities instead"],
                "correct_answer": 2,
                "explanation": "The second Subtract variation allows for \"Retaining the Tool,\" so the cutting geometry is not deleted after the operation."
            },
            {
                "text": "What occurs when a user applies the \"Separate All Components\" tool to a solid entity?",
                "options": ["Only the green-painted tapped holes are removed", "Every Boolean byproduct (joins, cutouts, holes) is detached from the main solid", "The entity is permanently deleted from the workspace", "The 3D model is converted back into a 2D sketch on the X-Y plane"],
                "correct_answer": 1,
                "explanation": "Separate All recursively detaches every constituent part and Boolean operation from the combined solid."
            },
            {
                "text": "Scenario: You have joined two blocks using the Union tool but later realize they were misaligned. You want to revert them back into two separate, editable blocks. Which specific tool should you select from the Boolean menu to achieve this?",
                "options": ["Intersect", "Separate Entity (Component)", "Subtract (Retain Tool)", "Show/Hide Drafting Entity"],
                "correct_answer": 1,
                "explanation": "The Separate Entity tool is used to de-union or reverse Boolean products back into their component solids."
            },
            {
                "text": "Scenario: A designer is creating a specialized mold. They need to subtract a complex shape from a block, but they also need to keep that complex shape for a different part of the assembly. According to the lesson, which specific icon should they click in the Subtract menu?",
                "options": ["The first icon (Solid Green)", "The second icon (Green with White Outline)", "The third icon (Green with a hollow Tool Entity)", "The Intersect icon"],
                "correct_answer": 2,
                "explanation": "The third Subtract icon represents \"Subtract and Keep Tool,\" which is necessary for mold and die design."
            },
            {
                "text": "Scenario: You are using the Separate Entity tool. After selecting the components you wish to detach and clicking \"GO,\" a dialog box appears stating \"After creating form, display form is multiple CSG solids. Continue processing?\" Based on the instructional images, what is the correct action to finalize the separation?",
                "options": ["Select \"Cancel\" to prevent the data from being deleted", "Select \"OK\" to proceed with the conversion to CSG solids", "Use Muhenkan + Q to align the plane first", "Re-paint the entities green before clicking OK"],
                "correct_answer": 1,
                "explanation": "Selecting OK confirms the conversion process required to return the combined entity into separate CSG solids."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == 'boolean').first()
        if not quiz:
            print("Quiz 'boolean' not found in database. Creating it...")
            quiz = Quiz(
                slug='boolean',
                title='Boolean Operations in iCAD',
                description='Understanding logical solid addition, subtraction, and intersection.',
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
        print("Successfully synced 'boolean' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_boolean_quiz()
