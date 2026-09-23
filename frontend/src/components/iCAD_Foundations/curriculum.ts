import registry from '../../../../data/foundations-curriculum.json';
import professionalRegistry from '../../../../data/professional-curriculum.json';
import type { Lesson } from '../../views/mentor/mentorConstants';

export type FoundationLanguage = 'en' | 'ja';
export interface FoundationLessonContent {
  explanation: string;
  practice: string;
  description2?: string;
  sections?: Array<{ title: string; text: string }>;
  quickReview?: string;
  connection?: string;
}
export interface FoundationLesson {
  id: string;
  sourceProfessionalLessonId?: string;
  completionId?: string;
  presentationId?: string;
  presentationModuleId?: string;
  /** Sidebar numbering may change without reassigning historical completion records. */
  displayId?: string;
  moduleId: string;
  title: Record<FoundationLanguage, string>;
  type: string;
  renderer: string | null;
  video: string | null;
  routeAliases: string[];
  completionAliases: string[];
  content: Record<FoundationLanguage, FoundationLessonContent>;
  contentReview: string;
  recapMode: string;
}
export interface FoundationModule {
  id: string;
  title: Record<FoundationLanguage, string>;
  lessons: FoundationLesson[];
}
const professionalSources = (professionalRegistry.modules as Array<{ lessons: Array<FoundationLesson & { sourceLessonId?: string }> }>).flatMap(module => module.lessons);
/** Renumber course cross-references without editing the authored source. */
export function foundationReferenceText(text: string): string {
  return text.replace(/\bP(\d+)(\.\d+)?\b/g, (reference, module, suffix = '') => {
    if (reference === 'P6.2') return 'F8.2';
    const number = Number(module);
    // P1/P2/P3 are also geometric point labels; they must not be renumbered.
    return number >= 7 && number <= 13 ? 'F' + (number + 2) + suffix : reference;
  });
}
export const FOUNDATION_MODULES: FoundationModule[] = registry.modules.map(module => ({
  ...module,
  lessons: module.lessons.map(reference => {
    if (!('sourceProfessionalLessonId' in reference)) return reference as FoundationLesson;
    const source = professionalSources.find(lesson => lesson.id === reference.sourceProfessionalLessonId);
    if (!source) throw new Error(`Missing Professional source: ${reference.sourceProfessionalLessonId}`);
    const presentationId = 'sourceLessonId' in source && source.sourceLessonId || source.id;
    return { ...source, ...reference, content: JSON.parse(foundationReferenceText(JSON.stringify(source.content))), presentationId,
      presentationModuleId: presentationId.startsWith('F9.') ? 'F9' : source.moduleId } as FoundationLesson;
  }),
}));
export const FOUNDATION_LESSONS = FOUNDATION_MODULES.flatMap(module => module.lessons);
export const FOUNDATION_LESSON_IDS = FOUNDATION_LESSONS.map(lesson => lesson.id);
export const FOUNDATION_TOTAL = FOUNDATION_LESSONS.length;

export function resolveFoundationLesson(id: string): FoundationLesson | undefined {
  return FOUNDATION_LESSONS.find(lesson => lesson.id === id) || FOUNDATION_LESSONS.find(lesson => lesson.routeAliases.includes(id));
}

/** Version stored alongside the last-open lesson prevents ambiguous F9/F10 restores. */
export function restoreFoundationLesson(id: string, version: string | null): FoundationLesson | undefined {
  if (version !== '3' && /^F(?:9|10)\./.test(id)) {
    return FOUNDATION_LESSONS.find(lesson => lesson.completionAliases.includes(id))
      || resolveFoundationLesson(id.startsWith('F10.') ? 'F16.1' : 'F9.1');
  }
  return resolveFoundationLesson(id);
}

/** Read-only projection: old records remain intact, and only audited equivalents earn credit. */
export function migrateFoundationCompletion(ids: readonly string[]): string[] {
  const completed = new Set(ids);
  return FOUNDATION_LESSONS.filter(lesson => completed.has(lesson.completionId || lesson.id) ||
    lesson.completionAliases.some(alias => completed.has(alias))).map(lesson => lesson.id);
}

export function foundationProgress(ids: readonly string[]) {
  const completed = migrateFoundationCompletion(ids);
  return { completed, total: FOUNDATION_TOTAL, percentage: completed.length / FOUNDATION_TOTAL * 100 };
}

export function foundationNeighbors(id: string) {
  const index = FOUNDATION_LESSON_IDS.indexOf(resolveFoundationLesson(id)?.id || '');
  return { previous: index > 0 ? FOUNDATION_LESSON_IDS[index - 1] : undefined,
    next: index >= 0 ? FOUNDATION_LESSON_IDS[index + 1] : undefined };
}

export function createFoundationLessons(language: FoundationLanguage = 'en'): Lesson[] {
  return FOUNDATION_MODULES.map(module => ({ id: module.id, title: `${module.id} ${module.title[language]}`,
    children: module.lessons.map(lesson => ({ id: lesson.id, title: `${lesson.displayId || lesson.id} ${lesson.title[language]}`,
      content: foundationReadingText(lesson.content[language]) })) }));
}

export function foundationReadingText(content: FoundationLessonContent): string[] {
  return [content.explanation, content.description2, content.practice,
    ...(content.sections || []).flatMap(section => [section.title, section.text]), content.quickReview, content.connection]
    .filter((text): text is string => Boolean(text)).map(text => text.replace(/\*\*/g, ''));
}

export function foundationTranslations(language: FoundationLanguage): Record<string, string> {
  return Object.fromEntries([...FOUNDATION_MODULES, ...FOUNDATION_LESSONS]
    .map(item => [`lesson.title.${item.id}`, `${'displayId' in item && item.displayId || item.id} ${item.title[language]}`]));
}

export function foundationRecap(id: string, language: FoundationLanguage = 'en') {
  const lesson = resolveFoundationLesson(id);
  if (!lesson) return undefined;
  const content = lesson.content[language];
  const explanation = [content.explanation, content.description2].filter(Boolean).join(' ').replace(/\*\*/g, '');
  const review = (content.quickReview || content.practice).replace(/\*\*/g, '');
  return {
    narration: `${language === 'ja' ? '学習内容を振り返りましょう。' : 'Great work. Remember: '}${explanation} ${review}`,
    items: [{ action: language === 'ja' ? '理解' : 'Understand', result: explanation },
      { action: language === 'ja' ? '確認' : 'Check', result: review }],
  };
}
