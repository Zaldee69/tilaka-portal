// import React, { Fragment, useState } from 'react';
// import Navbar from './Navbar';
// import { Button } from '@/components/ui/button';
// import useSigningStore from '@/zustand/store';
// import { Document, Page, pdfjs } from 'react-pdf';

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger
// } from '@/components/ui/dialog';

// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';
// import { ArrowDown, Loader2 } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { QRCodeCanvas } from 'qrcode.react';
// import {
//   DownloadIcon,
//   PageIcon,
//   PlaceTTEIcon2,
//   SmallStampIcon
// } from '../../../../../public/icons/icons';
// import ScrollIntoView from 'react-scroll-into-view';
// import { useResizeDetector } from 'react-resize-detector';
// import Image from 'next/image';

// import { Drawer, DrawerContent } from '@/components/ui/drawer';
// import SigningVerificationDialog from '../../SigningVerification';
// import CreateSignatureAttribute from '../../CreateSignatureAttribute';
// import { useTranslations } from 'next-intl';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// const Step3 = () => {
//   const { pdf_file, signers, changeSignatureImage } = useSigningStore();
//   const [numPages, setNumPages] = useState<number>();
//   const [openOverlay, setOpenOverlay] = useState<boolean>(true);
//   const [openDialog, setOpenDialog] = useState<boolean>(false);
//   const [openDrawer, setOpenDrawer] = useState<boolean>(false);
//   const [openSetSignatureAttribute, setOpenSetSignatureAttribute] =
//     useState<boolean>(false);
//   const [openedSignature, setOpenedSignature] = useState({
//     signatureId: '',
//     userId: ''
//   });
//   const { width, ref } = useResizeDetector();

//   //for simulation
//   const [signature, setSignature] = useState([
//     {
//       id: '1',
//       image: ''
//     },
//     {
//       id: '2',
//       image: ''
//     },
//     {
//       id: '3',
//       image: ''
//     },
//     {
//       id: '4',
//       image: ''
//     }
//   ]);

//   const t = useTranslations('SigningDialog');

//   const user = signers.filter((signer) => signer.name === 'johndoe21')[0];

//   return (
//     <Fragment>
//       <Navbar />

//       <div
//         className={cn('w-full relative min-h-screen', {
//           'overflow-hidden': openOverlay
//         })}
//       >
//         {openOverlay ? (
//           <div
//             className="absolute z-50 left-0 right-0 bottom-0 top-[100px] md:top-[62px] w-full min-h-screen"
//             style={{ backgroundColor: 'rgba(0, 0, 0, .5)' }}
//           >
//             <div className=" p-3 bg-[#F8FFE9]">
//               <div className="w-full flex flex-col md:flex-row justify-between items-center space-y-2">
//                 <p className="text-gray-2 text-sm text-center md:text-start">
//                   {t('reviewDoc')}
//                 </p>
//                 <Button onClick={() => setOpenOverlay(false)}>
//                   {t('viewDoc')}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ) : null}
//         <div className="flex  flex-1 justify-center h-[calc(100vh-3.5rem)]">
//           <div className="sticky max-w-3xl py- w-full h-[calc(100vh-3.5rem)]">
//             <div ref={ref} className="flex-1 max-h-screen relative mt-24">
//               <CreateSignatureAttribute
//                 continueCallback={(image) => {
//                   changeSignatureImage(
//                     image,
//                     openedSignature.signatureId,
//                     openedSignature.userId
//                   );
//                   const allSignaturesHaveImages =
//                     user.signatures.signature.every(
//                       (signature) => signature.image !== ''
//                     );

//                   if (allSignaturesHaveImages) {
//                     setOpenDrawer(true);
//                   }
//                 }}
//                 showtrigger={false}
//                 open={openSetSignatureAttribute}
//                 setOpen={setOpenSetSignatureAttribute}
//               />
//               <Document
//                 className="relative"
//                 file={pdf_file[0]?.file}
//                 onLoadSuccess={({ numPages }) => {
//                   setTimeout(() => {
//                     setNumPages(numPages);
//                   }, 200);
//                 }}
//                 loading={
//                   <div className="flex justify-center items-center h-full">
//                     <Loader2 className="my-24 h-6 w-6 animate-spin text-primary" />
//                   </div>
//                 }
//               >
//                 <Drawer open={openDrawer}>
//                   <DrawerContent
//                     drawerClassName="bg-transparent"
//                     className="py-5 px-2 md:px-0 rounded-none drawer-shadow"
//                   >
//                     <div className="flex flex-col md:flex-row justify-center items-center gap-10">
//                       <div className="flex flex-col md:flex-row items-center max-w-xl gap-4">
//                         <Image
//                           src="/images/done-signing.svg"
//                           height={80}
//                           width={80}
//                           alt="Done Signing"
//                         />
//                         <div className="text-center md:text-start">
//                           <h5>{t('signingDoneDrawer.title')}</h5>
//                           <p className="text-sm mt-2">
//                             {t.rich('signingDoneDrawer.subtitle', {
//                               br: () => <br></br>
//                             })}{' '}
//                           </p>
//                         </div>
//                       </div>
//                       <SigningVerificationDialog>
//                         <Button className="font-semibold h-12 text-base w-full md:w-fit">
//                           {t('signingDoneDrawer.done')}
//                         </Button>
//                       </SigningVerificationDialog>
//                     </div>
//                   </DrawerContent>
//                 </Drawer>
//                 <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//                   <DialogTrigger className="absolute md:top-5 -top-10 z-10 md:-left-[200px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                     <Button className="custom-shadow font-semibold gap-4 px-6 bg-accent">
//                       {t('startSigning')} <ArrowDown />
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent
//                     className="px-6 max-w-[460px]"
//                     closeIconClassName="top-7 right-6"
//                     showCloseIcon={false}
//                   >
//                     <DialogHeader className="mt-2">
//                       <DialogTitle>{t('signingOptionModal.title')}</DialogTitle>
//                       <br />
//                       <DialogDescription className="text-gray-2">
//                         {t('signingOptionModal.subtitle')}
//                       </DialogDescription>
//                     </DialogHeader>
//                     <div className="border border-gray-6 rounded-xl p-3">
//                       <div className="flex justify-start gap-16">
//                         {/* Pages */}
//                         <div>
//                           <p className="text-gray-2 text-xs">
//                             {t('step2.page')}
//                           </p>
//                           <div className="flex items-center gap-2 mt-3">
//                             <PageIcon />{' '}
//                             <p className="text-sm">
//                               {user?.signatures?.pages
//                                 .sort()
//                                 .map((item, index, array) => {
//                                   const isLastItem = index === array.length - 1;
//                                   return isLastItem ? item : item + ',';
//                                 })}
//                             </p>
//                           </div>
//                         </div>
//                         {/* Signatures */}
//                         <div>
//                           <p className="text-gray-2 text-xs">
//                             {t('step2.signature')}
//                           </p>
//                           <div className="flex items-center gap-2 mt-3">
//                             <PlaceTTEIcon2 />{' '}
//                             <p className={cn('text-sm')}>
//                               {user?.signatures.signature.length ?? 0}
//                             </p>
//                           </div>
//                         </div>
//                         {/* Stamps */}
//                         <div>
//                           <p className="text-gray-2 text-xs">e-Meterai</p>
//                           <div className="flex items-center gap-2 mt-3">
//                             <SmallStampIcon />{' '}
//                             <p className="text-sm">
//                               {' '}
//                               {user?.signatures.stamp.length ?? 0}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="w-full mt-3">
//                       <ScrollIntoView
//                         alignToTop={false}
//                         selector={`#${user?.signatures.signature[0].id}`}
//                       >
//                         <Button
//                           onClick={() => setOpenDialog(false)}
//                           className="w-full font-semibold sign-button-shadow"
//                         >
//                           {t('signingOptionModal.button1')}
//                         </Button>
//                       </ScrollIntoView>
//                       <Button
//                         onClick={() => {
//                           setOpenDrawer(true);
//                           setOpenDialog(false);
//                         }}
//                         className="mt-4 w-full custom-shadow text-primary font-semibold"
//                         variant="ghost"
//                       >
//                         {t('signingOptionModal.button2')}
//                       </Button>
//                     </div>
//                   </DialogContent>
//                 </Dialog>

//                 {Array.from(Array(numPages).keys()).map((_, idx) => (
//                   <Page
//                     width={width ? width : 1}
//                     className={`border relative border-input md:mt-5 mt-44 canvas-wrapper-${idx + 1}`}
//                     key={idx}
//                     loading={
//                       <div className="flex justify-center z-10">
//                         <Loader2 className="my-24 h-6 w-6 animate-spin text-primary z-[9999]" />
//                       </div>
//                     }
//                     pageNumber={idx + 1}
//                   >
//                     {signers.map((signer) =>
//                       signer.signatures.signature.map(
//                         (signature) =>
//                           Number(signature.page) === Number(idx) + 1 &&
//                           signer.name === 'johndoe21' && (
//                             <div id={signature.id} key={idx}>
//                               {Number(signature.page) === Number(idx) + 1 && (
//                                 <div
//                                   style={{
//                                     transform: `translateY(-400px)`
//                                   }}
//                                   className="absolute -left-52 z-10"
//                                 >
//                                   {signature.image &&
//                                   signature.image?.length > 1 ? (
//                                     <ScrollIntoView
//                                       alignToTop={false}
//                                       selector={`#${signature.id}`}
//                                     >
//                                       <Button className="custom-shadow font-semibold gap-4 px-6 bg-accent">
//                                         Selanjutnya <ArrowDown />
//                                       </Button>
//                                     </ScrollIntoView>
//                                   ) : (
//                                     <div className="relative">
//                                       <Image
//                                         src="/images/sign-here-bg.svg"
//                                         height={50}
//                                         width={201}
//                                         alt="Sign Here"
//                                       />
//                                       <p className="text-gray-1 absolute top-6 text-sm left-8 font-semibold">
//                                         {t('signHere')}
//                                       </p>
//                                     </div>
//                                   )}
//                                 </div>
//                               )}
//                               <div
//                                 onClick={() => {
//                                   setOpenedSignature({
//                                     signatureId: signature.id,
//                                     userId: signer.id
//                                   });
//                                   setOpenSetSignatureAttribute(true);
//                                 }}
//                                 style={{
//                                   width: `${signature.width}px`,
//                                   height: `${signature.height}px`,
//                                   transform: `translate(50px, -400px)`
//                                 }}
//                                 className={`absolute py-9 z-10 border box-border border-dashed border-primary cursor-pointer ${signer.color}`}
//                                 key={signature.id}
//                               >
//                                 <div
//                                   className={cn(
//                                     'items-center justify-between px-2 flex h-full gap-2',
//                                     {
//                                       'justify-center':
//                                         signer.signature_settings.show_qr &&
//                                         !signer.signature_settings
//                                           .show_signature
//                                     }
//                                   )}
//                                 >
//                                   {signer.signature_settings.show_qr ? (
//                                     <QRCodeCanvas
//                                       bgColor={
//                                         signer.color
//                                           .split('[')[1]
//                                           .split('/')[0]
//                                           .split(']')[0]
//                                       }
//                                       imageSettings={
//                                         signer.signature_settings.show_logo
//                                           ? {
//                                               src: '/images/logo.svg',
//                                               x: undefined,
//                                               y: undefined,
//                                               height: 50,
//                                               width: 50,
//                                               excavate: true
//                                             }
//                                           : undefined
//                                       }
//                                       className={
//                                         signer.signature_settings.show_name ||
//                                         signer.signature_settings.show_signature
//                                           ? 'canvas'
//                                           : 'canvas-full'
//                                       }
//                                       value="https://reactjs.org/"
//                                     />
//                                   ) : null}
//                                   {signer.signature_settings.show_signature ? (
//                                     <div
//                                       className={cn(
//                                         'flex justify-center flex-col items-center w-6/12',
//                                         {
//                                           'w-full':
//                                             !signer.signature_settings.show_qr
//                                         }
//                                       )}
//                                     >
//                                       {' '}
//                                       {signer.signature_settings
//                                         .show_signature ? (
//                                         signature.image ? (
//                                           <img src={signature.image} />
//                                         ) : (
//                                           <DownloadIcon svgClassName="flex-none" />
//                                         )
//                                       ) : null}
//                                       {signer.signature_settings.show_name ? (
//                                         <p className="font-semibold text-xs">
//                                           {signer.name}
//                                         </p>
//                                       ) : null}
//                                     </div>
//                                   ) : null}
//                                 </div>
//                               </div>
//                             </div>
//                           )
//                       )
//                     )}
//                   </Page>
//                 ))}
//               </Document>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default Step3;

// For simulation

import React, { Fragment, useContext, useState } from 'react';
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

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
import PdfPagination from '@/components/PdfPagination';
import { pdfFile } from '@/constants';
import { OpenDialogContext } from '../SigningDialog';
import { useRouter } from '@/navigation';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Step3 = () => {
  const { pdf_file, signers, resetSignatureDraft } = useSigningStore();
  const [numPages, setNumPages] = useState<number>(1);
  const [openOverlay, setOpenOverlay] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openSetSignatureAttribute, setOpenSetSignatureAttribute] =
    useState<boolean>(false);
  const [openedSignature, setOpenedSignature] = useState({
    signatureId: '',
    userId: ''
  });
  const { width, ref } = useResizeDetector();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);

  const { setOpen } = useContext(OpenDialogContext);

  const router = useRouter();

  //for simulation
  const [signatures, setSignatures] = useState([
    {
      id: '1',
      page: 1,
      image: ''
    },
    {
      id: '2',
      page: 2,
      image: ''
    },
    {
      id: '3',
      page: 3,
      image: ''
    },
    {
      id: '4',
      page: 4,
      image: ''
    }
  ]);

  const t = useTranslations('SigningDialog');

  const user = signers.filter((signer) => signer.name === 'johndoe21')[0];

  return (
    <Fragment>
      <Navbar />
      <div
        className={cn('w-full relative min-h-screen overflow-y-scroll', {
          'overflow-hidden': openOverlay
        })}
      >
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
        <div className="flex flex-1 justify-center h-[calc(100vh-3.5rem)]">
          <div className="sticky max-w-3xl w-full h-[calc(100vh-3.5rem)]">
            <div ref={ref} className="flex-1 relative mt-24 pb-5">
              <CreateSignatureAttribute
                continueCallback={(image) => {
                  setSignatures((prevSignatures) =>
                    prevSignatures.map((signature) =>
                      signature.id === openedSignature.userId
                        ? { ...signature, image }
                        : signature
                    )
                  );

                  if (openedSignature.signatureId === '4') setOpenDrawer(true);
                }}
                showtrigger={false}
                open={openSetSignatureAttribute}
                setOpen={setOpenSetSignatureAttribute}
              />

              <Document
                file={pdfFile}
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
                  <DrawerContent className="py-5 px-2 md:px-0 rounded-none drawer-shadow">
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
                      <div className="flex justify-center items-center md:flex-row flex-col-reverse w-full md:w-fit gap-5 md:gap-10">
                        <Button
                          onClick={() => {
                            resetSignatureDraft();
                            setOpen();
                            router.push('/dashboard/documents');
                          }}
                          variant="ghost"
                          className="text-primary font-semibold w-fit px-0"
                        >
                          {t('signingDoneDrawer.cancel')}
                        </Button>
                        <SigningVerificationDialog>
                          <Button className="font-semibold md:h-12 text-base w-full max-w-[260px] md:px-10 md:w-fit">
                            {t('signingDoneDrawer.signing')}
                          </Button>
                        </SigningVerificationDialog>
                      </div>
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
                    className="px-6 max-w-md justify-center"
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
                    <div className="md:w-full flex items-center flex-col mt-3">
                      <ScrollIntoView
                        alignToTop={false}
                        selector={`#signature1`}
                      >
                        <Button
                          onClick={() => setOpenDialog(false)}
                          className="max-[767px]:max-w-[260px] md:px-auto font-semibold sign-button-shadow"
                        >
                          {t('signingOptionModal.button1')}
                        </Button>
                      </ScrollIntoView>
                      <Button
                        onClick={() => {
                          setOpenDrawer(true);
                          setOpenDialog(false);
                        }}
                        className="mt-4 max-[767px]:max-w-[260px] w-full custom-shadow text-primary font-semibold"
                        variant="ghost"
                      >
                        {t('signingOptionModal.button2')}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {Array.from(Array(numPages).keys()).map((_, idx) => (
                  <Page
                    scale={scale}
                    width={width ? width : 1}
                    className={`border relative border-input md:mt-5 mt-44 canvas-wrapper-${idx + 1} curss`}
                    key={idx}
                    loading={
                      <div className="flex justify-center z-10">
                        <Loader2 className="my-24 h-6 w-6 animate-spin text-primary z-[9999]" />
                      </div>
                    }
                    pageNumber={idx + 1}
                  >
                    {signers.map((signer) =>
                      signatures.map((signature) =>
                        Number(signature.id) == Number(idx + 1) ? (
                          <div id={`signature${idx + 1}`} key={idx}>
                            (
                            <div
                              style={{
                                transform: `translateY(-400px)`
                              }}
                              className="absolute -left-52 z-10"
                            >
                              {signature.image &&
                              signature.image?.length > 1 ? (
                                <ScrollIntoView
                                  alignToTop={false}
                                  selector={`#signature${idx + 1}`}
                                >
                                  <Button className="custom-shadow font-semibold gap-4 px-6 bg-accent">
                                    Selanjutnya <ArrowDown />
                                  </Button>
                                </ScrollIntoView>
                              ) : (
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
                              )}
                            </div>
                            )
                            <div
                              onClick={() => {
                                setOpenedSignature({
                                  signatureId: signature.id,
                                  userId: signature.id
                                });
                                setOpenSetSignatureAttribute(true);
                              }}
                              style={{
                                width: `128px`,
                                height: `68px`,
                                transform: `translate(50px, -400px)`
                              }}
                              className={`absolute py-9 z-10 border box-border border-dashed border-primary cursor-pointer bg-[#F4EA89]/90`}
                              key={signature.id}
                            >
                              <div
                                className={cn(
                                  'items-center px-2 flex h-full gap-2 justify-center'
                                )}
                              >
                                {signature.image ? (
                                  <img src={signature.image} />
                                ) : (
                                  <DownloadIcon svgClassName="flex-none" />
                                )}
                              </div>
                            </div>
                          </div>
                        ) : null
                      )
                    )}
                  </Page>
                ))}
              </Document>
            </div>
            <div className="sticky bottom-5 mt-5 flex justify-center left-0 right-0 z-10">
              <div className="custom-shadow bg-white rounded-2xl flex items-center gap-2 px-2 py-2">
                <Button
                  onClick={() => setScale(scale - 0.2)}
                  variant="ghost"
                  className="p-0 h-5 w-5 hidden md:flex"
                >
                  <ZoomOut className="h-5 w-5" />
                </Button>
                <p className="text-sm hidden md:block">
                  {Math.round(scale * 100)}%
                </p>
                <Button
                  onClick={() => setScale(scale + 0.2)}
                  variant="ghost"
                  className="p-0 h-5 w-5 hidden md:flex"
                >
                  <ZoomIn className="h-5 w-5" />
                </Button>
                <Button
                  disabled={currentPage === 1}
                  // onClick={() => {
                  //   setCurrentPage(1);
                  //   const element = document.getElementById(`signature1`);
                  //   element?.scrollIntoView();
                  // }}
                  variant="ghost"
                  className="p-0 h-5 w-5"
                >
                  <ChevronFirst className="h-5 w-5" />
                </Button>
                <Button
                  // onClick={() => {
                  //   setCurrentPage(currentPage - 1);
                  //   const element = document.getElementById(
                  //     `signature${currentPage - 1}`
                  //   );
                  //   element?.scrollIntoView();
                  // }}
                  disabled={currentPage === 1}
                  variant="ghost"
                  className="p-0 h-5 w-5"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Select
                  value={currentPage.toString()}
                  // onValueChange={(value) => {
                  //   console.log(value);
                  //   setCurrentPage(Number(value));
                  //   const element = document.getElementById(
                  //     `signature${value}`
                  //   );
                  //   element?.scrollIntoView();
                  // }}
                >
                  <SelectTrigger className="h-8 border-none !w-[30px] font-semibold p-0">
                    <SelectValue placeholder="1" />
                  </SelectTrigger>
                  <SelectContent className="!w-[50px] ">
                    {Array.from(Array(numPages).keys()).map((_, idx) => (
                      <SelectItem key={idx + 1} value={(idx + 1).toString()}>
                        {idx + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm hidden md:block">of {numPages} Page(s)</p>

                <Button
                  disabled={currentPage === numPages}
                  // onClick={() => {
                  //   setCurrentPage(currentPage + 1);
                  //   const element = document.getElementById(
                  //     `signature${currentPage + 1}`
                  //   );
                  //   element?.scrollIntoView();
                  // }}
                  variant="ghost"
                  className="p-0 h-5 w-5"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <Button
                  disabled={currentPage === numPages}
                  // onClick={() => {
                  //   setCurrentPage(numPages);
                  //   const element = document.getElementById(
                  //     `signature${numPages}`
                  //   );
                  //   element?.scrollIntoView();
                  // }}
                  variant="ghost"
                  className="p-0 h-5 w-5"
                >
                  <ChevronLast className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Step3;
