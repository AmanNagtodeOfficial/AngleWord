
"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { BookOpen, Crosshair, Globe, Languages, Minus, Monitor, Plus, CheckCircle, ChevronDown, AlertCircle, Loader2 } from "lucide-react";
import type { ViewMode, Language } from "@/app/page";
import { LANGUAGES } from "@/app/page";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


interface StatusBarProps {
  pageNumber: number;
  pageCount: number;
  wordCount: number;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  grammarSuggestionsCount: number;
  isCheckingGrammar: boolean;
  onProofingClick: () => void;
}

export function StatusBar({
  pageNumber,
  pageCount,
  wordCount,
  viewMode,
  setViewMode,
  zoomLevel,
  setZoomLevel,
  language,
  setLanguage,
  grammarSuggestionsCount,
  isCheckingGrammar,
  onProofingClick,
}: StatusBarProps) {

  const handleZoomChange = (value: number[]) => {
    setZoomLevel(value[0]);
  };

  const zoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 10, 500));
  }

  const zoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 10, 10));
  }
  
  const getProofingStatus = () => {
      if (isCheckingGrammar) {
          return (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking...
              </>
          );
      }
      if (grammarSuggestionsCount > 0) {
          return (
              <>
                <AlertCircle className="h-4 w-4 text-destructive" />
                {grammarSuggestionsCount} suggestion{grammarSuggestionsCount > 1 ? 's' : ''} found
              </>
          )
      }
      return (
          <>
            <CheckCircle className="h-4 w-4 text-green-500" />
            No issues
          </>
      )
  }

  return (
    <footer className="bg-card border-t px-4 py-1 flex items-center justify-between text-sm text-muted-foreground">
      <div className="flex items-center gap-4">
        <span>
          Page {pageNumber} of {pageCount}
        </span>
        <Separator orientation="vertical" className="h-4" />
        <span>{wordCount} words</span>
        <Separator orientation="vertical" className="h-4" />
         <Button variant="ghost" size="sm" className="h-7 text-xs px-2 gap-1.5" onClick={onProofingClick}>
           {getProofingStatus()}
        </Button>
        <Separator orientation="vertical" className="h-4" />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 text-xs px-2 gap-1.5">
                    <Languages className="h-4 w-4" />
                    {language.name}
                    <ChevronDown className="h-3 w-3" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-60 overflow-y-auto">
                {LANGUAGES.map(lang => (
                    <DropdownMenuItem key={lang.code} onSelect={() => setLanguage(lang)}>
                        {lang.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-2">
        <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            title="Focus Mode"
            >
            <Crosshair className="h-4 w-4" />
        </Button>
        <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            title="Read Mode"
            >
            <BookOpen className="h-4 w-4" />
        </Button>
         <Separator orientation="vertical" className="h-4 mx-1" />
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-7 w-7", viewMode === 'print' && 'bg-accent text-accent-foreground')}
          onClick={() => setViewMode("print")}
          title="Print Layout"
        >
          <Monitor className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-7 w-7", viewMode === 'web' && 'bg-accent text-accent-foreground')}
          onClick={() => setViewMode("web")}
          title="Web Layout"
        >
          <Globe className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-4 mx-2" />
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={zoomOut}>
                <Minus className="h-4 w-4" />
            </Button>
            <span className="w-16 text-center">{zoomLevel}%</span>
            <Slider
                value={[zoomLevel]}
                onValueChange={handleZoomChange}
                max={500}
                min={10}
                step={10}
                className="w-32"
            />
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={zoomIn}>
                <Plus className="h-4 w-4" />
            </Button>
        </div>
      </div>
    </footer>
  );
}

    