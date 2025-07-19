
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AngleWordHeader } from "@/components/angle-word/header";
import { AngleWordRibbon } from "@/components/angle-word/ribbon";
import { EditorArea, type AITool } from "@/components/angle-word/editor-area";
import { DocumentTabs } from "@/components/angle-word/document-tabs";
import { Editor } from "@tiptap/react";
import AuthWrapper from "@/components/auth-wrapper";

export type SaveStatus = "unsaved" | "saving" | "saved";

export interface Document {
  id: string;
  name: string;
  content: string;
  saveStatus: SaveStatus;
}

const createNewDocument = (name: string): Document => ({
  id: Date.now().toString(),
  name,
  content: `<p>Start writing your document here...</p>`,
  saveStatus: "saved",
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
        />
        <main className="flex-grow overflow-auto">
          <EditorArea
            key={activeDocument.id} // Re-mounts editor area on tab change
            activeAITool={activeAITool}
            setActiveAITool={setActiveAITool}
            setEditor={setEditor}
            content={activeDocument.content}
            onContentUpdate={handleContentUpdate}
          />
        </main>
      </div>
    </AuthWrapper>
  );
}

export default AngleWordPage;
