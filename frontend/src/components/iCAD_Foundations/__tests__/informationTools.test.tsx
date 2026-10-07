import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import InformationToolsContent from '../InformationToolsContent';
import { resolveFoundationLesson, restoreFoundationLesson, foundationNeighbors, foundationProgress } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';
afterEach(cleanup);
it.each(['en', 'ja'] as const)('shows five independent tools and both angle methods in %s', lang => {
    const lesson = resolveFoundationLesson('F24.1')!;
    const { container } = render(<>{lesson.content[lang].sections!.map((s, index) => <InformationToolsContent key={index} {...s} index={index} japanese={lang === 'ja'} />)}</>);
    expect(container.querySelectorAll('.information-tools .foundation-view-comparison__card')).toHaveLength(5);
    const icons = container.querySelectorAll('.information-reference-icon');
    expect(icons).toHaveLength(5);
    icons.forEach(icon => {
        expect(icon).toHaveAttribute('data-vector-construction', 'geometry');
        expect(icon.querySelector('image, rect, text')).toBeNull();
        expect(icon.querySelectorAll('path').length).toBeLessThan(15);
    });
    expect(container.querySelector('.foundations-uses__grid')).toBeNull();
    expect(screen.getAllByRole('table')).toHaveLength(1);
    for (const label of ['座標を表示する', '長さを測る', '距離を測る', '角度を測る', '要素情報を表示する']) expect(container.textContent).toContain(label);
    const q = foundationKnowledgeQuestions(lang, lesson.id)[0]; expect(q.choices.map(c => c.isCorrect)).toEqual([false, true, false, false]);
    expect(foundationNeighbors(lesson.id)).toEqual({ previous: 'foundation-properties-part-layer-designation', next: 'foundation-annotation-linear-dimension' });
});
it('restores old review routes without losing progress or newer Properties selections', () => {
    expect(restoreFoundationLesson('F24.1', '4')?.id).toBe('F17.1');
    expect(restoreFoundationLesson('F24.2', '4')?.id).toBe('F17.2');
    expect(restoreFoundationLesson('F24.1', '5')?.id).toBe('foundation-information-tools');
    expect(restoreFoundationLesson('F25.1', '5')?.id).toBe('F17.1');
    expect(restoreFoundationLesson('F25.2', '5')?.id).toBe('F17.2');
    expect(restoreFoundationLesson('F25.1', '6')?.id).toBe('foundation-annotation-linear-dimension');
    expect(restoreFoundationLesson('F23.1', '4')?.id).toBe('foundation-properties-change-color');
    expect(restoreFoundationLesson('F9.5', '4')?.id).toBe('F9.5');
    expect(foundationProgress(['F17.1', 'F17.2']).completed).toEqual(['F17.1', 'F17.2']);
    expect(resolveFoundationLesson('F25.1')?.id).toBe('foundation-annotation-linear-dimension');
    expect(resolveFoundationLesson('F26.1')?.id).toBe('foundation-interference-check');
    expect(resolveFoundationLesson('F26.1')?.id).toBe('foundation-interference-check');
    expect(resolveFoundationLesson('F28.1')?.id).toBe('F17.1');
});
