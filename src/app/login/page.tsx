
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/lib/firebase";
import {
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if firebase is configured
  const isFirebaseConfigured = auth && typeof auth.onAuthStateChanged === 'function';

  useEffect(() => {
    if (isFirebaseConfigured) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          router.push("/");
        } else {
          setLoading(false);
        }
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [router, isFirebaseConfigured]);

  const handleAuthAction = async (action: "signIn" | "signUp") => {
    if (!isFirebaseConfigured) {
      toast({ title: "Firebase Not Configured", description: "Please add Firebase credentials to your .env file to use authentication.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      if (action === "signIn") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (error: any) {
      toast({ title: "Authentication Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    if (!isFirebaseConfigured) {
      toast({ title: "Firebase Not Configured", description: "Please add Firebase credentials to your .env file to use authentication.", variant: "destructive" });
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      toast({ title: "Google Sign-In Error", description: (error as Error).message, variant: "destructive" });
    }
  };

  const handleContinueAnonymously = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Welcome to Angle Word</CardTitle>
          <CardDescription>Sign in or create an account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <div className="py-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
            </div>
            <TabsContent value="signin">
              <form onSubmit={(e) => { e.preventDefault(); handleAuthAction("signIn"); }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signin">Email</Label>
                  <Input id="email-signin" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signin">Password</Label>
                  <Input id="password-signin" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={(e) => { e.preventDefault(); handleAuthAction("signUp"); }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input id="email-signup" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input id="password-signup" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          <div className="mt-4 space-y-4">
            <Button variant="outline" className="w-full" onClick={handleSignInWithGoogle}>
              Sign in with Google
            </Button>
            <Button variant="link" className="w-full" onClick={handleContinueAnonymously}>
              Continue without signing in
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    