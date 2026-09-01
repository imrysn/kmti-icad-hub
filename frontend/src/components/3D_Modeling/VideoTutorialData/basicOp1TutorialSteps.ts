import vidBox from '../../../assets/3D_Video_Tutorial/basicOp_box.mp4';
import vidCone from '../../../assets/3D_Video_Tutorial/basicOp_cone.mp4';
import vidCylinder from '../../../assets/3D_Video_Tutorial/basicOp_cylinder.mp4';
import vidPolygon from '../../../assets/3D_Video_Tutorial/basicOp_polygon.mp4';
import vidTorus from '../../../assets/3D_Video_Tutorial/basicOp_torus.mp4';
import { TutorialStep } from '../VideoTutorialViewer';

/**
 * Create Cylinder overlay geometry uses normalized video coordinates.
 * Adjust x/y to move the highlight and width/height to resize it.
 */
export const cylinderOverlayLayout = {
  itemEntryArea: {
    x: 0.07,
    y: 0.945,
    width: 0.155,
    height: 0.032,
  },
};

/** Create Box overlay geometry, isolated from the other basic-shape lessons. */
export const boxOverlayLayout = {
  itemEntryArea: { x: 0.07, y: 0.945, width: 0.23, height: 0.032 },
};

/** Create Polygon overlay geometry, isolated from the other basic-shape lessons. */
export const polygonOverlayLayout = {
  itemEntryArea: { x: 0.07, y: 0.945, width: 0.23, height: 0.032 },
};

/** Create Cone overlay geometry, isolated from the other basic-shape lessons. */
export const coneOverlayLayout = {
  itemEntryArea: { x: 0.07, y: 0.945, width: 0.31, height: 0.032 },
};

export const cylinderTutorialSteps: TutorialStep[] = [
  {
    id: "cyl-1-tool-selection",
    title: "Select the Cylinder Tool",
    text: "",
    customText: "A cylinder is a three-dimensional solid with two parallel circular faces joined by a curved surface. In CAD, cylinders are commonly used as starting geometry for shafts, pins, rollers, bosses, and cylindrical holes. Use a cylinder whenever a component or feature has a consistent circular profile along its height. To begin, open Shape Placement, then select Place Cylinder.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 0,
    videoEnd: 3.25,
    overlays: [
      { id: "shape-placement", type: "highlight", startTime: 0.75, endTime: 1.67, target: { x: 0.908, y: 0.123, width: 0.07, height: 0.026 }, animation: "pulse", label: "Shape Placement" },
      { id: "place-cylinder", type: "highlight", startTime: 1.67, endTime: 3.25, target: { x: 0.908, y: 0.145, width: 0.022, height: 0.032 }, animation: "pulse", label: "Place Cylinder", labelPosition: "bottom" }
    ]
  },
  {
    id: "cyl-2-front-view",
    title: "Set the Front View",
    text: "",
    customText: "Select Front View from the 3D View toolbar.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 3.25,
    videoEnd: 8.25,
    overlays: [
      { id: "front-view", type: "highlight", startTime: 4.75, endTime: 8.25, target: { x: 0.438, y: 0.037, width: 0.016, height: 0.03 }, animation: "pulse", label: "Front View", labelPosition: "bottom" }
    ]
  },
  {
    id: "cyl-3-command-options",
    title: "Confirm the Cylinder Settings",
    text: "",
    customText: "In the Command Menu, confirm Cylinder, Placement, and Diameter Specification, then select Y Orientation.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 8.25,
    videoEnd: 13.75,
    overlays: [
      { id: "opt-cylinder", type: "highlight", startTime: 8.25, endTime: 9.35, target: { x: 0.0, y: 0.655, width: 0.036, height: 0.023 }, animation: "pulse", label: "Cylinder", labelPosition: "right" },
      { id: "opt-placement", type: "highlight", startTime: 9.35, endTime: 10.45, target: { x: 0.0, y: 0.813, width: 0.036, height: 0.023 }, animation: "pulse", label: "Placement", labelPosition: "right" },
      { id: "opt-dia", type: "highlight", startTime: 10.45, endTime: 11.75, target: { x: 0.0, y: 0.87, width: 0.036, height: 0.023 }, animation: "pulse", label: "Diameter Specification", labelPosition: "right" },
      { id: "opt-y-orient", type: "highlight", startTime: 11.75, endTime: 13.75, target: { x: 0.017, y: 0.846, width: 0.019, height: 0.023 }, animation: "pulse", label: "Y Orientation", labelPosition: "right" }
    ]
  },
  {
    id: "cyl-4-dimensions",
    title: "Enter the Cylinder Dimensions",
    text: "",
    customText: "In the Item Entry area, enter the cylinder diameter and height.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 13.75,
    videoEnd: 20.83,
    overlays: [
      { id: "item-entry", type: "highlight", startTime: 13.75, endTime: 14.75, target: { ...cylinderOverlayLayout.itemEntryArea }, animation: "pulse", label: "Item Entry Area" },
      { id: "input-dia", type: "highlight", startTime: 14.75, endTime: 17.25, target: { x: 0.092, y: 0.948, width: 0.051, height: 0.028 }, animation: "pulse", label: "Diameter (直径)" },
      { id: "input-height", type: "highlight", startTime: 17.25, endTime: 20.83, target: { x: 0.167, y: 0.948, width: 0.053, height: 0.028 }, animation: "pulse", label: "Height (高さ)" },
      {
        id: "quiz-cyl-1",
        type: "quiz",
        startTime: 20.33,
        endTime: 20.83,
        quizData: {
          question: "Which properties must be specified when creating a cylinder?",
          options: [
            { text: "Diameter and Height", isCorrect: true, feedback: "Correct! A cylinder requires diameter and height." },
            { text: "Width, Depth, and Height", isCorrect: false, feedback: "Those are for a box, not a cylinder." }
          ]
        }
      }
    ]
  },
  {
    id: "cyl-5-origin",
    title: "Position the Cylinder",
    text: "",
    customText: "After the knowledge check, enter the coordinates for the cylinder position. Enter zero, zero, zero to place the cylinder at the model origin.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 20.83,
    videoEnd: 23.40,
    overlays: [
      { id: "input-coords", type: "highlight", startTime: 20.83, endTime: 23.3, target: { x: 0.6, y: 0.949, width: 0.4, height: 0.0324 }, animation: "pulse", label: "Origin Coordinates\n0 0 0" },
      {
        id: "quiz-cyl-2",
        type: "quiz",
        startTime: 22.9,
        endTime: 23.4,
        quizData: {
          question: "What does the coordinate set zero, zero, zero represent?",
          options: [
            { text: "The Global Origin", isCorrect: true, feedback: "Correct! Zero, zero, zero represents the global origin." },
            { text: "The Center of the Cylinder", isCorrect: false, feedback: "Zero, zero, zero represents the global origin." }
          ]
        }
      }
    ]
  },
  {
    id: "cyl-6-result",
    title: "Review the Result",
    text: "",
    customText: "The cylinder is now created using the specified diameter, height, and origin position.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 23.40,
    videoEnd: 27.0,
    overlays: [
      { id: "result-callout", type: "callout", startTime: 24.0, endTime: 27.0, target: { x: 0.5, y: 0.5, width: 0, height: 0 }, label: "Cylinder Created ✓" }
    ]
  },
  {
    id: "cyl-7-explain",
    title: "Review the Cylinder Dimensions",
    text: "",
    customText: "Diameter, or 直径, is the distance across the circular face of the cylinder. Height, or 高さ, is the vertical distance from the bottom of the cylinder to the top.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCylinder,
    waitForNarrationBeforeVideo: true,
    advanceOnSourceVideoEnd: true,
    narrateTitle: false,
    videoStart: 27.0,
    videoEnd: 32.08,
    overlays: [
      {
        id: "dim-dia",
        type: "dimensionAnnotation",
        startTime: 27.5,
        endTime: 32.08,
        label: "Diameter (直径)",
        labelOffset: { x: 0, y: -5 },
        dimensionType: "horizontal",
        line: { start: { x: 0.47, y: 0.30 }, end: { x: 0.65, y: 0.30 } }
      },
      {
        id: "dim-height",
        type: "dimensionAnnotation",
        startTime: 29.5,
        endTime: 32.08,
        label: "Height (高さ)",
        labelOffset: { x: 55, y: 0 },
        dimensionType: "vertical",
        line: { start: { x: 0.66, y: 0.32 }, end: { x: 0.66, y: 0.75 } }
      }
    ]
  },
  {
    id: "cyl-8-recap",
    title: "Create Cylinder Recap",
    text: "",
    customText: "Let's review. You selected Shape Placement and the Cylinder tool. You specified the cylinder diameter and height in the Item Entry area. After the knowledge check, you entered zero, zero, zero to position the cylinder at the model origin.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    recapData: {
      title: "Lesson Complete",
      items: [
        "Selected Shape Placement and the Cylinder tool.",
        "Entered the cylinder diameter and height.",
        "Positioned the cylinder at the model origin using 0, 0, 0."
      ]
    }
  }
];

export const boxTutorialSteps: TutorialStep[] = [
  {
    id: "box-1-shape-placement",
    title: "Select Shape Placement",
    text: "",
    customText: "A box, also called a rectangular solid, is a three-dimensional solid with six rectangular faces. In CAD, boxes are commonly used as starting geometry for blocks, plates, housings, bases, and other rectangular components. Use a box when a component has defined width, depth, and height. To begin, open Shape Placement.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 0,
    videoEnd: 2.233,
    overlays: [
      { id: "box-shape-placement", type: "highlight", startTime: 1.2, endTime: 2.233, target: { x: 0.908, y: 0.123, width: 0.07, height: 0.026 }, animation: "pulse", label: "Shape Placement" }
    ]
  },
  {
    id: "box-2-place-box",
    title: "Select the Box Tool",
    text: "",
    customText: "Select Place Box, or Rectangular Solid, from Shape Placement.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 2.233,
    videoEnd: 4.817,
    overlays: [
      { id: "box-place-box", type: "highlight", startTime: 3.75, endTime: 4.817, target: { x: 0.926, y: 0.145, width: 0.02, height: 0.032 }, animation: "pulse", label: "Place Rectangular Solid", labelPosition: "bottom" }
    ]
  },
  {
    id: "box-3-front-view",
    title: "Set the Front View",
    text: "",
    customText: "Select Front View from the 3D View toolbar.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 4.817,
    videoEnd: 8.333,
    overlays: [
      { id: "box-front-view", type: "highlight", startTime: 5.4, endTime: 8.333, target: { x: 0.438, y: 0.037, width: 0.016, height: 0.03 }, animation: "pulse", label: "Front View", labelPosition: "bottom" }
    ]
  },
  {
    id: "box-4-command-options",
    title: "Confirm the Box Settings",
    text: "",
    customText: "In the Command Menu, confirm Rectangular Solid, Placement, and Dimension Specification, then select Y Orientation.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 8.333,
    videoEnd: 15.25,
    overlays: [
      { id: "box-opt-solid", type: "highlight", startTime: 8.333, endTime: 9.4, target: { x: 0.032, y: 0.655, width: 0.036, height: 0.023 }, animation: "pulse", label: "Rectangular Solid", labelPosition: "right" },
      { id: "box-opt-placement", type: "highlight", startTime: 10.4, endTime: 12.5, target: { x: 0.001, y: 0.813, width: 0.035, height: 0.023 }, animation: "pulse", label: "Placement", labelPosition: "right" },
      { id: "box-opt-dim", type: "highlight", startTime: 12.5, endTime: 13.75, target: { x: 0.001, y: 0.886, width: 0.035, height: 0.023 }, animation: "pulse", label: "Dimension Specification", labelPosition: "right" },
      { id: "box-opt-y-orient", type: "highlight", startTime: 13.75, endTime: 15.0, target: { x: 0.017, y: 0.862, width: 0.019, height: 0.023 }, animation: "pulse", label: "Y Orientation", labelPosition: "right" },
      {
        id: "quiz-box-orientation",
        type: "quiz",
        startTime: 15.0,
        endTime: 15.25,
        quizData: {
          question: "Which orientation is selected for this box placement procedure?",
          options: [
            { text: "Y Orientation", isCorrect: true, feedback: "Correct! This procedure uses Y Orientation." },
            { text: "X Orientation", isCorrect: false, feedback: "This procedure uses Y Orientation." },
            { text: "Z Orientation", isCorrect: false, feedback: "This procedure uses Y Orientation." }
          ]
        }
      }
    ]
  },
  {
    id: "box-5-width",
    title: "Enter the Width",
    text: "",
    customText: "In the Item Entry area, enter the box width.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 15.25,
    videoEnd: 18.25,
    overlays: [
      { id: "box-item-entry", type: "highlight", startTime: 15.25, endTime: 15.9, target: { ...boxOverlayLayout.itemEntryArea }, animation: "pulse", label: "Item Entry Area" },
      { id: "box-input-width", type: "highlight", startTime: 15.9, endTime: 18.25, target: { x: 0.092, y: 0.948, width: 0.051, height: 0.028 }, animation: "pulse", label: "Width (幅)" }
    ]
  },
  {
    id: "box-6-depth",
    title: "Enter the Depth",
    text: "",
    customText: "Enter the box depth in the Item Entry area.",
    zoom: "scale(1)", origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox, waitForNarrationBeforeVideo: true, narrateTitle: false,
    videoStart: 18.25, videoEnd: 21.75,
    overlays: [
      { id: "box-input-depth", type: "highlight", startTime: 18.25, endTime: 21.75, target: { x: 0.167, y: 0.948, width: 0.051, height: 0.028 }, animation: "pulse", label: "Depth (奥行き)" }
    ]
  },
  {
    id: "box-7-height",
    title: "Enter the Height",
    text: "",
    customText: "Enter the box height in the Item Entry area.",
    zoom: "scale(1)", origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox, waitForNarrationBeforeVideo: true, narrateTitle: false,
    videoStart: 21.75, videoEnd: 25.0,
    overlays: [
      { id: "box-input-height", type: "highlight", startTime: 21.75, endTime: 25.0, target: { x: 0.242, y: 0.948, width: 0.051, height: 0.028 }, animation: "pulse", label: "Height (高さ)" },
      {
        id: "quiz-box-dimensions",
        type: "quiz",
        startTime: 24.5,
        endTime: 25.0,
        quizData: {
          question: "Where are the dimensions of the rectangular solid entered?",
          options: [
            { text: "Item Entry area", isCorrect: true, feedback: "Correct! The dimensions of the rectangular solid are specified in the Item Entry area." },
            { text: "Key Entry Area", isCorrect: false, feedback: "The Item Entry area is used for the solid dimensions." },
            { text: "View controls", isCorrect: false, feedback: "The Item Entry area is used for the solid dimensions." }
          ]
        }
      }
    ]
  },
  {
    id: "box-8-origin",
    title: "Position the Box",
    text: "",
    customText: "After the knowledge check, enter 0, 0, 0 in the Item Entry area to position the rectangular solid at the model origin.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 25.0,
    videoEnd: 29.883,
    overlays: [
      { id: "box-input-coords", type: "highlight", startTime: 29.167, endTime: 29.883, target: { x: 0.6, y: 0.949, width: 0.4, height: 0.0324 }, animation: "pulse", label: "Origin Coordinates: 0 0 0" },
      {
        id: "quiz-box-origin",
        type: "quiz",
        startTime: 29.383,
        endTime: 29.883,
        quizData: {
          question: "What coordinates are used to position the rectangular solid at the origin in this lesson?",
          options: [
            { text: "0 0 0", isCorrect: true, feedback: "Correct! Zero, zero, zero represents the model origin." },
            { text: "100 100 0", isCorrect: false, feedback: "Zero, zero, zero represents the model origin." },
            { text: "50 50 50", isCorrect: false, feedback: "Zero, zero, zero represents the model origin." }
          ]
        }
      }
    ]
  },
  {
    id: "box-9-result",
    title: "Review the Result",
    text: "",
    customText: "The rectangular solid is now created using the specified width, depth, height, and origin position.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "88%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 29.883,
    videoEnd: 33.017
  },
  {
    id: "box-10-explain",
    title: "Review the Box Dimensions",
    text: "",
    customText: "Width measures the box from side to side. Depth measures it from front to back. Height measures it from bottom to top.",
    zoom: "scale(1)", origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "88%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox, waitForNarrationBeforeVideo: true, advanceOnSourceVideoEnd: true, narrateTitle: false,
    videoStart: 33.017, videoEnd: 37.566,
    overlays: [
      {
        id: "box-dim-width",
        type: "dimensionAnnotation",
        startTime: 33.25,
        endTime: 37.566,
        label: "Width (幅)",
        labelOffset: { x: -55, y: 10 },
        dimensionType: "diagonal",
        line: { start: { x: 0.44, y: 0.57 }, end: { x: 0.585, y: 0.72 } }
      },
      {
        id: "box-dim-depth",
        type: "dimensionAnnotation",
        startTime: 34.25,
        endTime: 37.566,
        label: "Depth (奥行き)",
        labelOffset: { x: 55, y: 30 },
        dimensionType: "horizontal",
        line: { start: { x: 0.61, y: 0.71 }, end: { x: 0.695, y: 0.62 } }
      },
      {
        id: "box-dim-height",
        type: "dimensionAnnotation",
        startTime: 35.25,
        endTime: 37.566,
        label: "Height (高さ)",
        labelOffset: { x: 55, y: -5 },
        dimensionType: "vertical",
        line: { start: { x: 0.70, y: 0.51 }, end: { x: 0.70, y: 0.605 } }
      },
      {
        id: "quiz-box-final",
        type: "quiz",
        startTime: 37.067,
        endTime: 37.566,
        quizData: {
          question: "Which information determines the size of the rectangular solid?",
          options: [
            { text: "The dimension values entered in Item Entry.", isCorrect: true, feedback: "Correct! The Item Entry dimensions define the size, while the coordinate entry determines the position." },
            { text: "The origin coordinates alone.", isCorrect: false, feedback: "The origin coordinates determine the position, not the size." },
            { text: "The selected viewing orientation alone.", isCorrect: false, feedback: "The view orientation changes how you see it, not the actual physical size." }
          ]
        }
      }
    ]
  },
  {
    id: "box-11-recap",
    title: "Create Box Recap",
    text: "",
    customText: "Let's review. You selected Shape Placement and the Box tool, selected Front View, confirmed the Command Menu settings and Y Orientation, entered the width, depth, and height, and used zero, zero, zero to position the rectangular solid at the model origin.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    recapData: {
      title: "Lesson Complete",
      items: [
        "Selected Shape Placement and the Box tool.",
        "Selected Front View and Y Orientation.",
        "Entered width, depth, and height in Item Entry.",
        "Positioned the box at the model origin using 0, 0, 0."
      ]
    }
  }
];

export const polygonTutorialSteps: TutorialStep[] = [
  {
    id: "poly-1-tool-selection",
    title: "Select Polygonal Prism",
    text: "",
    customText: "A polygonal prism is a three-dimensional solid with matching polygon-shaped faces connected by rectangular sides. In CAD, it is useful for creating hexagonal bosses, multi-sided shafts, nuts, and other prismatic parts. To begin, open Shape Placement, then select Polygonal Prism.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidPolygon,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 0,
    videoEnd: 4.8,
    overlays: [
      { id: "poly-shape-placement", type: "highlight", startTime: 0.75, endTime: 2.2, target: { x: 0.908, y: 0.123, width: 0.07, height: 0.026 }, animation: "pulse", label: "Shape Placement" },
      { id: "poly-place-polygon", type: "highlight", startTime: 2.2, endTime: 4.8, target: { x: 0.945, y: 0.145, width: 0.017, height: 0.032 }, animation: "pulse", label: "Polygonal Prism", labelPosition: "bottom" }
    ]
  },
  {
    id: "poly-2-front-view",
    title: "Set the Front View",
    text: "",
    customText: "Select Front View from the 3D View toolbar.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidPolygon,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 4.8,
    videoEnd: 7.8,
    overlays: [
      { id: "poly-front-view", type: "highlight", startTime: 5.0, endTime: 7.8, target: { x: 0.438, y: 0.037, width: 0.016, height: 0.03 }, animation: "pulse", label: "Front View", labelPosition: "bottom" }
    ]
  },
  {
    id: "poly-3-command-options",
    title: "Confirm the Polygon Settings",
    text: "",
    customText: "In the Command Menu, confirm Polygonal Prism, Placement, and Dimension Specification, then select Y Orientation.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidPolygon,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 7.8,
    videoEnd: 15.0,
    overlays: [
      { id: "poly-opt-prism", type: "highlight", startTime: 7.8, endTime: 9.4, target: { x: 0.001, y: 0.671, width: 0.036, height: 0.023 }, animation: "pulse", label: "Polygonal Prism", labelPosition: "right" },
      { id: "poly-opt-placement", type: "highlight", startTime: 9.4, endTime: 11.0, target: { x: 0.001, y: 0.813, width: 0.035, height: 0.023 }, animation: "pulse", label: "Placement", labelPosition: "right" },
      { id: "poly-opt-dimension", type: "highlight", startTime: 11.0, endTime: 12.75, target: { x: 0.001, y: 0.87, width: 0.035, height: 0.023 }, animation: "pulse", label: "Dimension Specification", labelPosition: "right" },
      { id: "poly-opt-y-orientation", type: "highlight", startTime: 12.75, endTime: 14.75, target: { x: 0.017, y: 0.846, width: 0.019, height: 0.023 }, animation: "pulse", label: "Y Orientation", labelPosition: "right" },
      {
        id: "quiz-poly-command",
        type: "quiz",
        startTime: 14.75,
        endTime: 15.0,
        quizData: {
          question: "Which command creates the multi-sided solid demonstrated in this lesson?",
          options: [
            { text: "Polygonal Prism", isCorrect: true, feedback: "Correct! Polygonal Prism creates the multi-sided solid used in this lesson." },
            { text: "Cylinder", isCorrect: false, feedback: "Polygonal Prism is the command used for this multi-sided solid." },
            { text: "Cone", isCorrect: false, feedback: "Polygonal Prism is the command used for this multi-sided solid." }
          ]
        }
      }
    ]
  },
  {
    id: "poly-4-dimensions",
    title: "Enter the Polygon Dimensions",
    text: "",
    customText: "In the Item Entry area, enter the number of sides, the circumscribed path diameter, and the height.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidPolygon,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 15.0,
    videoEnd: 22.3,
    overlays: [
      { id: "poly-item-entry", type: "highlight", startTime: 15.0, endTime: 16.0, target: { ...polygonOverlayLayout.itemEntryArea }, animation: "pulse", label: "Item Entry Area" },
      { id: "poly-input-sides", type: "highlight", startTime: 16.0, endTime: 18.8, target: { x: 0.07, y: 0.948, width: 0.055, height: 0.028 }, animation: "pulse", label: "Number of Sides" },
      { id: "poly-input-diameter", type: "highlight", startTime: 18.8, endTime: 20.5, target: { x: 0.124, y: 0.948, width: 0.078, height: 0.028 }, animation: "pulse", label: "Path Diameter" },
      { id: "poly-input-height", type: "highlight", startTime: 20.5, endTime: 22.05, target: { x: 0.2, y: 0.948, width: 0.079, height: 0.028 }, animation: "pulse", label: "Height" },
      {
        id: "quiz-poly-dimensions",
        type: "quiz",
        startTime: 22.05,
        endTime: 22.3,
        quizData: {
          question: "Which properties define the polygonal prism in this lesson?",
          options: [
            { text: "Number of sides, path diameter, and height", isCorrect: true, feedback: "Correct! These three values define the polygonal prism." },
            { text: "Width, depth, and height", isCorrect: false, feedback: "Those values define a rectangular solid; this polygonal prism uses sides, path diameter, and height." },
            { text: "Base diameter and top diameter only", isCorrect: false, feedback: "This polygonal prism uses the number of sides, path diameter, and height." }
          ]
        }
      }
    ]
  },
  {
    id: "poly-5-origin",
    title: "Position the Polygonal Prism",
    text: "",
    customText: "In the Key Entry Area, enter 0, 0, 0 to position the polygonal prism at the model origin.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidPolygon,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 22.3,
    videoEnd: 26.5,
    overlays: [
      { id: "poly-input-origin", type: "highlight", startTime: 22.8, endTime: 26.5, target: { x: 0.6, y: 0.949, width: 0.4, height: 0.0324 }, animation: "pulse", label: "Origin Coordinates: 0 0 0" }
    ]
  },
  {
    id: "poly-6-result",
    title: "Review the Result",
    text: "",
    customText: "The polygonal prism is now created using the specified number of sides, path diameter, height, and origin position.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "86%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidPolygon,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 26.5,
    videoEnd: 28.3
  },
  {
    id: "poly-7-explain",
    title: "Review the Polygonal Prism Dimensions",
    text: "",
    customText: "Number of sides defines the polygon profile. Path diameter controls the size of that profile. Height measures the polygonal prism from bottom to top.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "88%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidPolygon,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    advanceOnSourceVideoEnd: true,
    videoStart: 28.3,
    videoEnd: 33.4,
    overlays: [
      {
        id: "poly-dim-sides",
        type: "polygonOutline",
        startTime: 30.0,
        endTime: 33.4,
        label: "Number of Sides (頂点数)",
        labelOffset: { x: 0, y: -8 },
        points: [
          { x: 0.493, y: 0.377 },
          { x: 0.572, y: 0.353 },
          { x: 0.636, y: 0.416 },
          { x: 0.614, y: 0.503 },
          { x: 0.532, y: 0.523 },
          { x: 0.473, y: 0.463 }
        ]
      },
      {
        id: "poly-dim-diameter",
        type: "dimensionAnnotation",
        startTime: 31.0,
        endTime: 33.4,
        label: "Path Diameter (直径)",
        labelOffset: { x: 20, y: 30 },
        dimensionType: "horizontal",
        line: { start: { x: 0.54, y: 0.78 }, end: { x: 0.62, y: 0.76 } }
      },
      {
        id: "poly-dim-height",
        type: "dimensionAnnotation",
        startTime: 32.0,
        endTime: 33.4,
        label: "Height (高さ)",
        labelOffset: { x: 50, y: 0 },
        dimensionType: "vertical",
        line: { start: { x: 0.65, y: 0.43 }, end: { x: 0.65, y: 0.66 } }
      },
      {
        id: "quiz-poly-origin",
        type: "quiz",
        startTime: 32.9,
        endTime: 33.4,
        quizData: {
          question: "What coordinates position the polygonal prism at the model origin?",
          options: [
            { text: "0, 0, 0", isCorrect: true, feedback: "Correct! Zero, zero, zero positions the polygonal prism at the model origin." },
            { text: "100, 0, 0", isCorrect: false, feedback: "Zero, zero, zero is the coordinate of the model origin." },
            { text: "50, 50, 50", isCorrect: false, feedback: "Zero, zero, zero is the coordinate of the model origin." }
          ]
        }
      }
    ]
  },
  {
    id: "poly-8-recap",
    title: "Create Polygon Recap",
    text: "",
    customText: "Let's review. You selected Front View and Polygonal Prism, confirmed the Command Menu settings, entered the number of sides, path diameter, and height, and used zero, zero, zero to position the polygonal prism at the model origin.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    recapData: {
      title: "Lesson Complete",
      items: [
        "Selected Front View and Polygonal Prism.",
        "Confirmed the required Command Menu settings.",
        "Entered the number of sides, path diameter, and height.",
        "Positioned the polygonal prism at the model origin using 0, 0, 0."
      ]
    }
  }
];

export const coneTutorialSteps: TutorialStep[] = [
  {
    id: "cone-1-tool-selection",
    title: "Select the Cone Tool",
    text: "",
    customText: "A cone is a three-dimensional solid with a circular base that tapers toward a smaller top face or a point. In CAD, cones are useful for tapered components, reducers, funnels, nozzles, and conical features. To begin, open Shape Arrangement, then select Cone.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCone,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 0,
    videoEnd: 3.25,
    overlays: [
      { id: "cone-shape-arrangement", type: "highlight", startTime: 0.75, endTime: 1.6, target: { x: 0.908, y: 0.123, width: 0.071, height: 0.028 }, animation: "pulse", label: "Shape Arrangement", labelPosition: "top" },
      { id: "cone-place-cone", type: "highlight", startTime: 1.6, endTime: 3.25, target: { x: 0.91, y: 0.173, width: 0.02, height: 0.035 }, animation: "pulse", label: "Cone", labelPosition: "bottom" }
    ]
  },
  {
    id: "cone-2-front-view",
    title: "Set the Front View",
    text: "",
    customText: "Select Front View from the 3D View toolbar.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCone,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 3.25,
    videoEnd: 6.25,
    overlays: [
      { id: "cone-front-view", type: "highlight", startTime: 3.25, endTime: 6.25, target: { x: 0.438, y: 0.037, width: 0.016, height: 0.03 }, animation: "pulse", label: "Front View", labelPosition: "bottom" }
    ]
  },
  {
    id: "cone-3-command-options",
    title: "Confirm the Cone Settings",
    text: "",
    customText: "In the Command Menu, confirm Cone and Placement, then select Y Orientation.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCone,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 6.25,
    videoEnd: 11.25,
    overlays: [
      { id: "cone-opt-cone", type: "highlight", startTime: 6.35, endTime: 7.15, target: { x: 0.0, y: 0.688, width: 0.036, height: 0.023 }, animation: "pulse", label: "Cone", labelPosition: "right" },
      { id: "cone-opt-placement", type: "highlight", startTime: 7.15, endTime: 8.15, target: { x: 0.001, y: 0.813, width: 0.035, height: 0.023 }, animation: "pulse", label: "Placement", labelPosition: "right" },
      { id: "cone-opt-y-orientation", type: "highlight", startTime: 9.75, endTime: 11.0, target: { x: 0.017, y: 0.862, width: 0.019, height: 0.023 }, animation: "pulse", label: "Y Orientation", labelPosition: "right" },
      {
        id: "quiz-cone-command",
        type: "quiz",
        startTime: 11.0,
        endTime: 11.25,
        quizData: {
          question: "Which orientation is selected for this cone placement procedure?",
          options: [
            { text: "Y Orientation", isCorrect: true, feedback: "Correct! This procedure uses Y Orientation." },
            { text: "X Orientation", isCorrect: false, feedback: "This procedure uses Y Orientation." },
            { text: "Z Orientation", isCorrect: false, feedback: "This procedure uses Y Orientation." }
          ]
        }
      }
    ]
  },
  {
    id: "cone-4-dimensions",
    title: "Enter the Cone Parameters",
    text: "",
    customText: "In the Item Entry area, enter the base diameter, top face diameter, and height.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCone,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 11.25,
    videoEnd: 22.5,
    overlays: [
      { id: "cone-item-entry", type: "highlight", startTime: 11.25, endTime: 11.75, target: { ...coneOverlayLayout.itemEntryArea }, animation: "pulse", label: "Item Entry Area" },
      { id: "cone-input-base", type: "highlight", startTime: 11.75, endTime: 16.25, target: { x: 0.07, y: 0.948, width: 0.09, height: 0.028 }, animation: "pulse", label: "Base Diameter (底面直径)" },
      { id: "cone-input-top", type: "highlight", startTime: 16.25, endTime: 19.25, target: { x: 0.16, y: 0.948, width: 0.09, height: 0.028 }, animation: "pulse", label: "Top Face Diameter (上面直径)" },
      { id: "cone-input-height", type: "highlight", startTime: 19.25, endTime: 22.25, target: { x: 0.25, y: 0.948, width: 0.09, height: 0.028 }, animation: "pulse", label: "Height (高さ)" },
      {
        id: "quiz-cone-parameters",
        type: "quiz",
        startTime: 22.25,
        endTime: 22.5,
        quizData: {
          question: "Which dimensions define the cone in this lesson?",
          options: [
            { text: "Base diameter, top face diameter, and height", isCorrect: true, feedback: "Correct! These three dimensions define the cone." },
            { text: "Width, depth, and height", isCorrect: false, feedback: "Those values define a rectangular solid, not this cone." },
            { text: "Path diameter and height only", isCorrect: false, feedback: "This cone requires both diameter values and its height." }
          ]
        }
      }
    ]
  },
  {
    id: "cone-5-origin",
    title: "Position the Cone",
    text: "",
    customText: "In the Key Entry Area, enter 0, 0, 0 to position the cone at the model origin.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCone,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 22.5,
    videoEnd: 24.75,
    overlays: [
      { id: "cone-input-origin", type: "highlight", startTime: 22.5, endTime: 24.75, target: { x: 0.47, y: 0.949, width: 0.53, height: 0.0324 }, animation: "pulse", label: "Origin Coordinates: 0 0 0" }
    ]
  },
  {
    id: "cone-6-result",
    title: "Review the Result",
    text: "",
    customText: "The cone is now created using the specified base diameter, top face diameter, height, and origin position.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "88%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCone,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 24.75,
    videoEnd: 27.0
  },
  {
    id: "cone-7-explain",
    title: "Review the Cone Dimensions",
    text: "",
    customText: "Base diameter controls the lower circular face. Top face diameter controls the upper circular face. Height measures the cone from bottom to top.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "88%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCone,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    advanceOnSourceVideoEnd: true,
    videoStart: 27.0,
    videoEnd: 30.866667,
    overlays: [
      { id: "cone-dim-base", type: "dimensionAnnotation", startTime: 27.25, endTime: 30.866667, label: "Base Diameter (底面直径)", labelOffset: { x: 0, y: 28 }, dimensionType: "horizontal", line: { start: { x: 0.5, y: 0.76 }, end: { x: 0.655, y: 0.76 } } },
      { id: "cone-dim-top", type: "dimensionAnnotation", startTime: 28.25, endTime: 30.866667, label: "Top Face Diameter (上面直径)", labelOffset: { x: -8, y: -12 }, dimensionType: "horizontal", line: { start: { x: 0.53, y: 0.33 }, end: { x: 0.61, y: 0.33 } } },
      { id: "cone-dim-height", type: "dimensionAnnotation", startTime: 29.25, endTime: 30.866667, label: "Height (高さ)", labelOffset: { x: 55, y: 0 }, dimensionType: "vertical", line: { start: { x: 0.66, y: 0.36 }, end: { x: 0.66, y: 0.72 } } },
      {
        id: "quiz-cone-origin",
        type: "quiz",
        startTime: 30.366667,
        endTime: 30.866667,
        quizData: {
          question: "What coordinates position the cone at the model origin?",
          options: [
            { text: "0, 0, 0", isCorrect: true, feedback: "Correct! Zero, zero, zero positions the cone at the model origin." },
            { text: "100, 0, 0", isCorrect: false, feedback: "Zero, zero, zero is the coordinate of the model origin." },
            { text: "50, 50, 50", isCorrect: false, feedback: "Zero, zero, zero is the coordinate of the model origin." }
          ]
        }
      }
    ]
  },
  {
    id: "cone-8-recap",
    title: "Create Cone Recap",
    text: "",
    customText: "Let's review. You opened Shape Arrangement and selected Cone, selected Front View, confirmed the Command Menu settings and Y Orientation, entered the base diameter, top face diameter, and height, and used zero, zero, zero to position the cone at the model origin.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    recapData: {
      title: "Lesson Complete",
      items: [
        "Opened Shape Arrangement and selected the Cone tool.",
        "Selected Front View and Y Orientation.",
        "Entered base diameter, top face diameter, and height.",
        "Positioned the cone at the model origin using 0, 0, 0."
      ]
    }
  }
];

export const torusTutorialSteps: TutorialStep[] = [
  {
    id: "torus-1-tool-selection",
    title: "Select the Torus Tool",
    text: "",
    customText: "A torus is a three-dimensional ring-shaped solid formed by revolving a circular profile around an axis. In CAD, it is useful for creating rings, seals, curved pipes, and similar components. To begin, select Torus from the Shape Arrangement controls.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidTorus,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 0,
    videoEnd: 3,
    overlays: [
      { id: "torus-place-torus", type: "highlight", startTime: 1.5, endTime: 3, target: { x: 0.0, y: 0.67, width: 0.065, height: 0.026 }, animation: "pulse", label: "Torus", labelPosition: "right" }
    ]
  },
  {
    id: "torus-2-front-view",
    title: "Set the Front View",
    text: "",
    customText: "Select Front View from the 3D View toolbar.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidTorus,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 3,
    videoEnd: 5,
    overlays: [
      { id: "torus-front-view", type: "highlight", startTime: 3.1, endTime: 5, target: { x: 0.425, y: 0.036, width: 0.018, height: 0.035 }, animation: "pulse", label: "Front View", labelPosition: "bottom" }
    ]
  },
  {
    id: "torus-3-command-options",
    title: "Confirm the Torus Settings",
    text: "",
    customText: "In the Command Menu, confirm Torus and Placement, then select Y Orientation.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidTorus,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 5,
    videoEnd: 10,
    overlays: [
      { id: "torus-opt-torus", type: "highlight", startTime: 5.25, endTime: 6.75, target: { x: 0.0, y: 0.67, width: 0.065, height: 0.026 }, animation: "pulse", label: "Torus", labelPosition: "right" },
      { id: "torus-opt-placement", type: "highlight", startTime: 6.75, endTime: 8.25, target: { x: 0.0, y: 0.815, width: 0.065, height: 0.026 }, animation: "pulse", label: "Placement", labelPosition: "right" },
      { id: "torus-opt-y-orientation", type: "highlight", startTime: 9.5, endTime: 9.85, target: { x: 0.018, y: 0.866, width: 0.018, height: 0.026 }, animation: "pulse", label: "Y Orientation", labelPosition: "right" },
      {
        id: "quiz-torus-command",
        type: "quiz",
        startTime: 9.85,
        endTime: 10,
        quizData: {
          question: "Which orientation is selected for this torus placement procedure?",
          options: [
            { text: "Y Orientation", isCorrect: true, feedback: "Correct! This procedure uses Y Orientation." },
            { text: "X Orientation", isCorrect: false, feedback: "This procedure uses Y Orientation." },
            { text: "Z Orientation", isCorrect: false, feedback: "This procedure uses Y Orientation." }
          ]
        }
      }
    ]
  },
  {
    id: "torus-4-dimensions",
    title: "Enter the Torus Parameters",
    text: "",
    customText: "In the Item Entry area, enter the section diameter, path radius, and turn angle.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidTorus,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 10,
    videoEnd: 22,
    overlays: [
      { id: "torus-item-entry", type: "highlight", startTime: 10, endTime: 10.5, target: { x: 0.07, y: 0.948, width: 0.268, height: 0.03 }, animation: "pulse", label: "Item Entry Area", labelPosition: "top" },
      { id: "torus-input-section", type: "highlight", startTime: 10.5, endTime: 15, target: { x: 0.07, y: 0.948, width: 0.09, height: 0.03 }, animation: "pulse", label: "Section Diameter (断面直径)", labelPosition: "top" },
      { id: "torus-input-path", type: "highlight", startTime: 15, endTime: 19, target: { x: 0.16, y: 0.948, width: 0.09, height: 0.03 }, animation: "pulse", label: "Path Radius (経路半径)", labelPosition: "top" },
      { id: "torus-input-angle", type: "highlight", startTime: 19, endTime: 21.8, target: { x: 0.25, y: 0.948, width: 0.09, height: 0.03 }, animation: "pulse", label: "Turn Angle (回転角)", labelPosition: "top" },
      {
        id: "quiz-torus-parameters",
        type: "quiz",
        startTime: 21.8,
        endTime: 22,
        quizData: {
          question: "Which values define the torus in this lesson?",
          options: [
            { text: "Section diameter, path radius, and turn angle", isCorrect: true, feedback: "Correct! These three values define the torus." },
            { text: "Width, depth, and height", isCorrect: false, feedback: "Those values define a rectangular solid, not a torus." },
            { text: "Base diameter and height", isCorrect: false, feedback: "Those values do not define this torus." }
          ]
        }
      }
    ]
  },
  {
    id: "torus-5-origin",
    title: "Position the Torus",
    text: "",
    customText: "In the Key Entry Area, enter 0, 0, 0 to position the torus at the model origin.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidTorus,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 22,
    videoEnd: 26,
    overlays: [
      { id: "torus-input-origin", type: "highlight", startTime: 22, endTime: 25.75, target: { x: 0.47, y: 0.949, width: 0.53, height: 0.0324 }, animation: "pulse", label: "Origin Coordinates: 0 0 0", labelPosition: "top" },
      {
        id: "quiz-torus-origin",
        type: "quiz",
        startTime: 25.75,
        endTime: 26,
        quizData: {
          question: "What coordinates position the torus at the model origin?",
          options: [
            { text: "0, 0, 0", isCorrect: true, feedback: "Correct! Zero, zero, zero positions the torus at the model origin." },
            { text: "100, 0, 0", isCorrect: false, feedback: "Zero, zero, zero is the coordinate of the model origin." },
            { text: "50, 50, 50", isCorrect: false, feedback: "Zero, zero, zero is the coordinate of the model origin." }
          ]
        }
      }
    ]
  },
  {
    id: "torus-6-result",
    title: "Review the Result",
    text: "",
    customText: "The torus is now created using the specified section diameter, path radius, turn angle, and origin position.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "88%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidTorus,
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    videoStart: 26,
    videoEnd: 28
  },
  {
    id: "torus-7-explain",
    title: "Review the Torus Parameters",
    text: "",
    customText: "Section diameter controls the thickness of the torus tube. Path radius controls the distance from the torus center to the center of the tube. Turn angle controls how far the circular profile revolves around the axis.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "88%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidTorus,
    waitForNarrationBeforeVideo: true,
    advanceOnSourceVideoEnd: true,
    narrateTitle: false,
    videoStart: 28,
    videoEnd: 33.616667,
    overlays: [
      { id: "torus-dim-section", type: "dimensionAnnotation", startTime: 28.5, endTime: 33.616667, label: "Section Diameter (断面直径)", labelOffset: { x: -55, y: 0 }, dimensionType: "vertical", line: { start: { x: 0.415, y: 0.47 }, end: { x: 0.415, y: 0.53 } } },
      { id: "torus-dim-path", type: "dimensionAnnotation", startTime: 29.5, endTime: 33.616667, label: "Path Radius (経路半径)", labelOffset: { x: 0, y: 28 }, dimensionType: "horizontal", line: { start: { x: 0.42, y: 0.52 }, end: { x: 0.64, y: 0.52 } } },
      { id: "torus-dim-angle", type: "dimensionAnnotation", startTime: 30.5, endTime: 33.1, label: "Turn Angle (回転角)", labelOffset: { x: 45, y: -15 }, dimensionType: "diagonal", line: { start: { x: 0.64, y: 0.52 }, end: { x: 0.76, y: 0.40 } } }
    ]
  },
  {
    id: "torus-8-recap",
    title: "Create Torus Recap",
    text: "",
    customText: "Let's review. You selected the Torus tool, selected Front View, confirmed the Command Menu settings and Y Orientation, entered the section diameter, path radius, and turn angle, and used zero, zero, zero to position the torus at the model origin.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    waitForNarrationBeforeVideo: true,
    narrateTitle: false,
    recapData: {
      title: "Lesson Complete",
      items: [
        "Selected the Torus tool and Front View.",
        "Confirmed the Command Menu settings and Y Orientation.",
        "Entered section diameter, path radius, and turn angle.",
        "Positioned the torus at the model origin using 0, 0, 0."
      ]
    }
  }
];
