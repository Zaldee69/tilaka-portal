'use client';
import Collapsible from '@/components/Collapsible';
import PdfPagination from '@/components/PdfPagination';
import PdfRenderer from '@/components/PdfRenderer';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

const PdfViewer = ({ file }: { file: string }) => {
  const [numPages, setNumPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);

  const t = useTranslations('PdfVerification');

  const Header = () => (
    <div className="flex items-center gap-3">
      <div className="bg-[#E1EAF2] rounded-full flex items-center justify-center w-8 h-8">
        <p className="font-bold">W</p>
      </div>
      <p className="font-semibold text-[#1B4782]">Wahab Hidayat</p>
    </div>
  );

  const TimeStampHeader = () => (
    <div className="flex items-center gap-3">
      <p className="font-semibold text-[#1B4782]">Timestamp</p>
    </div>
  );

  const SignerDetails = () => (
    <div className="bg-[#F9F9F9] px-3 pb-3 rounded-b-md">
      <div className="bg-white p-2 rounded-sm">
        <p className="text-gray-2 text-sm">{t('sigFormat')}</p>
        <p className="font-medium my-2 text-sm">PAdES_BASELINE_T</p>
        <p className="text-gray-2 text-xs">{t('validationDetails')}</p>
        <div className="bg-[#FFFAE7] p-2 rounded-md text-sm mt-2 mb-3">
          Rantai sertifikat untuk tandatangan tidak terpercaya, sertifikat tidak
          diterbitkan oleh CA Berinduk (Kominfo) atau tidak masuk ke dalam
          daftar terpercaya. Rantai sertifikat untuk timestamp tidak terpercaya,
          sertifikat tidak diterbitkan oleh CA Berinduk (Kominfo) atau tidak
          masuk ke dalam daftar terpercaya. Algoritma SHA1 tidak lagi disarankan
          untuk digunakan untuk time-stamp signature!
        </div>
        <p className="text-gray-2 text-xs">{t('certifChain')}</p>
        <p className="font-medium mt-1 text-sm">WAHAB HIDAYAT (IDW6409)</p>
        <div className="flex items-center justify-between my-3">
          <div>
            <p className="text-gray-2 text-xs">{t('claimTime')}</p>
            <p className="font-medium mt-1 text-sm">
              2023-05-08 09:49:27 (UTC)
            </p>
          </div>
          <div>
            <p className="text-gray-2 text-xs">{t('signingTime')}</p>
            <p className="font-medium mt-1 text-sm">
              2023-06-07 10:11:48 (UTC)
            </p>
          </div>
        </div>
        <p className="text-gray-2 text-xs">{t('signaturePosition')}</p>
        <p className="font-medium mt-1 text-sm">1 {t('of')} 1</p>
        <p className="text-gray-2 text-xs mt-3">Timestamp (1)</p>
        <Collapsible
          className="bg-[#F9F9F9] rounded-md !text-sm mt-3"
          header={<TimeStampHeader />}
          autoOpen
        >
          <TimestampDetails />
        </Collapsible>
      </div>
    </div>
  );

  const TimestampDetails = () => (
    <div className="bg-[#F9F9F9] px-3">
      <div className="bg-white p-2 rounded-sm">
        <p className="text-gray-2 text-sm">{t('sigFormat')}</p>
        <p className="font-medium my-2 text-sm">PAdES_BASELINE_T</p>
        <p className="text-gray-2 text-xs">{t('validationDetails')}</p>
        <div className="bg-[#FFFAE7] p-2 rounded-md text-sm mt-2 mb-3">
          Rantai sertifikat untuk tandatangan tidak terpercaya, sertifikat tidak
          diterbitkan oleh CA Berinduk (Kominfo) atau tidak masuk ke dalam
          daftar terpercaya. Rantai sertifikat untuk timestamp tidak terpercaya,
          sertifikat tidak diterbitkan oleh CA Berinduk (Kominfo) atau tidak
          masuk ke dalam daftar terpercaya. Algoritma SHA1 tidak lagi disarankan
          untuk digunakan untuk time-stamp signature!
        </div>
        <p className="text-gray-2 text-xs">{t('certifChain')}</p>
        <p className="font-medium mt-1 text-sm">WAHAB HIDAYAT (IDW6409)</p>
        <div className="flex items-center justify-between my-3">
          <div>
            <p className="text-gray-2 text-xs">{t('claimTime')}</p>
            <p className="font-medium mt-1 text-sm">
              2023-05-08 09:49:27 (UTC)
            </p>
          </div>
          <div>
            <p className="text-gray-2 text-xs">{t('signingTime')}</p>
            <p className="font-medium mt-1 text-sm">
              2023-06-07 10:11:48 (UTC)
            </p>
          </div>
        </div>
        <p className="text-gray-2 text-xs">{t('signaturePosition')}</p>
        <p className="font-medium mt-1 text-sm">1 {t('of')} 1</p>
        <p className="text-gray-2 text-xs mt-3">Timestamp (1)</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col flex-1 justify-between mt-5 bg-gray-6 h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow flex flex-col-reverse lg:flex-row">
        <div className="flex-1 xl:flex">
          <div className="px-4 pt-6 sm:px-6 border border-gray-6 bg-gray-6 lg:pl-8 xl:flex-1 xl:pl-6 max-h-[calc(100vh-5rem)] overflow-y-scroll no-scrollbar relative max-w-3xl">
            <PdfRenderer
              currentPage={currentPage}
              numPages={numPages}
              scale={scale}
              setNumPages={setNumPages}
              url={file}
            />
            <PdfPagination
              currentPage={currentPage}
              numPages={numPages}
              scale={scale}
              setCurrentPage={setCurrentPage}
              setScale={setScale}
            />
          </div>
        </div>
        <div className="shrink-0 lg:border-2 md:px-5 lg:border-gray-6 w-full lg:w-96 lg:flex-[0.65] pb-4 lg:pb-0 lg:p-4 max-h-screen bg-white">
          <h4 className="pb-4">{t('docInformation')}</h4>
          <div className="max-h-[calc(100vh-9rem)] overflow-y-scroll no-scrollbar">
            <h6 className="text-gray-2">1 {t('signer')}</h6>
            <Collapsible
              className="bg-[#F9F9F9] rounded-md !text-sm mt-3"
              header={<Header />}
              autoOpen
            >
              <SignerDetails />
            </Collapsible>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
