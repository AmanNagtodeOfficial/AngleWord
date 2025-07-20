
"use client";

import { Editor } from "@tiptap/react";
import {
  BarChart3,
  Bookmark,
  CalendarDays,
  Camera,
  ChevronDown,
  FilePlus2,
  Image as LucideImage,
  Link as LinkIcon,
  MessageSquare,
  Newspaper,
  Omega,
  Package,
  PanelBottom,
  PanelTop,
  PenTool,
  Projector,
  Shapes,
  Sigma,
  Table,
  Type,
  UnfoldVertical,
  Video,
  Link2,
  Hash,
  Box,
  Smile,
  Blocks,
  Baseline,
} from "lucide-react";
import { FC } from "react";
import { RibbonGroup, RibbonButton } from "../ribbon-ui";
import { Button } from "@/components/ui/button";

interface InsertTabProps {
  editor: Editor | null;
}

export const InsertTab: FC<InsertTabProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex items-start">
      <RibbonGroup title="Pages">
        <RibbonButton icon={Newspaper}>
          Cover Page
          <ChevronDown className="inline w-3 h-3 ml-0.5" />
        </RibbonButton>
        <div className="flex flex-col">
            <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                <FilePlus2 className="w-4 h-4 mr-2" /> Blank Page
            </Button>
            <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                <UnfoldVertical className="w-4 h-4 mr-2" /> Page Break
            </Button>
        </div>
      </RibbonGroup>
      <RibbonGroup title="Tables">
        <RibbonButton icon={Table}>
            Table
            <ChevronDown className="inline w-3 h-3 ml-0.5" />
        </RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Illustrations">
        <div className="flex flex-col">
           <RibbonButton icon={LucideImage}>
             Pictures
             <ChevronDown className="inline w-3 h-3 ml-0.5" />
           </RibbonButton>
        </div>
        <div className="flex flex-col">
           <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
               <Shapes className="w-4 h-4 mr-2" /> Shapes
           </Button>
           <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
               <Smile className="w-4 h-4 mr-2" /> Icons
           </Button>
           <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
               <Box className="w-4 h-4 mr-2" /> 3D Models
           </Button>
        </div>
        <div className="flex flex-col">
           <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
               <Projector className="w-4 h-4 mr-2" /> SmartArt
           </Button>
           <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
               <BarChart3 className="w-4 h-4 mr-2" /> Chart
           </Button>
           <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
               <Camera className="w-4 h-4 mr-2" /> Screenshot
           </Button>
        </div>
      </RibbonGroup>
      <RibbonGroup title="Media">
        <RibbonButton icon={Video}>
          Online Videos
          <ChevronDown className="inline w-3 h-3 ml-0.5" />
        </RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Links">
          <div className="flex flex-col">
             <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                 <LinkIcon className="w-4 h-4 mr-2" /> Link
             </Button>
             <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                 <Bookmark className="w-4 h-4 mr-2" /> Bookmark
             </Button>
             <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                 <Link2 className="w-4 h-4 mr-2" /> Cross-reference
             </Button>
          </div>
      </RibbonGroup>
       <RibbonGroup title="Comments">
        <RibbonButton icon={MessageSquare}>Comment</RibbonButton>
      </RibbonGroup>
       <RibbonGroup title="Header & Footer">
        <RibbonButton icon={PanelTop}>
            Header
            <ChevronDown className="inline w-3 h-3 ml-0.5" />
        </RibbonButton>
        <div className="flex flex-col">
          <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
              <PanelBottom className="w-4 h-4 mr-2" /> Footer
          </Button>
          <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
              <Hash className="w-4 h-4 mr-2" /> Page Number
          </Button>
        </div>
      </RibbonGroup>
      <RibbonGroup title="Text">
        <div className="flex flex-col">
          <RibbonButton icon={Type}>
            Text Box
            <ChevronDown className="inline w-3 h-3 ml-0.5" />
          </RibbonButton>
        </div>
        <div className="flex flex-col">
          <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
             <Blocks className="w-4 h-4 mr-2" /> Quick Parts
          </Button>
          <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
            A<span className="text-lg -mt-1 ml-px">A</span>
          </Button>
          <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
             <Baseline className="w-4 h-4 mr-2" /> Drop Cap
          </Button>
        </div>
        <div className="flex flex-col">
          <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
             <PenTool className="w-4 h-4 mr-2" /> Signature Line
          </Button>
          <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
            <CalendarDays className="w-4 h-4 mr-2" /> Date & Time
          </Button>
          <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
             <Package className="w-4 h-4 mr-2" /> Object
          </Button>
        </div>
      </RibbonGroup>
      <RibbonGroup title="Symbols">
        <RibbonButton icon={Sigma}>
            Equation
            <ChevronDown className="inline w-3 h-3 ml-0.5" />
        </RibbonButton>
        <RibbonButton icon={Omega}>
            Symbol
            <ChevronDown className="inline w-3 h-3 ml-0.5" />
        </RibbonButton>
      </RibbonGroup>
    </div>
  );
};
