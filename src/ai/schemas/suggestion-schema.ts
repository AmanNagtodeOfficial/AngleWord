/**
 * @fileOverview This file defines the Zod schemas and TypeScript types for writing quality suggestions.
 * By separating these from the flow, we can avoid "use server" directive errors in Next.js
 * when these types are imported into client-side components.
 */

import { z } from 'zod';

// Defines the schema for a single suggestion.
export const SuggestionSchema = z.object({
  type: z.enum(['grammar', 'spelling', 'style', 'vocabulary']).describe("The category of the suggestion."),
  original: z.string().describe("The original text snippet with the issue."),
  suggestion: z.string().describe("The corrected or improved text snippet."),
  explanation: z.string().describe("A brief explanation of why the change was made."),
});
export type Suggestion = z.infer<typeof SuggestionSchema>;


// Defines the schema for the input of the improveWritingQuality flow.
export const ImproveWritingQualityInputSchema = z.object({
  text: z.string().describe('The text to analyze and improve.'),
  language: z.string().optional().describe('The language of the text (e.g., "English (United States)").'),
});
export type ImproveWritingQualityInput = z.infer<typeof ImproveWritingQualityInputSchema>;


// Defines the schema for the output of the improveWritingQuality flow.
export const ImproveWritingQualityOutputSchema = z.object({
  suggestions: z.array(SuggestionSchema).describe("A list of suggestions for improving the text. If no issues are found, this will be an empty array."),
});
export type ImproveWritingQualityOutput = z.infer<typeof ImproveWritingQualityOutputSchema>;
