
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

export function Ruler({ pageSize, margins, orientation }: RulerProps) {
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

    for (let i = 0; i <= totalWidthInches * 8; i++) {
        const position = i * tickIncrement;
        let height = 'h-1.5';
        let showNumber = false;

        if (i % 8 === 0) { // Whole inch
            height = 'h-4';
            showNumber = true;
        } else if (i % 4 === 0) { // Half inch
            height = 'h-3';
        } else if (i % 2 === 0) { // Quarter inch
            height = 'h-2';
        }

        ticks.push(
            <div key={i} className="absolute" style={{ left: `${position}px` }}>
                <div className={`w-px bg-gray-500 ${height}`} />
                {showNumber && i / 8 > 0 && (
                    <span className="absolute -bottom-4 -translate-x-1/2 text-xs text-gray-600">
                        {i / 8}
                    </span>
                )}
            </div>
        );
    }
    return ticks;
  };

  if (pageWidthPx === 0) {
    return null; // Don't render until width is calculated
  }
  
  const rulerContentWidth = pageWidthPx - leftMarginPx - rightMarginPx;

  return (
    <div
      className="relative h-8 bg-gray-200 border-b border-gray-400 select-none overflow-hidden"
      style={{ width: `${pageWidthPx}px` }}
    >
      {/* Left margin area */}
      <div
        className="absolute top-0 left-0 h-full bg-gray-300"
        style={{ width: `${leftMarginPx}px` }}
      />
      
      {/* Right margin area */}
      <div
        className="absolute top-0 right-0 h-full bg-gray-300"
        style={{ width: `${rightMarginPx}px` }}
      />

      {/* Ticks and numbers */}
      <div className="relative h-full" style={{ width: `${pageWidthPx}px` }}>
          <div className="absolute top-0 h-full" style={{ left: `${leftMarginPx}px`, width: `${rulerContentWidth}px` }}>
            {renderTicks()}
          </div>
      </div>
    </div>
  );
}
