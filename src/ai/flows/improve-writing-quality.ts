
'use server';
/**
 * @fileOverview An AI flow to improve the quality of writing by checking for
 * grammar, spelling, and style issues.
 *
 * - improveWritingQuality - A function that handles the writing quality improvement process.
 * - ImproveWritingQualityInput - The input type for the improveWritingQuality function.
 * - ImproveWritingQualityOutput - The return type for the improveWritingQuality function.
 */

import {ai} from '@/ai/genkit';
import {
  ImproveWritingQualityInputSchema,
  ImproveWritingQualityOutputSchema,
  type ImproveWritingQualityInput,
  type ImproveWritingQualityOutput,
} from '@/ai/schemas/suggestion-schema';

export async function improveWritingQuality(
  input: ImproveWritingQualityInput
): Promise<ImproveWritingQualityOutput> {
  return improveWritingQualityFlow(input);
}

const improveWritingQualityPrompt = ai.definePrompt({
  name: 'improveWritingQualityPrompt',
  input: {schema: ImproveWritingQualityInputSchema},
  output: {schema: ImproveWritingQualityOutputSchema},
  prompt: `You are an expert copy editor. Analyze the following text for grammar, spelling, style, and vocabulary issues. The user is writing in {{{language}}}.

For each issue you find, provide the original text snippet, your suggested correction, a brief explanation of the change, and the type of correction.

The correction types should be one of: 'grammar', 'spelling', 'style', 'vocabulary'.

If you find no issues, you MUST return an empty array for the 'suggestions' field.

Text to analyze:
"
{{{text}}}
"

Return your findings as a valid JSON object adhering to the output schema.`,
});

const improveWritingQualityFlow = ai.defineFlow(
  {
    name: 'improveWritingQualityFlow',
    inputSchema: ImproveWritingQualityInputSchema,
    outputSchema: ImproveWritingQualityOutputSchema,
  },
  async (input: ImproveWritingQualityInput) => {
    // Provide a default language if none is specified.
    const language = input.language || 'English (United States)';

    const {output} = await improveWritingQualityPrompt({...input, language});
    return output!;
  }
);
