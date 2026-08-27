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
    id: "box-0",
    title: "Creating a Box",
    text: "",
    customText: "Welcome to this iCAD lesson. In this tutorial, you will learn how to create a basic rectangular solid, specify its dimensions, and position it using coordinates.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    videoStart: 0,
    videoEnd: 1.5
  },
  {
    id: "box-1",
    title: "Creating a Box",
    text: "",
    customText: "First, click Shape Placement. Next, select Place Box. Next, select Front View.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    videoStart: 1.5,
    videoEnd: 6.5,
    overlays: [
      { id: "shape-placement", type: "highlight", startTime: 1.5, endTime: 3.0, target: { x: 0.908, y: 0.123, width: 0.07, height: 0.026 }, animation: "pulse", label: "Shape Placement" },
      { id: "place-box", type: "highlight", startTime: 3.0, endTime: 4.5, target: { x: 0.908, y: 0.145, width: 0.022, height: 0.032 }, animation: "pulse", label: "Place Rectangular Solid", labelPosition: "bottom" },
      { id: "front-view", type: "highlight", startTime: 4.5, endTime: 6.5, target: { x: 0.438, y: 0.037, width: 0.016, height: 0.03 }, animation: "pulse", label: "Front View", labelPosition: "bottom" }
    ]
  },
  {
    id: "box-2",
    title: "Creating a Box",
    text: "",
    customText: "In the Command Menu, confirm that Rectangular Solid, Placement, and Dimension Specification are active. Then select Y Orientation.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    videoStart: 6.5,
    videoEnd: 11,
    overlays: [
      { id: "opt-box", type: "highlight", startTime: 7, endTime: 8.5, target: { x: 0.0, y: 0.655, width: 0.036, height: 0.023 }, label: "Rectangular Solid", labelPosition: "right" },
      { id: "opt-placement", type: "highlight", startTime: 7, endTime: 8.5, target: { x: 0.0, y: 0.813, width: 0.036, height: 0.023 }, label: "Placement", labelPosition: "right" },
      { id: "opt-dim", type: "highlight", startTime: 7, endTime: 8.5, target: { x: 0.0, y: 0.87, width: 0.036, height: 0.023 }, label: "Dimension Specification", labelPosition: "right" },
      { id: "opt-y-orient", type: "highlight", startTime: 8.5, endTime: 10, target: { x: 0.017, y: 0.846, width: 0.019, height: 0.023 }, animation: "pulse", label: "Y Orientation", labelPosition: "right" },
      {
        id: "quiz-1",
        type: "quiz",
        startTime: 10.5,
        endTime: 11,
        quizData: {
          question: "Which orientation is selected for this Box placement procedure?",
          options: [
            { text: "Y Orientation", isCorrect: true, feedback: "Correct! This procedure uses Y Orientation for the rectangular solid placement." },
            { text: "X Orientation", isCorrect: false, feedback: "Not quite. Review the orientation selected in the demonstration." },
            { text: "Z Orientation", isCorrect: false, feedback: "Not quite. Review the orientation selected in the demonstration." }
          ]
        }
      }
    ]
  },
  {
    id: "box-3",
    title: "Creating a Box",
    text: "",
    customText: "Next, use the Item Entry area at the bottom-left of the iCAD window. Enter the required width, then press Enter. Next, enter the required depth, then press Enter. Finally, enter the required height, then press Enter.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    videoStart: 11,
    videoEnd: 17,
    overlays: [
      { id: "input-width", type: "highlight", startTime: 12, endTime: 13.5, target: { x: 0.092, y: 0.948, width: 0.051, height: 0.028 }, animation: "pulse", label: "Width (幅)" },
      { id: "input-depth", type: "highlight", startTime: 13.5, endTime: 15, target: { x: 0.167, y: 0.948, width: 0.051, height: 0.028 }, animation: "pulse", label: "Depth (奥行き)" },
      { id: "input-height", type: "highlight", startTime: 15, endTime: 16.5, target: { x: 0.242, y: 0.948, width: 0.051, height: 0.028 }, animation: "pulse", label: "Height (高さ)" },
      {
        id: "quiz-2",
        type: "quiz",
        startTime: 16.5,
        endTime: 17,
        quizData: {
          question: "Where are the dimensions of the rectangular solid entered?",
          options: [
            { text: "Item Entry area", isCorrect: true, feedback: "Correct! The dimensions of the rectangular solid are specified in the Item Entry area." },
            { text: "Key Entry Area", isCorrect: false, feedback: "The Key Entry Area is used to specify the solid's position rather than its size." },
            { text: "View controls", isCorrect: false, feedback: "The View controls the viewing orientation, not the solid dimensions." }
          ]
        }
      }
    ]
  },
  {
    id: "box-4",
    title: "Creating a Box",
    text: "",
    customText: "After specifying the dimensions, enter the coordinates for the solid's position. Enter zero, zero, zero to place the rectangular solid at the origin.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    videoStart: 17,
    videoEnd: 21,
    overlays: [
      { id: "input-coords", type: "highlight", startTime: 18, endTime: 20, target: { x: 0.6, y: 0.949, width: 0.4, height: 0.0324 }, animation: "pulse", label: "Origin: 0 0 0" },
      {
        id: "quiz-3",
        type: "quiz",
        startTime: 20.5,
        endTime: 21,
        quizData: {
          question: "What coordinates are used to position the rectangular solid at the origin in this lesson?",
          options: [
            { text: "0 0 0", isCorrect: true, feedback: "Correct!" },
            { text: "100 100 0", isCorrect: false, feedback: "InCorrect! Check the lesson again." },
            { text: "50 50 50", isCorrect: false, feedback: "InCorrect! Check the lesson again." }
          ]
        }
      }
    ]
  },
  {
    id: "box-5",
    title: "Creating a Box",
    text: "",
    customText: "The rectangular solid is now created using the dimensions and position specified in the previous steps. This dimension controls the width. This dimension controls the depth. This dimension controls the height.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "88%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    videoStart: 21,
    videoEnd: 24,
    overlays: [
      {
        id: "dim-width",
        type: "dimensionAnnotation",
        startTime: 22,
        endTime: 24,
        label: "Width (幅)",
        labelOffset: { x: 0, y: -5 },
        dimensionType: "horizontal",
        line: { start: { x: 0.44, y: 0.5 }, end: { x: 0.56, y: 0.5 } } // placeholders
      },
      {
        id: "dim-depth",
        type: "dimensionAnnotation",
        startTime: 22.5,
        endTime: 24,
        label: "Depth (奥行き)",
        labelOffset: { x: 0, y: 15 },
        dimensionType: "horizontal",
        line: { start: { x: 0.57, y: 0.5 }, end: { x: 0.62, y: 0.42 } } // placeholders
      },
      {
        id: "dim-height",
        type: "dimensionAnnotation",
        startTime: 23,
        endTime: 24,
        label: "Height (高さ)",
        labelOffset: { x: 30, y: 0 },
        dimensionType: "vertical",
        line: { start: { x: 0.56, y: 0.5 }, end: { x: 0.56, y: 0.35 } } // placeholders
      },
      {
        id: "quiz-final",
        type: "quiz",
        startTime: 23.5,
        endTime: 24,
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
    id: "box-6",
    title: "Creating a Box - Review",
    text: "",
    customText: "Review: 1. Shape Placement. 2. Place Box. 3. Select Front View. 4. Confirm Command Menu. 5. Select Y Orientation. 6. Enter Dimensions. 7. Enter Coordinates. Rectangular Solid Created.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidBox,
    videoStart: 24,
    videoEnd: 24.2,
    overlays: [
      {
        id: "recap-box",
        type: "recap",
        startTime: 24,
        endTime: 24.2,
        recapData: {
          title: "Creating a Box — Review",
          items: [
            "1. Shape Placement",
            "2. Place Box / Rectangular Solid",
            "3. Select Front View",
            "4. Confirm Command Menu settings",
            "5. Select Y Orientation",
            "6. Enter Width (幅)",
            "7. Enter Depth (奥行き)",
            "8. Enter Height (高さ)",
            "9. Enter Origin Coordinates",
            "✓ Rectangular Solid Created"
          ]
        }
      }
    ]
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
