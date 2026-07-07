import { TutorialStep } from '../VideoTutorialViewer';
import vidMove from '../../../assets/3D_Video_Tutorial/basicOp_move.mp4';
import vidRotate from '../../../assets/3D_Video_Tutorial/basicOp_rotate.mp4';
import vidMirror from '../../../assets/3D_Video_Tutorial/basicOp_mirror.mp4';
import vidCopy from '../../../assets/3D_Video_Tutorial/basicOp_copy.mp4';

import moveMenu from '../../../assets/3D_Image_File/basic_operation2_move.png';
import itemEntryMove from '../../../assets/3D_Image_File/basic_operation2_item_entry_box.png';
import rotateIcon from '../../../assets/3D_Image_File/basic_operation3_rotate.png';
import rotateEntry from '../../../assets/3D_Image_File/basic_operation3_rotate_item_entry.png';
import mirrorIcon from '../../../assets/3D_Image_File/basic_operation3_mirror.png';
import copyIcon from '../../../assets/3D_Image_File/basic_operation3_copy.png';
import copyDistance from '../../../assets/3D_Image_File/basic_operation3_copy_distance.png';
import rotateCopyIcon from '../../../assets/3D_Image_File/basic_operation3_rotatecopy.png';
import rotateCopyAxis from '../../../assets/3D_Image_File/basic_operation3_rotate_copy.png';
import mirrorCopyIcon from '../../../assets/3D_Image_File/basic_operation3_mirror_copy.png';
import mirrorCopyResult from '../../../assets/3D_Image_File/basic_operation3_mirrorcopy.png';
import deleteIcon from '../../../assets/3D_Image_File/basic_operation3_delete.png';

export const moveTutorialSteps: TutorialStep[] = [
  {
    id: "move-0",
    title: "Move Tutorial - Step 1",
    text: "Select Move from the icon menu.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidMove,
    videoStart: 0,
    videoEnd: 4,
    imageSrc: moveMenu
  },
  {
    id: "move-1",
    title: "Move Tutorial - Step 2",
    text: "Click the entity to be moved, then right-click to proceed (Go). Specify the movement distance on the X, Y, and Z-axis on the item entry, then press Enter.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidMove,
    videoStart: 4,
    videoEnd: 20,
    imageSrc: itemEntryMove
  },
  {
    id: "move-2",
    title: "Move Tutorial - Step 3 (Alternative)",
    text: "Alternatively, click a point on the entity, then click at the desired destination in the 3D space.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidMove,
    videoStart: 24,
    videoEnd: 36
  }
];

export const rotateTutorialSteps: TutorialStep[] = [
  {
    id: "rotate-0",
    title: "Rotate Tutorial - Step 1",
    text: "Select Rotate from the icon menu.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidRotate,
    videoStart: 0,
    videoEnd: 4,
    imageSrc: rotateIcon
  },
  {
    id: "rotate-1",
    title: "Rotate Tutorial - Step 2",
    text: "Click the entity to be rotated, then right-click to proceed (Go).",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidRotate,
    videoStart: 4,
    videoEnd: 8
  },
  {
    id: "rotate-2",
    title: "Rotate Tutorial - Step 3",
    text: "Select 2-points to set the axis of rotation.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidRotate,
    videoStart: 8,
    videoEnd: 12
  },
  {
    id: "rotate-3",
    title: "Rotate Tutorial - Step 4",
    text: "Specify the desired angle of rotation on the item entry and press Enter.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidRotate,
    videoStart: 12,
    videoEnd: 19,
    imageSrc: rotateEntry
  }
];

export const mirrorTutorialSteps: TutorialStep[] = [
  {
    id: "mirror-0",
    title: "Mirror Tutorial - Step 1",
    text: "Select Mirror from the icon menu.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidMirror,
    videoStart: 0,
    videoEnd: 4,
    imageSrc: mirrorIcon
  },
  {
    id: "mirror-1",
    title: "Mirror Tutorial - Step 2",
    text: "Click the entity to be mirrored, then right-click to proceed (Go).",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidMirror,
    videoStart: 4,
    videoEnd: 8
  },
  {
    id: "mirror-2",
    title: "Mirror Tutorial - Step 3",
    text: "Select 3-points to set the plane where the entity will be mirrored or left-click on the face where the entity will be mirrored.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidMirror,
    videoStart: 8,
    videoEnd: 19
  }
];

export const copyTutorialSteps: TutorialStep[] = [
  {
    id: "copy-0",
    title: "Copy Tutorial - Step 1",
    text: "Select Copy from the icon menu.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCopy,
    videoStart: 0,
    videoEnd: 4,
    imageSrc: copyIcon
  },
  {
    id: "copy-1",
    title: "Copy Tutorial - Step 2",
    text: "Click the entity to be copied, then right-click to proceed (Go).",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCopy,
    videoStart: 4,
    videoEnd: 7
  },
  {
    id: "copy-2",
    title: "Copy Tutorial - Step 3",
    text: "Specify the distance on the X, Y and Z-axis and the number of copies needed then press Enter.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    videoSrc: vidCopy,
    videoStart: 7,
    videoEnd: 13,
    imageSrc: copyDistance
  }
];

export const rotateCopyTutorialSteps: TutorialStep[] = [
  {
    id: "rotatecopy-0",
    title: "Rotate Copy Tutorial - Step 1",
    text: "Same as rotate tool but makes a rotated duplicate of the entity.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    imageSrc: rotateCopyIcon
  },
  {
    id: "rotatecopy-1",
    title: "Rotate Copy Tutorial - Result",
    text: "Review the resulting rotated copy axis in your workspace.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    imageSrc: rotateCopyAxis
  }
];

export const mirrorCopyTutorialSteps: TutorialStep[] = [
  {
    id: "mirrorcopy-0",
    title: "Mirror Copy Tutorial - Step 1",
    text: "Same as mirror tool but makes a mirror duplicate of the entity.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    imageSrc: mirrorCopyIcon
  },
  {
    id: "mirrorcopy-1",
    title: "Mirror Copy Tutorial - Result",
    text: "Review the resulting mirror copy layout in your workspace.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    imageSrc: mirrorCopyResult
  }
];

export const deleteTutorialSteps: TutorialStep[] = [
  {
    id: "delete-0",
    title: "Delete Tutorial - Step 1",
    text: "Select Delete from the icon menu.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    imageSrc: deleteIcon
  },
  {
    id: "delete-1",
    title: "Delete Tutorial - Step 2",
    text: "Left-click on the entity to delete.",
    zoom: "scale(1)",
    origin: "center",
    spotlight: { top: "0%", left: "0%", width: "100%", height: "100%", opacity: 0 },
    subtitlePos: { top: "82%", left: "50%", transform: "translateX(-50%)" },
    imageSrc: deleteIcon
  }
];
