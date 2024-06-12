import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
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

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from '@/components/ui/input-otp';

import Image from 'next/image';
import { useCountdown } from 'usehooks-ts';
import { CameraFrontIcon, LoaderIcon } from '../../../public/icons/icons';
import { Button } from '../ui/button';
import { OpenDialogContext } from './signing-dialog/SigningDialog';
import { toast } from 'sonner';
import useSigningStore from '@/zustand/store';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface Props {
  callbackCaptureProcessor: (base64Img: string | null | undefined) => void;
  title: string;
  subtitle: string | React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showtrigger: boolean;
  children?: React.ReactNode;
  setOpenFRDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const OTPVerification = (props: Props) => {
  const [intervalValue, setIntervalValue] = useState<number>(1000);
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 60,
      intervalMs: intervalValue
    });

  const d = useTranslations('SigningDialog');

  const { setOpen } = useContext(OpenDialogContext);

  const router = useRouter();

  const [value, setValue] = React.useState('');

  const [isLoading, setIsLoading] = useState<boolean>();

  const { resetSignatureDraft } = useSigningStore();

  const processVerification = () => {
    setIsLoading(true);
    setTimeout(() => {
      resetSignatureDraft();
      setOpen();
      localStorage.removeItem('activeStep');
      router.push('/dashboard/documents');
      toast.success('Tandatangan Berhasil', {
        description: 'Dokumen telah ditandatangi dan dibagikan ke email tujuan'
      });
    }, 10000);
  };

  useEffect(() => {
    startCountdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <AlertDialog open={props.open} onOpenChange={props.setOpen}>
      {props.showtrigger ?? props.children}
      <AlertDialogContent className="max-w-md px-4">
        <AlertDialogHeader className="!items-center">
          <Image
            src="/images/otp-verification.svg"
            alt="OTP Verification"
            height={68}
            width={80}
          />
          <AlertDialogTitle className="text-[18px]">
            {props.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-gray-2">
            {props.subtitle}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center">
          <InputOTP
            value={value}
            onChange={(val) => {
              setValue(val);
              console.log(value);
            }}
            maxLength={6}
          >
            <InputOTPGroup className="gap-1">
              <InputOTPSlot
                className={cn({
                  'border-[#547496] bg-[#EFF7FF]': value.length >= 1
                })}
                index={0}
              />
              <InputOTPSlot
                className={cn({
                  'border-[#547496] bg-[#EFF7FF]': value.length >= 2
                })}
                index={1}
              />
              <InputOTPSlot
                className={cn({
                  'border-[#547496] bg-[#EFF7FF]': value.length >= 3
                })}
                index={2}
              />
              <InputOTPSlot
                className={cn({
                  'border-[#547496] bg-[#EFF7FF]': value.length >= 4
                })}
                index={3}
              />
              <InputOTPSlot
                className={cn({
                  'border-[#547496] bg-[#EFF7FF]': value.length >= 5
                })}
                index={4}
              />
              <InputOTPSlot
                className={cn({
                  'border-[#547496] bg-[#EFF7FF]': value.length >= 6
                })}
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <p className="text-sm text-center py-3 text-gray-3 ">
          {d('otpDialog.didntReceiveOTP')}
          {count <= 0 ? (
            <span
              onClick={() => {
                resetCountdown();
                startCountdown();
              }}
              className="font-medium text-primary cursor-pointer"
            >
              {' '}
              {d('otpDialog.resend')}
            </span>
          ) : (
            <span className="text-primary font-medium"> 0:{count}</span>
          )}
        </p>

        <AlertDialogFooter className="!justify-center gap-3">
          <AlertDialogCancel
            disabled={isLoading}
            className="custom-shadow font-semibold md:w-6/12 px-2"
          >
            {d('otpDialog.cancel')}
          </AlertDialogCancel>
          <Button
            className="md:w-6/12 px-2 font-semibold"
            onClick={processVerification}
            disabled={isLoading || value.length < 6}
          >
            {isLoading ? (
              <>
                <LoaderIcon
                  svgClassName="animate-spin mr-2 flex-none"
                  fill="#fff"
                />{' '}
                {d('otpDialog.loading')}
              </>
            ) : (
              d('otpDialog.send')
            )}
          </Button>
        </AlertDialogFooter>
        <Button
          disabled={isLoading}
          onClick={() => {
            props.setOpen(false);
            props.setOpenFRDialog(true);
          }}
          variant="ghost"
          className="!w-fit px-0 mx-auto hover:text-gray-2 text-gray-2 font-semibold my-1"
        >
          <CameraFrontIcon pathClassName="fill-[#494949]" svgClassName="mr-2" />
          {d('otpDialog.useFRAuth')}
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPVerification;
