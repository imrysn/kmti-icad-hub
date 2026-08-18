import { ReactNode,RefObject } from 'react';

interface LessonHeaderBannerProps {
  title: string;
  lessonNumber: number;
  totalLessons: number;
  subtitle?: ReactNode;
  actions?: ReactNode;
  stickySentinelRef?: RefObject<HTMLDivElement>;
}

export function LessonHeaderBanner({
  title,
  lessonNumber,
  totalLessons,
  subtitle,
  actions,
  stickySentinelRef,
}: LessonHeaderBannerProps) {
  return (
    <header className="lesson-header-banner">
      <p className="lesson-indicator">
        Lesson {lessonNumber}{totalLessons > 0 ? ` of ${totalLessons}` : ''}
      </p>
      <h2 className="lesson-banner-title">{title}</h2>
      {subtitle && <div className="lesson-banner-subtitle">{subtitle}</div>}
      {stickySentinelRef && <div ref={stickySentinelRef} className="lesson-action-sentinel" />}
      {actions && <div className="lesson-action-cluster lesson-header-actions">{actions}</div>}
      <div className="lesson-banner-divider" />
    </header>
  );
}
