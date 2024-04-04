'use client';
import React, { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  CameraFrontIcon,
  MailOutlineIcon,
  SecurityIcon
} from '../../../../../../public/icons/icons';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import FRDialog from '@/components/FRDialog';

const ChangeAutheticationModeDialog = () => {
  const t = useTranslations('Dashboard');

  const [openFrDialog, setOpenFrDialog] = useState<boolean>(false);
  const [openOtpConfirmationDialog, setOpenOtpConfirmationDialog] =
    useState<boolean>(false);

  const [authenticationMode, setAuthenticationMode] = useState<'otp' | 'fr'>(
    'otp'
  );

  const changeAuthMode = (type: 'fr' | 'otp') => {
    setAuthenticationMode(type);
  };

  const onSaveHandler = () => {
    if (authenticationMode === 'otp') {
      setOpenFrDialog(true);
    } else {
      setOpenOtpConfirmationDialog(true);
    }
  };

  return (
    <AlertDialog>
      <FRDialog
        open={openFrDialog}
        setOpen={setOpenFrDialog}
        callbackCaptureProcessor={() => console.log()}
        title="Konfirmasi Penggantian MFA"
        subtitle="Arahkan wajah Anda ke kamera"
      />

      <AlertDialog
        open={openOtpConfirmationDialog}
        onOpenChange={setOpenOtpConfirmationDialog}
      >
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Penggantian MFA</AlertDialogTitle>
            <AlertDialogDescription>
              Apa Anda yakin mengubah metode otentikasi menjadi Face Recognition
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialogTrigger asChild>
        <Button
          size="lg"
          className="mt-4 w-full justify-start border-[#E0E0E0] hover:text-black bg-white font-semibold gap-2 border px-4 lg:hover:scale-105 transition-transform"
          variant="ghost"
        >
          <SecurityIcon fill="#000" />
          {t('authMethod')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Metode Otentikasi</AlertDialogTitle>
          <AlertDialogDescription className="text-black mb-3">
            Pilih metode otentikasi anda
          </AlertDialogDescription>
          <div>
            <Button
              onClick={() => changeAuthMode('otp')}
              variant="outline"
              className={cn(
                'rounded-[10px] group px-2 py-8 w-full hover:bg-white transition-colors gap-3 justify-start mt-3 bg-[#F9F9F9] border-transparent shadow-none border-2',
                {
                  'border-primary bg-white': authenticationMode === 'otp'
                }
              )}
            >
              <div className="bg-[#0D5FB31A]/10 p-2 rounded-full">
                <MailOutlineIcon
                  pathClassName={cn(
                    'group-hover:fill-primary fill-[#494949] transition-colors',
                    {
                      'fill-primary': authenticationMode === 'otp'
                    }
                  )}
                />
              </div>
              <div className=" text-start">
                <p
                  className={cn(
                    'font-semibold text-base text-gray-2 group-hover:text-[#1B4782] transition-colors',
                    {
                      'text-[#1B4782]': authenticationMode === 'otp'
                    }
                  )}
                >
                  Kirim OTP melalui email
                </p>
                <p className="text-sm text-gray-3 font-medium">
                  isuwinxxx@gmail.com
                </p>
              </div>
            </Button>
            <Button
              onClick={() => changeAuthMode('fr')}
              variant="outline"
              className={cn(
                'rounded-[10px] group px-2 py-8 w-full hover:bg-white transition-colors gap-3 justify-start mt-3 bg-[#F9F9F9] border-transparent shadow-none border-2',
                {
                  'border-primary bg-white': authenticationMode === 'fr'
                }
              )}
            >
              <div className="bg-[#0D5FB31A]/10 p-2 rounded-full">
                <CameraFrontIcon
                  pathClassName={cn(
                    'group-hover:fill-primary fill-[#494949] transition-colors',
                    {
                      'fill-primary': authenticationMode === 'fr'
                    }
                  )}
                />
              </div>
              <div className=" text-start">
                <p
                  className={cn(
                    'font-semibold text-base text-gray-2 group-hover:text-[#1B4782] transition-colors',
                    {
                      'text-[#1B4782]': authenticationMode === 'fr'
                    }
                  )}
                >
                  Verifikasi via FR
                </p>
                <p className="text-sm text-gray-3 font-medium">
                  Bitometric Authentication
                </p>
              </div>
            </Button>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="!justify-between">
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction className="!m-0" onClick={onSaveHandler}>
            Simpan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChangeAutheticationModeDialog;
