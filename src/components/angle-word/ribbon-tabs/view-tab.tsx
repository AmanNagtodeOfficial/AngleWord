
"use client";

import { Editor } from "@tiptap/react";
import {
  AppWindow,
  BookOpen,
  Code2,
  GalleryHorizontal,
  GalleryVerticalEnd,
  Globe,
  Grid3x3,
  LayoutGrid,
  PanelLeftOpen,
  Percent,
  PrinterIcon,
  RectangleHorizontal,
  Ruler,
  SplitSquareVertical,
  StretchHorizontal,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { FC } from "react";
import { RibbonGroup, RibbonButton } from "../ribbon-ui";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ViewTabProps {
  editor: Editor | null;
  isRulerVisible: boolean;
  toggleRuler: () => void;
}

export const ViewTab: FC<ViewTabProps> = ({ editor, isRulerVisible, toggleRuler }) => {
  if (!editor) return null;

  return (
    <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex items-start p-2">
            <RibbonGroup title="Views">
                <RibbonButton icon={BookOpen}>Read Mode</RibbonButton>
                <RibbonButton icon={PrinterIcon}>Print Layout</RibbonButton>
                <RibbonButton icon={Globe}>Web Layout</RibbonButton>
            </RibbonGroup>
            <RibbonGroup title="Show">
                <div className="flex flex-col">
                <Button variant="ghost" className="h-auto p-1 text-xs justify-start w-full hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-accent" onClick={toggleRuler} data-active={isRulerVisible}>
                    <Ruler className="w-4 h-4 mr-2" /> Ruler
                </Button>
                <Button variant="ghost" className="h-auto p-1 text-xs justify-start w-full hover:bg-accent hover:text-accent-foreground">
                    <Grid3x3 className="w-4 h-4 mr-2" /> Gridlines
                </Button>
                <Button variant="ghost" className="h-auto p-1 text-xs justify-start w-full hover:bg-accent hover:text-accent-foreground">
                    <PanelLeftOpen className="w-4 h-4 mr-2" /> Navigation Pane
                </Button>
                </div>
            </RibbonGroup>
            <RibbonGroup title="Zoom">
                <RibbonButton icon={ZoomIn}>Zoom In</RibbonButton>
                <RibbonButton icon={ZoomOut}>Zoom Out</RibbonButton>
                <RibbonButton icon={Percent}>100%</RibbonButton>
                <RibbonButton icon={RectangleHorizontal}>One Page</RibbonButton>
                <RibbonButton icon={GalleryVerticalEnd}>Multi Page</RibbonButton>
                <RibbonButton icon={StretchHorizontal}>Page Width</RibbonButton>
            </RibbonGroup>
            <RibbonGroup title="Window">
                <RibbonButton icon={AppWindow}>New</RibbonButton>
                <RibbonButton icon={LayoutGrid}>Arrange All</RibbonButton>
                <RibbonButton icon={SplitSquareVertical}>Split</RibbonButton>
                <RibbonButton icon={GalleryHorizontal}>Switch</RibbonButton>
            </RibbonGroup>
            <RibbonGroup title="Macros">
                <RibbonButton icon={Code2}>Macros</RibbonButton>
            </RibbonGroup>
        </div>
        <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
