import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import FoundationModelingProcess from '../../iCAD_Foundations/FoundationModelingProcess';
import FoundationStretchSteps from '../../iCAD_Foundations/FoundationStretchSteps';
import FoundationResizeSteps from '../../iCAD_Foundations/FoundationResizeSteps';
import FoundationShapeSteelLesson from '../../iCAD_Foundations/FoundationShapeSteelLesson';
import { PROFESSIONAL_SHAPE_SCREENS } from '../../iCAD_Foundations/professionalShapeScreens';
import { resolveFoundationLesson } from '../../iCAD_Foundations/curriculum';
import { foundationKnowledgeQuestions } from '../../iCAD_Foundations/knowledgeCheck';
import { createProfessionalLessons, PROFESSIONAL_COURSE_TYPE, PROFESSIONAL_LESSONS, professionalRenderLesson, resolveProfessionalLesson } from '../curriculum';

vi.mock('../../../context/LanguageContext', () => ({ useTranslation: () => ({ language: 'en', t: (s: string) => s }) }));
afterEach(cleanup);

describe('iCAD Professional curriculum', () => {
  it.each(PROFESSIONAL_LESSONS.map(lesson => lesson.id))('provides a complete bilingual knowledge check for %s', id => {
    const rendered = professionalRenderLesson(id)!;
    for (const language of ['en', 'ja'] as const) {
      const questions = foundationKnowledgeQuestions(language, rendered.id);
      expect(questions).toHaveLength(1);
      for (const question of questions) {
        expect(question.prompt.trim()).not.toBe('');
        expect(question.choices).toHaveLength(4);
        expect(new Set(question.choices.map(choice => choice.id)).size).toBe(4);
        expect(question.choices.filter(choice => choice.isCorrect)).toHaveLength(1);
        question.choices.forEach(choice => expect(choice.feedback.trim()).not.toBe(''));
      }
    }
  });

  it('copies Foundations lessons and adds Cone and Torus in P7', () => {
    expect(PROFESSIONAL_COURSE_TYPE).toBe('iCAD_Professional');
    expect(PROFESSIONAL_LESSONS.map(lesson => [lesson.id, lesson.sourceLessonId ?? null])).toEqual([
      ['P1.1', 'F1.2'], ['P1.2', 'F1.3'], ['P1.3', 'F1.6'], ['P2.1', 'F2.1'], ['P2.2', 'F2.9'],
      ['P3.1', 'F3.1'], ['P3.2', 'F3.5'], ['P3.3', 'F3.6'],
      ['P4.1', 'F4.1'], ['P4.2', 'F4.6'], ['P4.3', 'F4.12'],
      ['P5.1', 'F5.1'], ['P5.2', 'F5.4'], ['P5.3', 'F5.6'],
      ['P6.1', 'F8.1'], ['P6.2', 'F8.3'], ['P6.3', 'F8.5'],
      ['P7.1', 'F9.5'], ['P7.2', 'F9.6'], ['P7.3', 'F9.7'], ['P7.4', null], ['P7.5', null],
      ['P8.1', 'F9.9'], ['P8.2', 'F9.10'], ['P8.3', null], ['P8.4', null], ['P8.5', null], ['P8.6', null], ['P8.7', 'F9.11'],
      ['P9.1', null],
      ['P10.1', null], ['P10.2', null],
      ['P11.1', null], ['P11.2', null], ['P11.3', null], ['P11.4', null],
      ['P12.1', null], ['P12.2', null], ['P12.3', null],
    ]);
    for (const lesson of PROFESSIONAL_LESSONS.filter(item => item.sourceLessonId && !['P7', 'P8', 'P9', 'P10'].includes(item.moduleId))) {
      const source = resolveFoundationLesson(lesson.sourceLessonId!)!;
      expect(lesson.title).toEqual(source.title);
      for (const lang of ['en', 'ja'] as const) {
        expect(lesson.content[lang].explanation).toEqual(source.content[lang].explanation);
        expect(lesson.content[lang].sections?.map(section => section.title)).toEqual(source.content[lang].sections?.map(section => section.title));
        // Professional keeps the source layout but links to its own lesson numbers.
        expect(JSON.stringify(lesson.content[lang])).not.toMatch(/\bF\d+\.\d+\b/);
        expect(lesson.content[lang].connection || '').not.toMatch(/\bF\d+\b/);
      }
    }
  });

  it('builds the P7 sidebar titles in both languages', () => {
    expect(createProfessionalLessons('en')[6]).toMatchObject({ title: 'P7 Creating Basic Shapes' });
    expect(createProfessionalLessons('en')[6].children!.map(child => child.title)).toEqual(['P7.1 Box', 'P7.2 Cylinder', 'P7.3 Polygon', 'P7.4 Cone', 'P7.5 Torus']);
    expect(createProfessionalLessons('ja')[6].children!.map(child => child.title)).toEqual(['P7.1 直方体', 'P7.2 円柱', 'P7.3 正多角柱', 'P7.4 円錐台', 'P7.5 トーラス']);
  });

  it('builds the P8 sidebar titles in both languages', () => {
    expect(createProfessionalLessons('en')[7]).toMatchObject({ title: 'P8 Move, Copy, Delete' });
    expect(createProfessionalLessons('en')[7].children!.map(child => child.title)).toEqual([
      'P8.1 Move', 'P8.2 Copy', 'P8.3 Rotate', 'P8.4 Rotate Copy', 'P8.5 Mirror', 'P8.6 Mirror Copy', 'P8.7 Delete'
    ]);
    expect(createProfessionalLessons('ja')[7].children!.map(child => child.title)).toEqual([
      'P8.1 移動', 'P8.2 複写', 'P8.3 回転', 'P8.4 回転複写', 'P8.5 ミラー', 'P8.6 ミラー複写', 'P8.7 削除'
    ]);
  });

  it('builds the P9 sidebar titles in both languages', () => {
    expect(createProfessionalLessons('en')[8]).toMatchObject({ title: 'P9 Sketch' });
    expect(createProfessionalLessons('en')[8].children!.map(child => child.title)).toEqual(['P9.1 Sketch']);
    expect(createProfessionalLessons('ja')[8].children!.map(child => child.title)).toEqual(['P9.1 スケッチ']);
  });

  it('builds the P10 sidebar titles in both languages', () => {
    expect(createProfessionalLessons('en')[9]).toMatchObject({ title: 'P10 3D Creation from sketch' });
    expect(createProfessionalLessons('en')[9].children!.map(child => child.title)).toEqual(['P10.1 Extrude', 'P10.2 Revolve']);
    expect(createProfessionalLessons('ja')[9].children!.map(child => child.title)).toEqual(['P10.1 押し出し', 'P10.2 回転体']);
  });

  it('builds the P12 sidebar titles in both languages', () => {
    expect(createProfessionalLessons('en')[11]).toMatchObject({ title: 'P12 Stretch / Shape / Cut' });
    expect(createProfessionalLessons('en')[11].children!.map(child => child.title)).toEqual(['P12.1 Stretch', 'P12.2 Resize', 'P12.3 Creating Shape Steels']);
    expect(createProfessionalLessons('ja')[11].children!.map(child => child.title)).toEqual(['P12.1 伸縮', 'P12.2 立体縮尺', 'P12.3 形鋼の作成']);
  });

  it('renders copies under their Foundations source id and new shapes as themselves', () => {
    expect(professionalRenderLesson('P7.1')).toMatchObject({ id: 'F9.5', moduleId: 'F9', title: resolveProfessionalLesson('P7.1')!.title });
    expect(professionalRenderLesson('P7.4')).toMatchObject({ id: 'P7.4', moduleId: 'P7', renderer: 'basic-op-cone' });
    expect(professionalRenderLesson('P9.1')).toMatchObject({ id: 'P9.1', moduleId: 'P9', renderer: 'basic-op-sketch' });
    expect(professionalRenderLesson('P10.1')).toMatchObject({ id: 'P10.1', moduleId: 'P10', renderer: 'basic-op-extrude' });
    expect(professionalRenderLesson('F2.9')).toBeUndefined();
  });

  it('asks correct knowledge-check questions for P8.1, P9.1, P10.1, P10.2', () => {
    const [p81] = foundationKnowledgeQuestions('en', 'P8.1');
    expect(p81.choices.find(choice => choice.isCorrect)!.label).toBe('B. X, Y, Z Input');

    const [p91] = foundationKnowledgeQuestions('en', 'P9.1');
    expect(p91.choices.find(choice => choice.isCorrect)!.label).toContain('create lines, circles, arcs');

    const [p101] = foundationKnowledgeQuestions('en', 'P10.1');
    expect(p101.choices.find(choice => choice.isCorrect)!.label).toContain('Creates a 3D solid by projecting');

    const [p102] = foundationKnowledgeQuestions('en', 'P10.2');
    expect(p102.choices.find(choice => choice.isCorrect)!.label).toContain('An enclosed sketch cross-section and an axis of rotation');
  });

  it('asks shape-specific knowledge-check questions for Cone and Torus', () => {
    for (const [id, answer] of [['P7.4', 'Base Diameter, Top Diameter, and Height'], ['P7.5', 'Section Diameter, Path Radius, and Turn Angle']] as const) {
      const [question] = foundationKnowledgeQuestions('en', id);
      expect(question.choices.find(choice => choice.isCorrect)!.label).toBe(`A. ${answer}`);
    }
  });

  it('renders both P12.1 Stretch methods as three-card grids', () => {
    const lesson = resolveProfessionalLesson('P12.1')!;
    for (const [sectionIndex,method] of [[1,1],[2,2]] as const) {
      const { container,unmount } = render(<FoundationStretchSteps text={lesson.content.en.sections![sectionIndex].text} method={method} japanese={false}/>);
      expect(container.querySelectorAll('.foundations-use-card')).toHaveLength(3);
      unmount();
    }
    const [question] = foundationKnowledgeQuestions('en','P12.1');
    expect(question.choices.find(choice=>choice.isCorrect)!.label).toBe('B. The face to be stretched');
  });

  it('renders P12.2 Resize as a connected three-step lesson', () => {
    const lesson = resolveProfessionalLesson('P12.2')!;
    const { container } = render(<FoundationResizeSteps text={lesson.content.en.sections![0].text} japanese={false}/>);
    expect(container.querySelectorAll('.foundations-use-card')).toHaveLength(3);
    expect(lesson.content.en.connection).toContain('P12.1 Stretch');
    const [question] = foundationKnowledgeQuestions('en','P12.2');
    expect(question.choices.find(choice=>choice.isCorrect)!.label).toBe('B. The entire selected solid');
  });

  it('renders P12.3 shape profiles and placement workflow', () => {
    const lesson=resolveProfessionalLesson('P12.3')!;
    const profiles=render(<FoundationShapeSteelLesson text={lesson.content.en.sections![0].text} profiles/>);
    expect(profiles.container.querySelectorAll('.foundations-use-card')).toHaveLength(7);
    profiles.unmount();
    const workflow=render(<FoundationShapeSteelLesson text={lesson.content.en.sections![1].text}/>);
    expect(workflow.container.querySelectorAll('.foundations-use-card')).toHaveLength(3);
    const [question]=foundationKnowledgeQuestions('en','P12.3');
    expect(question.choices.find(choice=>choice.isCorrect)!.label).toBe('B. Key Entry Area');
  });

  it('has a Professional screenshot with measured regions for every P7 shape', () => {
    for (const screen of Object.values(PROFESSIONAL_SHAPE_SCREENS)) {
      expect(screen.src).toMatch(/modeling\/professional\/(box|cylinder|polygon|cone|torus)\.(jpg|png)/);
      for (const region of [screen.front, screen.orientation, screen.placement, screen.itemEntry, screen.keyEntry]) {
        expect(region[0] + region[2]).toBeLessThanOrEqual(1920);
        expect(region[1] + region[3]).toBeLessThanOrEqual(1080);
      }
    }
  });

  it.each([['cone', ['底面直径', '上面直径', '高さ']], ['torus', ['断面直径', '経路半径', '回転角']]] as const)('shows the %s Item Entry fields on the six shape cards', (shape, labels) => {
    const lesson = resolveProfessionalLesson(shape === 'cone' ? 'P7.4' : 'P7.5')!;
    const { container } = render(<FoundationModelingProcess text={lesson.content.en.sections![0].text} cone={shape === 'cone'} torus={shape === 'torus'} />);
    expect(container.querySelectorAll('.foundations-use-card')).toHaveLength(6);
    const fields = container.querySelector('.foundation-modeling-size-fields')!;
    for (const label of labels) expect(fields.textContent).toContain(label);
  });

  it.each([
    ['P8.1', 'move', 0, 4],
    ['P8.2', 'copy', 0, 4],
    ['P8.3', 'rotate', 0, 4],
    ['P8.4', 'rotateCopy', 0, 4],
    ['P8.5', 'mirror', 0, 4],
    ['P8.6', 'mirrorCopy', 0, 4],
    ['P8.7', 'deleting', 0, 4],
    ['P9.1', 'sketch', 2, 3],
    ['P10.1', 'extrude', 0, 5],
    ['P10.1', 'extrude', 1, 5],
    ['P10.2', 'revolve', 0, 4]
  ] as const)('renders consistent step cards for %s (%s)', (id, prop, sectionIndex, count) => {
    const lesson = resolveProfessionalLesson(id)!;
    const { container } = render(<FoundationModelingProcess text={lesson.content.en.sections![sectionIndex].text} {...{ [prop]: true }} />);
    expect(container.querySelectorAll('.foundations-use-card')).toHaveLength(count);
  });
});
