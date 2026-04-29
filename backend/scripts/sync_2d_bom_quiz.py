import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_bom_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data
        new_questions = [
            {
                "text": "Identify the specific location on the drawing template where the Bill of Materials (BOM) is standardly positioned.",
                "options": ["Lower left corner", "Upper right portion", "Directly under the Front View", "Inside the Title Block"],
                "correct_answer": 1,
                "explanation": "Standard KEMCO/JIS layouts place the BOM in the upper-right quadrant of the drawing sheet."
            },
            {
                "text": "According to the lesson, what is the mandatory minimum gap in row numbering required between the three categorized groups (Fabricated, Purchased, and Hardware) in an assembly BOM?",
                "options": ["5 numbers", "10 numbers", "20 (numbers)", "50 numbers"],
                "correct_answer": 2,
                "explanation": "A gap of 20 numbers between categories (Fabricated/Purchased/Hardware) allows for future parts to be added without renumbering the entire list."
            },
            {
                "text": "Which specific ICAD command allows a designer to modify text height, width ratio, and interval ratio when BOM text does not fit within its allocated space?",
                "options": ["Move Component", "Scale Entity", "Edit Attribute (or Change Attribute)", "Text Entry window"],
                "correct_answer": 2,
                "explanation": "The Edit Attribute tool is used to fine-tune the visual properties of table-based text in the BOM."
            },
            {
                "text": "When managing a BOM for a Part Drawing (Single Part), how should the part balloons be identified?",
                "options": ["Using numerical sequences (1, 2, 3...)", "Using manufacturer standard codes", "Using letters (a, b, c...)", "Using the drawing number only"],
                "correct_answer": 2,
                "explanation": "Single part drawings use alphabetic labels (a, b, c...) to distinguish them from multi-part assembly sequences."
            },
            {
                "text": "In the \"Additional Information\" setting window, what is the significance of columns highlighted with a green color?",
                "options": ["They represent mandatory fields that must be filled.", "They indicate data linked directly to the company server.", "They are protected fields that cannot be modified.", "They represent purchased parts from the maker \"TAIYO.\""],
                "correct_answer": 2,
                "explanation": "Green cells in the Additional Information window indicate protected system data that cannot be manually edited by the user."
            },
            {
                "text": "What standard decimal precision is required for \"Material Weight\" and \"Finished Weight\" entries in the BOM, unless a special case is accepted?",
                "options": ["1 decimal place", "2 decimal places", "3 decimal places", "No decimal places (whole numbers only)"],
                "correct_answer": 1,
                "explanation": "Industrial standards require weight data to be reported with a precision of two decimal places."
            },
            {
                "text": "When organizing an Assembly BOM in Excel, in what specific order must the Hardware components (such as HS, BS, CS) be arranged?",
                "options": ["Alphabetical order by name", "Increasing order of size", "Decreasing order", "Randomly as they appear in the model"],
                "correct_answer": 2,
                "explanation": "Standard hardware (bolts/screws) must be listed in decreasing order of their size/length for logistical clarity."
            },
            {
                "text": "Scenario: You are generating a BOM for a single component. You click the \"Single Part\" button in the Excel interface. What is the technical result of this action regarding the \"Quantity\" and \"No.\" columns?",
                "options": ["It sums the quantities of all similar parts in the assembly.", "It eliminates the quantity and adds \"1\" to the No. column, as indicating quantity for a single part is unnecessary.", "It highlights the row in green to indicate it is a fabricated part.", "It automatically opens the \"Parts Information Setting\" window."],
                "correct_answer": 1,
                "explanation": "For single part drawings, the specific part index is set to 1 and the redundant quantity field is cleared."
            },
            {
                "text": "Scenario: You have exported an assembly BOM to Excel. You notice that several identical screws are listed on separate lines. Which specific button in the Excel BOM interface should you click to combine these identical entries into a single line with a total count?",
                "options": ["Delete Abbreviation", "Single Part", "Sum the Parts (部品を合計する)", "Paste BOM on template"],
                "correct_answer": 2,
                "explanation": "The \"Sum the Parts\" feature consolidates identical components into a unified line item with an aggregated quantity."
            },
            {
                "text": "Scenario: You are filling out the \"Additional Information\" for a new project title block. You need to add the Job Number, Machine Title, and Designer Name. According to the workflow, where will this information eventually appear?",
                "options": ["In the Remarks column of the BOM.", "In the Message Pane in red text.", "In the title block of the drawing template.", "In the \"Maker\" column for purchased parts."],
                "correct_answer": 2,
                "explanation": "Data entered into the Additional Information window is mapped directly to the corresponding fields in the drawing's title block."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-bom').first()
        if not quiz:
            print("Quiz '2d-bom' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-bom',
                title='ICAD Bill of Materials (BOM) and Additional Information Assessment',
                description='Technical proficiency in generating Bill of Materials, managing Excel-based data exports, and configuring drawing title blocks within the ICAD environment.',
                course_type='2D_Drawing'
            )
            db.add(quiz)
            db.flush()
        else:
            quiz.title = 'ICAD Bill of Materials (BOM) and Additional Information Assessment'
            quiz.description = 'Technical proficiency in generating Bill of Materials, managing Excel-based data exports, and configuring drawing title blocks within the ICAD environment.'

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
        print("Successfully synced '2d-bom' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_bom_quiz()
