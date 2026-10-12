import FoundationOperationCommandIcon from './FoundationOperationCommandIcon';
import InterfaceIconPreview from './InterfaceIconPreview';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import mirrorScreen from '../../assets/icad-foundations/mirrored-parts/mirror-copy-interface.png';
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

export default function IdentifyNormalMirrorPartsContent({
  text,
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
                <FoundationOperationCommandIcon command="mirrorCopy" title={step1Title} />
              </div>
            ),
            screen: mirrorScreen,
            screenSize: [1920, 1080],
            screenFit: 'viewport',
            region: {
              bounds: [1848, 451, 30, 32],
              landing: [1848, 451, 30, 32],
            },
            highlightColor: '#d71920',
          }}
        />
      ),
      body: japanese
        ? 'アイコンメニューから「反転複写」を選択します。'
        : 'Select **Mirror Copy** from the Icon Menu.',
    },
    {
      number: 2,
      title: step2Title,
      icon: null,
      body: japanese
        ? 'ミラーコピーを作成し、直接元の部品の上に重ねて配置して比較します。'
        : 'Create the mirror copy and place it directly over the original part for visual comparison.',
    },
    {
      number: 3,
      title: step3Title,
      icon: null,
      body: japanese
        ? '**穴の位置、切り欠き、フェアリング**を比較します。'
        : 'Compare the **hole locations, cutouts, and fairings**.',
    },
    {
      number: 4,
      title: step4Title,
      icon: null,
      body: japanese
        ? '**通常部品:** 詳細がすべて一致します。\n\n**ミラー部品:** 詳細が異なり、部品Aと同じ機能を果たせません。'
        : '**Normal Part:** All details match.\n\n**Mirror Part:** Details differ and the part cannot perform the same function as Part A.',
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
              {step.icon && <div className="foundations-use-card__icon-frame">{step.icon}</div>}
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
              ? '参照図面に「勝手違」と記載されている場合、これはミラーイメージ（鏡像対称）を示しています。'
              : 'When you see the notation 「勝手違」 on a reference drawing, this means Mirror Image.'}
          </p>
        </div>
      </div>
    );
  }

  return <p>{renderFormattedText(text || '')}</p>;
}
