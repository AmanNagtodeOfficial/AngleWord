
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AngleWordHeader } from "@/components/angle-word/header";
import { AngleWordRibbon } from "@/components/angle-word/ribbon";
import { EditorArea, type AITool } from "@/components/angle-word/editor-area";
import { DocumentTabs } from "@/components/angle-word/document-tabs";
import { StatusBar } from "@/components/angle-word/status-bar";
import { Editor, EditorEvents } from "@tiptap/react";
import AuthWrapper from "@/components/auth-wrapper";
import { BubbleMenu } from "@tiptap/extension-bubble-menu";

export type SaveStatus = "unsaved" | "saving" | "saved";

export interface Margins {
  top: string;
  bottom: string;
  left: string;
  right: string;
}

export type Orientation = "portrait" | "landscape";

export interface PageSize {
  name: string;
  width: string;
  height: string;
}

export type Columns = 1 | 2 | 3;

export type ViewMode = "print" | "web";

export type EditorContext = 'table' | null;

export interface Document {
  id: string;
  name: string;
  content: string;
  saveStatus: SaveStatus;
  margins: Margins;
  orientation: Orientation;
  pageSize: PageSize;
  columns: Columns;
}

export interface Language {
    code: string;
    name: string;
}

export const LANGUAGES: Language[] = [
    { code: 'en-US', name: 'English (United States)' },
    { code: 'en-GB', name: 'English (United Kingdom)' },
    { code: 'es-ES', name: 'Español (España)' },
    { code: 'fr-FR', name: 'Français (France)' },
    { code: 'de-DE', name: 'Deutsch (Deutschland)' },
    { code: 'it-IT', name: 'Italiano (Italia)' },
    { code: 'pt-BR', name: 'Português (Brasil)' },
    { code: 'ru-RU', name: 'Русский (Россия)' },
    { code: 'zh-CN', name: '中文 (简体)' },
    { code: 'ja-JP', name: '日本語 (日本)' },
    { code: 'ko-KR', name: '한국어 (대한민국)' },
    { code: 'ar-SA', name: 'العربية (المملكة العربية السعودية)' },
];


const defaultMargins: Margins = {
    top: '1in',
    bottom: '1in',
    left: '1in',
    right: '1in',
};

export const PAGE_SIZES: { [key: string]: PageSize } = {
  letter: { name: 'Letter', width: '8.5in', height: '11in' },
  a4: { name: 'A4', width: '210mm', height: '297mm' },
  legal: { name: 'Legal', width: '8.5in', height: '14in' },
};

export const MARGIN_PRESETS: { [key: string]: { name: string; values: Margins, details: string[] } } = {
    normal: { name: 'Normal', values: { top: '2.54cm', bottom: '2.54cm', left: '2.54cm', right: '2.54cm' }, details: ['Top: 2.54 cm', 'Bottom: 2.54 cm', 'Left: 2.54 cm', 'Right: 2.54 cm'] },
    narrow: { name: 'Narrow', values: { top: '1.27cm', bottom: '1.27cm', left: '1.27cm', right: '1.27cm' }, details: ['Top: 1.27 cm', 'Bottom: 1.27 cm', 'Left: 1.27 cm', 'Right: 1.27 cm'] },
    moderate: { name: 'Moderate', values: { top: '2.54cm', bottom: '2.54cm', left: '1.91cm', right: '1.91cm' }, details: ['Top: 2.54 cm', 'Bottom: 2.54 cm', 'Left: 1.91 cm', 'Right: 1.91 cm'] },
    wide: { name: 'Wide', values: { top: '2.54cm', bottom: '2.54cm', left: '5.08cm', right: '5.08cm' }, details: ['Top: 2.54 cm', 'Bottom: 2.54 cm', 'Left: 5.08 cm', 'Right: 5.08 cm'] },
    mirrored: { name: 'Mirrored', values: { top: '2.54cm', bottom: '2.54cm', left: '3.18cm', right: '2.54cm' }, details: ['Top: 2.54 cm', 'Bottom: 2.54 cm', 'Inside: 3.18 cm', 'Outside: 2.54 cm'] },
    office2003: { name: 'Office 2003 Default', values: { top: '2.54cm', bottom: '2.54cm', left: '3.18cm', right: '3.18cm' }, details: ['Top: 2.54 cm', 'Bottom: 2.54 cm', 'Left: 3.18 cm', 'Right: 3.18 cm'] },
};



const createNewDocument = (name: string): Document => ({
  id: Date.now().toString(),
  name,
  content: `<p>Start writing your document here...</p>`,
  saveStatus: "saved",
  margins: defaultMargins,
  orientation: 'portrait',
  pageSize: PAGE_SIZES.letter,
  columns: 1,
});

function AngleWordPage() {
  const [activeAITool, setActiveAITool] = useState<AITool>(null);
  const [editor, setEditor] = useState<Editor | null>(null);
  const [documents, setDocuments] = useState<Document[]>([
    createNewDocument("Untitled Document"),
  ]);
  const [activeDocumentId, setActiveDocumentId] = useState<string>(
    documents[0].id
  );
  const [isRulerVisible, setIsRulerVisible] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("print");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [wordCount, setWordCount] = useState(0);
  const [isRibbonExpanded, setIsRibbonExpanded] = useState(true);
  const [isRibbonPinned, setIsRibbonPinned] = useState(true);
  const [activeContext, setActiveContext] = useState<EditorContext>(null);
  const [_, setForceRender] = useState(0);
  const [language, setLanguage] = useState<Language>(LANGUAGES[0]);


  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeDocument = documents.find((doc) => doc.id === activeDocumentId);

  const updateDocument = (docId: string, updates: Partial<Document>) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) => (doc.id === docId ? { ...doc, ...updates } : doc))
    );
  };

  const handleAutoSave = useCallback(() => {
    if (!activeDocumentId) return;
    updateDocument(activeDocumentId, { saveStatus: "saving" });
    // Simulate network request
    setTimeout(() => {
      updateDocument(activeDocumentId, { saveStatus: "saved" });
    }, 1000);
  }, [activeDocumentId]);

  const handleContentUpdate = (content: string) => {
    if (!activeDocumentId) return;
    updateDocument(activeDocumentId, { content, saveStatus: "unsaved" });

    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    autoSaveTimeoutRef.current = setTimeout(() => {
      handleAutoSave();
    }, 2000); // Auto-save after 2 seconds of inactivity
  };

  useEffect(() => {
    if (editor) {
        const forceUpdate = () => setForceRender(c => c + 1);

        const updateEditorContext = ({ editor }: EditorEvents['selectionUpdate' | 'transaction']) => {
            const isTable = editor.isActive('table');
            setActiveContext(isTable ? 'table' : null);
            
            const text = editor.getText();
            const count = text.trim().split(/\s+/).filter(Boolean).length;
            setWordCount(count);

            forceUpdate();
        };
        
        editor.on('selectionUpdate', updateEditorContext);
        editor.on('transaction', updateEditorContext);
        
        return () => {
            editor.off('selectionUpdate', updateEditorContext);
            editor.off('transaction', updateEditorContext);
        };
    }
  }, [editor]);

  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);
  
  // Load content into editor when active document changes
  useEffect(() => {
    if (activeDocument && editor && editor.getHTML() !== activeDocument.content) {
      editor.commands.setContent(activeDocument.content, false);
    }
  }, [activeDocument, editor]);


  // These functions are passed to the Ribbon to set the active AI tool,
  // which then triggers the modal in EditorArea.
  const handleTriggerImproveWriting = () => setActiveAITool("improve");
  const handleTriggerDetectTone = () => setActiveAITool("tone");
  const handleTriggerSummarizeDocument = () => setActiveAITool("summarize");

  const handleAddDocument = () => {
    const newDoc = createNewDocument(`Untitled Document ${documents.length + 1}`);
    setDocuments([...documents, newDoc]);
    setActiveDocumentId(newDoc.id);
  };

  const handleCloseDocument = (docId: string) => {
    setDocuments((prev) => {
      const newDocs = prev.filter((doc) => doc.id !== docId);
      if (newDocs.length === 0) {
        const newDoc = createNewDocument("Untitled Document");
        setActiveDocumentId(newDoc.id);
        return [newDoc];
      }
      if (activeDocumentId === docId) {
        setActiveDocumentId(newDocs[newDocs.length - 1].id);
      }
      return newDocs;
    });
  };

  const setDocumentName = (name: string, docId?: string) => {
    const idToUpdate = docId || activeDocumentId;
    if(idToUpdate) {
      updateDocument(idToUpdate, { name, saveStatus: "unsaved" });
    }
  }

  const setDocumentMargins = (margins: Margins) => {
    if (activeDocumentId) {
      updateDocument(activeDocumentId, { margins, saveStatus: "unsaved" });
    }
  }

  const setDocumentOrientation = (orientation: Orientation) => {
    if (activeDocumentId) {
      updateDocument(activeDocumentId, { orientation, saveStatus: "unsaved" });
    }
  };

  const setDocumentPageSize = (pageSize: PageSize) => {
    if (activeDocumentId) {
      updateDocument(activeDocumentId, { pageSize, saveStatus: "unsaved" });
    }
  };

  const setDocumentColumns = (columns: Columns) => {
    if (activeDocumentId) {
      updateDocument(activeDocumentId, { columns, saveStatus: "unsaved" });
    }
  };


  if (!activeDocument) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <AuthWrapper>
      <div className="flex flex-col h-screen bg-muted/20 overflow-hidden">
        <AngleWordHeader documentName={activeDocument.name} saveStatus={activeDocument.saveStatus} />
        <DocumentTabs
          documents={documents}
          activeDocumentId={activeDocumentId}
          onSelectTab={setActiveDocumentId}
          onCloseTab={handleCloseDocument}
          onAddTab={handleAddDocument}
          onRenameTab={setDocumentName}
        />
        <AngleWordRibbon
          editor={editor}
          onImproveWriting={handleTriggerImproveWriting}
          onDetectTone={handleTriggerDetectTone}
          onSummarizeDocument={handleTriggerSummarizeDocument}
          documentName={activeDocument.name}
          setDocumentName={setDocumentName}
          margins={activeDocument.margins}
          setMargins={setDocumentMargins}
          orientation={activeDocument.orientation}
          setOrientation={setDocumentOrientation}
          pageSize={activeDocument.pageSize}
          setPageSize={setDocumentPageSize}
          columns={activeDocument.columns}
          setColumns={setDocumentColumns}
          isRulerVisible={isRulerVisible}
          toggleRuler={() => setIsRulerVisible(!isRulerVisible)}
          onNewDocument={handleAddDocument}
          isRibbonExpanded={isRibbonExpanded}
          setIsRibbonExpanded={setIsRibbonExpanded}
          isRibbonPinned={isRibbonPinned}
          setIsRibbonPinned={setIsRibbonPinned}
          activeContext={activeContext}
        />
        <main className="flex-grow overflow-auto">
          <EditorArea
            key={activeDocument.id} // Re-mounts editor area on tab change
            activeAITool={activeAITool}
            setActiveAITool={setActiveAITool}
            setEditor={setEditor}
            content={activeDocument.content}
            onContentUpdate={handleContentUpdate}
            margins={activeDocument.margins}
            orientation={activeDocument.orientation}
            pageSize={activeDocument.pageSize}
            columns={activeDocument.columns}
            isRulerVisible={isRulerVisible}
            viewMode={viewMode}
            zoomLevel={zoomLevel}
          />
        </main>
        <StatusBar
          pageNumber={1}
          pageCount={1}
          wordCount={wordCount}
          viewMode={viewMode}
          setViewMode={setViewMode}
          zoomLevel={zoomLevel}
          setZoomLevel={setZoomLevel}
          language={language}
          setLanguage={setLanguage}
        />
      </div>
    </AuthWrapper>
  );
}

export default AngleWordPage;
