import sys
import os
import re

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Course, Lesson, LessonContent

def seed_curriculum():
    db = SessionLocal()
    try:
        # 1. Create Courses
        modeling_course = db.query(Course).filter(Course.course_type == "3D_Modeling").first()
        if not modeling_course:
            modeling_course = Course(
                title="3D Modeling",
                description="Master 3D technical design and assembly in iCAD.",
                course_type="3D_Modeling",
                order=0
            )
            db.add(modeling_course)
            db.commit()
            db.refresh(modeling_course)

        drawing_course = db.query(Course).filter(Course.course_type == "2D_Drawing").first()
        if not drawing_course:
            drawing_course = Course(
                title="2D Drawing",
                description="Learn precision 2D drafting and orthographic projection.",
                course_type="2D_Drawing",
                order=1
            )
            db.add(drawing_course)
            db.commit()
            db.refresh(drawing_course)

        # 2. Parse mentorConstants.ts for Lessons
        constants_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), 
                                      "frontend", "src", "views", "mentor", "mentorConstants.ts")
        
        if not os.path.exists(constants_path):
            print(f"Error: Could not find {constants_path}")
            return

        with open(constants_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Split into 3D and 2D sections
        sections = re.split(r'export const ICAD_(2D|3D)_LESSONS', content)
        # sections[0] = before, sections[1] = "3D", sections[2] = 3D list, sections[3] = "2D", sections[4] = 2D list
        # Depending on order in file. Let's find index.
        
        def extract_lessons(text, course_id):
            # Extract main objects { id: '...', title: '...', content: [...] }
            # Using a slightly more robust regex for the outer object
            matches = re.finditer(r"\{\s*id:\s*'([^']+)',\s*title:\s*'([^']+)'", text)
            order = 0
            for m in matches:
                slug = m.group(1)
                title = m.group(2)
                
                # Check if exists
                lesson = db.query(Lesson).filter(Lesson.slug == slug).first()
                if not lesson:
                    lesson = Lesson(
                        course_id=course_id,
                        title=title,
                        slug=slug,
                        order=order,
                        is_published=True
                    )
                    db.add(lesson)
                    db.flush() # Get ID
                    
                    # Try to extract content strings for this lesson
                    # We look for the content: [ ... ] following this specific ID
                    content_match = re.search(f"{slug}'.*?content:\\s*\\[(.*?)\\]", text, re.DOTALL)
                    if content_match:
                        raw_strings = content_match.group(1).split(',')
                        c_order = 0
                        for s in raw_strings:
                            s = s.strip().strip("'").strip('"')
                            if s:
                                l_content = LessonContent(
                                    lesson_id=lesson.id,
                                    content_type="text",
                                    data=s,
                                    order=c_order
                                )
                                db.add(l_content)
                                c_order += 1
                
                order += 1
            db.commit()

        # Simple assignment based on file content observation
        if "3D_LESSONS" in content and "2D_LESSONS" in content:
            # Finding sections roughly
            d3_text = content[content.find("ICAD_3D_LESSONS"):content.find("ICAD_2D_LESSONS")]
            d2_text = content[content.find("ICAD_2D_LESSONS"):]
            
            print("Seeding 3D lessons...")
            extract_lessons(d3_text, modeling_course.id)
            print("Seeding 2D lessons...")
            extract_lessons(d2_text, drawing_course.id)

    finally:
        db.close()
    print("Migration complete.")

if __name__ == "__main__":
    seed_curriculum()
