import { TutorialStep } from "../../../3D_Modeling/VideoTutorialViewer";

export const SOLIDWORKS_TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 0,
    title: "Menu Bar",
    text: "Contains the commonly used tool buttons, the Application Menu, Pin Icon (used to show/hide the Application Menu), and Commonly Used Tools such as undo/redo, selection tool, rebuild, file properties and solidworks options settings.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "0%", left: "0%", width: "67%", height: "3.2%", opacity: 1 },
    subtitlePos: { top: "5%", left: "50%", transform: "translateX(-50%)" }
  },
  {
    id: 1,
    title: "Status Bar",
    text: "It shows information about the performance of the user. It also displays the function of the tool/command when the mouse pointed it. (Located at the bottom of SolidWorks Interface)",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "3.2%", left: "0%", width: "23%", height: "8.5%", opacity: 1 },
    subtitlePos: { top: "13%", left: "25%", transform: "translateX(-50%)" }
  },
  {
    id: 2,
    title: "Command Manager",
    text: "It is a toolbar that consist of different toolbar that has set of commands for every function.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "11.5%", left: "0%", width: "20.5%", height: "2%", opacity: 1 },
    subtitlePos: { top: "15%", left: "25%", transform: "translateX(-50%)" }
  },
  {
    id: 3,
    title: "Heads-up View Toolbar",
    text: "It contains quick access view manipulation commands such as Section View, View Orientation Display Style, Hide/Show Items, Edit Appearance, etc.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "12%", left: "40%", width: "26%", height: "2.8%", opacity: 1 },
    subtitlePos: { top: "17%", left: "50%", transform: "translateX(-50%)" }
  },
  {
    id: 4,
    title: "FeatureManager Tree View",
    text: "It displays all the features used in 3D modeling, parts inserted in 3D Assembly including the features used, and the views that are used in 2D Detailing including Bill of Materials.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "15%", left: "0%", width: "12.5%", height: "82%", opacity: 1 },
    subtitlePos: { top: "50%", left: "15%" }
  },
  {
    id: 5,
    title: "Coordinate System",
    text: "It shows the position of the 3D Model. (Located on the lower left area of Graphics Area)",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "88%", left: "13%", width: "6%", height: "9%", opacity: 1 },
    subtitlePos: { bottom: "18%", left: "20%" }
  }
];
