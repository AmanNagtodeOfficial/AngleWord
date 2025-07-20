
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { FC } from "react";

export const RibbonGroup: FC<{ title: string, children: React.ReactNode, className?: string }> = ({ title, children, className }) => (
  <div className={`flex flex-col items-center p-1 border-r last:border-r-0 ${className || ''}`}>
    <div className="flex items-start gap-0.5">
      {children}
    </div>
    <span className="text-xs text-muted-foreground mt-1 text-center">{title}</span>
  </div>
);

export const RibbonButton: FC<{ children: React.ReactNode, icon: React.ElementType, className?: string, [key: string]: any }> = ({ children, icon: Icon, className: extraClassName, ...props }) => (
  <Button variant="ghost" className={`flex flex-col items-center h-auto p-2 ${extraClassName || ''}`} {...props}>
    <Icon className="w-8 h-8 mb-1" />
    <span className="text-xs text-center leading-tight">{children}</span>
  </Button>
);

export const SmallRibbonButton: FC<{ children?: React.ReactNode, icon: React.ElementType, tooltip: string, [key: string]: any }> = ({ children, icon: Icon, tooltip, ...props }) => (
  <Button variant="ghost" className="p-1 h-auto" title={tooltip} {...props}>
    <div className="flex flex-col items-center">
      {children || <Icon className="w-4 h-4" />}
    </div>
  </Button>
);

export const BulletDiscIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="4" fill="currentColor"/></svg>;
export const BulletCircleIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3.5" stroke="currentColor"/></svg>;
export const BulletSquareIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="8" width="8" height="8" fill="currentColor"/></svg>;

export const MarginIcon: FC<{ type: string }> = ({ type }) => {
    const baseStyle: React.SVGProps<SVGSVGElement> = {
      width: '32px',
      height: '32px',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.5,
    };

    switch (type) {
        case 'normal':
            return <svg {...baseStyle}><rect x="4" y="4" width="16" height="16" rx="1" ry="1" stroke="#3b82f6" /><rect x="6" y="6" width="12" height="12" rx="0.5" ry="0.5" strokeDasharray="2 2" stroke="#6b7280" /></svg>;
        case 'narrow':
            return <svg {...baseStyle}><rect x="4" y="4" width="16" height="16" rx="1" ry="1" stroke="#3b82f6" /><rect x="5" y="5" width="14" height="14" rx="0.5" ry="0.5" strokeDasharray="2 2" stroke="#6b7280" /></svg>;
        case 'moderate':
            return <svg {...baseStyle}><rect x="4" y="4" width="16" height="16" rx="1" ry="1" stroke="#3b82f6" /><rect x="5.5" y="6" width="13" height="12" rx="0.5" ry="0.5" strokeDasharray="2 2" stroke="#6b7280" /></svg>;
        case 'wide':
            return <svg {...baseStyle}><rect x="4" y="4" width="16" height="16" rx="1" ry="1" stroke="#3b82f6" /><rect x="8" y="6" width="8" height="12" rx="0.5" ry="0.5" strokeDasharray="2 2" stroke="#6b7280" /></svg>;
        case 'mirrored':
            return <svg {...baseStyle}><rect x="4" y="4" width="16" height="16" rx="1" ry="1" stroke="#3b82f6" /><path d="M12 6V18" stroke="#3b82f6" strokeDasharray="2 2" /><rect x="6" y="6" width="5" height="12" rx="0.5" ry="0.5" strokeDasharray="2 2" stroke="#6b7280" /><rect x="13" y="6" width="5" height="12" rx="0.5" ry="0.5" strokeDasharray="2 2" stroke="#6b7280" /></svg>;
        case 'custom':
            return <svg {...baseStyle}><rect x="4" y="4" width="16" height="16" rx="1" ry="1" stroke="#3b82f6" /><Star x="8" y="8" width="8" height="8" fill="#f59e0b" stroke="#f59e0b" /></svg>;
        default:
            return <svg {...baseStyle}><rect x="4" y="4" width="16" height="16" rx="1" ry="1" stroke="#3b82f6" /></svg>;
    }
};

export const MarginMenuItem: FC<{ title: string; details: string[]; onSelect: () => void; iconType: string }> = ({ title, details, onSelect, iconType }) => (
    <DropdownMenuItem className="p-2 cursor-pointer items-start" onSelect={onSelect}>
        <div className="mr-3 flex-shrink-0">
            <MarginIcon type={iconType} />
        </div>
        <div className="flex-grow">
            <p className="font-semibold text-sm">{title}</p>
            <div className="grid grid-cols-2 text-xs text-muted-foreground gap-x-2">
                {details.map((detail, i) => <span key={i}>{detail}</span>)}
            </div>
        </div>
    </DropdownMenuItem>
);

export const BreaksIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 8V6H19V8H5Z" fill="currentColor"/>
        <path d="M5 18V16H19V18H5Z" fill="currentColor"/>
        <path d="M7 12H9V10H7V12Z" fill="#3B82F6"/>
        <path d="M11 12H13V10H11V12Z" fill="#3B82F6"/>
        <path d="M15 12H17V10H15V12Z" fill="#3B82F6"/>
    </svg>
);

export const LineNumbersIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 8H17V6H7V8Z" fill="currentColor"/>
        <path d="M7 16H17V14H7V16Z" fill="currentColor"/>
        <text x="5" y="10" fontFamily="sans-serif" fontSize="8" fill="#3B82F6" textAnchor="end">1</text>
        <text x="5" y="18" fontFamily="sans-serif" fontSize="8" fill="#3B82F6" textAnchor="end">2</text>
    </svg>
);

export const HyphenationIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="6" y="10" fontFamily="sans-serif" fontSize="8" fill="#3B82F6" textAnchor="end">a-</text>
        <text x="6" y="19" fontFamily="sans-serif" fontSize="8" fill="#3B82F6" textAnchor="end">bc</text>
    </svg>
);

export const PositionIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="16" height="16" fill="#F3F4F6"/>
      <path d="M4 8H20" stroke="#A1A1AA" strokeWidth="0.5"/>
      <path d="M4 12H20" stroke="#A1A1AA" strokeWidth="0.5"/>
      <path d="M4 16H20" stroke="#A1A1AA" strokeWidth="0.5"/>
      <path d="M8 4V20" stroke="#A1A1AA" strokeWidth="0.5"/>
      <path d="M12 4V20" stroke="#A1A1AA" strokeWidth="0.5"/>
      <path d="M16 4V20" stroke="#A1A1AA" strokeWidth="0.5"/>
      <rect x="7" y="7" width="4" height="4" fill="#3B82F6"/>
    </svg>
);

export const WrapTextIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 10H8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 10H20" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 14H8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 14H20" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 18H20" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="9" width="6" height="6" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1"/>
    </svg>
);

export const AlignIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 20H20" stroke="currentColor" strokeWidth="2"/>
      <rect x="6" y="8" width="4" height="8" fill="currentColor"/>
      <rect x="14" y="4" width="4" height="12" fill="currentColor"/>
    </svg>
);

export const GroupObjectsIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="8" height="8" stroke="currentColor" strokeWidth="2" rx="1"/>
      <rect x="12" y="12" width="8" height="8" stroke="currentColor" strokeWidth="2" rx="1"/>
    </svg>
);

export const RotateIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 3.16327C18.4231 4.54582 21 7.9205 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 9.77398 3.86928 7.76186 5.33782 6.22352" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M15 3H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 6H18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const EditRecipientListIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h16v12H4z" fill="#E0E7FF" />
        <path d="M4 4h16v4H4z" fill="#C7D2FE" />
        <path d="M7 6h4v1H7z" fill="currentColor" />
        <path d="M11 11.5L9.5 13l-1-1-2 2h6l-1.5-2z" fill="#6366F1"/>
        <path d="M17.5 14l-2.5 2.5-1-1-2 2h7l-1.5-3.5z" fill="#6366F1"/>
        <path d="M18 9l-1 2h3z" fill="#A5B4FC" />
        <path d="M21 12l-3 4h5z" fill="#A5B4FC" />
        <path d="M19 20l-4-4h8z" fill="#A5B4FC" />
    </svg>
);

export const PreviewResultsIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="6" y="16" fontFamily="serif" fontSize="10" fill="currentColor" fontWeight="bold">AB</text>
        <circle cx="15" cy="9" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 12l-4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

export const FinishAndMergeIcon = () => (
     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h12v10H4z" fill="#E0E7FF" />
        <path d="M5 6h8v1H5z" fill="currentColor" />
        <path d="M5 8h6v1H5z" fill="currentColor" />
        <path d="M17 10h5v2h-5z" fill="#3B82F6" />
        <path d="M19.5 8l2.5 4l-2.5 4h-2l2.5-4l-2.5-4z" fill="#3B82F6" />
        <path d="M4 16h16v4H4z" fill="#E0E7FF" />
        <path d="M5 18h14v1H5z" fill="currentColor" />
    </svg>
);


export const NumberInputWithSteppers: FC<{ label: string, value: string, unit: string }> = ({ label, value, unit }) => (
    <div className="flex items-center gap-1">
        <Label className="text-xs text-muted-foreground w-12">{label}</Label>
        <div className="relative">
            <Input 
                className="h-6 w-24 text-xs pr-6" 
                value={`${value} ${unit}`}
                readOnly 
            />
            <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center">
                <Button variant="ghost" className="h-3 w-4 p-0 rounded-none"><ChevronUp className="w-3 h-3" /></Button>
                <Button variant="ghost" className="h-3 w-4 p-0 rounded-none"><ChevronDown className="w-3 h-3" /></Button>
            </div>
        </div>
    </div>
);


export const SpellingAndGrammarIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="4" y="12" fontFamily="sans-serif" fontSize="10" fill="currentColor">ABC</text>
        <path d="M7 14L9 18L15 8" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const ThesaurusIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="4" width="14" height="16" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 4V20" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 9H19" stroke="currentColor" strokeWidth="1"/>
        <path d="M5 15H19" stroke="currentColor" strokeWidth="1"/>
        <path d="M12 7h4" stroke="red" strokeWidth="1"/>
        <path d="M12 12h5" stroke="currentColor" strokeWidth="1"/>
    </svg>
);

export const CheckAccessibilityIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="6" r="2" fill="currentColor"/>
        <path d="M12 10v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 12l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 12l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const TranslateIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-1.5l-2-4H5v4H3V7h4c1.66 0 3 1.34 3 3s-1.34 3-3 3h-1.5l2 4zm6-1.75c-1.04 0-1.92-.6-2.4-1.5H9.5v-1.5h7.21c.14-.4.29-.78.29-1.25s-.15-.85-.29-1.25H12v-1.5h3.4c.48-.9 1.36-1.5 2.4-1.5.25 0 .49.03.71.09l.79-2.09L20 7.03l-.79 2.09c.47.6.79 1.32.79 2.13s-.32 1.53-.79 2.13l.79 2.09-2.12.72-.79-2.09c-.22.06-.46.09-.71.09z" fill="currentColor"/>
    </svg>
);

export const SetLanguageIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m11.99 2-8.99 9L2 15h9v7h2v-7h9l-1-4-9-9zM5.41 13.01l-1.42-1.42L12 3.59l8.01 8.01-1.42 1.42L12 6.41 5.41 13.01z" fill="currentColor"/>
        <path d="M6 17h12v2H6z" fill="currentColor"/>
    </svg>
);

export const TrackChangesIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h16v16H4z" fill="#F3F4F6"/>
        <path d="M6 8h12" stroke="red" strokeWidth="1" strokeDasharray="2 2"/>
        <path d="M6 12h12" stroke="currentColor" strokeWidth="1"/>
        <path d="M6 16h12" stroke="currentColor" strokeWidth="1"/>
        <path d="M18 6l-2 4h4z" fill="#3B82F6"/>
    </svg>
);

export const ReviewingPaneIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h16v16H4z" fill="#F3F4F6"/>
        <path d="M4 4h6v16H4z" fill="#E0E7FF"/>
        <path d="M5 6h4v1H5z" stroke="currentColor"/>
        <path d="M5 9h4v1H5z" stroke="currentColor"/>
    </svg>
);

export const AcceptChangesIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h16v16H4z" fill="#F3F4F6"/>
        <path d="M6 12h12" stroke="currentColor" strokeWidth="1"/>
        <path d="m9 16 2 2 4-4" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
export const RejectChangesIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h16v16H4z" fill="#F3F4F6"/>
        <path d="M6 12h12" stroke="red" strokeWidth="1" strokeDasharray="2 2"/>
        <path d="m10 15 4-4m0 4-4-4" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const PreviousChangeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h16v16H4z" fill="#F3F4F6"/>
        <path d="M12 8l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const NextChangeIcon = () => (
     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h16v16H4z" fill="#F3F4F6"/>
        <path d="M12 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const CompareIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 2h10v20H4z" fill="#F3F4F6"/>
        <path d="M6 6h6" stroke="currentColor" strokeWidth="1"/>
        <path d="M10 2h10v20H10z" fill="#E0E7FF" opacity="0.7"/>
        <path d="M12 10h6" stroke="red" strokeWidth="1"/>
        <path d="M16 4l4 4m0-4-4 4" stroke="#3B82F6" strokeWidth="2"/>
    </svg>
);

export const BlockAuthorsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M17 18c0-2.76-2.24-5-5-5s-5 2.24-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="5" fill="#FEE2E2"/>
        <path d="m13.5 18.5 5-5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

export const RestrictEditingIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h16v16H4z" fill="#F3F4F6"/>
        <path d="M6 6h12v1H6z" stroke="currentColor" strokeWidth="1"/>
        <path d="M6 8h12v1H6z" stroke="currentColor" strokeWidth="1"/>
        <path d="M6 10h12v1H6z" stroke="currentColor" strokeWidth="1"/>
        <path d="M16 14v-1h-2v1h-1v3h4v-3z" fill="currentColor"/>
        <path d="M15 14h-1v-2a2 2 0 0 1 4 0v2h-1" stroke="currentColor" strokeWidth="1" fill="none"/>
    </svg>
);

export const HideInkIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 6h12v12H6z" stroke="currentColor" strokeDasharray="2 2" strokeWidth="1"/>
        <path d="M18 6 A 8 8 0 0 0 10 14" stroke="red" strokeWidth="1.5" fill="none"/>
        <path d="M6 18 L 18 6" stroke="currentColor" strokeWidth="1"/>
    </svg>
);
    
