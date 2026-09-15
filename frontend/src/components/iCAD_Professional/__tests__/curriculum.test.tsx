import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import FoundationModelingProcess from '../../iCAD_Foundations/FoundationModelingProcess';
import { PROFESSIONAL_SHAPE_SCREENS } from '../../iCAD_Foundations/professionalShapeScreens';
import { resolveFoundationLesson } from '../../iCAD_Foundations/curriculum';
import { foundationKnowledgeQuestions } from '../../iCAD_Foundations/knowledgeCheck';
import { createProfessionalLessons, PROFESSIONAL_COURSE_TYPE, PROFESSIONAL_LESSONS, professionalRenderLesson, resolveProfessionalLesson } from '../curriculum';

vi.mock('../../../context/LanguageContext', () => ({ useTranslation: () => ({ language: 'en', t: (s: string) => s }) }));
afterEach(cleanup);

describe('iCAD Professional curriculum', () => {
  it('copies Foundations lessons and adds Cone and Torus in P7', () => {
    expect(PROFESSIONAL_COURSE_TYPE).toBe('iCAD_Professional');
    expect(PROFESSIONAL_LESSONS.map(lesson => [lesson.id, lesson.sourceLessonId ?? null])).toEqual([
      ['P1.1', 'F1.2'], ['P1.2', 'F1.3'], ['P1.3', 'F1.6'], ['P2.1', 'F2.1'], ['P2.2', 'F2.9'],
      ['P3.1', 'F3.1'], ['P3.2', 'F3.5'], ['P3.3', 'F3.6'],
      ['P4.1', 'F4.1'], ['P4.2', 'F4.6'], ['P4.3', 'F4.12'],
      ['P5.1', 'F5.1'], ['P5.2', 'F5.4'], ['P5.3', 'F5.6'],
      ['P6.1', 'F8.1'], ['P6.2', 'F8.3'], ['P6.3', 'F8.5'],
      ['P7.1', 'F9.5'], ['P7.2', 'F9.6'], ['P7.3', 'F9.7'], ['P7.4', null], ['P7.5', null],
    ]);
    for (const lesson of PROFESSIONAL_LESSONS.filter(item => item.sourceLessonId && item.moduleId !== 'P7')) {
      const source = resolveFoundationLesson(lesson.sourceLessonId!)!;
      expect(lesson.title).toEqual(source.title);
      expect(lesson.content).toEqual(source.content);
    }
  });

  it('builds the P7 sidebar titles in both languages', () => {
    expect(createProfessionalLessons('en')[6]).toMatchObject({ title: 'P7 Creating Basic Shapes' });
    expect(createProfessionalLessons('en')[6].children!.map(child => child.title)).toEqual(['P7.1 Box', 'P7.2 Cylinder', 'P7.3 Polygon', 'P7.4 Cone', 'P7.5 Torus']);
    expect(createProfessionalLessons('ja')[6].children!.map(child => child.title)).toEqual(['P7.1 直方体', 'P7.2 円柱', 'P7.3 正多角柱', 'P7.4 円錐台', 'P7.5 トーラス']);
  });

  it('renders copies under their Foundations source id and new shapes as themselves', () => {
    expect(professionalRenderLesson('P7.1')).toMatchObject({ id: 'F9.5', moduleId: 'F9', title: resolveProfessionalLesson('P7.1')!.title });
    expect(professionalRenderLesson('P7.4')).toMatchObject({ id: 'P7.4', moduleId: 'P7', renderer: 'basic-op-cone' });
    expect(professionalRenderLesson('F2.9')).toBeUndefined();
  });

  it('asks shape-specific knowledge-check questions for Cone and Torus', () => {
    for (const [id, answer] of [['P7.4', 'Base Diameter, Top Diameter, and Height'], ['P7.5', 'Section Diameter, Path Radius, and Turn Angle']] as const) {
      const [question] = foundationKnowledgeQuestions('en', id);
      expect(question.choices.find(choice => choice.isCorrect)!.label).toBe(`A. ${answer}`);
    }
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
});
