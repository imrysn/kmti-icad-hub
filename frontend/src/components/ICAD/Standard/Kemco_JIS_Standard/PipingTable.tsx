import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../../KaraokeLessonText";
import "../../../../styles/2D_Drawing/CourseLesson.css";

interface PipingTableLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const reminderSteps = [
  "Please review the Piping Parts Reference Table.",
  "Ensure standard parts are selected according to this table."
];

interface TableRow {
  english: string;
  itemName: string;
  spec: string;
  note1: string;
  note2: string;
  highlight: boolean;
}

const tableData: TableRow[] = [
  // Image 1
  { english: "Bearing Nut", itemName: "ベアリングナット", spec: "AN08", note1: "", note2: "Use half-width alphanumeric characters and symbols", highlight: false },
  { english: "Bearing Washer", itemName: "ベアリングワッシャ", spec: "AW08", note1: "", note2: "Standardize to use \"-\" instead of \"x\" before indicating the length of pipes and hoses.", highlight: false },
  { english: "C-Shaped Retaining Ring for Shaft", itemName: "軸用C形止め輪", spec: "STW-10", note1: "Available in iCAD standard parts", note2: "Pipe sizes are listed in Table A", highlight: false },
  { english: "C-Shaped Retaining Ring for Hole", itemName: "穴用C形止め輪", spec: "RTW-10", note1: "Available in iCAD Standard Parts", note2: "Pipe fitting sizes are standardized using the B designation", highlight: false },
  { english: "Steel Pipe", itemName: "鋼管", spec: "SGP(白)15A-100mm", note1: "", note2: "For items where model number conventions are specified in the manufacturer's catalog, adhere to those conventions as closely as possible.", highlight: true },
  { english: "Steel Pipe", itemName: "鋼管", spec: "SGP(白)15A-5.5m", note1: "", note2: "Do not use \"x\" (lowercase \"x\") to represent the \"X\" (cross) used in notations such as fitting sizes.", highlight: true },
  { english: "Steel Pipe", itemName: "鋼管", spec: "SGP(黒)15A-100mm", note1: "", note2: "Do not include spaces between the product name and model number", highlight: true },
  { english: "Steel Pipe", itemName: "鋼管", spec: "SGP(黒)15A-5.5m", note1: "", note2: "Conforms to the internal regulations \"Standard Drawing Fastener Part Abbreviations\"", highlight: true },
  { english: "Steel Pipe", itemName: "鋼管", spec: "STPG370(Sch80)15A-100mm", note1: "", note2: "Items that can be placed using iCAD's part placement function should remain as they are.", highlight: true },
  { english: "Steel Pipe", itemName: "鋼管", spec: "STPG370(Sch80)15A-5.5m", note1: "", note2: "", highlight: true },
  { english: "Steel Pipe", itemName: "鋼管", spec: "OST-2-18x1.0-4m", note1: "", note2: "", highlight: true },
  { english: "Eye Bolt", itemName: "アイボルト", spec: "M10", note1: "", note2: "", highlight: false },
  { english: "Adapter", itemName: "アダプタ", spec: "8002RG06", note1: "", note2: "", highlight: false },
  { english: "AmidFlex", itemName: "アミドフレックス", spec: "AX-1210-5m-B", note1: "", note2: "", highlight: true },
  { english: "AmidFlex", itemName: "アミドフレックス", spec: "AX-1210-8-5m-B", note1: "", note2: "", highlight: true },
  { english: "Elbow", itemName: "エルボ", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "45° Elbow", itemName: "45°エルボ", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Female/Male Elbow", itemName: "メスオスエルボ", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Female/Male Socket", itemName: "メスオスソケット", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Coupler", itemName: "カプラ", spec: "20PM(SUS)", note1: "", note2: "", highlight: false },
  { english: "Coupler", itemName: "カプラ", spec: "20PM(ステンレス)", note1: "", note2: "", highlight: false },
  { english: "Coupler", itemName: "カプラ", spec: "20PM(真鍮)", note1: "", note2: "", highlight: false },
  { english: "Cap", itemName: "キャップ", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Copper Pipe", itemName: "銅管", spec: "φ6xt1x100mm", note1: "", note2: "", highlight: true },
  { english: "Copper Pipe", itemName: "銅管", spec: "φ6xt1x10m", note1: "", note2: "", highlight: true },
  { english: "Grease Nipple", itemName: "グリースニップル", spec: "WA-101", note1: "", note2: "", highlight: false },
  { english: "10K Globe Valve", itemName: "10Kグローブバルブ", spec: "1/4B", note1: "", note2: "", highlight: true },
  { english: "Cross", itemName: "クロス", spec: "1/4B", note1: "", note2: "", highlight: true },
  { english: "Rubber Hose (including UL04C on both ends)", itemName: "ゴムホース(両端UL04C含む)", spec: "PA0306-1500mm", note1: "", note2: "", highlight: true },
  { english: "Rubber Hose (including UL04C on both ends)", itemName: "ゴムホース(両端UL04C含む)", spec: "PA0306-GG-1500mm", note1: "", note2: "", highlight: true },
  { english: "Silicone Varnished Glass Tube", itemName: "シリコーンワニスガラスチューブ", spec: "SFGT-N-3-6-5m", note1: "", note2: "", highlight: true },
  { english: "Stop Valve", itemName: "ストップバルブ", spec: "1/2B", note1: "", note2: "", highlight: false },
  { english: "Spring Pin", itemName: "スプリングピン", spec: "10x50", note1: "Available in iCAD Standard parts", note2: "", highlight: false },
  { english: "Spray Valve", itemName: "スプレーバルブ", spec: "SLC-1-1000", note1: "", note2: "", highlight: false },
  { english: "Socket", itemName: "ソケット", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Check Valve", itemName: "チェックバルブ", spec: "PC-6", note1: "", note2: "", highlight: false },
  { english: "Ciccolo", itemName: "チッコロ", spec: "CM-1011", note1: "", note2: "", highlight: false },
  { english: "Tee", itemName: "ティー", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Tapered Pin (with Male Thread)", itemName: "テーパーピン(おねじ付)", spec: "8x60", note1: "Conforms to the internal regulations \"Standard Drawing Fastener Part Abbreviations\"", note2: "", highlight: false },
  { english: "Tapered Pin (with Female Thread)", itemName: "テーパーピン（めねじ付き）", spec: "10x50", note1: "Conforms to the internal regulations \"Standard Drawing Fastener Part Abbreviations\"", note2: "", highlight: false },
  { english: "Dester Valve", itemName: "デスターバルブ", spec: "VB2-6", note1: "", note2: "", highlight: false },
  { english: "Dot Socket", itemName: "ドットソケット", spec: "PH-6", note1: "", note2: "", highlight: false },
  { english: "Dot Socket", itemName: "ドットソケット", spec: "WG-100", note1: "", note2: "", highlight: false },
  { english: "Dot Socket", itemName: "ドットソケット", spec: "WG-110", note1: "", note2: "", highlight: false },
  { english: "Dot Socket (Custom Order)", itemName: "ドットソケット(特注品)", spec: "WG-110x36L", note1: "", note2: "", highlight: false },
  { english: "Nipple", itemName: "ニップル", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Long Nipple", itemName: "ロングニップル", spec: "1/2B-50L", note1: "※ Note: The symbol preceding the length designation for short nipples should be \"-\" rather than \"x\"", note2: "", highlight: true },
  { english: "Long Nipple", itemName: "ロングニップル", spec: "1/2B-75L", note1: "", note2: "", highlight: true },
  { english: "Long Nipple", itemName: "ロングニップル", spec: "1/2B-100L", note1: "", note2: "", highlight: true },
  { english: "Neck Nut", itemName: "ネックナット", spec: "RF-4", note1: "", note2: "", highlight: false },
  { english: "Neck Nut", itemName: "ネックナット", spec: "RF-5", note1: "", note2: "", highlight: false },
  { english: "Neck Nut", itemName: "ネックナット", spec: "RF-6", note1: "", note2: "", highlight: false },
  { english: "Neck Rail", itemName: "ネックレール", spec: "2RUx18-100", note1: "", note2: "", highlight: false },
  { english: "Rail Fixing Bracket", itemName: "レール固定用金具", spec: "2P", note1: "", note2: "", highlight: false },
  { english: "Nord-Lock", itemName: "ノルトロック", spec: "M10", note1: "Available in iCAD standard parts", note2: "", highlight: false },
  { english: "Nord-Lock Washer", itemName: "ノルトロックワッシャー", spec: "M10", note1: "Available in iCAD standard parts", note2: "", highlight: false },

  // Image 2
  { english: "Drive-in Rigs (Parker Rigs)", itemName: "打込み鋲(パーカー鋲)", spec: "3.51x4.8", note1: "Available in iCAD standard parts", note2: "", highlight: false },
  { english: "Half Elbow", itemName: "ハーフエルボ", spec: "E-15x1/2", note1: "Conforms to the internal regulations \"Standard Drawing Fastener Part Abbreviations\"", note2: "", highlight: false },
  { english: "Half Union", itemName: "ハーフユニオン", spec: "KQ2H04-M5A", note1: "", note2: "", highlight: false },
  { english: "Half Union", itemName: "ハーフユニオン", spec: "KQ2H08-01AS", note1: "", note2: "", highlight: false },
  { english: "Half Union", itemName: "ハーフユニオン", spec: "MH-1061", note1: "", note2: "", highlight: false },
  { english: "Half Union", itemName: "ハーフユニオン", spec: "S-15x3/8", note1: "", note2: "", highlight: false },
  { english: "Pipe Clamp", itemName: "パイプクランプ", spec: "LN1Gr6mm", note1: "", note2: "", highlight: false },
  { english: "Pipe Clamp", itemName: "パイプクランプ", spec: "LNG3Gr16/16", note1: "", note2: "", highlight: false },
  { english: "Pipe Clamp", itemName: "パイプクランプ", spec: "SP2Gr10A×10APAAS2段", note1: "", note2: "", highlight: false },
  { english: "Pipe Clamp", itemName: "パイプクランプ", spec: "SP2GR10APPAS", note1: "", note2: "", highlight: false },
  { english: "Pipe Clamp", itemName: "パイプクランプ", spec: "SP2Gr10APPAS2段", note1: "", note2: "", highlight: false },
  { english: "Hose Clamp", itemName: "ホースクランプ", spec: "LN3Gr14", note1: "", note2: "", highlight: false },
  { english: "Hose Clamp", itemName: "ホースクランプ", spec: "LN3Gr14mmPP", note1: "", note2: "", highlight: false },
  { english: "Hose Clamp", itemName: "ホースクランプ", spec: "LN3Gr14", note1: "", note2: "", highlight: false },
  { english: "Hose Clamp", itemName: "ホースクランプ", spec: "LNG4Gr-18/18", note1: "", note2: "", highlight: false },
  { english: "Hose Clamp", itemName: "ホースクランプ", spec: "LNG4Gr-20mmPP", note1: "", note2: "", highlight: false },
  { english: "Pipe Band", itemName: "パイプバンド", spec: "PZ16", note1: "", note2: "", highlight: false },
  { english: "Pipe Band", itemName: "パイプバンド", spec: "PZ516", note1: "", note2: "", highlight: false },
  { english: "Pipe Band (Volume Control Type)", itemName: "パイプバンド(量調式)", spec: "PZ146", note1: "", note2: "", highlight: false },
  { english: "Spring Washer (No. 2)", itemName: "ばね座金(2号)", spec: "M8", note1: "Conforms to the internal regulations \"Standard Drawing Fastener Part Abbreviations\"", note2: "", highlight: false },
  { english: "Barrel Nipple", itemName: "バレルニップル", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Bushing", itemName: "ブッシング", spec: "1/2B x 1/4B", note1: "", note2: "", highlight: true },
  { english: "Bushing", itemName: "ブッシング", spec: "SBU03-020F", note1: "", note2: "", highlight: false },
  { english: "Plug", itemName: "プラグ", spec: "1/4B", note1: "", note2: "", highlight: true },
  { english: "Plug", itemName: "プラグ", spec: "SPA01-000J", note1: "", note2: "", highlight: false },
  { english: "Plug", itemName: "プラグ", spec: "SPA04-000", note1: "", note2: "", highlight: false },
  { english: "Plug", itemName: "プラグ1/4B", spec: "SPA02-000J", note1: "", note2: "", highlight: false },
  { english: "1/4B Plug", itemName: "プラグ1/8B", spec: "SPA01-000J", note1: "", note2: "", highlight: false },
  { english: "1/8B Plug", itemName: "フレアリンクボルト", spec: "A-20", note1: "", note2: "", highlight: false },
  { english: "French Link Bolt", itemName: "ヘリサート", spec: "M5x1.5D", note1: "", note2: "", highlight: false },
  { english: "Helical Insert", itemName: "口金具", spec: "UB04C", note1: "", note2: "", highlight: false },
  { english: "Flange", itemName: "ボールバルブ", spec: "1/4B", note1: "", note2: "", highlight: true },
  { english: "Ball Valve", itemName: "ボールバルブ", spec: "DBV-12B-R", note1: "", note2: "", highlight: false },
  { english: "Ball Valve", itemName: "メスオスソケット", spec: "1/4B(メス) x 1/8B(オス)", note1: "", note2: "", highlight: true },
  { english: "Female and Male Socket", itemName: "メスオスソケット", spec: "1B", note1: "", note2: "", highlight: true },
  { english: "Female and Male Socket", itemName: "メスオスソケット", spec: "NF-1022", note1: "", note2: "", highlight: false },
  { english: "Female and Male Socket", itemName: "メスオスソケット", spec: "SSS02-020J", note1: "", note2: "", highlight: false },
  { english: "Female and Male Socket", itemName: "メスオスソケットA形", spec: "SSS02-020J", note1: "", note2: "", highlight: false },
  { english: "Female and Male Socket", itemName: "ユニオン", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Female and Male Socket A-Type", itemName: "リリーフニップル", spec: "WF-100", note1: "", note2: "", highlight: false },
  { english: "Union", itemName: "リリーフニップル(SUS)", spec: "WF-100", note1: "", note2: "", highlight: false },
  { english: "Relief Nipple", itemName: "スプリングピン", spec: "5x25", note1: "Conforms to the internal regulations \"Standard Drawing Fastener Part Abbreviations\" Do not use roll pin notation.", note2: "", highlight: false },
  { english: "Relief Nipple (SUS)", itemName: "ロングエルボ", spec: "SL34-12", note1: "", note2: "", highlight: false },
  { english: "Spring Pin", itemName: "ワンタッチ管継手", spec: "1/2B-100", note1: "", note2: "", highlight: false },
  { english: "Long Elbow", itemName: "異径ソケット", spec: "KQ2H06-01S", note1: "", note2: "", highlight: true },
  { english: "Long Nipple", itemName: "異径エルボ", spec: "3/8B×1/4B", note1: "", note2: "", highlight: true },
  { english: "One-Touch Pipe Fitting", itemName: "異径ティー", spec: "3/4B×1B", note1: "", note2: "", highlight: true },
  { english: "Reducing Socket", itemName: "異径ニップル", spec: "1/2B×1/2B×1/4B", note1: "", note2: "", highlight: true },
  { english: "Reducing Elbow", itemName: "異径ニップル", spec: "1/2B x 3/8B", note1: "", note2: "", highlight: false },

  // Image 3
  { english: "Reducing Tee", itemName: "銘板(機器)", spec: "機器104", note1: "", note2: "", highlight: false },
  { english: "Reducing Nipple", itemName: "割りピン", spec: "2x15", note1: "Conforms to the internal regulations \"Standard Drawing Fastener Part Abbreviations\"", note2: "", highlight: false },
  { english: "Equipment Nameplate", itemName: "傾斜座金(溝形鋼に適用)", spec: "M10", note1: "Conforms to the internal regulations \"Standard Drawing Fastener Part Abbreviations\"", note2: "", highlight: false },
  { english: "Cotter Pin", itemName: "傾斜座金(I形鋼に適用)", spec: "M10", note1: "Conforms to the internal regulations \"Standard Drawing Fastener Part Abbreviations\"", note2: "", highlight: false },
  { english: "Angled Washer (for Channel Steel)", itemName: "口金具", spec: "UA04C", note1: "", note2: "", highlight: false },
  { english: "Angled washer (for I-beams)", itemName: "四角頭付プラグ", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Mouth fitting", itemName: "蝶番ボルト", spec: "SPA-M5-15-C", note1: "", note2: "", highlight: false },
  { english: "Square head plug", itemName: "針金", spec: "φ0.7-0.3m", note1: "", note2: "", highlight: false },
  { english: "Plastic bolt", itemName: "平行キー(両丸)", spec: "K10x8x34", note1: "Available in iCAD Standard Parts", note2: "", highlight: false },
  { english: "Wire", itemName: "平行キー(両丸)", spec: "K10x8x34", note1: "Available in iCAD Standard Parts", note2: "", highlight: false },
  { english: "Parallel key (double square)", itemName: "平行キー(片丸)", spec: "K10x8x34", note1: "Available in iCAD Standard Parts", note2: "", highlight: false },
  { english: "Parallel key (double round)", itemName: "六角穴付きプラグ", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Parallel key (single round)", itemName: "六角穴付きプラグ", spec: "SPA01-000J", note1: "", note2: "", highlight: false },
  { english: "Hexagon socket plug", itemName: "", spec: "", note1: "", note2: "", highlight: false },
  { english: "Hexagon socket plug", itemName: "", spec: "", note1: "", note2: "", highlight: false }
];

const PipingTableLesson: React.FC<PipingTableLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel,
}) => {
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex,
    registerText,
  } = useLessonCore("kemco-piping-table");



  useEffect(() => {
    registerText(reminderSteps, 0);
  }, [registerText]);

  const tabsList = [{ id: "kemco-piping-table" }];

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    "kemco-piping-table",
    reminderSteps.length,
    tabsList,
    () => { if (onNextLesson) onNextLesson(); },
    speak,
    reminderSteps,
    0
  );

  const handleNext = () => {
    stop();
    if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    stop();
    if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-grid single-card" style={{ marginTop: "0.5rem" }}>
        <div className="lesson-card tab-content fade-in" style={{ paddingTop: "1.5rem", gap: "1rem" }}>
          <div
            className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`}
            data-reading-index="2"
          >
          </div>

          <div className="table-wrapper" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <div className="lesson-table-container piping-table-container" style={{ margin: 0 }}>
              <table
                className="lesson-table piping-table-compact"
              >
                <colgroup>
                  <col style={{ width: '16%' }} />
                  <col style={{ width: '26%' }} />
                  <col style={{ width: '22%' }} />
                  <col style={{ width: '36%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th style={{ fontSize: '13.6px', textTransform: 'uppercase', color: 'var(--accent)', textAlign: 'center' }}>English</th>
                    <th style={{ fontSize: '13.6px', textTransform: 'uppercase', color: 'var(--accent)', textAlign: 'center' }}>Item Name (Japanese)</th>
                    <th style={{ fontSize: '13.6px', textTransform: 'uppercase', color: 'var(--accent)', textAlign: 'center' }}>Part No. / Spec</th>
                    <th style={{ fontSize: '13.6px', textTransform: 'uppercase', color: 'var(--accent)', textAlign: 'center' }}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>{row.english}</td>
                      <td className={row.highlight ? "highlight-cell-yellow" : ""} style={{ textAlign: 'center', fontSize: '14px' }}>{row.itemName}</td>
                      <td className={row.highlight ? "highlight-cell-yellow" : ""} style={{ textAlign: 'center', fontSize: '14px' }}>{row.spec}</td>
                      <td style={{ textAlign: 'center', fontSize: '14px' }}>
                        {row.note1 && row.note2
                          ? <>{row.note1}<br /><span style={{ opacity: 0.8 }}>{row.note2}</span></>
                          : row.note1 || row.note2}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lesson-navigation">
            <button
              className="nav-button"
              onClick={handlePrev}
              disabled={!onPrevLesson}
            >
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={handleNext}>
              {nextLabel || "Next Lesson"} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipingTableLesson;
