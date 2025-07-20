
"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, File, FilePlus, Home, Info, Printer, Save, Share2, FileEdit, FolderOpen, History, Star, Users, FileInput, FileOutput, X, ChevronsRight, Settings, UserCircle } from "lucide-react";
import { useState } from "react";
import { type Editor } from "@tiptap/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";


interface FileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  editor: Editor | null;
  documentName: string;
  setDocumentName: (name: string) => void;
  onNewDocument: () => void;
}

type MenuScreen = 'home' | 'new' | 'open' | 'info' | 'save' | 'save-as' | 'history' | 'print' | 'share' | 'export' | 'transform' | 'close' | 'account' | 'options';

type SaveFormat = 'html' | 'txt';

const templates = [
    { name: 'Blank document', image: 'https://placehold.co/150x200', hint: 'blank paper' },
    { name: 'Modern web developer resume', image: 'https://placehold.co/150x200', hint: 'resume document' },
    { name: 'Bold sales resume', image: 'https://placehold.co/150x200', hint: 'resume sales' },
    { name: 'Impact resume', image: 'https://placehold.co/150x200', hint: 'resume professional' },
    { name: 'Classic students report', image: 'https://placehold.co/150x200', hint: 'report education' },
    { name: 'Poetry booklet', image: 'https://placehold.co/150x200', hint: 'book poetry' },
];

const recentFiles: {name: string, path: string, date: string}[] = [];


export function FileMenu({ isOpen, onClose, editor, documentName, setDocumentName, onNewDocument }: FileMenuProps) {
  const [activeScreen, setActiveScreen] = useState<MenuScreen>('home');
  const [fileName, setFileName] = useState(documentName);
  const [saveFormat, setSaveFormat] = useState<SaveFormat>('html');

  const handleSave = (asNewFile: boolean = false) => {
    if (!editor) return;

    if (asNewFile || activeScreen === 'save-as') {
      let content: string;
      let blobType: string;
      let extension: string;
      const finalFileName = fileName || 'document';

      if (saveFormat === 'txt') {
        content = editor.getText();
        blobType = 'text/plain';
        extension = 'txt';
      } else {
        content = editor.getHTML();
        blobType = 'text/html';
        extension = 'html';
      }
      
      setDocumentName(finalFileName);

      const blob = new Blob([content], { type: blobType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${finalFileName}.${extension}`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // Default quick save
      const content = editor.getHTML();
      const blob = new Blob([content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${documentName}.html`;
      a.click();
      URL.revokeObjectURL(url);
      console.log("Saving document...");
    }
  };

  const handleNewDocument = () => {
    onNewDocument();
    onClose();
  };

  if (!isOpen) return null;

  const renderContent = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen onNewDocument={handleNewDocument} onTemplateClick={() => { /* Placeholder */ }} />;
      case 'info':
        return <div>Info Screen Content</div>;
      case 'new':
        return <div>New Screen Content</div>;
      case 'open':
        return <div>Open Screen Content</div>;
      case 'save-as':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 font-headline">Save As</h2>
            <div className="space-y-4 max-w-sm">
              <div>
                <Label htmlFor="filename">File name</Label>
                <Input 
                  id="filename" 
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="document"
                />
              </div>
              <div>
                <Label htmlFor="format">Save as type</Label>
                <Select value={saveFormat} onValueChange={(value: SaveFormat) => setSaveFormat(value)}>
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Select a format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="html">HTML Document</SelectItem>
                    <SelectItem value="txt">Plain Text</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end pt-4">
                 <Button onClick={() => handleSave(true)}>Save</Button>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="p-8">Placeholder for {activeScreen}</div>;
    }
  };

  const menuItems: { name: MenuScreen; label: string; icon: React.ElementType; action?: () => void, disabled?: boolean }[] = [
    { name: 'home', label: 'Home', icon: Home },
    { name: 'new', label: 'New', icon: FilePlus, action: handleNewDocument },
    { name: 'open', label: 'Open', icon: FolderOpen },
    { name: 'info', label: 'Info', icon: Info, disabled: true },
    { name: 'save', label: 'Save', icon: Save, action: () => handleSave(false) },
    { name: 'save-as', label: 'Save As', icon: FileEdit },
    { name: 'history', label: 'History', icon: History, disabled: true },
    { name: 'print', label: 'Print', icon: Printer, action: () => window.print() },
    { name: 'share', label: 'Share', icon: Share2, disabled: true },
    { name: 'export', label: 'Export', icon: FileOutput, disabled: true },
    { name: 'transform', label: 'Transform', icon: ChevronsRight, disabled: true },
    { name: 'close', label: 'Close', icon: X, action: onClose },
  ];

  const bottomMenuItems = [
      { name: 'account', label: 'Account', icon: UserCircle, disabled: true },
      { name: 'options', label: 'Options', icon: Settings, disabled: true },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-in fade-in-20">
      <header className="flex items-center p-1 border-b bg-primary text-primary-foreground h-10">
        <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-primary/80">
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </header>
      <div className="flex flex-grow overflow-hidden">
        <aside className="w-56 bg-secondary/30 p-2 flex flex-col justify-between">
            <div>
              {menuItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  disabled={item.disabled}
                  className={cn(
                      "w-full justify-start text-base p-6 h-12",
                      activeScreen === item.name ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-primary/5',
                      item.disabled && 'text-muted-foreground/50 cursor-not-allowed'
                  )}
                  onClick={() => {
                    if(item.action) item.action();
                    else setActiveScreen(item.name);
                  }}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              ))}
            </div>
             <div>
                 <div className="border-t my-2" />
                 {bottomMenuItems.map((item) => (
                    <Button
                        key={item.name}
                        variant="ghost"
                        disabled={item.disabled}
                         className={cn(
                            "w-full justify-start text-base p-6 h-12",
                            item.disabled && 'text-muted-foreground/50 cursor-not-allowed'
                        )}
                        onClick={() => setActiveScreen(item.name)}
                    >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.label}
                    </Button>
                 ))}
            </div>
        </aside>
        <main className="flex-1 overflow-y-auto bg-card">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}


function HomeScreen({ onNewDocument, onTemplateClick }: { onNewDocument: () => void, onTemplateClick: () => void }) {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-semibold text-primary font-headline mb-6">Good morning</h1>
            
            <div className="mb-12">
                <h2 className="text-xl font-semibold mb-3">New</h2>
                <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-center space-y-2 cursor-pointer" onClick={onNewDocument}>
                        <div className="w-40 h-52 border-2 border-dashed hover:border-primary flex items-center justify-center bg-muted/50 hover:bg-muted">
                            <FilePlus className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <span className="text-sm">Blank document</span>
                    </div>

                    {templates.slice(1).map((template, index) => (
                        <div key={index} className="flex flex-col items-center space-y-2 cursor-pointer group" onClick={onTemplateClick}>
                            <div className="w-40 h-52 border-2 border-transparent group-hover:border-primary">
                                <Image 
                                    src={template.image} 
                                    alt={template.name}
                                    width={160} 
                                    height={208} 
                                    className="object-cover w-full h-full"
                                    data-ai-hint={template.hint}
                                />
                            </div>
                            <span className="text-sm">{template.name}</span>
                        </div>
                    ))}
                     <div className="flex flex-col items-center space-y-2 cursor-pointer group">
                        <div className="w-40 h-52 border-2 border-transparent group-hover:border-primary flex flex-col items-center justify-center">
                           <div className="text-sm text-primary">Take a tour</div>
                           <div className="text-xs text-muted-foreground mb-2">Welcome to Word</div>
                           <Button variant="ghost" size="icon" className="rounded-full bg-primary/10 text-primary hover:bg-primary/20">
                                <ArrowLeft className="transform rotate-180" />
                           </Button>
                        </div>
                        <span className="text-sm">Welcome to Word</span>
                    </div>
                </div>
                <Button variant="link" className="mt-2 text-primary">More templates <ArrowLeft className="inline w-4 h-4 ml-1 transform rotate-180" /></Button>
            </div>

            <Tabs defaultValue="recent">
                <TabsList>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="favourites">Favourites</TabsTrigger>
                    <TabsTrigger value="shared">Shared with Me</TabsTrigger>
                </TabsList>
                <TabsContent value="recent">
                    {recentFiles.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12"></TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="text-right">Date modified</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentFiles.map((file, index) => (
                                    <TableRow key={index} className="cursor-pointer">
                                        <TableCell>
                                            <File className="w-6 h-6 text-primary" />
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{file.name}</div>
                                            <div className="text-xs text-muted-foreground">{file.path}</div>
                                        </TableCell>
                                        <TableCell className="text-right">{file.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                       <p className="p-4 text-center text-muted-foreground">No recent documents.</p>
                    )}
                </TabsContent>
                <TabsContent value="favourites">
                    <p className="p-4 text-center text-muted-foreground">No favourite documents yet.</p>
                </TabsContent>
                 <TabsContent value="shared">
                    <p className="p-4 text-center text-muted-foreground">No documents have been shared with you.</p>
                </TabsContent>
            </Tabs>
        </div>
    );
}
