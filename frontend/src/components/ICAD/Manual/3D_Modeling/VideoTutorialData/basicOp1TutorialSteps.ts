import { TutorialStep } from '../VideoTutorialViewer';
import vidCylinder from '../../../../../assets/3D_Video_Tutorial/basicOp_cylinder.mp4';
import vidBox from '../../../../../assets/3D_Video_Tutorial/basicOp_box.mp4';
import vidPolygon from '../../../../../assets/3D_Video_Tutorial/basicOp_polygon.mp4';
import vidCone from '../../../../../assets/3D_Video_Tutorial/basicOp_cone.mp4';
import vidTorus from '../../../../../assets/3D_Video_Tutorial/basicOp_torus.mp4';

export const cylinderTutorialSteps: TutorialStep[] = [
  {
    id: "cyl-0",
    title: "Arrange Cylinder",
    text: "To create a cylinder, follow these steps.",
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
    text: "Select the Cylinder tool from the Icon Menu.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    videoStart: 2,
    videoEnd: 7
  },
  {
    id: "cyl-2",
    title: "Arrange Cylinder",
    text: "Navigate to the Item Entry area on the bottom-left. Specify the Cylinder's diameter and height, then confirm your parameters.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    videoStart: 7,
    videoEnd: 10.2
  },
  {
    id: "cyl-3",
    title: "Arrange Cylinder",
    text: "Move to the Key Entry Area, input the placement coordinates for the origin point, and place the Cylinder on the workplane.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    videoStart: 10.2,
    videoEnd: 15
  },
  {
    id: "cyl-4",
    title: "Arrange Cylinder",
    text: "Confirming the coordinates renders the completed Cylinder on the workspace.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    videoStart: 15,
    videoEnd: 20
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
