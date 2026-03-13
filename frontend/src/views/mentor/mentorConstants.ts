export type Lesson = {
  id: string;
  title: string;
  isCompleted?: boolean;
  children?: Lesson[];
};

export const ICAD_3D_LESSONS: Lesson[] = [ // cspell:disable-line
  { id: 'interface', title: 'iCAD Interface' }, // cspell:disable-line
  { id: 'toolbars', title: 'Tool Bars' },
  { id: 'origin', title: 'Origin' },
  {
    id: 'basic-op',
    title: 'Basic Operation',
    children: Array.from({ length: 4 }, (_, i) => ({ id: `basic-op-${i + 1}`, title: `Basic Operation (${i + 1})` }))
  },
  {
    id: '2d-3d',
    title: '2D > 3D',
    children: Array.from({ length: 3 }, (_, i) => ({ id: `2d-3d-${i + 1}`, title: `2D > 3D (${i + 1})` }))
  },
  { id: 'hole-details', title: 'Hole Details' },
  {
    id: 'boolean',
    title: 'Boolean',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `boolean-${i + 1}`, title: `Boolean (${i + 1})` }))
  },
  {
    id: 'component',
    title: 'Component',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `component-${i + 1}`, title: `Component (${i + 1})` }))
  },
  { id: 'fairing', title: 'Fairing' },
  {
    id: '3d-part',
    title: '3D Part',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `3d-part-${i + 1}`, title: `3D Part (${i + 1})` }))
  },
  {
    id: 'material',
    title: 'Material Setting',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `material-${i + 1}`, title: `Material Setting (${i + 1})` }))
  },
  {
    id: 'properties',
    title: 'Properties',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `properties-${i + 1}`, title: `Properties (${i + 1})` }))
  },
  {
    id: 'annotation',
    title: 'Annotation',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `annotation-${i + 1}`, title: `Annotation (${i + 1})` }))
  },
  { id: 'interference', title: 'Interference Check' },
  {
    id: 'purchase-parts',
    title: '3D Purchase Parts',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `purchase-parts-${i + 1}`, title: `3D Purchase Parts (${i + 1})` }))
  },
  {
    id: 'parasolid', // cspell:disable-line
    title: 'Loading Parasolid', // cspell:disable-line
    children: Array.from({ length: 2 }, (_, i) => ({ id: `parasolid-${i + 1}`, title: `Loading Parasolid (${i + 1})` })) // cspell:disable-line
  },
  {
    id: 'op-sample',
    title: 'Operation Sample',
    children: Array.from({ length: 5 }, (_, i) => ({ id: `op-sample-${i + 1}`, title: `Operation Sample (${i + 1})` }))
  },
  {
    id: 'mirrored',
    title: 'Mirrored Part',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `mirrored-${i + 1}`, title: `Mirrored Part (${i + 1})` }))
  },
  {
    id: 'standard',
    title: 'Standard',
    children: Array.from({ length: 8 }, (_, i) => ({ id: `standard-${i + 1}`, title: `Standard (${i + 1})` }))
  }
];

export const ICAD_2D_LESSONS: Lesson[] = [
  { id: '2d-orthographic', title: 'Create Orthographic View', children: Array.from({ length: 3 }, (_, i) => ({ id: `2d-orthographic-${i + 1}`, title: `Create Orthographic View (${i + 1})` })) },
  { id: '2d-command-menu', title: 'Command Menu', children: Array.from({ length: 2 }, (_, i) => ({ id: `2d-command-menu-${i + 1}`, title: `Command Menu (${i + 1})` })) },
  { id: '2d-line-props', title: 'Line Properties', children: Array.from({ length: 4 }, (_, i) => ({ id: `2d-line-props-${i + 1}`, title: `Line Properties (${i + 1})` })) },
  { id: '2d-dimensioning', title: 'Dimensioning', children: Array.from({ length: 5 }, (_, i) => ({ id: `2d-dimensioning-${i + 1}`, title: `Dimensioning (${i + 1})` })) },
  { id: '2d-standard-part', title: 'Standard Part Detail', children: Array.from({ length: 7 }, (_, i) => ({ id: `2d-standard-part-${i + 1}`, title: `Standard Part Detail (${i + 1})` })) },
  { id: '2d-surface-app', title: 'Application of Surface', children: Array.from({ length: 2 }, (_, i) => ({ id: `2d-surface-app-${i + 1}`, title: `Application of Surface (${i + 1})` })) },
  { id: '2d-keyway', title: 'Keyway' },
  { id: '2d-retaining-ring', title: 'Retaining Ring', children: Array.from({ length: 2 }, (_, i) => ({ id: `2d-retaining-ring-${i + 1}`, title: `Retaining Ring (${i + 1})` })) },
  { id: '2d-geometric-tol', title: 'Geometric Tolerance', children: Array.from({ length: 2 }, (_, i) => ({ id: `2d-geometric-tol-${i + 1}`, title: `Geometric Tolerance (${i + 1})` })) },
  { id: '2d-part-note', title: 'Part Note' },
  { id: '2d-machining-symbol', title: 'Machining Symbol' },
  { id: '2d-welding-symbol', title: 'Welding Symbol' },
  { id: '2d-heat-treatment', title: 'Heat Treatment', children: Array.from({ length: 4 }, (_, i) => ({ id: `2d-heat-treatment-${i + 1}`, title: `Heat Treatment (${i + 1})` })) },
  { id: '2d-surface-coating', title: 'Surface Coating' },
  { id: '2d-weight-computation', title: 'Material Weight Computation' },
  { id: '2d-bom', title: 'Bill of Material', children: Array.from({ length: 4 }, (_, i) => ({ id: `2d-bom-${i + 1}`, title: `Bill of Material (${i + 1})` })) },
  { id: '2d-balloon', title: 'Balloon' },
  { id: '2d-titleblock', title: 'Titleblock' },
  { id: '2d-additional-view', title: 'Additional View', children: Array.from({ length: 4 }, (_, i) => ({ id: `2d-additional-view-${i + 1}`, title: `Additional View (${i + 1})` })) },
  { id: '2d-operal-view', title: 'Operal View', children: Array.from({ length: 2 }, (_, i) => ({ id: `2d-operal-view-${i + 1}`, title: `Operal View (${i + 1})` })) },
  { id: '2d-normal-mirror', title: 'Normal and Mirror Parts', children: Array.from({ length: 2 }, (_, i) => ({ id: `2d-normal-mirror-${i + 1}`, title: `Normal and Mirror Parts (${i + 1})` })) },
  { id: '2d-revision-code', title: 'Revision Code' },
  { id: '2d-standard-library', title: 'Standard Part Library' }
];
