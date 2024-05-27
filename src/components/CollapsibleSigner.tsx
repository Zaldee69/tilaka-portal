import useSigningStore from '@/zustand/store';
import Collapsible from './Collapsible';
import { cn } from '@/lib/utils';
import {
  GestureIcon,
  PageIcon,
  PlaceTTEIcon2,
  SettingsIcon,
  SmallStampIcon
} from '../../public/icons/icons';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger
} from '@/components/ui/drawer';
import { Separator } from './ui/separator';
import { useTranslations } from 'next-intl';

interface CollapsibleSignerProps {
  userId: string;
  name: string;
  pages: string[];
  currentPage: string;
  color: string;
  signature: number;
  initial: number;
  stamp: number;
  isShowSignature: boolean;
  isShowName: boolean;
  isShowQR: boolean;
  isShowLogo: boolean;
}

const CollapsibleSigner = (props: CollapsibleSignerProps) => {
  const { addSignature, changeSignatureSettings } = useSigningStore();

  const t = useTranslations('SigningDialog.step2');

  const SignatureSettings = () => {
    return (
      <div className="pb-2">
        <h5 className="mt-5">{t('signatureSetting')}</h5>
        {/* Checkbox for signature settings */}
        <div className="flex items-center space-x-2 px-1 pt-3">
          <Checkbox
            disabled={props.signature < 1}
            checked={props.isShowSignature}
            onCheckedChange={(value) =>
              changeSignatureSettings(
                'show_signature',
                value as boolean,
                props.userId
              )
            }
            className="rounded-[6px] h-5 w-5"
          />
          <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {t('displaySignature')}
          </label>
        </div>
        <div className="flex items-center space-x-2 px-1 pt-3">
          <Checkbox
            disabled={!props.isShowSignature || props.signature < 1}
            checked={props.isShowName}
            onCheckedChange={(value) =>
              changeSignatureSettings(
                'show_name',
                value as boolean,
                props.userId
              )
            }
            className="rounded-[6px] h-5 w-5"
          />
          <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {t('displayName')}
          </label>
        </div>
        <div className="flex items-center space-x-2 px-1 pt-3">
          <Checkbox
            disabled={props.signature < 1}
            checked={props.isShowQR}
            onCheckedChange={(value) =>
              changeSignatureSettings('show_qr', value as boolean, props.userId)
            }
            className="rounded-[6px] h-5 w-5"
          />
          <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {t('displayQR')}
          </label>
        </div>
        <div className="flex items-center space-x-2 px-1 pt-3">
          <Checkbox
            checked={props.isShowLogo}
            disabled={!props.isShowQR}
            onCheckedChange={(value) =>
              changeSignatureSettings(
                'show_logo',
                value as boolean,
                props.userId
              )
            }
            className="rounded-[6px] h-5 w-5"
          />
          <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {t('displayLogo')}
          </label>
        </div>
      </div>
    );
  };

  return (
    <Collapsible
      className="bg-white border border-gray-6 rounded-md !text-sm mt-4 lg:max-w-xs w-full"
      header={
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'rounded-full flex items-center justify-center w-8 h-8',
              props.color
            )}
          >
            <p className="font-bold uppercase">{props.name.split('')[0]}</p>
          </div>
          <p className="font-semibold">{props.name}</p>
        </div>
      }
      autoOpen={false}
    >
      <div className="px-4 pt-5">
        {/* Signature Information */}
        <div className="flex border border-gray-6 lg:border-none py-2 px-5 lg:p-0 rounded-lg justify-between">
          {/* Pages */}
          <div className="flex flex-col items-center lg:items-start">
            <p className="text-gray-2 text-xs">{t('page')}</p>
            <div className="flex items-center gap-2 mt-2 lg:mt-3">
              <PageIcon />{' '}
              <p className="font-semibold">
                {props.pages.length >= 1
                  ? props.pages.sort().map((item, index, array) => {
                      const isLastItem = index === array.length - 1;
                      return isLastItem ? item : item + ',';
                    })
                  : '-'}
              </p>
            </div>
          </div>
          {/* Signatures */}
          <div className="flex flex-col items-center lg:items-start">
            <p className="text-gray-2 text-xs">{t('signature')}</p>
            <div className="flex items-center gap-2 mt-2 lg:mt-3">
              <PlaceTTEIcon2 />{' '}
              <p
                className={cn('font-semibold', {
                  'text-destructive': props.signature === 0
                })}
              >
                {props.signature}
              </p>
            </div>
          </div>
          {/* Stamps */}
          <div className="flex flex-col items-center lg:items-start">
            <p className="text-gray-2 text-xs">e-Meterai</p>
            <div className="flex items-center gap-2 mt-2 lg:mt-3">
              <SmallStampIcon /> <p className="font-semibold">{props.stamp}</p>
            </div>
          </div>
        </div>
        {/* Signature Buttons */}
        <div className="gap-3 mt-6 overflow-x-scroll no-scrollbar lg:overflow-hidden md:mt-0 max-[768px]:flex">
          <Button
            onClick={() =>
              addSignature('signature', props.userId, props.currentPage)
            }
            variant="ghost"
            className="md:mt-6 border-2 w-full border-[#A1CCF8] bg-[#EFF7FF] border-dashed font-semibold gap-2 py-5 text-primary !justify-start px-4"
          >
            <PlaceTTEIcon2
              strokeClassName="stroke-primary"
              pathClassName="fill-primary"
            />{' '}
            {t('button.signature')}
          </Button>
          <Button
            onClick={() =>
              addSignature('initial', props.userId, props.currentPage)
            }
            variant="ghost"
            className="md:mt-3 border-2 w-full border-[#A1CCF8] bg-[#EFF7FF] border-dashed font-semibold gap-2 py-5 text-primary !justify-start px-4"
          >
            <GestureIcon pathClassName="fill-primary" /> {t('button.initials')}
          </Button>
          <Button
            onClick={() =>
              addSignature('stamp', props.userId, props.currentPage)
            }
            variant="ghost"
            className="md:mt-3 border-2 w-full border-[#A1CCF8] bg-[#EFF7FF] border-dashed font-semibold gap-2 py-5 text-primary !justify-start px-4"
          >
            <SmallStampIcon pathClassName="fill-primary" /> e-Meterai
          </Button>

          <Separator orientation="vertical" className="h-10 lg:hidden " />

          <Drawer>
            <DrawerTrigger>
              <Button
                variant="ghost"
                className="font-semibold gap-2 py-5 text-primary !justify-start px-4 text-gray-2 border border-input lg:hidden"
              >
                <SettingsIcon /> Pengaturan
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="pl-3">
                <SignatureSettings />
              </div>
              <DrawerFooter>
                <DrawerClose>
                  <Button className="w-full">Terapkan</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        {/* Signature Settings */}
        <div className="hidden md:block">
          <SignatureSettings />
        </div>
      </div>
    </Collapsible>
  );
};

export default CollapsibleSigner;
