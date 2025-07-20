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

const SuggestionSchema = z.object({
  type: z.enum(['spelling', 'grammar', 'style', 'vocabulary']).describe('The type of issue found.'),
  original: z.string().describe('The original text segment with the issue.'),
  suggestion: z.string().describe('The suggested correction.'),
  explanation: z.string().describe('A brief explanation of why the change is suggested.'),
});

const ImproveWritingQualityOutputSchema = z.object({
  suggestions: z.array(SuggestionSchema).describe('Specific suggestions for improvement.'),
});
export type ImproveWritingQualityOutput = z.infer<typeof ImproveWritingQualityOutputSchema>;
export type Suggestion = z.infer<typeof SuggestionSchema>;

export async function improveWritingQuality(input: ImproveWritingQualityInput): Promise<ImproveWritingQualityOutput> {
  return improveWritingQualityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveWritingQualityPrompt',
  input: {schema: ImproveWritingQualityInputSchema},
  output: {schema: ImproveWritingQualityOutputSchema},
  prompt: `You are an AI Writing Assistant designed to improve the quality of writing.

  You will receive text and provide suggestions for grammar, spelling, style, and vocabulary improvements.
  For each issue you find, provide the original text segment, your suggested correction, the type of issue, and a brief explanation.

  Text: {{{text}}}
  
  Analyze the text and identify all issues. Return a list of suggestions in the specified JSON format. If there are no issues, return an empty array for the suggestions.`,
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
