import references from './informationReferencePaths.json';

/** Standalone vector paths traced from the supplied iCAD icon pixels; no raster image. */
export default function InformationReferenceIcon({index,title}:{index:number;title:string}) {
 const icon=references[index];
 return <svg className="foundation-single-command information-reference-icon" width="76" height="76" viewBox={icon.viewBox} preserveAspectRatio="xMidYMid meet" role="img" aria-label={title} data-command-reference={`information-${icon.name}`} shapeRendering="crispEdges">
  {icon.paths.map(([fill,d])=><path key={fill} fill={fill} d={d}/>)}
 </svg>;
}
