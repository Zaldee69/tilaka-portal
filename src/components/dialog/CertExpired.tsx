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

const CertExpiredDialog = () => {
  const searchParams = useSearchParams();
  const { stateSetter } = useContext(TnCContext);

  const [open, setOpen] = useState<boolean>(
    searchParams.get('openExpiredDialog') === 'true'
  );

  const t = useTranslations('certExpiredDialog');

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="pt-12 !justify-center max-w-sm">
          <DialogHeader>
            <DialogDescription className="text-center text-black">
              {t('content')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="items-center !justify-center mt-3">
            <Button
              onClick={() => {
                setOpen(false);
                stateSetter({
                  isOpen: true,
                  confirmationType: 'fr'
                });
              }}
              className="font-semibold"
            >
              {t('submit')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CertExpiredDialog;
