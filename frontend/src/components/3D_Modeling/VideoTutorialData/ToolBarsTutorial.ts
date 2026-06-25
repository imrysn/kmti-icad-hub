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
    spotlight: { top: "4%", left: "0%", width: "8%", height: "4.5%", opacity: 1 },
    subtitlePos: { top: "15%", left: "5%" }
  },
  {
    id: "2d-view",
    title: "2D View",
    text: "Contains Previous View, Switch Views, Next View.",
    zoom: "scale(1)",
    origin: "20% 10%",
    spotlight: { top: "4%", left: "8%", width: "8%", height: "4.5%", opacity: 1 },
    subtitlePos: { top: "15%", left: "12%" }
  },
  {
    id: "switch-display",
    title: "Switch Display",
    text: "Contains Change Projection Method, Switch Dimensions.",
    zoom: "scale(1)",
    origin: "30% 10%",
    spotlight: { top: "4%", left: "16%", width: "8%", height: "4.5%", opacity: 1 },
    subtitlePos: { top: "15%", left: "20%" }
  },
  {
    id: "screen-ops",
    title: "Screen Operations",
    text: "Contains Set Zoom Area, Zoom In/Out, Zoom to Fit, Re-Display, Previous Zoom.",
    zoom: "scale(1)",
    origin: "40% 10%",
    spotlight: { top: "4%", left: "24%", width: "10%", height: "4.5%", opacity: 1 },
    subtitlePos: { top: "15%", left: "25%" }
  },
  {
    id: "3d-view",
    title: "3D View",
    text: "Contains Top, Front, Right, Left, Back, Bottom, Set a Plane, Set using 3-Points.",
    zoom: "scale(1)",
    origin: "50% 10%",
    spotlight: { top: "4%", left: "34%", width: "12%", height: "4.5%", opacity: 1 },
    subtitlePos: { top: "15%", left: "30%" }
  },
  {
    id: "user-views",
    title: "User Views",
    text: "Contains User View 1, 2, 3, 4 (ISOMETRIC VIEWS).",
    zoom: "scale(1)",
    origin: "60% 10%",
    spotlight: { top: "4%", left: "46%", width: "10%", height: "4.5%", opacity: 1 },
    subtitlePos: { top: "15%", left: "45%" }
  },
  {
    id: "edit",
    title: "Edit",
    text: "Contains Undo, Redo.",
    zoom: "scale(1)",
    origin: "70% 10%",
    spotlight: { top: "4%", left: "56%", width: "6%", height: "4.5%", opacity: 1 },
    subtitlePos: { top: "15%", left: "55%" }
  },
  {
    id: "shading",
    title: "Shading",
    text: "Contains Shading, Shading with Frame, Hidden Lines Removed, Wireframe.",
    zoom: "scale(1)",
    origin: "80% 10%",
    spotlight: { top: "4%", left: "62%", width: "10%", height: "4.5%", opacity: 1 },
    subtitlePos: { top: "15%", left: "60%" }
  },
  {
    id: "section",
    title: "Section Display",
    text: "Contains Open Work Plane, Switch to Section Display.",
    zoom: "scale(1)",
    origin: "90% 10%",
    spotlight: { top: "4%", left: "72%", width: "8%", height: "4.5%", opacity: 1 },
    subtitlePos: { top: "15%", left: "70%" }
  },
  {
    id: "2d-standard",
    title: "2D Standard Screen",
    text: "Contains Set Standard Screen Range, Set Display Screen, Display Standard Screen.",
    zoom: "scale(1)",
    origin: "0% 50%",
    spotlight: { top: "8.5%", left: "2.2%", width: "7.8%", height: "81.5%", opacity: 1 },
    subtitlePos: { top: "30%", left: "15%" }
  },
  {
    id: "sys-info",
    title: "System Information",
    text: "Setting for attributes of entities to be created.",
    zoom: "scale(1)",
    origin: "50% 15%",
    spotlight: { top: "6.2%", left: "0%", width: "100%", height: "2.3%", opacity: 1 },
    subtitlePos: { top: "12%", left: "50%", transform: "translateX(-50%)" }
  },
  {
    id: "screen-mem",
    title: "Screen Memory",
    text: "Stores the currently displayed screen.",
    zoom: "scale(1)",
    origin: "100% 50%",
    spotlight: { top: "8.5%", left: "95%", width: "5%", height: "81.5%", opacity: 1 },
    subtitlePos: { top: "30%", right: "10%" }
  },
  {
    id: "entry-control",
    title: "Entry Control",
    text: "The method for entity selection and coordinate entry can be specified.",
    zoom: "scale(1)",
    origin: "0% 100%",
    spotlight: { top: "90%", left: "0%", width: "30%", height: "10%", opacity: 1 },
    subtitlePos: { bottom: "15%", left: "5%" }
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
