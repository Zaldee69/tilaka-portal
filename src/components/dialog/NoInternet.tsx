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
      <AlertDialogContent className="max-w-sm !gap-10">
        <AlertDialogHeader className="gap-3">
          <AlertDialogTitle className="flex justify-center items-center gap-3">
            <img
              src="/images/danger.jpg"
              alt="danger"
              className="w-[22px] h-[20px]"
              width={30}
              height={10}
            />{' '}
            {t('title')}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {t('subtitle')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="!justify-center">
          <AlertDialogAction className="px-10 w-fit">
            {t('submit')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NoInternetDialog;
