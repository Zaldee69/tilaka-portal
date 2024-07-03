'use client';

import React, { useState } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Page = () => {
  const t = useTranslations('Dashboard');
  const r = useTranslations('Settings.revokeCertificate');
  const s = useTranslations('Settings');

  const [reason, setReason] = useState<string>('');

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
              {r('title')}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-gray-1 my-5">{r('title')}</h1>

      <div className="max-w-3xl">
        <h4>{r('subtitle')}</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7 mt-5">
          <div className="col-span-2 flex flex-col md:flex-row md:gap-0 gap-5  justify-between">
            <div className="md:w-10/12">
              <Label>{s('serialNumber')}</Label>
              <Input
                className="w-full h-10 bg-[#EEEEEE]"
                defaultValue="98389u34834y21220394875y8y4"
                disabled
              />
            </div>
            <div>
              <Label>Status</Label>
              <Badge className="bg-[#3B9B1B] block w-fit py-1 mt-2 px-3">
                Aktif
              </Badge>
            </div>
          </div>
          <div>
            <Label>{r('revokeReason.title')}</Label>
            <Select onValueChange={(value) => setReason(value)}>
              <SelectTrigger className=" w-full h-10 rounded-md">
                <SelectValue placeholder={r('revokeReason.placeholder')} />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="resign">Resign</SelectItem>
                <SelectItem value="phk">{r('revokeReason.reason1')}</SelectItem>
                <SelectItem value="habis-kontrak">
                  {r('revokeReason.reason2')}
                </SelectItem>
                <SelectItem value="mutasi">
                  {r('revokeReason.reason3')}
                </SelectItem>
                <SelectItem value="pemindahan-departemen">
                  {r('revokeReason.reason4')}
                </SelectItem>
                <SelectItem value="pindah-divisi">
                  {r('revokeReason.reason5')}
                </SelectItem>
                <SelectItem value="internal-fraud">Internal Fraud</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex mt-10 md:justify-end justify-center">
          <Link
            href="https://dev-api.tilaka.id/personal-webview/kyc/revoke?revoke_id=rev90ec960c-e6b3-4643-bad5-1f136fc4d03d"
            target="_blank"
          >
            <Button
              disabled={reason.length < 1}
              className="font-semibold !px-10 w-fit"
            >
              {r('submit')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
