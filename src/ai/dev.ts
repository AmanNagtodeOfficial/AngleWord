import { config } from 'dotenv';
config();

import '@/ai/flows/detect-tone-and-suggest-alternatives.ts';
import '@/ai/flows/improve-writing-quality.ts';
import '@/ai/flows/summarize-document.ts';
import '@/ai/flows/generate-pdf-from-html.ts';
