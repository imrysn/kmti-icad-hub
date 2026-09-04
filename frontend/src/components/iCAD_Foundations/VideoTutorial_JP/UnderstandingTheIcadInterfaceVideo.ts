import type { TutorialStep } from './VideoTutorialViewer';

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 0,
    title: "iCAD インターフェース",
    text: "iCAD インターフェース チュートリアルへようこそ。ここでは、モデリング効率を最大化するために設計された、作業画面の各主要領域について解説します。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
  },
  {
    id: 1,
    title: "画面構成とコマンド",
    text: "各種コマンドメニュー、階層構造を管理するツリービュー、そして立体設計を実際に行う3Dワークスペースの役割を順に見ていきましょう。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
  },
  {
    id: 2,
    title: "タイトルバー",
    text: "最上部にあるのが「タイトルバー」です。ソフトウェア名と、現在編集中の図面ファイル名が表示されます。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "2%", opacity: 1 },
    subtitlePos: { top: "6%", left: "50%", transform: "translateX(-50%)" }
  },
  {
    id: 3,
    title: "メニューバー",
    text: "その直下にあるのが「メニューバー」です。ファイル、表示、情報、設定、ツール、ウィンドウ、ヘルプなどの基本操作メニューが配置されています。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "1.7%", left: "0%", width: "100%", height: "2.6%", opacity: 1 },
    subtitlePos: { top: "6.5%", left: "50%", transform: "translateX(-50%)" },
    wordSpotlights: [
      {
        words: ["ファイル"],
        spotlight: { top: "1.7%", left: "0.1%", width: "3.2%", height: "2.6%", opacity: 1 }
      },
      {
        words: ["表示"],
        spotlight: { top: "1.7%", left: "3.5%", width: "2.6%", height: "2.6%", opacity: 1 }
      },
      {
        words: ["情報"],
        spotlight: { top: "1.7%", left: "6.1%", width: "4.3%", height: "2.6%", opacity: 1 }
      },
      {
        words: ["設定"],
        spotlight: { top: "1.7%", left: "10.4%", width: "2.5%", height: "2.6%", opacity: 1 }
      },
      {
        words: ["ツール"],
        spotlight: { top: "1.7%", left: "12.8%", width: "3.5%", height: "2.6%", opacity: 1 }
      },
      {
        words: ["ウィンドウ"],
        spotlight: { top: "1.7%", left: "16.3%", width: "3.9%", height: "2.6%", opacity: 1 }
      },
      {
        words: ["ヘルプ"],
        spotlight: { top: "1.7%", left: "20.3%", width: "3.2%", height: "2.6%", opacity: 1 }
      }
    ]
  },
  {
    id: 5,
    title: "コマンドメニュー",
    text: "画面の一番左側にあるのが「コマンドメニュー」です。機能ごとにまとめられたコマンド群が含まれ、主に2D作業で頻繁に使用されます。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "26.7%", left: "0%", width: "7.8%", height: "73%", opacity: 1 },
    subtitlePos: { top: "30%", left: "9%" }
  },
  {
    id: 6,
    title: "ツリービュー",
    text: "その隣にあるのが「ツリービュー」です。図面内のすべての3D部品やグループを、見やすい階層構造で整理・表示します。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "9.2%", left: "7.5%", width: "13.1%", height: "86.4%", opacity: 1 },
    subtitlePos: { top: "30%", left: "22%" }
  },
  {
    id: 7,
    title: "作業領域",
    text: "中央の広い領域がメインの「作業領域」です。すべての3Dモデリングやアセンブリの組立操作はここで行われます。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "9.2%", left: "20.2%", width: "70.9%", height: "86.4%", opacity: 1 },
    subtitlePos: { bottom: "12%", left: "22%" }
  },
  {
    id: 8,
    title: "アイコンメニュー",
    text: "画面右端にあるのが「アイコンメニュー」です。3Dモデルに対する多様な操作を素早く実行するためのアイコンボタンが並んでいます。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "9.2%", left: "90.7%", width: "9.2%", height: "86.4%", opacity: 1 },
    subtitlePos: { top: "30%", right: "10.5%" }
  },
  {
    id: 9,
    title: "項目入力",
    text: "左下にあるのが「項目入力」領域です。コマンド実行に必要なパラメータ値や文字、寸法を入力します。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "94.8%", left: "7.5%", width: "30%", height: "3.7%", opacity: 1 },
    subtitlePos: { bottom: "10%", left: "7.5%" }
  },
  {
    id: 10,
    title: "キー入力",
    text: "その右側にあるのが「キー入力」領域です。正確な座標値 (X, Y, Z) やキーボードからの数値を直接手入力します。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "94.8%", left: "37.3%", width: "62.6%", height: "3.7%", opacity: 1 },
    subtitlePos: { bottom: "10%", left: "37.3%" }
  },
  {
    id: 4,
    title: "ツールバー",
    text: "メニューの下にあるのが「ツールバー」です。作業内容に応じて表示・非表示をカスタマイズできる便利なショートカットアイコン群です。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "3.3%", left: "7.5%", width: "92.5%", height: "6.6%", opacity: 1 },
    subtitlePos: { top: "11%", left: "50%", transform: "translateX(-50%)" }
  },
  {
    id: 11,
    title: "メッセージ領域",
    text: "最後に、最下部に位置するのが「メッセージ領域」です。操作に関するガイダンスやプロンプトを表示し、エラー時は赤色で警告します。これで概要解説は完了です。",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "98%", left: "7.5%", width: "92.5%", height: "3%", opacity: 1 },
    subtitlePos: { bottom: "10%", left: "50%", transform: "translateX(-50%)" }
  },
  {
    id: 13,
    title: "理解度チェック",
    text: "",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { bottom: "10%", left: "50%", transform: "translateX(-50%)" },
    quizData: {
      question: "正確な座標値を手動で直接入力する場所はどこですか？",
      options: [
        { text: "項目入力", isCorrect: false, feedback: "項目入力は特定のパラメータ値や寸法設定用です。" },
        { text: "キー入力領域", isCorrect: true, feedback: "正解です！キー入力領域で正確な座標値を直接入力します。" },
        { text: "コマンドメニュー", isCorrect: false, feedback: "コマンドメニューは操作コマンドを選択する場所です。" }
      ]
    }
  },
  {
    id: 14,
    title: "理解度チェック",
    text: "",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { bottom: "10%", left: "50%", transform: "translateX(-50%)" },
    quizData: {
      question: "すべての3D部品を階層構造で整理・表示するパネルはどれですか？",
      options: [
        { text: "ツリービュー", isCorrect: true, feedback: "正解です！" },
        { text: "メッセージ領域", isCorrect: false, feedback: "メッセージ領域は操作ガイダンスやエラーを表示します。" },
        { text: "作業領域", isCorrect: false, feedback: "作業領域はメインの3Dモデリングを行う空間です。" }
      ]
    }
  },
  {
    id: 15,
    title: "振り返り",
    text: "",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { bottom: "10%", left: "50%", transform: "translateX(-50%)" },
    recapData: {
      title: "インターフェース概要完了",
      items: [
        "「コマンドメニュー」と「アイコンメニュー」から各種ツールを選択します。",
        "「作業領域」ですべての3Dモデリング作業を実行します。",
        "「ツリービュー」で部品を階層構造で管理・確認します。",
        "「項目入力」と「キー入力」から寸法や座標などの数値を入力します。"
      ]
    }
  }
];

export const ICAD_INTERFACE_VIDEO_STEPS = TUTORIAL_STEPS;
export default ICAD_INTERFACE_VIDEO_STEPS;
