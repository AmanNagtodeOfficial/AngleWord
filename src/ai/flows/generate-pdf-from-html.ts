'use server';

/**
 * @fileOverview A flow to generate a PDF from HTML content using Puppeteer.
 *
 * - generatePdfFromHtml - A function that handles the PDF generation process.
 */

import { ai } from '@/ai/genkit';
import puppeteer from 'puppeteer';
import {
  GeneratePdfFromHtmlInput,
  GeneratePdfFromHtmlInputSchema,
  GeneratePdfFromHtmlOutput,
  GeneratePdfFromHtmlOutputSchema,
} from '@/ai/schemas/pdf-schemas';

export async function generatePdfFromHtml(
  input: GeneratePdfFromHtmlInput
): Promise<GeneratePdfFromHtmlOutput> {
  return generatePdfFromHtmlFlow(input);
}

const generatePdfFromHtmlFlow = ai.defineFlow(
  {
    name: 'generatePdfFromHtmlFlow',
    inputSchema: GeneratePdfFromHtmlInputSchema,
    outputSchema: GeneratePdfFromHtmlOutputSchema,
  },
  async ({ html }) => {
    let browser;
    try {
      // Launch Puppeteer. The 'new' headless mode is more modern.
      // --no-sandbox is often required in containerized environments like Cloud Run or App Hosting.
      browser = await puppeteer.launch({ 
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();

      // Set the content of the page.
      // We wrap the user's HTML in a basic document structure.
      await page.setContent(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              /* You can inject global styles here if needed */
              body {
                margin: 1in; /* Default margin */
              }
            </style>
          </head>
          <body>
            ${html}
          </body>
        </html>
      `, { waitUntil: 'networkidle0' });

      // Generate the PDF.
      const pdfBuffer = await page.pdf({
        format: 'Letter',
        printBackground: true,
      });

      // Return the PDF as a Base64 string.
      return {
        pdfBase64: pdfBuffer.toString('base64'),
      };
    } catch (error) {
        console.error('Error generating PDF with Puppeteer:', error);
        if (error instanceof Error) {
            throw new Error(`Puppeteer error: ${error.message}`);
        }
        throw new Error('An unknown error occurred during PDF generation.');
    } finally {
      // Ensure the browser is closed even if an error occurs.
      if (browser) {
        await browser.close();
      }
    }
  }
);
