import React from 'react';
import FoundationOperationCommandIcon from './FoundationOperationCommandIcon';
import InterfaceIconPreview from './InterfaceIconPreview';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import originLocationImg from '../../assets/3d-images/mirrored_part2_location_of_origin.png';
import mirrorCropEn from '../../assets/3d-images/mirrored_part2_mirror.png';
import mirrorCropJa from '../../assets/3d-images/basic_operation3_mirror.png';
import pick3PointsImg from '../../assets/3d-images/mirrored_part2_pick3_points.png';
import outcomePartBImg from '../../assets/3d-images/mirrored_part2_pick3_points_part_a.png';
import './FoundationUsesCards.css';
import './FoundationStretchSteps.css';
import './NormalMirrorPartsContent.css';

interface ModelingMirrorPartsContentProps {
  text?: string;
  title?: string;
  index: number;
  japanese?: boolean;
}

/** SVG illustration for Step 2: Completed 3D Model of Part A with save indicator. */
function PartACreationArtwork({ title, japanese }: { title: string; japanese: boolean }) {
  return (
    <svg className="stretch-vector" viewBox="0 0 160 120" role="img" aria-label={title}>
      {/* Base Part A: Isometric Bracket with Pin on right & Hole on left */}
      <g stroke="#334155" strokeWidth="1.2" strokeLinejoin="round">
        {/* Top Face */}
        <polygon points="30,48 55,36 125,36 140,48 125,60 55,60" fill="#fde047" stroke="#ca8a04" />
        {/* Front Face */}
        <polygon points="30,48 55,60 125,60 140,48 140,62 125,74 55,74 30,62" fill="#eab308" stroke="#a16207" />
        {/* Center cutout */}
        <path d="M80,48 L80,56 Q90,56 90,48 Z" fill="#ca8a04" stroke="#854d0e" />
        {/* Left Through-Hole */}
        <ellipse cx="48" cy="48" rx="6" ry="3.5" fill="#a16207" stroke="#713f12" />
        {/* Right Cylindrical Pin */}
        <rect x="126" y="56" width="10" height="24" rx="2" fill="#eab308" stroke="#a16207" />
        <ellipse cx="131" cy="80" rx="5" ry="2" fill="#ca8a04" />
      </g>

      {/* Part A Badge */}
      <g>
        <rect x="18" y="14" width="56" height="20" rx="4" fill="#1e293b" />
        <text x="46" y="28" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">
          Part A
        </text>
      </g>

      {/* Save Diskette Icon */}
      <g transform="translate(112, 10)">
        <circle cx="16" cy="14" r="13" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" />
        {/* Floppy disk shape */}
        <rect x="9" y="8" width="14" height="12" rx="1.5" fill="#ffffff" />
        <rect x="11" y="9" width="10" height="4" fill="#86efac" />
        <rect x="12" y="14" width="8" height="6" rx="1" fill="#cbd5e1" />
      </g>
    </svg>
  );
}

/** SVG illustration for Step 3: Part A file saved as new Part B file. */
function PartADuplicationArtwork({ title, japanese }: { title: string; japanese: boolean }) {
  return (
    <svg className="stretch-vector" viewBox="0 0 160 120" role="img" aria-label={title}>
      {/* File Card A */}
      <g transform="translate(12, 22)">
        <rect x="0" y="0" width="52" height="68" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.4" />
        <path d="M38 0 L52 14 L38 14 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.4" />
        <rect x="8" y="24" width="36" height="4" rx="2" fill="#cbd5e1" />
        <rect x="8" y="32" width="28" height="4" rx="2" fill="#cbd5e1" />
        <rect x="6" y="44" width="40" height="16" rx="3" fill="#3b82f6" />
        <text x="26" y="56" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">
          Part A
        </text>
      </g>

      {/* Save As Transition Arrow */}
      <g stroke="#2563eb" strokeWidth="2" fill="none">
        <path d="M70,56 L88,56" />
        <polygon points="90,56 83,52 83,60" fill="#2563eb" />
      </g>
      <text x="80" y="46" textAnchor="middle" fill="#2563eb" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
        {japanese ? '別名保存' : 'Save As'}
      </text>

      {/* File Card B */}
      <g transform="translate(96, 22)">
        <rect x="0" y="0" width="52" height="68" rx="4" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.6" />
        <path d="M38 0 L52 14 L38 14 Z" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.6" />
        <rect x="8" y="24" width="36" height="4" rx="2" fill="#fde68a" />
        <rect x="8" y="32" width="28" height="4" rx="2" fill="#fde68a" />
        <rect x="6" y="44" width="40" height="16" rx="3" fill="#f59e0b" />
        <text x="26" y="56" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">
          Part B
        </text>
      </g>

      <text x="80" y="106" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
        {japanese ? 'Part A → Part B' : 'Part A → Part B'}
      </text>
    </svg>
  );
}

export default function ModelingMirrorPartsContent({
  text,
  title,
  index,
  japanese = false,
}: ModelingMirrorPartsContentProps) {
  const step1Title = japanese ? '部品の原点の適切な位置を特定する' : 'Identify the Proper Location of the Origin';
  const step2Title = japanese ? '部品Aを作成して保存する' : 'Create and Save Part A';
  const step3Title = japanese ? '部品Aを部品Bとして別名保存する' : 'Save Part A as Part B';
  const step4Title = japanese ? '反転（ミラー）を選択する' : 'Select Mirror';
  const step5Title = japanese ? '反転面（対称面）を指定する' : 'Specify the Mirror Plane';
  const step6Title = japanese ? '最終結果を確認する' : 'Check the Final Result';

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
            artworkOnly: true,
            artwork: (
              <img
                src={originLocationImg}
                alt={step1Title}
                style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ),
            screen: originLocationImg,
            region: {
              bounds: [0, 0, 776, 430],
              landing: [0, 0, 776, 430],
            },
          }}
        />
      ),
      body: japanese
        ? '3Dモデリングを作成する前に、部品の原点の適切な位置を特定します。\n\n最初に原点を正しく設定することで、部品Aと部品Bの位置関係が正しく保持されます。'
        : 'Before creating the 3D model, identify the proper location of the origin.\n\nEstablishing the origin first ensures both Part A and Part B remain aligned.',
    },
    {
      number: 2,
      title: step2Title,
      icon: <PartACreationArtwork title={step2Title} japanese={japanese} />,
      body: japanese
        ? '部品の3Dモデリングを完了します。\n\nモデルが完成したら、部品Aとして保存します。'
        : 'Complete the 3D modeling of the part.\n\nAfter completing the model, save it as Part A.',
    },
    {
      number: 3,
      title: step3Title,
      icon: <PartADuplicationArtwork title={step3Title} japanese={japanese} />,
      body: japanese
        ? 'ミラー部品の3Dモデルを作成する際は、部品Aを別のファイルに部品Bとして保存します。\n\nこの新しいファイルを使用してミラー形状を作成します。'
        : 'When creating the 3D model of the mirror part, save Part A to another file as Part B.\n\nThis new file will be used to create the mirrored version.',
    },
    {
      number: 4,
      title: step4Title,
      icon: (
        <InterfaceIconPreview
          index={3}
          toolbar={false}
          title={step4Title}
          japanese={japanese}
          custom={{
            artwork: (
              <div style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%' }}>
                <svg width="48" height="48" viewBox="0 0 32 32" aria-hidden="true">
                  <FoundationOperationCommandIcon command="mirror" title={step4Title} />
                </svg>
              </div>
            ),
            screen: japanese ? mirrorCropJa : mirrorCropEn,
            region: {
              bounds: japanese ? [174, 114, 82, 58] : [272, 188, 128, 108],
              landing: japanese ? [174, 114, 82, 58] : [272, 188, 128, 108],
            },
            highlightColor: '#d71920',
          }}
        />
      ),
      body: japanese
        ? '「反転（ミラー）」を使用して、部品Aの3Dモデルを部品Bに変換します。\n\nアイコンメニュー（移動・コピー・削除ツールバー）から反転コマンドを選択します。'
        : 'Use Mirror to convert the 3D model of Part A to Part B.\n\nSelect the Mirror command from the Icon Menu (Move/Copy/Delete toolbar).',
    },
    {
      number: 5,
      title: step5Title,
      icon: (
        <InterfaceIconPreview
          index={4}
          toolbar={false}
          title={step5Title}
          japanese={japanese}
          custom={{
            artworkOnly: true,
            artwork: (
              <img
                src={pick3PointsImg}
                alt={step5Title}
                style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ),
            screen: pick3PointsImg,
            region: {
              bounds: [0, 0, 499, 406],
              landing: [0, 0, 499, 406],
            },
          }}
        />
      ),
      body: japanese
        ? '原点から始めて、部品から3つの点を連続して選択します。\n\n指定された点順（P1 → P2 → P3）に従って、モデルが反転する面を定義します。'
        : 'Pick 3 points consecutively from the part, starting from the origin.\n\nFollow the required point order: P1 → P2 → P3 to define how the model will be mirrored.',
    },
    {
      number: 6,
      title: step6Title,
      icon: (
        <InterfaceIconPreview
          index={5}
          toolbar={false}
          title={step6Title}
          japanese={japanese}
          custom={{
            artworkOnly: true,
            artwork: (
              <img
                src={outcomePartBImg}
                alt={step6Title}
                style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ),
            screen: outcomePartBImg,
            region: {
              bounds: [0, 0, 777, 379],
              landing: [0, 0, 777, 379],
            },
          }}
        />
      ),
      body: japanese
        ? 'コマンド実行後、結果の形状が部品Bになっていることを確認します。'
        : 'After executing the command, verify the outcome geometry as Part B.',
    },
  ];

  // 6-Step Procedure Grid (Section 0)
  if (index === 0) {
    return (
      <div className="foundations-uses foundations-uses--aligned foundation-stretch-steps foundation-stretch-steps--6 normal-mirror-content">
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

  // Important Reminder Callout (Section 1)
  if (index === 1) {
    return (
      <div className="normal-mirror-content">
        <div className="normal-mirror-rule-callout">
          <p>
            <strong>{japanese ? '重要事項:' : 'Important Reminder:'}</strong>{' '}
            {japanese
              ? '部品Bの原点は部品Aと同じ位置でなければなりません。'
              : 'The origin of Part B must be in the same location as Part A.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="normal-mirror-content">
      {text && <p>{renderFormattedText(text)}</p>}
    </div>
  );
}
