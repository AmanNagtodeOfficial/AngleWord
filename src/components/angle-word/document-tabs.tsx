
"use client";

import { useState, useRef, useEffect } from "react";
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
  onRenameTab: (name: string, id: string) => void;
}

export function DocumentTabs({
  documents,
  activeDocumentId,
  onSelectTab,
  onCloseTab,
  onAddTab,
  onRenameTab,
}: DocumentTabsProps) {
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTabId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingTabId]);

  const handleDoubleClick = (doc: Document) => {
    setEditingTabId(doc.id);
    setEditingName(doc.name);
  };

  const handleRename = () => {
    if (editingTabId && editingName.trim()) {
      onRenameTab(editingName, editingTabId);
    }
    setEditingTabId(null);
    setEditingName("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleRename();
    } else if (event.key === "Escape") {
      setEditingTabId(null);
      setEditingName("");
    }
  };

  return (
    <div className="bg-muted/60 border-b border-t flex items-center pr-2">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex items-center h-full px-2">
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => onSelectTab(doc.id)}
              onDoubleClick={() => handleDoubleClick(doc)}
              className={cn(
                "flex items-center px-3 h-10 text-sm border-r relative group",
                doc.id === activeDocumentId
                  ? "bg-background shadow-inner text-primary"
                  : "text-muted-foreground hover:bg-background/50"
              )}
            >
              {editingTabId === doc.id ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={handleRename}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border border-primary ring-0 focus:outline-none focus:ring-1 focus:ring-primary rounded-sm px-1 text-sm w-32"
                />
              ) : (
                <span className="pr-4 truncate max-w-[150px]">{doc.name}</span>
              )}
              {editingTabId !== doc.id && (
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
              )}
            </button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 ml-1 rounded-full"
            onClick={onAddTab}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">New Document</span>
          </Button>
        </div>
        <ScrollBar orientation="horizontal" className="h-0.5" />
      </ScrollArea>
    </div>
  );
}
