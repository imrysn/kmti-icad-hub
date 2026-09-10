import type { InteractiveVideoQuestion } from '../InteractiveVideoLesson/types';
import type { FoundationLanguage } from './curriculum';
import { FOUNDATION_LESSONS, resolveFoundationLesson } from './curriculum';

const copy = {
  en: [
    ['Where should you read what an active command needs next?', 'The message display', 'The filename', 'The model color', 'The message display provides guidance for the next input.'],
    ['Which action changes your view without moving the part?', 'Pan', 'Move', 'Delete', 'Pan changes the view; it leaves the part position unchanged.'],
    ['What coordinates identify the current origin?', '0, 0, 0', '1, 1, 1', '10, 10, 10', 'All three coordinates are zero at the current origin.'],
    ['What should you check before confirming a selection?', 'The highlighted target and selection type', 'Only the filename', 'Only the screen size', 'The highlight and selection type show what the operation will affect.'],
    ['Which operation retains the original and creates another object?', 'Copy', 'Move', 'Delete', 'Copy retains the original object and creates a duplicate.'],
  ],
  ja: [
    ['現在のコマンドに必要な次の入力は、どこで確認しますか？', 'メッセージ表示', 'ファイル名', 'モデルの色', 'メッセージ表示で次に必要な入力を確認できます。'],
    ['部品を移動せずに表示位置を変える操作はどれですか？', 'パン', 'Move', 'Delete', 'パンは表示位置を変え、部品の位置は変えません。'],
    ['現在の原点を表す座標はどれですか？', '0、0、0', '1、1、1', '10、10、10', '現在の原点では三つの座標がすべてゼロです。'],
    ['選択を確定する前に、何を確認しますか？', '強調表示の対象と選択の種類', 'ファイル名だけ', '画面の大きさだけ', '強調表示と選択の種類で、操作の対象を確認できます。'],
    ['元の対象を残して、もう一つ作る操作はどれですか？', 'Copy', 'Move', 'Delete', 'Copy は元の形状を残して複製します。'],
  ],
};

export function foundationKnowledgeQuestions(language: FoundationLanguage, lessonId = 'F10.6'): InteractiveVideoQuestion[] {
  if (lessonId === 'F5.6') {
    const ja = language === 'ja';
    const labels = ja ? ['原点', 'X 軸', 'Y 軸', 'シェーディングモード'] : ['The origin', 'The X-axis', 'The Y-axis', 'The shading mode'];
    return [{
      id: 'F5.6-knowledge-check', prompt: ja ? 'Change 3D Part Layout で点 2 は何を設定しますか？' : 'What does Point 2 set in Change 3D Part Layout?',
      choices: labels.map((label, index) => ({
        id: `F5.6-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. ${labels[1]}` : ja ? 'もう一度レッスンの内容を確認して、回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  if (lessonId === 'F5.4') {
    const ja = language === 'ja';
    const labels = ja ? ['モデルの最も高い点', 'X、Y、Z 軸が交わる点', 'すべての部品の中心', '保存された表示位置']
      : ['The highest point of a model', 'The point where the X, Y, and Z axes meet', 'The center of every part', 'A saved viewing position'];
    return [{
      id: 'F5.4-knowledge-check', prompt: ja ? 'iCAD SX の原点とは何ですか？' : 'What is the origin in iCAD SX?',
      choices: labels.map((label, index) => ({
        id: `F5.4-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. ${labels[1]}` : ja ? 'もう一度レッスンの内容を確認して、回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  if (lessonId === 'F5.1') {
    const ja = language === 'ja';
    const labels = ja ? ['正確な値を入力するため', 'モニターの大きさを変えるため', 'コンピューターを移動するため', 'モデルを自動的に変更するため']
      : ['To enter exact values', 'To change the monitor size', 'To move the computer', 'To change the model automatically'];
    return [{
      id: 'F5.1-knowledge-check', prompt: ja ? 'iCAD SX でキーボード入力が役立つ理由は何ですか？' : 'Why is keyboard input useful in iCAD SX?',
      choices: labels.map((label, index) => ({
        id: `F5.1-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 0,
        feedback: index === 0 ? `${ja ? '正解：' : 'Correct Answer: '}A. ${labels[0]}` : ja ? 'もう一度レッスンの内容を確認して、回答してください。' : 'Review the lesson and try again.',
      })),
    }];
  }
  if (lessonId === 'F4.12') {
    const ja = language === 'ja';
    const labels = ja ? ['CG表示 線なし', 'CG表示 線あり', '透過表示', 'WIRE表示']
      : ['GC View – No Lines', 'GC View – With Lines', 'Transparent Display', 'Wire Display'];
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
  if (lessonId === 'F3.3') {
    const ja = language === 'ja';
    const labels = ja ? ['モデルが実際に大きくなる', 'モデルをより近くで見ることができる', 'モデルが移動する', 'モデルが削除される'] : ['The model becomes physically larger', 'You see a closer view of the model', 'The model is moved', 'The model is deleted'];
    return [{
      id: 'F3.3-knowledge-check', prompt: ja ? 'ズームインすると、どうなりますか？' : 'What happens when you zoom in?',
      choices: labels.map((label, index) => ({
        id: `F3.3-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
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
    const labels = ja ? ['メニューバー', '作業／モデリング領域', '情報領域', 'ヘルプメニュー']
      : ['Menu Bar', 'Working / Modeling Area', 'Information Area', 'Help Menu'];
    return [{
      id: 'F2.1-knowledge-check', prompt: ja ? 'モデルや図面を表示し、操作する主な領域はどれですか？' : 'Which area is used to view and work with your 3D model or 2D Detailing?',
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
      id: 'F1.3-knowledge-check', prompt: ja ? 'iCAD SX で 2D 図面を作成する前に、通常は何を行いますか？' : 'What normally comes before creating a 2D Detailing in iCAD SX?',
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
      : (ja ? 'iCAD SX の一般的な用途はどれですか？' : 'Which of the following is a common use of iCAD SX?');
    const labels = intro
      ? (ja ? ['表計算アプリケーション', '機械設計用 CAD システム', '写真編集アプリケーション', 'プレゼンテーションアプリケーション']
        : ['A spreadsheet application', 'A mechanical CAD system', 'A photo editing application', 'A presentation application'])
      : (ja ? ['写真の編集', '機械部品と設計図面の作成', '文書の作成', 'メールの管理']
        : ['Editing photos', 'Creating mechanical parts and engineering drawings', 'Writing documents', 'Managing email']);
    return [{
      id: `${lessonId}-knowledge-check`, prompt, choices: labels.map((label, index) => ({
        id: `${lessonId}-${index}`, label: `${'ABCD'[index]}. ${label}`, isCorrect: index === 1,
        feedback: index === 1 ? `${ja ? '正解：' : 'Correct Answer: '}B. ${labels[1]}`
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
  return copy[language].map(([prompt, correct, wrong1, wrong2, explanation], index) => {
    const choices = [correct, wrong1, wrong2].map((label, i) => ({
      id: `F10.6-${index}-${i}`, label, isCorrect: i === 0,
      feedback: i === 0 ? explanation : `${language === 'ja' ? 'もう一度確認しましょう。' : 'Review the concept. '}${explanation}`,
    }));
    // Stable rotation avoids teaching an answer-position pattern.
    return { id: `F10.6-q${index + 1}`, prompt, choices: [...choices.slice(index % 3), ...choices.slice(0, index % 3)] };
  });
}

