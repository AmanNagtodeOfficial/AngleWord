"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isLoading: boolean;
  error?: string | null;
  children: React.ReactNode;
  onApply?: () => void;
  applyText?: string;
}

export function AIModal({
  isOpen,
  onClose,
  title,
  isLoading,
  error,
  children,
  onApply,
  applyText = "Apply",
}: AIModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline">{title}</DialogTitle>
          {error && <DialogDescription className="text-destructive">{error}</DialogDescription>}
        </DialogHeader>
        <ScrollArea className="flex-grow_ p-1_ rounded-md_ border_ overflow-y-auto">
          <div className="py-4 pr-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2 text-muted-foreground">Processing...</p>
              </div>
            ) : (
              children
            )}
          </div>
        </ScrollArea>
        {!isLoading && !error && onApply && (
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" onClick={onApply}>
              {applyText}
            </Button>
          </DialogFooter>
        )}
        {(isLoading || error || !onApply) && (
           <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
