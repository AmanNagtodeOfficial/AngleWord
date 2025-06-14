'use server';

/**
 * @fileOverview A flow to provide suggestions for grammar, style, and vocabulary to improve writing quality.
 *
 * - improveWritingQuality - A function that handles the process of improving writing quality.
 * - ImproveWritingQualityInput - The input type for the improveWritingQuality function.
 * - ImproveWritingQualityOutput - The return type for the improveWritingQuality function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveWritingQualityInputSchema = z.object({
  text: z.string().describe('The text to improve.'),
});
export type ImproveWritingQualityInput = z.infer<typeof ImproveWritingQualityInputSchema>;

const ImproveWritingQualityOutputSchema = z.object({
  improvedText: z.string().describe('The text with improved grammar, style, and vocabulary.'),
  suggestions: z.array(z.string()).describe('Specific suggestions for improvement.'),
});
export type ImproveWritingQualityOutput = z.infer<typeof ImproveWritingQualityOutputSchema>;

export async function improveWritingQuality(input: ImproveWritingQualityInput): Promise<ImproveWritingQualityOutput> {
  return improveWritingQualityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveWritingQualityPrompt',
  input: {schema: ImproveWritingQualityInputSchema},
  output: {schema: ImproveWritingQualityOutputSchema},
  prompt: `You are an AI Writing Assistant designed to improve the quality of writing.

  You will receive text and provide suggestions for grammar, style, and vocabulary improvements.
  You will make determination for the improved text, and suggestions for improvement.

  Text: {{{text}}}
  \n  Output in the following JSON format:
  {
    "improvedText": "The improved text with better grammar, style and vocabulary",
    "suggestions": ["Suggestion 1", "Suggestion 2", "Suggestion 3"]
  }`,
});

const improveWritingQualityFlow = ai.defineFlow(
  {
    name: 'improveWritingQualityFlow',
    inputSchema: ImproveWritingQualityInputSchema,
    outputSchema: ImproveWritingQualityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
