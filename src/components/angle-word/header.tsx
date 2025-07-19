
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FileText, Save, Share2, User, Loader2, Cloud, AlertTriangle } from "lucide-react";
import type { SaveStatus } from "@/app/page";

interface AngleWordHeaderProps {
  documentName: string;
  saveStatus: SaveStatus;
}

export function AngleWordHeader({ documentName, saveStatus }: AngleWordHeaderProps) {

  const getSaveStatusIndicator = () => {
    switch (saveStatus) {
      case "saving":
        return (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        );
      case "saved":
        return (
          <>
            <Cloud className="mr-2 h-4 w-4" />
            Saved
          </>
        );
      case "unsaved":
        return (
          <>
            <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
            Unsaved changes
          </>
        );
      default:
        return null;
    }
  };

  return (
    <header className="flex items-center justify-between p-3 border-b bg-card shadow-sm">
      <div className="flex items-center gap-3">
        <FileText className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-xl font-headline font-semibold text-primary">{documentName}</h1>
          <div className="text-xs text-muted-foreground flex items-center">
            {getSaveStatusIndicator()}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="user avatar" />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
