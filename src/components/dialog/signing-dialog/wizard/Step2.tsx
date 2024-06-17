import React, { Fragment, useContext, useState } from 'react';
import Navbar from './Navbar';
import { Button } from '@/components/ui/button';
import { useWizard } from 'react-use-wizard';

import PdfRenderer from '@/components/PdfRenderer';
import PdfPagination from '@/components/PdfPagination';
import { Rnd } from 'react-rnd';
import useSigningStore from '@/zustand/store';
import { cn, getMobileOperatingSystem } from '@/lib/utils';
import { Signer } from '@/types';
import CollapsibleSigner from '@/components/CollapsibleSigner';
import {
  BrushIcon,
  DeleteIcon,
  DownloadIcon,
  MenuBookIcon,
  PeopleIcon,
  StampBackgroundIcon
} from '../../../../../public/icons/icons';
import { QRCodeCanvas } from 'qrcode.react';
import Collapsible from '@/components/Collapsible';

import { Document, Page, pdfjs } from 'react-pdf';

import { Dialog, DialogContent } from '@/components/ui/dialog';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Loader2 } from 'lucide-react';

import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

import Image from 'next/image';
import { OpenDialogContext } from '../SigningDialog';
import { useTranslations } from 'next-intl';
import { useResizeDetector } from 'react-resize-detector';
import { useRouter } from '@/navigation';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Step2Props {}

const Step2: React.FC<Step2Props> = () => {
  const { nextStep, previousStep } = useWizard();
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [openSignConfirmationDialog, setOpenSignConfirmationDialog] =
    useState<boolean>(false);

  const { setOpen } = useContext(OpenDialogContext);

  const router = useRouter();

  const t = useTranslations('SigningDialog.step2');
  const d = useTranslations('Dashboard');

  const {
    signers,
    pdf_file,
    is_only_for_me,
    deleteSignature,
    changeSignaturePosition,
    changeSignatureSize,
    resetSignatureDraft
  } = useSigningStore();

  // Check if at least one signer with 'signer' privilege has at least one signature
  const hasSignerWithSignature = signers
    .filter((signer) =>
      is_only_for_me
        ? signer.name === 'johndoe21'
        : signer.privilege === 'signer'
    )
    .every((signer) => {
      return (
        signer.signatures.signature.length > 0 ||
        signer.signatures.initial.length > 0 ||
        signer.signatures.stamp.length > 0
      );
    });

  const loggedSigner = signers.filter(
    (signer) => signer.name === 'johndoe21'
  )[0];

  return (
    <Fragment>
      <Dialog
        open={openSignConfirmationDialog}
        onOpenChange={setOpenSignConfirmationDialog}
      >
        <DialogContent
          showCloseIcon={true}
          className="h-screen w-screen max-w-full !rounded-none p-0"
        >
          <div className="w-full flex justify-center items-start mt-36 px-2">
            <div className="flex justify-center flex-col lg:flex-row items-center gap-5">
              {' '}
              <Image
                src="/images/doc-sent.svg"
                width={315}
                height={270}
                className="flex-none"
                alt="Document Sent"
              />
              <div className="text-center lg:text-start">
                <p className="text-base font-semibold">
                  {t('signDocConfirmationModal.title')}
                </p>

                {loggedSigner?.privilege === 'read_only' ? (
                  <Button
                    onClick={() => {
                      setOpenSignConfirmationDialog(false);
                      setOpen();
                      router.push('/dashboard?');
                      resetSignatureDraft();
                    }}
                    size="lg"
                    className="!font-bold sign-button-shadow px-12 gap-2 h-11 w-full lg:w-auto mt-6"
                  >
                    {d('sidebar.dashboard')}
                  </Button>
                ) : (
                  <>
                    {' '}
                    <p className="text-sm mt-3">
                      {t('signDocConfirmationModal.subtitle')}
                    </p>
                    <div className="flex flex-col lg:flex-row gap-2 items-center mt-6">
                      <Button
                        onClick={() => {
                          setOpenSignConfirmationDialog(false);
                          nextStep();
                        }}
                        size="lg"
                        className="!font-bold sign-button-shadow px-8 gap-2 lg:w-auto max-[767px]:max-w-[230px] w-full"
                      >
                        <BrushIcon
                          pathClassName="fill-white"
                          strokeClassName="stroke-white"
                          svgClassName="flex-none"
                        />
                        {t('signDocConfirmationModal.signNow')}
                      </Button>
                      <Button
                        onClick={() => {
                          localStorage.removeItem('activeStep');
                          resetSignatureDraft();
                          router.push('/dashboard?');
                        }}
                        size="lg"
                        variant="secondary"
                        className="!font-bold px-6 bg-white"
                      >
                        {t('signDocConfirmationModal.signLater')}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Navbar />
      <div className="w-full lg:overflow-hidden">
        {/* Main Content */}
        <div className="flex flex-col flex-1 justify-between bg-[#F9F9F9] h-[calc(100vh-3.5rem)] lg:mt-20 mt-32">
          {/* Signature Setting Section */}
          <div className="flex flex-col lg:flex-row justify-between">
            {/* Left sidebar */}
            <div className="bg-white lg:sticky px-4 py-6 border-r w-full lg:max-w-xs border-r-gray-6 lg:h-[calc(100vh-3.5rem)] overflow-y-auto lg:pb-32 mr-20">
              <div className=" items-center justify-between gap-20 hidden lg:flex">
                <h5 className="whitespace-nowrap">{t('setSignature')}</h5>
                <div className="flex items-center gap-x-3">
                  <PeopleIcon pathClassName="fill-primary" />{' '}
                  <h6 className="text-primary ">{t('set')}</h6>
                </div>
              </div>

              {signers
                .filter((signer) =>
                  is_only_for_me
                    ? signer.name === 'johndoe21'
                    : signer.privilege === 'signer'
                )
                .map((signer) => (
                  <CollapsibleSigner
                    color={signer.color}
                    userId={signer.id}
                    name={signer.name}
                    currentPage={currentPage.toString()}
                    key={signer.id}
                    pages={signer.signatures.pages}
                    initial={signer.signatures.initial.length}
                    signature={signer.signatures.signature.length}
                    stamp={signer.signatures.stamp.length}
                    isShowLogo={signer.signature_settings.show_logo}
                    isShowName={signer.signature_settings.show_name}
                    isShowQR={signer.signature_settings.show_qr}
                    isShowSignature={signer.signature_settings.show_signature}
                  />
                ))}
            </div>

            <div className="bg-white mx-4 mb-6 sticky lg:hidden">
              {pdf_file.map((pdf, idx) => (
                <Collapsible
                  key={pdf.id}
                  headerClassName="border rounded-lg px-3"
                  header={
                    <h5 className="!font-medium flex gap-2 items-center">
                      <MenuBookIcon />
                      {pdf.name}
                    </h5>
                  }
                  autoOpen={false}
                  className={cn({
                    'mt-3': idx !== 0
                  })}
                >
                  <p className="text-xs text-gray-2 mt-2">Pages: 12</p>
                  <PdfDocumentListRenderer url={pdf.file} />
                </Collapsible>
              ))}
            </div>

            {/* PDF Viewer Section */}
            <div className="lg:h-[calc(100vh-3.5rem)] overflow-y-scroll lg:pb-24 lg:px-0 px-4 pb-20 w-full lg:max-w-3xl">
              <div className="lg:mt-10 lg:pb-10 relative">
                <div className="overflow-x-auto">
                  <div className="border canvas-wrapper">
                    <PdfRenderer
                      currentPage={currentPage}
                      numPages={numPages}
                      scale={scale}
                      setNumPages={setNumPages}
                      url={pdf_file[0]?.file}
                    />
                    {/* Signature Render */}
                    {signers.map((signer) => (
                      <SignatureRender
                        key={signer.id}
                        signer={signer}
                        currentPage={currentPage}
                        numPages={numPages}
                        changeSignaturePosition={changeSignaturePosition}
                        changeSignatureSize={changeSignatureSize}
                        deleteSignature={deleteSignature}
                      />
                    ))}
                  </div>
                </div>
                {/* Pagination */}
                <PdfPagination
                  currentPage={currentPage}
                  numPages={numPages}
                  scale={scale}
                  setCurrentPage={setCurrentPage}
                  setScale={setScale}
                />
              </div>
            </div>

            {/* Right sidebar */}
            <div className="bg-white px-4 py-6 border-r sticky border-r-gray-6 h-[calc(100vh-10.4rem)] overflow-y-auto max-w-[15rem] min-w-[15rem] ml-40 hidden lg:block">
              {pdf_file.map((pdf, idx) => (
                <Collapsible
                  key={pdf.id}
                  headerClassName="border-b px-0"
                  header={
                    <>
                      {pdf.name.length > 30 ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <p className="font-semibold text-sm my-1">
                                {pdf.name
                                  .split('')
                                  .splice(0, 15)
                                  .join('')
                                  .concat('...pdf')}
                              </p>
                            </TooltipTrigger>
                            <TooltipContent align="start" side="left">
                              <p>{pdf.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <p className="font-semibold text-sm my-1">{pdf.name}</p>
                      )}
                    </>
                  }
                  autoOpen={false}
                  className={cn({
                    'mt-3': idx !== 0
                  })}
                >
                  <p className="text-xs text-gray-2 mt-2">Pages: 12</p>
                  <PdfDocumentListRenderer url={pdf.file} />
                </Collapsible>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div
        className={cn(
          'custom-shadow p-5 h-20 absolute bottom-0 left-0 right-0 bg-white flex justify-center lg:justify-end gap-4 z-40 w-full',
          {
            'bottom-[3.58rem]': getMobileOperatingSystem() === 'iOS'
          }
        )}
      >
        <Button
          variant="secondary"
          className="!font-bold custom-shadow bg-white max-[460px]:px-14"
          onClick={() => previousStep()}
        >
          {t('back')}
        </Button>

        <AlertDialog>
          <AlertDialogTrigger
            className="w-full lg:w-fit"
            disabled={!hasSignerWithSignature}
          >
            <Button
              disabled={!hasSignerWithSignature}
              className="!font-bold sign-button-shadow max-[460px]:px-14"
            >
              {t('continue')}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-md py-8">
            <AlertDialogHeader className="flex justify-center items-center">
              <Image
                src="/images/send-doc.svg"
                height={100}
                width={90}
                alt="Send Document"
                className="mb-5"
              />
              <AlertDialogTitle>{t('sendDocModal.title')}</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-2 text-sm text-center">
                {t.rich('sendDocModal.subtitle', {
                  br: () => <br></br>
                })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4 !justify-center items-center gap-3">
              <AlertDialogCancel className="custom-shadow h-[50px] max-[767px]:max-w-[100px] max-[767px]:px-5 w-full">
                {t('sendDocModal.cancel')}
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-[50px] max-[767px]:max-w-[100px] max-[767px]:px-5 w-full"
                onClick={() => setOpenSignConfirmationDialog(true)}
              >
                {t('sendDocModal.send')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Fragment>
  );
};

interface PdfDocumentListRendererProps {
  url: string;
}

const PdfDocumentListRenderer = ({ url }: PdfDocumentListRendererProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const { width, ref } = useResizeDetector();
  return (
    <div ref={ref} className="w-full">
      <div className="flex-1 max-h-screen">
        <div>
          <Document
            file={url}
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
            {Array.from(Array(numPages).keys()).map((page, idx) => (
              <div
                key={idx}
                className="border border-input mt-2 h-[205px] overflow-hidden relative"
              >
                <Page
                  width={width ? width : 1}
                  height={159}
                  loading={
                    <div className="flex justify-center z-10">
                      <Loader2 className="my-24 h-6 w-6 animate-spin text-primary z-[9999]" />
                    </div>
                  }
                  pageNumber={idx + 1}
                />
                <div className="h-[46px] absolute bottom-0 left-0 right-0 bg-gray-6 p-2 flex justify-between items-center">
                  <h5>{idx + 1}</h5>
                  <div className="relative flex">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'rounded-full flex items-center justify-center w-[25px] h-[25px]',
                          'bg-red-400'
                        )}
                      >
                        <p className="font-bold uppercase text-sm">W</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 -m-1.5 z-10">
                      <div
                        className={cn(
                          'rounded-full flex items-center justify-center w-[25px] h-[25px]',
                          'bg-green-400'
                        )}
                      >
                        <p className="font-bold uppercase text-sm">R</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};

// Component for rendering each signer's signature
interface SignatureRenderProps {
  signer: Signer;
  currentPage: number;
  numPages: number;
  changeSignaturePosition: Function;
  changeSignatureSize: Function;
  deleteSignature: Function;
}

const SignatureRender: React.FC<SignatureRenderProps> = ({
  signer,
  currentPage,
  numPages,
  changeSignaturePosition,
  changeSignatureSize,
  deleteSignature
}) => {
  return (
    <>
      {signer.signatures.signature.map((item) =>
        Number(item.page) === currentPage && numPages !== 0 ? (
          <RndSignature
            signer={signer}
            key={item.id}
            {...item}
            currentPage={currentPage}
            changeSignaturePosition={changeSignaturePosition}
            changeSignatureSize={changeSignatureSize}
            deleteSignature={deleteSignature}
          />
        ) : null
      )}
      {signer.signatures.stamp.map((item, idx) =>
        Number(item.page) === currentPage ? (
          <RndStamp
            key={item.id}
            {...item}
            index={idx + 1}
            signer={signer}
            currentPage={currentPage}
            changeSignaturePosition={changeSignaturePosition}
            changeSignatureSize={changeSignatureSize}
            deleteSignature={deleteSignature}
          />
        ) : null
      )}
      {signer.signatures.initial.map((item) =>
        Number(item.page) === currentPage ? (
          <RndInitial
            key={item.id}
            {...item}
            signer={signer}
            currentPage={currentPage}
            changeSignaturePosition={changeSignaturePosition}
            changeSignatureSize={changeSignatureSize}
            deleteSignature={deleteSignature}
          />
        ) : null
      )}
    </>
  );
};

// Rnd Component for Signature
interface RndSignatureProps {
  id: string;
  width: number;
  height: number;
  pos: { x: number; y: number };
  signer: Signer;
  currentPage: number;
  changeSignaturePosition: Function;
  changeSignatureSize: Function;
  deleteSignature: Function;
}

const RndSignature: React.FC<RndSignatureProps> = ({
  id,
  width,
  height,
  pos,
  signer,
  changeSignaturePosition,
  changeSignatureSize,
  deleteSignature
}) => {
  const { width: resizeWidth, ref } = useResizeDetector();

  return (
    <Rnd
      key={id}
      className={cn(
        'z-10 text-center flex flex-col items-center justify-center box-border hover:border border-dashed border-primary relative group',
        signer.color
      )}
      bounds=".canvas-wrapper"
      lockAspectRatio
      minHeight={70}
      minWidth={70}
      onResizeStop={(_, __, ref) =>
        changeSignatureSize(
          Number(ref.style.width.split('px')[0]),
          Number(ref.style.height.split('px')[0]),
          id,
          signer.id
        )
      }
      onDragStop={(e, d) => changeSignaturePosition(d.x, d.y, id, signer.id)}
      size={{ width: width, height: height }}
      default={{ x: pos.x, y: pos.y, width: width, height: height }}
    >
      <div className="absolute -left-1 -top-1 dot cursor-n-resize opacity-0 group-hover:opacity-100 transition-opacity">
        <Ellipse />
      </div>
      <button
        onClick={() => deleteSignature(id, signer.id, 'signature')}
        className="absolute -right-4 -top-4 dot z-[99999] bg-destructive p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <DeleteIcon pathClassName="fill-white" />
      </button>
      <div className="absolute -left-1 -bottom-1 dot opacity-0 group-hover:opacity-100 transition-opacity">
        <Ellipse />
      </div>
      <div className="absolute -right-1 -bottom-1 dot opacity-0 group-hover:opacity-100 transition-opacity">
        <Ellipse />
      </div>
      <div
        className={cn('items-center justify-between px-2 flex h-full gap-2', {
          'justify-center':
            signer.signature_settings.show_qr &&
            !signer.signature_settings.show_signature
        })}
      >
        {signer.signature_settings.show_qr ? (
          <QRCodeCanvas
            bgColor={signer.color.split('[')[1].split('/')[0].split(']')[0]}
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
            ref={ref}
            className={cn('flex justify-center flex-col items-center w-6/12', {
              'w-full': !signer.signature_settings.show_qr
            })}
          >
            {' '}
            {signer.signature_settings.show_signature ? (
              <DownloadIcon svgClassName="flex-none" />
            ) : null}
            {signer.signature_settings.show_name ? (
              <p
                className="font-semibold text-sm truncate text-ellipsis"
                style={{
                  maxWidth: resizeWidth
                }}
              >
                {signer.name}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </Rnd>
  );
};

interface RndStampProps {
  id: string;
  height: number;
  width: number;
  index: number;
  pos: { x: number; y: number };
  signer: Signer;
  currentPage: number;
  changeSignaturePosition: Function;
  changeSignatureSize: Function;
  deleteSignature: Function;
}

const RndStamp: React.FC<RndStampProps> = ({
  id,
  height,
  index,
  pos,
  signer,
  changeSignaturePosition,
  changeSignatureSize,
  deleteSignature
}) => {
  return (
    <Rnd
      key={id}
      className={`z-10 text-center flex flex-col items-center justify-center py-2 box-border hover:border border-dashed border-primary relative group ${signer.color}`}
      bounds=".canvas-wrapper"
      lockAspectRatio
      minHeight={71}
      minWidth={70}
      onResize={(_, __, ref) =>
        changeSignatureSize(
          Number(ref.style.width.split('px')[0]),
          Number(ref.style.height.split('px')[0]),
          id,
          signer.id
        )
      }
      onDragStop={(e, d) => changeSignaturePosition(d.x, d.y, id, signer.id)}
      size={{
        width: height,
        height: height
      }}
      default={{
        x: pos.x,
        y: pos.y,
        width: height,
        height: height
      }}
    >
      <div className="absolute -left-1 -top-1 dot cursor-n-resize opacity-0 group-hover:opacity-100 transition-opacity">
        <Ellipse />
      </div>
      <button
        onClick={() => deleteSignature(id, signer.id, 'stamp')}
        className="absolute -right-4 -top-4 dot z-[99999] bg-destructive p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <DeleteIcon pathClassName="fill-white" />
      </button>
      <div className="absolute -left-1 -bottom-1 dot opacity-0 group-hover:opacity-100 transition-opacity">
        <Ellipse />
      </div>
      <div className="absolute -right-1 -bottom-1 dot opacity-0 group-hover:opacity-100 transition-opacity">
        <Ellipse />
      </div>
      <div className="items-center justify-center flex-col flex  h-full">
        <div className="relative flex justify-center items-center">
          <div className="absolute left-0 right-0 top-0 bottom-0 p-3">
            <div className="relative flex justify-center items-center h-full w-full">
              <div className="absolute flex justify-center items-center p-5 bg-[url('/images/qr-code.png')] bg-contain h-full w-full">
                <p
                  className={cn('font-semibold px-2 py-0.5 bg-[#FCC918]/90', {
                    'bg-[#1c3d9f]/90': index % 2 == 0
                  })}
                >
                  {signer.name.split('')[0]}
                </p>
              </div>
            </div>
          </div>
          <StampBackgroundIcon
            height={Number(height) - 10}
            width={Number(height) - 10}
            pathClassName={cn({
              'fill-[#1c3d9f]': index % 2 == 0
            })}
          />
          <StampBackgroundIcon
            height={Number(height) - 10}
            width={Number(height) - 10}
            pathClassName="fill-[#4D4D4D]"
            svgClassName="absolute top-[0.5px] left-[0.5px] -z-10"
          />
        </div>
      </div>
    </Rnd>
  );
};

interface RndInitialProps {
  id: string;
  width: number;
  height: number;
  pos: { x: number; y: number };
  signer: Signer;
  currentPage: number;
  changeSignaturePosition: Function;
  changeSignatureSize: Function;
  deleteSignature: Function;
}

const RndInitial: React.FC<RndInitialProps> = ({
  id,
  width,
  height,
  pos,
  signer,
  changeSignaturePosition,
  changeSignatureSize,
  deleteSignature
}) => {
  return (
    <Rnd
      key={id}
      className={cn(
        'z-10 text-center flex flex-col items-center justify-center py-2 box-border hover:border border-dashed border-primary relative group',
        signer.color
      )}
      bounds=".canvas-wrapper"
      lockAspectRatio
      minHeight={70}
      minWidth={112}
      onResizeStop={(_, __, ref) =>
        changeSignatureSize(
          Number(ref.style.width.split('px')[0]),
          Number(ref.style.height.split('px')[0]),
          id,
          signer.id
        )
      }
      onDragStop={(e, d) => changeSignaturePosition(d.x, d.y, id, signer.id)}
      default={{
        x: pos.x,
        y: pos.y,
        width: width,
        height: height
      }}
    >
      <div className="absolute -left-1 -top-1 dot cursor-n-resize opacity-0 group-hover:opacity-100 transition-opacity">
        <Ellipse />
      </div>
      <button
        onClick={() => deleteSignature(id, signer.id, 'initial')}
        className="absolute -right-4 -top-4 dot z-[99999] bg-destructive p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <DeleteIcon pathClassName="fill-white" />
      </button>
      <div className="absolute -left-1 -bottom-1 dot opacity-0 group-hover:opacity-100 transition-opacity">
        <Ellipse />
      </div>
      <div className="absolute -right-1 -bottom-1 dot opacity-0 group-hover:opacity-100 transition-opacity">
        <Ellipse />
      </div>
      <div className="items-center justify-center flex-col flex  h-full">
        <DownloadIcon svgClassName="flex-none" height={30} width={30} />
      </div>
    </Rnd>
  );
};

const Ellipse = ({ className }: { className?: string }) => {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="4.5"
        cy="4.5"
        r="3.5"
        fill="white"
        stroke="#0D5FB3"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Step2;
