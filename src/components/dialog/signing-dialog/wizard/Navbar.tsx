import React from 'react';

import {
  BrushIcon,
  CheckCircleIcon,
  DocumentIcon,
  PlaceTTEIcon
} from '../../../../../public/icons/icons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { MoveRight } from 'lucide-react';

import { useWizard } from 'react-use-wizard';
import { cn } from '@/lib/utils';
import useSigningStore from '@/zustand/store';
import { useTranslations } from 'next-intl';

const Navbar = () => {
  const { activeStep } = useWizard();

  const t = useTranslations('SigningDialog.navbar');
  const s = useTranslations('SigningDialog.step2');

  const { signers } = useSigningStore();

  const loggedSigner = signers.filter(
    (signer) => signer.name === 'johndoe21'
  )[0];

  const totalSignaturesCount: number = signers.reduce((count, signer) => {
    const { initial, signature, stamp } = signer.signatures;
    return count + initial.length + signature.length + stamp.length;
  }, 0);

  const signersWithSignaturesCount: number = signers.filter(
    (signer) =>
      signer.signatures &&
      (signer.signatures.signature.length > 0 ||
        signer.signatures.initial.length > 0 ||
        signer.signatures.stamp.length > 0)
  ).length;

  return (
    <div
      className={cn('pt-4 absolute top-sat left-0 right-0 z-40 bg-white', {
        'border-b pb-2': activeStep !== 1
      })}
    >
      <div className="flex px-4 justify-between flex-col lg:flex-row lg:items-center lg:pb-4 bg-white">
        <p className="text-base font-semibold text-gray-1">{t('title')}</p>
        <Breadcrumb className="justify-center items-center flex flex-col mt-2 md:mt-0">
          <BreadcrumbList className="w-full max-[380px]:!justify-between justify-center max-[360px]:px-3">
            <BreadcrumbItem
              className={cn('text-gray-4', {
                'text-primary font-semibold': activeStep > 0 || activeStep === 0
              })}
            >
              {' '}
              <DocumentIcon
                pathClassName={cn('fill-gray-4', {
                  'fill-primary': activeStep > 0 || activeStep === 0
                })}
              />{' '}
              <p className="hidden min-[700px]:block">{t('uploadDocument')}</p>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="[&>svg]:size-7">
              <MoveRight
                className={cn('text-gray-4', {
                  'text-primary': activeStep >= 1
                })}
              />
            </BreadcrumbSeparator>
            <BreadcrumbItem
              className={cn('text-gray-4', {
                'text-primary font-semibold': activeStep > 1 || activeStep === 1
              })}
            >
              <PlaceTTEIcon
                pathClassName={cn('fill-gray-4', {
                  'fill-primary': activeStep > 1 || activeStep === 1
                })}
                strokeClassName={cn('stroke-gray-4 fill-gray-4', {
                  'stroke-primary fill-gray-4':
                    activeStep > 1 || activeStep === 1
                })}
              />{' '}
              <p className="hidden min-[700px]:block">{t('setSignature')}</p>
            </BreadcrumbItem>
            {loggedSigner?.privilege === 'signer' && (
              <>
                <BreadcrumbSeparator className="[&>svg]:size-7">
                  <MoveRight
                    className={cn('text-gray-4', {
                      'text-primary': activeStep >= 2
                    })}
                  />
                </BreadcrumbSeparator>
                <BreadcrumbItem
                  className={cn('text-gray-4', {
                    'text-primary font-semibold':
                      activeStep > 2 || activeStep === 2
                  })}
                >
                  <BrushIcon
                    pathClassName={cn('fill-gray-4', {
                      'fill-primary': activeStep > 2 || activeStep === 2
                    })}
                    strokeClassName={cn('stroke-gray-4', {
                      'stroke-primary': activeStep > 2 || activeStep === 2
                    })}
                  />{' '}
                  <p className="hidden min-[700px]:block">{t('sign')}</p>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator className="[&>svg]:size-7">
              <MoveRight className="text-gray-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem
              className={cn('text-gray-4', {
                'text-primary font-semibold': activeStep === 3
              })}
            >
              <CheckCircleIcon
                pathClassName={cn('fill-gray-4', {
                  'fill-primary': activeStep > 3 || activeStep === 3
                })}
              />{' '}
              <p className="hidden min-[700px]:block">{t('completed')}</p>
            </BreadcrumbItem>
          </BreadcrumbList>
          <p className="min-[700px]:hidden text-xs font-bold mt-1 text-gray-2">
            {activeStep === 0
              ? t('uploadDocument')
              : activeStep === 1
                ? t('setSignature')
                : activeStep === 2
                  ? t('sign')
                  : 'Selesai'}
          </p>
        </Breadcrumb>
        <div className="hidden invisible min-[700px]:block text-base font-semibold">
          Tanda Tangan Dokumen
        </div>
      </div>
      {activeStep === 1 && (
        <div className="bg-[#F2F2F2] px-4 py-2 mt-2 md:mt-0">
          <p className="text-gray-1 text-center text-xs lg:text-sm">
            {signersWithSignaturesCount < 1
              ? s('header2')
              : s.rich('header', {
                  signature: () => (
                    <span className="text-[#3B9B1B] font-semibold">
                      ({totalSignaturesCount})
                    </span>
                  ),
                  signers: () => (
                    <span className="text-primary font-semibold">
                      ({signersWithSignaturesCount})
                    </span>
                  )
                })}
          </p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
