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
} from '../../../public/icons/icons';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import FRDialog from '@/components/FRDialog';

const ChangeAutheticationModeDialog = ({
  triggerClassName,
  iconFill = '#000'
}: {
  triggerClassName?: string;
  iconFill?: string;
}) => {
  const t = useTranslations('Dashboard');
  const s = useTranslations('Settings');

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
        title={s('dialog.fr.title')}
        subtitle={s('dialog.fr.subtitle')}
      />

      <AlertDialog
        open={openOtpConfirmationDialog}
        onOpenChange={setOpenOtpConfirmationDialog}
      >
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {s('dialog.mfaChangeConfirmation.title')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {s('dialog.mfaChangeConfirmation.subtitle')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {s('dialog.mfaChangeConfirmation.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction>
              {s('dialog.mfaChangeConfirmation.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialogTrigger asChild>
        <Button
          size="lg"
          className={cn(
            'mt-4 w-full justify-start border-[#E0E0E0] hover:text-black bg-white font-semibold gap-2 border px-4 lg:hover:scale-105 transition-transform',
            triggerClassName
          )}
          variant="ghost"
        >
          <SecurityIcon fill={iconFill} />
          {t('authMethod')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{s('dialog.authMethod.title')}</AlertDialogTitle>
          <AlertDialogDescription className="text-black mb-3">
            {s('dialog.authMethod.subtitle')}
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
                  {s('dialog.authMethod.method.otp')}
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
                  {s('dialog.authMethod.method.fr')}
                </p>
                <p className="text-sm text-gray-3 font-medium">
                  Biometric Authentication
                </p>
              </div>
            </Button>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="!justify-between">
          <AlertDialogCancel>
            {s('dialog.authMethod.cancelButton')}
          </AlertDialogCancel>
          <AlertDialogAction className="!m-0" onClick={onSaveHandler}>
            {s('dialog.authMethod.confirmButton')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChangeAutheticationModeDialog;
