import json
import re

def extract_quizzes(content):
    # Regex to find quiz objects
    # This is a bit complex because of nesting. 
    # Let's target the 'quiz:' blocks.
    
    quizzes = []
    
    # Extract 3D lessons quiz data
    matches = re.finditer(r"id:\s*'([^']*)',\s*title:\s*'([^']*)',.*?quiz:\s*\{\s*title:\s*'([^']*)',\s*description:\s*'([^']*)',\s*questions:\s*\[(.*?)\s*\]\s*\}", content, re.DOTALL)
    
    for match in matches:
        lesson_id = match.group(1)
        lesson_title = match.group(2)
        quiz_title = match.group(3)
        quiz_desc = match.group(4)
        questions_block = match.group(5)
        
        # Parse questions
        questions = []
        q_matches = re.finditer(r"\{\s*id:\s*'[^']*',\s*text:\s*'([^']*)',\s*options:\s*\[(.*?)\]\s*,\s*correctAnswer:\s*(\d+),\s*explanation:\s*'([^']*)'\s*\}", questions_block, re.DOTALL)
        
        for q_match in q_matches:
            text = q_match.group(1).replace("\\'", "'")
            options_raw = q_match.group(2)
            options = [o.strip().strip("'").strip('"') for o in options_raw.split(',')]
            correct_answer = int(q_match.group(3))
            explanation = q_match.group(4).replace("\\'", "'")
            
            questions.append({
                "text": text,
                "options": options,
                "correct_answer": correct_answer,
                "explanation": explanation
            })
            
        quizzes.append({
            "slug": lesson_id,
            "title": quiz_title,
            "description": quiz_desc,
            "course_type": "3D_Modeling", # Default for now, we'll fix based on variable name
            "questions": questions
        })
        
    return quizzes

# We need to run this on the actual file content.
# I'll read the file in the script.

content_3d = open('frontend/src/views/mentor/mentorConstants.ts', 'r', encoding='utf-8').read()

# Split content into 3D and 2D parts if possible
parts = re.split(r'export const ICAD_2D_LESSONS', content_3d)

quizzes_3d = extract_quizzes(parts[0])
for q in quizzes_3d:
    q["course_type"] = "3D_Modeling"

quizzes_2d = []
if len(parts) > 1:
    quizzes_2d = extract_quizzes(parts[1])
    for q in quizzes_2d:
        q["course_type"] = "2D_Drawing"

all_quizzes = quizzes_3d + quizzes_2d

with open('quizzes_data.json', 'w', encoding='utf-8') as f:
    json.dump(all_quizzes, f, indent=2)

print(f"Extracted {len(all_quizzes)} quizzes.")
