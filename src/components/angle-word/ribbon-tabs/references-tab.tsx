
"use client";

import { Editor } from "@tiptap/react";
import {
  Book,
  Footprints,
  ListOrdered,
  ChevronDown,
  BookMarked,
  FileText,
  BookCopy,
  Plus,
  ArrowDownUp,
  Link2,
  ListPlus,
  FileSearch,
  BookCheck,
} from "lucide-react";
import { FC } from "react";
import { RibbonGroup, RibbonButton } from "../ribbon-ui";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ReferencesTabProps {
  editor: Editor | null;
}

const InsertFootnoteIcon = () => (
    <div className="relative w-8 h-8">
        <span className="absolute top-0 left-0 text-2xl font-serif">AB</span>
        <span className="absolute -top-1 right-0 text-xs text-red-500 font-bold">1</span>
    </div>
);

export const ReferencesTab: FC<ReferencesTabProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex items-start p-2">
            <RibbonGroup title="Table of Contents">
                <RibbonButton icon={ListOrdered}>
                Table of
                <br />
                Contents
                <ChevronDown className="inline w-3 h-3 ml-0.5" />
                </RibbonButton>
                <div className="flex flex-col space-y-1">
                <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                    <Plus className="w-4 h-4 mr-2" /> Add Text <ChevronDown className="w-3 h-3 ml-auto" />
                </Button>
                <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                    <ArrowDownUp className="w-4 h-4 mr-2" /> Update Table
                </Button>
                </div>
            </RibbonGroup>

            <RibbonGroup title="Footnotes">
                <RibbonButton icon={InsertFootnoteIcon}>
                Insert
                <br />
                Footnote
                </RibbonButton>
                <div className="flex flex-col space-y-1">
                <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                    <Footprints className="w-4 h-4 mr-2" /> Insert Endnote
                </Button>
                <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                    <BookMarked className="w-4 h-4 mr-2" /> Next Footnote <ChevronDown className="w-3 h-3 ml-auto" />
                </Button>
                <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                    <FileText className="w-4 h-4 mr-2" /> Show Notes
                </Button>
                </div>
            </RibbonGroup>

            <RibbonGroup title="Citations & Bibliography">
                <RibbonButton icon={BookCopy}>
                Insert
                <br />
                Citation
                <ChevronDown className="inline w-3 h-3 ml-0.5" />
                </RibbonButton>
                <div className="flex flex-col space-y-1">
                <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                    Manage Sources
                </Button>
                <div className="flex items-center text-xs px-1">
                    <span className="mr-2">Style:</span>
                    <Select defaultValue="apa">
                        <SelectTrigger className="h-6 w-24 text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="apa">APA</SelectItem>
                            <SelectItem value="mla">MLA</SelectItem>
                            <SelectItem value="chicago">Chicago</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                    Bibliography <ChevronDown className="w-3 h-3 ml-auto" />
                </Button>
                </div>
            </RibbonGroup>
            
            <RibbonGroup title="Captions">
                <RibbonButton icon={ListPlus}>
                    Insert
                    <br />
                    Caption
                </RibbonButton>
                <div className="flex flex-col space-y-1">
                    <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                        Insert Table of Figures
                    </Button>
                    <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                        Update Table
                    </Button>
                    <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                        <Link2 className="w-4 h-4 mr-2" /> Cross-reference
                    </Button>
                </div>
            </RibbonGroup>

            <RibbonGroup title="Index">
                <RibbonButton icon={FileSearch}>
                    Mark
                    <br />
                    Entry
                </RibbonButton>
                <div className="flex flex-col space-y-1">
                    <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                        Insert Index
                    </Button>
                    <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                        Update Index
                    </Button>
                </div>
            </RibbonGroup>

            <RibbonGroup title="Table of Authorities">
                <RibbonButton icon={BookCheck}>
                    Mark
                    <br />
                    Citation
                </RibbonButton>
                <div className="flex flex-col space-y-1">
                    <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                        Insert Table of Authorities
                    </Button>
                    <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                        Update Table
                    </Button>
                </div>
            </RibbonGroup>
        </div>
        <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
