
"use client";

import { useEffect, useState, useMemo } from 'react';
import type { Margins, Orientation, PageSize } from '@/app/page';

interface RulerProps {
  pageSize: PageSize;
  margins: Margins;
  orientation: Orientation;
}

const DPI = 96;

const convertToPx = (value: string): number => {
    if (!value) return 0;
    if (value.endsWith('in')) {
        return parseFloat(value) * DPI;
    }
    if (value.endsWith('cm')) {
        return parseFloat(value) * DPI / 2.54;
    }
    if (value.endsWith('mm')) {
        return parseFloat(value) * DPI / 25.4;
    }
    return parseFloat(value); // Assume px if no unit
};

export function HorizontalRuler({ pageSize, margins, orientation }: RulerProps) {
  const [pageWidthPx, setPageWidthPx] = useState(0);

  useEffect(() => {
    const widthStr = orientation === 'portrait' ? pageSize.width : pageSize.height;
    setPageWidthPx(convertToPx(widthStr));
  }, [pageSize, orientation]);

  const leftMarginPx = useMemo(() => convertToPx(margins.left), [margins.left]);
  const rightMarginPx = useMemo(() => convertToPx(margins.right), [margins.right]);
  
  const rulerContentWidth = useMemo(() => pageWidthPx - leftMarginPx - rightMarginPx, [pageWidthPx, leftMarginPx, rightMarginPx]);
  const totalWidthInches = useMemo(() => rulerContentWidth / DPI, [rulerContentWidth]);


  const renderTicks = () => {
    const ticks = [];
    const tickIncrement = DPI / 8; // Ticks every 1/8th of an inch
    const totalTicks = Math.floor(totalWidthInches * 8);

    for (let i = 0; i <= totalTicks; i++) {
        const position = i * tickIncrement;
        let height = 'h-1.5';
        let showNumber = false;

        if (i % 8 === 0) { // Whole inch
            height = 'h-3';
            showNumber = true;
        } else if (i % 4 === 0) { // Half inch
            height = 'h-2.5';
        } else if (i % 2 === 0) { // Quarter inch
            height = 'h-2';
        }

        ticks.push(
            <div key={i} className="absolute top-0" style={{ left: `${position}px` }}>
                <div className={`w-px bg-muted-foreground ${height}`} />
                {showNumber && (
                    <span className="absolute -bottom-4 -translate-x-1/2 text-[10px] text-muted-foreground">
                        {i / 8}
                    </span>
                )}
            </div>
        );
    }
    return ticks;
  };

  if (pageWidthPx === 0) {
    return <div className="h-5 bg-transparent border-b border-gray-300" />;
  }
  
  return (
    <div
      className="relative h-5 bg-transparent border-b border-gray-300 select-none overflow-hidden"
      style={{ width: `${pageWidthPx}px` }}
    >
      <div className="absolute h-full top-0 left-0 bg-muted/50" style={{ width: `${leftMarginPx}px` }} />
      <div className="absolute h-full top-0 right-0 bg-muted/50" style={{ width: `${rightMarginPx}px` }} />

      <div className="relative h-full" style={{ left: `${leftMarginPx}px`, width: `${rulerContentWidth}px` }}>
          {renderTicks()}
      </div>
    </div>
  );
}

export function VerticalRuler({ pageSize, margins, orientation }: RulerProps) {
    const [pageHeightPx, setPageHeightPx] = useState(0);
  
    useEffect(() => {
      const heightStr = orientation === 'portrait' ? pageSize.height : pageSize.width;
      setPageHeightPx(convertToPx(heightStr));
    }, [pageSize, orientation]);
  
    const topMarginPx = useMemo(() => convertToPx(margins.top), [margins.top]);
    const bottomMarginPx = useMemo(() => convertToPx(margins.bottom), [margins.bottom]);

    const rulerContentHeight = useMemo(() => pageHeightPx - topMarginPx - bottomMarginPx, [pageHeightPx, topMarginPx, bottomMarginPx]);
    const totalHeightInches = useMemo(() => rulerContentHeight / DPI, [rulerContentHeight]);
  
    const renderTicks = () => {
      const ticks = [];
      const tickIncrement = DPI / 8;
      const totalTicks = Math.floor(totalHeightInches * 8);

      for (let i = 0; i <= totalTicks; i++) {
        const position = i * tickIncrement;
        let width = 'w-1.5';
        let showNumber = false;
  
        if (i % 8 === 0) { // Whole inch
          width = 'w-3';
          showNumber = true;
        } else if (i % 4 === 0) { // Half inch
          width = 'w-2.5';
        } else if (i % 2 === 0) { // Quarter inch
          width = 'w-2';
        }
  
        ticks.push(
          <div key={i} className="absolute left-0" style={{ top: `${position}px` }}>
            <div className={`h-px bg-muted-foreground ${width}`} />
            {showNumber && (
              <span className="absolute -right-4 -translate-y-1/2 text-[10px] text-muted-foreground" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'translateY(-50%) rotate(180deg)' }}>
                {i / 8}
              </span>
            )}
          </div>
        );
      }
      return ticks;
    };
  
    if (pageHeightPx === 0) {
      return <div className="w-5 bg-transparent border-r border-gray-300" />;
    }
  
    return (
      <div
        className="relative w-5 bg-transparent border-r border-gray-300 select-none"
        style={{ height: `${pageHeightPx}px` }}
      >
        <div className="absolute w-full top-0 left-0 bg-muted/50" style={{ height: `${topMarginPx}px` }} />
        <div className="absolute w-full bottom-0 left-0 bg-muted/50" style={{ height: `${bottomMarginPx}px` }} />

        <div className="relative w-full" style={{ top: `${topMarginPx}px`, height: `${rulerContentHeight}px` }}>
            {renderTicks()}
        </div>
      </div>
    );
  }
