import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const GETTING_STARTED_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'iCAD の概要と、機械設計・エンジニアリングにおける活用方法を理解します。',
  moduleLabel: 'レッスンについて',
  procedureTitle: 'エンジニアリングワークフロー',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>図面の新規作成・読込</b> → <b>2Dスケッチ作成</b> → <b>3Dモデリング</b> → <b>アセンブリ組立</b> → <b>2D図面化</b> → <b>保存</b>',
  completionText: 'お疲れ様でした！「iCAD 入門」レッスンを完了しました。',
};

export const GETTING_STARTED_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'start-step-1',
    title: '図面の新規作成または開く',
    text: 'トレーニング用フォルダから新規プロジェクトを開始するか、既存のCAD図面データを開きます。',
    preserveText: true,
  },
  {
    id: 'start-step-2',
    title: '2D幾何の作図',
    text: '直線、円、長方形などの基本的な2Dワイヤフレーム断面を作図します。',
    preserveText: true,
  },
  {
    id: 'start-step-3',
    title: '3Dモデルの構築',
    text: '押し出しなどのモデリング機能を使用して、2D断面から高精度な3Dソリッド部品を作成します。',
    preserveText: true,
  },
  {
    id: 'start-step-4',
    title: 'コンポーネントのアセンブリ',
    text: '複数の部品を配置・拘束し、完全な機械組立構造を構築します。',
    preserveText: true,
  },
  {
    id: 'start-step-5',
    title: '2D図面・製作図の作成',
    text: '寸法、公差、注記を付与した製造用図面を出力・作成します。',
    preserveText: true,
  },
  {
    id: 'start-step-6',
    title: '確認と保存',
    text: '完成した設計形状の整合性を確認し、命名規則に従って作業内容を保存します。',
    preserveText: true,
  },
];
