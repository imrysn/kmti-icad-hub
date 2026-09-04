import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

/* ── Lesson 5.1: The Origin & Axes ───────────────────────────────────────── */

export const ORIGIN_AXES_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '3D空間内のグローバル原点 (0, 0, 0) と X, Y, Z 座標軸を識別します。',
  moduleLabel: 'レッスンについて',
  procedureTitle: '操作手順',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>原点の確認 (0, 0, 0)</b> → <b>X軸（赤）</b> → <b>Y軸（緑）</b> → <b>Z軸（青）</b>',
  completionText: 'お疲れ様でした！「原点と座標軸」レッスンを完了しました。',
};

export const ORIGIN_AXES_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'origin-step-1',
    title: 'トレーニング画面を開く',
    text: 'iCAD で座標系トレーニング用の作業画面を開きます。',
    preserveText: true,
  },
  {
    id: 'origin-step-2',
    title: '座標系インジケータの確認',
    text: 'モデル原点 (0, 0, 0) を示す三軸座標インジケータの位置を確認します。',
    preserveText: true,
  },
  {
    id: 'origin-step-3',
    title: 'X, Y, Z 軸の識別',
    text: '赤色のX軸、緑色のY軸、青色のZ軸の方向性を把握します。',
    preserveText: true,
  },
  {
    id: 'origin-step-4',
    title: '視点回転と座標軸の連動',
    text: '視点を自由に回転させ、空間的な向きを維持するために座標インジケータがどのように連動するかを確認します。',
    preserveText: true,
  },
];

/* ── Lesson 5.2: Change 3D Part Layout ───────────────────────────────────── */

export const ORIGIN_LAYOUT_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'グローバル原点座標系に対する3D部品の配置レイアウトの理解と変更を行います。',
  moduleLabel: 'レッスンについて',
  procedureTitle: '操作手順',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>部品選択</b> → <b>部品配置の変更</b> → <b>位置合わせ基準点を指定</b> → <b>配置確定</b>',
  completionText: 'お疲れ様でした！「3D部品配置の変更」レッスンを完了しました。',
};

export const ORIGIN_LAYOUT_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'layout-step-1',
    title: '対象部品の選択',
    text: '座標位置や向きを調整したい3D部品をクリックして選択します。',
    preserveText: true,
  },
  {
    id: 'layout-step-2',
    title: '配置変更コマンドの起動',
    text: 'コマンドメニューの「配置変更」または「3D部品配置」を選択します。',
    preserveText: true,
  },
  {
    id: 'layout-step-3',
    title: '位置合わせ基準点の指定',
    text: '対象座標や基準平面に合わせる部品上の基準点や面を指定します。',
    preserveText: true,
  },
  {
    id: 'layout-step-4',
    title: '新規配置の確定',
    text: 'オフセット座標値を入力するか、目標の配置点をクリックして部品の位置を確定します。',
    preserveText: true,
  },
];
