
"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, File, FilePlus, Info, Printer, Save, Share2, X } from "lucide-react";
import { useState } from "react";

interface FileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

type MenuScreen = 'main' | 'info' | 'new' | 'open';

export function FileMenu({ isOpen, onClose }: FileMenuProps) {
  const [activeScreen, setActiveScreen] = useState<MenuScreen>('main');

  if (!isOpen) return null;

  const renderContent = () => {
    switch (activeScreen) {
      case 'info':
        return <div>Info Screen Content</div>;
      case 'new':
        return <div>New Screen Content</div>;
      case 'open':
        return <div>Open Screen Content</div>;
      default:
        return <div>Main Content Area</div>;
    }
  };

  const menuItems = [
    { name: 'Info', icon: Info, screen: 'info' },
    { name: 'New', icon: FilePlus, screen: 'new' },
    { name: 'Open', icon: File, screen: 'open' },
    { name: 'Save', icon: Save, action: () => console.log("Save") },
    { name: 'Print', icon: Printer, action: () => console.log("Print") },
    { name: 'Share', icon: Share2, action: () => console.log("Share") },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <div className="flex items-center p-2 border-b">
        <Button variant="ghost" size="icon" onClick={onClose}>
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
