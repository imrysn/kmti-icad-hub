import registry from '../../../../data/professional-curriculum.json';
import type { Lesson } from '../../views/mentor/mentorConstants';
import { foundationReadingText, resolveFoundationLesson, type FoundationLanguage, type FoundationLesson, type FoundationModule } from '../iCAD_Foundations/curriculum';

/** iCAD Professional uses the Foundations registry shape, so its lessons render with the same components. */
export const PROFESSIONAL_COURSE_TYPE = 'iCAD_Professional';
export interface ProfessionalLesson extends FoundationLesson {
  /** The Foundations lesson whose layout, cards, tutorial and knowledge check this lesson reuses. Omitted for Professional-only lessons. */
  sourceLessonId?: string;
}
export interface ProfessionalModule extends Omit<FoundationModule, 'lessons'> { lessons: ProfessionalLesson[] }
export const PROFESSIONAL_MODULES = registry.modules as unknown as ProfessionalModule[];
export const PROFESSIONAL_LESSONS = PROFESSIONAL_MODULES.flatMap(module => module.lessons);
export const PROFESSIONAL_TOTAL = PROFESSIONAL_LESSONS.length;

export function resolveProfessionalLesson(id: string): ProfessionalLesson | undefined {
  return PROFESSIONAL_LESSONS.find(lesson => lesson.id === id);
}

/** Professional content under its Foundations source id, so id-based layouts and questions match Foundations. Progress still uses the P id. */
export function professionalRenderLesson(id: string): FoundationLesson | undefined {
  const lesson = resolveProfessionalLesson(id);
  if (!lesson) return undefined;
  if (!lesson.sourceLessonId) return lesson;
  const source = resolveFoundationLesson(lesson.sourceLessonId);
  return source ? { ...lesson, id: source.id, moduleId: source.moduleId } : undefined;
}

export function createProfessionalLessons(language: FoundationLanguage = 'en'): Lesson[] {
  return PROFESSIONAL_MODULES.map(module => ({ id: module.id, title: `${module.id} ${module.title[language]}`,
    children: module.lessons.map(lesson => ({ id: lesson.id, title: `${lesson.id} ${lesson.title[language]}`,
      content: foundationReadingText(lesson.content[language]) })) }));
}
