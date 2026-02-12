import React from 'react';

const VideoPlayer = ({ src }: { src: string }) => {
    return (
        <div className="video-player">
            <video controls src={src} width="100%" />
        </div>
    );
};

export default VideoPlayer;
