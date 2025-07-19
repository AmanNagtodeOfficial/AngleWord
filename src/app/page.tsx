
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AngleWordHeader } from "@/components/angle-word/header";
import { AngleWordRibbon } from "@/components/angle-word/ribbon";
import { EditorArea, type AITool } from "@/components/angle-word/editor-area";
import { DocumentTabs } from "@/components/angle-word/document-tabs";
import { Editor } from "@tiptap/react";
import AuthWrapper from "@/components/auth-wrapper";

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
          />
        </main>
      </div>
    </AuthWrapper>
  );
}

export default AngleWordPage;
