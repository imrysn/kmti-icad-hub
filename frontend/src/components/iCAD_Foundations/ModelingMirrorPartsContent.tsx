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

export default function ModelingMirrorPartsContent({
  text,
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
            artwork: (
              <img
                src={originLocationImg}
                alt={step1Title}
                className="normal-mirror-step-image"
              />
            ),
            screen: originLocationImg,
            screenSize: [776, 430],
            screenFit: 'comfortable',
            region: {
              bounds: [0, 0, 1920, 1080],
              landing: [0, 0, 1920, 1080],
            },
          }}
        />
      ),
      body: japanese
        ? '3Dモデリングを作成する前に、部品の原点の適切な位置を特定します。'
        : 'Before creating the 3D model, identify the proper location of the origin.',
    },
    {
      number: 2,
      title: step2Title,
      icon: null,
      body: japanese
        ? '3Dモデルを完成させ、**部品A**として保存します。'
        : 'Complete the 3D model and save it as **Part A**.',
    },
    {
      number: 3,
      title: step3Title,
      icon: null,
      body: japanese
        ? '部品Aを別のファイルに**部品B**として保存します。'
        : 'Save Part A to a separate file as **Part B**.',
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
                <FoundationOperationCommandIcon command="mirror" title={step4Title} />
              </div>
            ),
            screen: japanese ? mirrorCropJa : mirrorCropEn,
            screenSize: japanese ? [352, 356] : [562, 324],
            screenFit: 'comfortable',
            region: {
              bounds: japanese ? [949, 346, 447, 176] : [929, 627, 438, 360],
              landing: japanese ? [949, 346, 447, 176] : [929, 627, 438, 360],
            },
            highlightColor: '#d71920',
          }}
        />
      ),
      body: japanese
        ? '部品Bのファイルで、アイコンメニューから**反転（ミラー）**を選択します。'
        : 'In the Part B file, select **Mirror** from the Icon Menu.',
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
            artwork: (
              <img
                src={pick3PointsImg}
                alt={step5Title}
                className="normal-mirror-step-image"
              />
            ),
            screen: pick3PointsImg,
            screenSize: [499, 406],
            screenFit: 'comfortable',
            region: {
              bounds: [0, 0, 1920, 1080],
              landing: [0, 0, 1920, 1080],
            },
          }}
        />
      ),
      body: japanese
        ? '原点から始めて、**P1 → P2 → P3**の順に3点を選択します。'
        : 'Pick three points in order **P1 → P2 → P3**, starting from the origin.',
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
            artwork: (
              <img
                src={outcomePartBImg}
                alt={step6Title}
                className="normal-mirror-step-image"
              />
            ),
            screen: outcomePartBImg,
            screenSize: [777, 379],
            screenFit: 'comfortable',
            region: {
              bounds: [0, 0, 1920, 1080],
              landing: [0, 0, 1920, 1080],
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
