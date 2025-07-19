
"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import type { Document } from "@/app/page";

interface DocumentTabsProps {
  documents: Document[];
  activeDocumentId: string;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onAddTab: () => void;
}

export function DocumentTabs({
  documents,
  activeDocumentId,
  onSelectTab,
  onCloseTab,
  onAddTab,
}: DocumentTabsProps) {
  return (
    <div className="bg-muted/60 border-b border-t flex items-center">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex items-center h-full px-2">
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => onSelectTab(doc.id)}
              className={cn(
                "flex items-center px-3 h-10 text-sm border-r relative group",
                doc.id === activeDocumentId
                  ? "bg-background shadow-inner text-primary"
                  : "text-muted-foreground hover:bg-background/50"
              )}
            >
              <span className="pr-4 truncate max-w-[150px]">{doc.name}</span>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(doc.id);
                }}
                className={cn(
                  "absolute right-1 top-1/2 -translate-y-1/2 p-0.5 rounded-sm hover:bg-destructive/20 hover:text-destructive",
                  doc.id === activeDocumentId
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                )}
              >
                <X className="h-3 w-3" />
              </div>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-0.5" />
      </ScrollArea>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0 mx-1 rounded-full"
        onClick={onAddTab}
      >
        <Plus className="h-4 w-4" />
        <span className="sr-only">New Document</span>
      </Button>
    </div>
  );
}
