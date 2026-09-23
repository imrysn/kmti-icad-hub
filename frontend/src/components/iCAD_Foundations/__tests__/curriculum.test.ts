import { describe, expect, it } from 'vitest';
import { FOUNDATION_MODULES, FOUNDATION_LESSONS, FOUNDATION_LESSON_IDS, createFoundationLessons,
  resolveFoundationLesson, migrateFoundationCompletion, foundationProgress, foundationNeighbors, foundationRecap, foundationReferenceText, restoreFoundationLesson } from '../curriculum';
import { enTranslations, jaTranslations } from '../../../config/translations';
import { ICAD_FOUNDATIONS_LESSONS } from '../../../views/mentor/mentorConstants';
import { resolveProfessionalLesson, professionalRenderLesson } from '../../iCAD_Professional/curriculum';
import { sourceKnowledgeQuestions, foundationKnowledgeQuestions } from '../knowledgeCheck';

describe('Excel Foundations curriculum', () => {
  it('moves Review to F16 without giving old review credit to Move', () => {
    expect(createFoundationLessons().find(module => module.id === 'F16')!.children!.map(lesson => lesson.title))
      .toEqual(['F16.1 Foundation Review', 'F16.2 Foundation Knowledge Check']);
    expect(foundationNeighbors('F16.1').next).toBe('F16.2');
    expect(migrateFoundationCompletion(['F10.1','F10.6'])).toEqual(['F16.1','F16.2']);
    expect(migrateFoundationCompletion(['F10.2','F10.3','F10.4','F10.5'])).toEqual([]);
    expect(resolveFoundationLesson('F16.1')!.content.en.sections).toHaveLength(10);
  });
  it('keeps only the three requested F6 topics with their existing stored IDs', () => {
    expect(createFoundationLessons().find(module => module.id === 'F6')!.children!.map(lesson => lesson.title))
      .toEqual(['F6.1 Basic Element Selection', 'F6.2 Selecting Parts and Solid Components', 'F6.3 Search / Selection Type']);
    expect(FOUNDATION_MODULES.find(module => module.id === 'F6')!.lessons.map(lesson => lesson.id))
      .toEqual(['F6.2', 'F6.4', 'F6.7']);
    expect(migrateFoundationCompletion(['F6.1', 'F6.3', 'F6.5', 'F6.6', 'F6.8', 'F6.9'])).toEqual([]);
  });
  it('shows three F5 topics and retains original topic bookmarks and completion IDs', () => {
    expect(createFoundationLessons().find(module => module.id === 'F5')!.children!.map(lesson => lesson.title))
      .toEqual(['F5.1 Keyboard Basics','F5.2 Understanding Coordinates and the Origin','F5.3 Specifying Coordinates']);
    expect(resolveFoundationLesson('F5.2')?.id).toBe('F5.1');
    expect(resolveFoundationLesson('F5.3')?.id).toBe('F5.4');
    expect(resolveFoundationLesson('F5.7')?.id).toBe('F5.6');
    expect(resolveFoundationLesson('origin-projections')?.renderer).toBe('origin-projections');
    expect(migrateFoundationCompletion(['F5.2','F5.3'])).toEqual([]);
  });
  it('shows the three requested F4 lessons without reassigning old completion records', () => {
    expect(createFoundationLessons().find(module => module.id === 'F4')!.children!.map(lesson => lesson.title))
      .toEqual(['F4.1 3D VIEWS','F4.2 USER VIEWS','F4.3 SHADING']);
    expect(resolveFoundationLesson('F4.2')?.id).toBe('F4.1');
    expect(resolveFoundationLesson('F4.7')?.id).toBe('F4.6');
    expect(migrateFoundationCompletion(['F4.2'])).not.toContain('F4.6');
    expect(resolveFoundationLesson('F4.12')!.content.en.sections!.map(section => section.title))
      .toEqual(['Shading Modes','How to Change the Shading','When to Use Each Mode','Important Reminder']);
  });
  it('restores old saved lessons using the curriculum version', () => {
    expect(foundationReferenceText('Click P1, P2, P3; see P9 Sketch and P6.2.')).toBe('Click P1, P2, P3; see F11 Sketch and F8.2.');
    expect(restoreFoundationLesson('F10.1',null)?.id).toBe('F16.1');
    expect(restoreFoundationLesson('F10.6',null)?.id).toBe('F16.2');
    expect(restoreFoundationLesson('F9.5',null)?.id).toBe('F9.1');
    expect(restoreFoundationLesson('F9.5','3')?.id).toBe('F9.5');
    expect(restoreFoundationLesson('F10.1','3')?.id).toBe('F10.1');
  });
  it('defines sixteen ordered modules and 51 unique lessons', () => {
    expect(FOUNDATION_MODULES.map(module => module.id)).toEqual(Array.from({length:16},(_,i)=>'F'+(i+1)));
    expect(FOUNDATION_MODULES.map(module => module.lessons.length)).toEqual([6,2,3,3,3,3,4,3,5,8,1,2,4,1,1,2]);
    expect(FOUNDATION_LESSONS).toHaveLength(51);
    expect(new Set(FOUNDATION_LESSON_IDS).size).toBe(51);
    expect(ICAD_FOUNDATIONS_LESSONS).toEqual(createFoundationLessons());
  });
  it('reuses all Professional data and assessments under Foundation numbering', () => {
    for (const lesson of FOUNDATION_LESSONS.filter(l=>l.sourceProfessionalLessonId)) {
      const source=resolveProfessionalLesson(lesson.sourceProfessionalLessonId!)!;
      expect(lesson.content).toEqual(JSON.parse(foundationReferenceText(JSON.stringify(source.content))));
      expect(lesson.renderer).toBe(source.renderer);
      expect(lesson.video).toBe(source.video);
      expect(lesson.title).toEqual(source.title);
      const rendered=professionalRenderLesson(source.id)!;
      for(const lang of ['en','ja'] as const) expect(foundationKnowledgeQuestions(lang,lesson.id)).toEqual(sourceKnowledgeQuestions(lang,rendered.id));
    }
    expect(migrateFoundationCompletion(['F9.1'])).toEqual([]);
    expect(migrateFoundationCompletion(['F9.5'])).toEqual(['F9.1']);
    expect(migrateFoundationCompletion(['foundations-v3:F9.5'])).toEqual(['F9.5']);
    expect(migrateFoundationCompletion(['foundations-v3:F10.1'])).toEqual(['F10.1']);
  });

  it('has complete bilingual titles, instructional text and recaps without translation keys', () => {
    for (const lesson of FOUNDATION_LESSONS) {
      expect(enTranslations[`lesson.title.${lesson.id}`]).toContain(lesson.title.en);
      expect(jaTranslations[`lesson.title.${lesson.id}`]).toContain(lesson.title.ja);
      // F4, F8, and F9 (including the 移動コピー削除 Icon Menu section) intentionally include the user-supplied Japanese CAD UI command and dialog names.
      if (!lesson.sourceProfessionalLessonId && !['F1.5','F1.6','F5.6','F4.1','F4.6','F4.12','F8.3','F8.5','F9.1','F9.5','F9.6','F9.7','F9.9','F9.10','F9.11'].includes(lesson.id)) expect(JSON.stringify(lesson.content.en)).not.toMatch(/[\u3040-\u30ff\u3400-\u9fff]/);
      for (const lang of ['en','ja'] as const) {
        const content = lesson.content[lang];
        expect(content.explanation.length).toBeGreaterThan(15);
        expect(content.practice.length).toBeGreaterThan(15);
        expect(JSON.stringify(content)).not.toMatch(/TODO|TBD|placeholder|tutorial\.[a-z]+\.\d/);
        expect(foundationRecap(lesson.id, lang)?.items).toHaveLength(2);
      }
      expect(lesson.content.ja.explanation).toMatch(/[\u3040-\u30ff]/);
    }
  });

  it('navigates across all module boundaries using the same order', () => {
    expect(foundationNeighbors('F2.1').next).toBe('F2.9');
    expect(foundationNeighbors('F2.9').next).toBe('F3.1');
    for (const id of ['F2.2','F2.3','F2.4','F2.5','F2.6','F2.7','F2.8','F2.10','F2.11','F2.12','F2.13','F2.14','F2.15']) {
      expect(resolveFoundationLesson(id)).toBeUndefined();
      expect(migrateFoundationCompletion([id])).toEqual([]);
    }
    FOUNDATION_LESSON_IDS.forEach((id, index) => {
      expect(foundationNeighbors(id)).toEqual({ previous: FOUNDATION_LESSON_IDS[index - 1], next: FOUNDATION_LESSON_IDS[index + 1] });
    });
    expect(foundationNeighbors('lesson-3-1')).toEqual({previous:undefined,next:undefined});
    expect(foundationNeighbors('lesson-13-1')).toEqual({previous:undefined,next:undefined});
  });

  it('migrates only audited equivalents, deduplicates and never counts removed or unknown records', () => {
    const old = ['lesson-3-1','F3.3','lesson-4-2','lesson-13-1','lesson-6-3','origin-layout','bogus'];
    expect(migrateFoundationCompletion(old)).toEqual(['F4.6']);
    expect(old).toHaveLength(7);
    expect(foundationProgress(old)).toEqual({completed:['F4.6'],total:51,percentage:1/51*100});
    expect(foundationProgress(FOUNDATION_LESSONS.map(l=>l.completionId || l.id)).percentage).toBe(100);
    expect(migrateFoundationCompletion(['lesson-1-1','lesson-10-1'])).toEqual(['F1.1','F8.3']);
    expect(migrateFoundationCompletion(['F3','module-1'])).toEqual([]);
  });

  it('resolves legacy bookmarks independently of split completion credit', () => {
    const aliases = FOUNDATION_LESSONS.flatMap(lesson => lesson.routeAliases);
    expect(new Set(aliases).size).toBe(aliases.length);
    expect(resolveFoundationLesson('lesson-3-1')).toBeUndefined();
    expect(resolveFoundationLesson('basic-op-box')?.id).toBe('F9.1');
    expect(resolveFoundationLesson('move')?.id).toBe('F10.1');
    expect(resolveFoundationLesson('lesson-5-1')?.id).toBe('F5.4');
  });

  it('preserves original video and interactive renderer identities', () => {
    for(const lesson of FOUNDATION_LESSONS.filter(l=>l.sourceProfessionalLessonId)) {
      const source=resolveProfessionalLesson(lesson.sourceProfessionalLessonId!)!;
      expect(lesson.renderer).toBe(source.renderer);
      expect(lesson.video).toBe(source.video);
    }
    for (const id of ['F2.1','F2.9']) {
      expect(resolveFoundationLesson(id)?.type).toBe('interactive');
      expect(resolveFoundationLesson(id)?.video).toBeNull();
    }
  });
  it('provides a bilingual twelve-question knowledge check with one answer per question', () => {
    for (const lang of ['en','ja'] as const) {
      const questions = foundationKnowledgeQuestions(lang);
      expect(questions).toHaveLength(12);
      expect(questions.map(q => q.choices.findIndex(c => c.isCorrect))).toEqual([2,0,3,2,0,2,1,3,2,1,3,0]);
      questions.forEach(question => {
        expect(question.choices).toHaveLength(4);
        expect(question.choices.filter(choice => choice.isCorrect)).toHaveLength(1);
        expect(question.choices.every(choice => choice.feedback)).toBe(true);
      });
    }
  });
});

