import box from '../../assets/icad-foundations/modeling/professional/box.png';
import cylinder from '../../assets/icad-foundations/modeling/professional/cylinder.png';
import polygon from '../../assets/icad-foundations/modeling/professional/polygon.jpg';
import cone from '../../assets/icad-foundations/modeling/professional/cone.png';
import torus from '../../assets/icad-foundations/modeling/professional/torus.png';
import type { PlacementShape } from './FoundationShapePlacementIcon';

type Region = [number, number, number, number];
export interface ShapeScreen {
  src: string;
  front: Region;
  orientation: Region;
  placement: Region;
  itemEntry: Region;
  keyEntry: Region;
}

/** iCAD Professional P7 full-screen screenshots, each showing the finished shape and its Item Entry values. */
// Box, Cylinder, Cone and Torus regions are centred on the decoded screenshot pixels with a margin wide enough that the
// 3 px highlight border (drawn inside the box) clears the icon. Polygon still uses its earlier capture.
export const PROFESSIONAL_SHAPE_SCREENS: Record<PlacementShape, ShapeScreen> = {
  box: { src: box, front: [826, 36, 48, 43], orientation: [26, 948, 48, 36], placement: [1776, 158, 44, 45], itemEntry: [124, 1011, 462, 52], keyEntry: [1736, 1011, 184, 52] },
  cylinder: { src: cylinder, front: [826, 36, 48, 43], orientation: [26, 930, 48, 36], placement: [1744, 158, 44, 45], itemEntry: [124, 1011, 315, 52], keyEntry: [1736, 1011, 184, 52] },
  polygon: { src: polygon, front: [844, 46, 23, 26], orientation: [35, 943, 30, 18], placement: [1816, 163, 29, 33], itemEntry: [137, 1027, 398, 23], keyEntry: [1753, 1027, 161, 23] },
  // Cone (円錐台) is row 2, column 1 of the expanded Shape Placement palette.
  cone: { src: cone, front: [826, 36, 48, 43], orientation: [26, 947, 48, 36], placement: [1744, 191, 44, 45], itemEntry: [124, 1010, 518, 52], keyEntry: [1736, 1010, 184, 52] },
  // Torus is row 2, column 2, beside Cone.
  torus: { src: torus, front: [826, 36, 48, 43], orientation: [26, 948, 48, 36], placement: [1776, 191, 44, 45], itemEntry: [124, 1011, 532, 52], keyEntry: [1736, 1011, 184, 52] },
};
