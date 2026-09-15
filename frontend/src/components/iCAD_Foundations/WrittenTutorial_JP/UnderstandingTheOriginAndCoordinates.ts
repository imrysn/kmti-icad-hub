import { WrittenTutorialCopy, WrittenTutorialStep } from './types';
import originAxesImage from '../../../assets/icad-foundations/origin-placement/origin.png';

/* ── レッスン 5: 原点 ────────────────────────────────────────────────────── */

export const ORIGIN_AXES_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '原点',
  description:
    'X、Y、Z軸の座標が (0, 0, 0) となる基準点です。オブジェクトや要素の視図配置・方向も設定します。原点の配置位置は部品の形状や構造によってケースバイケースで決定されます。',
  moduleLabel: 'レッスンについて',
  procedureTitle: 'ivl-objective',
  objective:
    'このレッスンの終了時までに、原点の概念を理解し、X, Y, Z 座標軸を把握して、キー入力領域（0, 0, 0）を用いて最初のオブジェクトを原点に配置できるようになります。',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText:
    '<b>原点の確認 (0, 0, 0)</b> → <b>X, Y, Z 軸の識別</b> → <b>キー入力領域: 0, 0, 0</b> → <b>基準形状の配置</b>',
  completionText: 'お疲れ様でした！「原点」レッスンを完了しました。',
  inlineHeader: true,
  renderAsObjective: true,
};

export const ORIGIN_AXES_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'origin-step-1',
    title: '原点とは？ (0, 0, 0)',
    text: '\n* <b>基準位置 (0, 0, 0)</b> - X、Y、Z軸の座標がすべて <b>(0, 0, 0)</b> となる空間の絶対基準点です。\n* <b>視図と向きの基準</b> - オブジェクトや要素の配置および各種視図の向きを設定します。\n* <b>ケースバイケース</b> - 原点の配置位置は、部品の形状や構造・機能に応じて最適に決定されます。',
    preserveText: true,
  },
  {
    id: 'origin-step-2',
    title: '3つの座標軸 (X, Y, Z)',
    text: '\n* <b>X軸（赤）</b> - 水平方向を表します。\n* <b>Y軸（青）</b> - 垂直高さ方向を表します。\n* <b>Z軸（黄）</b> - 3D空間の奥行き方向を表します。',
    preserveText: true,
    image: originAxesImage,
    imageAlt: '3つの座標軸 (X, Y, Z)',
  },
  {
    id: 'origin-step-3',
    title: '最初のオブジェクトで原点を設定',
    text: '\n* <b>基準位置の設定</b> - ワークスペース内で原点位置を確立するため、最初に配置する基本形状（直方体や円柱等）を原点に配置します。\n* <b>キー入力領域 (Key Entry Area)</b> - 形状配置時にキー入力領域へ <b>0, 0, 0</b> と入力して確定し、形状の基準点を原点に固定します。',
    preserveText: true,
  },
  {
    id: 'origin-step-4',
    title: 'モデリングの重要ポイント',
    text: '\n* <b>3Dと2Dの一致</b> - 3Dモデルと2D図面で原点は必ず同じ相対位置になければなりません。\n* <b>空間認知の維持</b> - 視点を回転させると座標インジケータも連動して回転し、常に方向感覚を把握できます。',
    preserveText: true,
  },
];

/* ── Lesson 5.2: Change 3D Part Layout ───────────────────────────────────── */

export const ORIGIN_LAYOUT_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '3Dパーツ配置変更',
  description: 'このツールを使用して原点の位置を設定・変更します。',
  moduleLabel: 'レッスンについて',
  procedureTitle: '操作手順',
  objective: 'このレッスンを完了すると、「3Dパーツ配置変更」ツールを使用して原点を再配置し、X軸およびY軸の向きを定義できるようになります。',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText:
    '<b>3Dパーツ配置変更</b> → <b>右クリック：現在の原点確認</b> → <b>点1：新原点</b> → <b>点2：X軸設定</b> → <b>点3：Y軸設定（正面図確定）</b>',
  completionText: 'お疲れ様でした！「3Dパーツ配置変更」レッスンを完了しました。',
  inlineHeader: true,
};

export const ORIGIN_LAYOUT_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'layout-step-1',
    title: 'パーツのレイアウトを変更する',
    text: 'アイコンメニューから<b>パーツ (3D PARTS )</b> → <b>パーツのレイアウトを変更する</b>を選択します。',
    preserveText: true,
  },
  {
    id: 'layout-step-2',
    title: '現在の原点位置を表示',
    text: '<b>右クリック</b>して、モデルの現在の原点位置を表示・確認します。',
    preserveText: true,
  },
  {
    id: 'layout-step-3',
    title: '新しい原点位置の指定（点1）',
    text: '新しく原点としたい位置（<b>点1</b>）を<b>左クリック</b>します。',
    preserveText: true,
  },
  {
    id: 'layout-step-4',
    title: 'X軸方向の設定（点2）',
    text: '2点目（<b>点2</b>）を<b>左クリック</b>して、<b>X軸</b>の方向を設定します。',
    preserveText: true,
  },
  {
    id: 'layout-step-5',
    title: 'Y軸と視図方向の設定（点3）',
    text: '3点目（<b>点3</b>）を<b>左クリック</b>して<b>Y軸</b>を設定します。設定された<b>XY平面</b>が正面図になります。',
    preserveText: true,
  },
];


