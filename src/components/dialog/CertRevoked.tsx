'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useSearchParams } from 'next/navigation';
import { useContext, useState } from 'react';
import { TnCContext } from './term-and-condition/TncContextProvider';
import { useTranslations } from 'next-intl';

const CertRevokedDialog = () => {
  const searchParams = useSearchParams();
  const { stateSetter } = useContext(TnCContext);

  const [open, setOpen] = useState<boolean>(
    searchParams.get('openRevokedDialog') === 'true'
  );

  const t = useTranslations('certRevokedDialog');

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!pt-[54px] !justify-center max-w-sm">
          <DialogHeader>
            <DialogDescription className="text-center md:whitespace-pre-line text-black">
              {t('content')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="items-center !justify-center mt-3">
            <Button
              onClick={() => {
                setOpen(false);
                stateSetter({
                  isOpen: true,
                  confirmationType: 'liveness'
                });
              }}
              className="font-semibold w-fit px-6"
            >
              {t('submit')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CertRevokedDialog;
