import vidBox from '../../../assets/3D_Video_Tutorial/basicOp_box.mp4';
import vidCone from '../../../assets/3D_Video_Tutorial/basicOp_cone.mp4';
import vidCylinder from '../../../assets/3D_Video_Tutorial/basicOp_cylinder.mp4';
import vidPolygon from '../../../assets/3D_Video_Tutorial/basicOp_polygon.mp4';
import vidTorus from '../../../assets/3D_Video_Tutorial/basicOp_torus.mp4';
import { TutorialStep } from './VideoTutorialViewer';

/**
 * Cylinder overlay geometry uses normalized video coordinates.
 * Adjust x/y to move the highlight and width/height to resize it.
 */
export const cylinderOverlayLayout = {
  itemEntryArea: {
    x: 0.07,
    y: 0.945,
    width: 0.155,
    height: 0.032,
  },
};

/** Box overlay geometry, isolated from the other basic-shape lessons. */
export const boxOverlayLayout = {
  itemEntryArea: { x: 0.07, y: 0.945, width: 0.23, height: 0.032 },
};

/**  Polygon overlay geometry, isolated from the other basic-shape lessons. */
export const polygonOverlayLayout = {
  itemEntryArea: { x: 0.07, y: 0.945, width: 0.23, height: 0.032 },
};

/** Cone overlay geometry, isolated from the other basic-shape lessons. */
export const coneOverlayLayout = {
  itemEntryArea: { x: 0.07, y: 0.945, width: 0.31, height: 0.032 },
};

export const cylinderTutorialSteps: TutorialStep[] = [
  {
    id: "cyl-0-introduction",
    title: "円柱の概要",
    text: "",
    customText: "円柱は、平行な2つの円形面が曲面によって結ばれた3次元ソリッド形状です。CADにおいて円柱は、軸、ピン、ローラー、ボス、円形穴などの基準形状として広く使用されます。高さ方向に沿って均一な円形断面を持つ形状を作成する際に円柱を使用します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    videoStart: 0,
    videoEnd: 3.25,
    holdVideo: true,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
  },
  {
    id: "cyl-1-tool-selection",
    title: "円柱ツールの選択",
    text: "",
    customText: "アイコンメニューから「立体配置」を開き、「円柱配置」を選択します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 0,
    videoEnd: 3.25,
    overlays: [
      { id: "shape-placement", type: "highlight", startTime: 0.75, endTime: 1.67, target: { x: 0.908, y: 0.123, width: 0.07, height: 0.026 }, animation: "pulse", label: "立体配置" },
      { id: "place-cylinder", type: "highlight", startTime: 1.67, endTime: 3.25, target: { x: 0.908, y: 0.145, width: 0.022, height: 0.032 }, animation: "pulse", label: "円柱配置", labelPosition: "bottom" }
    ]
  },
  {
    id: "cyl-2-front-view",
    title: "正面図の設定",
    text: "",
    customText: "3D視図ツールバーから「正面」を選択します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 3.25,
    videoEnd: 8.25,
    overlays: [
      { id: "front-view", type: "highlight", startTime: 4.75, endTime: 8.25, target: { x: 0.438, y: 0.037, width: 0.016, height: 0.03 }, animation: "pulse", label: "正面図", labelPosition: "bottom" }
    ]
  },
  {
    id: "cyl-3-command-options",
    title: "円柱設定の確認",
    text: "",
    customText: "コマンドメニューで「円柱」「立体配置」「直径指定」を確認し、「Y方向」を選択します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 8.25,
    videoEnd: 13.75,
    overlays: [
      { id: "opt-cylinder", type: "highlight", startTime: 8.25, endTime: 9.35, target: { x: 0.0, y: 0.655, width: 0.036, height: 0.023 }, animation: "pulse", label: "円柱", labelPosition: "right" },
      { id: "opt-placement", type: "highlight", startTime: 9.35, endTime: 10.45, target: { x: 0.0, y: 0.813, width: 0.036, height: 0.023 }, animation: "pulse", label: "立体配置", labelPosition: "right" },
      { id: "opt-dia", type: "highlight", startTime: 10.45, endTime: 11.75, target: { x: 0.0, y: 0.87, width: 0.036, height: 0.023 }, animation: "pulse", label: "直径指定", labelPosition: "right" },
      { id: "opt-y-orient", type: "highlight", startTime: 11.75, endTime: 13.75, target: { x: 0.017, y: 0.846, width: 0.019, height: 0.023 }, animation: "pulse", label: "Y方向", labelPosition: "right" }
    ]
  },
  {
    id: "cyl-4-dimensions",
    title: "円柱寸法の入力",
    text: "",
    customText: "項目入力領域で、円柱の直径と高さを入力します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 13.75,
    videoEnd: 20.83,
    overlays: [
      { id: "item-entry", type: "highlight", startTime: 13.75, endTime: 14.75, target: { ...cylinderOverlayLayout.itemEntryArea }, animation: "pulse", label: "項目入力領域" },
      { id: "input-dia", type: "highlight", startTime: 14.75, endTime: 17.25, target: { x: 0.092, y: 0.948, width: 0.051, height: 0.028 }, animation: "pulse", label: "直径" },
      { id: "input-height", type: "highlight", startTime: 17.25, endTime: 20.83, target: { x: 0.167, y: 0.948, width: 0.053, height: 0.028 }, animation: "pulse", label: "高さ" },
      {
        id: "quiz-cyl-1",
        type: "quiz",
        startTime: 20.33,
        endTime: 20.83,
        quizData: {
          question: "円柱を作成する際に指定が必要な寸法項目はどれですか？",
          options: [
            { text: "直径と高さ", isCorrect: true, feedback: "正解です！円柱の作成には直径と高さが必要です。" },
            { text: "幅・奥行き・高さ", isCorrect: false, feedback: "それらは直方体の寸法項目です。" },
            { text: "中心軌道半径と旋回角度", isCorrect: false, feedback: "それらはトーラスの定義寸法です。" }
          ]
        }
      }
    ]
  },
  {
    id: "cyl-5-origin",
    title: "円柱の配置位置",
    text: "",
    customText: "理解度チェックの確認後、キー入力エリアで原点座標 0, 0, 0を入力してEnterキーを押します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 20.83,
    videoEnd: 23.40,
    overlays: [
      { id: "input-coords", type: "highlight", startTime: 20.83, endTime: 23.3, target: { x: 0.6, y: 0.949, width: 0.4, height: 0.0324 }, animation: "pulse", label: "原点座標\n0 0 0" },
      {
        id: "quiz-cyl-2",
        type: "quiz",
        startTime: 22.9,
        endTime: 23.4,
        quizData: {
          question: "座標値「0, 0, 0」は何を表していますか？",
          options: [
            { text: "グローバル原点", isCorrect: true, feedback: "正解です！0, 0, 0 はグローバル原点を表します。" },
            { text: "円柱の中心点", isCorrect: false, feedback: "0, 0, 0 はグローバル原点を表します。" },
            { text: "現在の正面視図", isCorrect: false, feedback: "視図方向は座標値ではありません。0, 0, 0 はグローバル原点です。" }
          ]
        }
      }
    ]
  },
  {
    id: "cyl-6-result",
    title: "作成結果の確認",
    text: "",
    customText: "指定した直径、高さ、原点座標に基づいて円柱が作成されました。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 23.40,
    videoEnd: 27.0,
    overlays: [
      { id: "result-callout", type: "callout", startTime: 24.0, endTime: 27.0, target: { x: 0.5, y: 0.5, width: 0, height: 0 }, label: "円柱作成完了 ✓" }
    ]
  },
  {
    id: "cyl-7-explain",
    title: "円柱寸法の振り返り",
    text: "",
    customText: "「直径」は円柱の円形面の差し渡し寸法です。「高さ」は底面から上面までの垂直方向の距離です。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    waitForNarrationBeforeVideo: true,
    advanceOnSourceVideoEnd: true,
    narrateTitle: false,
    videoStart: 27.0,
    videoEnd: 32.08,
    overlays: [
      {
        id: "dim-dia",
        type: "dimensionAnnotation",
        startTime: 27.5,
        endTime: 32.08,
        label: "直径",
        labelOffset: { x: 0, y: 30 },
        dimensionType: "horizontal",
        line: { start: { x: 0.44, y: 0.69 }, end: { x: 0.58, y: 0.69 } }
      },
      {
        id: "dim-height",
        type: "dimensionAnnotation",
        startTime: 28.5,
        endTime: 32.08,
        label: "高さ",
        labelOffset: { x: 50, y: 0 },
        dimensionType: "vertical",
        line: { start: { x: 0.65, y: 0.43 }, end: { x: 0.65, y: 0.66 } }
      },
      {
        id: "quiz-cyl-final",
        type: "quiz",
        startTime: 31.58,
        endTime: 32.08,
        quizData: {
          question: "円柱をモデル原点に配置する座標値は何ですか？",
          options: [
            { text: "0, 0, 0", isCorrect: true, feedback: "正解です！0, 0, 0 でモデル原点へ配置します。" },
            { text: "10, 10, 0", isCorrect: false, feedback: "0, 0, 0 はグローバル原点を表します。" },
            { text: "100, 100, 100", isCorrect: false, feedback: "0, 0, 0 はグローバル原点を表します。" }
          ]
        }
      }
    ]
  },
  {
    id: "cyl-8-recap",
    title: "円柱のまとめ",
    text: "",
    customText: "振り返りましょう。アイコンメニューから「立体配置」と「円柱配置」を選択し、「正面」と「Y方向」を設定、項目入力で直径と高さを入力し、原点座標 0, 0, 0 を指定して配置しました。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    recapData: {
      title: "円柱の作成完了",
      items: [
        "「立体配置」から「円柱配置」を選択しました。",
        "円柱の直径と高さを入力しました。",
        "原点座標 0, 0, 0 を指定してモデル原点へ配置しました。"
      ]
    }
  }
];

export const boxTutorialSteps: TutorialStep[] = [
  {
    id: "box-0-introduction",
    title: "直方体の概要",
    text: "",
    customText: "直方体は、6つの長方形の面で囲まれた3次元ソリッド形状です。CADにおいて直方体は、ブロック、プレート、ハウジング、ベースなどの矩形部品の基準形状として広く使用されます。幅・奥行き・高さが定義された部品を作成する際に使用します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    videoStart: 0,
    videoEnd: 2.233,
    holdVideo: true,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
  },
  {
    id: "box-1-shape-placement",
    title: "立体配置の選択",
    text: "",
    customText: "まず初めに、アイコンメニューから「立体配置」を開きます。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 0,
    videoEnd: 2.233,
    overlays: [
      { id: "box-shape-placement", type: "highlight", startTime: 1.2, endTime: 2.233, target: { x: 0.908, y: 0.123, width: 0.07, height: 0.026 }, animation: "pulse", label: "立体配置" }
    ]
  },
  {
    id: "box-2-place-box",
    title: "直方体ツールの選択",
    text: "",
    customText: "「立体配置」の中から「直方体配置」を選択します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 2.233,
    videoEnd: 4.817,
    overlays: [
      { id: "box-place-box", type: "highlight", startTime: 3.75, endTime: 4.817, target: { x: 0.926, y: 0.145, width: 0.02, height: 0.032 }, animation: "pulse", label: "直方体配置", labelPosition: "bottom" }
    ]
  },
  {
    id: "box-3-front-view",
    title: "正面図の設定",
    text: "",
    customText: "3D視図ツールバーから「正面」を選択します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 4.817,
    videoEnd: 8.333,
    overlays: [
      { id: "box-front-view", type: "highlight", startTime: 5.4, endTime: 8.333, target: { x: 0.438, y: 0.037, width: 0.016, height: 0.03 }, animation: "pulse", label: "正面図", labelPosition: "bottom" }
    ]
  },
  {
    id: "box-4-command-options",
    title: "直方体設定の確認",
    text: "",
    customText: "コマンドメニューで「直方体」「立体配置」「寸法指定」を確認し、「Y方向」を選択します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 8.333,
    videoEnd: 15.25,
    overlays: [
      { id: "box-opt-solid", type: "highlight", startTime: 8.333, endTime: 9.4, target: { x: 0.032, y: 0.655, width: 0.036, height: 0.023 }, animation: "pulse", label: "直方体", labelPosition: "right" },
      { id: "box-opt-placement", type: "highlight", startTime: 10.4, endTime: 12.5, target: { x: 0.001, y: 0.813, width: 0.035, height: 0.023 }, animation: "pulse", label: "立体配置", labelPosition: "right" },
      { id: "box-opt-dim", type: "highlight", startTime: 12.5, endTime: 13.75, target: { x: 0.001, y: 0.886, width: 0.035, height: 0.023 }, animation: "pulse", label: "寸法指定", labelPosition: "right" },
      { id: "box-opt-y-orient", type: "highlight", startTime: 13.75, endTime: 15.0, target: { x: 0.017, y: 0.862, width: 0.019, height: 0.023 }, animation: "pulse", label: "Y方向", labelPosition: "right" },
      {
        id: "quiz-box-orientation",
        type: "quiz",
        startTime: 15.0,
        endTime: 15.25,
        quizData: {
          question: "この直方体配置手順で選択されている配置方向はどれですか？",
          options: [
            { text: "Y方向", isCorrect: true, feedback: "正解です！この手順ではY方向を使用します。" },
            { text: "X方向", isCorrect: false, feedback: "この手順ではY方向を使用します。" },
            { text: "Z方向", isCorrect: false, feedback: "この手順ではY方向を使用します。" }
          ]
        }
      }
    ]
  },
  {
    id: "box-5-width",
    title: "幅の入力",
    text: "",
    customText: "項目入力領域で、直方体の幅寸法を入力します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 15.25,
    videoEnd: 18.25,
    overlays: [
      { id: "box-item-entry", type: "highlight", startTime: 15.25, endTime: 15.9, target: { ...boxOverlayLayout.itemEntryArea }, animation: "pulse", label: "項目入力領域" },
      { id: "box-input-width", type: "highlight", startTime: 15.9, endTime: 18.25, target: { x: 0.092, y: 0.948, width: 0.051, height: 0.028 }, animation: "pulse", label: "幅" }
    ]
  },
  {
    id: "box-6-depth",
    title: "奥行きの入力",
    text: "",
    customText: "項目入力領域で、直方体の奥行き寸法を入力します。",
    zoom: "scale(1)", origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox, waitForNarrationBeforeVideo: true, narrateTitle: false,
    videoStart: 18.25, videoEnd: 21.75,
    overlays: [
      { id: "box-input-depth", type: "highlight", startTime: 18.25, endTime: 21.75, target: { x: 0.167, y: 0.948, width: 0.051, height: 0.028 }, animation: "pulse", label: "奥行き" }
    ]
  },
  {
    id: "box-7-height",
    title: "高さの入力",
    text: "",
    customText: "項目入力領域で、直方体の高さ寸法を入力します。",
    zoom: "scale(1)", origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox, waitForNarrationBeforeVideo: true, narrateTitle: false,
    videoStart: 21.75, videoEnd: 25.0,
    overlays: [
      { id: "box-input-height", type: "highlight", startTime: 21.75, endTime: 25.0, target: { x: 0.242, y: 0.948, width: 0.051, height: 0.028 }, animation: "pulse", label: "高さ" },
      {
        id: "quiz-box-dimensions",
        type: "quiz",
        startTime: 24.5,
        endTime: 25.0,
        quizData: {
          question: "直方体の寸法はどこに入力しますか？",
          options: [
            { text: "項目入力領域", isCorrect: true, feedback: "正解です！直方体の寸法は項目入力領域で指定します。" },
            { text: "キー入力領域", isCorrect: false, feedback: "立体の寸法指定には項目入力領域を使用します。" },
            { text: "画面操作コントロール", isCorrect: false, feedback: "立体の寸法指定には項目入力領域を使用します。" }
          ]
        }
      }
    ]
  },
  {
    id: "box-8-origin",
    title: "直方体の配置位置",
    text: "",
    customText: "キー入力エリアで「0 0 0」を入力し、直方体をモデル原点に配置します。その後 Enter キーを押します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 25.0,
    videoEnd: 29.883,
    overlays: [
      { id: "box-input-coords", type: "highlight", startTime: 25.0, endTime: 29.883, target: { x: 0.6, y: 0.949, width: 0.4, height: 0.0324 }, animation: "pulse", label: "キー入力エリア: 0 0 0 を入力後 Enter" }
    ]
  },
  {
    id: "box-9-result",
    title: "作成結果の確認",
    text: "",
    customText: "指定した幅、奥行き、高さ、および原点座標に基づいて直方体が作成されました。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "88%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 29.883,
    videoEnd: 33.017,
    overlays: [
      {
        id: "quiz-box-origin",
        type: "quiz",
        startTime: 32.517,
        endTime: 33.017,
        quizData: {
          question: "本レッスンで直方体を原点に配置するために使用した座標値は何ですか？",
          options: [
            { text: "0 0 0", isCorrect: true, feedback: "正解です！0, 0, 0 はモデル原点を表します。" },
            { text: "100 100 0", isCorrect: false, feedback: "0, 0, 0 はモデル原点を表します。" },
            { text: "50 50 50", isCorrect: false, feedback: "0, 0, 0 はモデル原点を表します。" }
          ]
        }
      }
    ]
  },
  {
    id: "box-10-explain",
    title: "直方体寸法の振り返り",
    text: "",
    customText: "「幅」は直方体の左右の長さ、「奥行き」は前後の長さ、「高さ」は上下の寸法を表します。",
    zoom: "scale(1)", origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "88%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox, waitForNarrationBeforeVideo: true, advanceOnSourceVideoEnd: true, narrateTitle: false,
    videoStart: 33.017, videoEnd: 37.566,
    overlays: [
      {
        id: "box-dim-width",
        type: "dimensionAnnotation",
        startTime: 33.25,
        endTime: 37.566,
        label: "幅",
        labelOffset: { x: -55, y: 10 },
        dimensionType: "diagonal",
        line: { start: { x: 0.44, y: 0.57 }, end: { x: 0.585, y: 0.72 } }
      },
      {
        id: "box-dim-depth",
        type: "dimensionAnnotation",
        startTime: 34.25,
        endTime: 37.566,
        label: "奥行き",
        labelOffset: { x: 55, y: 30 },
        dimensionType: "horizontal",
        line: { start: { x: 0.61, y: 0.71 }, end: { x: 0.695, y: 0.62 } }
      },
      {
        id: "box-dim-height",
        type: "dimensionAnnotation",
        startTime: 35.25,
        endTime: 37.566,
        label: "高さ",
        labelOffset: { x: 55, y: -5 },
        dimensionType: "vertical",
        line: { start: { x: 0.70, y: 0.51 }, end: { x: 0.70, y: 0.605 } }
      },
      {
        id: "quiz-box-final",
        type: "quiz",
        startTime: 37.067,
        endTime: 37.566,
        quizData: {
          question: "直方体のサイズを決定する情報はどれですか？",
          options: [
            { text: "項目入力に入力された寸法値", isCorrect: true, feedback: "正解です！項目入力の寸法がサイズを決定し、座標入力が配置位置を決定します。" },
            { text: "原点座標のみ", isCorrect: false, feedback: "原点座標は位置を決定するもので、サイズではありません。" },
            { text: "選択された視図方向のみ", isCorrect: false, feedback: "視図方向は見え方を変えるだけで、実際のサイズではありません。" }
          ]
        }
      }
    ]
  },
  {
    id: "box-11-recap",
    title: "直方体のまとめ",
    text: "",
    customText: "振り返りましょう。アイコンメニューから「立体配置」と「直方体配置」を選択し、「正面」と「Y方向」を設定、項目入力で幅・奥行き・高さを入力し、原点座標 0, 0, 0 を指定して配置しました。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    recapData: {
      title: "直方体の作成完了",
      items: [
        "「立体配置」から「直方体配置」を選択しました。",
        "正面図とY方向を設定しました。",
        "項目入力で幅、奥行き、高さを入力しました。",
        "原点座標 0, 0, 0 を指定して直方体を配置しました。"
      ]
    }
  }
];

export const polygonTutorialSteps: TutorialStep[] = [
  {
    id: "poly-0-introduction",
    title: "正多角形柱の概要",
    text: "",
    customText: "正多角形柱は、同一形状の多角形面が長方形の側面によって結ばれた3次元ソリッド形状です。CADにおいて、六角ボス、多角形シャフト、六角ナットなどの角柱部品を作成する際に重宝されます。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidPolygon,
    videoStart: 0,
    videoEnd: 4.8,
    holdVideo: true,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
  },
  {
    id: "poly-1-tool-selection",
    title: "正多角形柱の選択",
    text: "",
    customText: "アイコンメニューから「立体配置」を開き、「正多角形柱配置」を選択します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidPolygon,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 0,
    videoEnd: 4.8,
    overlays: [
      { id: "poly-shape-placement", type: "highlight", startTime: 0.75, endTime: 2.2, target: { x: 0.908, y: 0.123, width: 0.07, height: 0.026 }, animation: "pulse", label: "立体配置" },
      { id: "poly-place-polygon", type: "highlight", startTime: 2.2, endTime: 4.8, target: { x: 0.945, y: 0.145, width: 0.017, height: 0.032 }, animation: "pulse", label: "正多角形柱", labelPosition: "bottom" }
    ]
  },
  {
    id: "poly-2-front-view",
    title: "正面図の設定",
    text: "",
    customText: "3D視図ツールバーから「正面」を選択します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidPolygon,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 4.8,
    videoEnd: 7.8,
    overlays: [
      { id: "poly-front-view", type: "highlight", startTime: 5.0, endTime: 7.8, target: { x: 0.438, y: 0.037, width: 0.016, height: 0.03 }, animation: "pulse", label: "正面図", labelPosition: "bottom" }
    ]
  },
  {
    id: "poly-3-command-options",
    title: "多角形設定の確認",
    text: "",
    customText: "コマンドメニューで「多角柱」「立体配置」「寸法指定」を確認し、「Y方向」を選択します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidPolygon,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 7.8,
    videoEnd: 15.0,
    overlays: [
      { id: "poly-opt-prism", type: "highlight", startTime: 7.8, endTime: 9.4, target: { x: 0.001, y: 0.671, width: 0.036, height: 0.023 }, animation: "pulse", label: "多角柱", labelPosition: "right" },
      { id: "poly-opt-placement", type: "highlight", startTime: 9.4, endTime: 11.0, target: { x: 0.001, y: 0.813, width: 0.035, height: 0.023 }, animation: "pulse", label: "立体配置", labelPosition: "right" },
      { id: "poly-opt-dimension", type: "highlight", startTime: 11.0, endTime: 12.75, target: { x: 0.001, y: 0.87, width: 0.035, height: 0.023 }, animation: "pulse", label: "寸法指定", labelPosition: "right" },
      { id: "poly-opt-y-orientation", type: "highlight", startTime: 12.75, endTime: 14.75, target: { x: 0.017, y: 0.846, width: 0.019, height: 0.023 }, animation: "pulse", label: "Y方向", labelPosition: "right" },
      {
        id: "quiz-poly-command",
        type: "quiz",
        startTime: 14.75,
        endTime: 15.0,
        quizData: {
          question: "本レッスンで実演された多面体ソリッドを作成するコマンドはどれですか？",
          options: [
            { text: "正多角形柱", isCorrect: true, feedback: "正解です！正多角形柱コマンドで多面体ソリッドを作成します。" },
            { text: "円柱", isCorrect: false, feedback: "この形状には正多角形柱コマンドを使用します。" },
            { text: "円錐", isCorrect: false, feedback: "この形状には正多角形柱コマンドを使用します。" }
          ]
        }
      }
    ]
  },
  {
    id: "poly-4-dimensions",
    title: "多角形寸法の入力",
    text: "",
    customText: "項目入力領域で、角数、中心軌道直径、高さを入力します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidPolygon,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 15.0,
    videoEnd: 22.3,
    overlays: [
      { id: "poly-item-entry", type: "highlight", startTime: 15.0, endTime: 16.0, target: { ...polygonOverlayLayout.itemEntryArea }, animation: "pulse", label: "項目入力領域" },
      { id: "poly-input-sides", type: "highlight", startTime: 16.0, endTime: 18.8, target: { x: 0.07, y: 0.948, width: 0.055, height: 0.028 }, animation: "pulse", label: "角数" },
      { id: "poly-input-diameter", type: "highlight", startTime: 18.8, endTime: 20.5, target: { x: 0.124, y: 0.948, width: 0.078, height: 0.028 }, animation: "pulse", label: "中心軌道直径" },
      { id: "poly-input-height", type: "highlight", startTime: 20.5, endTime: 22.05, target: { x: 0.2, y: 0.948, width: 0.079, height: 0.028 }, animation: "pulse", label: "高さ" },
      {
        id: "quiz-poly-dimensions",
        type: "quiz",
        startTime: 22.05,
        endTime: 22.3,
        quizData: {
          question: "本レッスンの正多角形柱を定義するパラメータはどれですか？",
          options: [
            { text: "角数、中心軌道直径、高さ", isCorrect: true, feedback: "正解です！この3つの値で正多角形柱を定義します。" },
            { text: "幅、奥行き、高さ", isCorrect: false, feedback: "それらは直方体の値です。正多角形柱では角数、直径、高さを使用します。" },
            { text: "底面直径と上面直径のみ", isCorrect: false, feedback: "正多角形柱では角数、直径、高さを使用します。" }
          ]
        }
      }
    ]
  },
  {
    id: "poly-5-origin",
    title: "正多角形柱の配置位置",
    text: "",
    customText: "キー入力エリアで「0 0 0」を入力し、正多角形柱をモデル原点に配置します。その後 Enter キーを押します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidPolygon,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 22.3,
    videoEnd: 26.5,
    overlays: [
      { id: "poly-input-origin", type: "highlight", startTime: 22.8, endTime: 26.5, target: { x: 0.6, y: 0.949, width: 0.4, height: 0.0324 }, animation: "pulse", label: "原点座標: 0 0 0" }
    ]
  },
  {
    id: "poly-6-result",
    title: "作成結果の確認",
    text: "",
    customText: "指定した角数、中心軌道直径、高さ、および原点座標に基づいて正多角形柱が作成されました。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "86%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidPolygon,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 26.5,
    videoEnd: 28.3
  },
  {
    id: "poly-7-explain",
    title: "多角形柱寸法の振り返り",
    text: "",
    customText: "「角数」は多角形断面の頂点数を決定し、「中心軌道直径」はその輪郭サイズを制御し、「高さ」は角柱の上下長さを測定します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "88%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidPolygon,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    advanceOnSourceVideoEnd: true,
    videoStart: 28.3,
    videoEnd: 33.4,
    overlays: [
      {
        id: "poly-dim-sides",
        type: "polygonOutline",
        startTime: 30.0,
        endTime: 33.4,
        label: "角数",
        labelOffset: { x: 0, y: -8 },
        points: [
          { x: 0.493, y: 0.377 },
          { x: 0.572, y: 0.353 },
          { x: 0.636, y: 0.416 },
          { x: 0.614, y: 0.503 },
          { x: 0.532, y: 0.523 },
          { x: 0.473, y: 0.463 }
        ]
      },
      {
        id: "poly-dim-diameter",
        type: "dimensionAnnotation",
        startTime: 31.0,
        endTime: 33.4,
        label: "中心軌道直径",
        labelOffset: { x: 20, y: 30 },
        dimensionType: "horizontal",
        line: { start: { x: 0.54, y: 0.78 }, end: { x: 0.62, y: 0.76 } }
      },
      {
        id: "poly-dim-height",
        type: "dimensionAnnotation",
        startTime: 32.0,
        endTime: 33.4,
        label: "高さ",
        labelOffset: { x: 50, y: 0 },
        dimensionType: "vertical",
        line: { start: { x: 0.65, y: 0.43 }, end: { x: 0.65, y: 0.66 } }
      },
      {
        id: "quiz-poly-origin",
        type: "quiz",
        startTime: 32.9,
        endTime: 33.4,
        quizData: {
          question: "正多角形柱をモデル原点に配置する座標値は何ですか？",
          options: [
            { text: "0, 0, 0", isCorrect: true, feedback: "正解です！0, 0, 0 でモデル原点へ配置します。" },
            { text: "100, 0, 0", isCorrect: false, feedback: "0, 0, 0 がモデル原点の座標です。" },
            { text: "50, 50, 50", isCorrect: false, feedback: "0, 0, 0 がモデル原点の座標です。" }
          ]
        }
      }
    ]
  },
  {
    id: "poly-8-recap",
    title: "多角形柱のまとめ",
    text: "",
    customText: "振り返りましょう。アイコンメニューから「立体配置」と「正多角形柱配置」を選択し、「正面」と「Y方向」を設定、項目入力で角数・直径・高さを入力し、原点座標 0, 0, 0 を指定して配置しました。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    recapData: {
      title: "正多角形柱の作成完了",
      items: [
        "正面図と正多角形柱を選択しました。",
        "必要なコマンドメニュー設定を確認しました。",
        "角数、中心軌道直径、高さを入力しました。",
        "原点座標 0, 0, 0 を指定して配置しました。"
      ]
    }
  }
];

export const coneTutorialSteps: TutorialStep[] = [
  {
    id: "cone-0-introduction",
    title: "円錐の概要",
    text: "",
    customText: "円錐は、円形の底面を持ち、頂上に向かって細くなる3次元ソリッド形状です。CADにおいて、テーパ部品、レデューサー、漏斗、ノズル、円錐状フィーチャーの作成に使用されます。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCone,
    videoStart: 0,
    videoEnd: 3.25,
    holdVideo: true,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
  },
  {
    id: "cone-1-tool-selection",
    title: "円錐ツールの選択",
    text: "",
    customText: "アイコンメニューから「立体配置」を開き、「円錐配置」を選択します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCone,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 0,
    videoEnd: 3.25,
    overlays: [
      { id: "cone-shape-arrangement", type: "highlight", startTime: 0.75, endTime: 1.6, target: { x: 0.908, y: 0.123, width: 0.071, height: 0.028 }, animation: "pulse", label: "立体配置", labelPosition: "top" },
      { id: "cone-place-cone", type: "highlight", startTime: 1.6, endTime: 3.25, target: { x: 0.91, y: 0.173, width: 0.02, height: 0.035 }, animation: "pulse", label: "円錐", labelPosition: "bottom" }
    ]
  },
  {
    id: "cone-2-front-view",
    title: "正面図の設定",
    text: "",
    customText: "3D視図ツールバーから「正面」を選択します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCone,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 3.25,
    videoEnd: 6.25,
    overlays: [
      { id: "cone-front-view", type: "highlight", startTime: 3.25, endTime: 6.25, target: { x: 0.438, y: 0.037, width: 0.016, height: 0.03 }, animation: "pulse", label: "正面図", labelPosition: "bottom" }
    ]
  },
  {
    id: "cone-3-command-options",
    title: "円錐設定の確認",
    text: "",
    customText: "コマンドメニューで「円錐」と「立体配置」を確認し、「Y方向」を選択します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCone,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 6.25,
    videoEnd: 11.25,
    overlays: [
      { id: "cone-opt-cone", type: "highlight", startTime: 6.35, endTime: 7.15, target: { x: 0.0, y: 0.688, width: 0.036, height: 0.023 }, animation: "pulse", label: "円錐", labelPosition: "right" },
      { id: "cone-opt-placement", type: "highlight", startTime: 7.15, endTime: 8.15, target: { x: 0.001, y: 0.813, width: 0.035, height: 0.023 }, animation: "pulse", label: "立体配置", labelPosition: "right" },
      { id: "cone-opt-y-orientation", type: "highlight", startTime: 9.75, endTime: 11.0, target: { x: 0.017, y: 0.862, width: 0.019, height: 0.023 }, animation: "pulse", label: "Y方向", labelPosition: "right" },
      {
        id: "quiz-cone-command",
        type: "quiz",
        startTime: 11.0,
        endTime: 11.25,
        quizData: {
          question: "この円錐配置手順で選択されている配置方向はどれですか？",
          options: [
            { text: "Y方向", isCorrect: true, feedback: "正解です！この手順ではY方向を使用します。" },
            { text: "X方向", isCorrect: false, feedback: "この手順ではY方向を使用します。" },
            { text: "Z方向", isCorrect: false, feedback: "この手順ではY方向を使用します。" }
          ]
        }
      }
    ]
  },
  {
    id: "cone-4-dimensions",
    title: "円錐パラメータの入力",
    text: "",
    customText: "項目入力領域で、底面直径、上面直径、および高さを入力します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCone,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 11.25,
    videoEnd: 22.5,
    overlays: [
      { id: "cone-item-entry", type: "highlight", startTime: 11.25, endTime: 11.75, target: { ...coneOverlayLayout.itemEntryArea }, animation: "pulse", label: "項目入力領域" },
      { id: "cone-input-base", type: "highlight", startTime: 11.75, endTime: 16.25, target: { x: 0.07, y: 0.948, width: 0.09, height: 0.028 }, animation: "pulse", label: "底面直径" },
      { id: "cone-input-top", type: "highlight", startTime: 16.25, endTime: 19.25, target: { x: 0.16, y: 0.948, width: 0.09, height: 0.028 }, animation: "pulse", label: "上面直径" },
      { id: "cone-input-height", type: "highlight", startTime: 19.25, endTime: 22.25, target: { x: 0.25, y: 0.948, width: 0.09, height: 0.028 }, animation: "pulse", label: "高さ" },
      {
        id: "quiz-cone-parameters",
        type: "quiz",
        startTime: 22.25,
        endTime: 22.5,
        quizData: {
          question: "本レッスンの円錐を定義する寸法項目はどれですか？",
          options: [
            { text: "底面直径、上面直径、高さ", isCorrect: true, feedback: "正解です！この3つの寸法で円錐を定義します。" },
            { text: "幅、奥行き、高さ", isCorrect: false, feedback: "それらは直方体の値であり、円錐のものではありません。" },
            { text: "軌道直径と高さのみ", isCorrect: false, feedback: "この円錐には両方の直径値と高さが必要です。" }
          ]
        }
      }
    ]
  },
  {
    id: "cone-5-origin",
    title: "円錐の配置位置",
    text: "",
    customText: "キー入力エリアで「0 0 0」を入力し、円錐をモデル原点に配置します。その後 Enter キーを押します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCone,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 22.5,
    videoEnd: 24.75,
    overlays: [
      { id: "cone-input-origin", type: "highlight", startTime: 22.5, endTime: 24.75, target: { x: 0.47, y: 0.949, width: 0.53, height: 0.0324 }, animation: "pulse", label: "原点座標: 0 0 0" }
    ]
  },
  {
    id: "cone-6-result",
    title: "作成結果の確認",
    text: "",
    customText: "指定した底面直径、上面直径、高さ、および原点座標に基づいて円錐が作成されました。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "88%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCone,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 24.75,
    videoEnd: 27.0
  },
  {
    id: "cone-7-explain",
    title: "円錐寸法の振り返り",
    text: "",
    customText: "「底面直径」は下側の円形面を制御し、「上面直径」は上側の円形面を制御し、「高さ」は円錐の上下方向の長さを測定します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "88%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCone,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    advanceOnSourceVideoEnd: true,
    videoStart: 27.0,
    videoEnd: 30.866667,
    overlays: [
      { id: "cone-dim-base", type: "dimensionAnnotation", startTime: 27.25, endTime: 30.866667, label: "底面直径", labelOffset: { x: 0, y: 28 }, dimensionType: "horizontal", line: { start: { x: 0.5, y: 0.76 }, end: { x: 0.655, y: 0.76 } } },
      { id: "cone-dim-top", type: "dimensionAnnotation", startTime: 28.25, endTime: 30.866667, label: "上面直径", labelOffset: { x: -8, y: -12 }, dimensionType: "horizontal", line: { start: { x: 0.53, y: 0.33 }, end: { x: 0.61, y: 0.33 } } },
      { id: "cone-dim-height", type: "dimensionAnnotation", startTime: 29.25, endTime: 30.866667, label: "高さ", labelOffset: { x: 55, y: 0 }, dimensionType: "vertical", line: { start: { x: 0.66, y: 0.36 }, end: { x: 0.66, y: 0.72 } } },
      {
        id: "quiz-cone-origin",
        type: "quiz",
        startTime: 30.366667,
        endTime: 30.866667,
        quizData: {
          question: "円錐をモデル原点に配置する座標値は何ですか？",
          options: [
            { text: "0, 0, 0", isCorrect: true, feedback: "正解です！0, 0, 0 でモデル原点へ配置します。" },
            { text: "100, 0, 0", isCorrect: false, feedback: "0, 0, 0 がモデル原点の座標です。" },
            { text: "50, 50, 50", isCorrect: false, feedback: "0, 0, 0 がモデル原点の座標です。" }
          ]
        }
      }
    ]
  },
  {
    id: "cone-8-recap",
    title: "円錐のまとめ",
    text: "",
    customText: "振り返りましょう。アイコンメニューから「立体配置」と「円錐配置」を選択し、「正面」と「Y方向」を設定、項目入力で底面直径・上面直径・高さを入力し、原点座標 0, 0, 0 を指定して配置しました。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    recapData: {
      title: "円錐の作成完了",
      items: [
        "アイコンメニューから「立体配置」を開き、「円錐配置」を選択しました。",
        "正面図とY方向を設定しました。",
        "底面直径、上面直径、高さを入力しました。",
        "原点座標 0, 0, 0 を指定して円錐を配置しました。"
      ]
    }
  }
];

export const torusTutorialSteps: TutorialStep[] = [
  {
    id: "torus-0-introduction",
    title: "トーラスの概要",
    text: "",
    customText: "トーラスは、円形断面を中心軸の周りに回転させて形成されるリング状の3次元ソリッドです。CADにおいて、Oリング、シール、リング部材、曲がりパイプなどの作成に活用されます。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidTorus,
    videoStart: 0,
    videoEnd: 3.25,
    holdVideo: true,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
  },
  {
    id: "torus-1-tool-selection",
    title: "トーラスツールの選択",
    text: "",
    customText: "アイコンメニューから「立体配置」を開き、「トーラス配置」を選択します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidTorus,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 0,
    videoEnd: 3.25,
    overlays: [
      { id: "torus-shape-arrangement", type: "highlight", startTime: 1.8, endTime: 2.2, target: { x: 0.908, y: 0.123, width: 0.071, height: 0.028 }, animation: "pulse", label: "立体配置", labelPosition: "top" },
      { id: "torus-place-torus", type: "highlight", startTime: 2.4, endTime: 3.25, target: { x: 0.926, y: 0.173, width: 0.021, height: 0.037 }, animation: "pulse", label: "トーラス", labelPosition: "bottom" }
    ]
  },
  {
    id: "torus-2-front-view",
    title: "正面図の設定",
    text: "",
    customText: "3D視図ツールバーから「正面」を選択します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidTorus,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 4,
    videoEnd: 5.5,
    overlays: [
      { id: "torus-front-view", type: "highlight", startTime: 4.7, endTime: 5.5, target: { x: 0.438, y: 0.034, width: 0.015, height: 0.035 }, animation: "pulse", label: "正面図", labelPosition: "bottom" }
    ]
  },
  {
    id: "torus-3-command-options",
    title: "トーラス設定の確認",
    text: "",
    customText: "コマンドメニューで「トーラス」と「立体配置」を確認し、「Y方向」を選択します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidTorus,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 7,
    videoEnd: 12.8,
    overlays: [
      { id: "torus-opt-torus", type: "highlight", startTime: 7.5, endTime: 8.75, target: { x: 0.0, y: 0.703, width: 0.037, height: 0.026 }, animation: "pulse", label: "トーラス", labelPosition: "right" },
      { id: "torus-opt-placement", type: "highlight", startTime: 8.75, endTime: 10.25, target: { x: 0.0, y: 0.811, width: 0.037, height: 0.026 }, animation: "pulse", label: "立体配置", labelPosition: "right" },
      { id: "torus-opt-y-orientation", type: "highlight", startTime: 10.5, endTime: 11.4, target: { x: 0.018, y: 0.86, width: 0.018, height: 0.026 }, animation: "pulse", label: "Y方向", labelPosition: "right" },
      {
        id: "quiz-torus-command",
        type: "quiz",
        startTime: 11.9,
        endTime: 12.8,
        quizData: {
          question: "このトーラス配置手順で選択されている配置方向はどれですか？",
          options: [
            { text: "Y方向", isCorrect: true, feedback: "正解です！この手順ではY方向を使用します。" },
            { text: "X方向", isCorrect: false, feedback: "この手順ではY方向を使用します。" },
            { text: "Z方向", isCorrect: false, feedback: "この手順ではY方向を使用します。" }
          ]
        }
      }
    ]
  },
  {
    id: "torus-4-dimensions",
    title: "トーラスパラメータの入力",
    text: "",
    customText: "項目入力領域で、断面直径、中心軌道半径、および回転角を入力します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidTorus,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 12.8,
    videoEnd: 22.25,
    overlays: [
      { id: "torus-item-entry", type: "highlight", startTime: 12.8, endTime: 13.25, target: { x: 0.07, y: 0.948, width: 0.268, height: 0.03 }, animation: "pulse", label: "項目入力領域", labelPosition: "top" },
      { id: "torus-input-section", type: "highlight", startTime: 13.25, endTime: 15, target: { x: 0.07, y: 0.948, width: 0.092, height: 0.03 }, animation: "pulse", label: "断面直径", labelPosition: "top" },
      { id: "torus-input-path", type: "highlight", startTime: 15, endTime: 18, target: { x: 0.161, y: 0.948, width: 0.092, height: 0.03 }, animation: "pulse", label: "経路半径", labelPosition: "top" },
      { id: "torus-input-angle", type: "highlight", startTime: 18, endTime: 22, target: { x: 0.252, y: 0.948, width: 0.086, height: 0.03 }, animation: "pulse", label: "回転角", labelPosition: "top" },
      {
        id: "quiz-torus-parameters",
        type: "quiz",
        startTime: 22,
        endTime: 22.25,
        quizData: {
          question: "本レッスンのトーラスを定義する値はどれですか？",
          options: [
            { text: "断面直径、中心軌道半径、回転角", isCorrect: true, feedback: "正解です！この3つの値でトーラスを定義します。" },
            { text: "幅、奥行き、高さ", isCorrect: false, feedback: "それらは直方体の値であり、トーラスのものではありません。" },
            { text: "底面直径と高さ", isCorrect: false, feedback: "それらはこのトーラスを定義する値ではありません。" }
          ]
        }
      }
    ]
  },
  {
    id: "torus-5-origin",
    title: "トーラスの配置位置",
    text: "",
    customText: "キー入力エリアで「0 0 0」を入力し、トーラスをモデル原点に配置します。その後 Enter キーを押します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidTorus,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 22.25,
    videoEnd: 28,
    overlays: [
      { id: "torus-input-origin", type: "highlight", startTime: 22.25, endTime: 27.75, target: { x: 0.47, y: 0.949, width: 0.53, height: 0.0324 }, animation: "pulse", label: "原点座標: 0 0 0", labelPosition: "top" },
      {
        id: "quiz-torus-origin",
        type: "quiz",
        startTime: 27.75,
        endTime: 28,
        quizData: {
          question: "トーラスをモデル原点に配置する座標値は何ですか？",
          options: [
            { text: "0, 0, 0", isCorrect: true, feedback: "正解です！0, 0, 0 でモデル原点へ配置します。" },
            { text: "100, 0, 0", isCorrect: false, feedback: "0, 0, 0 がモデル原点の座標です。" },
            { text: "50, 50, 50", isCorrect: false, feedback: "0, 0, 0 がモデル原点の座標です。" }
          ]
        }
      }
    ]
  },
  {
    id: "torus-6-result",
    title: "作成結果の確認",
    text: "",
    customText: "指定した断面直径、中心軌道半径、回転角、および原点座標に基づいてトーラスが作成されました。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "88%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidTorus,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 28,
    videoEnd: 30
  },
  {
    id: "torus-7-explain",
    title: "トーラスパラメータの振り返り",
    text: "",
    customText: "「断面直径」はトーラスのパイプ自体の太さを制御します。「中心軌道半径」はトーラス中心からパイプ中心線までの距離を制御します。「回転角」は円形断面が軸周りにどれだけ回転生成されるかを制御します。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "88%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidTorus,
    waitForNarrationBeforeVideo: true,
    advanceOnSourceVideoEnd: true,
    narrateTitle: false,
    videoStart: 30,
    videoEnd: 33.616667,
    overlays: [
      { id: "torus-dim-section", type: "dimensionAnnotation", startTime: 30.5, endTime: 33.616667, label: "断面直径", labelOffset: { x: -105, y: -8 }, dimensionType: "vertical", line: { start: { x: 0.4, y: 0.49 }, end: { x: 0.4, y: 0.54 } } },
      { id: "torus-dim-path", type: "dimensionAnnotation", startTime: 31.5, endTime: 33.616667, label: "経路半径", labelOffset: { x: 80, y: 30 }, dimensionType: "diagonal", line: { start: { x: 0.46, y: 0.64 }, end: { x: 0.57, y: 0.52 } } },
      { id: "torus-dim-angle", type: "dimensionAnnotation", startTime: 32.5, endTime: 33.616667, label: "回転角", labelOffset: { x: 10, y: -45 }, dimensionType: "arc", arc: { center: { x: 0.51, y: 0.58 }, radiusX: 0.14, radiusY: 0.18, startAngle: 221, endAngle: 408 } }
    ]
  },
  {
    id: "torus-8-recap",
    title: "トーラスのまとめ",
    text: "",
    customText: "振り返りましょう。アイコンメニューから「立体配置」と「トーラス配置」を選択し、「正面」と「Y方向」を設定、項目入力で断面直径・中心軌道半径・回転角を入力し、原点座標 0, 0, 0 を指定して配置しました。",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    recapData: {
      title: "トーラスの作成完了",
      items: [
        "アイコンメニューから「立体配置」を開き、「トーラス配置」を選択しました。",
        "コマンドメニュー設定とY方向を確認しました。",
        "断面直径、中心軌道半径、回転角を入力しました。",
        "原点座標 0, 0, 0 を指定してトーラスを配置しました。"
      ]
    }
  }
];
