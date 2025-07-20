
"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronUp, ChevronDown, Pin } from "lucide-react";
import { Editor } from "@tiptap/react";
import { useState, useRef, useEffect } from "react";
import { FileMenu } from "./file-menu";
import type { Margins, Orientation, PageSize, Columns as ColumnsType } from "@/app/page";
import { CustomMarginsDialog } from "./custom-margins-dialog";

import { HomeTab } from "./ribbon-tabs/home-tab";
import { InsertTab } from "./ribbon-tabs/insert-tab";
import { DrawTab } from "./ribbon-tabs/draw-tab";
import { DesignTab } from "./ribbon-tabs/design-tab";
import { LayoutTab } from "./ribbon-tabs/layout-tab";
import { ReferencesTab } from "./ribbon-tabs/references-tab";
import { MailingsTab } from "./ribbon-tabs/mailings-tab";
import { ReviewTab } from "./ribbon-tabs/review-tab";
import { ViewTab } from "./ribbon-tabs/view-tab";
import { AIToolsTab } from "./ribbon-tabs/ai-tools-tab";
import { cn } from "@/lib/utils";


interface RibbonProps {
  onImproveWriting: () => void;
  onDetectTone: () => void;
  onSummarizeDocument: () => void;
  editor: Editor | null;
  documentName: string;
  setDocumentName: (name: string) => void;
  margins: Margins;
  setMargins: (margins: Margins) => void;
  orientation: Orientation;
  setOrientation: (orientation: Orientation) => void;
  pageSize: PageSize;
  setPageSize: (pageSize: PageSize) => void;
  columns: ColumnsType;
  setColumns: (columns: ColumnsType) => void;
  isRulerVisible: boolean;
  toggleRuler: () => void;
  onNewDocument: () => void;
  isRibbonExpanded: boolean;
  setIsRibbonExpanded: (isExpanded: boolean) => void;
  isRibbonPinned: boolean;
  setIsRibbonPinned: (isPinned: boolean) => void;
}


export function AngleWordRibbon({
  editor,
  onImproveWriting,
  onDetectTone,
  onSummarizeDocument,
  documentName,
  setDocumentName,
  margins,
  setMargins,
  orientation,
  setOrientation,
  pageSize,
  setPageSize,
  columns,
  setColumns,
  isRulerVisible,
  toggleRuler,
  onNewDocument,
  isRibbonExpanded,
  setIsRibbonExpanded,
  isRibbonPinned,
  setIsRibbonPinned,
}: RibbonProps) {
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const [isCustomMarginsOpen, setIsCustomMarginsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const collapseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any pending collapse timeout when the pin state changes
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
    }
  }, [isRibbonPinned]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (!isRibbonExpanded) {
        setIsRibbonExpanded(true);
    }
  }

  const handleRibbonInteraction = () => {
    // When an item on the ribbon is clicked, collapse it if it's not pinned.
    if (!isRibbonPinned) {
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current);
      }
      collapseTimeoutRef.current = setTimeout(() => {
        setIsRibbonExpanded(false);
      }, 200); // A small delay to allow the action to complete
    }
  };


  return (
    <>
      <FileMenu
        isOpen={isFileMenuOpen}
        onClose={() => setIsFileMenuOpen(false)}
        editor={editor}
        documentName={documentName}
        setDocumentName={setDocumentName}
        onNewDocument={onNewDocument}
        margins={margins}
        setMargins={setMargins}
        orientation={orientation}
        setOrientation={setOrientation}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
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
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full relative">
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
              <TabsTrigger value="draw" className="text-sm px-3 py-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none">Draw</TabsTrigger>
              <TabsTrigger value="design" className="text-sm px-3 py-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none">Design</TabsTrigger>
              <TabsTrigger value="layout" className="text-sm px-3 py-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none">Layout</TabsTrigger>
              <TabsTrigger value="references" className="text-sm px-3 py-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none">References</TabsTrigger>
              <TabsTrigger value="mailings" className="text-sm px-3 py-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none">Mailings</TabsTrigger>
              <TabsTrigger value="review" className="text-sm px-3 py-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none">Review</TabsTrigger>
              <TabsTrigger value="view" className="text-sm px-3 py-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none">View</TabsTrigger>
              <TabsTrigger value="ai-tools" className="text-sm px-3 py-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none">AI Tools</TabsTrigger>
            </TabsList>
          </div>
          
          <div className={cn(!isRibbonExpanded && "hidden")} onClickCapture={handleRibbonInteraction}>
              <TabsContent value="home" className="bg-background p-2 min-h-[120px] flex items-start">
                <HomeTab editor={editor} />
              </TabsContent>

              <TabsContent value="insert" className="bg-background p-2 min-h-[120px] flex items-start">
                <InsertTab editor={editor} />
              </TabsContent>

              <TabsContent value="draw" className="bg-background p-2 min-h-[120px] flex items-start">
                <DrawTab editor={editor} />
              </TabsContent>

              <TabsContent value="design" className="bg-background p-2 min-h-[120px] flex items-start">
                <DesignTab editor={editor} />
              </TabsContent>
              
              <TabsContent value="layout" className="bg-background p-2 min-h-[120px] flex items-start">
                <LayoutTab 
                  editor={editor}
                  margins={margins}
                  setMargins={setMargins}
                  orientation={orientation}
                  setOrientation={setOrientation}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  columns={columns}
                  setColumns={setColumns}
                  onCustomMarginsClick={() => setIsCustomMarginsOpen(true)}
                />
              </TabsContent>

              <TabsContent value="references" className="bg-background p-2 min-h-[120px] flex items-start">
                <ReferencesTab editor={editor} />
              </TabsContent>

              <TabsContent value="mailings" className="bg-background p-2 min-h-[120px] flex items-start">
                <MailingsTab editor={editor} />
              </TabsContent>

              <TabsContent value="review" className="bg-background p-2 min-h-[120px] flex items-start">
                <ReviewTab editor={editor} />
              </TabsContent>

              <TabsContent value="view" className="bg-background p-2 min-h-[120px] flex items-start">
                 <ViewTab 
                    editor={editor} 
                    isRulerVisible={isRulerVisible} 
                    toggleRuler={toggleRuler} 
                 />
              </TabsContent>

              <TabsContent value="ai-tools" className="bg-background p-2 min-h-[120px] flex items-start">
                 <AIToolsTab 
                    onImproveWriting={onImproveWriting} 
                    onDetectTone={onDetectTone} 
                    onSummarizeDocument={onSummarizeDocument} 
                 />
              </TabsContent>

              <div className="absolute bottom-1 right-2 flex items-center">
                   <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={() => setIsRibbonPinned(!isRibbonPinned)}
                      title={isRibbonPinned ? "Unpin the ribbon" : "Pin the ribbon"}
                   >
                      <Pin className={cn("h-4 w-4", !isRibbonPinned && "rotate-45 text-muted-foreground")} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsRibbonExpanded(!isRibbonExpanded)}>
                      {isRibbonExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      <span className="sr-only">{isRibbonExpanded ? "Collapse Ribbon" : "Expand Ribbon"}</span>
                  </Button>
              </div>
          </div>
        </Tabs>
      </div>
    </>
  );
}
