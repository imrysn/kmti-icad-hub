/** Vector versions of the iCAD Show/Hide palette buttons. */
export default function ShowHideIconSvg({index,title}: {index:number;title:string}) {
  const show=index===1 || index===3;
  const drafting=index===2 || index===3;
  const cube=(x:number,y:number,blue=false)=><g transform={`translate(${x} ${y})`} stroke={blue?'#426abe':'#a7aab0'} strokeWidth=".8" strokeLinejoin="round">
    <path d="M0 5 9 0 18 5 9 11Z" fill={blue?'#7ca9ff':'#f9fafb'}/>
    <path d="M0 5 9 11V22L0 16Z" fill={blue?'#4d80ef':'#eceff1'}/>
    <path d="M9 11 18 5V16L9 22Z" fill={blue?'#6295ff':'#fff'}/>
  </g>;
  return <svg viewBox="0 0 36 36" role="img" aria-label={title}>
    {drafting ? <g fill={show?'#34383b':'#b5b7bb'} stroke={show?'#34383b':'#b5b7bb'} strokeWidth="1">
      <path d="M4 9V24M25 9V24M2 15H28M4 15l4-3m-4 3 4 3m17-3-4-3m4 3-4 3" fill="none"/>
      <text x="10" y="12" fontSize="10" fontFamily="Arial,sans-serif" stroke="none">10</text>
    </g> : index===4 ? <><g transform="translate(11 3) scale(.65)">{cube(0,0,true)}</g><g transform="translate(4 17) scale(.65)">{cube(0,0)}</g></> : cube(5,4)}
    <rect x="18" y="21" width="13" height="11" rx="1" fill="#4f8751" stroke="#718671" strokeWidth=".5"/>
    {show ? <><path d="M19 26.5Q24.5 19.5 30 26.5Q24.5 33 19 26.5Z" fill="#fff"/><ellipse cx="24.5" cy="26.5" rx="2.3" ry="3.2" fill="#232a24"/></> : <path d="M19.5 24.5Q24.5 30.5 29.5 24.5M22 27l-1 2m4-1v2m3-3 1 2" fill="none" stroke="#fff" strokeWidth="1.2"/>}
  </svg>;
}
