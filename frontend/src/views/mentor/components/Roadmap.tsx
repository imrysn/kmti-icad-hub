import { Award,CheckCircle2,Star,Target,TrendingUp } from 'lucide-react';
import React,{ useMemo } from 'react';
import { Modal } from '../../../components/Modal';
import { useTranslation } from '../../../context/LanguageContext';
import './Roadmap.css';

interface SkillNode {
    name: string;
    score: number;
    lessons: string[];
}

interface RoadmapProps {
    completedLessons: string[];
    averageScore: number;
    onClose: () => void;
}

export const Roadmap: React.FC<RoadmapProps> = ({ completedLessons, averageScore, onClose }) => {
    const { t } = useTranslation();
    // Skill Categories Mapping
    const categories: SkillNode[] = useMemo(() => [
        {
            name: 'Interface & Workflow',
            score: 0,
            lessons: ['interface', 'toolbars', 'origin']
        },
        {
            name: 'Basic Modeling',
            score: 0,
            lessons: ['basic-op']
        },
        {
            name: 'Advanced Operations',
            score: 0,
            lessons: ['2d-3d', 'boolean', 'component', 'fairing']
        },
        {
            name: 'Standards & Metadata',
            score: 0,
            lessons: ['3d-part', 'material', 'properties', 'purchase-parts', 'parasolid', 'standard']
        },
        {
            name: '2D Drafting',
            score: 0,
            lessons: ['2d-orthographic', '2d-command-menu', '2d-line-props', '2d-dimensioning']
        }
    ], []);

    // Calculate mastery per category
    const skillData = useMemo(() => {
        return categories.map(cat => {
            const completedInCat = cat.lessons.filter(lId => completedLessons.includes(lId)).length;
            const totalInCat = cat.lessons.length;
            const mastery = totalInCat > 0 ? (completedInCat / totalInCat) * 100 : 0;
            return { ...cat, score: mastery };
        });
    }, [completedLessons, categories]);

    const totalProgress = (completedLessons.length / 20) * 100; // Estimated total lessons

    // Simple SVG Radar Chart Logic
    const generateRadarPoints = (data: typeof skillData) => {
        const center = 100;
        const radius = 80;
        const angleStep = (Math.PI * 2) / data.length;

        return data.map((d, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const r = (d.score / 100) * radius;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return `${x},${y}`;
        }).join(' ');
    };

    const radarPoints = generateRadarPoints(skillData);

    return (
        <Modal
            isOpen={true}
            onClose={onClose}
            title={t('roadmap.title')}
            tag="ROADMAP"
            size="xl"
        >
            <div className="global-modal-body">
                <div className="roadmap-grid">
                    {/* Left: Skill Radar */}
                    <div className="roadmap-section skill-analysis">
                        <div className="section-title">
                            <Target size={18} />
                            <span>{t('roadmap.skill_radar')}</span>
                        </div>

                        <div className="radar-container">
                            <svg viewBox="0 0 200 200" className="radar-svg">
                                {/* Background Grid */}
                                {[0.25, 0.5, 0.75, 1].map(scale => (
                                    <polygon
                                        key={scale}
                                        points={skillData.map((_, i) => {
                                            const angle = i * ((Math.PI * 2) / skillData.length) - Math.PI / 2;
                                            const r = 80 * scale;
                                            return `${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`;
                                        }).join(' ')}
                                        className="radar-grid"
                                    />
                                ))}

                                {/* Labels */}
                                {skillData.map((d, i) => {
                                    const angle = i * ((Math.PI * 2) / skillData.length) - Math.PI / 2;
                                    const r = 95;
                                    const x = 100 + r * Math.cos(angle);
                                    const y = 100 + r * Math.sin(angle);
                                    return (
                                        <text
                                            key={i}
                                            x={x}
                                            y={y}
                                            textAnchor="middle"
                                            className="radar-label"
                                        >
                                            {d.name.split(' ')[0]}
                                        </text>
                                    );
                                })}

                                {/* Data Polygon */}
                                <polygon points={radarPoints} className="radar-area" />
                                {radarPoints.split(' ').map((p, i) => {
                                    const [x, y] = p.split(',');
                                    return <circle key={i} cx={x} cy={y} r="3" className="radar-point" />;
                                })}
                            </svg>
                        </div>

                        <div className="skill-legend">
                            {skillData.map((s, i) => (
                                <div key={i} className="skill-item">
                                    <span className="name">{s.name}</span>
                                    <div className="progress-bar-sm">
                                        <div className="fill" style={{ width: `${s.score}%` }}></div>
                                    </div>
                                    <span className="percent">{Math.round(s.score)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Milestones & Badges */}
                    <div className="roadmap-section milestones">
                        <div className="section-title">
                            <Award size={18} />
                            <span>{t('roadmap.milestones')}</span>
                        </div>

                        <div className="milestones-list">
                            <div className={`milestone-card ${totalProgress >= 25 ? 'unlocked' : 'locked'}`}>
                                <div className="badge"><Award /></div>
                                <div className="m-info">
                                    <h4>{t('roadmap.novice_title')}</h4>
                                    <p>{t('roadmap.novice_desc')}</p>
                                </div>
                                {totalProgress >= 25 && <CheckCircle2 className="check" />}
                            </div>

                            <div className={`milestone-card ${averageScore >= 80 ? 'unlocked' : 'locked'}`}>
                                <div className="badge"><Star /></div>
                                <div className="m-info">
                                    <h4>{t('roadmap.specialist_title')}</h4>
                                    <p>{t('roadmap.specialist_desc')}</p>
                                </div>
                                {averageScore >= 80 && <CheckCircle2 className="check" />}
                            </div>

                            <div className={`milestone-card ${totalProgress >= 100 ? 'unlocked' : 'locked'}`}>
                                <div className="badge"><TrendingUp /></div>
                                <div className="m-info">
                                    <h4>{t('roadmap.pro_title')}</h4>
                                    <p>{t('roadmap.pro_desc')}</p>
                                </div>
                                {totalProgress >= 100 && <CheckCircle2 className="check" />}
                            </div>
                        </div>

                        <div className="certification-status">
                            <h3>{t('roadmap.cert_title')}</h3>
                            <div className="readiness-meter">
                                <div className="meter-fill" style={{ width: `${Math.min(averageScore, totalProgress)}%` }}></div>
                            </div>
                            <p>
                                {totalProgress >= 100 && averageScore >= 80
                                    ? t('roadmap.cert_eligible')
                                    : t('roadmap.cert_continue')}
                            </p>
                            <button
                                className="cert-btn"
                                disabled={totalProgress < 100 || averageScore < 80}
                            >
                                {t('roadmap.gen_cert')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
