import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { PermIdentityIcon } from '../../../../../../public/icons/icons';

const Page = () => {
  const t = useTranslations('Dashboard');
  const a = useTranslations('auditTrail');

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
              Audit Trail
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-10 px-5 md:px-0">
        <h5 className="font-normal">
          {a('title')}: <span className="font-bold">PKS Tilaka x PT.ABC</span>
        </h5>
        <div className=" hidden md:block">
          <Table className="mt-5">
            <TableHeader>
              <TableRow className="text-gray-1">
                <TableHead>{a('name')}</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>{a('action')}</TableHead>
                <TableHead>{a('time')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex gap-3">
                    <p className="font-semibold text-sm">Wahab</p>
                    <span
                      className={cn(
                        'text-[10px] bg-[#BFDFFF] text-primary uppercase text-center px-1 rounded'
                      )}
                    >
                      {a('owner')}
                    </span>
                  </div>
                </TableCell>
                <TableCell>wahab@gmail.com</TableCell>
                <TableCell>{a('sign')}</TableCell>
                <TableCell>08 Mei 2023 16:46:31</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex gap-3">
                    <p className="font-semibold text-sm">Wahono</p>
                    <span
                      className={cn(
                        'text-[10px] bg-[#E0E0E0] text-gray-2 uppercase text-center px-1 rounded'
                      )}
                    >
                      {a('signer')}
                    </span>
                  </div>
                </TableCell>
                <TableCell>wahono@gmail.com</TableCell>
                <TableCell>{a('open')}</TableCell>
                <TableCell>08 Mei 2023 16:46:31</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="border rounded-xl py-2 px-3 border-gray-6 flex md:hidden justify-between mt-3 ">
          <div className="flex flex-col gap-3">
            <div className="flex gap-1">
              <p className="font-semibold text-sm">Wahab</p>
              <span
                className={cn(
                  'text-[10px] bg-[#BFDFFF] flex items-center text-primary uppercase text-center px-1 rounded'
                )}
              >
                {a('owner')}
              </span>
            </div>
            <div className="flex items-center">
              <PermIdentityIcon svgClassName="w-5 h-5" />
              <p className="text-xs">wahab@gmail.com</p>
            </div>
            <p className="text-xs">{a('sign')}</p>
            <p className="text-xs">08 Mei 2023 16:46:31</p>
          </div>
        </div>
        <div className="border rounded-xl py-2 px-3 border-gray-6 flex md:hidden justify-between mt-3 ">
          <div className="flex flex-col gap-3">
            <div className="flex gap-1">
              <p className="font-semibold text-sm">Wahono</p>
              <span
                className={cn(
                  'text-[10px] bg-[#E0E0E0] text-gray-2 flex items-center uppercase text-center px-1 rounded'
                )}
              >
                {a('signer')}
              </span>
            </div>
            <div className="flex items-center">
              <PermIdentityIcon svgClassName="w-5 h-5" />
              <p className="text-xs">wahono@gmail.com</p>
            </div>
            <p className="text-xs">{a('open')}</p>
            <p className="text-xs">08 Mei 2023 16:46:31</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
