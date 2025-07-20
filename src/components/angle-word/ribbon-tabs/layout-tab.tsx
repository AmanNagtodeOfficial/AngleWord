
"use client";

import type { Margins, Orientation, PageSize, Columns as ColumnsType } from "@/app/page";
import { PAGE_SIZES, MARGIN_PRESETS } from "@/app/page";
import { Editor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookCopy,
  ChevronDown,
  Columns as ColumnsIcon,
  FileText,
  Scaling,
} from "lucide-react";
import { FC } from "react";
import { RibbonGroup, RibbonButton, MarginIcon, MarginMenuItem, BreaksIcon, LineNumbersIcon, HyphenationIcon, PositionIcon, WrapTextIcon, NumberInputWithSteppers, AlignIcon, GroupObjectsIcon, RotateIcon } from "../ribbon-ui";
import { Button } from "@/components/ui/button";
import {
  BringToFront,
  SendToBack,
  TextSelect,
} from "lucide-react";

interface LayoutTabProps {
  editor: Editor | null;
  margins: Margins;
  setMargins: (margins: Margins) => void;
  orientation: Orientation;
  setOrientation: (orientation: Orientation) => void;
  pageSize: PageSize;
  setPageSize: (pageSize: PageSize) => void;
  columns: ColumnsType;
  setColumns: (columns: ColumnsType) => void;
  onCustomMarginsClick: () => void;
}

export const LayoutTab: FC<LayoutTabProps> = ({
  editor,
  margins,
  setMargins,
  orientation,
  setOrientation,
  pageSize,
  setPageSize,
  columns,
  setColumns,
  onCustomMarginsClick,
}) => {
  if (!editor) return null;

  return (
    <div className="flex items-start">
      <RibbonGroup title="Page Setup">
          <div className="flex">
              <div className="flex flex-col">
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <RibbonButton icon={FileText}>Margins</RibbonButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-64">
                          <MarginMenuItem 
                            title="Last Custom Setting" 
                            details={['Top: 0 cm', 'Bottom: 0 cm', 'Left: 0 cm', 'Right: 0 cm']} 
                            onSelect={() => setMargins({ top: '0', bottom: '0', left: '0', right: '0' })} 
                            iconType="custom"
                          />
                          <DropdownMenuSeparator/>
                          {Object.entries(MARGIN_PRESETS).map(([key, { name, values, details }]) => (
                            <MarginMenuItem 
                                key={key} 
                                title={name} 
                                details={details} 
                                onSelect={() => setMargins(values)}
                                iconType={key}
                            />
                          ))}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onSelect={onCustomMarginsClick} className="cursor-pointer">
                              Custom Margins...
                          </DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>
              </div>
              <div className="flex flex-col">
                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <RibbonButton icon={BookCopy}>Orientation</RibbonButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                          <DropdownMenuItem onSelect={() => setOrientation('portrait')}>Portrait</DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => setOrientation('landscape')}>Landscape</DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>
              </div>
              <div className="flex flex-col">
                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <RibbonButton icon={Scaling}>Size</RibbonButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                          {Object.values(PAGE_SIZES).map((size) => (
                              <DropdownMenuItem key={size.name} onSelect={() => setPageSize(size)}>
                                  {size.name} ({size.width} x {size.height})
                              </DropdownMenuItem>
                          ))}
                      </DropdownMenuContent>
                  </DropdownMenu>
              </div>
               <div className="flex flex-col">
                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <RibbonButton icon={ColumnsIcon}>Columns</RibbonButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                          <DropdownMenuItem onSelect={() => setColumns(1)}>One</DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => setColumns(2)}>Two</DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => setColumns(3)}>Three</DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>
              </div>
          </div>
           <div className="flex flex-col space-y-1 ml-2 pl-2 border-l">
              <Button variant="ghost" className="h-auto p-1 justify-start text-xs">
                  <BreaksIcon /> <span className="ml-1">Breaks</span> <ChevronDown className="w-3 h-3 ml-auto" />
              </Button>
               <Button variant="ghost" className="h-auto p-1 justify-start text-xs">
                  <LineNumbersIcon /> <span className="ml-1">Line Numbers</span> <ChevronDown className="w-3 h-3 ml-auto" />
              </Button>
               <Button variant="ghost" className="h-auto p-1 justify-start text-xs">
                  <HyphenationIcon /> <span className="ml-1">Hyphenation</span> <ChevronDown className="w-3 h-3 ml-auto" />
              </Button>
          </div>
      </RibbonGroup>
      <RibbonGroup title="Paragraph">
          <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                  <span className="text-sm">Indent</span>
                  <NumberInputWithSteppers label="Left" value="0" unit="cm" />
                  <NumberInputWithSteppers label="Right" value="0" unit="cm" />
              </div>
              <div className="flex flex-col gap-2">
                  <span className="text-sm">Spacing</span>
                  <NumberInputWithSteppers label="Before" value="0" unit="pt" />
                  <NumberInputWithSteppers label="After" value="8" unit="pt" />
              </div>
          </div>
      </RibbonGroup>
      <RibbonGroup title="Arrange">
          <div className="flex">
              <div className="flex flex-col gap-1">
                  <RibbonButton icon={PositionIcon} disabled>Position</RibbonButton>
                  <RibbonButton icon={WrapTextIcon} disabled>Wrap Text</RibbonButton>
              </div>
              <div className="flex flex-col gap-1">
                  <RibbonButton icon={BringToFront} disabled>Bring Forward</RibbonButton>
                  <RibbonButton icon={SendToBack} disabled>Send Backward</RibbonButton>
              </div>
              <div className="flex flex-col gap-1">
                 <RibbonButton icon={TextSelect} disabled>Selection Pane</RibbonButton>
                 <div className="flex flex-col items-start pl-1">
                     <Button variant="ghost" size="sm" className="h-auto p-1 text-xs justify-start" disabled><AlignIcon/> <span className="ml-1">Align</span> <ChevronDown className="w-3 h-3 ml-auto" /></Button>
                     <Button variant="ghost" size="sm" className="h-auto p-1 text-xs justify-start" disabled><GroupObjectsIcon/> <span className="ml-1">Group</span> <ChevronDown className="w-3 h-3 ml-auto" /></Button>
                     <Button variant="ghost" size="sm" className="h-auto p-1 text-xs justify-start" disabled><RotateIcon/> <span className="ml-1">Rotate</span> <ChevronDown className="w-3 h-3 ml-auto" /></Button>
                 </div>
              </div>
          </div>
      </RibbonGroup>
    </div>
  );
};
