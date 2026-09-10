import { useId } from 'react';

/** Vector cylinder symbols matching the five toolbar display treatments. */
export default function ShadingModeIcon({ mode }: { mode: number }) {
  const id=useId().replace(/:/g,'');
  const wire=mode===4;
  const transparent=mode===3;
  const greenLine=mode===0;
  const outline=mode===1?'none':transparent?'#398f93':'#568b4e';
  const fill=wire?'none':transparent?'#bdecea':greenLine?'#edf2ea':`url(#${id}-green)`;
  return <svg viewBox="0 0 80 80" className="foundation-view-cube" aria-hidden="true">
    <defs><linearGradient id={`${id}-green`} x1="0" y1="0" x2="1" y2="0">
      <stop stopColor="#82bd50" /><stop offset="0.3" stopColor="#a6d96c" /><stop offset="0.75" stopColor="#66a735" /><stop offset="1" stopColor="#4b8c2d" />
    </linearGradient></defs>
    <path d="M23 20V59C23 72 57 72 57 59V20Z" fill={fill} fillOpacity={transparent?0.45:1} stroke={outline} strokeWidth="1.8" />
    {(transparent||wire) && <ellipse cx="40" cy="59" rx="17" ry="9" fill="none" stroke={outline} strokeWidth="1.6" />}
    <ellipse cx="40" cy="20" rx="17" ry="9" fill={wire?'none':transparent?'#d5f2ef':greenLine?'#e5eddf':'#9bd765'} fillOpacity={transparent?0.6:1} stroke={outline} strokeWidth="1.8" />
  </svg>;
}
