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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DeleteIcon } from '../../../../../../public/icons/icons';
import { ArrowDownToLine } from 'lucide-react';

const Page = () => {
  const t = useTranslations('Dashboard');
  return (
    <div className="p-5 mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link className="font-medium" href="/dashboard/settings">
              Settings
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary font-semibold">
              Certificate
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-gray-1 my-5">Certificate</h1>
      <Table className="hidden sm:block">
        <TableHeader>
          <TableRow className="!border-none">
            <TableHead className="w-[700px]">No Serial</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-left">Revoke</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-[#FBFBFB]">
            <TableCell>43hh9jdjhsau3e3bee34348778828bb2</TableCell>
            <TableCell>
              <Badge className="bg-[#3B9B1B]">Active</Badge>
            </TableCell>
            <TableCell className="">
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
                  Cabut
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
                  Download
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="sm:hidden">
        <div className="bg-[#FBFBFB] flex flex-col gap-5 p-4 border-b">
          <p>43hh9jdjhsau3e3bee34348778828bb2</p>
          <Badge className="bg-[#3B9B1B] flex-none w-fit">Active</Badge>
          <div className="flex gap-2">
            <Button
              className="border-destructive text-destructive font-semibold group hover:bg-destructive w-6/12"
              variant="outline"
            >
              <DeleteIcon
                pathClassName="fill-destructive transition-colors group-hover:fill-white"
                svgClassName="mr-1 flex-none"
              />
              Cabut
            </Button>
            <Button variant="outline" className="font-semibold group w-6/12">
              <ArrowDownToLine
                className="text-primary mr-2 group-hover:text-white transition-colors flex-none"
                size={20}
              />
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
