import { useId } from 'react';
import InterfaceIconPreview from './InterfaceIconPreview';
import lightenBrepScreen from '../../assets/3d-images/lighten_brep_solid.png';
import dialogBoxScreen from '../../assets/3d-images/dialog_box_brep.png';
import messagePaneScreen from '../../assets/3d-images/message_pane_brep.png';

export function LightenBrepSolidIcon({ title }: { title?: string }) {
  const gradId = useId();
  return (
    <svg className="foundation-single-command" viewBox="0 0 36 36" role="img" aria-label={title || 'B-Repソリッドの軽量化'}>
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
      {/* Dark blue badge overlay at bottom right with white minus bar (-) */}
      <rect x="20" y="20" width="14" height="14" rx="2" fill="#142e4e" stroke="#0e1f35" strokeWidth="0.8" />
      <rect x="23" y="26" width="8" height="2.4" rx="0.5" fill="#ffffff" />
    </svg>
  );
}

function PurchasePartGoActionArtwork({ japanese }: { japanese: boolean }) {
  return (
    <div className="stretch-vector" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: '#f8fafc', border: '1.5px solid #287d96', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', color: '#164e63', boxShadow: '0 0 6px rgba(40,125,150,0.2)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          {japanese ? '購入部品' : 'Purchase Part'}
        </span>
        <span style={{ fontSize: '16px', color: 'var(--text-muted, #64748b)' }}>→</span>
        <span style={{ display: 'inline-block', padding: '4px 16px', background: '#1687df', border: '1.5px solid #106cb3', borderRadius: '4px', fontWeight: 'bold', fontSize: '13px', color: '#ffffff', letterSpacing: '0.5px' }}>
          GO
        </span>
      </div>
      <span style={{ fontSize: '12px', color: 'var(--text-muted, #526174)', textAlign: 'center' }}>
        {japanese ? '購入部品を選択 → GOで実行' : 'Select purchase part → Select GO'}
      </span>
    </div>
  );
}

export default function LightenBrepArtwork({ step, japanese }: { step: number; japanese: boolean }) {
  const titles = japanese
    ? [
        'B-Repソリッドの軽量化を選択',
        '形状変更なしを選択',
        '購入部品を選択',
        '完了結果の確認'
      ]
    : [
        'Select Lighten B-Rep Solid',
        'Select No Form Changes',
        'Select the Purchase Part',
        'Check the Final Result'
      ];

  const title = titles[step] || titles[0];

  if (step === 0) {
    return (
      <span className="parasolid-lighten-artwork parasolid-lighten-artwork--0">
        <InterfaceIconPreview
          index={step}
          toolbar={false}
          title={title}
          japanese={japanese}
          custom={{
            artwork: <LightenBrepSolidIcon title={title} />,
            screen: lightenBrepScreen,
            screenSize: [563, 343],
            screenFit: 'comfortable',
            region: {
              bounds: [289, 69, 145, 92],
              landing: [289, 69, 145, 92]
            },
            highlightColor: '#e11d48'
          }}
        />
      </span>
    );
  }

  if (step === 1) {
    return (
      <span className="parasolid-lighten-artwork parasolid-lighten-artwork--1">
        <InterfaceIconPreview
          index={step}
          toolbar={false}
          title={title}
          japanese={japanese}
          custom={{
            artwork: (
              <svg className="stretch-vector" viewBox="0 0 200 130" role="img" aria-label={title}>
                <rect x="2" y="2" width="196" height="126" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                {/* Header bar */}
                <rect x="2" y="2" width="196" height="22" rx="4" fill="#e2e8f0" />
                <rect x="8" y="7" width="8" height="8" rx="1" fill="#ea580c" />
                <text x="20" y="17" fontSize="10" fontWeight="bold" fill="#334155" fontFamily="sans-serif">
                  Level Settings
                </text>
                {/* Group Box: Simplification Level */}
                <rect x="10" y="30" width="180" height="42" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <text x="16" y="40" fontSize="8.5" fontWeight="bold" fill="#475569" fontFamily="sans-serif">
                  Simplification Level
                </text>
                {/* Radio button: No form changes (selected) */}
                <circle cx="20" cy="54" r="5" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
                <circle cx="20" cy="54" r="2.5" fill="#0284c7" />
                <text x="30" y="57" fontSize="9.5" fontWeight="bold" fill="#0f172a" fontFamily="sans-serif">
                  No form changes
                </text>
                {/* Bottom Buttons */}
                <rect x="110" y="100" width="38" height="18" rx="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
                <text x="129" y="113" fontSize="9" fontWeight="bold" fill="#1e293b" textAnchor="middle" fontFamily="sans-serif">
                  OK
                </text>
                <rect x="152" y="100" width="38" height="18" rx="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
                <text x="171" y="113" fontSize="9" fill="#64748b" textAnchor="middle" fontFamily="sans-serif">
                  Cancel
                </text>
              </svg>
            ),
            screen: dialogBoxScreen,
            screenSize: [446, 387],
            screenFit: 'comfortable',
            region: {
              bounds: [0, 0, 446, 387],
              landing: [35, 60, 370, 75]
            },
            highlightColor: '#0284c7'
          }}
        />
      </span>
    );
  }

  if (step === 2) {
    return (
      <span className="parasolid-lighten-artwork parasolid-lighten-artwork--2">
        <PurchasePartGoActionArtwork japanese={japanese} />
      </span>
    );
  }

  return (
    <span className="parasolid-lighten-artwork parasolid-lighten-artwork--3">
      <InterfaceIconPreview
        index={step}
        toolbar={false}
        title={title}
        japanese={japanese}
        custom={{
          artwork: (
            <svg className="stretch-vector" viewBox="0 0 240 60" role="img" aria-label={title}>
              <rect x="2" y="2" width="236" height="56" rx="4" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
              <rect x="6" y="8" width="85" height="16" rx="3" fill="#dcfce7" stroke="#86efac" strokeWidth="1" />
              <text x="48" y="20" fontSize="9" fontWeight="bold" fill="#15803d" textAnchor="middle" fontFamily="sans-serif">
                Message Pane
              </text>
              <text x="10" y="42" fontSize="9.5" fontWeight="bold" fill="#1e293b" fontFamily="monospace">
                MSG06901 Process completed...
              </text>
            </svg>
          ),
          screen: messagePaneScreen,
          screenSize: [719, 52],
          screenFit: 'comfortable',
          region: {
            bounds: [0, 0, 719, 52],
            landing: [0, 0, 719, 52]
          },
          highlightColor: '#10b981'
        }}
      />
    </span>
  );
}
