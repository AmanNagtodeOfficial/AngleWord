
"use client";

import { Editor } from "@tiptap/react";
import { FC } from "react";
import { RibbonGroup, RibbonButton } from "../ribbon-ui";
import { Button } from "@/components/ui/button";
import { 
    Palette, 
    Droplet, 
    Type, 
    CaseSensitive,
    SlidersHorizontal, 
    Wand2, 
    Check, 
    ChevronDown,
    FileImage,
    Paintbrush,
    Square
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";

interface DesignTabProps {
  editor: Editor | null;
}

const documentStyles = [
  { name: 'Basic', image: 'https://placehold.co/80x100', hint: 'document basic' },
  { name: 'Simple', image: 'https://placehold.co/80x100', hint: 'document simple' },
  { name: 'Elegant', image: 'https://placehold.co/80x100', hint: 'document elegant' },
  { name: 'Modern', image: 'https://placehold.co/80x100', hint: 'document modern' },
  { name: 'Formal', image: 'https://placehold.co/80x100', hint: 'document formal' },
  { name: 'Classic', image: 'https://placehold.co/80x100', hint: 'document classic' },
  { name: 'Bold', image: 'https://placehold.co/80x100', hint: 'document bold' },
  { name: 'Minimalist', image: 'https://placehold.co/80x100', hint: 'document minimalist' },
];


export const DesignTab: FC<DesignTabProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex items-start">
      <RibbonGroup title="Document Formatting">
        <div className="flex items-start gap-2">
            <RibbonButton icon={Palette}>
                Themes
                <ChevronDown className="inline w-3 h-3 ml-0.5" />
            </RibbonButton>

            <ScrollArea className="w-[500px] whitespace-nowrap rounded-md border">
              <div className="flex w-max space-x-2 p-2">
                {documentStyles.map((style, index) => (
                    <div key={index} className="flex-shrink-0 cursor-pointer group">
                        <div className="w-24 h-32 p-1 border-2 border-transparent group-hover:border-primary bg-background">
                            <Image
                                src={style.image}
                                alt={style.name}
                                width={88}
                                height={120}
                                className="object-contain w-full h-full"
                                data-ai-hint={style.hint}
                            />
                        </div>
                    </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            
            <div className="flex flex-col space-y-1 items-start pl-2 border-l">
                <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground w-full">
                    <Droplet className="w-4 h-4 mr-2" /> Colours <ChevronDown className="w-3 h-3 ml-auto" />
                </Button>
                <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground w-full">
                    <Type className="w-4 h-4 mr-2" /> Fonts <ChevronDown className="w-3 h-3 ml-auto" />
                </Button>
                <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground w-full">
                    <SlidersHorizontal className="w-4 h-4 mr-2" /> Paragraph Spacing <ChevronDown className="w-3 h-3 ml-auto" />
                </Button>
                <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground w-full">
                    <Wand2 className="w-4 h-4 mr-2" /> Effects <ChevronDown className="w-3 h-3 ml-auto" />
                </Button>
                 <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground w-full">
                    <Check className="w-4 h-4 mr-2" /> Set as Default
                </Button>
            </div>
        </div>
      </RibbonGroup>

      <RibbonGroup title="Page Background">
        <div className="flex flex-col space-y-1">
            <RibbonButton icon={FileImage}>
                Watermark
                <ChevronDown className="inline w-3 h-3 ml-0.5" />
            </RibbonButton>
        </div>
        <div className="flex flex-col space-y-1">
            <RibbonButton icon={Paintbrush}>
                Page Colour
                <ChevronDown className="inline w-3 h-3 ml-0.5" />
            </RibbonButton>
        </div>
        <div className="flex flex-col space-y-1">
            <RibbonButton icon={Square}>
                Page Borders
            </RibbonButton>
        </div>
      </RibbonGroup>
    </div>
  );
};
