
"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, File, FilePlus, Home, Info, Printer, Save, Share2, FileEdit, FolderOpen, History, Star, Users, FileInput, FileOutput, X, ChevronsRight, Settings, UserCircle, CheckCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Minus, Plus, BookCopy, Scaling, Combine, Lock, FileSearch, FileCheck, FolderSync, Puzzle, ShieldCheck } from "lucide-react";
import { useState, FC, useMemo } from "react";
import { type Editor } from "@tiptap/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DocumentEditor } from "./document-editor";
import { Separator } from "../ui/separator";
import { Slider } from "../ui/slider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Margins, Orientation, PageSize } from "@/app/page";
import { PAGE_SIZES, MARGIN_PRESETS } from "@/app/page";
import { CustomMarginsDialog } from "./custom-margins-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface FileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  editor: Editor | null;
  documentName: string;
  setDocumentName: (name: string) => void;
  onNewDocument: () => void;
  margins: Margins;
  setMargins: (margins: Margins) => void;
  orientation: Orientation;
  setOrientation: (orientation: Orientation) => void;
  pageSize: PageSize;
  setPageSize: (pageSize: PageSize) => void;
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


export function FileMenu({
  isOpen,
  onClose,
  editor,
  documentName,
  setDocumentName,
  onNewDocument,
  margins,
  setMargins,
  orientation,
  setOrientation,
  pageSize,
  setPageSize,
}: FileMenuProps) {
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
  
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (!isOpen) return null;

  const renderContent = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen onNewDocument={handleNewDocument} onTemplateClick={() => { /* Placeholder */ }} />;
      case 'info':
        return <InfoScreen documentName={documentName} wordCount={editor?.storage.characterCount.words() || 0} />;
      case 'new':
        return <div>New Screen Content</div>;
      case 'open':
        return <div>Open Screen Content</div>;
      case 'print':
        return (
          <PrintScreen 
            editor={editor}
            onPrint={handlePrint}
            documentName={documentName}
            margins={margins}
            setMargins={setMargins}
            orientation={orientation}
            setOrientation={setOrientation}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        );
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
    { name: 'home', label: 'Home', icon: Home, action: () => setActiveScreen('home') },
    { name: 'new', label: 'New', icon: FilePlus, action: handleNewDocument },
    { name: 'open', label: 'Open', icon: FolderOpen, action: () => setActiveScreen('open') },
    { name: 'info', label: 'Info', icon: Info, action: () => setActiveScreen('info') },
    { name: 'save', label: 'Save', icon: Save, action: () => handleSave(false) },
    { name: 'save-as', label: 'Save As', icon: FileEdit, action: () => setActiveScreen('save-as') },
    { name: 'history', label: 'History', icon: History, disabled: true, action: () => setActiveScreen('history') },
    { name: 'print', label: 'Print', icon: Printer, action: () => setActiveScreen('print') },
    { name: 'share', label: 'Share', icon: Share2, disabled: true, action: () => setActiveScreen('share') },
    { name: 'export', label: 'Export', icon: FileOutput, disabled: true, action: () => setActiveScreen('export') },
    { name: 'transform', label: 'Transform', icon: ChevronsRight, disabled: true, action: () => setActiveScreen('transform') },
    { name: 'close', label: 'Close', icon: X, action: onClose },
  ];

  const bottomMenuItems = [
      { name: 'account', label: 'Account', icon: UserCircle, disabled: true },
      { name: 'options', label: 'Options', icon: Settings, disabled: true },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-in fade-in-20">
      <header className="flex items-center p-1 border-b bg-primary text-primary-foreground h-10">
        <Button variant="ghost" size="icon" onClick={activeScreen === 'home' ? onClose : () => setActiveScreen('home')} className="hover:bg-primary/80">
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
                  onClick={item.action}
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
                                <ArrowLeft className="inline-block transform rotate-180" />
                           </Button>
                        </div>
                        <span className="text-sm">Welcome to Word</span>
                    </div>
                </div>
                <Button variant="link" className="mt-2 text-primary">More templates <ArrowLeft className="inline w-4 h-4 ml-1 transform rotate-180" /></Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Date modified</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentFiles.length > 0 ? (
                        recentFiles.map((file, index) => (
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
                        ))
                    ) : (
                       <TableRow>
                           <TableCell colSpan={3} className="p-4 text-center text-muted-foreground">No recent documents.</TableCell>
                       </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

const PrintSettingDropdown: FC<{icon: React.ElementType, title: string, description: string, children: React.ReactNode}> = ({ icon: Icon, title, description, children }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-auto w-full justify-start p-2 text-left">
                <Icon className="w-8 h-8 mr-3 text-primary/80" />
                <div className="flex flex-col">
                    <span className="font-semibold">{title}</span>
                    <span className="text-xs text-muted-foreground">{description}</span>
                </div>
                <ChevronDown className="w-4 h-4 ml-auto" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {children}
        </DropdownMenuContent>
    </DropdownMenu>
);

const MarginIcon: FC<{ type: string }> = ({ type }) => {
    const baseStyle: React.SVGProps<SVGSVGElement> = {
      width: '32px',
      height: '32px',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.5,
    };

    switch (type) {
        case 'normal':
            return <svg {...baseStyle}><rect x="4" y="4" width="16" height="16" rx="1" ry="1" stroke="#3b82f6" /><rect x="6" y="6" width="12" height="12" rx="0.5" ry="0.5" strokeDasharray="2 2" stroke="#6b7280" /></svg>;
        case 'narrow':
            return <svg {...baseStyle}><rect x="4" y="4" width="16" height="16" rx="1" ry="1" stroke="#3b82f6" /><rect x="5" y="5" width="14" height="14" rx="0.5" ry="0.5" strokeDasharray="2 2" stroke="#6b7280" /></svg>;
        case 'moderate':
            return <svg {...baseStyle}><rect x="4" y="4" width="16" height="16" rx="1" ry="1" stroke="#3b82f6" /><rect x="5.5" y="6" width="13" height="12" rx="0.5" ry="0.5" strokeDasharray="2 2" stroke="#6b7280" /></svg>;
        case 'wide':
            return <svg {...baseStyle}><rect x="4" y="4" width="16" height="16" rx="1" ry="1" stroke="#3b82f6" /><rect x="8" y="6" width="8" height="12" rx="0.5" ry="0.5" strokeDasharray="2 2" stroke="#6b7280" /></svg>;
        case 'mirrored':
            return <svg {...baseStyle}><rect x="4" y="4" width="16" height="16" rx="1" ry="1" stroke="#3b82f6" /><path d="M12 6V18" stroke="#3b82f6" strokeDasharray="2 2" /><rect x="6" y="6" width="5" height="12" rx="0.5" ry="0.5" strokeDasharray="2 2" stroke="#6b7280" /><rect x="13" y="6" width="5" height="12" rx="0.5" ry="0.5" strokeDasharray="2 2" stroke="#6b7280" /></svg>;
        case 'custom':
            return <svg {...baseStyle}><rect x="4" y="4" width="16" height="16" rx="1" ry="1" stroke="#3b82f6" /><Star x="8" y="8" width="8" height="8" fill="#f59e0b" stroke="#f59e0b" /></svg>;
        default:
            return <svg {...baseStyle}><rect x="4" y="4" width="16" height="16" rx="1" ry="1" stroke="#3b82f6" /></svg>;
    }
};

const MarginMenuItem: FC<{ title: string; details: string[]; onSelect: () => void; iconType: string }> = ({ title, details, onSelect, iconType }) => (
    <DropdownMenuItem className="p-2 cursor-pointer items-start" onSelect={onSelect}>
        <div className="mr-3 flex-shrink-0">
            <MarginIcon type={iconType} />
        </div>
        <div className="flex-grow">
            <p className="font-semibold text-sm">{title}</p>
            <div className="grid grid-cols-2 text-xs text-muted-foreground gap-x-2">
                {details.map((detail, i) => <span key={i}>{detail}</span>)}
            </div>
        </div>
    </DropdownMenuItem>
);

interface PrintScreenProps {
  editor: Editor | null;
  onPrint: () => void;
  documentName: string;
  margins: Margins;
  setMargins: (margins: Margins) => void;
  orientation: Orientation;
  setOrientation: (orientation: Orientation) => void;
  pageSize: PageSize;
  setPageSize: (pageSize: PageSize) => void;
}

type PrintRange = 'all' | 'selection' | 'current' | 'custom';
type PrintSided = 'one-sided' | 'two-sided';
type PrintCollation = 'collated' | 'uncollated';
type PagesPerSheet = '1' | '2' | '4' | '6';

const PrintScreen: FC<PrintScreenProps> = ({ 
    editor, 
    onPrint, 
    documentName,
    margins,
    setMargins,
    orientation,
    setOrientation,
    pageSize,
    setPageSize,
}) => {
    const [copies, setCopies] = useState(1);
    const [zoomLevel, setZoomLevel] = useState(56);
    const [isCustomMarginsOpen, setIsCustomMarginsOpen] = useState(false);
    
    // A mock editor instance for preview purposes when the real one isn't available.
    const [mockEditor, setMockEditor] = useState<Editor | null>(null);

    const [printRange, setPrintRange] = useState<PrintRange>('all');
    const [printSided, setPrintSided] = useState<PrintSided>('one-sided');
    const [printCollation, setPrintCollation] = useState<PrintCollation>('collated');
    const [pagesPerSheet, setPagesPerSheet] = useState<PagesPerSheet>('1');

    const handleCopiesChange = (newCopies: number) => {
        setCopies(Math.max(1, newCopies));
    };

    const currentMarginPreset = useMemo(() => {
        const marginString = JSON.stringify(margins);
        const preset = Object.entries(MARGIN_PRESETS).find(([key, p]) => JSON.stringify(p.values) === marginString);
        return preset ? MARGIN_PRESETS[preset[0]].name : 'Custom Margins';
    }, [margins]);

    const printRangeOptions: { [key in PrintRange]: { title: string, description: string } } = {
        'all': { title: 'Print All Pages', description: 'The whole thing' },
        'selection': { title: 'Print Selection', description: 'Only the selected content' },
        'current': { title: 'Print Current Page', description: 'The page currently in view' },
        'custom': { title: 'Custom Print', description: 'Print specific pages' },
    };
    
    const printSidedOptions: { [key in PrintSided]: { title: string, description: string } } = {
        'one-sided': { title: 'Print One Sided', description: 'Only print on one side' },
        'two-sided': { title: 'Manually Print on Both Sides', description: 'Flip paper over to print the second side' },
    };

    const printCollationOptions: { [key in PrintCollation]: { title: string, description: string } } = {
        'collated': { title: 'Collated', description: '1,2,3  1,2,3  1,2,3' },
        'uncollated': { title: 'Uncollated', description: '1,1,1  2,2,2  3,3,3' },
    };

    const pagesPerSheetOptions: { [key in PagesPerSheet]: { title: string, description: string } } = {
        '1': { title: '1 Page Per Sheet', description: '' },
        '2': { title: '2 Pages Per Sheet', description: '' },
        '4': { title: '4 Pages Per Sheet', description: '' },
        '6': { title: '6 Pages Per Sheet', description: '' },
    };
    

    return (
        <>
            <CustomMarginsDialog 
                isOpen={isCustomMarginsOpen}
                onClose={() => setIsCustomMarginsOpen(false)}
                currentMargins={margins}
                onApply={(newMargins) => {
                    setMargins(newMargins);
                    setIsCustomMarginsOpen(false);
                }}
            />
            <div className="flex h-full bg-muted/20">
                {/* Left Panel: Settings */}
                <ScrollArea className="w-[400px] flex-shrink-0 bg-card p-4">
                    <h1 className="text-4xl font-light mb-6">Print</h1>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Button size="lg" className="h-auto py-3 px-4" onClick={onPrint}>
                                <Printer className="w-8 h-8 mr-3" />
                                <span className="text-lg">Print</span>
                            </Button>
                            <div className="flex items-center gap-2">
                                <Label htmlFor="copies" className="text-sm">Copies:</Label>
                                <div className="relative w-20">
                                    <Input 
                                        id="copies" 
                                        type="number" 
                                        value={copies} 
                                        onChange={(e) => handleCopiesChange(parseInt(e.target.value))} 
                                        className="pr-6"
                                    />
                                    <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center">
                                        <button onClick={() => handleCopiesChange(copies + 1)} className="h-1/2 px-1 text-muted-foreground hover:text-foreground"><ChevronUp className="w-3 h-3"/></button>
                                        <button onClick={() => handleCopiesChange(copies - 1)} className="h-1/2 px-1 text-muted-foreground hover:text-foreground"><ChevronDown className="w-3 h-3"/></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Printer</h2>
                            <Select defaultValue="pdf">
                                <SelectTrigger className="h-auto p-2">
                                    <div className="flex items-center">
                                        <Printer className="w-8 h-8 mr-3 text-primary/80" />
                                        <div>
                                            <SelectValue />
                                            <span className="text-xs text-green-600 flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3" />
                                                Ready
                                            </span>
                                        </div>
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pdf">Microsoft Print to PDF</SelectItem>
                                    <SelectItem value="xps">Microsoft XPS Document Writer</SelectItem>
                                    <SelectItem value="one" disabled>OneNote</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="link" className="p-0 h-auto mt-1 text-primary">Printer Properties</Button>
                        </div>
                         <Separator />
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Settings</h2>
                            <div className="space-y-2">
                                 <PrintSettingDropdown icon={File} title={printRangeOptions[printRange].title} description={printRangeOptions[printRange].description}>
                                     <DropdownMenuItem onSelect={() => setPrintRange('all')}>Print All Pages</DropdownMenuItem>
                                     <DropdownMenuItem onSelect={() => setPrintRange('selection')}>Print Selection</DropdownMenuItem>
                                     <DropdownMenuItem onSelect={() => setPrintRange('current')}>Print Current Page</DropdownMenuItem>
                                     <DropdownMenuItem onSelect={() => setPrintRange('custom')}>Custom Print...</DropdownMenuItem>
                                 </PrintSettingDropdown>
                                 <div className="flex items-center gap-2">
                                    <Input placeholder="Pages:" className="flex-grow"/>
                                    <Info className="w-4 h-4 text-muted-foreground" />
                                 </div>
                                 <PrintSettingDropdown icon={File} title={printSidedOptions[printSided].title} description={printSidedOptions[printSided].description}>
                                     <DropdownMenuItem onSelect={() => setPrintSided('one-sided')}>Print One Sided</DropdownMenuItem>
                                     <DropdownMenuItem onSelect={() => setPrintSided('two-sided')}>Manually Print on Both Sides</DropdownMenuItem>
                                 </PrintSettingDropdown>
                                 <PrintSettingDropdown icon={Combine} title={printCollationOptions[printCollation].title} description={printCollationOptions[printCollation].description}>
                                     <DropdownMenuItem onSelect={() => setPrintCollation('collated')}>Collated</DropdownMenuItem>
                                     <DropdownMenuItem onSelect={() => setPrintCollation('uncollated')}>Uncollated</DropdownMenuItem>
                                 </PrintSettingDropdown>
                                 <PrintSettingDropdown icon={BookCopy} title={`${orientation.charAt(0).toUpperCase() + orientation.slice(1)} Orientation`} description="">
                                      <DropdownMenuItem onSelect={() => setOrientation('portrait')}>Portrait Orientation</DropdownMenuItem>
                                      <DropdownMenuItem onSelect={() => setOrientation('landscape')}>Landscape Orientation</DropdownMenuItem>
                                 </PrintSettingDropdown>
                                 <PrintSettingDropdown icon={Scaling} title={pageSize.name} description={`${pageSize.width} x ${pageSize.height}`}>
                                    {Object.values(PAGE_SIZES).map(size => (
                                        <DropdownMenuItem key={size.name} onSelect={() => setPageSize(size)}>
                                            {size.name} <span className="text-muted-foreground ml-2">{size.width} x {size.height}</span>
                                        </DropdownMenuItem>
                                    ))}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>More Paper Sizes...</DropdownMenuItem>
                                 </PrintSettingDropdown>
                                 <PrintSettingDropdown icon={File} title={currentMarginPreset} description={Object.values(margins).join(' ')}>
                                     {Object.entries(MARGIN_PRESETS).map(([key, preset]) => (
                                        <MarginMenuItem 
                                            key={key} 
                                            title={preset.name} 
                                            details={preset.details} 
                                            onSelect={() => setMargins(preset.values)}
                                            iconType={key}
                                        />
                                     ))}
                                     <DropdownMenuSeparator />
                                     <DropdownMenuItem onSelect={() => setIsCustomMarginsOpen(true)}>Custom Margins...</DropdownMenuItem>
                                 </PrintSettingDropdown>
                                 <PrintSettingDropdown icon={File} title={pagesPerSheetOptions[pagesPerSheet].title} description={pagesPerSheetOptions[pagesPerSheet].description}>
                                     <DropdownMenuItem onSelect={() => setPagesPerSheet('1')}>1 Page Per Sheet</DropdownMenuItem>
                                     <DropdownMenuItem onSelect={() => setPagesPerSheet('2')}>2 Pages Per Sheet</DropdownMenuItem>
                                     <DropdownMenuItem onSelect={() => setPagesPerSheet('4')}>4 Pages Per Sheet</DropdownMenuItem>
                                     <DropdownMenuItem onSelect={() => setPagesPerSheet('6')}>6 Pages Per Sheet</DropdownMenuItem>
                                 </PrintSettingDropdown>
                            </div>
                            <Button variant="link" className="p-0 h-auto mt-2 text-primary">Page Setup</Button>
                        </div>
                    </div>
                </ScrollArea>
                
                {/* Right Panel: Preview */}
                <div className="flex-grow flex flex-col p-4 overflow-hidden">
                    <div className="text-sm text-center text-muted-foreground p-2">{documentName} - Word</div>
                    <div className="flex-grow flex items-center justify-center overflow-auto p-4">
                         <div className="bg-background shadow-lg w-[8.5in] h-[11in] overflow-hidden" style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center' }}>
                             <DocumentEditor 
                                 content={editor?.getHTML() || ''}
                                 onUpdate={() => {}}
                                 setEditor={setMockEditor} // Use mock editor for preview
                                 className="p-8"
                             />
                         </div>
                    </div>
                     <div className="flex-shrink-0 flex items-center justify-between p-2 border-t">
                         <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-6 w-6"><ChevronLeft className="w-4 h-4" /></Button>
                             <Input value="1" className="h-6 w-10 text-center" readOnly/>
                             <span>of 1</span>
                            <Button variant="outline" size="icon" className="h-6 w-6"><ChevronRight className="w-4 h-4" /></Button>
                         </div>
                         <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setZoomLevel(prev => Math.max(10, prev - 10))}>
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-16 text-center text-sm">{zoomLevel}%</span>
                            <Slider
                                value={[zoomLevel]}
                                onValueChange={(val) => setZoomLevel(val[0])}
                                max={200}
                                min={10}
                                step={1}
                                className="w-32"
                            />
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setZoomLevel(prev => Math.min(200, prev + 10))}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                     </div>
                </div>
            </div>
        </>
    );
};

const InfoSection: FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  buttonText: string;
  children?: React.ReactNode;
}> = ({ icon: Icon, title, description, buttonText, children }) => (
  <div className="flex items-start gap-6 border-b py-6">
    <Icon className="w-12 h-12 text-primary/80 mt-2" />
    <div className="flex-grow">
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-muted-foreground text-sm mb-3">{description}</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="min-w-[200px] justify-between">
            {buttonText}
            <ChevronDown className="ml-2 w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* Add Dropdown Menu Items here */}
          <DropdownMenuItem>Option 1</DropdownMenuItem>
          <DropdownMenuItem>Option 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {children && <div className="mt-3 text-sm text-muted-foreground">{children}</div>}
    </div>
  </div>
);

const PropertyItem: FC<{ label: string; value: string | number; isEditable?: boolean }> = ({ label, value, isEditable }) => (
  <div className="flex justify-between py-1.5">
    <dt className="text-sm text-muted-foreground">{label}</dt>
    <dd className={cn("text-sm font-medium", isEditable && "text-primary hover:underline cursor-pointer")}>
      {value}
    </dd>
  </div>
);

const InfoScreen: FC<{documentName: string; wordCount: number}> = ({ documentName, wordCount }) => {
  return (
    <div className="p-8 h-full">
      <h1 className="text-4xl font-light mb-6">Info</h1>
      <div className="flex gap-16 h-full">
        {/* Left Column */}
        <div className="w-2/3">
          <div className="relative h-[250px] bg-muted rounded-md mb-6 flex items-center justify-center">
            <h2 className="text-2xl text-muted-foreground font-semibold">{documentName}</h2>
             <Button variant="outline" className="absolute bottom-4 right-4">Open File Location</Button>
          </div>
          <InfoSection
            icon={ShieldCheck}
            title="Protect Document"
            description="Control what types of changes people can make to this document."
            buttonText="Protect Document"
          />
          <InfoSection
            icon={FileCheck}
            title="Inspect Document"
            description="Before publishing this file, be aware that it contains:"
            buttonText="Check for Issues"
          >
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Document properties, author's name, and related dates.</li>
                <li>Hidden metadata or personal information.</li>
            </ul>
          </InfoSection>
          <InfoSection
            icon={FolderSync}
            title="Manage Document"
            description="There are no unsaved changes."
            buttonText="Manage Document"
          />
        </div>

        {/* Right Column */}
        <div className="w-1/3">
          <h2 className="text-lg font-semibold mb-2">Properties <ChevronDown className="inline w-4 h-4 text-muted-foreground" /></h2>
          <dl className="divide-y">
            <PropertyItem label="Size" value="Not saved yet" />
            <PropertyItem label="Pages" value="1" />
            <PropertyItem label="Words" value={wordCount} />
            <PropertyItem label="Total Editing Time" value="14 Minutes" />
            <PropertyItem label="Title" value="Add a title" isEditable />
            <PropertyItem label="Tags" value="Add a tag" isEditable />
            <PropertyItem label="Comments" value="Add comments" isEditable />
          </dl>
          
          <Separator className="my-4" />
          
          <h2 className="text-lg font-semibold mb-2">Related Dates</h2>
           <dl className="divide-y">
                <PropertyItem label="Last Modified" value="Not saved yet" />
                <PropertyItem label="Created" value={new Date().toLocaleString()} />
                <PropertyItem label="Last Printed" value="Never" />
           </dl>

           <Separator className="my-4" />

           <h2 className="text-lg font-semibold mb-2">Related People</h2>
            <dl className="divide-y">
                <div className="flex justify-between py-1.5 items-center">
                    <dt className="text-sm text-muted-foreground">Author</dt>
                    <dd className="text-sm font-medium flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarFallback>AN</AvatarFallback>
                        </Avatar>
                        Aman Nagtode
                    </dd>
                </div>
                 <PropertyItem label="Last Modified By" value="Aman Nagtode" />
            </dl>
        </div>
      </div>
    </div>
  );
};

    