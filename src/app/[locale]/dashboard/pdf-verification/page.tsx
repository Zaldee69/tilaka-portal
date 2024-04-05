import { useTranslations } from 'next-intl';
import React from 'react';
import UploadDropZone from './UploadDropZone';

const Page = () => {
  const t = useTranslations('Dashboard');
  return (
    <div className="p-5 mx-auto">
      <h1 className="text-gray-1">{t('sidebar.verifyPdf')}</h1>

      <UploadDropZone />
    </div>
  );
};

export default Page;
