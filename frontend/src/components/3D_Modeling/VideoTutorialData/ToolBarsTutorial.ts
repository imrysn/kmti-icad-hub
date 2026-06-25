import { TutorialStep } from "../VideoTutorialModal";

export const TOOLBAR_TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: "intro",
    title: "Tool Bars Overview",
    text: "Welcome to the Tool Bars tutorial! In this guide, we will walk through the various quick-access menus at the top of the workspace and explore what each section does.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
  },
  {
    id: "file",
    title: "File",
    text: "Contains new, open, save, print commands.",
    zoom: "scale(1)",
    origin: "10% 10%",
    spotlight: { top: "3.3%", left: "7.8%", width: "6.2%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", left: "10.9%", transform: "translateX(-50%)" }
  },
  {
    id: "switch-display",
    title: "Switch Display",
    text: "Contains Change Projection Method, Switch Dimensions.",
    zoom: "scale(1)",
    origin: "20% 10%",
    spotlight: { top: "3.3%", left: "13.6%", width: "3.8%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", left: "15.5%", transform: "translateX(-50%)" }
  },
  {
    id: "user-views",
    title: "User View",
    text: "Contains User View 1, 2, 3, 4 (ISOMETRIC VIEWS).",
    zoom: "scale(1)",
    origin: "30% 10%",
    spotlight: { top: "3.3%", left: "17%", width: "6.3%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", left: "20.15%", transform: "translateX(-50%)" }
  },
  {
    id: "screen-ops",
    title: "Screen Operations",
    text: "Contains Set Zoom Area, Zoom In/Out, Zoom to Fit, Re-Display, Previous Zoom.",
    zoom: "scale(1)",
    origin: "40% 10%",
    spotlight: { top: "3.3%", left: "22.9%", width: "8.8%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", left: "27.3%", transform: "translateX(-50%)" }
  },
  {
    id: "edit",
    title: "Edit",
    text: "Contains Undo, Redo.",
    zoom: "scale(1)",
    origin: "50% 10%",
    spotlight: { top: "3.3%", left: "31.3%", width: "3.7%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", left: "33.15%", transform: "translateX(-50%)" }
  },
  {
    id: "3d-view",
    title: "3D View",
    text: "Contains Top, Front, Right, Left, Back, Bottom, Set a Plane, Set using 3-Points.",
    zoom: "scale(1)",
    origin: "60% 10%",
    spotlight: { top: "3.3%", left: "34.7%", width: "11.3%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", left: "40.35%", transform: "translateX(-50%)" }
  },
  {
    id: "shading",
    title: "Shading",
    text: "Contains Shading, Shading with Frame, Hidden Lines Removed, Wireframe.",
    zoom: "scale(1)",
    origin: "70% 10%",
    spotlight: { top: "3.3%", left: "45.5%", width: "7.5%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", left: "49.25%", transform: "translateX(-50%)" }
  },
  {
    id: "section",
    title: "Section Display",
    text: "Contains Open Work Plane, Switch to Section Display.",
    zoom: "scale(1)",
    origin: "80% 10%",
    spotlight: { top: "3.3%", left: "52.7%", width: "3.6%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", left: "54.5%", transform: "translateX(-50%)" }
  },
  {
    id: "2d-view",
    title: "2D View",
    text: "Contains Previous View, Switch Views, Next View.",
    zoom: "scale(1)",
    origin: "90% 10%",
    spotlight: { top: "3.3%", left: "56.1%", width: "5%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", left: "58.6%", transform: "translateX(-50%)" }
  },
  {
    id: "entry-control",
    title: "Entry Control",
    text: "The method for entity selection and coordinate entry can be specified.",
    zoom: "scale(1)",
    origin: "95% 10%",
    spotlight: { top: "3.3%", left: "60.7%", width: "26.7%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", left: "74.05%", transform: "translateX(-50%)" }
  },
  {
    id: "screen-mem",
    title: "Screen Memory",
    text: "Stores the currently displayed screen.",
    zoom: "scale(1)",
    origin: "100% 10%",
    spotlight: { top: "3.3%", left: "87.2%", width: "9.5%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "10%", right: "2%" }
  },
  {
    id: "entry-tool",
    title: "Entry Tool",
    text: "Additional entity selection tools.",
    zoom: "scale(1)",
    origin: "100% 10%",
    spotlight: { top: "6.2%", left: "7.8%", width: "40%", height: "3.8%", opacity: 1 },
    subtitlePos: { top: "13%", left: "27.8%", transform: "translateX(-50%)" }
  },
  {
    id: "outro",
    title: "Conclusion",
    text: "This concludes our tour of the Tool Bars. You can now use these quick-access commands to speed up your modeling workflow!",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
  }
];
