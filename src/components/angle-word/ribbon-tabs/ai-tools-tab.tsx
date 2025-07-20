
"use client";

import {
  Brain,
  FileText,
  Sparkles,
} from "lucide-react";
import { FC } from "react";
import { RibbonGroup, RibbonButton } from "../ribbon-ui";

interface AIToolsTabProps {
  onImproveWriting: () => void;
  onDetectTone: () => void;
  onSummarizeDocument: () => void;
}

export const AIToolsTab: FC<AIToolsTabProps> = ({
  onImproveWriting,
  onDetectTone,
  onSummarizeDocument,
}) => {
  return (
    <div className="flex items-start">
      <RibbonGroup title="Writing Assistant">
        <RibbonButton icon={Sparkles} onClick={onImproveWriting}>Improve</RibbonButton>
        <RibbonButton icon={Brain} onClick={onDetectTone}>Tone</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Document Analysis">
        <RibbonButton icon={FileText} onClick={onSummarizeDocument}>Summarize</RibbonButton>
      </RibbonGroup>
    </div>
  );
};
