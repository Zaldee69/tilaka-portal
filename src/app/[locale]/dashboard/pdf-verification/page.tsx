import { useTranslations } from 'next-intl';
import React from 'react';
import UploadDropZone from './UploadDropZone';

const Page = () => {
  const t = useTranslations('Dashboard');
  return (
    <div>
      <h1 className="text-gray-1 pt-5 px-5">{t('sidebar.verifyPdf')}</h1>

      <div className="lg:px-5">
        <UploadDropZone />
      </div>
    </div>
  );
};

export default Page;
