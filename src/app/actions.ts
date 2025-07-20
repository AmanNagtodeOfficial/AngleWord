
"use server";

import { improveWritingQuality, type ImproveWritingQualityInput, type ImproveWritingQualityOutput } from "@/ai/flows/improve-writing-quality";
import { detectToneAndSuggestAlternatives, type DetectToneAndSuggestAlternativesInput, type DetectToneAndSuggestAlternativesOutput } from "@/ai/flows/detect-tone-and-suggest-alternatives";
import { summarizeDocument, type SummarizeDocumentInput, type SummarizeDocumentOutput } from "@/ai/flows/summarize-document";
import { generatePdfFromHtml, type GeneratePdfFromHtmlInput, type GeneratePdfFromHtmlOutput } from "@/ai/flows/generate-pdf-from-html";

export async function improveTextAction(
  input: ImproveWritingQualityInput
): Promise<ImproveWritingQualityOutput> {
  try {
    return await improveWritingQuality(input);
  } catch (error) {
    console.error("Error in improveTextAction:", error);
    throw new Error("Failed to improve text. Please try again.");
  }
}

export async function detectToneAction(
  input: DetectToneAndSuggestAlternativesInput
): Promise<DetectToneAndSuggestAlternativesOutput> {
  try {
    return await detectToneAndSuggestAlternatives(input);
  } catch (error) {
    console.error("Error in detectToneAction:", error);
    throw new Error("Failed to detect tone. Please try again.");
  }
}

export async function summarizeTextAction(
  input: SummarizeDocumentInput
): Promise<SummarizeDocumentOutput> {
  try {
    return await summarizeDocument(input);
  } catch (error) {
    console.error("Error in summarizeTextAction:", error);
    throw new Error("Failed to summarize document. Please try again.");
  }
}

export async function generatePdfAction(
  input: GeneratePdfFromHtmlInput
): Promise<GeneratePdfFromHtmlOutput> {
  try {
    return await generatePdfFromHtml(input);
  } catch (error) {
    console.error("Error in generatePdfAction:", error);
    throw new Error("Failed to generate PDF. Please try again.");
  }
}
