
"use client";

import { Editor } from "@tiptap/react";
import {
  Book,
  Footprints,
  ListOrdered,
} from "lucide-react";
import { FC } from "react";
import { RibbonGroup, RibbonButton } from "../ribbon-ui";

interface ReferencesTabProps {
  editor: Editor | null;
}

export const ReferencesTab: FC<ReferencesTabProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex items-start">
       <RibbonGroup title="Table of Contents">
        <RibbonButton icon={ListOrdered}>Contents</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Citations">
        <RibbonButton icon={Book}>Bibliography</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Footnotes">
        <RibbonButton icon={Footprints}>Footnote</RibbonButton>
      </RibbonGroup>
    </div>
  );
};
