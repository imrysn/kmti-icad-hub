export const getAvatarColor = (name: string) => {
    // Curated palette of darker colors ensuring high contrast with white text
    const colors = [
        '#2563eb', // Blue 600
        '#059669', // Emerald 600
        '#d97706', // Amber 600
        '#dc2626', // Red 600
        '#7c3aed', // Violet 600
        '#db2777', // Pink 600
        '#0891b2', // Cyan 600
        '#0d9488', // Teal 600
        '#e11d48', // Rose 600
        '#4d7c0f'  // Lime 700
    ];
    let hash = 0;
    if (!name) return colors[0];
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};
