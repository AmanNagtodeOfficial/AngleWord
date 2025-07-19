
"use client";

import { useState, useCallback, useEffect, CSSProperties } from "react";
import { DocumentEditor } from "./document-editor";
import { AIModal } from "./ai-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { improveTextAction, detectToneAction, summarizeTextAction } from "@/app/actions";
import type { ImproveWritingQualityOutput } from "@/ai/flows/improve-writing-quality";
import type { DetectToneAndSuggestAlternativesOutput } from "@/ai/flows/detect-tone-and-suggest-alternatives";
import type { SummarizeDocumentOutput } from "@/ai/flows/summarize-document";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Editor } from "@tiptap/react";
import type { Margins, Orientation, PageSize, Columns } from "@/app/page";
import { cn } from "@/lib/utils";
import { HorizontalRuler, VerticalRuler } from "./ruler";


export type AITool = "improve" | "tone" | "summarize" | null;

interface EditorAreaProps {
  activeAITool: AITool;
  setActiveAITool: (tool: AITool) => void;
  setEditor: (editor: Editor | null) => void;
  content: string;
  onContentUpdate: (content: string) => void;
  margins: Margins;
  orientation: Orientation;
  pageSize: PageSize;
  columns: Columns;
  isRulerVisible: boolean;
}

export function EditorArea({
  activeAITool,
  setActiveAITool,
  setEditor,
  content,
  onContentUpdate,
  margins,
  orientation,
  pageSize,
  columns,
  isRulerVisible,
}: EditorAreaProps) {
  const { toast } = useToast();

  const [isLoadingImprove, setIsLoadingImprove] = useState(false);
  const [improveResult, setImproveResult] = useState<ImproveWritingQualityOutput | null>(null);
  const [improveError, setImproveError] = useState<string | null>(null);

  const [isLoadingTone, setIsLoadingTone] = useState(false);
  const [toneResult, setToneResult] = useState<DetectToneAndSuggestAlternativesOutput | null>(null);
  const [toneError, setToneError] = useState<string | null>(null);

  const [isLoadingSummarize, setIsLoadingSummarize] = useState(false);
  const [summarizeResult, setSummarizeResult] = useState<SummarizeDocumentOutput | null>(null);
  const [summarizeError, setSummarizeError] = useState<string | null>(null);
  
  const [editorInstance, setEditorInstance] = useState<Editor | null>(null);
  
  useEffect(() => {
    setEditor(editorInstance);
  }, [editorInstance, setEditor]);

  const getTextForAI = useCallback(() => {
    if (!editorInstance) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      return tempDiv.textContent || tempDiv.innerText || "";
    }
    return editorInstance.getText();
  }, [editorInstance, content]);


  const handleImproveWriting = useCallback(async () => {
    const text = getTextForAI();
    if (!text.trim()) {
      toast({ title: "Input Required", description: "Please enter some text to improve.", variant: "destructive" });
      return;
    }
    setIsLoadingImprove(true);
    setImproveError(null);
    setImproveResult(null);
    try {
      const result = await improveTextAction({ text });
      setImproveResult(result);
    } catch (error: any) {
      setImproveError(error.message || "Failed to improve writing.");
      toast({ title: "Error", description: error.message || "Failed to improve writing.", variant: "destructive" });
    } finally {
      setIsLoadingImprove(false);
    }
  }, [getTextForAI, toast]);

  const handleDetectTone = useCallback(async () => {
    const text = getTextForAI();
    if (!text.trim()) {
      toast({ title: "Input Required", description: "Please enter some text to detect tone.", variant: "destructive" });
      return;
    }
    setIsLoadingTone(true);
    setToneError(null);
    setToneResult(null);
    try {
      const result = await detectToneAction({ text: text, context: "general writing" });
      setToneResult(result);
    } catch (error: any) {
      setToneError(error.message || "Failed to detect tone.");
      toast({ title: "Error", description: error.message || "Failed to detect tone.", variant: "destructive" });
    } finally {
      setIsLoadingTone(false);
    }
  }, [getTextForAI, toast]);

  const handleSummarizeDocument = useCallback(async () => {
    const text = getTextForAI();
    if (!text.trim()) {
      toast({ title: "Input Required", description: "Please enter some text to summarize.", variant: "destructive" });
      return;
    }
    setIsLoadingSummarize(true);
    setSummarizeError(null);
    setSummarizeResult(null);
    try {
      const result = await summarizeTextAction({ documentText: text });
      setSummarizeResult(result);
    } catch (error: any) {
      setSummarizeError(error.message || "Failed to summarize document.");
      toast({ title: "Error", description: error.message || "Failed to summarize document.", variant: "destructive" });
    } finally {
      setIsLoadingSummarize(false);
    }
  }, [getTextForAI, toast]);
  
  const applyImprovedText = () => {
    if (improveResult?.improvedText) {
      editorInstance?.commands.setContent(improveResult.improvedText);
      setActiveAITool(null);
    }
  };

  useEffect(() => {
    if (activeAITool === 'improve') {
       handleImproveWriting();
    } else if (activeAITool === 'tone') {
       handleDetectTone();
    } else if (activeAITool === 'summarize') {
       handleSummarizeDocument();
    }
  }, [activeAITool, handleImproveWriting, handleDetectTone, handleSummarizeDocument]);

  const handleCloseModal = () => {
    setActiveAITool(null);
    setImproveResult(null);
    setImproveError(null);
    setToneResult(null);
    setToneError(null);
    setSummarizeResult(null);
    setSummarizeError(null);
  };
  
  const pageStyle: CSSProperties = {
    width: orientation === 'portrait' ? pageSize.width : pageSize.height,
    minHeight: orientation === 'portrait' ? pageSize.height : pageSize.width,
    paddingTop: margins.top,
    paddingBottom: margins.bottom,
    paddingLeft: margins.left,
    paddingRight: margins.right,
  };

  const columnClasses = {
    1: 'columns-1',
    2: 'columns-2 gap-8',
    3: 'columns-3 gap-6',
  };


  return (
    <div className="flex-grow p-4 lg:p-8 overflow-auto bg-muted/40">
        <div className="mx-auto w-fit flex">
            {isRulerVisible && (
                <VerticalRuler 
                    pageSize={pageSize}
                    margins={margins}
                    orientation={orientation}
                />
            )}
            <div className="flex flex-col">
                {isRulerVisible && (
                    <HorizontalRuler 
                        pageSize={pageSize}
                        margins={margins}
                        orientation={orientation}
                    />
                )}
                <div 
                    className="bg-background shadow-lg overflow-hidden rounded-sm"
                    style={pageStyle}
                >
                    <DocumentEditor 
                        content={content} 
                        onUpdate={onContentUpdate}
                        setEditor={setEditorInstance}
                        className={cn('h-full', columnClasses[columns])}
                    />
                </div>
            </div>
        </div>
      
      {activeAITool === "improve" && (
        <AIModal
          isOpen={activeAITool === "improve"}
          onClose={handleCloseModal}
          title="Improve Writing Quality"
          isLoading={isLoadingImprove}
          error={improveError}
          onApply={applyImprovedText}
        >
          {improveResult && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 font-headline">Improved Text:</h3>
                <p className="text-sm p-3 bg-secondary/50 rounded-md whitespace-pre-wrap">{improveResult.improvedText}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2 font-headline">Suggestions:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {improveResult.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </AIModal>
      )}

      {activeAITool === "tone" && (
         <AIModal
          isOpen={activeAITool === "tone"}
          onClose={handleCloseModal}
          title="Tone Detection & Suggestions"
          isLoading={isLoadingTone}
          error={toneError}
        >
          {toneResult && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1 font-headline">Detected Tone:</h3>
                <p className="text-sm p-2 bg-secondary/50 rounded-md">{toneResult.detectedTone}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2 font-headline">Suggested Alternatives:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {toneResult.suggestedAlternatives.map((alt, index) => (
                    <li key={index}>{alt}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </AIModal>
      )}

      {activeAITool === "summarize" && (
        <AIModal
          isOpen={activeAITool === "summarize"}
          onClose={handleCloseModal}
          title="Document Summary"
          isLoading={isLoadingSummarize}
          error={summarizeError}
        >
          {summarizeResult && (
            <div>
              <h3 className="font-semibold mb-2 font-headline">Summary:</h3>
              <p className="text-sm p-3 bg-secondary/50 rounded-md whitespace-pre-wrap">{summarizeResult.summary}</p>
            </div>
          )}
        </AIModal>
      )}
    </div>
  );
}
