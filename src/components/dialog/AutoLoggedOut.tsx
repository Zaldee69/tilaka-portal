'use client';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const AutoLoggedOutDialog = () => {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState<boolean>(
    searchParams.get('openAutoLoggedOutDialog') === 'true'
  );

  const t = useTranslations('autoLoggedOutDialog');

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            {t('title')}
          </AlertDialogTitle>
          <div className="flex justify-center">
            <Image
              src="/images/autoLogout.svg"
              height={100}
              width={100}
              alt="Auto Logout Image"
            />
          </div>

          <AlertDialogDescription className="text-center whitespace-pre-line hidden md:block">
            {t('subtitle')}
          </AlertDialogDescription>
          <AlertDialogDescription className="text-center whitespace-pre-line md:hidden">
            {t('subtitle1')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="!items-center !justify-center my-3">
          <AlertDialogCancel className="bg-primary text-white !px-10">
            {t('submit')}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AutoLoggedOutDialog;
