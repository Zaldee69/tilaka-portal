'use client';
import Dropzone from 'react-dropzone';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { useToast } from '../../../../components/ui/use-toast';
import { Progress } from '../../../../components/ui/progress';
import { Button } from '@/components/ui/button';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import PdfViewer from './PdfViewer';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const UploadDropZone = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(100);

  const { toast } = useToast();

  const t = useTranslations('VerifyPdf');

  const onDrop = useCallback((acceptedFile: File[]) => {
    if (acceptedFile[0].type !== 'application/pdf') {
      return toast({
        title: 'Failed to upload',
        description: 'File type not allowed',
        variant: 'destructive',
        color: '#E53E3E'
      });
    }

    setIsUploading(true);
    startSimulatedProgress();
    // Do something with the files
  }, []);

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev == 100) {
          clearInterval(interval);
          setIsUploading(false);
          return prev;
        } else {
          return prev + 5;
        }
      });
    }, 500);

    return interval;
  };

  return (
    <div className="h-full">
      <Dialog open={isUploading}>
        <DialogContent className="bg-transparent flex items-center justify-center border-none shadow-none">
          <div className="w-[100px] p-0 h-[100px]  !rounded-full flex items-center justify-center bg-white relative">
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
              className="absolute "
              height={35}
              width={33}
              alt="Tilaka Logo"
              quality={100}
              priority
            />
          </div>
        </DialogContent>
      </Dialog>

      {uploadProgress === 100 ? (
        <Button
          onClick={() => setUploadProgress(0)}
          className={cn(
            'absolute right-5 top-[84px] hidden md:block font-semibold sign-button-shadow'
          )}
        >
          Validasi PDF Baru
        </Button>
      ) : null}

      {uploadProgress === 100 ? (
        <PdfViewer />
      ) : (
        <div className="bg-[#F6F6F6] w-full mt-7 rounded-md h-80">
          <Dropzone disabled={isUploading} multiple={false} onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section className="flex h-full items-center justify-center px-5">
                <div
                  {...getRootProps()}
                  className="border-2 h-64 border-dashed border-[#E6F1FC] border-spacing-4 rounded-lg bg-white md:selection:w-6/12 px-5 py-24"
                >
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col justify-center items-center h-full"
                  >
                    <Image
                      src="/images/upload.svg"
                      height={56}
                      width={56}
                      alt="Tilaka Logo"
                      quality={100}
                      priority
                    />
                    <h3 className="text-gray-2 mt-8">
                      {isUploading ? (
                        t('uploadZone.uploading.title')
                      ) : (
                        <>
                          {' '}
                          <p className="text-center ">
                            {t('uploadZone.unuploading.title')}
                            <span className="p-0 text-primary text-xl font-bold md:text-start inline">
                              {' '}
                              {t('uploadZone.unuploading.upload')}
                            </span>
                          </p>
                        </>
                      )}
                    </h3>
                    <p className="text-gray-3 mt-1 font-medium text-center md:text-start">
                      {isUploading
                        ? t('uploadZone.uploading.subtitle')
                        : t('uploadZone.unuploading.subtitle')}
                    </p>
                    {isUploading ? (
                      <div className="w-full mt-4 mx-auto flex gap-4 items-center">
                        <Progress
                          value={uploadProgress}
                          className="h-1 w-full bg-secondary"
                          indicatorClassName="bg-primary"
                        />
                        <p className="text-xs text-gray-3">{uploadProgress}%</p>
                      </div>
                    ) : null}
                    <input
                      className="hidden"
                      type="file"
                      {...getInputProps()}
                      id="dropzone-file"
                    />
                  </label>
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
