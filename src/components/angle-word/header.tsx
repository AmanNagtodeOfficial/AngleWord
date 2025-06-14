import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FileText, Save, Share2, User } from "lucide-react";

export function AngleWordHeader() {
  return (
    <header className="flex items-center justify-between p-3 border-b bg-card shadow-sm">
      <div className="flex items-center gap-3">
        <FileText className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-headline font-semibold text-primary">Angle Word</h1>
        <span className="text-sm text-muted-foreground ml-4">Untitled Document</span>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">
          <Save className="mr-2 h-4 w-4" /> Save
        </Button>
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
