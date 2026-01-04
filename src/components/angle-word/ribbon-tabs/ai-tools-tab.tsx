
"use client";

import {
  Brain,
  FileText,
} from "lucide-react";
import { FC } from "react";
import { RibbonGroup, RibbonButton } from "../ribbon-ui";

interface AIToolsTabProps {
  onDetectTone: () => void;
  onSummarizeDocument: () => void;
}

export const AIToolsTab: FC<AIToolsTabProps> = ({
  onDetectTone,
  onSummarizeDocument,
}) => {
  return (
    <div className="flex items-start">
      <RibbonGroup title="Writing Assistant">
        <RibbonButton icon={Brain} onClick={onDetectTone}>Tone</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Document Analysis">
        <RibbonButton icon={FileText} onClick={onSummarizeDocument}>Summarize</RibbonButton>
      </RibbonGroup>
    </div>
  );
};
