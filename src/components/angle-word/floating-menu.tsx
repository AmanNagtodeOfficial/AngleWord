
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
import { useCallback, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

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
  { name: 'Calibri', value: 'Calibri, sans-serif' },
  { name: 'Cambria', value: 'Cambria, serif' },
  { name: 'Courier New', value: 'Courier New, monospace' },
];

const FONT_SIZES = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'];


export function FloatingMenu({ editor }: FloatingMenuProps) {

  const currentFontFamily = useCallback(() => {
    for (const family of FONT_FAMILIES) {
      if (editor.isActive('textStyle', { fontFamily: family.value })) {
        return family.name;
      }
    }
    return editor.getAttributes('textStyle').fontFamily?.split(',')[0].replace(/['"]/g, '') || 'Candara';
  }, [editor]);
  
  const currentFontSize = useCallback(() => {
    return editor.getAttributes('textStyle').fontSize?.replace('pt', '') || '10';
  }, [editor]);

  const [fontSizeInput, setFontSizeInput] = useState(currentFontSize());

  useEffect(() => {
    const handleSelectionUpdate = () => {
      setFontSizeInput(currentFontSize());
    };
    editor.on('selectionUpdate', handleSelectionUpdate);
    editor.on('transaction', handleSelectionUpdate);
    return () => {
        editor.off('selectionUpdate', handleSelectionUpdate);
        editor.off('transaction', handleSelectionUpdate);
    };
  }, [editor, currentFontSize]);

  const setFontSize = (size: string) => {
    const numSize = parseInt(size, 10);
    if (!isNaN(numSize) && numSize > 0) {
      editor.chain().focus().setMark('textStyle', { fontSize: `${numSize}pt` }).run();
      setFontSizeInput(size);
    }
  };

  const handleIncreaseFontSize = () => {
    const currentSize = parseInt(currentFontSize(), 10);
    const currentIndex = FONT_SIZES.map(s => parseInt(s, 10)).findIndex(s => s >= currentSize);
    
    if (currentIndex > -1 && currentIndex < FONT_SIZES.length - 1) {
      const newSize = FONT_SIZES[currentIndex + 1];
      setFontSize(newSize);
    } else if (currentSize < 72) {
      setFontSize(String(currentSize + 1));
    }
  };

  const handleDecreaseFontSize = () => {
    const currentSize = parseInt(currentFontSize(), 10);
    const fontSizesNum = FONT_SIZES.map(s => parseInt(s, 10));
    let newIndex = -1;
    for(let i = fontSizesNum.length - 1; i >= 0; i--) {
        if(fontSizesNum[i] < currentSize) {
            newIndex = i;
            break;
        }
    }
    
    if (newIndex > -1) {
      const newSize = FONT_SIZES[newIndex];
      setFontSize(newSize);
    } else if (currentSize > 1) {
      setFontSize(String(currentSize - 1));
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

        <div className="flex items-center border rounded-md h-7">
            <Input
                type="text"
                value={fontSizeInput}
                onChange={(e) => setFontSizeInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setFontSize(fontSizeInput);
                        e.currentTarget.blur();
                    }
                }}
                onBlur={() => setFontSize(fontSizeInput)}
                className="p-1 text-xs h-full w-8 border-0 focus-visible:ring-0"
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-1 h-full w-5 border-l rounded-l-none">
                        <ChevronDown className="w-3 h-3" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {FONT_SIZES.map(size => (
                        <DropdownMenuItem key={size} onSelect={() => setFontSize(size)}>
                            {size}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>


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
