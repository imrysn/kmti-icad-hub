import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useLessonCore } from '../../hooks/useLessonCore';
import { useTTSAutoplay } from '../../hooks/useTTSAutoplay';
import { KaraokeLessonText } from '../KaraokeLessonText';
import '../../styles/2D_Drawing/CourseLesson.css';

import cylinderExImg from '../../assets/2D_Image_File/2D_material_weight_computation_cylinder.jpg';
import plateExImg from '../../assets/2D_Image_File/2D_material_weight_computation_plate.jpg';
import shapeSteelEx1Img from '../../assets/2D_Image_File/2D_material_weight_computation_shape_steel.jpg';
import shapeSteelEx2Img from '../../assets/2D_Image_File/2D_material_weight_computation_shape_steel_ex2.jpg';
import pipeExImg from '../../assets/2D_Image_File/2D_material_weight_computation_square_rectangular_pipe.jpg';

interface WeightComputationLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const WeightComputationLesson: React.FC<WeightComputationLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const { t } = useTranslation();
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore('2d-weight-computation');
  const currentTabSteps = [
    t('2d.step.material_weight_computation'),
    t('2d.step.review_the_specific_gravity_ta'),
    t('2d.step.plate_computation__length_by_w'),
    t('2d.step.cylinder_computation__pi_times'),
    t('2d.step.shape_steel__cross_sectional_a'),
    t('2d.step.square_or_rectangular_pipe__cr')
  ];
  const tabsList = [{ id: 'default' }];

  useEffect(() => { registerText(currentTabSteps, 0); }, [registerText]);

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) sessionStorage.setItem('tts-autoplay-active', 'false');
    onNextLesson?.();
  };

  useTTSAutoplay(isSpeaking, currentIndex, 'default', currentTabSteps.length, tabsList, handleNext, speak, currentTabSteps, 0);

  const materials = [
    ['SS400', '7.85', '7850'], ['S45C', '7.84', '7840'], ['STKM', '7.85', '7850'],
    ['SPCC', '7.85', '7850'], ['SCM440', '7.84', '7840'], [t('2d.weight.rubber'), '7.00', '7000'],
    [t('2d.weight.urethane_rubber'), '1.20', '1200'], [t('2d.weight.new_light'), '0.92', '950'],
    ['MC NYLON', '1.15', '1150'], [t('2d.weight.acrylic'), '1.20', '1200'], ['STKR400', '7.85', '7850'],
    [t('2d.weight.shape_steel'), '7.85', '7850']
  ];

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container"><div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} /></div>
      <div className="lesson-grid single-card"><div className="lesson-card"><div className="fade-in"><div className="flex-col tab-content fade-in">
        <div className={`step-header ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0" style={{ marginTop: '-1rem', marginBottom: '-1rem' }}>
          <span className="step-number">15</span>
          <KaraokeLessonText as="span" className="step-label" text={t('2d.step.material_weight_computation')} isActive={isSpeaking && currentIndex === 0} currentCharIndex={currentCharIndex} />
        </div>

        <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
          <div className="lesson-table-container"><table className="lesson-table"><colgroup><col style={{ width: '50%' }} /><col style={{ width: '25%' }} /><col style={{ width: '25%' }} /></colgroup>
            <thead><tr><th rowSpan={2}>{t('2d.weight.material')}</th><th colSpan={2}>{t('2d.weight.specific_gravity')}</th></tr><tr><th>g/cm³</th><th>kg/m³</th></tr></thead>
            <tbody>{materials.map(([material, grams, kilograms]) => <tr key={material}><td>{material}</td><td>{grams}</td><td>{kilograms}</td></tr>)}</tbody>
          </table></div>
        </div>

        <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
          <div className="step-header"><span className="step-number">a</span><KaraokeLessonText as="span" className="step-label" text={t('2d.weight.plate_formula')} isActive={isSpeaking && currentIndex === 2} currentCharIndex={currentCharIndex} /></div>
          <div className="step-description"><img src={plateExImg} alt="Plate computation example" className="software-screenshot screenshot-wide" /><div className="instruction-box mt-6"><p className="p-flush"><strong className="red-text">{t('2d.note')}</strong></p><p className="p-flush">{t('2d.weight.dimension_mm')}</p><p className="p-flush">{t('2d.weight.convert_to_meter')}</p><p className="p-flush">{t('2d.weight.specific_gravity_formula')}</p></div></div>
        </div>

        <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
          <div className="step-header"><span className="step-number">b</span><KaraokeLessonText as="span" className="step-label" text={t('2d.weight.cylinder_formula')} isActive={isSpeaking && currentIndex === 3} currentCharIndex={currentCharIndex} /></div>
          <div className="step-description"><img src={cylinderExImg} alt="Cylinder computation example" className="software-screenshot screenshot-wide" /><div className="instruction-box mt-6"><p className="p-flush"><strong className="red-text">{t('2d.note')}</strong></p><p className="p-flush">{t('2d.weight.dimension_mm')}</p><p className="p-flush">{t('2d.weight.radius_to_meter')}</p><p className="p-flush">{t('2d.weight.specific_gravity_formula')}</p></div></div>
        </div>

        <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
          <div className="step-header"><span className="step-number">c</span><KaraokeLessonText as="span" className="step-label" text={t('2d.weight.shape_steel_formula')} isActive={isSpeaking && currentIndex === 4} currentCharIndex={currentCharIndex} /></div>
          <div className="step-description"><img src={shapeSteelEx1Img} alt="Shape-steel computation example 1" className="software-screenshot screenshot-wide" /><img src={shapeSteelEx2Img} alt="Shape-steel computation example 2" className="software-screenshot screenshot-wide mt-4" /><div className="instruction-box mt-6"><p className="p-flush"><strong>{t('2d.notes')}</strong></p><p className="p-flush">{t('2d.weight.jis_area')}</p><p className="p-flush">{t('2d.weight.area_mm2')}</p><p className="p-flush">{t('2d.weight.cm2_to_mm2')}</p><p className="p-flush">{t('2d.weight.specific_gravity_formula')}</p></div></div>
        </div>

        <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
          <div className="step-header"><span className="step-number">d</span><KaraokeLessonText as="span" className="step-label" text={t('2d.weight.pipe_formula')} isActive={isSpeaking && currentIndex === 5} currentCharIndex={currentCharIndex} /></div>
          <div className="step-description"><img src={pipeExImg} alt="Square or rectangular pipe computation example" className="software-screenshot screenshot-wide" /></div>
        </div>
      </div></div>
      <div className="lesson-navigation"><button className="nav-button" onClick={onPrevLesson}><ChevronLeft size={18} /> {t('2d.previous')}</button><button className="nav-button next" onClick={onNextLesson}>{nextLabel || t('2d.next')} <ChevronRight size={18} /></button></div>
      </div></div></div>
  );
};

export default WeightComputationLesson;
