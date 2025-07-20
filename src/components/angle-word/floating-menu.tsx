
"use client";

import { Editor, BubbleMenu } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Highlighter,
  Palette,
  ChevronDown,
  List,
  ListOrdered,
  MessageSquarePlus,
  ALargeSmall,
  CaseLower,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useCallback } from "react";

interface FloatingMenuProps {
  editor: Editor;
}

const FONT_FAMILIES = [
  { name: "Candara", value: "Candara, sans-serif" },
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Inter", value: "Inter, sans-serif" },
  { name: "PT Sans", value: "PT Sans, sans-serif" },
  { name: "Tahoma", value: "Tahoma, sans-serif" },
  { name: "Times New Roman", value: "Times New Roman, Times, serif" },
  { name: "Verdana", value: "Verdana, sans-serif" },
];

const FONT_SIZES = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'];


export function FloatingMenu({ editor }: FloatingMenuProps) {

  const currentFontFamily = useCallback(() => {
    for (const family of FONT_FAMILIES) {
      if (editor.isActive('textStyle', { fontFamily: family.value })) {
        return family.name;
      }
    }
    return 'Candara';
  }, [editor.state.selection]);
  
  const currentFontSize = useCallback(() => {
    return editor.getAttributes('textStyle').fontSize?.replace('pt', '') || '10';
  }, [editor.state.selection]);

  const handleIncreaseFontSize = () => {
    const currentSize = currentFontSize();
    const currentIndex = FONT_SIZES.indexOf(currentSize);
    if (currentIndex > -1 && currentIndex < FONT_SIZES.length - 1) {
      const newSize = FONT_SIZES[currentIndex + 1];
      editor.chain().focus().setMark('textStyle', { fontSize: `${newSize}pt` }).run();
    }
  };

  const handleDecreaseFontSize = () => {
    const currentSize = currentFontSize();
    const currentIndex = FONT_SIZES.indexOf(currentSize);
    if (currentIndex > 0) {
      const newSize = FONT_SIZES[currentIndex - 1];
      editor.chain().focus().setMark('textStyle', { fontSize: `${newSize}pt` }).run();
    }
  };


  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="bg-background border border-border rounded-md shadow-lg p-1 flex flex-col gap-1"
    >
      {/* Top Row */}
      <div className="flex items-center gap-1 px-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-1 text-xs h-7 w-28 justify-between">
              <span className="truncate">{currentFontFamily()}</span>
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {FONT_FAMILIES.map(font => (
              <DropdownMenuItem
                key={font.value}
                onClick={() => editor.chain().focus().setFontFamily(font.value).run()}
                style={{fontFamily: font.value}}
              >
                {font.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-1 text-xs h-7 w-12 justify-between">
              {currentFontSize()}
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {FONT_SIZES.map(size => (
              <DropdownMenuItem key={size} onClick={() => editor.chain().focus().setMark('textStyle', { fontSize: `${size}pt` }).run()}>
                {size}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleIncreaseFontSize}><ALargeSmall className="w-4 h-4" /></Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleDecreaseFontSize}><CaseLower className="w-4 h-4" /></Button>
        <Separator orientation="vertical" className="h-5 mx-1" />
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => editor.chain().focus().toggleBulletList().run()} data-active={editor.isActive('bulletList')}><List className="w-4 h-4" /></Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => editor.chain().focus().toggleOrderedList().run()} data-active={editor.isActive('orderedList')}><ListOrdered className="w-4 h-4" /></Button>
        <Separator orientation="vertical" className="h-5 mx-1" />
        <Button variant="ghost" size="icon" className="h-7 w-7"><MessageSquarePlus className="w-4 h-4" /></Button>

      </div>
      
      {/* Bottom Row */}
      <div className="flex items-center gap-1 px-1">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => editor.chain().focus().toggleBold().run()} data-active={editor.isActive('bold')}>
          <Bold className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => editor.chain().focus().toggleItalic().run()} data-active={editor.isActive('italic')}>
          <Italic className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => editor.chain().focus().toggleStrike().run()} data-active={editor.isActive('strike')}>
          <Strikethrough className="w-4 h-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7" data-active={!!editor.getAttributes('highlight').color}>
              <Highlighter className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHighlight({ color: '#FFFF00' }).run()}>Yellow</DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHighlight({ color: '#00FF00' }).run()}>Green</DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().unsetHighlight().run()}>No color</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7" data-active={!!editor.getAttributes('textStyle').color}>
              <Palette className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => editor.chain().focus().setColor('#FF0000').run()}>Red</DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().setColor('#0000FF').run()}>Blue</DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().unsetColor().run()}>Default</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </BubbleMenu>
  );
}

    