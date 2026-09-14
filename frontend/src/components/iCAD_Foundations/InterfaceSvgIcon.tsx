import ScreenLayoutReferenceSvg from './ScreenLayoutReferenceSvg';
import ToolbarReferenceSvg from './ToolbarReferenceSvg';

/** Native SVG redraws based on the supplied iCAD SX interface references. */
export default function InterfaceSvgIcon({ index, toolbar, title, expanded=false }: { index: number; toolbar: boolean; title: string; expanded?: boolean }) {
  return toolbar ? <ToolbarReferenceSvg index={index} title={title} /> : <ScreenLayoutReferenceSvg index={index} title={title} expanded={expanded} />;
}
