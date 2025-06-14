"use client";

import { Textarea } from "@/components/ui/textarea";

interface DocumentEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function DocumentEditor({ value, onChange, className }: DocumentEditorProps) {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Start writing your document here..."
      className={`w-full h-full p-6 text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none shadow-inner bg-background ${className}`}
      aria-label="Document content editor"
    />
  );
}
