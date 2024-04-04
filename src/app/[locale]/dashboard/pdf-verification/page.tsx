import { useTranslations } from 'next-intl';
import React from 'react';
import UploadDropZone from './UploadDropZone';

const Page = () => {
  const t = useTranslations('Dashboard');
  return (
    <div className="p-5 mx-auto">
      <h1 className="text-gray-1">{t('sidebar.verifyPdf')}</h1>

      <div className="bg-[#F6F6F6] w-full mt-7 rounded-md h-80">
        <UploadDropZone />
      </div>
    </div>
  );
};

export default Page;
