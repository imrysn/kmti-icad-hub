import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_parasolid_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data (as updated in mentorConstants.ts)
        new_questions = [
            {
                "text": "Which specific modeling operation is used to decrease the overall data footprint of an imported 3D entity?",
                "options": ["SUBTRACT", "Lighten B-rep Solid", "Create 3D Part", "Show/Hide Drafting Entity"],
                "correct_answer": 1,
                "explanation": "Lighten B-rep Solid is the standard tool for optimizing the performance of complex imported vendor geometry."
            },
            {
                "text": "To ensure proper identification on the server, what specific piece of information must be used as the \"File name\" when saving a part?",
                "options": ["Drawing Number", "Purchase part code", "Creator's Name", "Material Name"],
                "correct_answer": 1,
                "explanation": "Company policy requires purchased components to be saved using their unique commercial Part Code for server indexing."
            },
            {
                "text": "Within the spreadsheet-based part information settings, in which column must the \"MAKER\" or manufacturer of the component be documented?",
                "options": ["NOTE", "REMARK", "MATERIAL", "FILENAME"],
                "correct_answer": 1,
                "explanation": "The REMARK column is reserved for documentation of the manufacturer (Maker) in the parts list spreadsheet."
            },
            {
                "text": "When importing a Parasolid file, what is the correct procedure for handling the \"Name Change\" dialog box if the intention is to release the part names on the tree view?",
                "options": ["Select the top 3D part and press OK", "Pick \"Cancel\" on the Name Change dialog box", "Enter the manufacturer's name in the comment field", "Select \"Change forms\" in the simplification level"],
                "correct_answer": 1,
                "explanation": "Selecting \"Cancel\" on the Name Change prompt releases the internal names to the iCAD tree view."
            },
            {
                "text": "Which of the following file extensions is NOT listed as a compatible format for the ICAD Parasolid Link import tool?",
                "options": [".x_t", ".xmt_txt", ".x_b", ".dwg"],
                "correct_answer": 3,
                "explanation": ".dwg is a 2D/AutoCAD format, not a native Parasolid kernel file type."
            },
            {
                "text": "When using the \"Lighten B-rep Solid\" tool, which simplification setting should be selected to ensure the geometry remains unchanged while reducing file size?",
                "options": ["Block holes", "Delete complicated curves", "No form changes", "Restore Blind 3D Part"],
                "correct_answer": 2,
                "explanation": "The \"No form changes\" option optimizes the data structure without altering the physical geometric boundaries."
            },
            {
                "text": "According to the \"Level Settings\" for lightening solids, what is the direct consequence of selecting \"Change forms\"?",
                "options": ["The part becomes a 2D drawing", "B-rep solid entities are converted into sheets", "The specific gravity of the material is reset", "The file size increases due to triangle surface data"],
                "correct_answer": 1,
                "explanation": "\"Change forms\" significantly reduces complexity but may convert solid volumes into lightweight surface sheets."
            },
            {
                "text": "Scenario: You have imported a complex valve assembly. After the process, you need to verify if the file reduction was successful. Where should you look to find the message \"MSG06901 Process completed successfully\"?",
                "options": ["The Tree View Properties", "The Parasolid Link dialog box", "The Message Pane", "The REMARK column in the Excel settings"],
                "correct_answer": 2,
                "explanation": "Technical feedback and completion status messages are displayed in the software's Message Pane."
            },
            {
                "text": "Scenario: A designer is assigned to model a pneumatic cylinder. According to the color standards for purchase parts, how should they handle the coloring of the cylinder's main body versus the threaded rod end?",
                "options": ["Both must be white (Machine Color)", "The body color depends on its actual appearance, but the threaded portion must be green", "The entire part must be green to indicate it is an actuator", "The body must be yellow for safety, and the threads must be black"],
                "correct_answer": 1,
                "explanation": "KEMCO standards require specific color designations (Green) for threaded features to differentiate them from bodies."
            },
            {
                "text": "Scenario: You need to add a specific internal comment to a part that is already visible on the tree view. Instead of using the icon menu, you decide to use the tree view method. What is the correct sequence of mouse actions to reach the \"Comment(T)\" input field?",
                "options": ["Left-click the part > select \"Create 3D Part\" > press OK", "Right-click the Top 3D Part > select \"Properties\" > enter comment in the Property dialog box", "Double-click the part name > select \"Entry Settings\" > press Cancel", "Right-click the Global folder > select \"Lighten B-rep\" > enter comment"],
                "correct_answer": 1,
                "explanation": "Right-clicking a part in the Scene Browser (Tree) and selecting Properties is the most direct way to edit its metadata."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == 'parasolid').first()
        if not quiz:
            print("Quiz 'parasolid' not found in database. Creating it...")
            quiz = Quiz(
                slug='parasolid',
                title='Parasolid Kernel Logic',
                description='Understanding the mathematical engine driving the iCAD workspace.',
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
        print("Successfully synced 'parasolid' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_parasolid_quiz()
