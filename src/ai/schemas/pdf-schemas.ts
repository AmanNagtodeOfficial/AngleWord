/**
 * @fileOverview This file defines the Zod schemas and TypeScript types for PDF generation.
 * By separating these from the flow, we can avoid "use server" directive errors in Next.js
 * when these types are imported into client-side components or other server-side files
 * that are not Server Actions.
 */

import { z } from 'zod';

export const GeneratePdfFromHtmlInputSchema = z.object({
  html: z.string().describe('The HTML content to convert to PDF.'),
});
export type GeneratePdfFromHtmlInput = z.infer<typeof GeneratePdfFromHtmlInputSchema>;

export const GeneratePdfFromHtmlOutputSchema = z.object({
  pdfBase64: z.string().describe('The generated PDF, encoded in Base64.'),
});
export type GeneratePdfFromHtmlOutput = z.infer<typeof GeneratePdfFromHtmlOutputSchema>;
