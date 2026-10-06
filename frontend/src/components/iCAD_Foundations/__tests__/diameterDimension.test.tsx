import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, it, expect, vi } from 'vitest';
import { resolveFoundationLesson, foundationNeighbors } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';
import FoundationStretchSteps from '../FoundationStretchSteps';
import DiameterDimensionArtwork, { DiameterDimensionIcon } from '../DiameterDimensionArtwork';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it.each(['en', 'ja'] as const)('renders Diameter Dimension in %s', language => {
  const lesson = resolveFoundationLesson('F25.2')!;
  expect(lesson).toBeDefined();
  expect(lesson.id).toBe('foundation-annotation-diameter-dimension');

  render(
    <FoundationStretchSteps
      text={lesson.content[language].sections![0].text}
      method={1}
      japanese={language === 'ja'}
      customIcons={[0, 1, 2, 3].map(step => (
        <DiameterDimensionArtwork key={step} step={step} japanese={language === 'ja'} />
      ))}
    />
  );

  const cards = screen.getAllByRole('listitem');
  expect(cards).toHaveLength(3);

  // Step 1: Diameter Dimension icon
  expect(cards[0]).toHaveTextContent(language === 'ja' ? '直径寸法アイコンを選択' : 'Select the Diameter Dimension Icon');
  expect(cards[0].querySelector('svg.foundation-single-command')).toBeInTheDocument();

  // Step 2: Edge of the circle
  expect(cards[1]).toHaveTextContent(language === 'ja' ? '円のエッジを選択' : 'Select the Edge of the Circle');

  // Step 3: Position circular dimension with left-click in 3D Space
  expect(cards[2]).toHaveTextContent(language === 'ja' ? '円寸法の位置を指定' : 'Position the Circular Dimension');
  expect(cards[2]).toHaveTextContent(language === 'ja' ? '3D空間' : '3D Space');
  expect(cards[2]).toHaveTextContent(language === 'ja' ? '左クリック' : 'Left-click');

  expect(lesson.content[language].sections).toHaveLength(1);

  // Knowledge check verification: Correct answer is B
  const questions = foundationKnowledgeQuestions(language, lesson.id);
  expect(questions).toHaveLength(1);
  expect(questions[0].choices.map(c => c.isCorrect)).toEqual([false, true, false, false]);
  expect(questions[0].choices[1].label).toContain(
    language === 'ja' ? '円のエッジ' : 'The edge of the circle'
  );

  // Navigation
  expect(foundationNeighbors(lesson.id)).toEqual({
    previous: 'foundation-annotation-linear-dimension',
    next: 'foundation-annotation-angular-dimension',
  });
});

it('renders the clean Step 1 SVG icon with correct attributes and geometry', () => {
  render(<DiameterDimensionIcon title="Diameter Dimension" />);
  const svg = screen.getByRole('img', { name: 'Diameter Dimension' });
  expect(svg).toHaveClass('foundation-single-command');
  expect(svg).toHaveAttribute('data-command-reference', 'diameter-dimension');
  expect(svg.querySelector('path')).toBeInTheDocument();
  expect(svg.querySelector('rect, image, text')).toBeNull();
});

it.each([
  ['command', 'annotation-command-interface.png'],
  ['selected', 'diameter-dimension-selected.png'],
  ['position', 'diameter-dimension-result.png'],
  ['result', 'diameter-dimension-result.png'],
])('opens supplied %s screenshot in fullscreen dialog when clicked', (name, filename) => {
  const step = ['command', 'selected', 'position', 'result'].indexOf(name);
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: vi.fn() });

  render(<DiameterDimensionArtwork step={step} japanese={false} />);
  fireEvent.click(screen.getByRole('button'));

  const dialogImg = document.querySelector('dialog img');
  expect(dialogImg).toBeInTheDocument();
  expect(dialogImg?.getAttribute('src')).toContain(filename);
});
