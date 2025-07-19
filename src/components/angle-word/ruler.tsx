
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
  const totalWidthInches = useMemo(() => pageWidthPx / DPI, [pageWidthPx]);

  const renderTicks = () => {
    const ticks = [];
    const tickIncrement = DPI / 8; // Ticks every 1/8th of an inch
    const totalTicks = Math.floor(totalWidthInches * 8);

    for (let i = 0; i <= totalTicks; i++) {
        const position = i * tickIncrement;
        let height = 'h-1';
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
                <div className={`w-px bg-gray-500 ${height}`} />
                {showNumber && i / 8 > 0 && (
                    <span className="absolute -bottom-3 -translate-x-1/2 text-[10px] text-gray-600">
                        {i / 8}
                    </span>
                )}
            </div>
        );
    }
    return ticks;
  };

  if (pageWidthPx === 0) {
    return <div className="h-6 bg-gray-200 border-b border-gray-400" />;
  }
  
  const rulerContentWidth = pageWidthPx - leftMarginPx - rightMarginPx;

  return (
    <div
      className="relative h-6 bg-gray-200 border-b border-gray-400 select-none overflow-hidden"
      style={{ width: `${pageWidthPx}px` }}
    >
      <div className="absolute h-full top-0 left-0 bg-gray-300" style={{ width: `${leftMarginPx}px` }} />
      <div className="absolute h-full top-0 right-0 bg-gray-300" style={{ width: `${rightMarginPx}px` }} />

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
    const totalHeightInches = useMemo(() => pageHeightPx / DPI, [pageHeightPx]);
  
    const renderTicks = () => {
      const ticks = [];
      const tickIncrement = DPI / 8;
      const totalTicks = Math.floor(totalHeightInches * 8);

      for (let i = 0; i <= totalTicks; i++) {
        const position = i * tickIncrement;
        let width = 'w-1';
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
            <div className={`h-px bg-gray-500 ${width}`} />
            {showNumber && i / 8 > 0 && (
              <span className="absolute -right-3 -translate-y-1/2 text-[10px] text-gray-600" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                {i / 8}
              </span>
            )}
          </div>
        );
      }
      return ticks;
    };
  
    if (pageHeightPx === 0) {
      return <div className="w-6 bg-gray-200 border-r border-gray-400" />;
    }

    const rulerContentHeight = pageHeightPx - topMarginPx - bottomMarginPx;
  
    return (
      <div
        className="relative w-6 bg-gray-200 border-r border-gray-400 select-none"
        style={{ height: `${pageHeightPx}px` }}
      >
        <div className="absolute w-full top-0 left-0 bg-gray-300" style={{ height: `${topMarginPx}px` }} />
        <div className="absolute w-full bottom-0 left-0 bg-gray-300" style={{ height: `${bottomMarginPx}px` }} />

        <div className="relative w-full" style={{ top: `${topMarginPx}px`, height: `${rulerContentHeight}px` }}>
            {renderTicks()}
        </div>
      </div>
    );
  }
