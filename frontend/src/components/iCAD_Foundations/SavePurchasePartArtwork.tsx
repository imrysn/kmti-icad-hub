import type { ReactNode } from 'react';
import InterfaceIconPreview from './InterfaceIconPreview';
import saveAsMenuScreen from '../../assets/icad-foundations/file-operations/file-save-as-menu.png';
import saveAsDialogScreen from '../../assets/icad-foundations/file-operations/save-as-dialog.png';

interface Props {
  step: number;
  japanese: boolean;
}

export default function SavePurchasePartArtwork({ step, japanese }: Props) {
  const titles = japanese
    ? [
        '名前を付けて保存を開く',
        'ファイル名を入力',
        '部品を保存',
        '完了結果の確認'
      ]
    : [
        'Open Save As',
        'Enter the File Name',
        'Save the Part',
        'Check the Final Result'
      ];

  const title = titles[step] || titles[0];

  if (step === 0) {
    // Step 1: Open Save As (File -> Save As)
    const artwork = (
      <svg
        className="stretch-vector"
        viewBox="0 0 280 84"
        role="img"
        aria-label={title}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Menu bar header */}
        <rect x="10" y="6" width="70" height="22" rx="3" fill="#0284c7" />
        <text
          x="45"
          y="21"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="Meiryo, 'Segoe UI', sans-serif"
          fontSize="11"
          fontWeight="bold"
        >
          {japanese ? 'ファイル(F)' : 'File (F)'}
        </text>

        {/* Arrow connector */}
        <path d="M 85 17 L 115 17" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 3" />
        <polygon points="115,14 121,17 115,20" fill="#0284c7" />

        {/* Dropdown selected item */}
        <g transform="translate(125, 6)">
          <rect x="0" y="0" width="145" height="24" rx="3" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
          <text
            x="8"
            y="16"
            fill="#ffffff"
            fontFamily="Meiryo, 'Segoe UI', sans-serif"
            fontSize="11"
            fontWeight="bold"
          >
            {japanese ? '名前を付けて保存(A)...' : 'Save As (A)...'}
          </text>
        </g>

        {/* Menu path caption */}
        <text
          x="140"
          y="56"
          textAnchor="middle"
          fill="var(--text-muted, #475569)"
          fontFamily="'Segoe UI', Meiryo, sans-serif"
          fontSize="11"
          fontWeight="600"
        >
          {japanese ? 'ファイル(F) → 名前を付けて保存(A)' : 'File → Save As'}
        </text>
        <text
          x="140"
          y="74"
          textAnchor="middle"
          fill="#0284c7"
          fontFamily="'Segoe UI', Meiryo, sans-serif"
          fontSize="10"
        >
          {japanese ? 'クリックして画面全体を表示' : 'Click to view full screen'}
        </text>
      </svg>
    );

    return (
      <span className="save-purchase-part-artwork save-purchase-part-artwork--0">
        <InterfaceIconPreview
          index={step}
          toolbar={false}
          title={title}
          japanese={japanese}
          custom={{
            artwork,
            screen: saveAsMenuScreen,
            screenSize: [1867, 1014],
            screenFit: 'comfortable',
            region: {
              bounds: [0, 155, 560, 32],
              landing: [0, 20, 580, 320]
            },
            highlightColor: '#e11d48'
          }}
        />
      </span>
    );
  }

  if (step === 1) {
    // Step 2: Enter the File Name (FILE NAME = PURCHASE PART CODE)
    const artwork = (
      <div
        className="stretch-vector"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '4px'
        }}
      >
        {/* Input field mock */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f8fafc',
            padding: '6px 10px',
            borderRadius: '6px',
            border: '1.5px solid #cbd5e1',
            width: '100%',
            maxWidth: '240px',
            boxSizing: 'border-box'
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#334155',
              whiteSpace: 'nowrap'
            }}
          >
            {japanese ? 'ファイル名(N):' : 'File name:'}
          </span>
          <span
            style={{
              flex: 1,
              background: '#ffffff',
              border: '2px solid #0284c7',
              borderRadius: '3px',
              padding: '3px 6px',
              fontSize: '11px',
              fontWeight: 600,
              color: '#0369a1',
              textAlign: 'center'
            }}
          >
            {japanese ? '購入部品コード' : 'Purchase Part Code'}
          </span>
        </div>

        {/* Training rule callout badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '3px 10px',
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 700,
            color: '#1d4ed8'
          }}
        >
          <span>{japanese ? 'ファイル名 ＝ 購入部品コード' : 'FILE NAME = PURCHASE PART CODE'}</span>
        </div>
      </div>
    );

    return (
      <span className="save-purchase-part-artwork save-purchase-part-artwork--1">
        <InterfaceIconPreview
          index={step}
          toolbar={false}
          title={title}
          japanese={japanese}
          custom={{
            artwork,
            screen: saveAsDialogScreen,
            screenSize: [1911, 1078],
            screenFit: 'comfortable',
            region: {
              bounds: [135, 365, 345, 35],
              landing: [135, 131, 685, 324]
            },
            highlightColor: '#e11d48'
          }}
        />
      </span>
    );
  }

  if (step === 2) {
    // Step 3: Save the Part (Complete Save As Process)
    const artwork = (
      <div
        className="stretch-vector"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '4px'
        }}
      >
        {/* Save button visual matching iCAD dialog */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px 24px',
            background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
            border: '2px solid #0284c7',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          <span
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#0f172a',
              letterSpacing: '0.5px'
            }}
          >
            {japanese ? '保存 (A)' : 'Save (A)'}
          </span>
        </div>

        {/* Process completion badge */}
        <span
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--text-muted, #475569)',
            textAlign: 'center'
          }}
        >
          {japanese ? '名前を付けて保存を完了' : 'Complete Save As Process'}
        </span>
      </div>
    );

    return (
      <span className="save-purchase-part-artwork save-purchase-part-artwork--2">
        <InterfaceIconPreview
          index={step}
          toolbar={false}
          title={title}
          japanese={japanese}
          custom={{
            artwork,
            screen: saveAsDialogScreen,
            screenSize: [1911, 1078],
            screenFit: 'comfortable',
            region: {
              bounds: [701, 195, 110, 24],
              landing: [135, 131, 685, 324]
            },
            highlightColor: '#e11d48'
          }}
        />
      </span>
    );
  }

  // step === 3: Check the Final Result
  const artwork = (
    <div
      className="stretch-vector"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        padding: '4px'
      }}
    >
      {/* Success check badge */}
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: '#16a34a',
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 2px 4px rgba(22,163,74,0.25)'
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <span
        style={{
          fontSize: '12px',
          fontWeight: 700,
          color: '#15803d'
        }}
      >
        {japanese ? '購入部品の保存完了' : 'Purchase Part Saved'}
      </span>

      <span
        style={{
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--text-muted, #475569)',
          textAlign: 'center'
        }}
      >
        {japanese ? 'ファイル名 ＝ 購入部品コード' : 'File Name = Purchase Part Code'}
      </span>
    </div>
  );

  return (
    <span className="save-purchase-part-artwork save-purchase-part-artwork--3">
      {artwork}
    </span>
  );
}
