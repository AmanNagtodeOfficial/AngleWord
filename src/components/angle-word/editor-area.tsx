"use client";

import { useState, useCallback } from "react";
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

export type AITool = "improve" | "tone" | "summarize" | null;

interface EditorAreaProps {
  activeAITool: AITool;
  setActiveAITool: (tool: AITool) => void;
}

export function EditorArea({ activeAITool, setActiveAITool }: EditorAreaProps) {
  const [documentText, setDocumentText] = useState<string>("");
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

  const handleImproveWriting = useCallback(async () => {
    if (!documentText.trim()) {
      toast({ title: "Input Required", description: "Please enter some text to improve.", variant: "destructive" });
      return;
    }
    setIsLoadingImprove(true);
    setImproveError(null);
    try {
      const result = await improveTextAction({ text: documentText });
      setImproveResult(result);
    } catch (error: any) {
      setImproveError(error.message || "Failed to improve writing.");
      toast({ title: "Error", description: error.message || "Failed to improve writing.", variant: "destructive" });
    } finally {
      setIsLoadingImprove(false);
    }
  }, [documentText, toast]);

  const handleDetectTone = useCallback(async () => {
    if (!documentText.trim()) {
      toast({ title: "Input Required", description: "Please enter some text to detect tone.", variant: "destructive" });
      return;
    }
    setIsLoadingTone(true);
    setToneError(null);
    try {
      // Context can be added later if needed, e.g., from a form field
      const result = await detectToneAction({ text: documentText, context: "general writing" });
      setToneResult(result);
    } catch (error: any) {
      setToneError(error.message || "Failed to detect tone.");
      toast({ title: "Error", description: error.message || "Failed to detect tone.", variant: "destructive" });
    } finally {
      setIsLoadingTone(false);
    }
  }, [documentText, toast]);

  const handleSummarizeDocument = useCallback(async () => {
    if (!documentText.trim()) {
      toast({ title: "Input Required", description: "Please enter some text to summarize.", variant: "destructive" });
      return;
    }
    setIsLoadingSummarize(true);
    setSummarizeError(null);
    try {
      const result = await summarizeTextAction({ documentText: documentText });
      setSummarizeResult(result);
    } catch (error: any) {
      setSummarizeError(error.message || "Failed to summarize document.");
      toast({ title: "Error", description: error.message || "Failed to summarize document.", variant: "destructive" });
    } finally {
      setIsLoadingSummarize(false);
    }
  }, [documentText, toast]);
  
  const applyImprovedText = () => {
    if (improveResult?.improvedText) {
      setDocumentText(improveResult.improvedText);
      setActiveAITool(null);
    }
  };

  // Trigger AI actions when activeAITool changes
  // This logic is now effectively moved to the page.tsx via ribbon button clicks
  // The modal opening is handled by `activeAITool` prop.
  // The API call should be triggered when the modal is opened AND the data is not yet fetched.

  // For example, if a ribbon button sets activeAITool to 'improve', and the modal for 'improve' opens,
  // it should then call handleImproveWriting. This might be better handled inside the modal content,
  // or by having the page.tsx orchestrate this. For now, the ribbon directly calls these handlers.

  if (activeAITool === 'improve' && !isLoadingImprove && !improveResult && !improveError) {
     handleImproveWriting();
  } else if (activeAITool === 'tone' && !isLoadingTone && !toneResult && !toneError) {
     handleDetectTone();
  } else if (activeAITool === 'summarize' && !isLoadingSummarize && !summarizeResult && !summarizeError) {
     handleSummarizeDocument();
  }


  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-background p-4 overflow-hidden">
      <Card className="w-full max-w-4xl h-[calc(100vh-200px)] shadow-xl flex flex-col overflow-hidden">
        <CardContent className="p-0 flex-grow overflow-hidden">
          <DocumentEditor 
            value={documentText} 
            onChange={setDocumentText}
            className="h-full"
          />
        </CardContent>
      </Card>

      {activeAITool === "improve" && (
        <AIModal
          isOpen={activeAITool === "improve"}
          onClose={() => setActiveAITool(null)}
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
          onClose={() => setActiveAITool(null)}
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
          onClose={() => setActiveAITool(null)}
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
