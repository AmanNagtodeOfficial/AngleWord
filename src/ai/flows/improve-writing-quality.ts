
'use server';

/**
 * @fileOverview A flow to provide suggestions for grammar, style, and vocabulary to improve writing quality.
 *
 * - improveWritingQuality - A function that handles the process of improving writing quality.
 * - ImproveWritingQualityInput - The input type for the improveWritingQuality function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveWritingQualityInputSchema = z.object({
  text: z.string().describe('The text to improve.'),
  language: z.string().optional().describe('The language of the text (e.g., "English (United States)", "हिन्दी (भारत)"). Defaults to English if not provided.'),
});
export type ImproveWritingQualityInput = z.infer<typeof ImproveWritingQualityInputSchema>;

// The output is now a simple string, which is more robust.
export type ImproveWritingQualityOutput = string;


export async function improveWritingQuality(input: ImproveWritingQualityInput): Promise<ImproveWritingQualityOutput> {
  return improveWritingQualityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveWritingQualityPrompt',
  input: {schema: ImproveWritingQualityInputSchema},
  prompt: `You are an AI Writing Assistant. Your task is to improve the provided text by correcting spelling, grammar, style, and vocabulary.
  
  The text is written in the following language: {{{language}}}.
  
  Text to improve:
  """
  {{{text}}}
  """
  
  Return ONLY the full, corrected version of the text. Do not include any explanations, introductory phrases, or markdown formatting.`,
});

const improveWritingQualityFlow = ai.defineFlow(
  {
    name: 'improveWritingQualityFlow',
    inputSchema: ImproveWritingQualityInputSchema,
    outputSchema: z.string(),
  },
  async input => {
    // Provide a default language if none is given.
    const language = input.language || 'English (United States)';
    
    const {text} = await prompt({ ...input, language });
    return text;
  }
);
