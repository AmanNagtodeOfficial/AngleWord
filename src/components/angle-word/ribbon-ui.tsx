
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
    <span className="text-xs text-muted-foreground mt-1">{title}</span>
  </div>
);

export const RibbonButton: FC<{ children: React.ReactNode, icon: React.ElementType, className?: string, [key: string]: any }> = ({ children, icon: Icon, className: extraClassName, ...props }) => (
  <Button variant="ghost" className={`flex flex-col items-center h-auto p-2 ${extraClassName || ''}`} {...props}>
    <Icon className="w-5 h-5 mb-1" />
    <span className="text-xs text-center">{children}</span>
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
