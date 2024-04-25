'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog';

import { Button } from '../../ui/button';
import {
  BrushIcon,
  CheckCircleIcon,
  DocumentIcon,
  PlaceTTEIcon,
  TilakaIcon
} from '../../../../public/icons/icons';
import { useTranslations } from 'next-intl';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from '../../ui/breadcrumb';
import { MoveRight } from 'lucide-react';

import { Wizard } from 'react-use-wizard';

import Step1 from './wizard/Step1';
import Step2 from './wizard/Step2';
import Step3 from './wizard/Step3';
import Step4 from './wizard/Step4';

const SigningDialog = () => {
  const t = useTranslations('Dashboard');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full w-full flex justify-center gap-3 font-semibold sign-button-shadow">
          <TilakaIcon svgClassName="flex-none" />{' '}
          <h5>{t('sidebar.signPdfButton')}</h5>
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseIcon={false}
        className="h-screen w-screen max-w-full !rounded-none p-0"
      >
        <div className="flex flex-col gap-10 items-center w-full overflow-y-scroll no-scrollbar py-24">
          <Wizard>
            <Step1 />
            <Step2 />
            <Step3 />
            <Step4 />
          </Wizard>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SigningDialog;
