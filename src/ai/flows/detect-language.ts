'use server';

/**
 * @fileOverview An AI flow to detect the primary language of a given text.
 *
 * - detectLanguage - A function that detects the language.
 * - DetectLanguageInput - The input type for the detectLanguage function.
 * - DetectLanguageOutput - The return type for the detectLanguage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectLanguageInputSchema = z.object({
  text: z.string().describe('The text to analyze for language detection.'),
});
export type DetectLanguageInput = z.infer<typeof DetectLanguageInputSchema>;

const DetectLanguageOutputSchema = z.object({
  languageCode: z.string().describe('The detected IETF language tag (e.g., "en-US", "fr-FR", "hi-IN").'),
  languageName: z.string().describe('The English name of the detected language (e.g., "English", "French", "Hindi").'),
});
export type DetectLanguageOutput = z.infer<typeof DetectLanguageOutputSchema>;

export async function detectLanguage(input: DetectLanguageInput): Promise<DetectLanguageOutput> {
  return detectLanguageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectLanguagePrompt',
  input: {schema: DetectLanguageInputSchema},
  output: {schema: DetectLanguageOutputSchema},
  prompt: `Analyze the following text and determine its primary language.
  
Text: {{{text}}}

Return the IETF language tag and the English name for the detected language.`,
});

const detectLanguageFlow = ai.defineFlow(
  {
    name: 'detectLanguageFlow',
    inputSchema: DetectLanguageInputSchema,
    outputSchema: DetectLanguageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
