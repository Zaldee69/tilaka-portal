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
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DeleteIcon } from '../../../../../../public/icons/icons';
import { ArrowDownToLine } from 'lucide-react';
import { cn } from '@/lib/utils';

const certificates = [
  {
    serial: '43hh9jdjhsau3e3bee34348778828bb2',
    status: 'active',
    title: 'certificateDetails.active',
    valid_from: '01-01-2024 12:30',
    valid_to: '04-02-2024 12:30'
  },
  {
    serial: '43hh9jdjhsau3e3bee34348778828bb2',
    status: 'revoke',
    title: 'certificateDetails.revoke'
  },
  {
    serial: '43hh9jdjhsau3e3bee34348778828bb2',
    status: 'enroll',
    title: 'certificateDetails.enroll'
  },
  {
    serial: '43hh9jdjhsau3e3bee34348778828bb2',
    status: 'expired',
    title: 'certificateDetails.expired'
  },
  {
    serial: '43hh9jdjhsau3e3bee34348778828bb2',
    status: 'registered',
    title: 'certificateDetails.registered'
  },
  {
    serial: '43hh9jdjhsau3e3bee34348778828bb2',
    status: 'error',
    title: 'certificateDetails.error'
  }
];

const Page = () => {
  const t = useTranslations('Dashboard');
  const s = useTranslations('Settings');

  return (
    <div className="p-5 mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link className="font-medium" href="/dashboard/settings">
              {t('sidebar.settings')}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary font-semibold">
              {s('certificate')}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-gray-1 my-5">{s('certificate')}</h1>
      <Table className="hidden sm:block w-full">
        <TableHeader>
          <TableRow className="!border-none">
            <TableHead className="w-[350px] text-base">
              {s('serialNumber')}
            </TableHead>
            <TableHead className="w-[200px] text-base">
              {s('certificateDetails.validFrom')}
            </TableHead>
            <TableHead className="w-[200px] text-base">
              {s('certificateDetails.validTo')}
            </TableHead>
            <TableHead className="text-base">Status</TableHead>
            <TableHead className="text-left text-base">
              {s('certificateDetails.action')}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {certificates.map((cert) => (
            <TableRow key={cert.status} className="bg-[#FBFBFB]">
              <TableCell>{cert.serial}</TableCell>
              <TableCell>{cert.valid_from ? cert.valid_from : '-'}</TableCell>
              <TableCell>{cert.valid_to ? cert.valid_to : '-'}</TableCell>
              <TableCell>
                <Badge
                  className={cn('bg-[#BD0505]', {
                    'bg-[#3B9B1B]': cert.status === 'active',
                    'bg-[#FFB951]':
                      cert.status === 'registered' || cert.status === 'enroll'
                  })}
                >
                  {s(cert.title)}
                </Badge>
              </TableCell>
              <TableCell className="">
                {cert.status === 'active' ? (
                  <div className="flex gap-2">
                    <Button
                      className="border-destructive text-destructive font-semibold group hover:bg-destructive"
                      variant="outline"
                      size="sm"
                    >
                      <DeleteIcon
                        pathClassName="fill-destructive transition-colors group-hover:fill-white"
                        svgClassName="mr-1"
                      />
                      {s('revoke')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-semibold group"
                    >
                      <ArrowDownToLine
                        className="text-primary mr-2 group-hover:text-white transition-colors"
                        size={20}
                      />
                      {s('certificateDetails.download')}
                    </Button>
                  </div>
                ) : (
                  <p className="text-center">-</p>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="sm:hidden">
        {certificates.map((cert) => (
          <div
            key={cert.status}
            className="bg-[#FBFBFB] flex flex-col gap-5 p-4 border-b"
          >
            <div>
              {' '}
              <h5 className="font-semibold text-gray-1">{s('serialNumber')}</h5>
              <p>{cert.serial}</p>
            </div>
            <div>
              {' '}
              <h5 className="font-semibold text-gray-1">
                {s('certificateDetails.validFrom')}
              </h5>
              <p>{cert.valid_from ? cert.valid_from : '-'}</p>
            </div>
            <div>
              {' '}
              <h5 className="font-semibold text-gray-1">
                {s('certificateDetails.validTo')}
              </h5>
              <p>{cert.valid_to ? cert.valid_to : '-'}</p>
            </div>
            <div>
              {' '}
              <h5 className="font-semibold text-gray-1">Status</h5>
              <Badge
                className={cn('bg-[#BD0505]', {
                  'bg-[#3B9B1B]': cert.status === 'active',
                  'bg-[#FFB951]':
                    cert.status === 'registered' || cert.status === 'enroll'
                })}
              >
                {s(cert.title)}
              </Badge>
            </div>
            <div>
              <h5 className="font-semibold text-gray-1 mb-1">
                {s('certificateDetails.action')}
              </h5>
              {cert.status === 'active' ? (
                <div className="flex gap-2">
                  <Button
                    className="border-destructive text-destructive font-semibold group hover:bg-destructive w-6/12"
                    variant="outline"
                  >
                    <DeleteIcon
                      pathClassName="fill-destructive transition-colors group-hover:fill-white"
                      svgClassName="mr-1 flex-none"
                    />
                    {s('revoke')}
                  </Button>
                  <Button
                    variant="outline"
                    className="font-semibold group w-6/12"
                  >
                    <ArrowDownToLine
                      className="text-primary mr-2 group-hover:text-white transition-colors flex-none"
                      size={20}
                    />
                    Download
                  </Button>
                </div>
              ) : (
                '-'
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
