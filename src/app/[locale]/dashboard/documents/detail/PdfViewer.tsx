'use client';
import PdfPagination from '@/components/PdfPagination';
import PdfRenderer from '@/components/PdfRenderer';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

const PdfViewer = ({ file }: { file: string }) => {
  const [numPages, setNumPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);

  const t = useTranslations('PdfVerification');
  const d = useTranslations('documentDetail');

  return (
    <div className="flex flex-col flex-1 justify-between mt-5 h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow flex flex-col lg:flex-row">
        <div className="flex-1 xl:flex">
          <div className="relative w-full">
            <div className="px-4 py-6 sm:px-6 bg-gray-6 lg:pl-8 xl:flex-1 xl:pl-6 max-h-[calc(100vh-5rem)] overflow-y-scroll max-w-2xl">
              <PdfRenderer
                currentPage={currentPage}
                numPages={numPages}
                scale={scale}
                setNumPages={setNumPages}
                url={file}
              />
            </div>
            <PdfPagination
              className="max-[768px]:bottom-10 max-[768px]:absolute bottom-20"
              currentPage={currentPage}
              numPages={numPages}
              scale={scale}
              setCurrentPage={setCurrentPage}
              setScale={setScale}
            />
          </div>
        </div>
        <div className="shrink-0 p-5 lg:border-gray-6 w-full lg:w-96 lg:flex-[0.65] pb-4 lg:pb-0 lg:p-4 lg:pr-0 max-h-screen bg-white">
          <h4 className="pb-4">{t('docInformation')}</h4>
          <div className="md:max-h-[calc(100vh-9rem)] md:overflow-y-scroll no-scrollbar">
            <div className="border-b pb-3">
              <h6 className="font-semibold text-gray-2 text-sm">Detail</h6>
              <div className="flex flex-col md:flex-row md:items-center justify-between mt-3 gap-y-3">
                <div className="flex gap-3">
                  <div>
                    <p className="text-xs">{d('document')}</p>
                    <h6 className="font-medium text-sm mt-2">BAST Kasuari</h6>
                  </div>
                  <div className="md:hidden">
                    <p className="text-xs">{d('uploadDate')}</p>
                    <h6 className="font-medium text-sm mt-2">
                      08 Mei 20243 16:17:23
                    </h6>
                  </div>
                </div>
                <div className="hidden md:block">
                  <p className="text-xs">{d('uploadDate')}</p>
                  <h6 className="font-medium text-sm mt-2">
                    08 Mei 20243 16:17:23
                  </h6>
                </div>
                <div>
                  <p className="text-xs">{d('numberOfPage')}</p>
                  <h6 className="font-medium text-sm mt-2">5</h6>
                </div>
              </div>
            </div>
            <div className="border-b pb-3 mt-3">
              <h6 className="font-semibold text-gray-2 text-sm">
                {d('signer')}
              </h6>
              <div className="md:px-2 mt-3">
                <div className="grid-cols-7 hidden md:grid">
                  <p className="text-xs col-span-3 text-gray-3">{d('name')}</p>
                  <p className="text-xs col-span-2 text-gray-3">{d('pages')}</p>
                  <p className="text-xs col-span-2 text-gray-3">Status</p>
                </div>
                {[
                  {
                    name: 'Wahab',
                    role: 'owner',
                    pages: '1,2,4',
                    status: 'signed'
                  },
                  {
                    name: 'Wahono',
                    role: 'signer',
                    pages: '1,2,4',
                    status: 'signed'
                  }
                ].map((signer, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-7 bg-[#F9F9F9] space-y-2 p-2 rounded-lg mt-2 px-"
                  >
                    <div className="col-span-3">
                      <div className="flex items-center gap-3 col-span-3">
                        <div className="bg-[#E1EAF2] rounded-full flex items-center justify-center w-8 h-8">
                          <p className="font-bold uppercase">W</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="font-semibold text-sm text-[#1B4782]">
                            {signer.name}
                          </p>
                          <span className="text-[10px] bg-[#BFDFFF] text-primary uppercase text-center px-1 rounded">
                            {d(signer.role)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 md:col-span-2 text-xs text-center md:text-start">
                      {signer.pages}
                    </div>
                    <div className="col-span-3 md:col-span-2 flex justify-end">
                      <Badge className="md:text-xs bg-accent">
                        {d(signer.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-b pb-3 mt-3">
              <h6 className="font-semibold text-gray-2 text-sm">
                {d('history')}
              </h6>
              <div className="px-2 mt-3">
                <div className="grid-cols-7 hidden md:grid">
                  <p className="text-xs col-span-3 text-gray-3">{d('name')}</p>
                  <p className="text-xs col-span-2 text-gray-3">
                    {d('action')}
                  </p>
                  <p className="text-xs col-span-2 text-gray-3">{d('time')}</p>
                </div>
                {[
                  {
                    name: 'Wahab',
                    role: 'owner',
                    action: 'sign',
                    time: '08 Mei 2023 16:47:31'
                  },
                  {
                    name: 'Wahab',
                    role: 'owner',
                    action: 'open',
                    time: '08 Mei 2023 16:47:31'
                  },
                  {
                    name: 'Wahono',
                    role: 'signer',
                    action: 'sign',
                    time: '08 Mei 2023 16:47:31'
                  },
                  {
                    name: 'Wahono',
                    role: 'signer',
                    action: 'open',
                    time: '08 Mei 2023 16:47:31'
                  }
                ].map((history, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-7 bg-[#F9F9F9] space-y-2 p-2 rounded-lg mt-2 space-x-10 max-[768px]:gap-5"
                  >
                    <div className="col-span-3">
                      <div className="flex items-center gap-3 col-span-3">
                        <div className="bg-[#E1EAF2] rounded-full flex items-center justify-center w-8 h-8">
                          <p className="font-bold uppercase">W</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="font-semibold text-sm text-[#1B4782]">
                            {history.name}
                          </p>
                          <span
                            className={cn(
                              'text-[10px] bg-[#BFDFFF] text-primary uppercase text-center px-1 rounded',
                              {
                                'bg-[#E0E0E0] text-gray-2':
                                  history.role === 'signer'
                              }
                            )}
                          >
                            {d(history.role)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-4 md:col-span-2 !m-0">
                      <div className="text-xs">{d(history.action)}</div>
                      <div className="text-xs md:hidden">{history.time}</div>
                    </div>
                    <div className="md:col-span-2 hidden md:block text-xs !m-0">
                      {history.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
