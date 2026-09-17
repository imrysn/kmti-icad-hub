import type { InteractiveVideoQuestion } from '../InteractiveVideoLesson/types';
import type { FoundationLanguage } from './curriculum';
import { FOUNDATION_LESSONS, resolveFoundationLesson } from './curriculum';

import { finalKnowledgeCheck } from './finalKnowledgeCheck';

export function foundationKnowledgeQuestions(language: FoundationLanguage, lessonId = 'F10.6'): InteractiveVideoQuestion[] {
  // iCAD Professional P7.4 Cone and P7.5 Torus have no Foundations source lesson.
  if (lessonId === 'P7.5' || lessonId === 'P7.4') {
    const ja = language === 'ja';
    const torus = lessonId === 'P7.5';
    const labels = torus
      ? (ja ? ['断面直径、経路半径、回転角', '直径と高さのみ', '奥行き、幅、高さ', '頂点数、直径、高さ'] : ['Section Diameter, Path Radius, and Turn Angle', 'Diameter and Height only', 'Depth, Width, and Height', 'Number of sides, Diameter, and Height'])
      : (ja ? ['底面直径、上面直径、高さ', '直径のみ', '奥行き、幅、高さ', '断面直径と回転角'] : ['Base Diameter, Top Diameter, and Height', 'Diameter only', 'Depth, Width, and Height', 'Section Diameter and Turn Angle']);
    const shapeName = torus ? (ja ? 'トーラス' : 'Torus') : (ja ? '円錐台' : 'Cone');
    return [{
      id: `${lessonId}-knowledge-check`, prompt: ja ? `この練習で${shapeName}を作成するために入力する値はどれですか？` : `Which values are entered to create the ${shapeName} in this exercise?`,
      choices: labels.map((label, index) => ({
        id: `${lessonId}-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 0,
        feedback: index === 0 ? `${ja ? '正解：' : 'Correct Answer: '}A. ${labels[0]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  if (lessonId.startsWith('P8.')) {
    const ja = language === 'ja';
    if (lessonId === 'P8.1') {
      const labels = ja ? ['対象の位置', '対象の大きさ', '対象の色', '対象のシェーディング']
        : ["The object's position", "The object's size", "The object's color", "The object's shading"];
      return [{
        id: 'P8.1-knowledge-check', prompt: ja ? 'Move（移動）コマンドは何を変更しますか？' : 'What does the Move command change?',
        choices: labels.map((label, index) => ({
          id: `P8.1-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 0,
          feedback: index === 0 ? `${ja ? '正解：' : 'Correct Answer: '}A. ${labels[0]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
        })),
      }];
    }
    if (lessonId === 'P8.2') {
      const labels = ja ? ['元の対象を残したまま複製が作成される', '元の対象が削除される', '対象の大きさが2倍になる', '対象の表示方向が変わる']
        : ['A duplicate is created while keeping the original object', 'The original object is deleted', 'The object doubles in size', 'The viewing direction changes'];
      return [{
        id: 'P8.2-knowledge-check', prompt: ja ? 'Copy（複写）コマンドを使うとどうなりますか？' : 'What happens when you use the Copy command?',
        choices: labels.map((label, index) => ({
          id: `P8.2-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 0,
          feedback: index === 0 ? `${ja ? '正解：' : 'Correct Answer: '}A. ${labels[0]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
        })),
      }];
    }
    if (lessonId === 'P8.3') {
      const labels = ja ? ['2点', '1点', '3点', '4点']
        : ['2 points', '1 point', '3 points', '4 points'];
      return [{
        id: 'P8.3-knowledge-check', prompt: ja ? 'Rotate（回転）コマンドで回転軸を定義するには何点指定しますか？' : 'How many points are selected to define the axis of rotation in the Rotate command?',
        choices: labels.map((label, index) => ({
          id: `P8.3-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 0,
          feedback: index === 0 ? `${ja ? '正解：' : 'Correct Answer: '}A. ${labels[0]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
        })),
      }];
    }
    if (lessonId === 'P8.4') {
      const labels = ja ? ['元のオブジェクトを残したまま回転した複製を作成する', '回転角度を自由に変更できない', '回転軸を自動で決定する', '3D オブジェクトのサイズを拡大する']
        : ['It creates a rotated copy while keeping the original object', 'The rotation angle cannot be adjusted', 'The rotation axis is chosen automatically', 'It scales up the 3D object'];
      return [{
        id: 'P8.4-knowledge-check', prompt: ja ? 'Rotate Copy（回転複写）コマンドと Rotate（回転）コマンドの主な違いは何ですか？' : 'What is the main difference between Rotate Copy and Rotate?',
        choices: labels.map((label, index) => ({
          id: `P8.4-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 0,
          feedback: index === 0 ? `${ja ? '正解：' : 'Correct Answer: '}A. ${labels[0]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
        })),
      }];
    }
    if (lessonId === 'P8.5') {
      const labels = ja ? ['3点を指定するか、面を左クリックする', '1点のみ指定する', 'Enter キーを押すだけ', 'X軸の値を入力する']
        : ['Select 3 points or left-click a face', 'Select 1 point only', 'Only press Enter', 'Enter an X-axis coordinate'];
      return [{
        id: 'P8.5-knowledge-check', prompt: ja ? 'Mirror（ミラー）コマンドで対称面を定義するには何を行いますか？' : 'How do you define the mirror plane in the Mirror command?',
        choices: labels.map((label, index) => ({
          id: `P8.5-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 0,
          feedback: index === 0 ? `${ja ? '正解：' : 'Correct Answer: '}A. ${labels[0]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
        })),
      }];
    }
    if (lessonId === 'P8.6') {
      const labels = ja ? ['指定した対称面を基準に対称な複製を作成する', 'オブジェクトを完全に削除する', '2D 図面へ自動変換する', '原点の座標を反転する']
        : ['Creates a symmetrical copy across a specified mirror plane', 'Completely deletes the object', 'Automatically converts to a 2D drawing', 'Inverts the origin coordinates'];
      return [{
        id: 'P8.6-knowledge-check', prompt: ja ? 'Mirror Copy（ミラー複写）コマンドは何をしますか？' : 'What does the Mirror Copy command do?',
        choices: labels.map((label, index) => ({
          id: `P8.6-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 0,
          feedback: index === 0 ? `${ja ? '正解：' : 'Correct Answer: '}A. ${labels[0]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
        })),
      }];
    }
    if (lessonId === 'P8.7') {
      const labels = ja ? ['選択したオブジェクトをモデルから削除する', 'オブジェクトを非表示にする', 'オブジェクトを別のレイヤーに移動する', 'オブジェクトの履歴を元戻す']
        : ['Removes the selected object from the model', 'Hides the object from view', 'Moves the object to another layer', 'Undoes the object history'];
      return [{
        id: 'P8.7-knowledge-check', prompt: ja ? 'Delete（削除）コマンドは何をしますか？' : 'What does the Delete command do?',
        choices: labels.map((label, index) => ({
          id: `P8.7-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 0,
          feedback: index === 0 ? `${ja ? '正解：' : 'Correct Answer: '}A. ${labels[0]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
        })),
      }];
    }
  }
  if (lessonId === 'F10.1') {
    const ja = language === 'ja';
    const labels = ja ? ['ツール選択 → 寸法入力 → 位置指定 → 確定', '保存 → 削除 → 回転 → 閉じる', 'ビュー選択 → シェーディング → 印刷 → 終了', 'パン → コピー → 閉じる → 測定']
      : ['Select Tool → Enter Size → Specify Position → Confirm', 'Save → Delete → Rotate → Close', 'Select View → Shade → Print → Exit', 'Pan → Copy → Close → Measure'];
    return [{
      id: 'F10.1-knowledge-check', prompt: ja ? '基本的な 3D 形状を作成する手順として正しいものはどれですか？' : 'Which sequence best represents the basic process for creating a simple 3D shape?',
      choices: labels.map((label, index) => ({
        id: `F10.1-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 0,
        feedback: index === 0 ? `${ja ? '正解：' : 'Correct Answer: '}A. ${labels[0]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  // Stable ID for the displayed F9.7 Basic Delete.
  if (lessonId === 'F9.11') {
    const ja = language === 'ja';
    const labels = ja ? ['コピーを作成する', '対象を移動する', '選択した対象を削除する', 'モデルの表示を変更する']
      : ['Creates a copy', 'Moves the object', 'Removes the selected object', 'Changes the model view'];
    return [{
      id: 'F9.11-knowledge-check', prompt: ja ? 'Delete コマンドは何をしますか？' : 'What does the Delete command do?',
      choices: labels.map((label, index) => ({
        id: `F9.11-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 2,
        feedback: index === 2 ? `${ja ? '正解：' : 'Correct Answer: '}C. ${labels[2]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  // Stable ID for the displayed F9.6 Basic Copy.
  if (lessonId === 'F9.10') {
    const ja = language === 'ja';
    const labels = ja ? ['元の対象が削除される', '対象が移動する', '複製が作成される', '対象の大きさが変わる']
      : ['The original object is deleted', 'The object is moved', 'A duplicate is created', 'The object changes size'];
    return [{
      id: 'F9.10-knowledge-check', prompt: ja ? 'Copy コマンドを使うとどうなりますか？' : 'What happens when you use the Copy command?',
      choices: labels.map((label, index) => ({
        id: `F9.10-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 2,
        feedback: index === 2 ? (ja ? '正解：C. 複製が作成される。レッスン完了：iCAD SX で対象をコピーする方法を学びました。' : 'Correct Answer: C. A duplicate is created.\n\nLesson Complete\nYou now know how to copy an object in iCAD SX.') : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  // Stable ID for the displayed F9.5 Basic Move.
  if (lessonId === 'F9.9') {
    const ja = language === 'ja';
    const labels = ja ? ['対象の大きさ', '対象の位置', '対象の色', '対象のシェーディング']
      : ["The object's size", "The object's position", "The object's color", "The object's shading"];
    return [{
      id: 'F9.9-knowledge-check', prompt: ja ? 'Move コマンドは何を変更しますか？' : 'What does the Move command change?',
      choices: labels.map((label, index) => ({
        id: `F9.9-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. ${labels[1]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  // Stable ID for the displayed F9.4 Creating a Polygon.
  if (lessonId === 'F9.7') {
    const ja = language === 'ja';
    const labels = ja ? ['頂点数、直径、高さ', '直径のみ', '表示方向と色', 'ファイル名と保存先']
      : ['Number of sides, Diameter, and Height', 'Diameter only', 'View direction and color', 'File name and folder'];
    return [{
      id: 'F9.7-knowledge-check', prompt: ja ? 'この練習で多角柱を作成するために入力する値はどれですか？' : 'Which inputs are needed to create the Polygonal Prism in this exercise?',
      choices: labels.map((label, index) => ({
        id: `F9.7-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 0,
        feedback: index === 0 ? `${ja ? '正解：' : 'Correct Answer: '}A. ${labels[0]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  // Stable ID for the displayed F9.3 Creating a Cylinder.
  if (lessonId === 'F9.6') {
    const ja = language === 'ja';
    const labels = ja ? ['直径と高さ', '長さと幅のみ', '半径と色', 'ビューとシェーディング']
      : ['Diameter and Height', 'Length and Width only', 'Radius and Color', 'View and Shading'];
    return [{
      id: 'F9.6-knowledge-check', prompt: ja ? '円柱の作成に一般的に必要な値はどれですか？' : 'Which values are commonly needed to create a Cylinder?',
      choices: labels.map((label, index) => ({
        id: `F9.6-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 0,
        feedback: index === 0 ? `${ja ? '正解：' : 'Correct Answer: '}A. ${labels[0]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  // Stable ID for the displayed F9.2 Creating a Box.
  if (lessonId === 'F9.5') {
    const ja = language === 'ja';
    const labels = ja ? ['奥行き（長さ）、幅、高さ', '半径のみ', '直径と角度', 'ビューとシェーディング']
      : ['Depth (length), Width, and Height', 'Radius only', 'Diameter and Angle', 'View and Shading'];
    return [{
      id: 'F9.5-knowledge-check', prompt: ja ? '直方体の作成に通常必要な値はどれですか？' : 'Which values are normally needed to create a Box?',
      choices: labels.map((label, index) => ({
        id: `F9.5-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 0,
        feedback: index === 0 ? `${ja ? '正解：' : 'Correct Answer: '}A. ${labels[0]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  if (lessonId === 'F9.1') {
    const ja = language === 'ja';
    const labels = ja ? ['iCAD SX を終了する', '必要な寸法を入力する', 'シェーディングモードを変更する', 'モデルを削除する']
      : ['Close iCAD SX', 'Enter the required dimensions', 'Change the shading mode', 'Delete the model'];
    return [{
      id: 'F9.1-knowledge-check', prompt: ja ? '3D 形状ツールを選択した後、通常は何をしますか？' : 'What should you normally do after selecting a 3D shape tool?',
      choices: labels.map((label, index) => ({
        id: `F9.1-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. ${labels[1]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  // Stable ID for the displayed F8.3 Closing a Drawing.
  if (lessonId === 'F8.5') {
    const ja = language === 'ja';
    const labels = ja ? ['シェーディングモードを変更する', '作業内容が保存されているか確認する', 'モデルを回転する', '新しいビューを作成する']
      : ['Change the shading mode', 'Check that your work is saved', 'Rotate the model', 'Create a new view'];
    return [{
      id: 'F8.5-knowledge-check', prompt: ja ? '図面を閉じる前に何をすべきですか？' : 'What should you do before closing a drawing?',
      choices: labels.map((label, index) => ({
        id: `F8.5-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. ${labels[1]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  // Stable ID for the displayed F8.2 Saving Your Work.
  if (lessonId === 'F8.3') {
    const ja = language === 'ja';
    const labels = ja ? ['保存', '名前を付けて保存', '閉じる', '開く'] : ['Save', 'Save As', 'Close', 'Open'];
    return [{
      id: 'F8.3-knowledge-check',
      prompt: ja ? '元のファイルを残して別のコピーを作成するには、どのコマンドを使いますか？' : 'Which command should you use if you want to keep the original file and create a separate copy?',
      choices: labels.map((label, index) => ({
        id: `F8.3-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. ${labels[1]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  if (lessonId === 'F8.1') {
    const ja = language === 'ja';
    const labels = ja ? ['新しい設計を始めるとき', '既存のモデルを回転するとき', 'シェーディングモードを変更するとき', 'モデルの面を選択するとき']
      : ['When starting a new design', 'When rotating an existing model', 'When changing the shading mode', 'When selecting a model face'];
    return [{
      id: 'F8.1-knowledge-check', prompt: ja ? '新しいアイテムを作成するのはどのようなときですか？' : 'When should you create a new item?',
      choices: labels.map((label, index) => ({
        id: `F8.1-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 0,
        feedback: index === 0 ? `${ja ? '正解：' : 'Correct Answer: '}A. ${labels[0]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  // Stable ID for the displayed F7.4 Understanding 3D and 2D Drawings.
  if (lessonId === 'F7.8') {
    const ja = language === 'ja';
    const labels = ja ? ['3D モデル', '2D 図面', 'ユーザービュー', 'シェーディング'] : ['3D Model', '2D Drawing', 'User View', 'Shading'];
    return [{
      id: 'F7.8-knowledge-check',
      prompt: ja ? '寸法、注記などの設計情報を伝えるために主に使われるものはどれですか？' : 'Which one is mainly used to communicate dimensions, notes, and other engineering information?',
      choices: labels.map((label, index) => ({
        id: `F7.8-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. ${labels[1]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  // Stable ID for the displayed F7.3 Introduction to Assemblies.
  if (lessonId === 'F7.6') {
    const ja = language === 'ja';
    const labels = ja ? ['一つの表示方向', '複数の部品を組み合わせた一つの設計', '座標値', 'シェーディングモード']
      : ['A single view direction', 'Several Parts combined into one design', 'A coordinate value', 'A shading mode'];
    return [{
      id: 'F7.6-knowledge-check', prompt: ja ? 'iCAD SX のアセンブリとは何ですか？' : 'What is an assembly in iCAD SX?',
      choices: labels.map((label, index) => ({
        id: `F7.6-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. ${labels[1]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  // F7.3 is the stable lesson ID for the displayed F7.2 Understanding Parts.
  if (lessonId === 'F7.3') {
    const ja = language === 'ja';
    const labels = ja ? ['表示方向', 'モデル形状を整理するための構成部品', 'シェーディングモード', '座標値']
      : ['A viewing direction', 'A component used to organize model geometry', 'A shading mode', 'A coordinate value'];
    return [{
      id: 'F7.3-knowledge-check', prompt: ja ? 'iCAD SX の部品とは何ですか？' : 'What is a Part in iCAD SX?',
      choices: labels.map((label, index) => ({
        id: `F7.3-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. ${labels[1]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  if (lessonId === 'F7.1') {
    const ja = language === 'ja';
    const labels = ja ? ['モデル形状', '部品', '図面ファイル', '面'] : ['Model Geometry', 'Part', 'Drawing File', 'Face'];
    return [{
      id: 'F7.1-knowledge-check',
      prompt: ja ? 'iCAD 図面の基本構造で最上位にあるものは何ですか？' : 'What is at the highest level of the basic iCAD drawing structure?',
      choices: labels.map((label, index) => ({
        id: `F7.1-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 2,
        feedback: index === 2 ? `${ja ? '正解：' : 'Correct Answer: '}C. ${labels[2]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  if (lessonId === 'F6.7') {
    const ja = language === 'ja';
    const labels = ja ? ['モデルの色を変更する', '選択できる対象の種類を指定する', 'ビューを回転する', '図面を保存する']
      : ['To change the model color', 'To control what type of object can be selected', 'To rotate the view', 'To save the drawing'];
    return [{
      id: 'F6.7-knowledge-check', prompt: ja ? '検索・選択の種類の目的は何ですか？' : 'What is the purpose of Search / Selection Type?',
      choices: labels.map((label, index) => ({
        id: `F6.7-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. ${labels[1]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  if (lessonId === 'F6.4') {
    const ja = language === 'ja';
    const labels = ja ? ['部品全体を操作したいとき', '部品内の特定の立体一つを操作したいとき', '画面の表示方向を変更したいとき', '図面を保存したいとき']
      : ['When you want to work with the whole Part', 'When you want to work with one specific solid inside a Part', 'When you want to change the screen view', 'When you want to save the drawing'];
    return [{
      id: 'F6.4-knowledge-check', prompt: ja ? '立体要素を選択するのはどのようなときですか？' : 'When should you select a Solid Component?',
      choices: labels.map((label, index) => ({
        id: `F6.4-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. ${labels[1]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  if (lessonId === 'F6.2') {
    const ja = language === 'ja';
    const labels = ja ? ['要素を左クリックする', 'マウスホイールを回す', 'Alt だけを押す', 'ツールバーをダブルクリックする']
      : ['Left-click the element', 'Scroll the mouse wheel', 'Press Alt only', 'Double-click the toolbar'];
    return [{
      id: 'F6.2-knowledge-check', prompt: ja ? 'iCAD SX で通常、要素をどのように選択しますか？' : 'How do you normally select an element in iCAD SX?',
      choices: labels.map((label, index) => ({
        id: `F6.2-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 0,
        feedback: index === 0 ? `${ja ? '正解：' : 'Correct Answer: '}A. ${labels[0]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  if (lessonId === 'F5.6') {
    const ja = language === 'ja';
    const labels = ja ? ["ズーム","パーツのレイアウトを変更する","シェーディング","保存"] : ["Zoom","Change 3D Part Layout","Shading","Save"];
    return [{
      id: 'F5.6-knowledge-check', prompt: ja ? "0, 0, 0 に配置した後で部品の原点を変更するには、何を使いますか？" : "You placed a shape at 0, 0, 0 and now want to change the part’s origin. What should you use?",
      choices: labels.map((label, index) => ({
        id: `F5.6-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. ${labels[1]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  if (lessonId === 'F5.4') {
    const ja = language === 'ja';
    const labels = ja ? ["原点を画面中央へ移動する","形状の配置点を現在の原点に合わせる","必ず形状の中心を原点に合わせる","表示方向を変える"] : ["Moves the origin to the screen center","Places the shape’s placement point at the current origin","Always places the shape’s center at the origin","Changes the viewing direction"];
    return [{
      id: 'F5.4-knowledge-check', prompt: ja ? "例で配置点に 0, 0, 0 を入力すると、どうなりますか？" : "In the example, what does entering 0, 0, 0 for the placement point do?",
      choices: labels.map((label, index) => ({
        id: `F5.4-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. ${labels[1]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  if (lessonId === 'F5.1') {
    const ja = language === 'ja';
    const labels = ['Enter', 'Esc', 'Backspace', 'Alt'];
    return [{
      id: 'F5.1-knowledge-check', prompt: ja ? "入力を確定するキーはどれですか？" : "Which key confirms your input?",
      choices: labels.map((label, index) => ({
        id: `F5.1-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 0,
        feedback: index === 0 ? `${ja ? '正解：' : 'Correct Answer: '}A. ${labels[0]}` : ja ? 'レッスンを確認して、もう一度回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  if (lessonId === 'F4.12') {
    const ja = language === 'ja';
    const labels = ja ? ['CG表示 縁なし', 'CG表示 縁あり', '透過表示', 'CG表示 隠線']
      : ['CG Display – No Edges', 'CG Display – With Edges', 'Transparent Display', 'CG Display – Hidden Lines Removed'];
    return [{
      id: 'F4.12-knowledge-check', prompt: ja ? 'モデルの面の奥にある形状を確認するには、どのシェーディングモードを使いますか？' : 'Which Shading mode should you use when you need to see geometry behind a model surface?',
      choices: labels.map((label, index) => ({
        id: `F4.12-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 2,
        feedback: index === 2 ? `${ja ? '正解：' : 'Correct Answer: '}C. ${labels[2]}` : ja ? 'もう一度レッスンの内容を確認して、回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  if (lessonId === 'F4.6') {
    const ja = language === 'ja';
    const labels = ja ? ['モデルの形状を変更する', 'プリセットの斜め 3D ビューを切り替える', '部品を削除する', 'モデルの寸法を変更する']
      : ['To modify the model shape', 'To switch between preset angled 3D views', 'To delete a part', 'To change model dimensions'];
    return [{
      id: 'F4.6-knowledge-check', prompt: ja ? 'User View ツールバーの目的は何ですか？' : 'What is the purpose of the User View toolbar?',
      choices: labels.map((label, index) => ({
        id: `F4.6-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. ${labels[1]}` : ja ? 'もう一度レッスンの内容を確認して、回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  if (lessonId === 'F4.1') {
    const ja = language === 'ja';
    const labels = ja ? ['平面図', '正面図', '右側面図', '下面図'] : ['Top View', 'Front View', 'Right Side View', 'Bottom View'];
    return [{
      id: 'F4.1-knowledge-check', prompt: ja ? 'モデルを右側から直接表示するコマンドはどれですか？' : 'Which command displays the model directly from the right side?',
      choices: labels.map((label, index) => ({
        id: `F4.1-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 2,
        feedback: index === 2 ? `${ja ? '正解：' : 'Correct Answer: '}C. ${labels[2]}` : (ja ? 'もう一度レッスンの内容を確認して、回答してください。' : 'Review the lesson and try again.'),
      }))
    }];
  }
  if (lessonId === 'F3.6') {
    const ja = language === 'ja';
    const labels = ja ? ['ホイール + 右クリック', 'Alt + 左クリック', 'A と B の両方', 'ホイールのみ'] : ['Scroll Wheel + Right-Click', 'Alt + Left-Click', 'Both A and B', 'Scroll Wheel only'];
    return [{
      id: 'F3.6-knowledge-check', prompt: ja ? 'iCAD SX で 3D ビューの回転に使える操作はどれですか？' : 'Which controls can be used to rotate the 3D view in iCAD SX?',
      choices: labels.map((label, index) => ({
        id: `F3.6-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 2,
        feedback: index === 2 ? `${ja ? '正解：' : 'Correct Answer: '}C. ${labels[2]}` : (ja ? 'もう一度レッスンの内容を確認して、回答してください。' : 'Review the lesson and try again.'),
      }))
    }];
  }
  if (lessonId === 'F3.5') {
    const ja = language === 'ja';
    const labels = ja ? ['左ボタンを押したままにする', 'ホイールを押したままマウスを動かす', '右ボタンをダブルクリックする', 'ホイールを回す'] : ['Hold the left mouse button', 'Hold the scroll wheel and move the mouse', 'Double-click the right mouse button', 'Rotate the scroll wheel'];
    return [{
      id: 'F3.5-knowledge-check', prompt: ja ? 'iCAD SX でパンするには、どうしますか？' : 'How do you pan in iCAD SX?',
      choices: labels.map((label, index) => ({
        id: `F3.5-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. ${labels[1]}` : (ja ? 'もう一度レッスンの内容を確認して、回答してください。' : 'Review the lesson and try again.'),
      }))
    }];
  }
  if (lessonId === 'F3.1') {
    const ja = language === 'ja';
    const labels = ja ? ['マウスの左ボタン', 'マウスホイール', 'キーボードのキー', 'スクロールバー'] : ['Left mouse button', 'Mouse wheel', 'Keyboard key', 'Scroll bar'];
    return [{
      id: 'F3.1-knowledge-check', prompt: ja ? '対象やコマンドを選択するために一般的に使用するマウスボタンはどれですか？' : 'Which mouse button is commonly used to select an object or command?',
      choices: labels.map((label, index) => ({
        id: `F3.1-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 0,
        feedback: index === 0 ? `${ja ? '正解：' : 'Correct Answer: '}A. ${labels[0]}` : (ja ? 'もう一度レッスンの内容を確認して、回答してください。' : 'Review the lesson and try again.'),
      }))
    }];
  }
  if (lessonId === 'F2.9') {
    const ja = language === 'ja';
    const labels = ['File', '3D View', 'System Information', 'Entry Control'];
    return [{
      id: 'F2.9-knowledge-check', prompt: ja ? '3D モデルを見る方向を変更するために主に使用するツールバーはどれですか？' : 'Which toolbar is mainly used to change the viewing direction of a 3D model?',
      choices: labels.map((label, index) => ({
        id: `F2.9-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. 3D View` : (ja ? 'もう一度レッスンの内容を確認して、回答してください。' : 'Review the lesson and try again.'),
      }))
    }];
  }
  if (lessonId === 'F2.1') {
    const ja = language === 'ja';
    const labels = ja ? ['メニューバー', '作業領域', 'メッセージ領域', 'ヘルプメニュー']
      : ['Menu Bar', 'Workspace', 'Message Pane', 'Help Menu'];
    return [{
      id: 'F2.1-knowledge-check', prompt: ja ? '3D モデリングやアセンブリの操作を行う領域はどれですか？' : 'Which area is used for 3D modeling and assembly operations?',
      choices: labels.map((label, index) => ({
        id: `F2.1-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. ${labels[1]}` : (ja ? 'もう一度レッスンの内容を確認して、回答してください。' : 'Review the lesson and try again.'),
      }))
    }];
  }
  if (lessonId === 'F1.6') {
    const ja = language === 'ja';
    const labels = ja ? ['新しい図面を自動で作成する', 'コマンドと操作に関する情報を提供する', 'アプリケーションを閉じる', 'コンピューターの設定を変更する']
      : ['To create a new drawing automatically', 'To provide information about commands and operations', 'To close the application', 'To change the computer settings'];
    return [{
      id: 'F1.6-knowledge-check', prompt: ja ? 'iCAD SX ヘルプの目的は何ですか？' : 'What is the purpose of iCAD SX Help?',
      choices: labels.map((label, index) => ({
        id: `F1.6-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. ${labels[1]}` : (ja ? 'もう一度レッスンの内容を確認して、回答してください。' : 'Review the lesson and try again.'),
      }))
    }];
  }
  if (lessonId === 'F1.5') {
    const ja = language === 'ja';
    const labels = ja ? ['現在の図面を削除する', '重要な作業が保存されていることを確認する', 'すぐにコンピューターの電源を切る', '別のアプリケーションを開く']
      : ['Delete the current drawing', 'Check that your important work is saved', 'Turn off the computer immediately', 'Open another application'];
    return [{
      id: 'F1.5-knowledge-check', prompt: ja ? 'iCAD SX を閉じる前に、何をするべきですか？' : 'What should you do before closing iCAD SX?',
      choices: labels.map((label, index) => ({
        id: `F1.5-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. ${labels[1]}` : (ja ? 'もう一度レッスンの内容を確認して、回答してください。' : 'Review the lesson and try again.'),
      }))
    }];
  }
  if (lessonId === 'F1.4') {
    const ja = language === 'ja';
    const labels = ja ? ['すぐにアプリケーションを閉じる', 'システムの読み込みが完了するまで待つ', 'コンピューターを再起動する', '別の CAD プログラムを開く']
      : ['Immediately close the application', 'Wait for the system to finish loading', 'Restart the computer', 'Open another CAD program'];
    return [{
      id: 'F1.4-knowledge-check', prompt: ja ? 'iCAD SX を開いた後、何をするべきですか？' : 'What should you do after opening iCAD SX?',
      choices: labels.map((label, index) => ({
        id: `F1.4-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. ${labels[1]}` : (ja ? 'もう一度レッスンの内容を確認して、回答してください。' : 'Review the lesson and try again.'),
      }))
    }];
  }
  if (lessonId === 'F1.3') {
    const ja = language === 'ja';
    const labels = ja ? ['3D モデルの作成または読み込み', '図面の印刷', 'ソフトウェアの終了', '表計算シートの作成']
      : ['Creating or opening the 3D model', 'Printing the drawing', 'Closing the software', 'Creating a spreadsheet'];
    return [{
      id: 'F1.3-knowledge-check', prompt: ja ? 'iCAD SX で 2D 図面を作成する前に、通常は何を行いますか？' : 'What normally comes before creating a 2D drawing in iCAD SX?',
      choices: labels.map((label, index) => ({
        id: `F1.3-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 0,
        feedback: index === 0 ? `${ja ? '正解：' : 'Correct Answer: '}A. ${labels[0]}` : (ja ? 'もう一度レッスンの内容を確認して、回答してください。' : 'Review the lesson and try again.'),
      }))
    }];
  }
  if (lessonId === 'F1.1' || lessonId === 'F1.2') {
    const ja = language === 'ja';
    const intro = lessonId === 'F1.1';
    const prompt = intro
      ? (ja ? 'iCAD SX とは何ですか？' : 'What is iCAD SX?')
      : (ja ? '個々の部品を組み合わせて一つの機械設計にする作業はどれですか？' : 'Which task combines individual parts into a complete mechanical design?');
    const labels = intro
      ? (ja ? ['表計算アプリケーション', '機械設計用 CAD システム', '写真編集アプリケーション', 'プレゼンテーションアプリケーション']
        : ['A spreadsheet application', 'A mechanical CAD system', 'A photo editing application', 'A presentation application'])
      : (ja ? ['アセンブリの作成', '図面への注記の追加', '形状の測定', '表示方向の変更']
        : ['Creating assemblies', 'Adding drawing notes', 'Measuring geometry', 'Changing the viewing direction']);
    const correctIndex = intro ? 1 : 0;
    return [{
      id: `${lessonId}-knowledge-check`, prompt, choices: labels.map((label, index) => ({
        id: `${lessonId}-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === correctIndex,
        feedback: index === correctIndex ? `${ja ? '正解：' : 'Correct Answer: '}${'ABCD'[correctIndex]}. ${labels[correctIndex]}`
          : (ja ? 'もう一度レッスンの内容を確認して、回答してください。' : 'Review the lesson and try again.'),
      }))
    }];
  }
  if (lessonId !== 'F10.6') {
    const lesson = resolveFoundationLesson(lessonId);
    if (!lesson) throw new Error(`Unknown Foundations lesson: ${lessonId}`);
    const clean = (text: string) => text.replace(/\*\*/g, '').trim();
    const correct = clean(lesson.content[language].explanation);
    // Check recognition of the lesson's stated topic using existing, translated course text.
    // Other modules provide distinct topic summaries, not invented technical claims.
    const alternatives = FOUNDATION_LESSONS.filter(item => item.moduleId !== lesson.moduleId)
      .filter((item, index, all) => all.findIndex(other => other.moduleId === item.moduleId) === index)
      .map(item => clean(item.content[language].explanation)).filter(text => text !== correct).slice(0, 3);
    const offset = FOUNDATION_LESSONS.indexOf(lesson) % 4;
    const answers = [{ text: correct, correct: true }, ...alternatives.map(text => ({ text, correct: false }))];
    const rotated = [...answers.slice(offset), ...answers.slice(0, offset)];
    const correctLabel = `${'ABCD'[rotated.findIndex(item => item.correct)]}. ${correct}`;
    return [{
      id: `${lesson.id}-knowledge-check`,
      prompt: language === 'ja' ? `「${lesson.title.ja}」の主な内容を説明している文はどれですか？` : `Which statement summarizes the main topic of “${lesson.title.en}”?`,
      choices: rotated.map((item, index) => ({
        id: `${lesson.id}-${index}`, label: `${'ABCD'[index]}. ${item.text}`,
        isCorrect: item.correct, feedback: item.correct ? `${language === 'ja' ? '正解：' : 'Correct Answer: '}${correctLabel}`
          : language === 'ja' ? 'このレッスンの主な内容を思い出して、もう一度回答してください。' : 'Think about the main topic of this lesson and try again.',
      })),
    }];
  }
  return finalKnowledgeCheck(language);
}
