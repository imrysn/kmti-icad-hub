import React from 'react';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import normalPartImg from '../../assets/3d-images/mirrored_part1_normal_part.png';
import mirrorPartImg from '../../assets/3d-images/mirrored_part1_mirror_part.png';
import katteChigaiImg from '../../assets/3d-images/mirrored_part1_mirror_image.png';
import './FoundationViewComparison.css';
import './NormalMirrorPartsContent.css';

interface NormalMirrorPartsContentProps {
  text: string;
  title: string;
  index: number;
  japanese?: boolean;
}

export default function NormalMirrorPartsContent({
  text,
  title,
  index,
  japanese = false,
}: NormalMirrorPartsContentProps) {
  if (index === 0) {
    const cards = [
      {
        heading: japanese ? '通常部品（Normal Part）' : 'Normal Part',
        image: normalPartImg,
        imageAlt: japanese ? '通常部品の例 (RTXXXXXXN01)' : 'Normal Part Example (RTXXXXXXN01)',
        description: japanese
          ? '反転複写（ミラーコピー）を作成しても元の部品とまったく同じ形状を保つ部品です。\n\n元の部品とミラーコピーの間に違いは認識されません。\n\n**図面番号の記号:** **N**\n**例:** `RTXXXXXXN` / `MTXXXXXXN01`'
          : 'A part that remains exactly the same as the original part when a mirror copy is created.\n\nNo changes will be recognized between the original part and its mirror copy.\n\n**Drawing Number:** **N**\n**Example:** `RTXXXXXXN` / `MTXXXXXXN01`',
      },
      {
        heading: japanese ? 'ミラー部品（Mirror Part）' : 'Mirror Part',
        image: mirrorPartImg,
        imageAlt: japanese ? 'ミラー部品の例 (RTXXXXXXA01 / RTXXXXXXB01)' : 'Mirror Part Example (RTXXXXXXA01 / RTXXXXXXB01)',
        description: japanese
          ? '対称形状をなす部品のペアです。穴の位置や切り欠きなどの特徴が反転によって異なります。\n\n**図面番号の記号:** **A** および **B**\n**例:** `MTXXXXXXA01` / `MTXXXXXXB01`\n(`RTXXXXXXA` / `RTXXXXXXB`)'
          : 'Parts that are symmetrically the same, forming an opposite-hand pair where features (such as hole locations) differ.\n\n**Drawing Numbers:** **A** and **B**\n**Examples:** `MTXXXXXXA01` / `MTXXXXXXB01`\n(`RTXXXXXXA` / `RTXXXXXXB`)',
      },
    ];

    return (
      <div className="foundation-view-comparison normal-mirror-content">
        <p>
          {japanese
            ? '部品は、反転複写（ミラーコピー）を作成したときの性質によって分類されます。'
            : 'Parts are classified according to how they behave when a mirror copy is created.'}
        </p>
        <div className="foundation-view-comparison__cards">
          {cards.map((card, i) => (
            <section className="foundation-view-comparison__card" key={card.heading}>
              <div className="foundation-view-comparison__front">
                <h5>{card.heading}</h5>
                <div className="normal-mirror-comparison__image-wrap">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="normal-mirror-comparison__img"
                  />
                </div>
                <p>{renderFormattedText(card.description)}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }

  if (index === 1) {
    const cards = [
      {
        heading: japanese ? 'ミラー部品 A（元部品）' : 'Mirror Part A (Original Part)',
        description: japanese
          ? '**役割:** 元の部品（Base Part）\n**図面番号の記号:** **A**\n\nミラー部品のペアを作成するときは、最初にモデリングした元の部品を必ず **部品 A** として指定します。'
          : '**Role:** Original Part\n**Designation:** **A**\n\nWhen creating a pair of mirror parts, the original part should always be designated as **Part A**.',
      },
      {
        heading: japanese ? 'ミラー部品 B（ミラーコピー）' : 'Mirror Part B (Mirror Copy)',
        description: japanese
          ? '**役割:** 反転複写部品（Mirror Copy）\n**図面番号の記号:** **B**\n\n**ミラー部品 B は、ミラー部品 A が存在しなければ存在できません。**'
          : '**Role:** Mirror Copy of Part A\n**Designation:** **B**\n\n**A Mirror Part B cannot exist without Mirror Part A.**',
      },
    ];

    return (
      <div className="foundation-view-comparison normal-mirror-content">
        <p>
          {japanese
            ? 'ミラー部品のペアを作成するときは、元部品を部品 A、反転複写した部品を部品 B として指定します。'
            : 'When creating a pair of mirror parts, designate the original part as Part A and its mirror copy as Part B.'}
        </p>
        <div className="foundation-view-comparison__cards">
          {cards.map(card => (
            <section className="foundation-view-comparison__card" key={card.heading}>
              <div className="foundation-view-comparison__front">
                <h5>{card.heading}</h5>
                <p>{renderFormattedText(card.description)}</p>
              </div>
            </section>
          ))}
        </div>
        <div className="normal-mirror-rule-callout">
          <strong>{japanese ? '※特記事項:' : '*Special Rule:'}</strong>{' '}
          {japanese
            ? '反転元となる既存の部品が存在しない場合は、部品命名時に A を使用します。'
            : 'If there is no existing part to be mirrored, use A when naming the part.'}
        </div>
        <div className="normal-mirror-katte-chigai-card normal-mirror-kattechigai-box">
          <img
            src={katteChigaiImg}
            alt={japanese ? '勝手違' : 'Katte-chigai note on drawing'}
          />
          <p>
            <strong>{japanese ? '参照図面の注記:' : 'Reference Drawing Note:'}</strong>{' '}
            {japanese
              ? '参照図面の「勝手違」（または「勝手違い」）は、ミラーイメージ（鏡像対称）を示しています。'
              : 'The notation 「勝手違」 (or 勝手違い — Katte-chigai) on reference drawings indicates a Mirror Image.'}
          </p>
        </div>
      </div>
    );
  }

  return <p>{renderFormattedText(text)}</p>;
}
