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
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import FRVerification from './FRVerification';
import OTPVerification from './OTPVerification';

const SigningVerificationDialog = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const s = useTranslations('Settings');
  const d = useTranslations('SigningDialog');

  const [openFRVerification, setOpenFRVerification] = useState<boolean>(false);
  const [openOTPVerification, setOpenOTPVerification] =
    useState<boolean>(false);

  const [authenticationMode, setAuthenticationMode] = useState<'otp' | 'fr'>(
    'otp'
  );

  const changeAuthMode = (type: 'fr' | 'otp') => {
    setAuthenticationMode(type);
  };

  const onSaveHandler = () => {
    if (authenticationMode === 'otp') {
      setOpenOTPVerification(true);
    } else {
      setOpenFRVerification(true);
    }
  };

  return (
    <AlertDialog>
      <FRVerification
        open={openFRVerification}
        setOpen={setOpenFRVerification}
        setOpenOTPDialog={setOpenOTPVerification}
        callbackCaptureProcessor={() => console.log()}
        title={d('frDialog.title')}
        subtitle={d('frDialog.subtitle')}
      />

      <OTPVerification
        title={d('otpDialog.title')}
        subtitle={d.rich('otpDialog.subtitle', {
          br: () => <br></br>
        })}
        showtrigger={false}
        setOpen={setOpenOTPVerification}
        setOpenFRDialog={setOpenFRVerification}
        open={openOTPVerification}
        callbackCaptureProcessor={() => console.log()}
      />

      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="">
            {d('authentication')}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-2">
            {d('signingAuthenticationDialog')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <Button
            onClick={() => changeAuthMode('otp')}
            variant="outline"
            className={cn(
              'rounded-[10px] group px-2 py-7 w-full hover:bg-white transition-colors gap-3 justify-start bg-[#F9F9F9] border-transparent shadow-none border-2',
              {
                'border-primary bg-white': authenticationMode === 'otp'
              }
            )}
          >
            <div
              className={cn(
                'bg-[#4949491A]/10 p-2 hover:!bg-[#0D5FB31A]/10 rounded-full',
                {
                  ' bg-[#0D5FB31A]/10': authenticationMode === 'otp'
                }
              )}
            >
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
            <div
              className={cn(
                'bg-[#4949491A]/10 hover:!bg-[#0D5FB31A]/10 p-2 rounded-full',
                {
                  ' bg-[#0D5FB31A]/10': authenticationMode === 'fr'
                }
              )}
            >
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
          <div className="flex items-center mt-4 mb-1 justify-between">
            <Label htmlFor="airplane-mode">{d('setAs')}</Label>
            <Switch id="airplane-mode" />
          </div>
        </div>
        <AlertDialogFooter className="!justify-between gap-2 w-full items-center">
          <AlertDialogCancel className="custom-shadow  w-full max-[767px]:max-w-[200px]">
            {s('dialog.authMethod.cancelButton')}
          </AlertDialogCancel>
          <AlertDialogAction
            className="!m-0 w-full max-[767px]:max-w-[200px]"
            onClick={onSaveHandler}
          >
            {d('step2.continue')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SigningVerificationDialog;
