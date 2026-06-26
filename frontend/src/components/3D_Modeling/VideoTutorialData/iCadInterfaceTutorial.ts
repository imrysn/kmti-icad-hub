import { TutorialStep } from "../VideoTutorialModal";

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 0,
    title: "Overview",
    text: "Welcome to this iCAD interface tutorial. Today, we'll walk through the workspace, which is divided into several key functional areas designed for maximum modeling efficiency.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
  },
  {
    id: 1,
    title: "Navigation and Commands",
    text: "As we move through this guide, we'll highlight the specific purpose of the command menus, the hierarchical tree view, and the primary 3D viewport where your designs come to life.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
  },
  {
    id: 2,
    title: "Title Bar",
    text: "At the very top, we have the Title Bar. This displays the name of the software and typically the name of the document you are currently working on.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "2%", opacity: 1 },
    subtitlePos: { top: "6%", left: "50%", transform: "translateX(-50%)" }
  },
  {
    id: 3,
    title: "Menu Bar",
    text: "Just below that is the Menu Bar. Here you can find standard drop-down menus for essential functions, such as File, View, Information, Set, Tool, Window, and Help.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "1.7%", left: "0%", width: "100%", height: "2.6%", opacity: 1 },
    subtitlePos: { top: "6.5%", left: "50%", transform: "translateX(-50%)" }
  },
  {
    id: 5,
    title: "Command Menu",
    text: "On the far left side, you'll find the Command Menu. This contains sets of available commands associated with different functions, frequently used when working in 2D mode.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "26.7%", left: "0%", width: "7.8%", height: "73%", opacity: 1 },
    subtitlePos: { top: "30%", left: "9%" }
  },
  {
    id: 6,
    title: "Tree View",
    text: "Next to it is the Tree View. This pane organizes and displays all the 3D parts and groups for your current drawing in an easy-to-read hierarchical structure.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "9.2%", left: "7.5%", width: "13.1%", height: "86.4%", opacity: 1 },
    subtitlePos: { top: "30%", left: "22%" }
  },
  {
    id: 7,
    title: "Workspace",
    text: "In the center is the main Workspace. This large, prominent area is where all of your actual 3D Modeling and Assembly operations take place.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "9.2%", left: "20.2%", width: "70.9%", height: "86.4%", opacity: 1 },
    subtitlePos: { bottom: "12%", left: "22%" }
  },
  {
    id: 8,
    title: "Icon Menu",
    text: "Over on the far right side is the Icon Menu. It contains additional quick-access visual buttons to perform various operations on your 3D Models.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "9.2%", left: "90.7%", width: "9.2%", height: "86.4%", opacity: 1 },
    subtitlePos: { top: "30%", right: "10.5%" }
  },
  {
    id: 9,
    title: "Item Entry",
    text: "Down at the bottom left, we have the Item Entry area. This is used for entering the specific values and characters necessary for command execution.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "94.8%", left: "7.5%", width: "30%", height: "3.7%", opacity: 1 },
    subtitlePos: { bottom: "10%", left: "7.5%" }
  },
  {
    id: 10,
    title: "Key Entry",
    text: "Right next to it is the Key Entry Area, where precise coordinates and other numeric values can be entered manually.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "94.8%", left: "37.3%", width: "62.6%", height: "3.7%", opacity: 1 },
    subtitlePos: { bottom: "10%", left: "37.3%" }
  },
  {
    id: 4,
    title: "Tool Bar",
    text: "Below the menus is the Tool Bar. It contains a set of quick-access icons that can be displayed or hidden based on your workflow needs.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "3.3%", left: "7.5%", width: "92.5%", height: "6.6%", opacity: 1 },
    subtitlePos: { top: "11%", left: "50%", transform: "translateX(-50%)" }
  },
  {
    id: 11,
    title: "Message Pane",
    text: "Finally, on the bottom right is the Message Pane. It displays messages related to your operations, with errors clearly highlighted in red. This concludes our interface overview.",
    zoom: "scale(1)",
    origin: "50% 50%",
    spotlight: { top: "98%", left: "7.5%", width: "92.5%", height: "3%", opacity: 1 },
    subtitlePos: { bottom: "10%", left: "50%", transform: "translateX(-50%)" }
  }
];
