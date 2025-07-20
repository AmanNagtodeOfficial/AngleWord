
"use client";

import { Editor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ArrowDownAZ,
  ALargeSmall,
  Baseline,
  Bold,
  CaseLower,
  CaseSensitive,
  CaseUpper,
  ClipboardPaste,
  Copy,
  ChevronDown,
  Eraser,
  Grid,
  Highlighter,
  IndentDecrease,
  IndentIncrease,
  Italic,
  LayoutList,
  List,
  ListChecks,
  ListOrdered,
  PaintBucket,
  Palette,
  Pilcrow,
  Pointer,
  Replace,
  Scissors,
  Search,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
  Wand2,
  FileText,
  Merge,
  BringToFront,
} from "lucide-react";
import { FC, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { RibbonGroup, RibbonButton, SmallRibbonButton, BulletDiscIcon, BulletCircleIcon, BulletSquareIcon } from "../ribbon-ui";
import { Button } from "@/components/ui/button";

interface HomeTabProps {
  editor: Editor | null;
}

const FONT_SIZES = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'];
const FONT_FAMILIES = [
  { name: 'PT Sans', value: 'PT Sans, sans-serif' },
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Georgia', value: 'Georgia, serif' },
  { name: 'Inter', value: 'Inter, sans-serif' },
  { name: 'Tahoma', value: 'Tahoma, sans-serif' },
  { name: 'Times New Roman', value: 'Times New Roman, Times, serif' },
  { name: 'Verdana', value: 'Verdana, sans-serif' },
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

export const HomeTab: FC<HomeTabProps> = ({ editor }) => {
  const fontColorInputRef = useRef<HTMLInputElement>(null);
  const highlightColorInputRef = useRef<HTMLInputElement>(null);
  const [recentFontColors, setRecentFontColors] = useState<string[]>([]);
  const [recentHighlightColors, setRecentHighlightColors] = useState<string[]>([]);
  const [lastCaseType, setLastCaseType] = useState<CaseType>('sentence');
  const { toast } = useToast();

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
  
  const currentFontSize = () => editor.getAttributes('textStyle').fontSize?.replace('pt', '') || '11';

  const currentFontFamily = () => {
    for (const family of FONT_FAMILIES) {
      if (editor.isActive('textStyle', { fontFamily: family.value })) {
        return family.name;
      }
    }
    return 'PT Sans';
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
  
  const CaseIcon = () => {
    switch (lastCaseType) {
      case 'upper': return <CaseUpper className="w-4 h-4" />;
      case 'lower': return <CaseLower className="w-4 h-4" />;
      default: return <CaseSensitive className="w-4 h-4" />;
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
    <div className="flex items-start">
        <RibbonGroup title="Clipboard" className="items-stretch">
          <div className="flex flex-col items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex flex-col items-center h-auto p-2 px-3">
                  <ClipboardPaste className="w-7 h-7 mb-1 text-primary" />
                  <span className="text-sm">Paste <ChevronDown className="inline w-3 h-3 ml-0.5" /></span>
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
          </div>
          <div className="flex flex-col justify-center">
            <SmallRibbonButton icon={Scissors} tooltip="Cut" />
            <SmallRibbonButton icon={Copy} tooltip="Copy" />
            <SmallRibbonButton icon={Eraser} tooltip="Format Painter" />
          </div>
        </RibbonGroup>
        <RibbonGroup title="Font">
          <div className="flex flex-col">
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-1 text-xs h-auto w-28 justify-between">
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
                  <Button variant="ghost" className="p-1 text-xs h-auto w-12 justify-between">
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

              <SmallRibbonButton icon={ALargeSmall} tooltip="Increase Font Size" onClick={handleIncreaseFontSize}/>
              <SmallRibbonButton icon={CaseLower} tooltip="Decrease Font Size" onClick={handleDecreaseFontSize}/>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-1 h-auto" title="Change Case">
                    <CaseIcon />
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
            <div className="flex items-center mt-1">
              <SmallRibbonButton
                icon={Bold}
                tooltip="Bold"
                onClick={() => editor.chain().focus().toggleBold().run()}
                data-active={editor.isActive('bold')}
              />
              <SmallRibbonButton
                icon={Italic}
                tooltip="Italic"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                data-active={editor.isActive('italic')}
              />
              <SmallRibbonButton
                icon={Underline}
                tooltip="Underline"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                data-active={editor.isActive('underline')}
              />
              <SmallRibbonButton
                icon={Strikethrough}
                tooltip="Strikethrough"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                data-active={editor.isActive('strike')}
              />
              <SmallRibbonButton
                icon={Subscript}
                tooltip="Subscript"
                onClick={() => editor.chain().focus().toggleSubscript().run()}
                data-active={editor.isActive('subscript')}
              />
              <SmallRibbonButton
                icon={Superscript}
                tooltip="Superscript"
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
                data-active={editor.isActive('superscript')}
              />
              <SmallRibbonButton icon={Wand2} tooltip="Text Effects"/>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className="p-1 h-auto" title="Text Highlight Color" data-active={!!activeHighlightColor}>
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
                   <Button variant="ghost" className="p-1 h-auto" title="Font Color" data-active={!!activeFontColor}>
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
          <div className="flex flex-col">
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
          <RibbonButton icon={LayoutList}>Styles</RibbonButton>
        </RibbonGroup>
        <RibbonGroup title="Editing">
           <RibbonButton icon={Search}>Find</RibbonButton>
           <RibbonButton icon={Replace}>Replace</RibbonButton>
           <RibbonButton icon={Pointer}>Select</RibbonButton>
        </RibbonGroup>
    </div>
  );
}
