
"use client";

import { Editor } from "@tiptap/react";
import {
  ClipboardCheck,
  MessageCircle,
  ScanText,
  SpellCheck,
} from "lucide-react";
import { FC } from "react";
import { RibbonGroup, RibbonButton } from "../ribbon-ui";

interface ReviewTabProps {
  editor: Editor | null;
}

export const ReviewTab: FC<ReviewTabProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex items-start">
      <RibbonGroup title="Proofing">
        <RibbonButton icon={SpellCheck}>Spelling</RibbonButton>
        <RibbonButton icon={ScanText}>Word Count</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Comments">
        <RibbonButton icon={MessageCircle}>Comment</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Tracking">
        <RibbonButton icon={ClipboardCheck}>Track Changes</RibbonButton>
      </RibbonGroup>
    </div>
  );
};
