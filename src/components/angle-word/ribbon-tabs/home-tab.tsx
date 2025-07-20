
"use client";

import { Editor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ArrowDownAZ,
  Bold,
  CaseLower,
  CaseSensitive,
  CaseUpper,
  ClipboardPaste,
  Copy,
  ChevronDown,
  Eraser,
  Highlighter,
  IndentDecrease,
  IndentIncrease,
  Italic,
  List,
  ListChecks,
  ListOrdered,
  Paintbrush,
  Pilcrow,
  Pin,
  Pointer,
  Replace,
  Scissors,
  Search,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
  FileText,
  Merge,
  BringToFront,
  PaintBucket,
  Grid,
  Baseline,
  ALargeSmall,
  Palette,
  Wand2,
} from "lucide-react";
import { FC, useRef, useState, SVGProps, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { RibbonGroup, SmallRibbonButton, BulletDiscIcon, BulletCircleIcon, BulletSquareIcon } from "../ribbon-ui";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

interface HomeTabProps {
  editor: Editor | null;
}

const FONT_SIZES = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'];
const FONT_FAMILIES = [
  { name: "PT Sans", value: "PT Sans, sans-serif" },
  { name: "Arial", value: "Arial, sans-serif" },
  { name: 'Calibri', value: 'Calibri, sans-serif' },
  { name: 'Cambria', value: 'Cambria, serif' },
  { name: 'Candara', value: 'Candara, sans-serif' },
  { name: 'Courier New', value: 'Courier New, monospace' },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Inter", value: "Inter, sans-serif" },
  { name: "Tahoma", value: "Tahoma, sans-serif" },
  { name: "Times New Roman", value: "Times New Roman, Times, serif" },
  { name: "Verdana", value: "Verdana, sans-serif" },
];
const FONT_COLORS = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#800000', '#008000', '#000080', '#808000', '#800080', '#008080', '#C0C0C0', '#808080',
];
const HIGHLIGHT_COLORS = [
  '#FFFF00', '#00FF00', '#FFC0CB', '#ADD8E6', '#FFA500', '#800080',
  '#FF0000', '#C0C0C0', '#00FFFF', '#F0E68C', '#E6E6FA', '#FFF0F5',
];
const BULLET_STYLES = [
  { name: 'disc', icon: BulletDiscIcon, label: 'Solid Circle' },
  { name: 'circle', icon: BulletCircleIcon, label: 'Hollow Circle' },
  { name: 'square', icon: BulletSquareIcon, label: 'Solid Square' },
];

type CaseType = 'sentence' | 'lower' | 'upper' | 'capitalize';

const UnderlineStyleIcon = ({ style, ...props }: { style: string } & SVGProps<SVGSVGElement>) => (
    <svg width="100" height="10" viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg" {...props}>
        <line 
            x1="0" 
            y1="5" 
            x2="100" 
            y2="5" 
            stroke="currentColor" 
            strokeWidth="1"
            strokeDasharray={
                style === 'dotted' ? '2 3' :
                style === 'dashed' ? '6 4' :
                style === 'dot-dash' ? '2 3 6 3' :
                'none'
            }
        />
        {style === 'double' && <line x1="0" y1="8" x2="100" y2="8" stroke="currentColor" strokeWidth="1" />}
        {style === 'wavy' && <path d="M 0,5 C 5,2 10,8 15,5 S 25,2 30,5 S 40,8 45,5 S 55,2 60,5 S 70,8 75,5 S 85,2 90,5 S 100,8 100,5" stroke="currentColor" fill="none" strokeWidth="1"/>}
    </svg>
);


export const HomeTab: FC<HomeTabProps> = ({ editor }) => {
  const fontColorInputRef = useRef<HTMLInputElement>(null);
  const highlightColorInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [recentFontColors, setRecentFontColors] = useState<string[]>([]);
  const [recentHighlightColors, setRecentHighlightColors] = useState<string[]>([]);
  const [lastCaseType, setLastCaseType] = useState<CaseType>('sentence');
  
  const currentFontSize = useCallback(() => {
    return editor?.getAttributes('textStyle').fontSize?.replace('pt', '') || '11';
  }, [editor]);
  
  const currentFontFamily = useCallback(() => {
    if (!editor) return 'PT Sans';
    for (const family of FONT_FAMILIES) {
      if (editor.isActive('textStyle', { fontFamily: family.value })) {
        return family.name;
      }
    }
    return editor.getAttributes('textStyle').fontFamily?.split(',')[0].replace(/['"]/g, '') || 'PT Sans';
  }, [editor]);

  const [fontSizeInput, setFontSizeInput] = useState(currentFontSize());
  const [fontFamilyInput, setFontFamilyInput] = useState(currentFontFamily());

  useEffect(() => {
    const handleSelectionUpdate = () => {
      if (editor) {
        setFontSizeInput(currentFontSize());
        setFontFamilyInput(currentFontFamily());
      }
    };

    editor?.on('selectionUpdate', handleSelectionUpdate);
    editor?.on('transaction', handleSelectionUpdate);
    return () => {
      editor?.off('selectionUpdate', handleSelectionUpdate);
      editor?.off('transaction', handleSelectionUpdate);
    };
  }, [editor, currentFontSize, currentFontFamily]);


  if (!editor) return null;

  const activeHighlightColor = editor.getAttributes('highlight').color;
  const activeFontColor = editor.getAttributes('textStyle').color;

  const handleFontColorSelect = (color: string) => {
    if (!color) return;
    editor.chain().focus().setColor(color).run();
    setRecentFontColors(prev => [color, ...prev.filter(c => c !== color)].slice(0, 6));
  };

  const handleHighlightColorSelect = (color: string) => {
    if (!color) return;
    editor.chain().focus().toggleHighlight({ color }).run();
    setRecentHighlightColors(prev => [color, ...prev.filter(c => c !== color)].slice(0, 6));
  };
  
  const handlePasteTextOnly = async () => {
    try {
      const text = await navigator.clipboard.readText();
      editor.chain().focus().insertContent(text).run();
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
      toast({
        title: "Paste Failed",
        description: "Could not read text from clipboard. Your browser might not grant permission.",
        variant: "destructive",
      });
    }
  };
  
  const handleChangeCase = (caseType: CaseType) => {
    const { from, to, empty } = editor.state.selection;
    if (empty) return;
    const selectedText = editor.state.doc.textBetween(from, to);
    let transformedText = selectedText;

    switch (caseType) {
      case 'sentence':
        transformedText = selectedText.charAt(0).toUpperCase() + selectedText.slice(1).toLowerCase();
        break;
      case 'lower':
        transformedText = selectedText.toLowerCase();
        break;
      case 'upper':
        transformedText = selectedText.toUpperCase();
        break;
      case 'capitalize':
        transformedText = selectedText.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
        break;
    }
    setLastCaseType(caseType);
    editor.chain().focus().deleteRange({ from, to }).insertContent(transformedText).run();
  };
  
  const setFontSize = (size: string) => {
    const numSize = parseInt(size, 10);
    if (!isNaN(numSize) && numSize > 0) {
      editor.chain().focus().setMark('textStyle', { fontSize: `${numSize}pt` }).run();
      setFontSizeInput(size);
    }
  };

  const setFontFamily = (family: string) => {
    editor.chain().focus().setFontFamily(family).run();
    setFontFamilyInput(family.split(',')[0].replace(/['"]/g, ''));
  };

  const handleIncreaseFontSize = () => {
    const currentSize = parseInt(currentFontSize(), 10);
    const currentIndex = FONT_SIZES.map(s => parseInt(s, 10)).findIndex(s => s >= currentSize);
    
    if (currentIndex > -1 && currentIndex < FONT_SIZES.length - 1) {
      const newSize = FONT_SIZES[currentIndex + 1];
      setFontSize(newSize);
    } else if (currentSize < 72) { // Handle non-standard sizes
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
    } else if (currentSize > 1) { // Handle non-standard sizes
      setFontSize(String(currentSize - 1));
    }
  };
  
  const handleBulletList = (style: string) => {
    if (editor.isActive('bulletList', { 'data-list-style-type': style })) {
      editor.chain().focus().toggleBulletList().run();
    } else {
      editor.chain().focus().toggleBulletList().updateAttributes('bulletList', { 'data-list-style-type': style }).run();
    }
  };

  const handleIndent = () => {
    if (editor.isActive('listItem')) editor.chain().focus().sinkListItem('listItem').run();
    else if (editor.can().indent()) editor.chain().focus().indent().run();
  };

  const handleOutdent = () => {
    if (editor.isActive('listItem')) editor.chain().focus().liftListItem('listItem').run();
    else if (editor.can().outdent()) editor.chain().focus().outdent().run();
  };

  const canOutdent = () => {
    if (editor.isActive('listItem')) return editor.can().liftListItem('listItem');
    return editor.can().outdent();
  };

  return (
    <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex items-start p-2">
            <RibbonGroup title="Clipboard">
              <div className="flex items-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex flex-col items-center h-auto p-2 px-3">
                      <ClipboardPaste className="w-8 h-8 mb-1 text-primary" />
                      <span className="text-xs">Paste <ChevronDown className="inline w-3 h-3 ml-0.5" /></span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <BringToFront className="w-4 h-4 mr-2" />
                      <span>Keep Source Formatting</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handlePasteTextOnly}>
                      <FileText className="w-4 h-4 mr-2" />
                      <span>Keep Text Only</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      <Merge className="w-4 h-4 mr-2" />
                      <span>Merge Formatting</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <span>Paste Special...</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex flex-col justify-center">
                  <Button variant="ghost" className="h-auto p-1 text-xs justify-start w-full hover:bg-accent hover:text-accent-foreground">
                    <Scissors className="w-4 h-4 mr-2" /> Cut
                  </Button>
                  <Button variant="ghost" className="h-auto p-1 text-xs justify-start w-full hover:bg-accent hover:text-accent-foreground">
                    <Copy className="w-4 h-4 mr-2" /> Copy
                  </Button>
                  <Button variant="ghost" className="h-auto p-1 text-xs justify-start w-full hover:bg-accent hover:text-accent-foreground">
                    <Paintbrush className="w-4 h-4 mr-2" /> Format Painter
                  </Button>
                </div>
              </div>
            </RibbonGroup>
            <RibbonGroup title="Font">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center">
                   <div className="flex items-center border rounded-md">
                        <Input
                            type="text"
                            value={fontFamilyInput}
                            onChange={(e) => setFontFamilyInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setFontFamily(fontFamilyInput);
                                    e.currentTarget.blur();
                                }
                            }}
                            onBlur={() => setFontFamily(fontFamilyInput)}
                            className="p-1 text-xs h-8 w-32 border-0 focus-visible:ring-0"
                        />
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="p-1 h-8 w-6 border-l rounded-l-none">
                                    <ChevronDown className="w-3 h-3" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {FONT_FAMILIES.map(font => (
                                    <DropdownMenuItem key={font.value} onSelect={() => setFontFamily(font.value)} style={{fontFamily: font.value}}>
                                        {font.name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                   <div className="flex items-center ml-1 border rounded-md">
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
                            className="p-1 text-xs h-8 w-10 border-0 focus-visible:ring-0"
                        />
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="p-1 h-8 w-6 border-l rounded-l-none">
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

                  <SmallRibbonButton icon={ALargeSmall} tooltip="Increase Font Size" onClick={handleIncreaseFontSize}/>
                  <SmallRibbonButton icon={CaseLower} tooltip="Decrease Font Size" onClick={handleDecreaseFontSize}/>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="p-1 h-auto" title="Change Case">
                        <CaseSensitive className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleChangeCase('sentence')}>Sentence case.</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleChangeCase('lower')}>lowercase</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleChangeCase('upper')}>UPPERCASE</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleChangeCase('capitalize')}>Capitalize Each Word</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <SmallRibbonButton
                    icon={Eraser}
                    tooltip="Clear All Formatting"
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}
                  />
                </div>
                <div className="flex items-center">
                  <SmallRibbonButton
                    icon={Bold}
                    tooltip="Bold"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    data-active={editor.isActive('bold')}
                    className="w-7 h-7"
                  />
                  <SmallRibbonButton
                    icon={Italic}
                    tooltip="Italic"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    data-active={editor.isActive('italic')}
                    className="w-7 h-7"
                  />
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="p-1 h-7 w-7" title="Underline" data-active={editor.isActive('underline')}>
                              <Underline className="w-4 h-4" />
                          </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                          <DropdownMenuItem onSelect={() => editor.chain().focus().toggleUnderline().run()}><UnderlineStyleIcon style="solid" className="w-full h-2" /></DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => editor.chain().focus().toggleUnderline().run()}><UnderlineStyleIcon style="double" className="w-full h-2" /></DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => editor.chain().focus().toggleUnderline().run()}><UnderlineStyleIcon style="solid" className="w-full h-2" /></DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => editor.chain().focus().toggleUnderline().run()}><UnderlineStyleIcon style="dotted" className="w-full h-2" /></DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => editor.chain().focus().toggleUnderline().run()}><UnderlineStyleIcon style="dashed" className="w-full h-2" /></DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => editor.chain().focus().toggleUnderline().run()}><UnderlineStyleIcon style="dot-dash" className="w-full h-2" /></DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => editor.chain().focus().toggleUnderline().run()}><UnderlineStyleIcon style="wavy" className="w-full h-2" /></DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onSelect={() => editor.chain().focus().unsetUnderline().run()}>None</DropdownMenuItem>
                          <DropdownMenuItem disabled>More Underlines...</DropdownMenuItem>
                          <DropdownMenuSub>
                              <DropdownMenuSubTrigger>Underline Colour</DropdownMenuSubTrigger>
                              <DropdownMenuSubContent className="p-2">
                              <div className="grid grid-cols-8 gap-1">
                                  {FONT_COLORS.map(color => (
                                  <DropdownMenuItem
                                      key={color}
                                      className="p-0 w-6 h-6 flex items-center justify-center cursor-pointer"
                                      onSelect={(e) => { e.preventDefault(); /* TODO: Set underline color */ }}
                                  >
                                      <div className="w-5 h-5 rounded-sm border" style={{ backgroundColor: color }}/>
                                  </DropdownMenuItem>
                                  ))}
                              </div>
                              </DropdownMenuSubContent>
                          </DropdownMenuSub>
                      </DropdownMenuContent>
                  </DropdownMenu>

                  <SmallRibbonButton
                    icon={Strikethrough}
                    tooltip="Strikethrough"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    data-active={editor.isActive('strike')}
                    className="w-7 h-7"
                  />
                  <SmallRibbonButton
                    icon={Subscript}
                    tooltip="Subscript"
                    onClick={() => editor.chain().focus().toggleSubscript().run()}
                    data-active={editor.isActive('subscript')}
                    className="w-7 h-7"
                  />
                  <SmallRibbonButton
                    icon={Superscript}
                    tooltip="Superscript"
                    onClick={() => editor.chain().focus().toggleSuperscript().run()}
                    data-active={editor.isActive('superscript')}
                    className="w-7 h-7"
                  />
                  <SmallRibbonButton icon={Wand2} tooltip="Text Effects" className="w-7 h-7"/>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="p-1 h-7" title="Text Highlight Color" data-active={!!activeHighlightColor}>
                          <div className="flex flex-col items-center">
                              <Highlighter className="w-4 h-4" />
                              <div
                                  className="w-4 h-[3px] rounded-sm mt-0.5"
                                  style={{ backgroundColor: activeHighlightColor || 'transparent' }}
                              />
                          </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-2">
                      {recentHighlightColors.length > 0 && (
                        <>
                          <div className="text-xs text-muted-foreground px-1 pb-1">Recent Colors</div>
                          <div className="grid grid-cols-6 gap-1 mb-2">
                            {recentHighlightColors.map(color => (
                              <DropdownMenuItem
                                key={color}
                                className="p-0 w-6 h-6 flex items-center justify-center cursor-pointer"
                                onSelect={(e) => { e.preventDefault(); handleHighlightColorSelect(color); }}
                              >
                                <div className="w-5 h-5 rounded-sm border" style={{ backgroundColor: color }} />
                              </DropdownMenuItem>
                            ))}
                          </div>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <div className="text-xs text-muted-foreground px-1 pb-1">Standard Colors</div>
                      <div className="grid grid-cols-6 gap-1">
                        {HIGHLIGHT_COLORS.map(color => (
                          <DropdownMenuItem
                            key={color}
                            className="p-0 w-6 h-6 flex items-center justify-center cursor-pointer"
                            onSelect={(e) => { e.preventDefault(); handleHighlightColorSelect(color); }}
                          >
                            <div className="w-5 h-5 rounded-sm border" style={{ backgroundColor: color }}/>
                          </DropdownMenuItem>
                        ))}
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onSelect={(e) => { e.preventDefault(); editor.chain().focus().unsetHighlight().run(); }}
                        className="cursor-pointer"
                      >
                        No Color
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={(e) => { e.preventDefault(); highlightColorInputRef.current?.click(); }}
                        className="cursor-pointer"
                      >
                        More Colors...
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <input
                    type="color"
                    ref={highlightColorInputRef}
                    className="absolute w-0 h-0 opacity-0"
                    onChange={(e) => handleHighlightColorSelect(e.target.value)}
                  />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="p-1 h-7" title="Font Color" data-active={!!activeFontColor}>
                          <div className="flex flex-col items-center">
                              <Palette className="w-4 h-4" />
                              <div
                                  className="w-4 h-[3px] rounded-sm mt-0.5"
                                  style={{ backgroundColor: activeFontColor || 'transparent' }}
                              />
                          </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-2">
                      {recentFontColors.length > 0 && (
                        <>
                          <div className="text-xs text-muted-foreground px-1 pb-1">Recent Colors</div>
                          <div className="grid grid-cols-6 gap-1 mb-2">
                            {recentFontColors.map(color => (
                              <DropdownMenuItem
                                key={color}
                                className="p-0 w-6 h-6 flex items-center justify-center cursor-pointer"
                                onSelect={(e) => { e.preventDefault(); handleFontColorSelect(color); }}
                              >
                                <div className="w-5 h-5 rounded-sm border" style={{ backgroundColor: color }} />
                              </DropdownMenuItem>
                            ))}
                          </div>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <div className="text-xs text-muted-foreground px-1 pb-1">Standard Colors</div>
                      <div className="grid grid-cols-8 gap-1">
                        {FONT_COLORS.map(color => (
                          <DropdownMenuItem
                            key={color}
                            className="p-0 w-6 h-6 flex items-center justify-center cursor-pointer"
                            onSelect={(e) => { e.preventDefault(); handleFontColorSelect(color); }}
                          >
                            <div className="w-5 h-5 rounded-sm border" style={{ backgroundColor: color }}/>
                          </DropdownMenuItem>
                        ))}
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onSelect={(e) => { e.preventDefault(); editor.chain().focus().unsetColor().run(); }}
                        className="cursor-pointer"
                      >
                        Automatic
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={(e) => { e.preventDefault(); fontColorInputRef.current?.click(); }}
                        className="cursor-pointer"
                      >
                        More Colors...
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <input
                    type="color"
                    ref={fontColorInputRef}
                    className="absolute w-0 h-0 opacity-0"
                    onChange={(e) => handleFontColorSelect(e.target.value)}
                    value={activeFontColor || '#000000'}
                  />
                </div>
              </div>
            </RibbonGroup>
            <RibbonGroup title="Paragraph">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="p-1 h-auto" title="Bullets" data-active={editor.isActive('bulletList')}>
                        <List className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Bullet Library</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {BULLET_STYLES.map(({ name, icon: Icon, label }) => (
                        <DropdownMenuItem key={name} onClick={() => handleBulletList(name)}>
                          <Icon />
                          <span className="ml-2">{label}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <SmallRibbonButton 
                    icon={ListOrdered} 
                    tooltip="Numbering"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    data-active={editor.isActive('orderedList')}
                  />
                  <SmallRibbonButton 
                    icon={ListChecks} 
                    tooltip="Multilevel List"
                    onClick={() => editor.chain().focus().toggleTaskList().run()}
                    data-active={editor.isActive('taskList')}
                  />
                  <SmallRibbonButton 
                    icon={IndentDecrease} 
                    tooltip="Decrease Indent"
                    onClick={handleOutdent}
                    disabled={!canOutdent()}
                  />
                  <SmallRibbonButton 
                    icon={IndentIncrease} 
                    tooltip="Increase Indent"
                    onClick={handleIndent}
                  />
                  <SmallRibbonButton icon={ArrowDownAZ} tooltip="Sort"/>
                  <SmallRibbonButton icon={Pilcrow} tooltip="Show/Hide ¶"/>
                </div>
                <div className="flex items-center mt-1">
                  <SmallRibbonButton 
                    icon={AlignLeft} 
                    tooltip="Align Left"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    data-active={editor.isActive({ textAlign: 'left' })}
                  />
                  <SmallRibbonButton 
                    icon={AlignCenter} 
                    tooltip="Align Center"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    data-active={editor.isActive({ textAlign: 'center' })}
                  />
                  <SmallRibbonButton 
                    icon={AlignRight} 
                    tooltip="Align Right"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    data-active={editor.isActive({ textAlign: 'right' })}
                  />
                  <SmallRibbonButton 
                    icon={AlignJustify} 
                    tooltip="Justify"
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    data-active={editor.isActive({ textAlign: 'justify' })}
                  />
                  <SmallRibbonButton icon={Baseline} tooltip="Line Spacing"/>
                  <SmallRibbonButton icon={PaintBucket} tooltip="Shading"/>
                  <SmallRibbonButton icon={Grid} tooltip="Borders"/>
                </div>
              </div>
            </RibbonGroup>
            <RibbonGroup title="Styles">
              <div className="p-1 border bg-secondary/30 h-full w-[200px] flex items-center justify-center text-muted-foreground text-sm">
                Styles Gallery
              </div>
            </RibbonGroup>
            <RibbonGroup title="Editing">
              <div className="flex flex-col items-start">
                <Button variant="ghost" className="h-auto p-1 text-xs justify-start w-full hover:bg-accent hover:text-accent-foreground">
                    <Search className="w-4 h-4 mr-2" /> Find
                  </Button>
                <Button variant="ghost" className="h-auto p-1 text-xs justify-start w-full hover:bg-accent hover:text-accent-foreground">
                    <Replace className="w-4 h-4 mr-2" /> Replace
                  </Button>
                <Button variant="ghost" className="h-auto p-1 text-xs justify-start w-full hover:bg-accent hover:text-accent-foreground">
                    <Pointer className="w-4 h-4 mr-2" /> Select
                  </Button>
              </div>
            </RibbonGroup>
        </div>
        <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
