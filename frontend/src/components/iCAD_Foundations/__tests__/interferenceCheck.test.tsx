import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { foundationNeighbors, migrateFoundationCompletion, resolveFoundationLesson, restoreFoundationLesson } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';
import FoundationStretchSteps from '../FoundationStretchSteps';
import InterferenceCheckArtwork from '../InterferenceCheckArtwork';

afterEach(() => { cleanup(); vi.restoreAllMocks(); });
it.each(['en', 'ja'] as const)('renders four interference steps and the precise-check quiz in %s', language => {
  const lesson = resolveFoundationLesson('F26.1')!;
  render(<FoundationStretchSteps text={lesson.content[language].sections![0].text} method={1} japanese={language === 'ja'}
    customIcons={[0, 1, 2, 3].map(step => <InterferenceCheckArtwork key={step} step={step} japanese={language === 'ja'} />)} />);
  expect(screen.getAllByRole('listitem')).toHaveLength(4);
  expect(screen.getAllByRole('button')).toHaveLength(4);
  expect(screen.getByText(/Ctrl \+ Z/)).toBeInTheDocument();
  expect(lesson.content[language].sections![1].text).toContain(language === 'ja' ? '右クリック' : 'right-click');
  const question = foundationKnowledgeQuestions(language, 'F26.1')[0];
  expect(question.prompt).toContain(language === 'ja' ? '高速検出' : 'High-Speed Detection');
  expect(question.choices.map(choice => choice.isCorrect)).toEqual([false, true, false, false]);
  expect(question.choices[1].label).toBe(language === 'ja' ? 'B. 選択を解除する' : 'B. Unselect it');
});
it('preserves versioned bookmarks and stable completion records after renumbering', () => {
  expect(resolveFoundationLesson('F27.1')?.id).toBe('F17.1');
  expect(resolveFoundationLesson('F28.1')?.id).toBe('F17.1');
  expect(restoreFoundationLesson('F27.1', '7')?.id).toBe('foundation-interference-check');
  expect(restoreFoundationLesson('F27.2', '7')?.id).toBe('foundation-interference-display-list');
  expect(restoreFoundationLesson('F27.1', '6')?.id).toBe('F17.1');
  expect(restoreFoundationLesson('F27.1', '8')?.id).toBe('F17.1');
  expect(migrateFoundationCompletion(['foundations:interference:check', 'F17.1'])).toEqual(['foundation-interference-check', 'F17.1']);
  expect(foundationNeighbors('foundation-annotation-change-position').next).toBe('foundation-interference-check');
});
it('opens the supplied full interface capture from the transparent command icon', () => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: vi.fn() });
  render(<InterferenceCheckArtwork step={0} japanese={false} />);
  expect(screen.getByRole('img').querySelector('image, rect')).toBeNull();
  fireEvent.click(screen.getByRole('button'));
  expect(document.querySelector('dialog img')?.getAttribute('src')).toContain('interference/command-interface.png');
});

it('uses the clean command menu capture without the supplied red boxes for Step 2', () => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: vi.fn() });
  render(<InterferenceCheckArtwork step={1} japanese={false} />);
  fireEvent.click(screen.getByRole('button'));
  expect(document.querySelector('.foundation-interface-icon-dialog__screen')?.getAttribute('src')).toContain('interference/command-interface.png');
  expect(document.querySelector('dialog')).not.toHaveTextContent('Unselected');
});
expect(document.querySelector('dialog')).not.toHaveTextContent('Unselected');
});
