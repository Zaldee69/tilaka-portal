'use client';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import React, { useState } from 'react';
import {
  CancelScheduleIcon,
  DeleteIcon,
  DeleteSweep
} from '../../../../../../public/icons/icons';
import { Button, buttonVariants } from '@/components/ui/button';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

const RevokeCertDialog = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const t = useTranslations('Settings.dialog.revokeConfirmation');

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="border-destructive text-destructive font-semibold group hover:bg-destructive w-6/12 md:!h-9 md:px-3 md:rounded-md md:py-1"
          variant="outline"
        >
          <DeleteIcon
            pathClassName="fill-destructive transition-colors group-hover:fill-white"
            svgClassName="mr-1 flex-none"
          />
          {t('revoke')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="flex items-center">
          <div className="bg-red-600/10 w-fit p-3 rounded-2xl">
            <DeleteSweep />
          </div>
          <AlertDialogDescription className="text-center">
            <h4 className="mb-1 mt-4 text-black">{t('title')}</h4>
            <p className="my-5 text-gray-2 md:whitespace-pre-line">
              {t('subtitle')}
            </p>
          </AlertDialogDescription>
          <AlertDialogFooter className="gap-3 justify-center">
            <Button
              onClick={() => setIsOpen(false)}
              variant="secondary"
              className="bg-white modal-button-shadow px-14 font-semibold"
            >
              {t('cancel')}
            </Button>
            <Link
              href="/dashboard/settings/revoke-certificate"
              className={buttonVariants({
                variant: 'destructive',
                className: 'font-semibold px-14'
              })}
            >
              {t('revoke')}
            </Link>
          </AlertDialogFooter>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RevokeCertDialog;
