'use client';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Link2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useCopyToClipboard } from 'usehooks-ts';
import { toast } from 'sonner';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const DeviceNotSupported = () => {
  const searchParams = useSearchParams();

  const [open, setOpen] = useState<boolean>(
    searchParams.get('openDeviceNotSupportedDialog') === 'true'
  );

  const [copiedText, copy] = useCopyToClipboard();

  const t = useTranslations('deviceNotSupportedDialog');

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            {t('title')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p className="text-center">{t('subtitle')}</p>
            <p className="pl-3 mb-1 mt-8 font-semibold text-xs">{t('link')}</p>
            <div className="flex items-center border border-input box-border gap-3 rounded-md overflow-hidden">
              <Link2 className="flex-none ml-3" />
              <Separator orientation="vertical" className="h-11" />
              <input
                readOnly
                className="border-none p-0 focus:outline-none self-stretch flex-1"
                defaultValue="https://dev-api.tilaka.id...."
              />
              <div className="flex justify-end w-fit">
                <Button
                  onClick={() =>
                    copy('https://dev-api.tilaka.id/personal-webview/')
                      .then(() => {
                        toast.success('Copied!');
                      })
                      .catch((error) => {
                        toast.error('Failed to copy!', error);
                      })
                  }
                  className="px-10 max-w-5 !rounded-tl-none !rounded-bl-none rounded-md"
                >
                  {t('copy')}
                </Button>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeviceNotSupported;
