import React from 'react';
import { Play } from 'lucide-react';

interface PremiumVideoPlayerProps {
  src: string;
  style?: React.CSSProperties;
  className?: string;
}

const PremiumVideoPlayer: React.FC<PremiumVideoPlayerProps> = ({ src, style, className }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(err => console.log("Video play failed:", err));
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className={`premium-video-wrapper ${className || ''}`}
      style={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.015)';
        e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.4)';
      }}
    >
      <video
        ref={videoRef}
        src={src}
        controls
        loop
        muted
        style={{ width: '100%', height: '100%', display: 'block' }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {!isPlaying && (
        <div
          onClick={handlePlayToggle}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.3s ease',
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          <div
            className="play-btn-pulse"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(168, 85, 247, 0.25)',
              border: '2px solid #a855f7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)',
              animation: 'playPulse 2s infinite',
              transition: 'transform 0.2s ease, background-color 0.2s ease',
            }}
          >
            <Play size={36} fill="#ffffff" color="#ffffff" style={{ marginLeft: '4px' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumVideoPlayer;
export type { PremiumVideoPlayerProps };
