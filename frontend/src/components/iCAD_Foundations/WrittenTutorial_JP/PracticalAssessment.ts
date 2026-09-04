import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const PRACTICAL_ASSESSMENT_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'iCAD の操作環境、ツール群、モデリングワークフローに対する総合的な自立習熟度を実技評価します。',
  moduleLabel: 'レッスンについて',
  procedureTitle: '評価チェックリスト',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText:
    '<b>画面要素の識別</b> → <b>視図・画面操作</b> → <b>2D/3Dモデリング</b> → <b>モデル検査＆規定保存</b>',
  completionText: '合格おめでとうございます！「iCAD 基礎 実技評価」を完了しました。',
};

export const PRACTICAL_ASSESSMENT_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'assess-step-1',
    title: 'Part A — インターフェースの識別',
    text: 'タイトルバー、メニューバー、コマンドメニュー、作業領域、ツリービュー、項目入力、キー入力の各要素を正確に特定します。',
    preserveText: true,
  },
  {
    id: 'assess-step-2',
    title: 'Part B — 視図と画面操作の実践',
    text: 'ズーム、パン、視点回転、および標準的な機械図面投影への切り替えを円滑に実演します。',
    preserveText: true,
  },
  {
    id: 'assess-step-3',
    title: 'Part C — 幾何作図と3Dモデリング',
    text: '指定された寸法の2Dスケッチを描き、指示書に従って正確な3Dモデルを構築します。',
    preserveText: true,
  },
  {
    id: 'assess-step-4',
    title: 'Part D — モデル検査と規定保存',
    text: '完成したモデルをユーザ視図で多角的に検査し、指定の命名規則に従って確実に保存します。',
    preserveText: true,
  },
];
