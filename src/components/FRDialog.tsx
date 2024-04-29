'use client';

import useCameraPermission, {
  TPermissionState
} from '@/hooks/useCameraPermission';
import Image from 'next/image';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Webcam from 'react-webcam';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from './ui/alert-dialog';

import { useTranslations } from 'next-intl';
import { useMediaQuery } from 'usehooks-ts';

interface Constraint {
  width: number;
  height: number;
  facingMode: string;
}

interface Props {
  callbackCaptureProcessor: (base64Img: string | null | undefined) => void;
  title: string;
  subtitle: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FRDialog = ({
  callbackCaptureProcessor,
  setOpen,
  open,
  title,
  subtitle
}: Props) => {
  const constraint: Constraint = {
    width: 1280,
    height: 720,
    facingMode: 'user'
  };

  const cameraPermission: TPermissionState = useCameraPermission();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isUserMediaError, setIsUserMediaError] = useState<boolean>(false);
  const webcamRef = useRef<Webcam | null>(null);

  const s = useTranslations('Settings');

  const onPlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const shouldChangeRingWidth: boolean = useMediaQuery('(max-width: 768px)');

  const capture = useCallback(async () => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    callbackCaptureProcessor(imageSrc);
  }, []);

  useEffect(() => {
    if (cameraPermission === 'denied') setIsUserMediaError(true);
  }, [cameraPermission]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-md">
        <div className="justify-center flex mb-3 ">
          <Image
            src="/images/fr.svg"
            height={69}
            width={77}
            alt="Tilaka Logo"
            quality={100}
            priority
          />
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {subtitle}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="relative">
          <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center">
            <Image
              src="/images/camera-frame.svg"
              className="md:w-56 w-44"
              height={220}
              width={220}
              alt="Tilaka Logo"
              quality={100}
              priority
            />
          </div>
          <div
            id="countdown-timer-fr"
            className="absolute text-white top-5 right-5 md:right-10 flex justify-center"
          >
            <CountdownCircleTimer
              onComplete={() => {
                capture();
                return {
                  shouldRepeat: false
                };
              }}
              isPlaying={isPlaying}
              size={shouldChangeRingWidth ? 35 : 45}
              strokeWidth={2}
              duration={5}
              colors="#fff"
            >
              {({ remainingTime }) => remainingTime + 's'}
            </CountdownCircleTimer>
          </div>
          <Webcam
            className="rounded-[30px] sm:w-full h-80 w-full md:h-96 md:w-96 object-cover"
            ref={webcamRef}
            audio={false}
            height={440}
            screenshotFormat="image/jpeg"
            width={1280}
            screenshotQuality={1}
            minScreenshotWidth={1280}
            mirrored={false}
            minScreenshotHeight={960}
            videoConstraints={constraint}
            onLoadedMetadata={onPlay}
            onUserMediaError={() => setIsUserMediaError(true)}
          />
        </div>
        <AlertDialogFooter className="!justify-center">
          <AlertDialogCancel className="mt-2 h-fit text-base">
            {s('dialog.authMethod.cancelButton')}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FRDialog;
