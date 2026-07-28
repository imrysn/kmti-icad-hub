
export default function Achievement({ title }: { title?: string, message?: string }) {
    return (
        <div className="achievement-badge" style={{ padding: '0.5rem', background: '#ffd700', borderRadius: '4px' }}>
            <span>🏆 {title || 'Achievement'}</span>
        </div>
    );
}

export const renderEquippedSkin = (name: string, _achievements?: any) => {
    return <span className="equipped-skin-badge">{name}</span>;
};
