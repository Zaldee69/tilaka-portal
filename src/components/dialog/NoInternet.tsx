/* eslint-disable @next/next/no-img-element */
'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import useNavigatorOnline from '@/hooks/useNavigatorOnline';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const NoInternetDialog = () => {
  const { isOffline } = useNavigatorOnline();

  const [show, setShow] = useState(false);

  const t = useTranslations('offlineDialog');

  useEffect(() => {
    setShow(isOffline);
  }, [isOffline]);

  return (
    <AlertDialog open={show} onOpenChange={setShow}>
      <AlertDialogContent className="max-w-sm !gap-7">
        <AlertDialogHeader className="gap-3">
          <AlertDialogTitle className="flex justify-center items-center gap-3">
            <img
              src="data:image/jpg;base64,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"
              alt="danger"
              className="w-[22px] h-[20px]"
              width={30}
              height={10}
            />{' '}
            {t('title')}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center whitespace-pre-line">
            {t('subtitle')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="!justify-center items-center">
          <AlertDialogAction className="px-10 w-fit">
            {t('submit')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NoInternetDialog;
