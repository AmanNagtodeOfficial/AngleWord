
"use client";

import { Editor } from "@tiptap/react";
import {
  BookOpen,
  ChevronDown,
  Globe,
  Languages,
  MessageSquarePlus,
  MessageSquareX,
  MessageSquare,
  Shield,
  BookA,
  FileCheck2,
  FileX2,
  FileClock,
  Mic,
  ArrowLeft,
  ArrowRight,
  Eye,
  Users,
  Lock,
  Pen,
} from "lucide-react";
import { FC } from "react";
import { RibbonGroup, RibbonButton, SpellingAndGrammarIcon, ThesaurusIcon, CheckAccessibilityIcon, TranslateIcon, SetLanguageIcon, TrackChangesIcon, ReviewingPaneIcon, AcceptChangesIcon, RejectChangesIcon, PreviousChangeIcon, NextChangeIcon, CompareIcon, BlockAuthorsIcon, RestrictEditingIcon, HideInkIcon } from "../ribbon-ui";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ReviewTabProps {
  editor: Editor | null;
}

export const ReviewTab: FC<ReviewTabProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex items-start">
      <RibbonGroup title="Proofing">
        <RibbonButton icon={SpellingAndGrammarIcon}>
            Spelling &<br/>Grammar
        </RibbonButton>
        <RibbonButton icon={ThesaurusIcon}>
            Thesaurus
        </RibbonButton>
      </RibbonGroup>

      <RibbonGroup title="Speech">
        <RibbonButton icon={Mic}>
            Read<br/>Aloud
        </RibbonButton>
      </RibbonGroup>
      
      <RibbonGroup title="Accessibility">
        <RibbonButton icon={CheckAccessibilityIcon}>
            Check<br/>Accessibility
        </RibbonButton>
      </RibbonGroup>

      <RibbonGroup title="Language">
        <RibbonButton icon={TranslateIcon}>
            Translate
            <ChevronDown className="inline w-3 h-3 ml-0.5" />
        </RibbonButton>
        <RibbonButton icon={SetLanguageIcon}>
            Language
            <ChevronDown className="inline w-3 h-3 ml-0.5" />
        </RibbonButton>
      </RibbonGroup>

      <RibbonGroup title="Comments">
        <RibbonButton icon={MessageSquarePlus}>
            New<br/>Comment
        </RibbonButton>
        <div className="flex flex-col space-y-1">
            <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                <MessageSquareX className="w-4 h-4 mr-2" /> Delete
            </Button>
            <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                <ArrowRight className="w-4 h-4 mr-2" /> Next
            </Button>
        </div>
        <RibbonButton icon={MessageSquare}>
            Show<br/>Comments
        </RibbonButton>
      </RibbonGroup>

       <RibbonGroup title="Tracking">
        <RibbonButton icon={TrackChangesIcon} className="w-20">
          Track Changes
          <ChevronDown className="inline w-3 h-3 ml-0.5" />
        </RibbonButton>
        <div className="flex flex-col space-y-1 w-36">
            <Select defaultValue="simple">
                <SelectTrigger className="h-7 text-xs">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="simple">Simple Markup</SelectItem>
                    <SelectItem value="all">All Markup</SelectItem>
                    <SelectItem value="none">No Markup</SelectItem>
                    <SelectItem value="original">Original</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                Show Markup <ChevronDown className="w-3 h-3 ml-auto" />
            </Button>
            <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                <ReviewingPaneIcon /> <span className="ml-1">Reviewing Pane</span> <ChevronDown className="w-3 h-3 ml-auto" />
            </Button>
        </div>
        <div className="flex flex-col space-y-1 border-l pl-1 ml-1">
            <RibbonButton icon={AcceptChangesIcon}>
                Accept
                <ChevronDown className="inline w-3 h-3 ml-0.5" />
            </RibbonButton>
            <RibbonButton icon={RejectChangesIcon}>
                Reject
                <ChevronDown className="inline w-3 h-3 ml-0.5" />
            </RibbonButton>
        </div>
        <div className="flex flex-col space-y-1">
             <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                <PreviousChangeIcon /> <span className="ml-1">Previous</span>
            </Button>
            <Button variant="ghost" className="h-auto p-1 text-xs justify-start hover:bg-accent hover:text-accent-foreground">
                <NextChangeIcon /> <span className="ml-1">Next</span>
            </Button>
        </div>
      </RibbonGroup>

      <RibbonGroup title="Compare">
          <RibbonButton icon={CompareIcon}>
            Compare
            <ChevronDown className="inline w-3 h-3 ml-0.5" />
          </RibbonButton>
      </RibbonGroup>

       <RibbonGroup title="Protect">
          <RibbonButton icon={BlockAuthorsIcon}>
            Block Authors
            <ChevronDown className="inline w-3 h-3 ml-0.5" />
          </RibbonButton>
          <RibbonButton icon={RestrictEditingIcon}>
            Restrict<br/>Editing
          </RibbonButton>
      </RibbonGroup>

       <RibbonGroup title="Ink">
          <RibbonButton icon={HideInkIcon}>
            Hide Ink
            <ChevronDown className="inline w-3 h-3 ml-0.5" />
          </RibbonButton>
      </RibbonGroup>
    </div>
  );
};
