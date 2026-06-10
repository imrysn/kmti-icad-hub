"""
Ingest Lessons directly from MySQL Database into the ChromaDB Knowledge Base.
"""

from backend.database import SessionLocal
from backend.models import Course, Lesson, LessonContent
from backend.rag_engine import rag_engine

def ingest_from_db():
    print("📖 Reading Lessons from MySQL Database...")
    with SessionLocal() as db:
        courses = db.query(Course).all()
        documents = []
        
        for course in courses:
            lessons = db.query(Lesson).filter(Lesson.course_id == course.id).all()
            for lesson in lessons:
                contents = db.query(LessonContent).filter(LessonContent.lesson_id == lesson.id).order_by(LessonContent.order).all()
                
                # Combine textual content
                text_parts = []
                for content in contents:
                    if content.content_type in ["text", "bullet_list"] and content.data:
                        text_parts.append(content.data)
                
                if not text_parts:
                    continue
                
                combined_text = "\n\n".join(text_parts)
                
                doc = {
                    'id': f"lesson_{lesson.id}_{lesson.slug}",
                    'text': combined_text,
                    'metadata': {
                        'source': 'Live Curriculum Database',
                        'course': course.title,
                        'course_type': course.course_type or '',
                        'main_topic': course.title,
                        'sub_topic': lesson.title,
                        'lesson_id': lesson.slug,
                        'instruction': combined_text[:200] # preview for fallback
                    }
                }
                documents.append(doc)
        
        if documents:
            print(f"🔄 Ingesting {len(documents)} lessons into RAG engine...")
            rag_engine.ingest_documents(documents)
            print(f"✅ Successfully ingested {len(documents)} lessons from the database.")
            
            stats = rag_engine.get_collection_stats()
            print(f"\n📊 Collection Stats:")
            print(f"   Total documents: {stats['total_documents']}")
            print(f"   Vector DB: {stats['persist_directory']}")
        else:
            print("⚠️ No textual lesson content found in database to ingest.")

if __name__ == "__main__":
    ingest_from_db()
