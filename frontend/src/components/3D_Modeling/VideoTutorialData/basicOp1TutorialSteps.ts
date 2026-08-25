import vidBox from '../../../assets/3D_Video_Tutorial/basicOp_box.mp4';
import vidCone from '../../../assets/3D_Video_Tutorial/basicOp_cone.mp4';
import vidCylinder from '../../../assets/3D_Video_Tutorial/basicOp_cylinder.mp4';
import vidPolygon from '../../../assets/3D_Video_Tutorial/basicOp_polygon.mp4';
import vidTorus from '../../../assets/3D_Video_Tutorial/basicOp_torus.mp4';
import { TutorialStep } from '../VideoTutorialViewer';

export const cylinderTutorialSteps: TutorialStep[] = [
  {
    id: "cyl-0",
    title: "Arrange Cylinder",
    text: "",
    customText: "To create a cylinder, follow these steps.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    videoStart: 0,
    videoEnd: 2
  },
  {
    id: "cyl-1",
    title: "Arrange Cylinder",
    text: "",
    customText: "First, click Shape Placement. Next, click Place Cylinder. Next, select Front View.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    videoStart: 2,
    videoEnd: 9,
    overlays: [
      { id: "shape-placement", type: "highlight", startTime: 2, endTime: 3.5, target: { x: 0.908, y: 0.123, width: 0.07, height: 0.026 }, animation: "pulse", label: "Shape Placement" },
      { id: "place-cylinder", type: "highlight", startTime: 3.3, endTime: 5.3, target: { x: 0.908, y: 0.145, width: 0.022, height: 0.032 }, animation: "pulse", label: "Place Cylinder", labelPosition: "bottom" },
      { id: "front-view", type: "highlight", startTime: 7.5, endTime: 9.5, target: { x: 0.438, y: 0.037, width: 0.016, height: 0.03 }, animation: "pulse", label: "Front View", labelPosition: "bottom" }
    ]
  },
  {
    id: "cyl-2",
    title: "Arrange Cylinder",
    text: "",
    customText: "In the Command Menu, confirm that Cylinder, Placement, and Diameter Specification are active. Then select Y Orientation.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    videoStart: 9,
    videoEnd: 12,
    overlays: [
      { id: "opt-cylinder", type: "highlight", startTime: 9, endTime: 10.5, target: { x: 0.0, y: 0.655, width: 0.036, height: 0.023 }, label: "Cylinder", labelPosition: "right" },
      { id: "opt-placement", type: "highlight", startTime: 9, endTime: 10.5, target: { x: 0.0, y: 0.813, width: 0.036, height: 0.023 }, label: "Placement", labelPosition: "right" },
      { id: "opt-dia", type: "highlight", startTime: 9, endTime: 10.5, target: { x: 0.0, y: 0.87, width: 0.036, height: 0.023 }, label: "Diameter Specification", labelPosition: "right" },
      { id: "opt-y-orient", type: "highlight", startTime: 10.5, endTime: 12, target: { x: 0.017, y: 0.846, width: 0.019, height: 0.023 }, animation: "pulse", label: "Y Orientation", labelPosition: "right" }
    ]
  },
  {
    id: "cyl-3",
    title: "Arrange Cylinder",
    text: "",
    customText: "Next, use the Item Entry area at the bottom-left of the window. Enter the required diameter, then press Enter. Next, enter the required height, then press Enter.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    videoStart: 12,
    videoEnd: 15.5,
    overlays: [
      { id: "input-dia", type: "highlight", startTime: 12.5, endTime: 14, target: { x: 0.092, y: 0.948, width: 0.051, height: 0.028 }, animation: "pulse", label: "Diameter" },
      { id: "input-height", type: "highlight", startTime: 14, endTime: 15.5, target: { x: 0.167, y: 0.948, width: 0.053, height: 0.028 }, animation: "pulse", label: "Height" }
    ]
  },
  {
    id: "cyl-4",
    title: "Arrange Cylinder",
    text: "",
    customText: "Finally, enter the coordinates for the cylinder's position. Enter zero, zero, zero to place the cylinder at the origin.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    videoStart: 15.5,
    videoEnd: 20,
    overlays: [
      { id: "input-coords", type: "highlight", startTime: 16, endTime: 18, target: { x: 0.6, y: 0.949, width: 0.4, height: 0.0324 }, animation: "pulse", label: "Coordinates" }
    ]
  },
  {
    id: "cyl-5",
    title: "Arrange Cylinder",
    text: "",
    customText: "The diameter, or 直径, is the distance across the circular face of the cylinder. The height, or 高さ, is the vertical distance from the bottom of the cylinder to the top.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "88%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    videoStart: 20,
    videoEnd: 24,
    overlays: [
      {
        id: "dim-dia",
        type: "dimensionAnnotation",
        startTime: 20,
        endTime: 24,
        label: "Diameter (直径)",
        labelOffset: { x: 0, y: -5 },
        dimensionType: "horizontal",
        line: { start: { x: 0.448, y: 0.29 }, end: { x: 0.64, y: 0.29 } }
      },
      {
        id: "dim-height",
        type: "dimensionAnnotation",
        startTime: 22,
        endTime: 24,
        label: "Height (高さ)",
        labelOffset: { x: 55, y: 0 },
        dimensionType: "vertical",
        line: { start: { x: 0.64, y: 0.32 }, end: { x: 0.64, y: 0.75 } }
      }
    ]
  }
];

export const boxTutorialSteps: TutorialStep[] = [
  {
    id: "box-0",
    title: "Arrange Box",
    text: "To create a box, follow these steps.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    videoStart: 0,
    videoEnd: 2
  },
  {
    id: "box-1",
    title: "Arrange Box",
    text: "Select the Box tool from the Icon Menu.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    videoStart: 2,
    videoEnd: 7
  },
  {
    id: "box-2",
    title: "Arrange Box",
    text: "Enter the Box specifications: define the Depth, Width, and Height parameters in the bottom-left Item Entry bar.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    videoStart: 7,
    videoEnd: 11
  },
  {
    id: "box-3",
    title: "Arrange Box",
    text: "Input the placement coordinates in the Key Entry Area and position the Box at the origin.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    videoStart: 11,
    videoEnd: 15
  },
  {
    id: "box-4",
    title: "Arrange Box",
    text: "Confirming the coordinates renders the completed Box on the workspace.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    videoStart: 15,
    videoEnd: 24
  }
];

export const polygonTutorialSteps: TutorialStep[] = [
  {
    id: "poly-0",
    title: "Arrange Polygonal Prism",
    text: "To create a polygon, follow these steps.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidPolygon,
    videoStart: 0,
    videoEnd: 2
  },
  {
    id: "poly-1",
    title: "Arrange Polygonal Prism",
    text: "Select the Polygon tool from the Icon Menu.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidPolygon,
    videoStart: 2,
    videoEnd: 7
  },
  {
    id: "poly-2",
    title: "Arrange Polygonal Prism",
    text: "Specify the Polygon specifications: input the Number of Sides, the circumscribed Path Diameter, and the Height in the Item Entry bar.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidPolygon,
    videoStart: 7,
    videoEnd: 11
  },
  {
    id: "poly-3",
    title: "Arrange Polygonal Prism",
    text: "Type the origin placement coordinates in the Key Entry Area to place the Polygon in your workspace.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidPolygon,
    videoStart: 11,
    videoEnd: 15
  },
  {
    id: "poly-4",
    title: "Arrange Polygonal Prism",
    text: "Confirming the coordinates renders the completed Polygon on the workspace.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidPolygon,
    videoStart: 15,
    videoEnd: 20
  }
];

export const coneTutorialSteps: TutorialStep[] = [
  {
    id: "cone-0",
    title: "Arrange Cone",
    text: "To create a cone, follow these steps.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCone,
    videoStart: 0,
    videoEnd: 2
  },
  {
    id: "cone-1",
    title: "Arrange Cone",
    text: "Select the Cone tool from the Icon Menu.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCone,
    videoStart: 2,
    videoEnd: 7
  },
  {
    id: "cone-2",
    title: "Arrange Cone",
    text: "In the Item Entry bar, specify the Cone parameters: Number of Sides, Base Diameter, Top Face Diameter, and Height.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCone,
    videoStart: 7,
    videoEnd: 11
  },
  {
    id: "cone-3",
    title: "Arrange Cone",
    text: "Navigate to the Key Entry Area, type the target coordinates, and locate the Cone on the workplane.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCone,
    videoStart: 11,
    videoEnd: 15
  },
  {
    id: "cone-4",
    title: "Arrange Cone",
    text: "Confirming the coordinates renders the completed Cone on the workspace.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCone,
    videoStart: 15,
    videoEnd: 20
  }
];

export const torusTutorialSteps: TutorialStep[] = [
  {
    id: "torus-0",
    title: "Arrange Torus",
    text: "To create a torus, follow these steps.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidTorus,
    videoStart: 0,
    videoEnd: 2
  },
  {
    id: "torus-1",
    title: "Arrange Torus",
    text: "Select the Torus tool from the Icon Menu.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidTorus,
    videoStart: 2,
    videoEnd: 7
  },
  {
    id: "torus-2",
    title: "Arrange Torus",
    text: "In the bottom-left Item Entry bar, define the Section Diameter, Path Radius, and Turn Angle for the Torus.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidTorus,
    videoStart: 7,
    videoEnd: 11
  },
  {
    id: "torus-3",
    title: "Arrange Torus",
    text: "Go to the Key Entry Area, specify the positioning coordinates, and place the Torus on your workspace.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidTorus,
    videoStart: 11,
    videoEnd: 15
  },
  {
    id: "torus-4",
    title: "Arrange Torus",
    text: "Confirming the coordinates renders the completed Torus on the workspace.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidTorus,
    videoStart: 15,
    videoEnd: 22
  }
];
