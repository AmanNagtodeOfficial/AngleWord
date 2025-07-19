
"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AppWindow,
  ArrowDownAZ,
  ALargeSmall, // Used for Increase Font Size
  BarChart3,
  Baseline,
  Blocks, // For Quick Parts
  Bold,
  Book,
  BookCopy,
  BookOpen,
  Bookmark, // For Links group
  Brain,
  CalendarDays, // For Date & Time
  Camera, // For Screenshot
  CaseSensitive, // For Change Case (Aa)
  CaseLower, // Used for Decrease Font Size
  ClipboardCheck,
  ClipboardPaste,
  Code2,
  Columns,
  Copyright,
  Copy,
  ChevronDown,
  Droplet, // For Design > Colors
  Eraser, // For Clear All Formatting
  File,
  FilePlus,
  FilePlus2,
  FileTextIcon,
  Footprints,
  GalleryHorizontal,
  GalleryThumbnails, // For My Apps
  GalleryVerticalEnd,
  Globe,
  Grid, // For Borders in Paragraph group
  Grid3x3,
  Hash,
  Highlighter,
  ImageUp, // For Online Pictures
  Image as LucideImage,
  IndentDecrease,
  IndentIncrease,
  Italic,
  LayoutGrid,
  LayoutList, // For Styles group
  Library, // For Wikipedia
  Link as LinkIcon, // For Hyperlink
  Link2, // For Cross-reference
  List,
  ListChecks, // For Multilevel List
  ListOrdered,
  ListTree,
  Mail,
  MessageCircle,
  MessageSquare, // For Comment
  Newspaper,
  Omega,
  Package, // For Object
  PaintBucket, // For Shading & Page Color
  Paintbrush, // For Format Painter & Design Colors (Used for Design > Colors in image, but Droplet is better)
  Palette, // For Font Color & Design Themes
  PanelBottom,
  PanelLeftOpen,
  PanelTop,
  PenTool, // For Signature Line
  Percent,
  Pilcrow, // For Show/Hide Paragraph marks
  Pointer, // For Select in Editing
  Printer,
  PrinterIcon,
  Projector, // For SmartArt
  RectangleHorizontal,
  Replace,
  Ruler,
  Save, // For Save action & Design > Set as Default
  Scaling,
  ScanText,
  Search,
  Scissors,
  Shapes,
  Sigma, // For Equation
  Sparkles, // For AI Improve & Design > Effects
  SpellCheck,
  SplitSquareVertical,
  Square, // For Page Borders (Design)
  SquarePen, // For Text Box
  Store as StoreIcon, // For Store
  StretchHorizontal,
  Strikethrough,
  Subscript, // For Subscript x,
  Superscript, // For Superscript x²
  Table,
  Tags,
  Type, // For WordArt & Design > Fonts
  Underline,
  UnfoldVertical,
  Users2,
  Video, // For Online Video
  Wand2, // For Text Effects
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Editor } from "@tiptap/react";

interface RibbonProps {
  onImproveWriting: () => void;
  onDetectTone: () => void;
  onSummarizeDocument: () => void;
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


export function AngleWordRibbon({ editor, onImproveWriting, onDetectTone, onSummarizeDocument }: RibbonProps) {
  const RibbonButton = ({ children, icon: Icon, className: extraClassName, ...props }: { children: React.ReactNode, icon: React.ElementType, className?: string, [key: string]: any }) => (
    <Button variant="ghost" className={`flex flex-col items-center h-auto p-2 ${extraClassName || ''}`} {...props}>
      <Icon className="w-5 h-5 mb-1" />
      <span className="text-xs text-center">{children}</span>
    </Button>
  );

  const SmallRibbonButton = ({ icon: Icon, tooltip, ...props }: { icon: React.ElementType, tooltip: string, [key: string]: any }) => (
    // Tooltip can be added here if ShadCN Tooltip is integrated
    <Button variant="ghost" className="p-1 h-auto" title={tooltip} {...props}>
      <Icon className="w-4 h-4" />
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
    // A more robust check for any font size attribute from TextStyle
    const { fontSize } = editor.getAttributes('textStyle');
    if (fontSize && typeof fontSize === 'string' && fontSize.endsWith('pt')) {
      return fontSize.replace('pt', '');
    }
    // Check legacy way for compatibility if needed
    for (const size of FONT_SIZES) {
      if (editor.isActive('textStyle', { fontSize: `${size}pt` })) {
        return size;
      }
    }
    return '11'; // Default size
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

  return (
    <div className="bg-secondary/30 p-1 border-b shadow-sm">
      <Tabs defaultValue="home" className="w-full">
        <TabsList className="bg-transparent p-0 h-auto justify-start">
          <TabsTrigger value="file" className="text-sm px-3 py-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none">File</TabsTrigger>
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

        <TabsContent value="file" className="bg-background p-2 flex items-start">
          <RibbonGroup title="File">
            <RibbonButton icon={FilePlus}>New</RibbonButton>
            <RibbonButton icon={File}>Open</RibbonButton>
            <RibbonButton icon={Save}>Save</RibbonButton>
            <RibbonButton icon={Printer}>Print</RibbonButton>
          </RibbonGroup>
        </TabsContent>

        <TabsContent value="home" className="bg-background p-2 flex items-start">
          <RibbonGroup title="Clipboard" className="items-stretch">
            <div className="flex flex-col items-center">
              <Button variant="ghost" className="flex flex-col items-center h-auto p-2 px-3">
                <ClipboardPaste className="w-7 h-7 mb-1 text-primary" />
                <span className="text-sm">Paste <ChevronDown className="inline w-3 h-3 ml-0.5" /></span>
              </Button>
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
                      <DropdownMenuItem key={size} onClick={() => editor?.chain().focus().setFontSize(`${size}pt`).run()}>
                        {size}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <SmallRibbonButton icon={ALargeSmall} tooltip="Increase Font Size"/>
                <SmallRibbonButton icon={CaseLower} tooltip="Decrease Font Size"/>
                <SmallRibbonButton icon={CaseSensitive} tooltip="Change Case"/>
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
                <SmallRibbonButton
                  icon={Highlighter}
                  tooltip="Text Highlight Color"
                  onClick={() => editor?.chain().focus().toggleHighlight({ color: '#FFF3A3' }).run()}
                  data-active={editor?.isActive('highlight')}
                />
                <SmallRibbonButton icon={Palette} tooltip="Font Color"/>
              </div>
            </div>
          </RibbonGroup>
          <RibbonGroup title="Paragraph">
            <div className="flex flex-col">
              <div className="flex items-center">
                <SmallRibbonButton icon={List} tooltip="Bullets"/>
                <SmallRibbonButton icon={ListOrdered} tooltip="Numbering"/>
                <SmallRibbonButton icon={ListChecks} tooltip="Multilevel List"/>
                <SmallRibbonButton icon={IndentDecrease} tooltip="Decrease Indent"/>
                <SmallRibbonButton icon={IndentIncrease} tooltip="Increase Indent"/>
                <SmallRibbonButton icon={ArrowDownAZ} tooltip="Sort"/>
                <SmallRibbonButton icon={Pilcrow} tooltip="Show/Hide ¶"/>
              </div>
              <div className="flex items-center mt-1">
                <SmallRibbonButton icon={AlignLeft} tooltip="Align Left"/>
                <SmallRibbonButton icon={AlignCenter} tooltip="Align Center"/>
                <SmallRibbonButton icon={AlignRight} tooltip="Align Right"/>
                <SmallRibbonButton icon={AlignJustify} tooltip="Justify"/>
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
            <RibbonButton icon={FileTextIcon}>Margins</RibbonButton>
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
  );
}
