
"use client";

import { Editor } from "@tiptap/react";
import {
  Mail,
  Tags,
  Users2,
} from "lucide-react";
import { FC } from "react";
import { RibbonGroup, RibbonButton } from "../ribbon-ui";

interface MailingsTabProps {
  editor: Editor | null;
}

export const MailingsTab: FC<MailingsTabProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex items-start">
      <RibbonGroup title="Create">
        <RibbonButton icon={Mail}>Envelopes</RibbonButton>
        <RibbonButton icon={Tags}>Labels</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Start Mail Merge">
        <RibbonButton icon={Users2}>Mail Merge</RibbonButton>
      </RibbonGroup>
    </div>
  );
};
