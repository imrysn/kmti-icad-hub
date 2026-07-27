import sys

# 1. Update translations
en_path = r'i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/config/translations/en/components/lesson_viewer.ts'
ja_path = r'i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/config/translations/ja/components/lesson_viewer.ts'

en_new = """export const en_components_lesson_viewer = {
  "lesson.suspend_title": "SUSPEND LEARNING SESSION",
  "lesson.suspend_message": "Are you sure you want to disconnect? Your current progress has been safely synchronized. You will be returned to the module hub.",
  "lesson.suspend_confirm": "Suspend Session",
  "lesson.exit_course": "EXIT COURSE",
  "lesson.indicator": "Lesson {current} of {total}",
  "lesson.read_lesson": "Read Lesson",
  "lesson.read_lesson_aloud": "Read Lesson Aloud",
  "lesson.stop_reading": "Stop Reading",
};"""

ja_new = """export const ja_components_lesson_viewer = {
  "lesson.suspend_title": "学習セッションを中断",
  "lesson.suspend_message": "切断してもよろしいですか？現在の進捗状況は安全に同期されています。モジュールハブに戻ります。",
  "lesson.suspend_confirm": "セッションを中断",
  "lesson.exit_course": "コースを終了",
  "lesson.indicator": "レッスン {current} / {total}",
  "lesson.read_lesson": "レッスンを読む",
  "lesson.read_lesson_aloud": "レッスンを読み上げる",
  "lesson.stop_reading": "読み上げを停止",
};"""

with open(en_path, 'w', encoding='utf-8') as f: f.write(en_new)
with open(ja_path, 'w', encoding='utf-8') as f: f.write(ja_new)

# 2. Update LessonViewer.tsx
lv_path = r'i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/views/mentor/components/LessonViewer.tsx'
with open(lv_path, 'r', encoding='utf-8') as f:
    lv_code = f.read()

lv_code = lv_code.replace('>EXIT COURSE<', '>{t(\'lesson.exit_course\')}<')
lv_code = lv_code.replace('Lesson {currentLessonIndex + 1} of {allLessonIdsLength}', '{t(\'lesson.indicator\').replace(\'{current}\', String(currentLessonIndex + 1)).replace(\'{total}\', String(allLessonIdsLength))}')

with open(lv_path, 'w', encoding='utf-8') as f:
    f.write(lv_code)

# 3. Update ReadAloudButton.tsx
rab_path = r'i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/components/ReadAloudButton.tsx'
with open(rab_path, 'r', encoding='utf-8') as f:
    rab_code = f.read()

if 'useTranslation' not in rab_code:
    rab_code = rab_code.replace('import React', 'import { useTranslation } from "../context/LanguageContext";\nimport React')
    rab_code = rab_code.replace('export const ReadAloudButton: React.FC<ReadAloudButtonProps> = ({', 'export const ReadAloudButton: React.FC<ReadAloudButtonProps> = ({\n  const { t } = useTranslation();')

rab_code = rab_code.replace('title={isSpeaking ? "Stop Reading" : "Read Lesson Aloud"}', 'title={isSpeaking ? t(\'lesson.stop_reading\') : t(\'lesson.read_lesson_aloud\')}')
rab_code = rab_code.replace('<span>Read Lesson</span>', '<span>{t(\'lesson.read_lesson\')}</span>')

# wait, the export const might not have { right after it, let's fix insertion
rab_code_lines = rab_code.split('\\n')
# instead of complex replace, let's just do a robust one:
if 'const { t } = useTranslation();' not in rab_code:
    rab_code = rab_code.replace('const [error, setError]', 'const { t } = useTranslation();\\n  const [error, setError]')

with open(rab_path, 'w', encoding='utf-8') as f:
    f.write(rab_code)

print("Done translations and component updates")
