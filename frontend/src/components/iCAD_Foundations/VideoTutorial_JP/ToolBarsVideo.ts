import type { TutorialStep } from './VideoTutorialViewer';

export const TOOLBAR_TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: "intro",
    title: "ツールバーの概要",
    text: "ツールバーのチュートリアルへようこそ！このガイドでは、画面上部に配置されたクイックアクセスメニューを巡り、各セクションの機能を詳しく確認します。",
    narrateTitle: false,
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
  },
  {
    id: "file",
    title: "ファイル",
    text: "新規作成、開く、保存、印刷などのコマンドが含まれます。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "3.3%", left: "7.8%", width: "6.2%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", left: "10.9%", transform: "translateX(-50%)" }
  },
  {
    id: "switch-display",
    title: "表示切替",
    text: "投影法の切り替えや寸法値・補助線の表示切替コマンドが含まれます。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "3.3%", left: "13.6%", width: "3.8%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", left: "15.5%", transform: "translateX(-50%)" }
  },
  {
    id: "user-views",
    title: "ユーザ視図",
    text: "ユーザ視図 1、2、3、4への切り替えが含まれます。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "3.3%", left: "17%", width: "6.3%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", left: "20.15%", transform: "translateX(-50%)" }
  },
  {
    id: "screen-ops",
    title: "画面操作",
    text: "範囲拡大、拡大/縮小、全体表示、再描画、前倍率復帰が含まれます。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "3.3%", left: "22.9%", width: "8.8%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", left: "27.3%", transform: "translateX(-50%)" }
  },
  {
    id: "edit",
    title: "編集",
    text: "元に戻す、やり直しが含まれます。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "3.3%", left: "31.3%", width: "3.7%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", left: "33.15%", transform: "translateX(-50%)" }
  },
  {
    id: "3d-view",
    title: "3D視図",
    text: "上面、正面、右側面、左側面、背面、下面、平面指定、3点指定視図が含まれます。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "3.3%", left: "34.7%", width: "11.3%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", left: "40.35%", transform: "translateX(-50%)" }
  },
  {
    id: "shading",
    title: "シェーディング",
    text: "シェーディング、稜線付きシェーディング、陰線処理、ワイヤフレーム表示切替が含まれます。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "3.3%", left: "45.5%", width: "7.5%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", left: "49.25%", transform: "translateX(-50%)" }
  },
  {
    id: "section",
    title: "断面表示",
    text: "作業平面を開く、断面表示への切り替えコマンドが含まれます。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "3.3%", left: "52.7%", width: "3.6%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", left: "54.5%", transform: "translateX(-50%)" }
  },
  {
    id: "2d-view",
    title: "2D視図",
    text: "前視図、視図切替、次視図への切り替えが含まれます。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "3.3%", left: "56.1%", width: "5%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", left: "58.6%", transform: "translateX(-50%)" }
  },
  {
    id: "entry-control",
    title: "入力制御",
    text: "図形要素の選択方式や座標入力モードの指定を行います。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "3.3%", left: "60.7%", width: "26.7%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", left: "74.05%", transform: "translateX(-50%)" }
  },
  {
    id: "screen-mem",
    title: "画面メモリ",
    text: "現在表示されている作業画面の視点状態を記憶・保存します。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "3.3%", left: "87.2%", width: "9.5%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", right: "2%" }
  },
  {
    id: "entry-tool",
    title: "入力ツール",
    text: "追加の図形要素選択ツール群を提供します。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "6.2%", left: "7.8%", width: "40%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "13%", left: "27.8%", transform: "translateX(-50%)" }
  },
  {
    id: "quiz-tb-1",
    title: "理解度チェック",
    text: "",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
    quizData: {
      question: "「元に戻す」や「やり直し」コマンドが含まれるツールバーはどれですか？",
      options: [
        { text: "編集", isCorrect: true, feedback: "正解です！" },
        { text: "画面操作", isCorrect: false, feedback: "画面操作はズームやパンのためのツールバーです。" },
        { text: "ファイル", isCorrect: false, feedback: "ファイルは保存や開くなどのためのツールバーです。" }
      ]
    }
  },
  {
    id: "quiz-tb-2",
    title: "理解度チェック",
    text: "",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
    quizData: {
      question: "シェーディング表示とワイヤフレーム表示を切り替えるツールバーはどれですか？",
      options: [
        { text: "シェーディング", isCorrect: true, feedback: "正解です！シェーディングツールバーで描画スタイルを制御します。" },
        { text: "表示切替", isCorrect: false, feedback: "表示切替は寸法や投影法のためのツールバーです。" },
        { text: "3D視図", isCorrect: false, feedback: "3D視図は標準視図方向の切り替え用です。" }
      ]
    }
  },
  {
    id: "recap-tb",
    title: "振り返り",
    text: "",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
    recapData: {
      title: "ツールバー完了",
      items: [
        "「ファイル」と「編集」は図面全体の操作や履歴管理を行います。",
        "「画面操作」と「3D視図」は表示画面や観察方向を管理します。",
        "「シェーディング」はモデルの描画スタイルを制御します。",
        "「入力制御」と「入力ツール」は図形選択や座標入力モードを設定します。"
      ]
    }
  },
  {
    id: "outro",
    title: "まとめ",
    text: "これでツールバーの解説は完了です。これらのクイックアクセスコマンドを活用して、モデリング作業をスピーディに進めましょう！",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
  }
];

export const TOOLBARS_VIDEO_STEPS = TOOLBAR_TUTORIAL_STEPS;
export default TOOLBARS_VIDEO_STEPS;
