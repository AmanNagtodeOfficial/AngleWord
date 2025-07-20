
"use client";

import { Editor } from "@tiptap/react";
import {
  Baseline,
  ChevronDown,
  Copyright,
  Droplet,
  PaintBucket,
  Palette,
  Save,
  Sparkles,
  Square,
  Type,
} from "lucide-react";
import { FC } from "react";
import { RibbonGroup, RibbonButton } from "../ribbon-ui";
import { Button } from "@/components/ui/button";

interface DesignTabProps {
  editor: Editor | null;
}

export const DesignTab: FC<DesignTabProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex items-start">
      <RibbonGroup title="Document Formatting">
        <RibbonButton icon={Palette}>
          Themes
          <ChevronDown className="inline w-3 h-3 ml-0.5" />
        </RibbonButton>
        {/* Style Gallery placeholder would go here if implemented */}
        <div className="flex flex-col items-start pl-2 space-y-0.5">
          <Button variant="ghost" className="h-auto p-1 text-xs justify-start w-full hover:bg-accent hover:text-accent-foreground">
            <Droplet className="w-4 h-4 mr-2" /> Colors <ChevronDown className="w-3 h-3 ml-auto" />
          </Button>
          <Button variant="ghost" className="h-auto p-1 text-xs justify-start w-full hover:bg-accent hover:text-accent-foreground">
            <Type className="w-4 h-4 mr-2" /> Fonts <ChevronDown className="w-3 h-3 ml-auto" />
          </Button>
          <Button variant="ghost" className="h-auto p-1 text-xs justify-start w-full hover:bg-accent hover:text-accent-foreground">
            <Baseline className="w-4 h-4 mr-2" /> Paragraph Spacing <ChevronDown className="w-3 h-3 ml-auto" />
          </Button>
          <Button variant="ghost" className="h-auto p-1 text-xs justify-start w-full hover:bg-accent hover:text-accent-foreground">
            <Sparkles className="w-4 h-4 mr-2" /> Effects <ChevronDown className="w-3 h-3 ml-auto" />
          </Button>
          <Button variant="ghost" className="h-auto p-1 text-xs justify-start w-full hover:bg-accent hover:text-accent-foreground">
            <Save className="w-4 h-4 mr-2" /> Set as Default
          </Button>
        </div>
      </RibbonGroup>
      <RibbonGroup title="Page Background">
         <RibbonButton icon={Copyright}>
           Watermark
           <ChevronDown className="inline w-3 h-3 ml-0.5" />
         </RibbonButton>
         <RibbonButton icon={PaintBucket}>
           Page Color
           <ChevronDown className="inline w-3 h-3 ml-0.5" />
         </RibbonButton>
         <RibbonButton icon={Square}>Page Borders</RibbonButton>
      </RibbonGroup>
    </div>
  );
};
