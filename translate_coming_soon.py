import sys
lv_path = r'i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/views/mentor/components/LessonViewer.tsx'
with open(lv_path, 'r', encoding='utf-8') as f:
    lv_code = f.read()

lv_code = lv_code.replace('<p>Lesson content for <strong>{activeLessonId}</strong> will be provided soon.</p>', '<p>{t(\'lesson.coming_soon\')} <strong>{activeLessonId}</strong></p>')

with open(lv_path, 'w', encoding='utf-8') as f:
    f.write(lv_code)

en_path = r'i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/config/translations/en/components/lesson_viewer.ts'
ja_path = r'i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/config/translations/ja/components/lesson_viewer.ts'

with open(en_path, 'r', encoding='utf-8') as f:
    en_code = f.read()
en_code = en_code.replace('"lesson.stop_reading": "Stop Reading",', '"lesson.stop_reading": "Stop Reading",\n  "lesson.coming_soon": "Lesson content will be provided soon:",')
with open(en_path, 'w', encoding='utf-8') as f:
    f.write(en_code)

with open(ja_path, 'r', encoding='utf-8') as f:
    ja_code = f.read()
ja_code = ja_code.replace('"lesson.stop_reading": "読み上げを停止",', '"lesson.stop_reading": "読み上げを停止",\n  "lesson.coming_soon": "レッスンコンテンツは近日公開予定です:",')
with open(ja_path, 'w', encoding='utf-8') as f:
    f.write(ja_code)

print("Done")
