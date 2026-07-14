import React, { useEffect, useRef } from "react";
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
  "PIPING STANDARD",
  "REMINDER:",
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
  { english: "Bearing Nut", itemName: "ベアリングナット", spec: "AN18", note1: "", note2: "Use half-width alphanumeric characters and symbols", highlight: false },
  { english: "Bearing Washer", itemName: "ベアリングワッシャ", spec: "AW18", note1: "", note2: "Standardize to use \"-\" instead of \"x\" before indicating the length of pipes and hoses.", highlight: false },
  { english: "C-Shaped Retaining Ring for Shaft", itemName: "C形止め輪(軸用)", spec: "STW-10", note1: "Available in iCAD standard parts", note2: "Pipe sizes are listed in Table A", highlight: false },
  { english: "C-Shaped Retaining Ring for Hole", itemName: "C形止め輪(穴用)", spec: "RTW-10", note1: "Available in iCAD Standard Parts", note2: "Pipe fitting sizes are standardized using the B designation", highlight: false },
  { english: "Steel Pipe", itemName: "鋼管", spec: "SGP(白)15A-100mm", note1: "", note2: "For items where model number conventions are specified in the manufacturer's catalog, adhere to those conventions as closely as possible.", highlight: true },
  { english: "Steel Pipe", itemName: "鋼管", spec: "SGP(白)15A-5.5m", note1: "", note2: "Do not use \"x\" (lowercase \"x\") to represent the \"X\" (cross) used in notations such as fitting sizes.", highlight: true },
  { english: "Steel Pipe", itemName: "鋼管", spec: "SGP(黒)15A-100mm", note1: "", note2: "Do not include spaces between the product name and model number", highlight: true },
  { english: "Steel Pipe", itemName: "鋼管", spec: "SGP(黒)15A-5.5m", note1: "", note2: "Conforms to the internal regulations \"Standard Drawing Fastener Part Abbreviations\"", highlight: true },
  { english: "Steel Pipe", itemName: "鋼管", spec: "STPG370(Sch80)15A-100mm", note1: "", note2: "Items that can be placed using iCAD's part placement function should remain as they are.", highlight: true },
  { english: "Steel Pipe", itemName: "鋼管", spec: "STPG370(Sch80)15A-5.5m", note1: "", note2: "", highlight: true },
  { english: "Steel Pipe", itemName: "鋼管", spec: "OST-2-18x1.0-4m", note1: "", note2: "", highlight: true },
  { english: "Eye Bolt", itemName: "アイボルト", spec: "M10", note1: "", note2: "", highlight: false },
  { english: "Adapter", itemName: "アダプタ", spec: "0102BG16", note1: "", note2: "", highlight: false },
  { english: "AmiFlex", itemName: "アミドフレックス", spec: "AX-1210-5m-B", note1: "", note2: "", highlight: true },
  { english: "AmiFlex", itemName: "アミドフレックス", spec: "AX-1210-8-5m-B", note1: "", note2: "", highlight: true },
  { english: "Elbow", itemName: "エルボ", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "45° Elbow", itemName: "45°エルボ", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Female/Male Elbow", itemName: "メスオスエルボ", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Female/Male Socket", itemName: "メスオスソケット", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Coupler", itemName: "カプラ", spec: "21PM(SUS)", note1: "", note2: "", highlight: false },
  { english: "Coupler", itemName: "カプラ", spec: "21PM(ステンレス)", note1: "", note2: "", highlight: false },
  { english: "Coupler", itemName: "カプラ", spec: "21PM(真鍮)", note1: "", note2: "", highlight: false },
  { english: "Cap", itemName: "キャップ", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Copper Pipe", itemName: "銅管", spec: "φ6xt1x100mm", note1: "", note2: "", highlight: true },
  { english: "Copper Pipe", itemName: "銅管", spec: "φ6xt1x10m", note1: "", note2: "", highlight: true },
  { english: "Grease Nipple", itemName: "グリースニップル", spec: "A-101", note1: "", note2: "", highlight: false },
  { english: "10K Globe Valve", itemName: "10Kグローブバルブ", spec: "1/4B", note1: "", note2: "", highlight: true },
  { english: "Cross", itemName: "クロス", spec: "1/4B", note1: "", note2: "", highlight: true },
  { english: "Rubber Hose (including UL04C on both ends)", itemName: "ゴムホース(両端UL04C含む)", spec: "PA0305-1500mm", note1: "", note2: "", highlight: true },
  { english: "Rubber Hose (including UL04C on both ends)", itemName: "ゴムホース(両端GG-1500mm)", spec: "PA0305-GG-1500mm", note1: "", note2: "", highlight: true },
  { english: "Silicone Varnished Glass Tube", itemName: "シリコーンワニスガラスチューブ", spec: "SFGT-N-8-6-5m", note1: "", note2: "", highlight: true },
  { english: "Stop Valve", itemName: "ストップバルブ", spec: "1/2B", note1: "", note2: "", highlight: false },
  { english: "Spring Pin", itemName: "スプリングピン", spec: "10x50", note1: "Available in iCAD Standard parts", note2: "", highlight: false },
  { english: "Spray Valve", itemName: "スプレーバルブ", spec: "SLC-1-100L", note1: "", note2: "", highlight: false },
  { english: "Socket", itemName: "ソケット", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Check Valve", itemName: "チェックバルブ", spec: "FC-5", note1: "", note2: "", highlight: false },
  { english: "Ciccolo", itemName: "チッコロ", spec: "CM-1011", note1: "", note2: "", highlight: false },
  { english: "Tee", itemName: "ティー", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Tapered Pin (with Male Thread)", itemName: "テーパーピン(おねじ付)", spec: "8x10", note1: "Conforms to the internal regulations \"Standard Drawing Fastener Part Abbreviations\"", note2: "", highlight: false },
  { english: "Tapered Pin (with Female Thread)", itemName: "テーパーピン(めねじ付)", spec: "10x50", note1: "Conforms to the internal regulations \"Standard Drawing Fastener Part Abbreviations\"", note2: "", highlight: false },
  { english: "Dexter Valve", itemName: "デスターバルブ", spec: "VB7-5", note1: "", note2: "", highlight: false },
  { english: "Dot Socket", itemName: "ドットソケット", spec: "PH-8", note1: "", note2: "", highlight: false },
  { english: "Dot Socket", itemName: "ドットソケット", spec: "WG-101", note1: "", note2: "", highlight: false },
  { english: "Dot Socket", itemName: "ドットソケット", spec: "WG-111", note1: "", note2: "", highlight: false },
  { english: "Dot Socket (Custom Order)", itemName: "ドットソケット(特注品)", spec: "WG-101x30L", note1: "", note2: "", highlight: false },
  { english: "Nipple", itemName: "ニップル", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Long Nipple", itemName: "ロングニップル", spec: "1/2B-50L", note1: "※ Note: The symbol preceding the length designation for short nipples should be \"-\" rather than \"x\"", note2: "", highlight: true },
  { english: "Long Nipple", itemName: "ロングニップル", spec: "1/2B-75L", note1: "", note2: "", highlight: true },
  { english: "Long Nipple", itemName: "ロングニップル", spec: "1/2B-100L", note1: "", note2: "", highlight: true },
  { english: "Neck Nut", itemName: "ネックナット", spec: "RF-4", note1: "", note2: "", highlight: false },
  { english: "Neck Nut", itemName: "ネックナット", spec: "RF-5", note1: "", note2: "", highlight: false },
  { english: "Neck Nut", itemName: "ネックナット", spec: "RF-6", note1: "", note2: "", highlight: false },
  { english: "Neck Rail", itemName: "ネックレール", spec: "2BUx10-100", note1: "", note2: "", highlight: false },
  { english: "Rail Fixing Bracket", itemName: "レール固定用金具", spec: "2P", note1: "", note2: "", highlight: false },
  { english: "Nord-Lock", itemName: "ノルトロック", spec: "M10", note1: "Available in iCAD standard parts", note2: "", highlight: false },
  { english: "Nord-Lock Washer", itemName: "ノルトロックワッシャー", spec: "M10", note1: "Available in iCAD standard parts", note2: "", highlight: false },

  // Image 2
  { english: "Drive-in Rivets (Parker Rivet)", itemName: "打込み鋲(パーカー鋲)", spec: "3.51x4.8", note1: "Available in iCAD standard parts", note2: "", highlight: false },
  { english: "Half Elbow", itemName: "ハーフエルボ", spec: "L-15x1/2", note1: "Conforms to the internal regulations \"Standard Drawing Fastener Part Abbreviations\"", note2: "", highlight: false },
  { english: "Half Union", itemName: "ハーフユニオン", spec: "KQ2H08-01AS", note1: "", note2: "", highlight: false },
  { english: "Half Union", itemName: "ハーフユニオン", spec: "MH-1081", note1: "", note2: "", highlight: false },
  { english: "Half Union", itemName: "ハーフユニオン", spec: "S-15x1/4", note1: "", note2: "", highlight: false },
  { english: "Pipe Clamp", itemName: "パイプクランプ", spec: "LNCr6mm", note1: "", note2: "", highlight: false },
  { english: "Pipe Clamp", itemName: "パイプクランプ", spec: "LNG8G-16/18", note1: "", note2: "", highlight: false },
  { english: "Pipe Clamp", itemName: "パイプクランプ", spec: "SP2Gr10Ax10APPA52形", note1: "", note2: "", highlight: false },
  { english: "Pipe Clamp", itemName: "パイプクランプ", spec: "SP2Gr11APPAS", note1: "", note2: "", highlight: false },
  { english: "Pipe Clamp", itemName: "パイプクランプ", spec: "SP2Cr10APPAS3N8", note1: "", note2: "", highlight: false },
  { english: "Hose Clamp", itemName: "ホースクランプ", spec: "LN3Gr14", note1: "", note2: "", highlight: false },
  { english: "Hose Clamp", itemName: "ホースクランプ", spec: "LN3Gr14mmPP", note1: "", note2: "", highlight: false },
  { english: "Hose Clamp", itemName: "ホースクランプ", spec: "LN3Gr14", note1: "", note2: "", highlight: false },
  { english: "Hose Clamp", itemName: "ホースクランプ", spec: "LNG4G-16/18", note1: "", note2: "", highlight: false },
  { english: "Hose Clamp", itemName: "ホースクランプ", spec: "LNG4G-20mmPP", note1: "", note2: "", highlight: false },
  { english: "Pipe Band", itemName: "パイプバンド", spec: "P211", note1: "", note2: "", highlight: false },
  { english: "Pipe Band", itemName: "パイプバンド", spec: "P2816", note1: "", note2: "", highlight: false },
  { english: "Pipe Band (Volume Control Type)", itemName: "パイプバンド(量調式)", spec: "PZ146", note1: "", note2: "", highlight: false },
  { english: "Spring Washer (No. 2)", itemName: "ばね座金(2号)", spec: "M8", note1: "Conforms to the internal regulations \"Standard Drawing Fastener Part Abbreviations\"", note2: "", highlight: false },
  { english: "Barrel Nipple", itemName: "バレルニップル", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Bushing", itemName: "ブッシング", spec: "1/2B x 1/4B", note1: "", note2: "", highlight: true },
  { english: "Bushing", itemName: "ブッシング", spec: "SBU08-020F", note1: "", note2: "", highlight: false },
  { english: "Plug", itemName: "プラグ", spec: "1/4B", note1: "", note2: "", highlight: true },
  { english: "Plug", itemName: "プラグ", spec: "SPA01-000J", note1: "", note2: "", highlight: false },
  { english: "Plug", itemName: "プラグ", spec: "SPA04-000", note1: "", note2: "", highlight: false },
  { english: "Plug", itemName: "プラグ1/4B", spec: "SPA02-000J", note1: "", note2: "", highlight: false },
  { english: "1/4B Plug", itemName: "プラグ1/8B", spec: "SPA01-000J", note1: "", note2: "", highlight: false },
  { english: "1/8B Plug", itemName: "フレアリンクボルト", spec: "A-21", note1: "", note2: "", highlight: false },
  { english: "French Link Bolt", itemName: "ヘリサート", spec: "M5x1.5D", note1: "", note2: "", highlight: false },
  { english: "Helical Insert", itemName: "口金具", spec: "U004C", note1: "", note2: "", highlight: false },
  { english: "Flange", itemName: "ボールバルブ", spec: "1/4B", note1: "", note2: "", highlight: true },
  { english: "Ball Valve", itemName: "ボールバルブ", spec: "DBV-12B-R", note1: "", note2: "", highlight: false },
  { english: "Ball Valve", itemName: "メスオスソケット", spec: "1/4B(メス) x 1/8B(オス)", note1: "", note2: "", highlight: true },
  { english: "Female and Male Socket", itemName: "メスオスソケット", spec: "1B", note1: "", note2: "", highlight: true },
  { english: "Female and Male Socket", itemName: "メスオスソケット", spec: "NF-1022", note1: "", note2: "", highlight: false },
  { english: "Female and Male Socket", itemName: "メスオスソケット", spec: "SS502-020J", note1: "", note2: "", highlight: false },
  { english: "Female and Male Socket A-Type", itemName: "メスオスソケットA形", spec: "SS502-020J", note1: "", note2: "", highlight: false },
  { english: "Female and Male Socket", itemName: "ユニオン", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Female and Male Socket A-Type", itemName: "リリーフニップル", spec: "WF-100", note1: "", note2: "", highlight: false },
  { english: "Union", itemName: "リリーフニップル(SUS)", spec: "WF-100", note1: "", note2: "", highlight: false },
  { english: "Relief Nipple", itemName: "スプリングピン", spec: "5x25", note1: "Conforms to the internal regulations \"Standard Drawing Fastener Part Abbreviations\" Do not use roll pin notation.", note2: "", highlight: false },
  { english: "Relief Nipple (SUS)", itemName: "ロングエルボ", spec: "1/2B-100L", note1: "", note2: "", highlight: false },
  { english: "Spring Pin", itemName: "ワンタッチ管継手", spec: "KQ2H08-01S", note1: "", note2: "", highlight: false },
  { english: "Long Elbow", itemName: "異径ソケット", spec: "3/8B x 1/4B", note1: "", note2: "", highlight: true },
  { english: "Long Nipple", itemName: "異径エルボ", spec: "3/4B x 1B", note1: "", note2: "", highlight: true },
  { english: "One-Touch Pipe Fitting", itemName: "異径ティー", spec: "1/2B x 1/2B x 1/4B", note1: "", note2: "", highlight: true },
  { english: "Reducing Socket", itemName: "異径ニップル", spec: "1/2B x 3/8B", note1: "", note2: "", highlight: true },
  { english: "Reducing Elbow", itemName: "", spec: "", note1: "", note2: "", highlight: false },

  // Image 3
  { english: "Reducing Tee", itemName: "銘板(機器)", spec: "機器104", note1: "", note2: "", highlight: false },
  { english: "Reducing Nipple", itemName: "割りピン", spec: "2x15", note1: "Conforms to the internal regulations \"Standard Drawing Fastener Part Abbreviations\"", note2: "", highlight: false },
  { english: "Equipment Nameplate", itemName: "傾斜座金(溝形鋼に適用)", spec: "M10", note1: "Conforms to the internal regulations \"Standard Drawing Fastener Part Abbreviations\"", note2: "", highlight: false },
  { english: "Cotter Pin", itemName: "傾斜座金(I形鋼に適用)", spec: "M10", note1: "Conforms to the internal regulations \"Standard Drawing Fastener Part Abbreviations\"", note2: "", highlight: false },
  { english: "Angled Washer (for Channel Steel)", itemName: "口金具", spec: "U004C", note1: "", note2: "", highlight: false },
  { english: "Angled washer (for I-beams)", itemName: "四角頭付プラグ", spec: "1/2B", note1: "", note2: "", highlight: true },
  { english: "Mouth fitting", itemName: "蝶番ボルト", spec: "SPA-M5-15-C", note1: "", note2: "", highlight: false },
  { english: "Square head plug", itemName: "針金", spec: "φ0.7-0.9m", note1: "", note2: "", highlight: false },
  { english: "Plastic bolt", itemName: "平行キー(両丸)", spec: "K10x8x14", note1: "Available in iCAD Standard Parts", note2: "", highlight: false },
  { english: "Wire", itemName: "平行キー(両丸)", spec: "K10x8x14", note1: "Available in iCAD Standard Parts", note2: "", highlight: false },
  { english: "Parallel key (double square)", itemName: "平行キー(片丸)", spec: "K10x8x14", note1: "Available in iCAD Standard Parts", note2: "", highlight: false },
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

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const scrollTable = (direction: 'left' | 'right') => {
    if (tableContainerRef.current) {
      const scrollAmount = 300;
      const currentScroll = tableContainerRef.current.scrollLeft;
      tableContainerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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

      <section className="lesson-intro">
        <KaraokeLessonText
          as="h3"
          className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`}
          data-reading-index="0"
          text="PIPING STANDARD"
          isActive={isSpeaking && currentIndex === 0}
          currentCharIndex={currentCharIndex}
        />
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text="REMINDER:"
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          <div
            className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`}
            data-reading-index="2"
          >
            <div className="step-header">
              <span className="step-number">1 </span>
              <KaraokeLessonText
                as="span"
                className="step-label"
                text="Please review the Piping Parts Reference Table."
                isActive={isSpeaking && currentIndex === 2}
                currentCharIndex={currentCharIndex}
              />
            </div>
          </div>

          <div
            className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`}
            data-reading-index="3"
          >
            <div className="step-header">
              <span className="step-number">2 </span>
              <KaraokeLessonText
                as="span"
                className="step-label"
                text="Ensure standard parts are selected according to this table."
                isActive={isSpeaking && currentIndex === 3}
                currentCharIndex={currentCharIndex}
              />
            </div>
          </div>

          <div className="table-wrapper" style={{ position: 'relative', marginTop: '2rem', marginBottom: '2rem' }}>
            <button
              className="nav-button"
              onClick={() => scrollTable('left')}
              title="Scroll Left"
              style={{
                position: 'absolute',
                left: '-1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              }}
            >
              <ChevronLeft size={24} style={{ margin: 0 }} />
            </button>
            <div className="lesson-table-container" ref={tableContainerRef} style={{ margin: 0 }}>
              <table className="lesson-table" style={{ minWidth: 'max-content' }}>
                <thead>
                  <tr>
                    <th>English</th>
                    <th>Item Name</th>
                    <th>Part Number/Specifications</th>
                    <th>Notes</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.english}</td>
                      <td className={row.highlight ? "highlight-cell-yellow" : ""}>{row.itemName}</td>
                      <td className={row.highlight ? "highlight-cell-yellow" : ""}>{row.spec}</td>
                      <td className={row.highlight ? "highlight-cell-yellow" : ""}>{row.note1}</td>
                      <td className={row.highlight ? "highlight-cell-yellow" : ""}>{row.note2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="nav-button"
              onClick={() => scrollTable('right')}
              title="Scroll Right"
              style={{
                position: 'absolute',
                right: '-1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              }}
            >
              <ChevronRight size={24} style={{ margin: 0 }} />
            </button>
          </div>

          <div className="lesson-navigation mt-12">
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
