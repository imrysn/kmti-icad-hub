export default function WorkPlaneCommandIconSvg({ title = 'Open Work Plane', expanded = false }: { title?: string; expanded?: boolean }) {
  return <svg width={expanded ? 72 : 56} height={expanded ? 72 : 56} viewBox="0 0 32 32" role="img" aria-label={title} style={{display:'block',margin:'auto'}}>
    <path d="M9 3 27 11V28L9 20Z" fill="#edf0f7" stroke="#9baed1" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M11 6 25 12V25L11 19Z" fill="#f9f9fc" stroke="#c7d1e4" strokeWidth=".7"/>
    <path d="M16 20V10M16 10 14 13M16 10 18 14" fill="none" stroke="#ef5356" strokeWidth="1.8"/>
    <path d="M16 20 24 23M24 23 21 20M24 23 21 24" fill="none" stroke="#617dbc" strokeWidth="1.6"/>
    <path d="M5 18 13 21 10 23 15 28 12 31 7 26 5 29Z" fill="#344778" stroke="#263860" strokeWidth=".7" strokeLinejoin="round"/>
  </svg>;
}
