import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

/* ── Lesson 7.1: Create a Line ───────────────────────────────────────────── */

export const CREATE_LINE_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'iCAD の作業画面で最初の基本2D直線図形を作図します。',
  moduleLabel: 'レッスンについて',
  procedureTitle: '操作手順',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>直線ツール</b> → <b>始点指定</b> → <b>終点指定</b> → <b>確定</b>',
  completionText: 'お疲れ様でした！「直線の作図」レッスンを完了しました。',
};

export const CREATE_LINE_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'line-step-1',
    title: '2D作図モードの開始',
    text: '2Dスケッチ/作図環境へ切り替えるか、2Dコマンドモードを有効化します。',
    preserveText: true,
  },
  {
    id: 'line-step-2',
    title: '直線コマンドの選択',
    text: '2D幾何ツールバーまたはコマンドメニューから「直線」コマンドをクリックします。',
    preserveText: true,
  },
  {
    id: 'line-step-3',
    title: '始点の指定',
    text: '作図画面内をクリックするか、座標値を入力して直線の始点を指定します。',
    preserveText: true,
  },
  {
    id: 'line-step-4',
    title: '終点の指定',
    text: 'カーソルを目標の終点位置へ移動してクリックし、直線要素の作図を完了します。',
    preserveText: true,
  },
];

/* ── Lesson 7.2: Create Circle & Rectangle ───────────────────────────────── */

export const CREATE_CIRCLE_RECT_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '標準の iCAD コマンドを使用して、円および長方形の基本2Dプロファイルを作図します。',
  moduleLabel: 'レッスンについて',
  procedureTitle: '操作手順',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>円：中心点 ＋ 半径指定</b> │ <b>長方形：対角点指定（幅 × 高さ）</b>',
  completionText: 'お疲れ様でした！「円と長方形」レッスンを完了しました。',
};

export const CREATE_CIRCLE_RECT_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'circle-rect-step-1',
    title: '円コマンドの選択',
    text: '「円」ツールをクリックし、中心点を指定して必要な半径または直径を入力します。',
    preserveText: true,
  },
  {
    id: 'circle-rect-step-2',
    title: '円要素の確定',
    text: '寸法値を確認し、作業平面上に円図形を配置・確定します。',
    preserveText: true,
  },
  {
    id: 'circle-rect-step-3',
    title: '長方形コマンドの選択',
    text: '2D幾何メニューから「長方形」コマンドを起動します。',
    preserveText: true,
  },
  {
    id: 'circle-rect-step-4',
    title: '対角点と寸法の定義',
    text: '第1コーナーをクリックし、対角方向へドラッグして幅と高さの数値を入力し、長方形を生成します。',
    preserveText: true,
  },
];
