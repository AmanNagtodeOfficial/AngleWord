
"use client";

import { Editor } from "@tiptap/react";
import {
  Eraser,
  Pen,
  Highlighter,
  Plus,
  ChevronDown,
  Ruler,
  Palette,
  Shapes,
  Sigma,
  HelpCircle,
} from "lucide-react";
import { FC } from "react";
import { RibbonGroup, RibbonButton } from "../ribbon-ui";
import { Button } from "@/components/ui/button";

interface DesignTabProps {
  editor: Editor | null;
}

const PenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
)

const PencilIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
)

const FormatBackgroundIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z"/><path d="M9 4v16"/><path d="M14 4v16"/><path d="M4 9h16"/><path d="M4 14h16"/></svg>
)

const InkToMathIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.1,2.9C14.2,6,12.5,9.8,12.2,14"/><path d="M11.8,14c-1.6,0.2-3.2,0.3-4.8,0.3c-2,0-3.9-0.5-5.5-1.4"/><path d="M10,14.3c0,1.5-0.1,2.9-0.2,4.4c-0.1,1.1-0.2,2.3-0.2,3.4"/><path d="M14.9,2.9C17.8,6,19.5,9.8,19.8,14"/><path d="M20.2,14c1.6,0.2,3.2,0.3,4.8,0.3c2,0,3.9-0.5,5.5-1.4"/><path d="M22,14.3c0,1.5,0.1,2.9,0.2,4.4c0.1,1.1,0.2,2.3,0.2,3.4"/><path d="M5.1,19.6c1.1,0,2.1,0,3.2,0c1.1,0,2.1,0,3.2,0"/></svg>
)

const DrawingCanvasIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-dot"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="1"/></svg>
)

export const DesignTab: FC<DesignTabProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex items-start">
      <RibbonGroup title="Tools">
        <RibbonButton icon={Eraser}>Eraser</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Pens">
        <RibbonButton icon={Pen}>Black Pen</RibbonButton>
        <RibbonButton icon={Pen} className="text-red-500">Red Pen</RibbonButton>
        <RibbonButton icon={PencilIcon} className="text-gray-500">Pencil</RibbonButton>
        <RibbonButton icon={Highlighter} className="text-yellow-400">Highlighter</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Stencils">
        <RibbonButton icon={Plus}>
            Add
            <ChevronDown className="inline w-3 h-3 ml-0.5" />
        </RibbonButton>
        <RibbonButton icon={Ruler}>Ruler</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Edit">
        <RibbonButton icon={FormatBackgroundIcon}>
            Format
            <br />
            Background
            <ChevronDown className="inline w-3 h-3 ml-0.5" />
        </RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Convert">
        <RibbonButton icon={Shapes}>Ink to Shape</RibbonButton>
        <RibbonButton icon={InkToMathIcon}>Ink to Maths</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Insert">
        <RibbonButton icon={DrawingCanvasIcon}>Drawing Canvas</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Help">
        <RibbonButton icon={HelpCircle}>Ink Help</RibbonButton>
      </RibbonGroup>
    </div>
  );
};
