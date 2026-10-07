import React from 'react';
import FoundationOperationCommandIcon from './FoundationOperationCommandIcon';
import InterfaceIconPreview from './InterfaceIconPreview';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import mirrorScreenEn from '../../assets/3d-images/mirrored_part1_mirror_copy_tool.jpg';
import mirrorScreenJa from '../../assets/3d-images/basic_operation3_mirror_copy.png';
import katteChigaiImg from '../../assets/3d-images/mirrored_notes.png';
import './FoundationUsesCards.css';
import './FoundationStretchSteps.css';
import './NormalMirrorPartsContent.css';

interface IdentifyNormalMirrorPartsContentProps {
  text?: string;
  title?: string;
  index: number;
  japanese?: boolean;
}

/** SVG vector illustration showing the mirror copy placed over the original part. */
function OverlayArtwork({ title }: { title: string }) {
  return (
    <svg className="stretch-vector" viewBox="0 0 160 120" role="img" aria-label={title}>
      {/* Base Original Part: Solid Isometric Plate */}
      <g stroke="#475569" strokeWidth="1.2" strokeLinejoin="round">
        <polygon points="45,45 105,25 135,45 75,65" fill="#94a3b8" />
        <polygon points="45,45 75,65 75,90 45,70" fill="#64748b" />
        <polygon points="75,65 135,45 135,70 75,90" fill="#475569" />
        <ellipse cx="85" cy="46" rx="7" ry="4" fill="#334155" stroke="#1e293b" />
      </g>

      {/* Mirrored Copy: Translucent Cyan Overlay positioned directly above/over original */}
      <g stroke="#0284c7" strokeWidth="1.4" strokeLinejoin="round">
        <polygon points="40,30 100,10 130,30 70,50" fill="#38bdf8" fillOpacity="0.55" />
        <polygon points="40,30 70,50 70,75 40,55" fill="#0ea5e9" fillOpacity="0.55" />
        <polygon points="70,50 130,30 130,55 70,75" fill="#0284c7" fillOpacity="0.55" />
        <ellipse cx="80" cy="31" rx="7" ry="4" fill="#0369a1" fillOpacity="0.7" stroke="#0284c7" />
      </g>

      {/* Downward Alignment / Overlay Action Arrow */}
      <g stroke="#2563eb" strokeWidth="2" fill="none">
        <path d="M140,32 Q145,48 138,60" strokeDasharray="3 2" />
        <polygon points="135,60 142,56 139,64" fill="#2563eb" />
      </g>
      <text x="80" y="112" textAnchor="middle" fill="#0369a1" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
        Overlay Comparison
      </text>
    </svg>
  );
}

/** SVG vector illustration pointing out the 3 verified check features: holes, cutouts, fairings. */
function InspectionArtwork({ title, japanese }: { title: string; japanese: boolean }) {
  return (
    <svg className="stretch-vector" viewBox="0 0 160 120" role="img" aria-label={title}>
      <g stroke="#334155" strokeWidth="1.2" strokeLinejoin="round">
        {/* Plate body with cutout on left */}
        <polygon points="45,40 60,35 60,45 80,38 125,23 145,36 100,51 75,60 45,50" fill="#cbd5e1" />
        <polygon points="45,50 75,60 75,85 45,75" fill="#94a3b8" />
        <polygon points="75,60 100,51 100,76 75,85" fill="#64748b" />
        {/* Fairing (fillet curve on front edge) */}
        <path d="M75,60 Q70,62 65,57" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
        {/* Hole location feature */}
        <ellipse cx="90" cy="38" rx="6" ry="3.5" fill="#475569" stroke="#ef4444" strokeWidth="1.4" />
        <ellipse cx="115" cy="31" rx="5" ry="3" fill="#475569" stroke="#ef4444" strokeWidth="1.4" />
      </g>

      {/* 1. Hole Location Inspection Marker */}
      <g stroke="#ef4444" strokeWidth="1.2" fill="none">
        <circle cx="90" cy="38" r="9" strokeDasharray="2 2" />
        <line x1="90" y1="29" x2="90" y2="14" />
        <circle cx="90" cy="14" r="2" fill="#ef4444" />
      </g>
      <text x="90" y="10" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
        {japanese ? '穴' : 'Hole'}
      </text>

      {/* 2. Cutout Inspection Marker */}
      <g stroke="#3b82f6" strokeWidth="1.2" fill="none">
        <line x1="60" y1="40" x2="40" y2="24" />
        <circle cx="40" cy="24" r="2" fill="#3b82f6" />
      </g>
      <text x="36" y="20" textAnchor="middle" fill="#3b82f6" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
        {japanese ? '切欠き' : 'Cutout'}
      </text>

      {/* 3. Fairing Inspection Marker */}
      <g stroke="#f59e0b" strokeWidth="1.2" fill="none">
        <line x1="72" y1="61" x2="65" y2="82" />
        <circle cx="65" cy="82" r="2" fill="#f59e0b" />
      </g>
      <text x="65" y="94" textAnchor="middle" fill="#d97706" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
        {japanese ? 'フェアリング' : 'Fairing'}
      </text>
    </svg>
  );
}

/** SVG vector illustration showing the dual-branch classification outcome. */
function ClassificationArtwork({ title, japanese }: { title: string; japanese: boolean }) {
  return (
    <svg className="stretch-vector" viewBox="0 0 160 120" role="img" aria-label={title}>
      {/* Left Outcome: Identical -> Normal Part */}
      <g>
        <rect x="12" y="22" width="60" height="66" rx="6" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
        <circle cx="42" cy="42" r="12" fill="#22c55e" />
        <path d="M37 42 L41 46 L48 38" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="42" y="66" textAnchor="middle" fill="#15803d" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
          {japanese ? '差なし' : 'No Change'}
        </text>
        <text x="42" y="78" textAnchor="middle" fill="#166534" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">
          {japanese ? '通常部品' : 'Normal Part'}
        </text>
      </g>

      {/* Right Outcome: Differences -> Mirror Part */}
      <g>
        <rect x="88" y="22" width="60" height="66" rx="6" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
        <circle cx="118" cy="42" r="12" fill="#f59e0b" />
        <path d="M112 47 L112 37 L116 37 M124 47 L124 37 L120 37" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
        <text x="118" y="66" textAnchor="middle" fill="#b45309" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
          {japanese ? '差あり' : 'Difference'}
        </text>
        <text x="118" y="78" textAnchor="middle" fill="#92400e" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">
          {japanese ? 'ミラー部品' : 'Mirror Part'}
        </text>
      </g>

      <text x="80" y="106" textAnchor="middle" fill="#64748b" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">
        {japanese ? '判定結果' : 'Classification Rule'}
      </text>
    </svg>
  );
}

export default function IdentifyNormalMirrorPartsContent({
  text,
  title,
  index,
  japanese = false,
}: IdentifyNormalMirrorPartsContentProps) {
  const step1Title = japanese ? '反転複写を選択する' : 'Select Mirror Copy Tool';
  const step2Title = japanese ? '元の部品の上に重ねる' : 'Place Over Original Part';
  const step3Title = japanese ? '詳細形状を比較する' : 'Compare Part Details';
  const step4Title = japanese ? '部品の分類を判定する' : 'Identify Part Type';

  const stepsData = [
    {
      number: 1,
      title: step1Title,
      icon: (
        <InterfaceIconPreview
          index={0}
          toolbar={false}
          title={step1Title}
          japanese={japanese}
          custom={{
            artwork: (
              <div style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%' }}>
                <svg width="48" height="48" viewBox="0 0 32 32" aria-hidden="true">
                  <FoundationOperationCommandIcon command="mirrorCopy" title={step1Title} />
                </svg>
              </div>
            ),
            screen: japanese ? mirrorScreenJa : mirrorScreenEn,
            region: {
              bounds: japanese ? [315, 170, 105, 80] : [240, 15, 55, 55],
              landing: japanese ? [315, 170, 105, 80] : [240, 15, 55, 55],
            },
            highlightColor: '#d71920',
          }}
        />
      ),
      body: japanese
        ? 'アイコンメニュー（移動・コピー・削除ツールバー）から「反転複写（ミラーコピー）」を選択します。'
        : 'Select Mirror Copy from the Icon Menu (Move/Copy/Delete toolbar).',
    },
    {
      number: 2,
      title: step2Title,
      icon: <OverlayArtwork title={step2Title} />,
      body: japanese
        ? 'ミラーコピーを作成し、直接元の部品の上に重ねて配置して比較します。'
        : 'Create the mirror copy and place it directly over the original part for visual comparison.',
    },
    {
      number: 3,
      title: step3Title,
      icon: <InspectionArtwork title={step3Title} japanese={japanese} />,
      body: japanese
        ? '元の部品とミラーコピーの間に認識可能な違いがあるか確認します。\n\n**確認ポイント:**\n- **穴の位置**\n- **切り欠き**\n- **フェアリング**'
        : 'Check whether there are any recognizable differences between the original part and the mirror copy.\n\n**Pay attention to:**\n- **Hole location**\n- **Cutouts**\n- **Fairings**',
    },
    {
      number: 4,
      title: step4Title,
      icon: <ClassificationArtwork title={step4Title} japanese={japanese} />,
      body: japanese
        ? '**通常部品:**\n変更がない場合、または部品の詳細がすべて完全に同一である場合は、通常部品として分類します。\n\n**ミラー部品:**\n穴の位置、切り欠き、フェアリングなどの認識可能な違いがあり、部品としての機能がミラー部品Aの機能と同一になり得ない場合は、ミラー部品として分類します。'
        : '**Normal Part:**\nIf there are no changes, or the part details are exactly the same, classify the part as a Normal Part.\n\n**Mirror Part:**\nIf there are recognizable changes, such as differences in hole locations, cutouts, or fairings, and the function of the part can no longer be the same as the function of Mirror Part A, classify it as a Mirror Part.',
    },
  ];

  // Procedure Grid (Section 0)
  if (index === 0) {
    return (
      <div className="foundations-uses foundations-uses--aligned foundation-stretch-steps foundation-stretch-steps--4 normal-mirror-content">
        <ul className="foundations-uses__grid">
          {stepsData.map((step) => (
            <li className="foundations-use-card" key={step.number}>
              <span className="foundations-use-card__number" aria-hidden="true">
                {step.number}
              </span>
              <h5 className="foundations-use-card__title">{step.title}</h5>
              <div className="foundations-use-card__icon-frame">{step.icon}</div>
              <div className="foundations-use-card__body">
                <p>{renderFormattedText(step.body)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Important Notice & Reference Notes (Section 1)
  if (index === 1) {
    return (
      <div className="normal-mirror-content">
        <div className="normal-mirror-rule-callout">
          <strong>{japanese ? '※重要注意:' : 'Important Notice:'}</strong>{' '}
          {japanese
            ? '通常部品とミラー部品の識別を誤ると、図面番号の割り当てに問題が生じる可能性があるため注意してください。'
            : 'Be careful in identifying Normal and Mirror parts because incorrect classification may cause trouble when assigning drawing numbers.'}
        </div>

        <div className="normal-mirror-katte-chigai-card">
          <img src={katteChigaiImg} alt={japanese ? '勝手違' : 'Katte-chigai note on drawing'} />
          <p>
            <strong>{japanese ? '参照図面の注記:' : 'Reference Drawing Note:'}</strong>{' '}
            {japanese
              ? '参照図面に「勝手違」（または「勝手違い」）と記載されている場合、これはミラーイメージ（鏡像対称）を示しています。'
              : 'When you see the notation 「勝手違」 (or 勝手違い — Katte-chigai) on a reference drawing, this means Mirror Image.'}
          </p>
        </div>
      </div>
    );
  }

  return <p>{renderFormattedText(text || '')}</p>;
}
