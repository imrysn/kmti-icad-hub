import { useState, useCallback } from 'react'; import { ImagePayload } from '../../../../services/searchService';

export const useImagePaste = (showModal: (title: string, message: string, type: 'confirm' | 'danger' | 'info') => void) => {
    const [selectedImages, setSelectedImages] = useState<ImagePayload[]>([]);

    const handlePaste = useCallback((e: React.ClipboardEvent) => {
        const items = e.clipboardData.items;
        let imagesFound = 0;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.includes('image')) {
                imagesFound++;
                if (selectedImages.length + imagesFound > 3) {
                    showModal('Limit Reached', 'You can only attach up to 3 images per prompt.', 'info');
                    return;
                }

                const file = item.getAsFile();
                if (!file) continue;

                if (file.size > 4 * 1024 * 1024) {
                    showModal('File Too Large', 'Each pasted image must be smaller than 4MB', 'info');
                    continue;
                }

                const reader = new FileReader();
                reader.onload = (event) => {
                    const result = event.target?.result as string;
                    const parts = result.split(',');
                    const mime = parts[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
                    const data = parts[1];

                    setSelectedImages(prev => [...prev, { data, mime }]);
                };
                reader.readAsDataURL(file);
            }
        }
    }, [selectedImages.length, showModal]);

    const removeSelectedImage = useCallback((index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    }, []);

    return {
        selectedImages,
        setSelectedImages,
        handlePaste,
        removeSelectedImage
    };
};
