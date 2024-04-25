'use client';
import React, { useState } from 'react';

import { Document, Page, pdfjs } from 'react-pdf';
import { useResizeDetector } from 'react-resize-detector';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Loader2 } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfRendererProps {
  url?: string;
}

const PdfRenderer = ({ url }: PdfRendererProps) => {
  const [numPages, setNumPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>();
  const [scale, setScale] = useState<number>(1);

  const { width, ref } = useResizeDetector();

  return (
    <div className="w-full">
      <div className="flex-1 max-h-screen">
        <div ref={ref}>
          <Document
            file={url ? url : 'https://pdfobject.com/pdf/sample.pdf'}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={
              <div className="flex justify-center items-center h-full">
                <Loader2 className="my-24 h-6 w-6 animate-spin text-primary" />
              </div>
            }
          >
            <Page
              loading={
                <div className="flex justify-center ">
                  <Loader2 className="my-24 h-6 w-6 animate-spin text-primary" />
                </div>
              }
              pageNumber={numPages}
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
