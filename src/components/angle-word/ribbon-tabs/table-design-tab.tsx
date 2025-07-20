
"use client";

import { Editor } from "@tiptap/react";
import { FC } from "react";
import { RibbonGroup, RibbonButton } from "../ribbon-ui";
import { Button } from "@/components/ui/button";
import { 
    ChevronDown,
    PaintBucket,
    Pen,
} from "lucide-react";

interface TableDesignTabProps {
  editor: Editor | null;
}


export const TableDesignTab: FC<TableDesignTabProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex items-start">
        <RibbonGroup title="Table Styles">
            <div className="p-1 border bg-secondary/30 h-full w-[300px] flex items-center justify-center text-muted-foreground text-sm">
                Styles Gallery
            </div>
             <Button variant="ghost" className="h-auto p-1 justify-start text-xs flex-col">
                  <PaintBucket className="w-4 h-4" />
                  <span>Shading</span>
             </Button>
             <Button variant="ghost" className="h-auto p-1 justify-start text-xs flex-col">
                  <Pen className="w-4 h-4" />
                  <span>Pen Color</span>
             </Button>
        </RibbonGroup>

    </div>
  );
};
