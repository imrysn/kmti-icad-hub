import { TutorialStep } from "../../../3D_Modeling/VideoTutorialViewer";

export const SOLIDWORKS_TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 0,
    title: "SolidWorks Interface",
    text: "Welcome to the SOLIDWORKS Interface tutorial. Let's explore the different parts of the workspace.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "0%", left: "0%", width: "0%", height: "0%", opacity: 0 },
    subtitlePos: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
  },
  {
    id: 1,
    title: "Menu Bar",
    text: "Contains the commonly used tool buttons, the Application Menu, Pin Icon (used to show/hide the Application Menu), and Commonly Used Tools such as undo/redo, selection tool, rebuild, file properties and solidworks options settings.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "0%", left: "0%", width: "47%", height: "3%", opacity: 1 },
    subtitlePos: { top: "6%", left: "50%", transform: "translateX(-50%)" }
  },
  {
    id: 2,
    title: "Command Manager",
    text: "It is a toolbar that consist of different toolbar that has set of commands for every function.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "11%", left: "0%", width: "20%", height: "2.75%", opacity: 1 },
    subtitlePos: { top: "16%", left: "26%", transform: "translateX(-50%)" }
  },
  {
    id: 3,
    title: "Heads-up View Toolbar",
    text: "It contains quick access view manipulation commands such as Section View, View Orientation Display Style, Hide/Show Items, Edit Appearance, etc.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "11%", left: "47%", width: "19%", height: "3%", opacity: 1 },
    subtitlePos: { top: "17%", left: "50%", transform: "translateX(-50%)" }
  },
  {
    id: 4,
    title: "FeatureManager Tree View",
    text: "It displays all the features used in 3D modeling, parts inserted in 3D Assembly including the features used, and the views that are used in 2D Detailing including Bill of Materials.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "15%", left: "0%", width: "13%", height: "80%", opacity: 1 },
    subtitlePos: { top: "50%", left: "16%" }
  },
  {
    id: 5,
    title: "Graphics Area",
    text: "This is the main workspace where you create and interact with your 3D models and 2D drawings.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "13%", left: "17%", width: "83%", height: "83%", opacity: 1 },
    subtitlePos: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
  },
  {
    id: 6,
    title: "Coordinate System",
    text: "It shows the position of the 3D Model. (Located on the lower left area of Graphics Area)",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "85%", left: "13%", width: "4.45%", height: "12%", opacity: 1 },
    subtitlePos: { bottom: "14%", left: "20%" }
  },
  {
    id: 7,
    title: "Status Bar",
    text: "It shows information about the performance of the user. It also displays the function of the tool/command when the mouse pointed it. (Located at the bottom of SolidWorks Interface)",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "98%", left: "0%", width: "100%", height: "3%", opacity: 1 },
    subtitlePos: { bottom: "5%", left: "50%", transform: "translateX(-50%)" }
  }
];
