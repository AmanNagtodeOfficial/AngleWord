
"use client";

import { Editor } from "@tiptap/react";
import { FC } from "react";
import { RibbonGroup, RibbonButton, NumberInputWithSteppers } from "../ribbon-ui";
import { 
    Table, 
    Trash2, 
    ChevronDown,
    ArrowUpFromLine,
    ArrowDownToLine,
    ArrowLeftFromLine,
    ArrowRightFromLine,
    Combine,
    Split,
    Move,
    GripVertical,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    AlignStartVertical,
    AlignCenterVertical,
    AlignEndVertical,
    CaseSensitive,
    ArrowDownAZ,
    Repeat,
    FunctionSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TableLayoutTabProps {
  editor: Editor | null;
}

const handleCommand = (editor: Editor | null, command: keyof ReturnType<Editor['chain']>) => {
    if (editor) {
        (editor.chain().focus()[command] as () => boolean)();
    }
}


export const TableLayoutTab: FC<TableLayoutTabProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex items-start">
      <RibbonGroup title="Table">
        <RibbonButton icon={Table} onClick={() => handleCommand(editor, 'deleteTable')}>
          Select
          <ChevronDown className="inline w-3 h-3 ml-0.5" />
        </RibbonButton>
        <RibbonButton icon={Move}>
            View
            <br />
            Gridlines
        </RibbonButton>
        <RibbonButton icon={Move}>Properties</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Draw">
          <RibbonButton icon={Move}>Draw Table</RibbonButton>
          <RibbonButton icon={Move}>Eraser</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Rows & Columns">
          <RibbonButton icon={Trash2} onClick={() => handleCommand(editor, 'deleteTable')}>Delete <ChevronDown className="inline w-3 h-3 ml-0.5" /></RibbonButton>
          <RibbonButton icon={ArrowUpFromLine} onClick={() => handleCommand(editor, 'addRowBefore')}>Insert Above</RibbonButton>
          <RibbonButton icon={ArrowDownToLine} onClick={() => handleCommand(editor, 'addRowAfter')}>Insert Below</RibbonButton>
          <RibbonButton icon={ArrowLeftFromLine} onClick={() => handleCommand(editor, 'addColumnBefore')}>Insert Left</RibbonButton>
          <RibbonButton icon={ArrowRightFromLine} onClick={() => handleCommand(editor, 'addColumnAfter')}>Insert Right</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Merge">
          <RibbonButton icon={Combine} onClick={() => handleCommand(editor, 'mergeCells')}>Merge Cells</RibbonButton>
          <RibbonButton icon={Split} onClick={() => handleCommand(editor, 'splitCell')}>Split Cells</RibbonButton>
          <RibbonButton icon={Table} onClick={() => { /* Need custom logic */}}>Split Table</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Cell Size">
          <RibbonButton icon={GripVertical}>AutoFit <ChevronDown className="inline w-3 h-3 ml-0.5" /></RibbonButton>
          <div className="flex flex-col gap-2">
             <NumberInputWithSteppers label="Height" value="0" unit="cm" />
             <NumberInputWithSteppers label="Width" value="0" unit="cm" />
          </div>
          <div className="flex flex-col gap-2">
             <Button variant="ghost" size="sm" className="h-auto p-1 text-xs justify-start">Distribute Rows</Button>
             <Button variant="ghost" size="sm" className="h-auto p-1 text-xs justify-start">Distribute Columns</Button>
          </div>
      </RibbonGroup>
       <RibbonGroup title="Alignment">
          <div className="grid grid-cols-3 gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6"><AlignStartVertical /></Button>
              <Button variant="ghost" size="icon" className="h-6 w-6"><AlignCenterVertical /></Button>
              <Button variant="ghost" size="icon" className="h-6 w-6"><AlignEndVertical /></Button>
              <Button variant="ghost" size="icon" className="h-6 w-6"><AlignLeft /></Button>
              <Button variant="ghost" size="icon" className="h-6 w-6"><AlignCenter /></Button>
              <Button variant="ghost" size="icon" className="h-6 w-6"><AlignRight /></Button>
          </div>
           <div className="flex flex-col gap-1 border-l pl-1 ml-1">
               <Button variant="ghost" size="sm" className="h-auto p-1 text-xs justify-start"><CaseSensitive className="w-4 h-4 mr-1"/>Text Direction</Button>
               <Button variant="ghost" size="sm" className="h-auto p-1 text-xs justify-start">Cell Margins</Button>
           </div>
      </RibbonGroup>
      <RibbonGroup title="Data">
        <RibbonButton icon={ArrowDownAZ}>Sort</RibbonButton>
        <RibbonButton icon={Repeat}>Repeat Header Rows</RibbonButton>
        <RibbonButton icon={Table}>Convert to Text</RibbonButton>
        <RibbonButton icon={FunctionSquare}>Formula</RibbonButton>
      </RibbonGroup>
    </div>
  );
};
