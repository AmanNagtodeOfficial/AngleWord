
"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronUp, ChevronDown, Pin } from "lucide-react";
import { Editor } from "@tiptap/react";
import { useState, useRef, useEffect } from "react";
import { FileMenu } from "./file-menu";
import type { Margins, Orientation, PageSize, Columns as ColumnsType, EditorContext } from "@/app/page";
import { CustomMarginsDialog } from "./custom-margins-dialog";

import { HomeTab, InsertTab, DrawTab, DesignTab, LayoutTab, ReferencesTab, MailingsTab, ReviewTab, ViewTab, AIToolsTab, TableDesignTab, TableLayoutTab } from "./ribbon-tabs";
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
  activeContext: EditorContext;
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
  activeContext,
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
          <div className="flex justify-between items-end">
             <div className="flex items-center">
                <Button
                  onClick={() => setIsFileMenuOpen(true)}
                  className="text-sm px-4 py-1.5 rounded-b-none rounded-t-md font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  File
                </Button>
                <TabsList className="bg-transparent p-0 h-auto justify-start ml-2">
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

                {activeContext === 'table' && (
                  <div className="flex flex-col items-center ml-4">
                     <div className="text-sm text-primary font-semibold">Table Tools</div>
                     <TabsList className="bg-transparent p-0 h-auto justify-start">
                       <TabsTrigger value="table-design" className="text-sm px-3 py-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none bg-blue-100">Table Design</TabsTrigger>
                       <TabsTrigger value="table-layout" className="text-sm px-3 py-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none bg-blue-100">Table Layout</TabsTrigger>
                     </TabsList>
                  </div>
                )}
              </div>
          </div>
          
          <div className={cn("bg-background min-h-[120px] flex items-start", !isRibbonExpanded && "hidden")} onClickCapture={handleRibbonInteraction}>
            <TabsContent value="home" className="w-full p-0 m-0">
              <HomeTab editor={editor} />
            </TabsContent>
            <TabsContent value="insert" className="w-full p-0 m-0">
              <InsertTab editor={editor} />
            </TabsContent>
            <TabsContent value="draw" className="w-full p-0 m-0">
              <DrawTab editor={editor} />
            </TabsContent>
            <TabsContent value="design" className="w-full p-0 m-0">
              <DesignTab editor={editor} />
            </TabsContent>
            <TabsContent value="layout" className="w-full p-0 m-0">
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
            <TabsContent value="references" className="w-full p-0 m-0">
              <ReferencesTab editor={editor} />
            </TabsContent>
            <TabsContent value="mailings" className="w-full p-0 m-0">
              <MailingsTab editor={editor} />
            </TabsContent>
            <TabsContent value="review" className="w-full p-0 m-0">
              <ReviewTab editor={editor} />
            </TabsContent>
            <TabsContent value="view" className="w-full p-0 m-0">
                <ViewTab 
                  editor={editor} 
                  isRulerVisible={isRulerVisible} 
                  toggleRuler={toggleRuler} 
                />
            </TabsContent>
            <TabsContent value="ai-tools" className="w-full p-0 m-0">
                <AIToolsTab 
                  onImproveWriting={onImproveWriting} 
                  onDetectTone={onDetectTone} 
                  onSummarizeDocument={onSummarizeDocument} 
                />
            </TabsContent>
            <TabsContent value="table-design" className="w-full p-0 m-0">
              <TableDesignTab editor={editor} />
            </TabsContent>
            <TabsContent value="table-layout" className="w-full p-0 m-0">
              <TableLayoutTab editor={editor} />
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
