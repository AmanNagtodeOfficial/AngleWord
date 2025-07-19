
"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, File, FilePlus, Info, Printer, Save, Share2, FileEdit } from "lucide-react";
import { useState } from "react";
import { type Editor } from "@tiptap/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface FileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  editor: Editor | null;
  documentName: string;
  setDocumentName: (name: string) => void;
}

type MenuScreen = 'main' | 'info' | 'new' | 'open' | 'save-as';
type SaveFormat = 'html' | 'txt';

export function FileMenu({ isOpen, onClose, editor, documentName, setDocumentName }: FileMenuProps) {
  const [activeScreen, setActiveScreen] = useState<MenuScreen>('main');
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

  if (!isOpen) return null;

  const renderContent = () => {
    switch (activeScreen) {
      case 'info':
        return <div>Info Screen Content</div>;
      case 'new':
        return <div>New Screen Content</div>;
      case 'open':
        return <div>Open Screen Content</div>;
      case 'save-as':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Save As</h2>
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
        return <div>Main Content Area</div>;
    }
  };

  const menuItems = [
    { name: 'Info', icon: Info, screen: 'info' },
    { name: 'New', icon: FilePlus, screen: 'new' },
    { name: 'Open', icon: File, screen: 'open' },
    { name: 'Save', icon: Save, action: () => handleSave(false) },
    { name: 'Save As', icon: FileEdit, screen: 'save-as' },
    { name: 'Print', icon: Printer, action: () => window.print() },
    { name: 'Share', icon: Share2, action: () => console.log("Share") },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <div className="flex items-center p-2 border-b">
        <Button variant="ghost" size="icon" onClick={() => activeScreen !== 'main' ? setActiveScreen('main') : onClose()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <span className="ml-4 font-semibold text-lg">File</span>
      </div>
      <div className="flex flex-grow">
        <aside className="w-64 bg-primary/10 p-2 flex flex-col gap-1">
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={`w-full justify-start text-base p-6 ${activeScreen === item.screen ? 'bg-primary/20' : ''}`}
              onClick={() => {
                if(item.screen) setActiveScreen(item.screen as MenuScreen);
                if(item.action) item.action();
              }}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Button>
          ))}
        </aside>
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
