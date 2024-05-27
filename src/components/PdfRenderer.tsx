'use client';
import React from 'react';

import { Document, Page, pdfjs } from 'react-pdf';
import { useResizeDetector } from 'react-resize-detector';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Loader2 } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfRendererProps {
  url?: string;
  currentPage?: number;
  numPages: number;
  scale?: number;
  multiple?: boolean;
  setNumPages: React.Dispatch<React.SetStateAction<number>>;
}

const PdfRenderer = ({
  url,
  currentPage = 1,
  scale = 1,
  setNumPages
}: PdfRendererProps) => {
  const { width, ref } = useResizeDetector();

  return (
    <div className="w-full">
      <div className="flex-1 max-h-screen">
        <div ref={ref}>
          <Document
            file={url}
            onLoadSuccess={({ numPages }) => {
              setTimeout(() => {
                setNumPages(numPages);
              }, 200);
            }}
            loading={
              <div className="flex justify-center items-center h-full">
                <Loader2 className="my-24 h-6 w-6 animate-spin text-primary" />
              </div>
            }
          >
            <Page
              loading={
                <div className="flex justify-center z-10">
                  <Loader2 className="my-24 h-6 w-6 animate-spin text-primary z-[9999]" />
                </div>
              }
              pageNumber={currentPage}
              scale={scale}
              width={width ? width : 1}
            />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfRenderer;
