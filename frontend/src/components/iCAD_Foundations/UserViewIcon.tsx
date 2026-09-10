/** The same stepped solid seen from four sides, like the iCAD User View toolbar. */
export default function UserViewIcon({ view }: { view: number }) {
  type Point = [number, number, number];
  const cells: Point[] = [[0,0,0], [1,0,0], [1,0,1]];
  const rotate = ([x,y,z]: Point): Point => {
    for (let turn = 0; turn < view; turn++) [x,y] = [-y,x];
    return [x,y,z];
  };
  const project = ([x,y,z]: Point) => [40 + (x-y)*15, 46 + (x+y)*7-z*18];
  const directions: Point[] = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
  const faces = cells.flatMap(([x,y,z]) => directions.flatMap(([dx,dy,dz]) => {
    if (cells.some(([a,b,c]) => a===x+dx && b===y+dy && c===z+dz)) return [];
    const normal = rotate([dx,dy,dz]);
    if (normal[0]+normal[1]+normal[2] <= 0) return [];
    const points: Point[] = dx ? [[x+(dx>0?1:0),y,z],[x+(dx>0?1:0),y+1,z],[x+(dx>0?1:0),y+1,z+1],[x+(dx>0?1:0),y,z+1]]
      : dy ? [[x,y+(dy>0?1:0),z],[x+1,y+(dy>0?1:0),z],[x+1,y+(dy>0?1:0),z+1],[x,y+(dy>0?1:0),z+1]]
      : [[x,y,z+(dz>0?1:0)],[x+1,y,z+(dz>0?1:0)],[x+1,y+1,z+(dz>0?1:0)],[x,y+1,z+(dz>0?1:0)]];
    const rotated = points.map(p => rotate([p[0]-1,p[1]-0.5,p[2]]));
    return [{points:rotated.map(p=>project(p).join(',')).join(' '), depth:rotated.reduce((sum,p)=>sum+p[0]+p[1]+p[2],0),
      fill:normal[2]>0?'#a3c5ff':normal[0]>0?'#386ed0':'#6797ef'}];
  })).sort((a,b)=>a.depth-b.depth);
  return <svg viewBox="0 0 80 80" className="foundation-view-cube" aria-hidden="true">
    <g stroke="#365ea5" strokeWidth="1.4" strokeLinejoin="round">
      {faces.map((face,index)=><polygon key={index} points={face.points} fill={face.fill} />)}
    </g>
  </svg>;
}
