import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import PdfViewer from './PdfViewer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DownloadIcon } from '../../../../../../public/icons/icons';

const Page = () => {
  const t = useTranslations('Dashboard');
  const d = useTranslations('documentDetail');

  return (
    <div className="md:p-5 mx-auto mt-3">
      <Breadcrumb className="px-5 md:px-0 mt-5 md:mt-0">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link className="font-medium" href="/dashboard/documents">
              {t('sidebar.document')}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary font-semibold">
              {t('sidebar.documentDetails')}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <div className="flex justify-between items-center mt-3 px-5 md:px-0">
          <div className="flex flex-col md:flex-row md:items-center gap-x-10">
            <h1 className="text-gray-1">BAST Kasuari</h1>
            <Badge className="flex-none bg-[#FFB951] py-1 w-fit">
              On Progress
            </Badge>
          </div>
          <Button
            variant="ghost"
            className="text-primary border border-input px-3 md:px-5 font-semibold gap-3"
          >
            <DownloadIcon pathClassName="fill-primary" />
            <p className="hidden md:block">{d('download')}</p>
          </Button>
        </div>
        <PdfViewer file="https://pdfobject.com/pdf/sample.pdf" />
      </div>
    </div>
  );
};

export default Page;
