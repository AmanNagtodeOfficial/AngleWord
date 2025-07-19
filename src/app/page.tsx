
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AngleWordHeader } from "@/components/angle-word/header";
import { AngleWordRibbon } from "@/components/angle-word/ribbon";
import { EditorArea, type AITool } from "@/components/angle-word/editor-area";
import { Editor } from "@tiptap/react";

export type SaveStatus = "unsaved" | "saving" | "saved";

export default function AngleWordPage() {
  const [activeAITool, setActiveAITool] = useState<AITool>(null);
  const [editor, setEditor] = useState<Editor | null>(null);
  const [documentContent, setDocumentContent] = useState("<p>Start writing your document here...</p>");
  const [documentName, setDocumentName] = useState("Untitled Document");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");

  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleAutoSave = useCallback(() => {
    setSaveStatus("saving");
    // Simulate network request
    setTimeout(() => {
      setSaveStatus("saved");
    }, 1000);
  }, []);

  const handleContentUpdate = (content: string) => {
    setDocumentContent(content);
    setSaveStatus("unsaved");

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

  // These functions are passed to the Ribbon to set the active AI tool,
  // which then triggers the modal in EditorArea.
  const handleTriggerImproveWriting = () => setActiveAITool("improve");
  const handleTriggerDetectTone = () => setActiveAITool("tone");
  const handleTriggerSummarizeDocument = () => setActiveAITool("summarize");

  return (
    <div className="flex flex-col h-screen bg-muted/20 overflow-hidden">
      <AngleWordHeader documentName={documentName} saveStatus={saveStatus} />
      <AngleWordRibbon
        editor={editor}
        onImproveWriting={handleTriggerImproveWriting}
        onDetectTone={handleTriggerDetectTone}
        onSummarizeDocument={handleTriggerSummarizeDocument}
        documentName={documentName}
        setDocumentName={setDocumentName}
      />
      <main className="flex-grow overflow-auto">
        <EditorArea 
          activeAITool={activeAITool} 
          setActiveAITool={setActiveAITool} 
          setEditor={setEditor}
          content={documentContent}
          onContentUpdate={handleContentUpdate}
        />
      </main>
    </div>
  );
}
