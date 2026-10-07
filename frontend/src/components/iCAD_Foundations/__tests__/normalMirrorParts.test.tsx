import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import NormalMirrorPartsContent from '../NormalMirrorPartsContent';
import { foundationNeighbors, resolveFoundationLesson } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';

afterEach(cleanup);

it.each(['en', 'ja'] as const)('renders Normal and Mirror Parts concept content and comparison cards in %s', language => {
  const lesson = resolveFoundationLesson('F28.1')!;
  expect(lesson).toBeDefined();
  expect(lesson.id).toBe('foundation-mirrored-parts-normal-and-mirror');
  expect(lesson.moduleId).toBe('F28');
  expect(lesson.contentReview).toBe('instructor-review-required');
  expect(lesson.title[language]).toBe(language === 'ja' ? '通常部品とミラー部品' : 'Normal Parts and Mirror Parts');

  const sections = lesson.content[language].sections!;
  expect(sections).toHaveLength(2);

  // Render both sections
  const { container } = render(
    <>
      {sections.map((s, index) => (
        <NormalMirrorPartsContent
          key={index}
          text={s.text}
          title={s.title}
          index={index}
          japanese={language === 'ja'}
        />
      ))}
    </>
  );

  // Ensure no procedural grid is used (this is a concept lesson, not a step-by-step procedure)
  expect(container.querySelector('.foundations-uses__grid')).toBeNull();

  // Section 0: Normal Part vs Mirror Part cards (2 cards)
  // Section 1: Mirror Part A vs Part B cards (2 cards)
  const cards = container.querySelectorAll('.foundation-view-comparison__card');
  expect(cards).toHaveLength(4);

  // Section 0 headings and codes
  expect(cards[0].textContent).toContain(language === 'ja' ? '通常部品' : 'Normal Part');
  expect(cards[0].textContent).toContain('RTXXXXXXN');
  expect(cards[1].textContent).toContain(language === 'ja' ? 'ミラー部品' : 'Mirror Part');
  expect(cards[1].textContent).toContain('MTXXXXXXA01');
  expect(cards[1].textContent).toContain('MTXXXXXXB01');

  // Section 1: Mirror Part A vs Part B
  expect(cards[2].textContent).toContain(language === 'ja' ? 'ミラー部品 A' : 'Mirror Part A');
  expect(cards[3].textContent).toContain(language === 'ja' ? 'ミラー部品 B' : 'Mirror Part B');

  // Special rule callout in Section 1
  const ruleCallout = container.querySelector('.normal-mirror-rule-callout');
  expect(ruleCallout).not.toBeNull();
  expect(ruleCallout?.textContent).toContain(
    language === 'ja'
      ? '反転元となる既存の部品が存在しない場合は、部品命名時に A を使用します。'
      : 'If there is no existing part to be mirrored, use A when naming the part.'
  );

  // Kattechigai badge note in Section 1
  const katteBox = container.querySelector('.normal-mirror-kattechigai-box');
  expect(katteBox).not.toBeNull();
  expect(katteBox?.textContent).toContain('勝手違');

  // Verify redundant table was removed to streamline lesson
  expect(container.querySelector('.normal-mirror-table')).toBeNull();

  // Knowledge check verification
  const questions = foundationKnowledgeQuestions(language, lesson.id);
  expect(questions).toHaveLength(1);
  const q = questions[0];
  expect(q.id).toBe('foundation-mirrored-parts-normal-and-mirror-knowledge-check');
  expect(q.prompt).toContain(
    language === 'ja' ? 'ミラー部品 B' : 'Mirror Part B'
  );
  expect(q.choices).toHaveLength(4);
  // Correct answer is strictly C (index 2)
  expect(q.choices.map(c => c.isCorrect)).toEqual([false, false, true, false]);
  expect(q.choices[2].label).toContain(
    language === 'ja'
      ? 'ミラー部品 A のミラーコピーである。'
      : 'It is the mirror copy of Mirror Part A.'
  );

  // Navigation neighbors
  expect(foundationNeighbors(lesson.id)).toEqual({
    previous: 'foundation-parasolid-set-purchase-part-info',
    next: 'foundation-mirrored-parts-identify',
  });
});
