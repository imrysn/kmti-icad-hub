import React from 'react';
import { MediaAsset } from '../../../types';

interface MediaModalProps {
    selectedMedia: MediaAsset;
    setSelectedMedia: (media: MediaAsset | null) => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({ selectedMedia, setSelectedMedia }) => {
    return (
        <div className="media-modal" onClick={() => setSelectedMedia(null)}>
            <div className="media-modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>{selectedMedia.description}</h3>
                {selectedMedia.media_type === 'video' ? (
                    <video
                        controls
                        autoPlay
                        src={`${selectedMedia.media_url}#t=${selectedMedia.timestamp_start || 0}`}
                    >
                        Your browser does not support video.
                    </video>
                ) : (
                    <img src={selectedMedia.media_url} alt={selectedMedia.description} />
                )}
                <button onClick={() => setSelectedMedia(null)}>Close</button>
            </div>
        </div>
    );
};
