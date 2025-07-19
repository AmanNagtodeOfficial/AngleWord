
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FileText, Save, Share2, User, Loader2, Cloud, AlertTriangle, LogOut } from "lucide-react";
import type { SaveStatus } from "@/app/page";
import { auth } from "@/lib/firebase";
import { signOut, onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AngleWordHeaderProps {
  documentName: string;
  saveStatus: SaveStatus;
}

export function AngleWordHeader({ documentName, saveStatus }: AngleWordHeaderProps) {
  const router = useRouter();
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

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
        {user ? (
          <>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.photoURL || undefined} alt="User Avatar" data-ai-hint="user avatar" />
              <AvatarFallback>
                {user.displayName?.charAt(0) || <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm" onClick={() => router.push('/login')}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
}
