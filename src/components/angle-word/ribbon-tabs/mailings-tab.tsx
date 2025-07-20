
"use client";

import { Editor } from "@tiptap/react";
import {
  ChevronDown,
  Mail,
  Tags,
  Users2,
  Highlighter,
  MapPin,
  Smile,
  Sheet,
  ScrollText,
  GitCompareArrows,
  RefreshCw,
  Search,
  CheckCircle2,
  UserPlus,
  UserCheck,
  Send,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FC } from "react";
import { RibbonGroup, RibbonButton, EditRecipientListIcon, PreviewResultsIcon, FinishAndMergeIcon } from "../ribbon-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface MailingsTabProps {
  editor: Editor | null;
}

export const MailingsTab: FC<MailingsTabProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex items-start p-2">
            <RibbonGroup title="Create">
                <RibbonButton icon={Mail}>Envelopes</RibbonButton>
                <RibbonButton icon={Tags}>Labels</RibbonButton>
            </RibbonGroup>

            <RibbonGroup title="Start Mail Merge">
                <RibbonButton icon={Users2}>
                    Start Mail
                    <br />
                    Merge
                    <ChevronDown className="inline w-3 h-3 ml-0.5" />
                </RibbonButton>
                <div className="flex flex-col space-y-1">
                    <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                        <UserPlus className="w-4 h-4 mr-2" /> Select Recipients <ChevronDown className="w-3 h-3 ml-auto" />
                    </Button>
                    <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                        <EditRecipientListIcon /> <span className="ml-1">Edit Recipient List</span>
                    </Button>
                </div>
            </RibbonGroup>

            <RibbonGroup title="Write & Insert Fields">
                <div className="flex flex-col space-y-1">
                    <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                        <Highlighter className="w-4 h-4 mr-2" /> Highlight Merge Fields
                    </Button>
                    <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                        <MapPin className="w-4 h-4 mr-2" /> Address Block
                    </Button>
                    <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                        <Smile className="w-4 h-4 mr-2" /> Greeting Line
                    </Button>
                </div>
                <div className="flex flex-col space-y-1">
                    <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                        <Sheet className="w-4 h-4 mr-2" /> Insert Merge Field <ChevronDown className="w-3 h-3 ml-auto" />
                    </Button>
                    <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                        <ScrollText className="w-4 h-4 mr-2" /> Rules <ChevronDown className="w-3 h-3 ml-auto" />
                    </Button>
                    <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                        <GitCompareArrows className="w-4 h-4 mr-2" /> Match Fields
                    </Button>
                </div>
                <div className="flex flex-col space-y-1">
                    <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                        <RefreshCw className="w-4 h-4 mr-2" /> Update Labels
                    </Button>
                </div>
            </RibbonGroup>

            <RibbonGroup title="Preview Results">
                <RibbonButton icon={PreviewResultsIcon}>
                    Preview
                    <br />
                    Results
                </RibbonButton>
                <div className="flex flex-col space-y-1 items-center">
                    <div className="flex items-center">
                        <Button variant="ghost" size="icon" className="h-6 w-6"><SkipBack className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6"><ChevronLeft className="w-4 h-4" /></Button>
                        <Input className="h-6 w-12 text-center text-xs" defaultValue="1" />
                        <Button variant="ghost" size="icon" className="h-6 w-6"><ChevronRight className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6"><SkipForward className="w-4 h-4" /></Button>
                    </div>
                    <div className="flex flex-col items-start w-full">
                    <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                            <Search className="w-4 h-4 mr-2" /> Find Recipient
                        </Button>
                        <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                            <CheckCircle2 className="w-4 h-4 mr-2" /> Check for Errors
                        </Button>
                    </div>
                </div>
            </RibbonGroup>

            <RibbonGroup title="Finish">
                <RibbonButton icon={FinishAndMergeIcon}>
                    Finish &<br />
                    Merge
                    <ChevronDown className="inline w-3 h-3 ml-0.5" />
                </RibbonButton>
            </RibbonGroup>
        </div>
        <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
