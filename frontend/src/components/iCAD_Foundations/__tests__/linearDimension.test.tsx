import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, it, expect, vi } from 'vitest';
import { resolveFoundationLesson, foundationNeighbors } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';
import FoundationStretchSteps from '../FoundationStretchSteps';
import LinearDimensionArtwork, { LinearDimensionIcon } from '../LinearDimensionArtwork';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it.each(['en', 'ja'] as const)('renders Linear Dimension in %s', language => {
  const lesson = resolveFoundationLesson('F25.1')!;
  expect(lesson).toBeDefined();
  expect(lesson.id).toBe('foundation-annotation-linear-dimension');

  render(
    <FoundationStretchSteps
      text={lesson.content[language].sections![0].text}
      method={1}
      japanese={language === 'ja'}
      customIcons={[0, 1, 2, 3].map(step => (
        <LinearDimensionArtwork key={step} step={step} japanese={language === 'ja'} />
      ))}
    />
  );

  const cards = screen.getAllByRole('listitem');
  expect(cards).toHaveLength(3);

  // Step 1: Linear Dimension icon
  expect(cards[0]).toHaveTextContent(language === 'ja' ? '長さ寸法アイコンを選択' : 'Select the Linear Dimension Icon');
  expect(cards[0].querySelector('svg.foundation-single-command')).toBeInTheDocument();

  // Step 2: Edges
  expect(cards[1]).toHaveTextContent(language === 'ja' ? '測定するエッジを選択' : 'Select the Edges to be Measured');

  // Step 3: Position with left-click in 3D Space
  expect(cards[2]).toHaveTextContent(language === 'ja' ? '寸法の位置を指定' : 'Position the Dimension');
  expect(cards[2]).toHaveTextContent(language === 'ja' ? '3D空間' : '3D Space');
  expect(cards[2]).toHaveTextContent(language === 'ja' ? '左クリック' : 'Left-click');

  expect(lesson.content[language].sections).toHaveLength(1);

  // Knowledge check verification: Correct answer is B
  const questions = foundationKnowledgeQuestions(language, lesson.id);
  expect(questions).toHaveLength(1);
  expect(questions[0].choices.map(c => c.isCorrect)).toEqual([false, true, false, false]);
  expect(questions[0].choices[1].label).toContain(
    language === 'ja' ? '3D空間を左クリックして寸法を配置する' : 'Left-click on the 3D Space to position the dimension'
  );

  // Navigation
  expect(foundationNeighbors(lesson.id)).toEqual({
    previous: 'foundation-information-tools',
    next: 'foundation-annotation-diameter-dimension',
  });
});

it('renders the clean Step 1 SVG icon with correct attributes and geometry', () => {
  render(<LinearDimensionIcon title="Linear Dimension" />);
  const svg = screen.getByRole('img', { name: 'Linear Dimension' });
  expect(svg).toHaveClass('foundation-single-command');
  expect(svg).toHaveAttribute('data-command-reference', 'linear-dimension');
  expect(svg.querySelector('path')).toBeInTheDocument();
  expect(svg.querySelector('rect, image, text')).toBeNull();
});

it.each([
  ['command', 'annotation-command-interface.png'],
  ['selected', 'linear-dimension-selected.png'],
  ['position', 'linear-dimension-result.png'],
  ['result', 'linear-dimension-result.png'],
])('opens supplied %s screenshot in fullscreen dialog when clicked', (name, filename) => {
  const step = ['command', 'selected', 'position', 'result'].indexOf(name);
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: vi.fn() });

  render(<LinearDimensionArtwork step={step} japanese={false} />);
  fireEvent.click(screen.getByRole('button'));

  const dialogImg = document.querySelector('dialog img');
  expect(dialogImg).toBeInTheDocument();
  expect(dialogImg?.getAttribute('src')).toContain(filename);
});
