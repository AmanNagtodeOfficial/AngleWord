
"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, File } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Editor } from "@tiptap/react";
import { useState } from "react";
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
}: RibbonProps) {
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const [isCustomMarginsOpen, setIsCustomMarginsOpen] = useState(false);
  
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

          <TabsContent value="home" className="bg-background p-2">
            <HomeTab editor={editor} />
          </TabsContent>

          <TabsContent value="insert" className="bg-background p-2">
            <InsertTab editor={editor} />
          </TabsContent>

          <TabsContent value="draw" className="bg-background p-2">
            <DrawTab editor={editor} />
          </TabsContent>

          <TabsContent value="design" className="bg-background p-2">
            <DesignTab editor={editor} />
          </TabsContent>
          
          <TabsContent value="layout" className="bg-background p-2">
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

          <TabsContent value="references" className="bg-background p-2">
            <ReferencesTab editor={editor} />
          </TabsContent>

          <TabsContent value="mailings" className="bg-background p-2">
            <MailingsTab editor={editor} />
          </TabsContent>

          <TabsContent value="review" className="bg-background p-2">
            <ReviewTab editor={editor} />
          </TabsContent>

          <TabsContent value="view" className="bg-background p-2">
             <ViewTab 
                editor={editor} 
                isRulerVisible={isRulerVisible} 
                toggleRuler={toggleRuler} 
             />
          </TabsContent>

          <TabsContent value="ai-tools" className="bg-background p-2">
             <AIToolsTab 
                onImproveWriting={onImproveWriting} 
                onDetectTone={onDetectTone} 
                onSummarizeDocument={onSummarizeDocument} 
             />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
