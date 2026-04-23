import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_origin_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "Identify the specific coordinate values (X, Y, Z) that define the location of an Origin point.",
                "options": ["(1,1,1)", "(0,0,0)", "(10,10,10)", "(0,0,1)"],
                "correct_answer": 1,
                "explanation": "The Origin point is the zero-reference of the coordinate system, defined as (0,0,0)."
            },
            {
                "text": "Apart from establishing a point in space, what secondary characteristic of an entity does the Origin determine?",
                "options": ["Color of the solid", "Weight calculation", "Layout/orientation of views", "Part name"],
                "correct_answer": 2,
                "explanation": "The origin is the anchor for all projections; changing it alters how Top, Front, and Side views are generated."
            },
            {
                "text": "In the \"Change 3D Part Layout\" process, which specific mouse action is required to reveal the existing position of the origin before moving it?",
                "options": ["Left-click", "Double-click", "Right-click", "Middle-click"],
                "correct_answer": 2,
                "explanation": "Right-clicking while the tool is active displays the current origin location for reference."
            },
            {
                "text": "According to the technical constraints of the software, what is the required relationship between the 2D and 3D origin positions?",
                "options": ["They should be offset to allow for perspective drawing", "They must occupy the exact same position", "The 3D origin must be set before the 2D origin is calculated", "They can differ as long as the Z-axis remains constant"],
                "correct_answer": 1,
                "explanation": "Alignment between 2D drafting and 3D modeling origins is mandatory for conversion accuracy."
            },
            {
                "text": "Which factor dictates the specific placement of an origin point on a \"case-by-case basis\"?",
                "options": ["The total number of points selected in the layout tool", "The user's preference for either the Front or Back view", "The physical geometry and composition of the part", "The resolution of the 3D Parts icon menu"],
                "correct_answer": 2,
                "explanation": "Best practice dictates origin placement based on part geometry, such as symmetry axes or mounting faces."
            },
            {
                "text": "After selecting the \"Change 3D Part Layout\" tool, what is the primary purpose of the very first left-click performed on the model?",
                "options": ["Establishing the X-axis direction", "Confirming the current origin location", "Selecting the front-view plane", "Defining the new origin location"],
                "correct_answer": 3,
                "explanation": "The 5-step layout process starts with selecting the point that will become the new (0,0,0) Origin."
            },
            {
                "text": "When redefining the part layout, what determines which side of the object will be designated as the \"Front View\"?",
                "options": ["The point chosen to represent the Z-axis", "The orientation of the resulting XY-plane", "The location of the \"Back View\" relative to the Origin", "The initial right-click on the 3D Parts menu"],
                "correct_answer": 1,
                "explanation": "The Front View is standardly mapped to the XY-plane; defining the X and Y axes sets this projection."
            },
            {
                "text": "Scenario: A designer is working on a cylindrical part and notices that the \"Top View\" does not align correctly with the physical top of the object. Based on the lesson, what must they adjust to correct the orientation of all associated views?",
                "options": ["Reposition the 2D origin only", "Modify the Origin location and orientation", "Increase the number of points in the Key Entry area", "Toggle the Message Pane error alerts"],
                "correct_answer": 1,
                "explanation": "Correcting the \"Top View\" requires redefining the global origin/orientation triad using the Change Part Layout tool."
            },
            {
                "text": "Scenario: You have successfully selected the \"Change 3D Part Layout\" tool and identified the new origin point. You have just clicked a second point to set the X-axis. To complete the layout change according to the 5-step process, what is your immediate next required action?",
                "options": ["Right-click to save the configuration", "Left-click a third point to define the Y-axis", "Select \"3D PARTS\" from the icon menu again", "Verify that the coordinates are (0,0,1)"],
                "correct_answer": 1,
                "explanation": "After setting the origin and X-axis, the third step is defining the Y-axis vector with a left-click."
            },
            {
                "text": "Scenario: A colleague is struggling to find the \"Change 3D Part Layout\" feature. They are currently looking at the general Icon Menu. Under which specific sub-category within that menu should you tell them to look to find the correct tool icon?",
                "options": ["Basic Functions", "2D Commands", "3D Parts", "Message Pane"],
                "correct_answer": 2,
                "explanation": "The Change 3D Part Layout tool is located under the \"3D PARTS\" sub-category of the Icon Menu."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == 'origin').first()
        if not quiz:
            print("Quiz 'origin' not found in database. Creating it...")
            quiz = Quiz(
                slug='origin',
                title='Coordinate Systems & iCAD Mapping',
                description='Understanding orientation logic, plane mapping, and standard axis coloring.',
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
        print("Successfully synced 'origin' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_origin_quiz()
