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

const Navbar = () => {
  const { activeStep } = useWizard();

  const checkActiveStep = () => {};

  return (
    <div className="flex justify-between items-center border-b p-4 absolute top-0 left-0 right-0 bg-white z-10">
      <p className="text-sm text-gray-2">Tanda Tangan Dokumen</p>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem
            className={cn('text-gray-4', {
              'text-primary font-semibold': activeStep > 0
            })}
          >
            {' '}
            <DocumentIcon
              pathClassName={cn('fill-gray-4', {
                'fill-primary': activeStep > 0
              })}
            />{' '}
            Upload Dokumen
          </BreadcrumbItem>
          <BreadcrumbSeparator className="[&>svg]:size-7">
            <MoveRight className="text-gray-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem
            className={cn('text-gray-4', {
              'text-primary font-semibold': activeStep > 1 - 1
            })}
          >
            <PlaceTTEIcon
              pathClassName={cn('fill-gray-4', {
                'fill-primary': activeStep > 1 - 1
              })}
              strokeClassName={cn('stroke-gray-4 fill-gray-4', {
                'stroke-primary fill-gray-4': activeStep > 1 - 1
              })}
            />{' '}
            Atur Posisi Tanda Tangan
          </BreadcrumbItem>

          <BreadcrumbSeparator className="[&>svg]:size-7">
            <MoveRight className="text-gray-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem
            className={cn('text-gray-4', {
              'text-primary font-semibold': activeStep > 2 - 1
            })}
          >
            <BrushIcon
              pathClassName={cn('fill-gray-4', {
                'fill-primary': activeStep > 2 - 1
              })}
              strokeClassName={cn('stroke-gray-4', {
                'stroke-primary': activeStep > 2 - 1
              })}
            />{' '}
            Tandatangan
          </BreadcrumbItem>
          <BreadcrumbSeparator className="[&>svg]:size-7">
            <MoveRight className="text-gray-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem
            className={cn('text-gray-4', {
              'text-primary font-semibold': activeStep > 3 - 1
            })}
          >
            <CheckCircleIcon
              pathClassName={cn('fill-gray-4', {
                'fill-primary': activeStep > 3 - 1
              })}
            />{' '}
            Selesai
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="invisible text-sm">Tanda Tangan Dokumen</div>
    </div>
  );
};

export default Navbar;
