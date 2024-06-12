'use client';

import React, { createContext, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { TilakaIcon } from '../../../../public/icons/icons';
import { useTranslations } from 'next-intl';

import { Wizard } from 'react-use-wizard';

import Step1 from './wizard/Step1';
import Step2 from './wizard/Step2';
import Step3 from './wizard/Step3';
import Step4 from './wizard/Step4';
import { useSearchParams, useRouter } from 'next/navigation';
import useSigningStore from '@/zustand/store';

interface IOpenDialog {
  open: boolean;
  setOpen: () => void;
}

const openDialogInitial: IOpenDialog = {
  open: false,
  setOpen: () => {}
};

export const OpenDialogContext = createContext(openDialogInitial);

const SigningDialog = ({ children }: { children?: React.ReactNode }) => {
  const t = useTranslations('Dashboard');

  const searchParams = useSearchParams();

  const { addSigner, signers, resetSignatureDraft } = useSigningStore();

  const [open, setOpen] = useState(searchParams.get('sign') === 'true');

  const setOpenHandler = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      const signerNames = signers.map((signer) => signer.name);
      const newSignerName = 'johndoe21';

      const randomid = (Math.random() + 1).toString(36).substring(7);

      // Check if the new signer's name already exists
      if (!signerNames.includes(newSignerName)) {
        addSigner(randomid, newSignerName, 'signer');
      }
      window.history.pushState(null, '', '?' + 'sign=true');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button
            onClick={() => {
              setOpen(true);
              const signerNames = signers.map((signer) => signer.name);
              const newSignerName = 'johndoe21';

              const randomid = (Math.random() + 1).toString(36).substring(7);

              // Check if the new signer's name already exists
              if (!signerNames.includes(newSignerName)) {
                addSigner(randomid, newSignerName, 'signer');
              }
              window.history.pushState(null, '', '?' + 'sign=true');
            }}
            className="rounded-full w-full flex justify-center gap-3 font-semibold sign-button-shadow"
          >
            <TilakaIcon svgClassName="flex-none" />{' '}
            <h5>{t('sidebar.signPdfButton')}</h5>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        onCloseCallback={() => {
          localStorage.removeItem('activeStep');
          window.history.pushState(null, '', '?' + '');
          resetSignatureDraft();
        }}
        showCloseIcon={false}
        className="h-screen w-screen max-w-full !rounded-none p-0"
      >
        <div className="flex flex-col gap-10 items-center w-full overflow-y-scroll no-scrollbar">
          <OpenDialogContext.Provider value={{ open, setOpen: setOpenHandler }}>
            <Wizard
              startIndex={Number(localStorage.getItem('activeStep'))}
              onStepChange={(stepIndex) =>
                localStorage.setItem('activeStep', stepIndex.toString())
              }
            >
              <Step1 />
              <Step2 />
              <Step3 />
              <Step4 />
            </Wizard>
          </OpenDialogContext.Provider>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SigningDialog;
