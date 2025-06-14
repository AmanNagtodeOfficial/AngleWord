'use server';

/**
 * @fileOverview AI writing assistant flow to detect the tone of writing and suggest alternative phrasings.
 *
 * - detectToneAndSuggestAlternatives - A function that handles the tone detection and suggestion process.
 * - DetectToneAndSuggestAlternativesInput - The input type for the detectToneAndSuggestAlternatives function.
 * - DetectToneAndSuggestAlternativesOutput - The return type for the detectToneAndSuggestAlternatives function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectToneAndSuggestAlternativesInputSchema = z.object({
  text: z.string().describe('The text to analyze for tone and suggest alternatives.'),
  context: z.string().optional().describe('Context about the writing to help determine tone.'),
});
export type DetectToneAndSuggestAlternativesInput = z.infer<
  typeof DetectToneAndSuggestAlternativesInputSchema
>;

const DetectToneAndSuggestAlternativesOutputSchema = z.object({
  detectedTone: z.string().describe('The detected tone of the input text.'),
  suggestedAlternatives: z
    .array(z.string())
    .describe('Alternative phrasings based on the context.'),
});
export type DetectToneAndSuggestAlternativesOutput = z.infer<
  typeof DetectToneAndSuggestAlternativesOutputSchema
>;

export async function detectToneAndSuggestAlternatives(
  input: DetectToneAndSuggestAlternativesInput
): Promise<DetectToneAndSuggestAlternativesOutput> {
  return detectToneAndSuggestAlternativesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectToneAndSuggestAlternativesPrompt',
  input: {schema: DetectToneAndSuggestAlternativesInputSchema},
  output: {schema: DetectToneAndSuggestAlternativesOutputSchema},
  prompt: `You are an AI writing assistant that detects the tone of the given text and suggests alternative phrasings based on the context.

Text: {{{text}}}
Context: {{{context}}}

Analyze the text and identify the tone. Then, suggest alternative phrasings that would be more effective given the context. Return the detected tone and the suggested alternatives.

Make sure to return a valid JSON as described by the schema.`,
});

const detectToneAndSuggestAlternativesFlow = ai.defineFlow(
  {
    name: 'detectToneAndSuggestAlternativesFlow',
    inputSchema: DetectToneAndSuggestAlternativesInputSchema,
    outputSchema: DetectToneAndSuggestAlternativesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
