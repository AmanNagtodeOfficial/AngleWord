
"use client";

import { Editor } from "@tiptap/react";
import {
  BarChart3,
  Blocks,
  Bookmark,
  CalendarDays,
  Camera,
  FilePlus2,
  GalleryThumbnails,
  ImageUp,
  Library,
  Link as LinkIcon,
  Link2,
  Image as LucideImage,
  MessageSquare,
  Newspaper,
  Omega,
  Package,
  PanelBottom,
  PanelTop,
  PenTool,
  Projector,
  Shapes,
  Sigma,
  SquarePen,
  Store as StoreIcon,
  Table,
  Type,
  UnfoldVertical,
  Video,
  Hash,
} from "lucide-react";
import { FC } from "react";
import { RibbonGroup, RibbonButton } from "../ribbon-ui";

interface InsertTabProps {
  editor: Editor | null;
}

export const InsertTab: FC<InsertTabProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex items-start">
      <RibbonGroup title="Pages">
        <RibbonButton icon={Newspaper}>Cover Page</RibbonButton>
        <RibbonButton icon={FilePlus2}>Blank Page</RibbonButton>
        <RibbonButton icon={UnfoldVertical}>Page Break</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Tables">
        <RibbonButton icon={Table}>Table</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Illustrations">
        <div className="flex flex-col">
          <RibbonButton icon={LucideImage}>Pictures</RibbonButton>
          <RibbonButton icon={ImageUp}>Online Pics</RibbonButton>
          <RibbonButton icon={Shapes}>Shapes</RibbonButton>
        </div>
        <div className="flex flex-col">
          <RibbonButton icon={Projector}>SmartArt</RibbonButton>
          <RibbonButton icon={BarChart3}>Chart</RibbonButton>
          <RibbonButton icon={Camera}>Screenshot</RibbonButton>
        </div>
      </RibbonGroup>
      <RibbonGroup title="Apps">
        <RibbonButton icon={StoreIcon}>Store</RibbonButton>
        <RibbonButton icon={GalleryThumbnails}>My Apps</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Media">
        <RibbonButton icon={Library}>Wikipedia</RibbonButton>
        <RibbonButton icon={Video}>Online Video</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Links">
        <RibbonButton icon={LinkIcon}>Hyperlink</RibbonButton>
        <RibbonButton icon={Bookmark}>Bookmark</RibbonButton>
        <RibbonButton icon={Link2}>Cross-ref</RibbonButton>
      </RibbonGroup>
       <RibbonGroup title="Comments">
        <RibbonButton icon={MessageSquare}>Comment</RibbonButton>
      </RibbonGroup>
       <RibbonGroup title="Header & Footer">
        <RibbonButton icon={PanelTop}>Header</RibbonButton>
        <RibbonButton icon={PanelBottom}>Footer</RibbonButton>
        <RibbonButton icon={Hash}>Page #</RibbonButton>
      </RibbonGroup>
      <RibbonGroup title="Text">
        <div className="flex flex-col">
          <RibbonButton icon={SquarePen}>Text Box</RibbonButton>
          <RibbonButton icon={Blocks}>Quick Parts</RibbonButton>
          <RibbonButton icon={Type}>WordArt</RibbonButton>
        </div>
        <div className="flex flex-col">
          <RibbonButton icon={Baseline}>Drop Cap</RibbonButton>
          <RibbonButton icon={PenTool}>Signature</RibbonButton>
          <RibbonButton icon={CalendarDays}>Date & Time</RibbonButton>
          <RibbonButton icon={Package}>Object</RibbonButton>
        </div>
      </RibbonGroup>
      <RibbonGroup title="Symbols">
        <RibbonButton icon={Sigma}>Equation</RibbonButton>
        <RibbonButton icon={Omega}>Symbol</RibbonButton>
      </RibbonGroup>
    </div>
  );
};
