
"use client";

import { Editor } from "@tiptap/react";
import { FC } from "react";

interface DesignTabProps {
  editor: Editor | null;
}

export const DesignTab: FC<DesignTabProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex items-start h-[120px] justify-center text-muted-foreground">
      {/* Content for the Design tab will be added later */}
    </div>
  );
};
