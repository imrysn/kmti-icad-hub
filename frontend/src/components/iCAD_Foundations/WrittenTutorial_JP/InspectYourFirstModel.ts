import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const INSPECT_MODEL_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '画面操作、標準視図、図形選択スキルを組み合わせて、作成した3Dモデルを総合的に検査します。',
  moduleLabel: 'レッスンについて',
  procedureTitle: '操作手順',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText:
    '<b>ズーム＆回転</b> → <b>標準視図の巡回</b> → <b>ユーザ視図へ復帰</b> → <b>面とエッジの選択</b>',
  completionText: 'お疲れ様でした！「モデルの検査実践」レッスンを完了しました。',
};

export const INSPECT_MODEL_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'inspect-step-1',
    title: 'ズームによる細部検査',
    text: 'ブロックのエッジ近傍までズームインして細部を確認し、その後ズームアウトしてモデル全体を表示します。',
    preserveText: true,
  },
  {
    id: 'inspect-step-2',
    title: 'パンと視点オービット回転',
    text: '中ボタン・右ボタンを使用して作業画面内をパン移動し、モデルの周囲を回転させて立体的に検査します。',
    preserveText: true,
  },
  {
    id: 'inspect-step-3',
    title: '標準視図の切り替え',
    text: '3D視図ツールバーを使用して、正面図、上面図、右側面図を順番に切り替えます。',
    preserveText: true,
  },
  {
    id: 'inspect-step-4',
    title: 'ユーザ視図への復帰',
    text: '「ユーザ視図 1」へ切り替え、部品をアイソメトリック 3D 視点へ再整列します。',
    preserveText: true,
  },
  {
    id: 'inspect-step-5',
    title: '面とエッジの選択練習',
    text: '上面の平面、側面の面、および特定のコーナーエッジを順に選択する練習を行います。',
    preserveText: true,
  },
];
