
"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { type Suggestion } from "@/ai/flows/improve-writing-quality";
import { X, Check, Trash2, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface GrammarCheckSidebarProps {
  suggestions: Suggestion[];
  onClose: () => void;
  onAccept: (suggestion: Suggestion) => void;
  onIgnore: (suggestion: Suggestion) => void;
}

export function GrammarCheckSidebar({
  suggestions,
  onClose,
  onAccept,
  onIgnore,
}: GrammarCheckSidebarProps) {
  const grammarCount = suggestions.filter(s => s.type === 'grammar').length;
  const spellingCount = suggestions.filter(s => s.type === 'spelling').length;
  const styleCount = suggestions.filter(s => s.type === 'style').length;
  const vocabCount = suggestions.filter(s => s.type === 'vocabulary').length;

  return (
    <aside className="w-80 border-l bg-card flex flex-col h-full flex-shrink-0">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-headline font-semibold">Editor</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-grow">
        <div className="p-4">
            {suggestions.length === 0 ? (
                <div className="text-center text-muted-foreground py-10">
                    <Check className="mx-auto h-12 w-12 text-green-500" />
                    <p className="mt-4 text-lg font-semibold">All Clear!</p>
                    <p className="text-sm">No suggestions at the moment.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <Card>
                        <CardHeader className="p-4">
                            <CardTitle className="text-base">Editor Score</CardTitle>
                            <CardDescription className="text-xs">Based on {suggestions.length} suggestions</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                             <div className="flex items-center justify-center bg-primary/10 rounded-full w-24 h-24 mx-auto">
                                <span className="text-4xl font-bold text-primary">
                                    {Math.max(0, 100 - suggestions.length * 5)}
                                </span>
                             </div>
                        </CardContent>
                    </Card>

                    <Card>
                         <CardHeader className="p-4">
                            <CardTitle className="text-base">Refinements</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 space-y-2 text-sm">
                            {spellingCount > 0 && <div className="flex justify-between"><span>Spelling</span> <span>{spellingCount}</span></div>}
                            {grammarCount > 0 && <div className="flex justify-between"><span>Grammar</span> <span>{grammarCount}</span></div>}
                            {styleCount > 0 && <div className="flex justify-between"><span>Style</span> <span>{styleCount}</span></div>}
                            {vocabCount > 0 && <div className="flex justify-between"><span>Vocabulary</span> <span>{vocabCount}</span></div>}
                        </CardContent>
                    </Card>

                    {suggestions.map((suggestion, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardHeader className="p-3 bg-muted/50">
                            <CardTitle className="text-sm capitalize flex items-center gap-2">
                                <Lightbulb className="w-4 h-4 text-yellow-500" />
                                {suggestion.type} Correction
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 text-sm space-y-2">
                            <p className="text-muted-foreground line-through">{suggestion.original}</p>
                            <p className="text-primary font-semibold">{suggestion.suggestion}</p>
                            <p className="text-xs text-muted-foreground pt-1">{suggestion.explanation}</p>
                        </CardContent>
                        <CardFooter className="p-2 bg-muted/30 flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => onIgnore(suggestion)}>
                                <Trash2 className="w-4 h-4 mr-1" />
                                Ignore
                            </Button>
                            <Button size="sm" onClick={() => onAccept(suggestion)}>
                                <Check className="w-4 h-4 mr-1" />
                                Accept
                            </Button>
                        </CardFooter>
                    </Card>
                    ))}
                </div>
            )}
        </div>
      </ScrollArea>
    </aside>
  );
}

    