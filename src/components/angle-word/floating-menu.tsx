
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
  Underline,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useCallback, useState, useEffect, useRef, SVGProps } from "react";
import { Input } from "@/components/ui/input";

interface FloatingMenuProps {
  editor: Editor;
}

const FONT_FAMILIES = [
    { name: 'Arial', value: 'Arial, sans-serif' },
    { name: 'Calibri', value: 'Calibri, sans-serif' },
    { name: 'Cambria', value: 'Cambria, serif' },
    { name: 'Candara', value: 'Candara, sans-serif' },
    { name: 'Courier New', value: 'Courier New, monospace' },
    { name: 'Georgia', value: 'Georgia, serif' },
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Lato', value: 'Lato, sans-serif' },
    { name: 'Merriweather', value: 'Merriweather, serif' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif' },
    { name: 'Noto Sans', value: 'Noto Sans, sans-serif' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif' },
    { name: 'Oswald', value: 'Oswald, sans-serif' },
    { name: 'PT Sans', value: 'PT Sans, sans-serif' },
    { name: 'Playfair Display', value: 'Playfair Display, serif' },
    { name: 'Raleway', value: 'Raleway, sans-serif' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Roboto Mono', value: 'Roboto Mono, monospace' },
    { name: 'Tahoma', value: 'Tahoma, sans-serif' },
    { name: 'Times New Roman', value: 'Times New Roman, Times, serif' },
    { name: 'Verdana', value: 'Verdana, sans-serif' },
];

const FONT_SIZES = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'];
const FONT_COLORS = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#800000', '#008000', '#000080', '#808000', '#800080', '#008080', '#C0C0C0', '#808080',
];
const HIGHLIGHT_COLORS = [
  '#FFFF00', '#00FF00', '#FFC0CB', '#ADD8E6', '#FFA500', '#800080',
  '#FF0000', '#C0C0C0', '#00FFFF', '#F0E68C', '#E6E6FA', '#FFF0F5',
];


const UnderlineStyleIcon = ({ style, color = 'currentColor', ...props }: { style: string, color?: string } & SVGProps<SVGSVGElement>) => (
    <svg width="100" height="10" viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg" {...props}>
        <line 
            x1="0" 
            y1="5" 
            x2="100" 
            y2="5" 
            stroke={color} 
            strokeWidth={style === 'solid-thick' ? "2" : "1"}
            strokeDasharray={
                style === 'dotted' ? '2 3' :
                style === 'dashed' ? '6 4' :
                'none'
            }
        />
        {style === 'double' && <line x1="0" y1="8" x2="100" y2="8" stroke={color} strokeWidth="1" />}
        {style === 'wavy' && <path d="M 0,5 C 5,2 10,8 15,5 S 25,2 30,5 S 40,8 45,5 S 55,2 60,5 S 70,8 75,5 S 85,2 90,5 S 100,8 100,5" stroke={color} fill="none" strokeWidth="1"/>}
    </svg>
);

const UNDERLINE_STYLES = [
    { name: 'solid', component: (props: any) => <UnderlineStyleIcon style="solid" {...props} /> },
    { name: 'double', component: (props: any) => <UnderlineStyleIcon style="double" {...props} /> },
    { name: 'solid-thick', component: (props: any) => <UnderlineStyleIcon style="solid-thick" {...props} /> },
    { name: 'dotted', component: (props: any) => <UnderlineStyleIcon style="dotted" {...props} /> },
    { name: 'dashed', component: (props: any) => <UnderlineStyleIcon style="dashed" {...props} /> },
    { name: 'wavy', component: (props: any) => <UnderlineStyleIcon style="wavy" {...props} /> },
];

export function FloatingMenu({ editor }: FloatingMenuProps) {
  const underlineColorInputRef = useRef<HTMLInputElement>(null);

  const currentFontFamilyName = useCallback(() => {
    for (const family of FONT_FAMILIES) {
      if (editor.isActive('textStyle', { fontFamily: family.value })) {
        return family.name;
      }
    }
    return editor.getAttributes('textStyle').fontFamily?.split(',')[0].replace(/['"]/g, '') || 'Arial';
  }, [editor]);
  
  const currentFontSize = useCallback(() => {
    return editor.getAttributes('textStyle').fontSize?.replace('pt', '') || '11';
  }, [editor]);

  const [fontFamilyInput, setFontFamilyInput] = useState(currentFontFamilyName());
  const [fontSizeInput, setFontSizeInput] = useState(currentFontSize());

  useEffect(() => {
    const handleUpdate = () => {
      setFontSizeInput(currentFontSize());
      setFontFamilyInput(currentFontFamilyName());
    };
    editor.on('selectionUpdate', handleUpdate);
    editor.on('transaction', handleUpdate);
    return () => {
        editor.off('selectionUpdate', handleUpdate);
        editor.off('transaction', handleUpdate);
    };
  }, [editor, currentFontSize, currentFontFamilyName]);

  const setFontSize = (size: string) => {
    const numSize = parseInt(size, 10);
    if (!isNaN(numSize) && numSize > 0) {
      editor.chain().focus().setMark('textStyle', { fontSize: `${numSize}pt` }).run();
      setFontSizeInput(size);
    }
  };
  
  const setFontFamily = (family: string) => {
    const fontFamilyValue = FONT_FAMILIES.find(f => f.name.toLowerCase() === family.toLowerCase())?.value || family;
    editor.chain().focus().setFontFamily(fontFamilyValue).run();
    setFontFamilyInput(family);
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

  const activeUnderlineStyle = editor.getAttributes('underline')['data-underline-style'] || 'solid';
  const handleUnderline = (style?: string) => {
      if (style) {
          if (editor.isActive('underline') && activeUnderlineStyle === style) {
              editor.chain().focus().unsetUnderline().run();
          } else {
              editor.chain().focus().setUnderline().setAttributes('underline', { 'data-underline-style': style }).run();
          }
      } else {
          editor.chain().focus().toggleUnderline().run();
      }
  };

  const handleUnderlineColor = (color: string) => {
      editor.chain().focus().setUnderline().setAttributes('underline', { 'data-underline-color': color }).run();
  }


  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="bg-background border border-border rounded-md shadow-lg p-1 flex flex-col gap-1"
    >
      {/* Top Row */}
      <div className="flex items-center gap-1 px-1">
        <div className="flex items-center border rounded-md h-7">
            <Input
                type="text"
                value={fontFamilyInput}
                onChange={(e) => setFontFamilyInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setFontFamily(e.currentTarget.value);
                        e.currentTarget.blur();
                    }
                }}
                onBlur={(e) => setFontFamily(e.currentTarget.value)}
                className="p-1 text-xs h-full w-28 border-0 focus-visible:ring-0"
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-1 h-full w-5 border-l rounded-l-none">
                        <ChevronDown className="w-3 h-3" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {FONT_FAMILIES.map(font => (
                    <DropdownMenuItem
                        key={font.value}
                        onClick={() => setFontFamily(font.name)}
                        style={{fontFamily: font.value}}
                    >
                        {font.name}
                    </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>


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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7" data-active={editor.isActive('underline')}>
                    <Underline className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2">
                <div className="text-xs text-muted-foreground px-1 pb-1">Underline Style</div>
                {UNDERLINE_STYLES.map(style => (
                    <DropdownMenuItem key={style.name} className="p-1 h-6" onSelect={() => handleUnderline(style.name)}>
                        <style.component className="w-full h-2" />
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Underline Color</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="p-2">
                        <div className="text-xs text-muted-foreground px-1 pb-1">Standard Colors</div>
                        <div className="grid grid-cols-8 gap-1">
                            {FONT_COLORS.map(color => (
                            <DropdownMenuItem
                                key={color}
                                className="p-0 w-6 h-6 flex items-center justify-center cursor-pointer"
                                onSelect={(e) => { e.preventDefault(); handleUnderlineColor(color); }}
                            >
                                <div className="w-5 h-5 rounded-sm border" style={{ backgroundColor: color }}/>
                            </DropdownMenuItem>
                            ))}
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={(e) => { e.preventDefault(); underlineColorInputRef.current?.click(); }}>
                            More Colors...
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
        <input
            type="color"
            ref={underlineColorInputRef}
            className="absolute w-0 h-0 opacity-0"
            onChange={(e) => handleUnderlineColor(e.target.value)}
        />
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
            {HIGHLIGHT_COLORS.map(color => (
                <DropdownMenuItem key={color} onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}>{color}</DropdownMenuItem>
            ))}
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
            {FONT_COLORS.map(color => (
                <DropdownMenuItem key={color} onClick={() => editor.chain().focus().setColor(color).run()}>{color}</DropdownMenuItem>
            ))}
            <DropdownMenuItem onClick={() => editor.chain().focus().unsetColor().run()}>Default</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </BubbleMenu>
  );
}
