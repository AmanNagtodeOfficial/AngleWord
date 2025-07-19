
"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AppWindow,
  ArrowDownAZ,
  ALargeSmall,
  BarChart3,
  Baseline,
  Blocks,
  Bold,
  Book,
  BookCopy,
  BookOpen,
  Bookmark,
  Brain,
  CalendarDays,
  Camera,
  CaseSensitive,
  CaseLower,
  CaseUpper,
  ClipboardCheck,
  ClipboardPaste,
  Code2,
  Columns,
  Copyright,
  Copy,
  ChevronDown,
  Droplet,
  Eraser,
  File,
  FileEdit,
  FilePlus,
  FilePlus2,
  FileText as FileTextIcon,
  Footprints,
  GalleryHorizontal,
  GalleryThumbnails,
  GalleryVerticalEnd,
  Globe,
  Grid,
  Grid3x3,
  Hash,
  Highlighter,
  ImageUp,
  Image as LucideImage,
  IndentDecrease,
  IndentIncrease,
  Italic,
  LayoutGrid,
  LayoutList,
  Library,
  Link as LinkIcon,
  Link2,
  List,
  ListChecks,
  ListOrdered,
  ListTree,
  Mail,
  MessageCircle,
  MessageSquare,
  Newspaper,
  Omega,
  Package,
  PaintBucket,
  Paintbrush,
  Palette,
  PanelBottom,
  PanelLeftOpen,
  PanelTop,
  PenTool,
  Percent,
  Pilcrow,
  Pointer,
  Printer,
  PrinterIcon,
  Projector,
  RectangleHorizontal,
  Replace,
  Ruler,
  Save,
  Scaling,
  ScanText,
  Search,
  Scissors,
  Shapes,
  Sigma,
  Sparkles,
  SpellCheck,
  SplitSquareVertical,
  Square,
  SquarePen,
  Store as StoreIcon,
  StretchHorizontal,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  Tags,
  Type,
  Underline,
  UnfoldVertical,
  Users2,
  Video,
  Wand2,
  ZoomIn,
  ZoomOut,
  FileText,
  Merge,
  BringToFront,
} from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Editor } from "@tiptap/react";
import { useRef, useState, useCallback } from "react";
import { FileMenu } from "./file-menu";
import { useToast } from "@/hooks/use-toast";
import type { Margins } from "@/app/page";
import { CustomMarginsDialog } from "./custom-margins-dialog";

interface RibbonProps {
  onImproveWriting: () => void;
  onDetectTone: () => void;
  onSummarizeDocument: () => void;
  editor: Editor | null;
  documentName: string;
  setDocumentName: (name: string) => void;
  margins: Margins;
  setMargins: (margins: Margins) => void;
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

type CaseType = 'sentence' | 'lower' | 'upper' | 'capitalize';

const BulletDiscIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="4" fill="currentColor"/></svg>;
const BulletCircleIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3.5" stroke="currentColor"/></svg>;
const BulletSquareIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="8" width="8" height="8" fill="currentColor"/></svg>;

const BULLET_STYLES = [
  { name: 'disc', icon: BulletDiscIcon, label: 'Solid Circle' },
  { name: 'circle', icon: BulletCircleIcon, label: 'Hollow Circle' },
  { name: 'square', icon: BulletSquareIcon, label: 'Solid Square' },
];

const MARGIN_PRESETS: { [key: string]: { name: string; values: Margins } } = {
    normal: { name: 'Normal', values: { top: '1in', bottom: '1in', left: '1in', right: '1in' } },
    narrow: { name: 'Narrow', values: { top: '0.5in', bottom: '0.5in', left: '0.5in', right: '0.5in' } },
    moderate: { name: 'Moderate', values: { top: '1in', bottom: '1in', left: '0.75in', right: '0.75in' } },
    wide: { name: 'Wide', values: { top: '1in', bottom: '1in', left: '2in', right: '2in' } },
};

export function AngleWordRibbon({ editor, onImproveWriting, onDetectTone, onSummarizeDocument, documentName, setDocumentName, margins, setMargins }: RibbonProps) {
  const fontColorInputRef = useRef<HTMLInputElement>(null);
  const highlightColorInputRef = useRef<HTMLInputElement>(null);

  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const [isCustomMarginsOpen, setIsCustomMarginsOpen] = useState(false);
  const [recentFontColors, setRecentFontColors] = useState<string[]>([]);
  const [recentHighlightColors, setRecentHighlightColors] = useState<string[]>([]);
  const [lastCaseType, setLastCaseType] = useState<CaseType>('sentence');
  
  const { toast } = useToast();

  const activeHighlightColor = editor?.getAttributes('highlight').color;
  const activeFontColor = editor?.getAttributes('textStyle').color;

  const handleFontColorSelect = (color: string) => {
    if (!color) return;
    editor?.chain().focus().setColor(color).run();

    setRecentFontColors(prev => {
      const newColors = [color, ...prev.filter(c => c !== color)];
      return newColors.slice(0, 6);
    });
  };

  const handleHighlightColorSelect = (color: string) => {
    if (!color) return;
    editor?.chain().focus().toggleHighlight({ color }).run();
    
    setRecentHighlightColors(prev => {
      const newColors = [color, ...prev.filter(c => c !== color)];
      return newColors.slice(0, 6); // Keep only the 6 most recent
    });
  };
  
  const handlePasteTextOnly = async () => {
    if (!editor) return;
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

  const RibbonButton = ({ children, icon: Icon, className: extraClassName, ...props }: { children: React.ReactNode, icon: React.ElementType, className?: string, [key: string]: any }) => (
    <Button variant="ghost" className={`flex flex-col items-center h-auto p-2 ${extraClassName || ''}`} {...props}>
      <Icon className="w-5 h-5 mb-1" />
      <span className="text-xs text-center">{children}</span>
    </Button>
  );

  const SmallRibbonButton = ({ children, icon: Icon, tooltip, ...props }: { children?: React.ReactNode, icon: React.ElementType, tooltip: string, [key: string]: any }) => (
    // Tooltip can be added here if ShadCN Tooltip is integrated
    <Button variant="ghost" className="p-1 h-auto" title={tooltip} {...props}>
      <div className="flex flex-col items-center">
        {children || <Icon className="w-4 h-4" />}
      </div>
    </Button>
  );


  const RibbonGroup = ({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) => (
    <div className={`flex flex-col items-center p-1 border-r last:border-r-0 ${className || ''}`}>
      <div className="flex items-start gap-0.5">
        {children}
      </div>
      <span className="text-xs text-muted-foreground mt-1">{title}</span>
    </div>
  );
  
  const currentFontSize = () => {
    if (!editor) return '11';
    const { fontSize } = editor.getAttributes('textStyle');
    return fontSize?.replace('pt', '') || '11';
  };

  const currentFontFamily = () => {
    if (!editor) return 'PT Sans';
    for (const family of FONT_FAMILIES) {
      if (editor.isActive('textStyle', { fontFamily: family.value })) {
        return family.name;
      }
    }
    return 'PT Sans'; // Default font
  };
  
  const handleChangeCase = (caseType: CaseType) => {
    if (!editor) return;
    const { from, to, empty } = editor.state.selection;
    if (empty) return;

    const selectedText = editor.state.doc.textBetween(from, to);
    let transformedText = selectedText;

    switch (caseType) {
      case 'sentence':
        transformedText = selectedText.charAt(0).toUpperCase() + selectedText.slice(1).toLowerCase();
        // This is a simplified version. A full implementation would need to handle multiple sentences.
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
    if (!editor) return;
    const currentSize = currentFontSize();
    const currentIndex = FONT_SIZES.indexOf(currentSize);
    if (currentIndex > -1 && currentIndex < FONT_SIZES.length - 1) {
      const newSize = FONT_SIZES[currentIndex + 1];
      editor.chain().focus().setMark('textStyle', { fontSize: `${newSize}pt` }).run();
    }
  };

  const handleDecreaseFontSize = () => {
    if (!editor) return;
    const currentSize = currentFontSize();
    const currentIndex = FONT_SIZES.indexOf(currentSize);
    if (currentIndex > 0) {
      const newSize = FONT_SIZES[currentIndex - 1];
      editor.chain().focus().setMark('textStyle', { fontSize: `${newSize}pt` }).run();
    }
  };
  
  const CaseIcon = () => {
    switch (lastCaseType) {
      case 'upper':
        return <CaseUpper className="w-4 h-4" />;
      case 'lower':
        return <CaseLower className="w-4 h-4" />;
      default:
        return <CaseSensitive className="w-4 h-4" />;
    }
  };
  
  const handleBulletList = (style: string) => {
    if (!editor) return;
    if (editor.isActive('bulletList', { 'data-list-style-type': style })) {
      editor.chain().focus().toggleBulletList().run();
    } else {
      editor.chain().focus().toggleBulletList().updateAttributes('bulletList', { 'data-list-style-type': style }).run();
    }
  };

  return (
    <>
      <FileMenu isOpen={isFileMenuOpen} onClose={() => setIsFileMenuOpen(false)} editor={editor} documentName={documentName} setDocumentName={setDocumentName} />
      <CustomMarginsDialog 
        isOpen={isCustomMarginsOpen}
        onClose={() => setIsCustomMarginsOpen(false)}
        currentMargins={margins}
        onApply={(newMargins) => {
            setMargins(newMargins);
            setIsCustomMarginsOpen(false);
        }}
      />
      <div className="bg-secondary/30 p-1 border-b shadow-sm">
        <Tabs defaultValue="home" className="w-full">
          <div className="flex">
            <Button
              onClick={() => setIsFileMenuOpen(true)}
              className="text-sm px-4 py-1.5 rounded-b-none rounded-t-md font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
            >
              File
            </Button>
            <TabsList className="bg-transparent p-0 h-auto justify-start">
              <TabsTrigger value="home" className="text-sm px-3 py-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none">Home</TabsTrigger>
              <TabsTrigger value="insert" className="text-sm px-3 py-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none">Insert</TabsTrigger>
              <TabsTrigger value="design" className="text-sm px-3 py-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none">Design</TabsTrigger>
              <TabsTrigger value="layout" className="text-sm px-3 py-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none">Layout</TabsTrigger>
              <TabsTrigger value="references" className="text-sm px-3 py-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none">References</TabsTrigger>
              <TabsTrigger value="mailings" className="text-sm px-3 py-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none">Mailings</TabsTrigger>
              <TabsTrigger value="review" className="text-sm px-3 py-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none">Review</TabsTrigger>
              <TabsTrigger value="view" className="text-sm px-3 py-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none">View</TabsTrigger>
              <TabsTrigger value="ai-tools" className="text-sm px-3 py-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none">AI Tools</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="home" className="bg-background p-2 flex items-start">
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
                <SmallRibbonButton icon={Paintbrush} tooltip="Format Painter" />
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
                          onClick={() => editor?.chain().focus().setFontFamily(font.value).run()}
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
                        <DropdownMenuItem key={size} onClick={() => editor?.chain().focus().setMark('textStyle', { fontSize: `${size}pt` }).run()}>
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
                    onClick={() => editor?.chain().focus().unsetAllMarks().run()}
                  />
                </div>
                <div className="flex items-center mt-1">
                  <SmallRibbonButton
                    icon={Bold}
                    tooltip="Bold"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    data-active={editor?.isActive('bold')}
                  />
                  <SmallRibbonButton
                    icon={Italic}
                    tooltip="Italic"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    data-active={editor?.isActive('italic')}
                  />
                  <SmallRibbonButton
                    icon={Underline}
                    tooltip="Underline"
                    onClick={() => editor?.chain().focus().toggleUnderline().run()}
                    data-active={editor?.isActive('underline')}
                  />
                  <SmallRibbonButton
                    icon={Strikethrough}
                    tooltip="Strikethrough"
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                    data-active={editor?.isActive('strike')}
                  />
                  <SmallRibbonButton
                    icon={Subscript}
                    tooltip="Subscript"
                    onClick={() => editor?.chain().focus().toggleSubscript().run()}
                    data-active={editor?.isActive('subscript')}
                  />
                  <SmallRibbonButton
                    icon={Superscript}
                    tooltip="Superscript"
                    onClick={() => editor?.chain().focus().toggleSuperscript().run()}
                    data-active={editor?.isActive('superscript')}
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
                        onSelect={(e) => { e.preventDefault(); editor?.chain().focus().unsetHighlight().run(); }}
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
                        onSelect={(e) => { e.preventDefault(); editor?.chain().focus().unsetColor().run(); }}
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
                      <Button variant="ghost" className="p-1 h-auto" title="Bullets" data-active={editor?.isActive('bulletList')}>
                        <List className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Bullet Library</DropdownMenuLabel>
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
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    data-active={editor?.isActive('orderedList')}
                  />
                  <SmallRibbonButton 
                    icon={ListChecks} 
                    tooltip="Multilevel List"
                    onClick={() => editor?.chain().focus().toggleTaskList().run()}
                    data-active={editor?.isActive('taskList')}
                  />
                  <SmallRibbonButton 
                    icon={IndentDecrease} 
                    tooltip="Decrease Indent"
                    onClick={() => editor?.chain().focus().liftListItem('listItem').run()}
                    disabled={!editor?.can().liftListItem('listItem')}
                  />
                  <SmallRibbonButton 
                    icon={IndentIncrease} 
                    tooltip="Increase Indent"
                    onClick={() => editor?.chain().focus().sinkListItem('listItem').run()}
                    disabled={!editor?.can().sinkListItem('listItem')}
                  />
                  <SmallRibbonButton icon={ArrowDownAZ} tooltip="Sort"/>
                  <SmallRibbonButton icon={Pilcrow} tooltip="Show/Hide ¶"/>
                </div>
                <div className="flex items-center mt-1">
                  <SmallRibbonButton 
                    icon={AlignLeft} 
                    tooltip="Align Left"
                    onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                    data-active={editor?.isActive({ textAlign: 'left' })}
                  />
                  <SmallRibbonButton 
                    icon={AlignCenter} 
                    tooltip="Align Center"
                    onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                    data-active={editor?.isActive({ textAlign: 'center' })}
                  />
                  <SmallRibbonButton 
                    icon={AlignRight} 
                    tooltip="Align Right"
                    onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                    data-active={editor?.isActive({ textAlign: 'right' })}
                  />
                  <SmallRibbonButton 
                    icon={AlignJustify} 
                    tooltip="Justify"
                    onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
                    data-active={editor?.isActive({ textAlign: 'justify' })}
                  />
                  <SmallRibbonButton icon={Baseline} tooltip="Line Spacing"/>
                  <SmallRibbonButton icon={PaintBucket} tooltip="Shading"/>
                  <SmallRibbonButton icon={Grid} tooltip="Borders"/>
                </div>
              </div>
            </RibbonGroup>
            <RibbonGroup title="Styles">
              <RibbonButton icon={LayoutList}>Styles</RibbonButton>
               {/* Placeholder for style gallery items */}
            </RibbonGroup>
            <RibbonGroup title="Editing">
               <RibbonButton icon={Search}>Find</RibbonButton>
               <RibbonButton icon={Replace}>Replace</RibbonButton>
               <RibbonButton icon={Pointer}>Select</RibbonButton>
            </RibbonGroup>
          </TabsContent>

          <TabsContent value="insert" className="bg-background p-2 flex items-start">
            <RibbonGroup title="Pages">
              <RibbonButton icon={Newspaper}>Cover Page</RibbonButton>
              <RibbonButton icon={FilePlus2}>Blank Page</RibbonButton>
              <RibbonButton icon={UnfoldVertical}>Page Break</RibbonButton>
            </RibbonGroup>
            <RibbonGroup title="Tables">
              <RibbonButton icon={Table}>Table</RibbonButton>
            </RibbonGroup>
            <RibbonGroup title="Illustrations">
              <div className="flex flex-col">
                <RibbonButton icon={LucideImage}>Pictures</RibbonButton>
                <RibbonButton icon={ImageUp}>Online Pics</RibbonButton>
                <RibbonButton icon={Shapes}>Shapes</RibbonButton>
              </div>
              <div className="flex flex-col">
                <RibbonButton icon={Projector}>SmartArt</RibbonButton>
                <RibbonButton icon={BarChart3}>Chart</RibbonButton>
                <RibbonButton icon={Camera}>Screenshot</RibbonButton>
              </div>
            </RibbonGroup>
            <RibbonGroup title="Apps">
              <RibbonButton icon={StoreIcon}>Store</RibbonButton>
              <RibbonButton icon={GalleryThumbnails}>My Apps</RibbonButton>
            </RibbonGroup>
            <RibbonGroup title="Media">
              <RibbonButton icon={Library}>Wikipedia</RibbonButton>
              <RibbonButton icon={Video}>Online Video</RibbonButton>
            </RibbonGroup>
            <RibbonGroup title="Links">
              <RibbonButton icon={LinkIcon}>Hyperlink</RibbonButton>
              <RibbonButton icon={Bookmark}>Bookmark</RibbonButton>
              <RibbonButton icon={Link2}>Cross-ref</RibbonButton>
            </RibbonGroup>
             <RibbonGroup title="Comments">
              <RibbonButton icon={MessageSquare}>Comment</RibbonButton>
            </RibbonGroup>
             <RibbonGroup title="Header & Footer">
              <RibbonButton icon={PanelTop}>Header</RibbonButton>
              <RibbonButton icon={PanelBottom}>Footer</RibbonButton>
              <RibbonButton icon={Hash}>Page #</RibbonButton>
            </RibbonGroup>
            <RibbonGroup title="Text">
              <div className="flex flex-col">
                <RibbonButton icon={SquarePen}>Text Box</RibbonButton>
                <RibbonButton icon={Blocks}>Quick Parts</RibbonButton>
                <RibbonButton icon={Type}>WordArt</RibbonButton>
              </div>
              <div className="flex flex-col">
                <RibbonButton icon={Baseline}>Drop Cap</RibbonButton>
                <RibbonButton icon={PenTool}>Signature</RibbonButton>
                <RibbonButton icon={CalendarDays}>Date & Time</RibbonButton>
                <RibbonButton icon={Package}>Object</RibbonButton>
              </div>
            </RibbonGroup>
            <RibbonGroup title="Symbols">
              <RibbonButton icon={Sigma}>Equation</RibbonButton>
              <RibbonButton icon={Omega}>Symbol</RibbonButton>
            </RibbonGroup>
          </TabsContent>

          <TabsContent value="design" className="bg-background p-2 flex items-start">
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
          </TabsContent>
          
          <TabsContent value="layout" className="bg-background p-2 flex items-start">
            <RibbonGroup title="Page Setup">
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex flex-col items-center h-auto p-2">
                        <FileTextIcon className="w-5 h-5 mb-1" />
                        <span className="text-xs text-center">Margins</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Margin Presets</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {Object.entries(MARGIN_PRESETS).map(([key, { name, values }]) => (
                        <DropdownMenuItem key={key} onClick={() => setMargins(values)}>
                            {name}
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => setIsCustomMarginsOpen(true)}>
                        Custom Margins...
                    </DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
              <RibbonButton icon={BookOpen}>Orientation</RibbonButton> 
              <RibbonButton icon={Scaling}>Size</RibbonButton>
              <RibbonButton icon={Columns}>Columns</RibbonButton>
            </RibbonGroup>
          </TabsContent>

          <TabsContent value="references" className="bg-background p-2 flex items-start">
             <RibbonGroup title="Table of Contents">
              <RibbonButton icon={ListOrdered}>Contents</RibbonButton>
            </RibbonGroup>
            <RibbonGroup title="Citations">
              <RibbonButton icon={Book}>Bibliography</RibbonButton>
            </RibbonGroup>
            <RibbonGroup title="Footnotes">
              <RibbonButton icon={Footprints}>Footnote</RibbonButton>
            </RibbonGroup>
          </TabsContent>

          <TabsContent value="mailings" className="bg-background p-2 flex items-start">
            <RibbonGroup title="Create">
              <RibbonButton icon={Mail}>Envelopes</RibbonButton>
              <RibbonButton icon={Tags}>Labels</RibbonButton>
            </RibbonGroup>
            <RibbonGroup title="Start Mail Merge">
              <RibbonButton icon={Users2}>Mail Merge</RibbonButton>
            </RibbonGroup>
          </TabsContent>

          <TabsContent value="review" className="bg-background p-2 flex items-start">
            <RibbonGroup title="Proofing">
              <RibbonButton icon={SpellCheck}>Spelling</RibbonButton>
              <RibbonButton icon={ScanText}>Word Count</RibbonButton>
            </RibbonGroup>
            <RibbonGroup title="Comments">
              <RibbonButton icon={MessageCircle}>Comment</RibbonButton>
            </RibbonGroup>
            <RibbonGroup title="Tracking">
              <RibbonButton icon={ClipboardCheck}>Track Changes</RibbonButton>
            </RibbonGroup>
          </TabsContent>

          <TabsContent value="view" className="bg-background p-2 flex items-start">
            <RibbonGroup title="Views">
              <RibbonButton icon={BookOpen}>Read Mode</RibbonButton>
              <RibbonButton icon={PrinterIcon}>Print Layout</RibbonButton>
              <RibbonButton icon={Globe}>Web Layout</RibbonButton>
            </RibbonGroup>
            <RibbonGroup title="Show">
              <RibbonButton icon={ListTree}>Outline</RibbonButton>
              <RibbonButton icon={Ruler}>Ruler</RibbonButton>
              <RibbonButton icon={Grid3x3}>Gridlines</RibbonButton>
              <RibbonButton icon={PanelLeftOpen}>Nav Pane</RibbonButton>
            </RibbonGroup>
            <RibbonGroup title="Zoom">
              <RibbonButton icon={ZoomIn}>Zoom In</RibbonButton>
              <RibbonButton icon={ZoomOut}>Zoom Out</RibbonButton>
              <RibbonButton icon={Percent}>100%</RibbonButton>
              <RibbonButton icon={RectangleHorizontal}>One Page</RibbonButton>
              <RibbonButton icon={GalleryVerticalEnd}>Multi Page</RibbonButton>
              <RibbonButton icon={StretchHorizontal}>Page Width</RibbonButton>
            </RibbonGroup>
             <RibbonGroup title="Window">
              <RibbonButton icon={AppWindow}>New</RibbonButton>
              <RibbonButton icon={LayoutGrid}>Arrange All</RibbonButton>
              <RibbonButton icon={SplitSquareVertical}>Split</RibbonButton>
              <RibbonButton icon={GalleryHorizontal}>Switch</RibbonButton>
            </RibbonGroup>
            <RibbonGroup title="Macros">
              <RibbonButton icon={Code2}>Macros</RibbonButton>
            </RibbonGroup>
          </TabsContent>

          <TabsContent value="ai-tools" className="bg-background p-2 flex items-start">
            <RibbonGroup title="Writing Assistant">
              <RibbonButton icon={Sparkles} onClick={onImproveWriting}>Improve</RibbonButton>
              <RibbonButton icon={Brain} onClick={onDetectTone}>Tone</RibbonButton>
            </RibbonGroup>
            <RibbonGroup title="Document Analysis">
              <RibbonButton icon={FileTextIcon} onClick={onSummarizeDocument}>Summarize</RibbonButton>
            </RibbonGroup>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
