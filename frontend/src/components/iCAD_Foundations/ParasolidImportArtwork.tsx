import { useId } from 'react';
import InterfaceIconPreview from './InterfaceIconPreview';
import importIconScreen from '../../assets/3d-images/parasolid_import.png';
import linkDialogScreen from '../../assets/3d-images/parasolid_link_dialog.png';
import nameChangeScreen from '../../assets/3d-images/name_change_dialog.png';

export function ParasolidImportIcon({ title }: { title?: string }) {
  const gradId = useId();
  return (
    <svg className="foundation-single-command" viewBox="0 0 36 36" role="img" aria-label={title || 'インポート'}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a3f7a4" />
          <stop offset="60%" stopColor="#5cd862" />
          <stop offset="100%" stopColor="#3ebd45" />
        </linearGradient>
      </defs>
      {/* 3D thickness skirt */}
      <path
        d="M 4 19.5 C 9 23.5 13 17.5 19 21.5 C 24 24.5 28 20.5 32 23 V 26 C 28 23.5 24 27.5 19 24.5 C 13 20.5 9 26.5 4 22.5 Z"
        fill="#237a2c"
        stroke="#1a5e22"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      {/* Top wavy surface */}
      <path
        d="M 4 16.5 C 9 20.5 13 14.5 19 18.5 C 24 21.5 28 17.5 32 20 C 32 17 28 13.5 23 11 C 18 8.5 14 13.5 8 10 C 5 8.5 4 13.5 4 16.5 Z"
        fill={`url(#${gradId})`}
        stroke="#1f6927"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Dark blue badge overlay at bottom right with white up arrow */}
      <rect x="20" y="20" width="14" height="14" rx="2" fill="#142e4e" stroke="#0e1f35" strokeWidth="0.8" />
      <path d="M 27 23 L 23.5 27 H 25.5 V 31 H 28.5 V 27 H 30.5 Z" fill="#ffffff" />
    </svg>
  );
}

function OkGoActionArtwork({ japanese }: { japanese: boolean }) {
  return (
    <div className="stretch-vector" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ display: 'inline-block', padding: '4px 14px', background: '#f5f7fa', border: '1.5px solid #1687df', borderRadius: '4px', fontWeight: 'bold', fontSize: '13px', color: '#1687df', boxShadow: '0 0 6px rgba(22,135,223,0.3)' }}>
          OK
        </span>
        <span style={{ fontSize: '16px', color: 'var(--text-muted, #64748b)' }}>→</span>
        <span style={{ display: 'inline-block', padding: '4px 16px', background: '#1687df', border: '1.5px solid #106cb3', borderRadius: '4px', fontWeight: 'bold', fontSize: '13px', color: '#ffffff', letterSpacing: '0.5px' }}>
          GO
        </span>
      </div>
      <span style={{ fontSize: '12px', color: 'var(--text-muted, #526174)', textAlign: 'center' }}>
        {japanese ? 'OKを押して確定 → GOで実行' : 'Press OK to confirm → Select GO to continue'}
      </span>
    </div>
  );
}

export default function ParasolidImportArtwork({ step, japanese }: { step: number; japanese: boolean }) {
  const titles = japanese
    ? [
        'インポートを選択',
        'パラソリッドファイルを選択',
        'パラソリッドファイルをインポート',
        '名前変更をキャンセル',
        '購入部品名を解放',
        '完了結果の確認'
      ]
    : [
        'Select Import',
        'Select the Parasolid File',
        'Import the Parasolid File',
        'Cancel the Name Change',
        'Release the Purchase Part Names',
        'Check the Final Result'
      ];

  const title = titles[step] || titles[0];

  if (step === 0) {
    return (
      <span className="parasolid-import-artwork parasolid-import-artwork--0">
        <InterfaceIconPreview
          index={step}
          toolbar={false}
          title={title}
          japanese={japanese}
          custom={{
            artwork: <ParasolidImportIcon title={title} />,
            screen: importIconScreen,
            screenSize: [483, 342],
            screenFit: 'comfortable',
            region: {
              bounds: [16, 66, 124, 88],
              landing: [16, 66, 124, 88]
            },
            highlightColor: '#e11d48'
          }}
        />
      </span>
    );
  }

  if (step === 1) {
    const artwork = (
      <svg className="stretch-vector" viewBox="0 0 1400 906" role="img" aria-label={title}>
        <image href={linkDialogScreen} width="1400" height="906" />
      </svg>
    );

    return (
      <span className="parasolid-import-artwork parasolid-import-artwork--1">
        <InterfaceIconPreview
          index={step}
          toolbar={false}
          title={title}
          japanese={japanese}
          custom={{
            artwork,
            screen: linkDialogScreen,
            screenSize: [1400, 906],
            screenFit: 'comfortable',
            region: {
              bounds: [160, 660, 520, 210],
              landing: [0, 0, 1400, 906]
            },
            highlightColor: '#e11d48'
          }}
        />
      </span>
    );
  }

  if (step === 2) {
    return (
      <span className="parasolid-import-artwork parasolid-import-artwork--2">
        <InterfaceIconPreview
          index={step}
          toolbar={false}
          title={title}
          japanese={japanese}
          custom={{
            artwork: <OkGoActionArtwork japanese={japanese} />,
            screen: linkDialogScreen,
            screenSize: [1400, 906],
            screenFit: 'comfortable',
            region: {
              bounds: [1140, 130, 220, 50],
              landing: [0, 0, 1400, 906]
            },
            highlightColor: '#1687df'
          }}
        />
      </span>
    );
  }

  if (step === 3) {
    const artwork = (
      <svg className="stretch-vector" viewBox="0 0 420 645" role="img" aria-label={title}>
        <image href={nameChangeScreen} width="1188" height="806" />
        <rect x="230" y="598" width="102" height="34" rx="3" fill="none" stroke="#e11d48" strokeWidth="3" />
      </svg>
    );

    return (
      <span className="parasolid-import-artwork parasolid-import-artwork--3">
        <InterfaceIconPreview
          index={step}
          toolbar={false}
          title={title}
          japanese={japanese}
          custom={{
            artwork,
            screen: nameChangeScreen,
            screenSize: [1188, 806],
            screenFit: 'comfortable',
            region: {
              bounds: [230, 598, 102, 34],
              landing: [0, 0, 420, 645]
            },
            highlightColor: '#e11d48'
          }}
        />
      </span>
    );
  }

  if (step === 4) {
    const artwork = (
      <svg className="stretch-vector" viewBox="475 25 320 370" role="img" aria-label={title}>
        <image href={nameChangeScreen} width="1188" height="806" />
        <rect x="580" y="270" width="202" height="26" rx="2" fill="none" stroke="#e11d48" strokeWidth="2.5" />
      </svg>
    );

    return (
      <span className="parasolid-import-artwork parasolid-import-artwork--4">
        <InterfaceIconPreview
          index={step}
          toolbar={false}
          title={title}
          japanese={japanese}
          custom={{
            artwork,
            screen: nameChangeScreen,
            screenSize: [1188, 806],
            screenFit: 'comfortable',
            region: {
              bounds: [580, 270, 202, 26],
              landing: [475, 25, 320, 370]
            },
            highlightColor: '#e11d48'
          }}
        />
      </span>
    );
  }

  // step === 5: Final result (Tree View + 3D Space)
  const artwork = (
    <svg className="stretch-vector" viewBox="475 25 710 650" role="img" aria-label={title}>
      <image href={nameChangeScreen} width="1188" height="806" />
    </svg>
  );

  return (
    <span className="parasolid-import-artwork parasolid-import-artwork--5">
      <InterfaceIconPreview
        index={step}
        toolbar={false}
        title={title}
        japanese={japanese}
        custom={{
          artwork,
          screen: nameChangeScreen,
          screenSize: [1188, 806],
          screenFit: 'comfortable',
          region: {
            bounds: [475, 25, 710, 650],
            landing: [475, 25, 710, 650]
          },
          highlightColor: '#1687df'
        }}
      />
    </span>
  );
}
