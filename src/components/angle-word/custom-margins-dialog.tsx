
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Margins } from "@/app/page";

interface CustomMarginsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentMargins: Margins;
  onApply: (newMargins: Margins) => void;
}

export function CustomMarginsDialog({
  isOpen,
  onClose,
  currentMargins,
  onApply,
}: CustomMarginsDialogProps) {
  const [margins, setMargins] = useState<Margins>(currentMargins);

  useEffect(() => {
    setMargins(currentMargins);
  }, [currentMargins, isOpen]);

  const handleApply = () => {
    // Basic validation could be added here
    onApply(margins);
  };

  const handleInputChange = (field: keyof Margins, value: string) => {
    setMargins((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">Custom Margins</DialogTitle>
          <DialogDescription>
            Set the margins for your document. Use units like 'in' for inches or 'cm' for centimeters.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="top-margin" className="text-right">
              Top
            </Label>
            <Input
              id="top-margin"
              value={margins.top}
              onChange={(e) => handleInputChange("top", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bottom-margin" className="text-right">
              Bottom
            </Label>
            <Input
              id="bottom-margin"
              value={margins.bottom}
              onChange={(e) => handleInputChange("bottom", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="left-margin" className="text-right">
              Left
            </Label>
            <Input
              id="left-margin"
              value={margins.left}
              onChange={(e) => handleInputChange("left", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="right-margin" className="text-right">
              Right
            </Label>
            <Input
              id="right-margin"
              value={margins.right}
              onChange={(e) => handleInputChange("right", e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleApply}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

