import { describe, expect, it } from 'vitest';
import { FOUNDATION_MODULES, FOUNDATION_LESSONS, FOUNDATION_LESSON_IDS, createFoundationLessons,
  resolveFoundationLesson, migrateFoundationCompletion, foundationProgress, foundationNeighbors, foundationRecap } from '../curriculum';
import { enTranslations, jaTranslations } from '../../../config/translations';
import { ICAD_FOUNDATIONS_LESSONS, PRESERVED_FOUNDATIONS_LESSONS } from '../../../views/mentor/mentorConstants';
import { SELECTING_GEOMETRY_VIDEO_STEPS, COPY_VIDEO_STEPS, DELETE_VIDEO_STEPS } from '../VideoTutorial_EN/MoveCopyDeleteVideo';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';

describe('Excel Foundations curriculum', () => {
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
  it('defines exactly the ten ordered modules and all 60 uniquely numbered items', () => {
    expect(FOUNDATION_MODULES.map(module => module.id)).toEqual(['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10']);
    expect(FOUNDATION_MODULES.map(module => module.lessons.length)).toEqual([6,2,4,3,3,9,8,6,13,6]);
    expect(FOUNDATION_LESSONS).toHaveLength(60);
    expect(new Set(FOUNDATION_LESSON_IDS).size).toBe(60);
    for (const module of FOUNDATION_MODULES) module.lessons.forEach((lesson, index) => {
      expect(lesson.id).toBe(module.id === 'F2' ? ['F2.1', 'F2.9'][index] : module.id === 'F3' ? ['F3.1','F3.3','F3.5','F3.6'][index] : module.id === 'F4' ? ['F4.1','F4.6','F4.12'][index] : module.id === 'F5' ? ['F5.1','F5.4','F5.6'][index] : `${module.id}.${index + 1}`);
      expect(lesson.moduleId).toBe(module.id);
    });
    expect(ICAD_FOUNDATIONS_LESSONS).toEqual(createFoundationLessons());
  });

  it('includes only beginner shapes and transformations and preserves advanced sources outside navigation', () => {
    expect(FOUNDATION_LESSONS.filter(lesson => lesson.renderer?.startsWith('basic-op')).map(lesson => lesson.title.en))
      .toEqual(['Creating a Box', 'Creating a Cylinder', 'Creating a Polygon']);
    expect(FOUNDATION_LESSONS.filter(lesson => lesson.renderer?.startsWith('lesson-6')).map(lesson => lesson.title.en))
      .toEqual(['Basic Move', 'Basic Copy', 'Basic Delete']);
    const active = JSON.stringify(createFoundationLessons());
    expect(active).not.toMatch(/Cone|Torus|Mirror Copy|Rotate Copy|Practical Assessment|Guided Exercise|Basic 2D Geometry|Troubleshooting/);
    const preserved = PRESERVED_FOUNDATIONS_LESSONS.flatMap(module => module.children || [module]);
    for (const id of ['basic-op-cone','basic-op-torus','lesson-6-2','lesson-6-3','lesson-6-5','lesson-6-6','lesson-7-1','lesson-12-1','lesson-13-1']) {
      expect(preserved.find(lesson => lesson.id === id)).toBeDefined();
      expect(resolveFoundationLesson(id)).toBeUndefined();
    }
  });

  it('has complete bilingual titles, instructional text and recaps without translation keys', () => {
    for (const lesson of FOUNDATION_LESSONS) {
      expect(enTranslations[`lesson.title.${lesson.id}`]).toContain(lesson.title.en);
      expect(jaTranslations[`lesson.title.${lesson.id}`]).toContain(lesson.title.ja);
      // F4.1 intentionally includes the user-supplied Japanese command names.
      if (!['F4.1','F4.6','F4.12'].includes(lesson.id)) expect(JSON.stringify(lesson.content.en)).not.toMatch(/[\u3040-\u30ff\u3400-\u9fff]/);
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
    expect(foundationNeighbors('lesson-3-1')).toEqual({previous:'F3.1',next:'F3.5'});
    expect(foundationNeighbors('lesson-13-1')).toEqual({previous:undefined,next:undefined});
  });

  it('migrates only audited equivalents, deduplicates and never counts removed or unknown records', () => {
    const old = ['lesson-3-1','F3.3','lesson-4-2','lesson-13-1','lesson-6-3','origin-layout','bogus'];
    expect(migrateFoundationCompletion(old)).toEqual(['F3.3','F4.6']);
    expect(old).toHaveLength(7);
    expect(foundationProgress(old)).toEqual({completed:['F3.3','F4.6'],total:60,percentage:2/60*100});
    expect(foundationProgress(FOUNDATION_LESSON_IDS).percentage).toBe(100);
    expect(migrateFoundationCompletion(['lesson-1-1','lesson-10-1'])).toEqual(['F1.1','F8.3']);
    expect(migrateFoundationCompletion(['F3','module-1'])).toEqual([]);
  });

  it('resolves legacy bookmarks independently of split completion credit', () => {
    const aliases = FOUNDATION_LESSONS.flatMap(lesson => lesson.routeAliases);
    expect(new Set(aliases).size).toBe(aliases.length);
    expect(resolveFoundationLesson('lesson-3-1')?.id).toBe('F3.3');
    expect(resolveFoundationLesson('basic-op-box')?.id).toBe('F9.5');
    expect(resolveFoundationLesson('move')?.id).toBe('F9.9');
    expect(resolveFoundationLesson('lesson-5-1')?.id).toBe('F5.4');
  });

  it('reuses verified video IDs and the original operation timing objects', () => {
    const preserved = PRESERVED_FOUNDATIONS_LESSONS.flatMap(module => module.children || [module]);
    for (const lesson of FOUNDATION_LESSONS.filter(item => item.renderer)) {
      expect(preserved.find(item => item.id === lesson.renderer), lesson.id).toBeDefined();
    }
    const expected = [['F9.9','basicMove',SELECTING_GEOMETRY_VIDEO_STEPS],['F9.10','basicCopy',COPY_VIDEO_STEPS],['F9.11','basicDelete',DELETE_VIDEO_STEPS]] as const;
    for (const [id, videoId, steps] of expected) {
      const lesson = resolveFoundationLesson(id)!;
      const source = preserved.find(item => item.id === lesson.renderer)!;
      expect(source.videoId).toBe(videoId);
      expect(lesson.video).toBe(videoId);
      expect(source.videoSteps).toBe(steps);
    }
    expect(FOUNDATION_LESSONS.filter(lesson => lesson.video).map(lesson => lesson.id))
      .toEqual(['F3.3','F3.5','F3.6','F4.1','F4.6','F9.5','F9.6','F9.7','F9.9','F9.10','F9.11']);
    for (const id of ['F2.1','F2.9']) {
      expect(resolveFoundationLesson(id)?.type).toBe('interactive');
      expect(resolveFoundationLesson(id)?.video).toBeNull();
    }
    for (const lesson of FOUNDATION_LESSONS.filter(item => !item.renderer)) expect(lesson.video).toBeNull();
  });

  it('provides a bilingual five-topic knowledge check with one answer per question', () => {
    for (const lang of ['en','ja'] as const) {
      const questions = foundationKnowledgeQuestions(lang);
      expect(questions).toHaveLength(5);
      questions.forEach(question => {
        expect(question.choices).toHaveLength(3);
        expect(question.choices.filter(choice => choice.isCorrect)).toHaveLength(1);
        expect(question.choices.every(choice => choice.feedback)).toBe(true);
      });
    }
  });
});
