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
    videoEnd: 11,
    overlays: [
      {
        id: "quiz-poly-1",
        type: "quiz",
        startTime: 10,
        endTime: 11,
        quizData: {
          question: "Which properties must be specified when creating a polygonal prism?",
          options: [
            { text: "Number of Sides, Path Diameter, and Height", isCorrect: true, feedback: "Correct!" },
            { text: "Radius and Depth", isCorrect: false, feedback: "InCorrect!" }
          ]
        }
      }
    ]
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
    videoEnd: 20,
    overlays: [
      {
        id: "quiz-poly-2",
        type: "quiz",
        startTime: 16,
        endTime: 17,
        quizData: {
          question: "How do you render the polygon in the workspace after entering coordinates?",
          options: [
            { text: "Confirm the coordinates by pressing Enter", isCorrect: true, feedback: "Correct!" },
            { text: "Click on the workspace randomly", isCorrect: false, feedback: "InCorrect!" }
          ]
        }
      },
      {
        id: "recap-poly",
        type: "recap",
        startTime: 19,
        endTime: 20,
        recapData: {
          title: "Polygon Complete",
          items: [
            "You selected the Polygon tool.",
            "You specified the number of sides, diameter, and height.",
            "You positioned it using origin coordinates."
          ]
        }
      }
    ]
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
    videoEnd: 11,
    overlays: [
      {
        id: "quiz-cone-1",
        type: "quiz",
        startTime: 10,
        endTime: 11,
        quizData: {
          question: "Which of the following is NOT a parameter for creating a Cone?",
          options: [
            { text: "Base Diameter", isCorrect: false, feedback: "Base Diameter is a valid parameter." },
            { text: "Corner Radius", isCorrect: true, feedback: "Correct! Cones do not have corner radiuses." },
            { text: "Top Face Diameter", isCorrect: false, feedback: "Top Face Diameter is a valid parameter." }
          ]
        }
      }
    ]
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
    videoEnd: 20,
    overlays: [
      {
        id: "quiz-cone-2",
        type: "quiz",
        startTime: 16,
        endTime: 17,
        quizData: {
          question: "What action places the cone on the workplane?",
          options: [
            { text: "Entering target coordinates in the Key Entry Area", isCorrect: true, feedback: "Correct!" },
            { text: "Clicking randomly on the screen", isCorrect: false, feedback: "InCorrect! You must enter coordinates." }
          ]
        }
      },
      {
        id: "recap-cone",
        type: "recap",
        startTime: 19,
        endTime: 20,
        recapData: {
          title: "Cone Complete",
          items: [
            "You selected the Cone tool.",
            "You specified Number of Sides, Base Diameter, Top Face Diameter, and Height.",
            "You positioned it using target coordinates."
          ]
        }
      }
    ]
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
    videoEnd: 11,
    overlays: [
      {
        id: "quiz-torus-1",
        type: "quiz",
        startTime: 10,
        endTime: 11,
        quizData: {
          question: "Which of these defines the Torus geometry?",
          options: [
            { text: "Section Diameter, Path Radius, and Turn Angle", isCorrect: true, feedback: "Correct!" },
            { text: "Height and Width", isCorrect: false, feedback: "InCorrect!" }
          ]
        }
      }
    ]
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
    videoEnd: 22,
    overlays: [
      {
        id: "quiz-torus-2",
        type: "quiz",
        startTime: 16,
        endTime: 17,
        quizData: {
          question: "How do you place the Torus on the workspace?",
          options: [
            { text: "By entering positioning coordinates in the Key Entry Area", isCorrect: true, feedback: "Correct!" },
            { text: "By clicking the Torus icon again", isCorrect: false, feedback: "InCorrect!" }
          ]
        }
      },
      {
        id: "recap-torus",
        type: "recap",
        startTime: 21,
        endTime: 22,
        recapData: {
          title: "Torus Complete",
          items: [
            "You selected the Torus tool.",
            "You defined the Section Diameter, Path Radius, and Turn Angle.",
            "You positioned it using the Key Entry Area."
          ]
        }
      }
    ]
  }
];
