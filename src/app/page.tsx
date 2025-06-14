"use client";

import { useState } from "react";
import { AngleWordHeader } from "@/components/angle-word/header";
import { AngleWordRibbon } from "@/components/angle-word/ribbon";
import { EditorArea, type AITool } from "@/components/angle-word/editor-area";

export default function AngleWordPage() {
  const [activeAITool, setActiveAITool] = useState<AITool>(null);

  // These functions are passed to the Ribbon to set the active AI tool,
  // which then triggers the modal in EditorArea.
  const handleTriggerImproveWriting = () => setActiveAITool("improve");
  const handleTriggerDetectTone = () => setActiveAITool("tone");
  const handleTriggerSummarizeDocument = () => setActiveAITool("summarize");

  return (
    <div className="flex flex-col h-screen bg-muted/20 overflow-hidden">
      <AngleWordHeader />
      <AngleWordRibbon
        onImproveWriting={handleTriggerImproveWriting}
        onDetectTone={handleTriggerDetectTone}
        onSummarizeDocument={handleTriggerSummarizeDocument}
      />
      <main className="flex-grow overflow-auto">
        <EditorArea activeAITool={activeAITool} setActiveAITool={setActiveAITool} />
      </main>
    </div>
  );
}
