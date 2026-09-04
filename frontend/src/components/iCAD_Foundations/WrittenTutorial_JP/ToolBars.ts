import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const TOOLBARS_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'ツールバー',
  description: 'は、頻繁に使用する iCAD SX のコマンドへの素早いアクセスを提供します。画面操作、視図切り替え、図面編集、3Dモデリング作業などを効率化します。',
  moduleLabel: '',
  procedureTitle: 'ivl-objective',
  objective: 'このレッスンの終了時までに、iCAD SX の主要なツールバーを識別し、それぞれの基本機能を理解できるようになります。',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>ツールバーを探す</b> → <b>マウスホバーでヒント確認</b> → <b>コマンドをクリック</b>',
  completionText: 'お疲れ様でした！「iCAD SX ツールバー」レッスンを完了しました。',
  inlineHeader: true,
  renderAsObjective: true,
};

export const TOOLBARS_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'tb-file',
    title: 'ファイル',
    text: '新規作成、開く、保存、印刷。',
    preserveText: true,
  },
  {
    id: 'tb-2d-view',
    title: '2D表示',
    text: '前視図、視図切替、次視図。',
    preserveText: true,
  },
  {
    id: 'tb-switch-display',
    title: '表示切替',
    text: '投影法や寸法値・補助線の表示/非表示を切り替えます。',
    preserveText: true,
  },
  {
    id: 'tb-screen-operations',
    title: '画面操作',
    text: '範囲拡大、拡大、縮小、全体表示、再描画、前倍率。',
    preserveText: true,
  },
  {
    id: 'tb-3d-view',
    title: '3D視図',
    text: '上面図、正面図、右側面図、左側面図、背面図、下面図からモデルを表示します。',
    preserveText: true,
  },
  {
    id: 'tb-user-views',
    title: 'ユーザ視図',
    text: 'ユーザ視図 1〜4（アイソメトリック立体図）を表示します。',
    preserveText: true,
  },
  {
    id: 'tb-edit',
    title: '編集',
    text: '元に戻すとやり直し。',
    preserveText: true,
  },
  {
    id: 'tb-shading',
    title: 'シェーディング',
    text: 'ワイヤフレームやシェーディングなど、3Dモデルの陰影表示を切り替えます。',
    preserveText: true,
  },
  {
    id: 'tb-section-display',
    title: '断面表示',
    text: 'モデルの断面を切断表示して内部構造を確認します。',
    preserveText: true,
  },
  {
    id: 'tb-2d-standard-screen',
    title: '2D標準画面',
    text: '標準作図画面の表示状態を制御します。',
    preserveText: true,
  },
  {
    id: 'tb-system-information',
    title: 'システム情報',
    text: '作成した図形要素の情報や属性パラメータを設定・確認します。',
    preserveText: true,
  },
  {
    id: 'tb-screen-memory',
    title: '画面メモリ',
    text: '現在表示されている作業画面の視点状態を記憶・保存します。',
    preserveText: true,
  },
  {
    id: 'tb-entry-control',
    title: '入力制御',
    text: '図形要素の選択フィルタや座標入力モードを制御します。',
    preserveText: true,
  },
];
