import { FilePlus, Folder, FolderOpen, Save, X } from "lucide-react";
import { LucideIcon } from "lucide-react";


export interface TreeViewOption {
    title: string;
    children?: TreeViewOption[];
    icon?: LucideIcon;
}


export const treeViewOptions: TreeViewOption[] = [
    {
        title: "NewDraw_1",
        children: [
            {
                icon: FolderOpen, title: "Open",

            },
            {
                title: "Save",
            },
            {
                title: "Save As",
            },
            {
                title: "Close",
            },
        ],
    },
];