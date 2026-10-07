import type { ReactNode } from 'react';
import InterfaceIconPreview from './InterfaceIconPreview';
import FoundationOperationCommandIcon from './FoundationOperationCommandIcon';
import otherInfoScreen from '../../assets/3d-images/other_info_parasolid.png';
import savePartScreen from '../../assets/3d-images/save-the-part-parasolid.png';

interface Props {
  step: number;
  japanese: boolean;
}

export default function SetPurchasePartInfoArtwork({ step, japanese }: Props) {
  const titles = japanese
    ? [
        '材質を設定',
        'レイヤを設定',
        '色を設定',
        '付加情報を設定',
        'プロパティを開く',
        '部品コメントを入力',
        '完了結果の確認'
      ]
    : [
        'Set the Material',
        'Set the Layer',
        'Set the Color',
        'Set the Additional Information',
        'Open Properties',
        'Enter the Part Comment',
        'Check the Final Result'
      ];

  const title = titles[step] || titles[0];

  if (step === 0) {
    // Step 1: Set the Material
    return (
      <span className="set-purchase-part-artwork set-purchase-part-artwork--0">
        <InterfaceIconPreview
          index={step}
          toolbar={false}
          title={title}
          japanese={japanese}
          custom={{
            artwork: (
              <div className="stretch-vector" style={{ display: 'grid', placeItems: 'center' }}>
                <FoundationOperationCommandIcon command="material-set" title={title} />
              </div>
            ),
            screen: otherInfoScreen,
            screenSize: [2570, 2105],
            screenFit: 'comfortable',
            region: {
              bounds: [10, 10, 800, 1050],
              landing: [10, 10, 800, 1050]
            },
            highlightColor: '#0284c7'
          }}
        />
      </span>
    );
  }

  if (step === 1) {
    // Step 2: Set the Layer
    return (
      <span className="set-purchase-part-artwork set-purchase-part-artwork--1">
        <InterfaceIconPreview
          index={step}
          toolbar={false}
          title={title}
          japanese={japanese}
          custom={{
            artwork: (
              <div className="stretch-vector" style={{ display: 'grid', placeItems: 'center' }}>
                <FoundationOperationCommandIcon command="change-layer" title={title} />
              </div>
            ),
            screen: otherInfoScreen,
            screenSize: [2570, 2105],
            screenFit: 'comfortable',
            region: {
              bounds: [10, 10, 1200, 1050],
              landing: [10, 10, 1200, 1050]
            },
            highlightColor: '#0284c7'
          }}
        />
      </span>
    );
  }

  if (step === 2) {
    // Step 3: Set the Color (Purchase Part Color = Actual Color)
    const artwork = (
      <div className="stretch-vector" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <FoundationOperationCommandIcon command="change-color" title={title} />
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '2px 8px',
          background: '#f0fdf4',
          border: '1px solid #86efac',
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: 600,
          color: '#166534',
          textAlign: 'center',
          whiteSpace: 'nowrap'
        }}>
          {japanese ? '購入部品の色 ＝ 実際の色' : 'Part Color = Actual Color'}
        </span>
      </div>
    );

    return (
      <span className="set-purchase-part-artwork set-purchase-part-artwork--2">
        <InterfaceIconPreview
          index={step}
          toolbar={false}
          title={title}
          japanese={japanese}
          custom={{
            artwork,
            screen: otherInfoScreen,
            screenSize: [2570, 2105],
            screenFit: 'comfortable',
            region: {
              bounds: [10, 10, 1600, 1050],
              landing: [10, 10, 1600, 1050]
            },
            highlightColor: '#0284c7'
          }}
        />
      </span>
    );
  }

  if (step === 3) {
    // Step 4: Set the Additional Information (MAKER -> REMARK)
    const artwork = (
      <svg
        className="stretch-vector"
        viewBox="0 0 240 100"
        role="img"
        aria-label={title}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Table header */}
        <rect x="15" y="8" width="210" height="22" rx="3" fill="#0284c7" />
        <text
          x="120"
          y="23"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="'Segoe UI', Meiryo, sans-serif"
          fontSize="11"
          fontWeight="bold"
        >
          {japanese ? '部品情報設定（付加情報）' : 'Part Info Settings'}
        </text>

        {/* Row background */}
        <rect x="15" y="30" width="210" height="42" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />

        {/* Left target: REMARK */}
        <rect x="22" y="36" width="85" height="30" rx="3" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
        <text
          x="64"
          y="49"
          textAnchor="middle"
          fill="#0369a1"
          fontFamily="'Segoe UI', Meiryo, sans-serif"
          fontSize="9"
          fontWeight="bold"
        >
          {japanese ? '備考欄' : 'REMARK'}
        </text>
        <text
          x="64"
          y="61"
          textAnchor="middle"
          fill="#0284c7"
          fontFamily="'Segoe UI', Meiryo, sans-serif"
          fontSize="8"
        >
          (Remark)
        </text>

        {/* Connecting arrow */}
        <path d="M 111 51 L 128 51" stroke="#0284c7" strokeWidth="2" />
        <polygon points="128,47 134,51 128,55" fill="#0284c7" />

        {/* Right source: MAKER */}
        <rect x="138" y="36" width="80" height="30" rx="3" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.2" />
        <text
          x="178"
          y="49"
          textAnchor="middle"
          fill="#854d0e"
          fontFamily="'Segoe UI', Meiryo, sans-serif"
          fontSize="9"
          fontWeight="bold"
        >
          {japanese ? 'メーカー' : 'MAKER'}
        </text>
        <text
          x="178"
          y="61"
          textAnchor="middle"
          fill="#a16207"
          fontFamily="'Segoe UI', Meiryo, sans-serif"
          fontSize="8"
        >
          (Maker)
        </text>

        {/* Rule badge */}
        <text
          x="120"
          y="88"
          textAnchor="middle"
          fill="#0284c7"
          fontFamily="'Segoe UI', Meiryo, sans-serif"
          fontSize="10"
          fontWeight="bold"
        >
          {japanese ? 'MAKER → REMARK (備考欄)' : 'MAKER → REMARK'}
        </text>
      </svg>
    );

    return (
      <span className="set-purchase-part-artwork set-purchase-part-artwork--3">
        <InterfaceIconPreview
          index={step}
          toolbar={false}
          title={title}
          japanese={japanese}
          custom={{
            artwork,
            screen: otherInfoScreen,
            screenSize: [2570, 2105],
            screenFit: 'comfortable',
            region: {
              bounds: [700, 850, 1850, 1200],
              landing: [700, 850, 1850, 1200]
            },
            highlightColor: '#0284c7'
          }}
        />
      </span>
    );
  }

  if (step === 4) {
    // Step 5: Open Properties (Tree View -> Top 3D Part -> Right-click -> Properties)
    const artwork = (
      <svg
        className="stretch-vector"
        viewBox="0 0 240 100"
        role="img"
        aria-label={title}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tree View container */}
        <rect x="10" y="6" width="105" height="88" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
        <rect x="10" y="6" width="105" height="18" rx="3" fill="#f1f5f9" />
        <text
          x="16"
          y="19"
          fill="#475569"
          fontFamily="'Segoe UI', Meiryo, sans-serif"
          fontSize="9"
          fontWeight="bold"
        >
          {japanese ? 'ツリービュー' : 'Tree View'}
        </text>

        {/* Top 3D Part node */}
        <rect x="14" y="32" width="97" height="24" rx="2" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
        {/* Cube icon */}
        <rect x="18" y="37" width="14" height="14" rx="2" fill="#0284c7" />
        <text
          x="36"
          y="48"
          fill="#0369a1"
          fontFamily="'Segoe UI', Meiryo, sans-serif"
          fontSize="9"
          fontWeight="bold"
        >
          {japanese ? 'トップ3Dパーツ' : 'Top 3D Part'}
        </text>

        {/* Indicator connecting to context menu */}
        <path d="M 112 44 L 126 44" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="2 2" />
        <polygon points="126,41 132,44 126,47" fill="#e11d48" />

        {/* Context menu popup */}
        <g transform="translate(134, 14)">
          <rect x="0" y="0" width="96" height="68" rx="3" fill="#ffffff" stroke="#64748b" strokeWidth="1" />
          <text x="8" y="16" fill="#64748b" fontFamily="'Segoe UI', Meiryo, sans-serif" fontSize="9">
            {japanese ? '名前の変更...' : 'Rename...'}
          </text>
          {/* Properties highlighted with red box */}
          <rect x="3" y="24" width="90" height="22" rx="2" fill="#fee2e2" stroke="#e11d48" strokeWidth="1.5" />
          <text
            x="8"
            y="39"
            fill="#be123c"
            fontFamily="'Segoe UI', Meiryo, sans-serif"
            fontSize="10"
            fontWeight="bold"
          >
            {japanese ? 'プロパティ' : 'Properties'}
          </text>
          <text x="8" y="60" fill="#64748b" fontFamily="'Segoe UI', Meiryo, sans-serif" fontSize="8">
            {japanese ? '解除' : 'Cancel'}
          </text>
        </g>
        <text
          x="120"
          y="96"
          textAnchor="middle"
          fill="#0284c7"
          fontFamily="'Segoe UI', Meiryo, sans-serif"
          fontSize="9"
          fontWeight="600"
        >
          {japanese ? '右クリック → プロパティ' : 'Right-click → Properties'}
        </text>
      </svg>
    );

    return (
      <span className="set-purchase-part-artwork set-purchase-part-artwork--4">
        <InterfaceIconPreview
          index={step}
          toolbar={false}
          title={title}
          japanese={japanese}
          custom={{
            artwork,
            screen: savePartScreen,
            screenSize: [788, 261],
            screenFit: 'comfortable',
            region: {
              bounds: [5, 5, 360, 250],
              landing: [5, 5, 360, 250]
            },
            highlightColor: '#e11d48'
          }}
        />
      </span>
    );
  }

  if (step === 5) {
    // Step 6: Enter the Part Comment (Property dialog -> Comment(T) -> OK)
    const artwork = (
      <svg
        className="stretch-vector"
        viewBox="0 0 240 100"
        role="img"
        aria-label={title}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dialog window */}
        <rect x="15" y="6" width="210" height="88" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
        <rect x="15" y="6" width="210" height="18" rx="3" fill="#0284c7" />
        <text
          x="24"
          y="19"
          fill="#ffffff"
          fontFamily="'Segoe UI', Meiryo, sans-serif"
          fontSize="10"
          fontWeight="bold"
        >
          {japanese ? 'プロパティ (Property)' : 'Property'}
        </text>

        {/* Comment field with red highlight */}
        <text
          x="22"
          y="45"
          fill="#1e293b"
          fontFamily="'Segoe UI', Meiryo, sans-serif"
          fontSize="10"
          fontWeight="600"
        >
          {japanese ? 'コメント(T):' : 'Comment(T):'}
        </text>
        <rect x="92" y="32" width="124" height="22" rx="2" fill="#ffffff" stroke="#e11d48" strokeWidth="1.5" />
        <text
          x="98"
          y="47"
          fill="#0f172a"
          fontFamily="'Segoe UI', Meiryo, sans-serif"
          fontSize="9"
        >
          {japanese ? '（部品コメント入力）' : '(Enter Comment)'}
        </text>

        {/* OK button */}
        <rect x="166" y="64" width="50" height="22" rx="3" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
        <text
          x="191"
          y="79"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="'Segoe UI', Meiryo, sans-serif"
          fontSize="11"
          fontWeight="bold"
        >
          OK
        </text>

        <text
          x="80"
          y="80"
          fill="#64748b"
          fontFamily="'Segoe UI', Meiryo, sans-serif"
          fontSize="9"
        >
          {japanese ? 'コメント入力 → OK' : 'Enter Comment → OK'}
        </text>
      </svg>
    );

    return (
      <span className="set-purchase-part-artwork set-purchase-part-artwork--5">
        <InterfaceIconPreview
          index={step}
          toolbar={false}
          title={title}
          japanese={japanese}
          custom={{
            artwork,
            screen: savePartScreen,
            screenSize: [788, 261],
            screenFit: 'comfortable',
            region: {
              bounds: [365, 5, 418, 250],
              landing: [365, 5, 418, 250]
            },
            highlightColor: '#e11d48'
          }}
        />
      </span>
    );
  }

  // Step 7 (step === 6): Check the Final Result
  const checklistItems = japanese
    ? [
        '材質 (Material)',
        'レイヤ (Layer)',
        '色 (Color)',
        '付加情報 (Additional Info)',
        '部品コメント (Part Comment)',
        '備考欄のメーカー (Maker in Remark)'
      ]
    : [
        'Material',
        'Layer',
        'Color',
        'Additional Info',
        'Part Comment',
        'Maker in the Remark'
      ];

  const resultArtwork = (
    <svg
      className="stretch-vector"
      viewBox="0 0 240 100"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="8" y="4" width="224" height="92" rx="4" fill="#f8fafc" stroke="#10b981" strokeWidth="1.5" />
      <rect x="8" y="4" width="224" height="18" rx="4" fill="#10b981" />
      <text
        x="120"
        y="17"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="'Segoe UI', Meiryo, sans-serif"
        fontSize="10"
        fontWeight="bold"
      >
        {japanese ? '✓ 設定情報の確認' : '✓ Verification Checklist'}
      </text>
      {checklistItems.map((item, i) => {
        const col = i < 3 ? 0 : 1;
        const row = i % 3;
        const x = col === 0 ? 14 : 122;
        const y = 30 + row * 20;
        return (
          <g key={item} transform={`translate(${x}, ${y})`}>
            <circle cx="6" cy="6" r="5" fill="#d1fae5" stroke="#10b981" strokeWidth="1" />
            <path
              d="M 3.5 6 L 5.5 8 L 8.5 4"
              fill="none"
              stroke="#059669"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="14"
              y="9"
              fill="#1e293b"
              fontFamily="'Segoe UI', Meiryo, sans-serif"
              fontSize="8"
              fontWeight="600"
            >
              {item}
            </text>
          </g>
        );
      })}
    </svg>
  );

  return (
    <span className="set-purchase-part-artwork set-purchase-part-artwork--6">
      <InterfaceIconPreview
        index={step}
        toolbar={false}
        title={title}
        japanese={japanese}
        custom={{
          artwork: resultArtwork,
          artworkOnly: true,
          screen: otherInfoScreen,
          region: {
            bounds: [0, 0, 100, 100],
            landing: [0, 0, 100, 100]
          }
        }}
      />
    </span>
  );
}
