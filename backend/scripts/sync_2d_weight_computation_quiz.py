import sys
import os
import json

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def sync_2d_weight_computation_quiz():
    db = SessionLocal()
    try:
        # 1. New Question Data
        new_questions = [
            {
                "text": "Identify the standardized unit of measurement for Specific Gravity that must be used when applying the given weight computation formulas.",
                "options": ["$g/cm^3$", "$kg/m^3$", "$lb/in^3$", "$kg/cm^2$"],
                "correct_answer": 1,
                "explanation": "The standard calculation framework for ICAD material weight relies on specific gravity expressed in $kg/m^3$."
            },
            {
                "text": "According to the lesson, what is the mandatory unit conversion required for all raw dimensions (initially provided in millimeters) before they are entered into a weight calculation?",
                "options": ["Centimeters", "Meters", "Kilometers", "Inches"],
                "correct_answer": 1,
                "explanation": "To align with $kg/m^3$ specific gravity, all linear dimensions must be converted from mm to meters (e.g., 100mm = 0.1m)."
            },
            {
                "text": "Name the technical standard that provides the reference values for the \"Cross-sectional area\" used in Shape Steel weight calculations.",
                "options": ["ISO", "ANSI", "Japan Industrial Standard (JIS)", "DIN"],
                "correct_answer": 2,
                "explanation": "JIS tables provide the certified cross-sectional areas for standardized structural steel shapes like C-channels and angles."
            },
            {
                "text": "When calculating the weight of Shape Steel, what is the recommended \"shortcut\" for converting a cross-sectional area from $cm^2$ to $m^2$?",
                "options": ["Multiply the value by 100.", "Move the decimal point two places to the right.", "Move the decimal point four places to the left.", "Divide the value by 1,000."],
                "correct_answer": 2,
                "explanation": "Converting $cm^2$ to $m^2$ requires a $1/10,000$ factor, which is equivalent to shifting the decimal four places left."
            },
            {
                "text": "Which material from the provided table possesses the lowest specific gravity value?",
                "options": ["RUBBER", "ACRYLIC", "NEW LIGHT", "MC NYLON"],
                "correct_answer": 2,
                "explanation": "According to the material computation table, NEW LIGHT has the lowest density among the listed engineering plastics."
            },
            {
                "text": "What is the specific gravity ($kg/m^3$) for S45C material according to the computation table?",
                "options": ["7850", "7840", "7000", "1200"],
                "correct_answer": 1,
                "explanation": "The reference table specifies a specific gravity of 7840 $kg/m^3$ for S45C carbon steel."
            },
            {
                "text": "For a Cylinder weight calculation, if the diameter is provided, which of the following represents the correct mathematical structure to find the Material Weight (MW)?",
                "options": ["$Length \\times Width \\times Height \\times SG$", "$[(\\pi \\times d^2 \\times L \\times SG) / 4]$", "$Cross\\ Sectional\\ Area \\times L^2 \times SG$", "$\\pi \times r \times L \times SG$"],
                "correct_answer": 1,
                "explanation": "The standard formula for cylinder weight using diameter is $(\pi/4) \times d^2 \times L \times SG$."
            },
            {
                "text": "Scenario: You are calculating the weight of an SS400 Plate with dimensions of $20 \\times 100 \\times 200$. Following the conversion rules, which set of values should be multiplied to find the weight in kilograms?",
                "options": ["$20 \\times 100 \\times 200 \\times 7.85$", "$0.02m \\times 0.1m \\times 0.2m \\times 7850kg/m^3$", "$0.2m \\times 1.0m \\times 2.0m \\times 7850kg/m^3$", "$0.002m \\times 0.01m \\times 0.02m \\times 7.85kg/m^3$"],
                "correct_answer": 1,
                "explanation": "Dimensions must be converted to meters ($0.02, 0.1, 0.2$) and multiplied by the $kg/m^3$ density ($7850$ for SS400)."
            },
            {
                "text": "Scenario: A designer is calculating the weight of a C-Channel (Shape Steel) with a length of 530mm. The $C.S. Area$ is listed as $30.59\\ cm^2$. Using the material SHAPE STEEL, what is the first step required for the $C.S. Area$ before it can be multiplied by the length and specific gravity?",
                "options": ["Multiply it by $\\pi$.", "Convert $30.59\\ cm^2$ to $0.003059\\ m^2$.", "Convert 530mm into 5.3m.", "Multiply $30.59$ by $7.85$."],
                "correct_answer": 1,
                "explanation": "The area must be converted from $cm^2$ to $m^2$ by moving the decimal four places left ($0.003059$)."
            },
            {
                "text": "Scenario: You have a Rectangular Pipe made of STKR400 with a cross-sectional area of $7.967\\ cm^2$ and a length of 480mm. Based on the \"Square / Rectangular Pipe\" example, which calculation correctly determines the material weight?",
                "options": ["$7.967 \\times 480 \\times 7850$", "$0.0007967m^2 \\times 0.48m \\times 7850kg/m^3$", "$0.007967m^2 \\times 4.8m \\times 7850kg/m^3$", "$7.967m^2 \\times 0.48m \\times 7.85kg/m^3$"],
                "correct_answer": 1,
                "explanation": "Correct calculation: $Area (0.0007967\\ m^2) \times Length (0.48\\ m) \times SG (7850\\ kg/m^3)$."
            }
        ]

        # 2. Find the Quiz
        quiz = db.query(Quiz).filter(Quiz.slug == '2d-weight-computation').first()
        if not quiz:
            print("Quiz '2d-weight-computation' not found in database. Creating it...")
            quiz = Quiz(
                slug='2d-weight-computation',
                title='ICAD Material Weight Computation Assessment',
                description='Proficiency in calculating material weights for various geometries, managing unit conversions, and interpreting technical data from specific gravity tables.',
                course_type='2D_Drawing'
            )
            db.add(quiz)
            db.flush()
        else:
            quiz.title = 'ICAD Material Weight Computation Assessment'
            quiz.description = 'Proficiency in calculating material weights for various geometries, managing unit conversions, and interpreting technical data from specific gravity tables.'

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
        print("Successfully synced '2d-weight-computation' quiz questions to database.")

    except Exception as e:
        print(f"Error syncing quiz: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    sync_2d_weight_computation_quiz()
