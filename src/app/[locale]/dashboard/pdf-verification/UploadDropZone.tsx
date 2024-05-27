'use client';

import Dropzone from 'react-dropzone';
import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import PdfViewer from './PdfViewer';
import { cn, fileToBase64 } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const UploadDropZone = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [base64, setBase64] = useState<string>('');

  const t = useTranslations('VerifyPdf');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file.type !== 'application/pdf') {
      return toast.error('Failed to upload', {
        description: 'File type not allowed'
      });
    }

    setIsUploading(true);
    startSimulatedProgress();

    const base64String = await fileToBase64(file);
    setBase64(base64String);
  }, []);

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return prev;
        }
        return prev + 5;
      });
    }, 500);
  };

  return (
    <div className="h-full">
      <Dialog open={isUploading}>
        <DialogContent className="bg-transparent flex items-center justify-center border-none shadow-none">
          <div className="w-[100px] p-0 h-[100px] !rounded-full flex items-center justify-center bg-white relative">
            <Image
              className="animate-spin"
              src="/images/ellipse.svg"
              height={73}
              width={73}
              alt="Tilaka Logo"
              quality={100}
              priority
            />
            <Image
              src="/images/tilaka.svg"
              className="absolute"
              height={35}
              width={33}
              alt="Tilaka Logo"
              quality={100}
              priority
            />
          </div>
        </DialogContent>
      </Dialog>

      {uploadProgress === 100 && (
        <Button
          onClick={() => setUploadProgress(0)}
          className={cn(
            'absolute right-5 top-[84px] hidden md:block font-semibold sign-button-shadow'
          )}
        >
          {t('newPdfValidation')}
        </Button>
      )}

      {uploadProgress === 100 ? (
        <PdfViewer file={base64} />
      ) : (
        <div className="bg-[#F6F6F6] w-full mt-7 rounded-md h-80 md:h-[370px]">
          <Dropzone disabled={isUploading} multiple={false} onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section className="flex h-full items-center justify-center px-5">
                <div
                  {...getRootProps()}
                  className="border-[3px] md:min-w-[578px] h-72 cursor-pointer border-dashed border-[#E6F1FC] border-spacing-4 rounded-lg bg-white px-5 py-24"
                >
                  <div className="flex flex-col justify-center items-center h-full">
                    <Image
                      src="/images/upload.svg"
                      height={56}
                      width={56}
                      alt="Tilaka Logo"
                      quality={100}
                      priority
                    />
                    <h4 className="text-gray-2 md:mt-8 mt-4">
                      {isUploading ? (
                        t('uploadZone.uploading.title')
                      ) : (
                        <>
                          <p className="text-center">
                            {t('uploadZone.unuploading.title')}
                            <span className="p-0 text-primary font-bold md:text-start inline">
                              {t('uploadZone.unuploading.upload')}
                            </span>
                          </p>
                        </>
                      )}
                    </h4>
                    <p className="text-gray-3 mt-1 font-medium text-center md:text-start text-sm md:text-base">
                      {isUploading
                        ? t('uploadZone.uploading.subtitle')
                        : t('uploadZone.unuploading.subtitle')}
                    </p>
                    {isUploading && (
                      <div className="w-full mt-4 mx-auto flex gap-4 items-center">
                        <Progress
                          value={uploadProgress}
                          className="h-1 w-full bg-secondary"
                          indicatorClassName="bg-primary"
                        />
                        <p className="text-xs text-gray-3">{uploadProgress}%</p>
                      </div>
                    )}
                  </div>
                  <input
                    className="bg-black z-10"
                    type="file"
                    {...getInputProps()}
                    id="dropzone-file"
                  />
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      )}
    </div>
  );
};

export default UploadDropZone;
