import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const GETTING_STARTED_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'iCAD SX チュートリアル：はじめに',
  moduleLabel: 'レッスンについて',
  description:
    '設計対象によって、最適な設計を行うためのソフトウェアは異なります。多くの3D設計ソフトウェアは複雑な形状や曲面の処理に優れていますが、大規模なアセンブリの処理には課題があります。iCAD SXは機械・装置設計に特化して開発され、数千から数万点に及ぶ部品のプロセスに焦点を当てています。iCAD SXは他の3Dソフトウェアと比較して200倍高速にデータを処理し、わずか0.2秒で100万部品を処理できます。',
  description2:
    '設計情報のデジタル化により、実機を実際に製造する前に、安全性の検証、構成部品全体の組立検討、ユーザーの機械操作性の確認、そして部品のコストや加工方法の見積もりが容易に行えます。また、iCAD SXは機械（メカ）、電気、制御設計を1つのソフトウェアに統合しています。これにより統一された設計環境が構築され、設計情報の一元化とデータ連携が可能になり、相互に最新情報を同時に確認・活用して設計性能と効率を向上させます。',
  procedureTitle: 'エンジニアリングワークフロー',
  objective: 'iCAD の概要と、機械設計・エンジニアリングにおける活用方法を理解します。',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>機械・装置設計特化</b> → <b>0.2秒で100万部品処理（200倍高速）</b> → <b>事前デジタル検証</b> → <b>メカ・電気・制御の統合</b>',
  completionText: 'お疲れ様でした！「iCAD SX 入門」レッスンを完了しました。',
};

export const GETTING_STARTED_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'start-step-1',
    title: '機械・装置設計への特化',
    text: '多くの3D CADは複雑な形状や曲面処理を得意としますが、大規模アセンブリで動作が重くなります。iCAD SXは数千〜数万点の部品から成る機械・装置設計に特化して開発されています。',
    preserveText: true,
  },
  {
    id: 'start-step-2',
    title: '超高速な3Dデータ処理性能',
    text: 'iCAD SXは従来の3D CADの200倍の処理速度を誇り、わずか0.2秒で100万部品を処理できます。大規模な設備全体でもストレスなく軽快に設計できます。',
    preserveText: true,
  },
  {
    id: 'start-step-3',
    title: '実機製作前のデジタル検証',
    text: '設計情報のデジタル化により、実機の製造前に安全性の確認、部品全体の組立検討、操作性の検証、部品コストや加工方法の事前見積もりが容易に行えます。',
    preserveText: true,
  },
  {
    id: 'start-step-4',
    title: 'メカ・電気・制御の統合設計',
    text: '機械（メカ）、電気、制御設計を1つのソフトウェアに統合。設計情報を一元化し、相互に最新データを同時参照・活用して設計効率を高めます。',
    preserveText: true,
  },
  {
    id: 'start-step-5',
    title: '図面の新規作成または開く',
    text: 'トレーニング用フォルダから新規プロジェクトを開始するか、既存データを開きます。基本ワークフロー：新規作成・開く → 2Dスケッチ → 3Dモデル → アセンブリ → 2D図面化 → 保存。',
    preserveText: true,
  },
  {
    id: 'start-step-6',
    title: 'ガイド翻訳およびバージョンについて（V7）',
    text: '本ガイドはiCAD SX V7版チュートリアルを翻訳したものです。学習の緊急性に伴う翻訳制限や経験の制約により一部表現に不備が生じる場合があります。フィードバックは担当講師またはCAD管理者にお寄せください。',
    preserveText: true,
  },
];
