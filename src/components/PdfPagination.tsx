import React from 'react';
import { Button } from './ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PdfPaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  numPages: number;
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
}

const PdfPagination = ({
  currentPage,
  numPages,
  scale,
  setCurrentPage,
  setScale,
  className
}: PdfPaginationProps) => {
  return (
    <div
      className={cn(
        'sticky bottom-5 mt-5 flex justify-center left-0 right-0 z-10',
        className
      )}
    >
      <div className="custom-shadow bg-white rounded-2xl flex items-center gap-2 px-2 py-2">
        <Button
          onClick={() => setScale(scale - 0.2)}
          variant="ghost"
          className="p-0 h-5 w-5 hidden md:flex"
        >
          <ZoomOut className="h-5 w-5" />
        </Button>
        <p className="text-sm hidden md:block">{Math.round(scale * 100)}%</p>
        <Button
          onClick={() => setScale(scale + 0.2)}
          variant="ghost"
          className="p-0 h-5 w-5 hidden md:flex"
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(1)}
          variant="ghost"
          className="p-0 h-5 w-5"
        >
          <ChevronFirst className="h-5 w-5" />
        </Button>
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          variant="ghost"
          className="p-0 h-5 w-5"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Select
          value={currentPage.toString()}
          onValueChange={(value) => setCurrentPage(Number(value))}
        >
          <SelectTrigger className="h-8 border-none !w-[30px] font-semibold p-0">
            <SelectValue placeholder="1" />
          </SelectTrigger>
          <SelectContent className="!w-[50px] ">
            {Array.from(Array(numPages).keys()).map((_, idx) => (
              <SelectItem key={idx + 1} value={(idx + 1).toString()}>
                {idx + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm hidden md:block">of {numPages} Page(s)</p>

        <Button
          disabled={currentPage === numPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          variant="ghost"
          className="p-0 h-5 w-5"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
        <Button
          disabled={currentPage === numPages}
          onClick={() => setCurrentPage(numPages)}
          variant="ghost"
          className="p-0 h-5 w-5"
        >
          <ChevronLast className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default PdfPagination;
