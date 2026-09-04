import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const FINAL_GUIDED_EXERCISE_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '画面操作、視図、要素選択、2D、3D、ファイル管理などの基礎スキルを総合的に適用します。',
  moduleLabel: 'レッスンについて',
  procedureTitle: '操作手順',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText:
    '<b>画面操作</b> → <b>標準視図</b> → <b>要素選択</b> → <b>2Dスケッチ＆3D押し出し</b> → <b>ファイル保存</b>',
  completionText: 'お疲れ様でした！「最終総合演習」を完了しました。',
};

export const FINAL_GUIDED_EXERCISE_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'challenge-step-1',
    title: '一連の画面操作の実践',
    text: 'ズームイン、ズームアウト、左右パン移動、視点回転、全体表示を実行します。',
    preserveText: true,
  },
  {
    id: 'challenge-step-2',
    title: '全標準視図の切り替え',
    text: '正面図、上面図、側面図を表示し、スムーズに「ユーザ視図 1」へ復帰します。',
    preserveText: true,
  },
  {
    id: 'challenge-step-3',
    title: '図形要素の選択実践',
    text: '部品ボディ、1つの平面、および1つの境界エッジを選択します。',
    preserveText: true,
  },
  {
    id: 'challenge-step-4',
    title: '2Dスケッチ作図と3Dブロック作成',
    text: '長方形プロファイルを作図し、指定の3Dソリッドを押し出し作成して演習ファイルを保存します。',
    preserveText: true,
  },
];
