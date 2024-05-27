import React, { Fragment, useState } from 'react';
import Navbar from './Navbar';
import { Button } from '@/components/ui/button';
import useSigningStore from '@/zustand/store';
import { Document, Page, pdfjs } from 'react-pdf';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { ArrowDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QRCodeCanvas } from 'qrcode.react';
import {
  DownloadIcon,
  PageIcon,
  PlaceTTEIcon2,
  SmallStampIcon
} from '../../../../../public/icons/icons';
import ScrollIntoView from 'react-scroll-into-view';
import { useResizeDetector } from 'react-resize-detector';
import Image from 'next/image';

import { Drawer, DrawerContent } from '@/components/ui/drawer';
import SigningVerificationDialog from '../../SigningVerification';
import CreateSignatureAttribute from '../../CreateSignatureAttribute';
import { useTranslations } from 'next-intl';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Step3 = () => {
  const { pdf_file, signers } = useSigningStore();
  const [numPages, setNumPages] = useState<number>();
  const [openOverlay, setOpenOverlay] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openSetSignatureAttribute, setOpenSetSignatureAttribute] =
    useState<boolean>(false);
  const { width, ref } = useResizeDetector();

  const t = useTranslations('SigningDialog');

  const user = signers.filter((signer) => signer.name === 'johndoe21')[0];

  return (
    <Fragment>
      <Navbar />

      <div className={cn('w-full relative min-h-screen overflow-hidden')}>
        {openOverlay ? (
          <div
            className="absolute z-50 left-0 right-0 bottom-0 top-[100px] md:top-[62px] w-full min-h-screen"
            style={{ backgroundColor: 'rgba(0, 0, 0, .5)' }}
          >
            <div className=" p-3 bg-[#F8FFE9]">
              <div className="w-full flex flex-col md:flex-row justify-between items-center space-y-2">
                <p className="text-gray-2 text-sm text-center md:text-start">
                  {t('reviewDoc')}
                </p>
                <Button onClick={() => setOpenOverlay(false)}>
                  {t('viewDoc')}
                </Button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="flex  flex-1 justify-center h-[calc(100vh-3.5rem)]">
          <div className="sticky max-w-3xl py- w-full h-[calc(100vh-3.5rem)]">
            <div ref={ref} className="flex-1 max-h-screen relative mt-24">
              <Document
                className="relative"
                file={pdf_file[0]?.file}
                onLoadSuccess={({ numPages }) => {
                  setTimeout(() => {
                    setNumPages(numPages);
                  }, 200);
                }}
                loading={
                  <div className="flex justify-center items-center h-full">
                    <Loader2 className="my-24 h-6 w-6 animate-spin text-primary" />
                  </div>
                }
              >
                <Drawer open={openDrawer}>
                  <DrawerContent
                    drawerClassName="bg-transparent"
                    className="py-5 px-2 md:px-0 rounded-none drawer-shadow"
                  >
                    <div className="flex flex-col md:flex-row justify-center items-center gap-10">
                      <div className="flex flex-col md:flex-row items-center max-w-xl gap-4">
                        <Image
                          src="/images/done-signing.svg"
                          height={80}
                          width={80}
                          alt="Done Signing"
                        />
                        <div className="text-center md:text-start">
                          <h5>{t('signingDoneDrawer.title')}</h5>
                          <p className="text-sm mt-2">
                            {t.rich('signingDoneDrawer.subtitle', {
                              br: () => <br></br>
                            })}{' '}
                          </p>
                        </div>
                      </div>
                      <SigningVerificationDialog>
                        <Button className="font-semibold h-12 text-base w-full md:w-fit">
                          {t('signingDoneDrawer.done')}
                        </Button>
                      </SigningVerificationDialog>
                    </div>
                  </DrawerContent>
                </Drawer>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger className="absolute md:top-5 -top-10 z-10 md:-left-[200px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Button className="custom-shadow font-semibold gap-4 px-6 bg-accent">
                      {t('startSigning')} <ArrowDown />
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className="px-6 max-w-[460px]"
                    closeIconClassName="top-7 right-6"
                    showCloseIcon={false}
                  >
                    <DialogHeader className="mt-2">
                      <DialogTitle>{t('signingOptionModal.title')}</DialogTitle>
                      <br />
                      <DialogDescription className="text-gray-2">
                        {t('signingOptionModal.subtitle')}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="border border-gray-6 rounded-xl p-3">
                      <div className="flex justify-start gap-16">
                        {/* Pages */}
                        <div>
                          <p className="text-gray-2 text-xs">
                            {t('step2.page')}
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <PageIcon />{' '}
                            <p className="text-sm">
                              {user?.signatures?.pages
                                .sort()
                                .map((item, index, array) => {
                                  const isLastItem = index === array.length - 1;
                                  return isLastItem ? item : item + ',';
                                })}
                            </p>
                          </div>
                        </div>
                        {/* Signatures */}
                        <div>
                          <p className="text-gray-2 text-xs">
                            {t('step2.signature')}
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <PlaceTTEIcon2 />{' '}
                            <p className={cn('text-sm')}>
                              {user?.signatures.signature.length ?? 0}
                            </p>
                          </div>
                        </div>
                        {/* Stamps */}
                        <div>
                          <p className="text-gray-2 text-xs">e-Meterai</p>
                          <div className="flex items-center gap-2 mt-3">
                            <SmallStampIcon />{' '}
                            <p className="text-sm">
                              {' '}
                              {user?.signatures.stamp.length ?? 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-3">
                      <ScrollIntoView alignToTop={false} selector="#signature1">
                        <Button
                          onClick={() => setOpenDialog(false)}
                          className="w-full font-semibold sign-button-shadow"
                        >
                          {t('signingOptionModal.button1')}
                        </Button>
                      </ScrollIntoView>
                      <Button
                        onClick={() => {
                          setOpenDrawer(true);
                          setOpenDialog(false);
                        }}
                        className="mt-4 w-full custom-shadow text-primary font-semibold"
                        variant="ghost"
                      >
                        {t('signingOptionModal.button2')}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {Array.from(Array(numPages).keys()).map((_, idx) => (
                  <Page
                    width={width ? width : 1}
                    className="border border-input md:mt-5 mt-44"
                    key={idx}
                    loading={
                      <div className="flex justify-center z-10">
                        <Loader2 className="my-24 h-6 w-6 animate-spin text-primary z-[9999]" />
                      </div>
                    }
                    pageNumber={idx + 1}
                  >
                    {signers.map((signer) =>
                      signer.signatures.signature.map(
                        (signature) =>
                          Number(signature.page) === Number(idx) + 1 &&
                          signer.name === 'johndoe21' && (
                            <div id="signature1" key={idx}>
                              {Number(signature.page) === Number(idx) + 1 && (
                                <div
                                  style={{
                                    transform: `translateY(-400px)`
                                  }}
                                  className="absolute -left-52 z-10"
                                >
                                  <CreateSignatureAttribute
                                    continueCallback={() => setOpenDrawer(true)}
                                    showtrigger={false}
                                    open={openSetSignatureAttribute}
                                    setOpen={setOpenSetSignatureAttribute}
                                  />
                                  <div className="relative">
                                    <Image
                                      src="/images/sign-here-bg.svg"
                                      height={50}
                                      width={201}
                                      alt="Sign Here"
                                    />
                                    <p className="text-gray-1 absolute top-6 text-sm left-8 font-semibold">
                                      {t('signHere')}
                                    </p>
                                  </div>
                                </div>
                              )}
                              <div
                                onClick={() =>
                                  setOpenSetSignatureAttribute(true)
                                }
                                style={{
                                  transform: `translate(110px, -400px)`,
                                  width: `${signature.width}px`,
                                  height: `${signature.height}px`
                                }}
                                className={`absolute z-10 border box-border border-dashed border-primary cursor-pointer ${signer.color}`}
                                key={signature.id}
                              >
                                <div
                                  className={cn(
                                    'items-center justify-between px-2 flex h-full gap-2',
                                    {
                                      'justify-center':
                                        signer.signature_settings.show_qr &&
                                        !signer.signature_settings
                                          .show_signature
                                    }
                                  )}
                                >
                                  {signer.signature_settings.show_qr ? (
                                    <QRCodeCanvas
                                      bgColor={
                                        signer.color
                                          .split('[')[1]
                                          .split('/')[0]
                                          .split(']')[0]
                                      }
                                      imageSettings={
                                        signer.signature_settings.show_logo
                                          ? {
                                              src: '/images/logo.svg',
                                              x: undefined,
                                              y: undefined,
                                              height: 50,
                                              width: 50,
                                              excavate: true
                                            }
                                          : undefined
                                      }
                                      className={
                                        signer.signature_settings.show_name ||
                                        signer.signature_settings.show_signature
                                          ? 'canvas'
                                          : 'canvas-full'
                                      }
                                      value="https://reactjs.org/"
                                    />
                                  ) : null}
                                  {signer.signature_settings.show_signature ? (
                                    <div
                                      className={cn(
                                        'flex justify-center flex-col items-center w-6/12',
                                        {
                                          'w-full':
                                            !signer.signature_settings.show_qr
                                        }
                                      )}
                                    >
                                      {' '}
                                      {signer.signature_settings
                                        .show_signature ? (
                                        <DownloadIcon svgClassName="flex-none" />
                                      ) : null}
                                      {signer.signature_settings.show_name ? (
                                        <p className="font-semibold text-xs">
                                          {signer.name}
                                        </p>
                                      ) : null}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          )
                      )
                    )}
                  </Page>
                ))}
              </Document>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Step3;
