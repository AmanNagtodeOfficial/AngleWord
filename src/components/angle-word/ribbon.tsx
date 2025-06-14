
"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AppWindow,
  BarChart3,
  Baseline,
  Bold,
  Book,
  BookCopy, // For Blank Page
  BookOpen,
  Brain,
  ClipboardCheck,
  ClipboardPaste, // For Paste
  Code2,
  Columns,
  Copyright, // For Watermark
  Copy,
  Cut,
  ChevronDown,
  File,
  FilePlus,
  FilePlus2, // For Blank Page (Alternative if BookCopy is not ideal)
  FileTextIcon,
  Footprints,
  GalleryHorizontal,
  GalleryVerticalEnd,
  Globe,
  Grid3x3,
  Hash, // For PageNumber
  Highlighter,
  Image as LucideImage,
  IndentDecrease, // For Outdent
  IndentIncrease, // For Indent
  Italic,
  LayoutGrid,
  List,
  ListOrdered,
  ListTree,
  Mail,
  Maximize2, // Icon for Size (alternative: Scaling)
  MessageCircle,
  Newspaper, // For Cover Page
  Omega, // For Symbol
  Paintbrush,
  Palette,
  PanelBottom, // For Footer
  PanelLeftOpen,
  PanelTop, // For Header
  Percent,
  Printer,
  PrinterIcon,
  RectangleHorizontal,
  Replace, // Changed from FindReplace
  Ruler,
  Save,
  Scaling, // For Page Size
  ScanText, // For Word Count
  Search,
  Scissors,
  Shapes,
  Sparkles,
  SpellCheck,
  SplitSquareVertical,
  Square,
  StretchHorizontal,
  Strikethrough,
  Table,
  Tags,
  Underline,
  UnfoldVertical, // For Page Break
  Users2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface RibbonProps {
  onImproveWriting: () => void;
  onDetectTone: () => void;
  onSummarizeDocument: () => void;
}

export function AngleWordRibbon({ onImproveWriting, onDetectTone, onSummarizeDocument }: RibbonProps) {
  const RibbonButton = ({ children, icon: Icon, ...props }: { children: React.ReactNode, icon: React.ElementType, [key: string]: any }) => (
    <Button variant="ghost" className="flex flex-col items-center h-auto p-2" {...props}>
      <Icon className="w-5 h-5 mb-1" />
      <span className="text-xs">{children}</span>
    </Button>
  );

  const RibbonGroup = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="flex flex-col items-center p-1 border-r last:border-r-0">
      <div className="flex items-center gap-0.5">
        {children}
      </div>
      <span className="text-xs text-muted-foreground mt-1">{title}</span>
    </div>
  );
  
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
          <RibbonGroup title="Clipboard">
            <RibbonButton icon={Scissors}>Cut</RibbonButton>
            <RibbonButton icon={Copy}>Copy</RibbonButton>
            <RibbonButton icon={ClipboardPaste}>Paste</RibbonButton>
          </RibbonGroup>
          <RibbonGroup title="Font">
            <Button variant="ghost" className="p-2 text-xs h-auto">PT Sans <ChevronDown className="w-3 h-3 ml-1" /></Button>
            <Button variant="ghost" className="p-2 text-xs h-auto">11 <ChevronDown className="w-3 h-3 ml-1" /></Button>
            <RibbonButton icon={Bold}>Bold</RibbonButton>
            <RibbonButton icon={Italic}>Italic</RibbonButton>
            <RibbonButton icon={Underline}>Underline</RibbonButton>
            <RibbonButton icon={Strikethrough}>Strike</RibbonButton>
            <RibbonButton icon={Highlighter}>Highlight</RibbonButton>
          </RibbonGroup>
          <RibbonGroup title="Paragraph">
            <RibbonButton icon={List}>Bullets</RibbonButton>
            <RibbonButton icon={ListOrdered}>Numbering</RibbonButton>
            <RibbonButton icon={IndentDecrease}>Outdent</RibbonButton>
            <RibbonButton icon={IndentIncrease}>Indent</RibbonButton>
            <RibbonButton icon={Baseline}>Spacing</RibbonButton>
            <RibbonButton icon={AlignLeft}>Left</RibbonButton>
            <RibbonButton icon={AlignCenter}>Center</RibbonButton>
            <RibbonButton icon={AlignRight}>Right</RibbonButton>
            <RibbonButton icon={AlignJustify}>Justify</RibbonButton>
          </RibbonGroup>
          <RibbonGroup title="Editing">
             <RibbonButton icon={Search}>Find</RibbonButton>
             <RibbonButton icon={Replace}>Replace</RibbonButton>
          </RibbonGroup>
        </TabsContent>

        <TabsContent value="insert" className="bg-background p-2 flex items-start">
          <RibbonGroup title="Pages">
            <RibbonButton icon={Newspaper}>Cover</RibbonButton>
            <RibbonButton icon={FilePlus2}>Blank</RibbonButton>
            <RibbonButton icon={UnfoldVertical}>Break</RibbonButton>
          </RibbonGroup>
          <RibbonGroup title="Tables">
            <RibbonButton icon={Table}>Table</RibbonButton>
          </RibbonGroup>
          <RibbonGroup title="Illustrations">
            <RibbonButton icon={LucideImage}>Picture</RibbonButton>
            <RibbonButton icon={Shapes}>Shapes</RibbonButton>
            <RibbonButton icon={BarChart3}>Chart</RibbonButton>
          </RibbonGroup>
           <RibbonGroup title="Header & Footer">
            <RibbonButton icon={PanelTop}>Header</RibbonButton>
            <RibbonButton icon={PanelBottom}>Footer</RibbonButton>
            <RibbonButton icon={Hash}>Page #</RibbonButton>
          </RibbonGroup>
          <RibbonGroup title="Symbols">
            <RibbonButton icon={Omega}>Symbol</RibbonButton>
          </RibbonGroup>
        </TabsContent>

        <TabsContent value="design" className="bg-background p-2 flex items-start">
          <RibbonGroup title="Document Formatting">
            <RibbonButton icon={Palette}>Themes</RibbonButton>
            <RibbonButton icon={Paintbrush}>Colors</RibbonButton>
          </RibbonGroup>
          <RibbonGroup title="Page Background">
             <RibbonButton icon={Square}>Borders</RibbonButton>
             <RibbonButton icon={Copyright}>Watermark</RibbonButton>
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

    