'use client';
import React, { Fragment, useCallback, useRef, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import SignaturePad from 'react-signature-canvas';

import localFont from 'next/font/local';

import html2canvas from 'html2canvas';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import {
  DeleteIcon,
  GestureIcon,
  ImageIcon,
  TextFieldsIcon
} from '../../../public/icons/icons';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { cn, fileToBase64 } from '@/lib/utils';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import Dropzone from 'react-dropzone';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface SignatureFontType {
  type:
    | 'Adine-Kirnberg'
    | 'champignonaltswash'
    | 'FormalScript'
    | 'HerrVonMuellerhoff-Regular'
    | 'MrsSaintDelafield-Regular'
    | 'SCRIPTIN';
}

const adine = localFont({
  src: '../../../public/fonts/Adine-Kirnberg.ttf',
  display: 'swap'
});

const champignonaltswash = localFont({
  src: '../../../public/fonts/champignonaltswash.ttf',
  display: 'swap'
});

const formalScript = localFont({
  src: '../../../public/fonts/FormalScript.ttf',
  display: 'swap'
});

const hervon = localFont({
  src: '../../../public/fonts/HerrVonMuellerhoff-Regular.ttf',
  display: 'swap'
});

const mrSaint = localFont({
  src: '../../../public/fonts/MrsSaintDelafield-Regular.ttf',
  display: 'swap'
});

const scriptin = localFont({
  src: '../../../public/fonts/SCRIPTIN.ttf',
  display: 'swap'
});

interface Props {
  title?: string;
  subtitle?: string;
  //   continueCallback: (image: string) => void;
  triggerClassName?: string;
  children?: React.ReactNode;
}

const ChangeSignatureAttribute = (props: Props) => {
  const [tabsValue, setTabsValue] = React.useState<string>('text');
  const [open, setOpen] = useState(false);

  const [fontTypeValue, setFontTypeValue] =
    React.useState<SignatureFontType['type']>('Adine-Kirnberg');

  const t = useTranslations('changeSignatureDialog');

  const [images, setImages] = React.useState<{
    initial: string;
    signatures: string;
  }>({
    initial: '',
    signatures: ''
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [form, setForm] = React.useState<{
    signature: string;
    initial: string;
  }>({
    signature: 'Muhammad John Doe',
    initial: 'MJ'
  });

  const [pad, setPad] = React.useState<{
    signature: string;
    initial: string;
  }>({
    signature: '',
    initial: ''
  });

  const signatureRef = useRef<any>();

  const signatureCanvasRef = React.useRef<SignaturePad | null>();
  const initialCanvasRef = React.useRef<SignaturePad | null>();

  const onTabsValueChange = (value: string) => {
    setTabsValue(value);
  };

  const onToggleChange = (value: SignatureFontType['type']) => {
    setFontTypeValue(value);
  };

  const convertToDataURL = async () => {
    setIsLoading(true);
    await html2canvas(signatureRef.current, {
      height: 60,
      backgroundColor: 'rgba(0, 0, 0, 0)'
    }).then((e) => {
      setIsLoading(false);
      e.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      const image = e.toDataURL('image/png');
      //   props.continueCallback(image);
      setOpen(false);
    });
  };

  const onStopDraw = (name: 'signature' | 'initial') => {
    const getSignatureCanvasValue = () =>
      signatureCanvasRef.current?.toDataURL();
    const getInitialCanvasValue = () => initialCanvasRef.current?.toDataURL();
    setPad((prev) => ({
      ...prev,
      [name]:
        (name === 'initial'
          ? getInitialCanvasValue()
          : getSignatureCanvasValue()) || ''
    }));
  };

  const onDeleteDraw = (name: 'signature' | 'initial') => {
    setPad((prev) => ({
      ...prev,
      [name]: ''
    }));
  };

  const onDropSignature = useCallback((acceptedFile: File[]) => {
    const typeNotAllowed = acceptedFile[0].type !== 'image/png';
    const fileSizeTooBig = acceptedFile[0].size / 1024 / 1024 > 2;
    if (typeNotAllowed || fileSizeTooBig) {
      return toast.error('Failed to upload', {
        description: typeNotAllowed
          ? 'File type not allowed'
          : 'File size too big'
      });
    }

    const imageUrl = URL.createObjectURL(acceptedFile[0]);

    setImages((prev) => ({
      ...prev,
      signatures: imageUrl
    }));
  }, []);

  const onDropInitial = useCallback((acceptedFile: File[]) => {
    const typeNotAllowed = acceptedFile[0].type !== 'image/png';
    const fileSizeTooBig = acceptedFile[0].size / 1024 / 1024 > 2;
    if (typeNotAllowed || fileSizeTooBig) {
      return toast.error('Failed to upload', {
        description: typeNotAllowed
          ? 'File type not allowed'
          : 'File size too big'
      });
    }

    const imageUrl = URL.createObjectURL(acceptedFile[0]);

    setImages((prev) => ({
      ...prev,
      initial: imageUrl
    }));
  }, []);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value.toUpperCase()
    }));
  };

  const getFontType = () => {
    let fontType;
    switch (fontTypeValue) {
      case 'Adine-Kirnberg':
        fontType = adine.className;
        break;
      case 'champignonaltswash':
        fontType = champignonaltswash.className;
        break;
      case 'FormalScript':
        fontType = formalScript.className;
        break;
      case 'HerrVonMuellerhoff-Regular':
        fontType = hervon.className;
        break;
      case 'MrsSaintDelafield-Regular':
        fontType = mrSaint.className;
        break;
      case 'SCRIPTIN':
        fontType = scriptin.className;
        break;
      default:
        break;
    }
    return fontType;
  };

  const IS_DISABLED =
    (tabsValue === 'create-signature' &&
      signatureCanvasRef.current?.isEmpty()) ||
    (tabsValue === 'upload-image' && images.signatures.length < 1);

  return (
    <AlertDialog>
      <AlertDialogTrigger className={props.triggerClassName}>
        {props.children}
      </AlertDialogTrigger>

      <AlertDialogContent
        className={cn(
          'max-w-2xl w-full overflow-y-scroll h-screen md:overflow-hidden md:!h-[672px]',
          {
            '!overflow-y-scroll': tabsValue !== 'text'
          }
        )}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{t('title')}</AlertDialogTitle>
        </AlertDialogHeader>
        <Tabs
          onValueChange={onTabsValueChange}
          defaultValue="text"
          className="w-full"
        >
          <TabsList className="bg-transparent md:gap-5">
            <TabsTrigger
              className="md:py-2.5 md:px-5 data-[state=active]:bg-[#DFEFFF] data-[state=active]:text-primary gap-2 text-gray-2 border border-transparent hover:border-input box-border"
              value="text"
            >
              <TextFieldsIcon
                pathClassName={`${tabsValue === 'text' ? 'fill-primary' : 'fill-gray-2'}`}
              />
              <p className="max-[460px]:hidden">Text</p>
            </TabsTrigger>
            <TabsTrigger
              className="md:py-2.5 md:px-5 data-[state=active]:bg-[#DFEFFF] data-[state=active]:text-primary gap-2 text-gray-2 border border-transparent hover:border-input box-border"
              value="create-signature"
            >
              <GestureIcon
                pathClassName={`${tabsValue === 'create-signature' ? 'fill-primary' : 'fill-gray-2'}`}
              />{' '}
              <p className="max-[460px]:hidden">{t('createSignature')}</p>
            </TabsTrigger>
            <TabsTrigger
              className="md:py-2.5 md:px-5 data-[state=active]:bg-[#DFEFFF] data-[state=active]:text-primary gap-2 text-gray-2 border border-transparent hover:border-input box-border"
              value="upload-image"
            >
              <ImageIcon
                pathClassName={`${tabsValue === 'upload-image' ? 'fill-primary' : 'fill-gray-2'}`}
              />{' '}
              <p className="max-[460px]:hidden">{t('uploadImage')}</p>
            </TabsTrigger>
          </TabsList>
          <TabsContent className="flex flex-col gap-10" value="text">
            <div className="flex flex-col md:flex-row w-full md:items-center justify-between gap-5 mt-10">
              <div className="grid w-full items-center gap-1.5">
                <Label className="text-gray-2 mb-1" htmlFor="signature">
                  {t('nameInput')}
                </Label>
                <Input
                  disabled
                  defaultValue="Muhammad John Doe"
                  className="!w-full"
                  onChange={onChangeHandler}
                  type="text"
                  name="signature"
                  placeholder="Masukkan Nama Lengkap"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label className="text-gray-2 mb-1" htmlFor="initial">
                  {t('initialsInput')}
                </Label>
                <Input
                  defaultValue="MJ"
                  value={form.initial}
                  maxLength={3}
                  onChange={onChangeHandler}
                  type="text"
                  name="initial"
                  placeholder="Masukkan Inisial Paraf"
                />
              </div>
            </div>
            <div>
              <Label className="text-gray-2">{t('fontType')}</Label>
              <ToggleGroup
                onValueChange={onToggleChange}
                defaultValue="Adine-Kirnberg"
                type="single"
                className="grid grid-cols-2 md:grid-cols-3 mt-1"
              >
                <ToggleGroupItem
                  size="lg"
                  className={cn(
                    'data-[state=on]:bg-[#F8FBFF] hover:bg-white hover:text-black border border-input data-[state=on]:border-primary md:text-lg',
                    adine.className
                  )}
                  value="Adine-Kirnberg"
                  id="Adine-Kirnberg"
                >
                  <span>{form.signature}</span>
                </ToggleGroupItem>
                <ToggleGroupItem
                  size="lg"
                  value="champignonaltswash"
                  id="champignonaltswash"
                  className={cn(
                    'data-[state=on]:bg-[#F8FBFF] hover:bg-white hover:text-black border border-input data-[state=on]:border-primary md:text-lg',
                    champignonaltswash.className
                  )}
                >
                  <span>{form.signature}</span>
                </ToggleGroupItem>
                <ToggleGroupItem
                  size="lg"
                  value="FormalScript"
                  id="FormalScript"
                  className={cn(
                    'data-[state=on]:bg-[#F8FBFF] hover:bg-white hover:text-black border border-input data-[state=on]:border-primary md:text-lg',
                    formalScript.className
                  )}
                >
                  <span>{form.signature}</span>
                </ToggleGroupItem>
                <ToggleGroupItem
                  size="lg"
                  value="HerrVonMuellerhoff-Regular"
                  id="HerrVonMuellerhoff-Regular"
                  className={cn(
                    'data-[state=on]:bg-[#F8FBFF] hover:bg-white hover:text-black border border-input data-[state=on]:border-primary md:text-lg',
                    hervon.className
                  )}
                >
                  <span>{form.signature}</span>
                </ToggleGroupItem>
                <ToggleGroupItem
                  size="lg"
                  value="MrsSaintDelafield-Regular"
                  id="MrsSaintDelafield-Regular"
                  className={cn(
                    'data-[state=on]:bg-[#F8FBFF] hover:bg-white hover:text-black border border-input data-[state=on]:border-primary md:text-lg',
                    mrSaint.className
                  )}
                >
                  <span>{form.signature}</span>
                </ToggleGroupItem>
                <ToggleGroupItem
                  size="lg"
                  value="SCRIPTIN"
                  id="SCRIPTIN"
                  className={cn(
                    'data-[state=on]:bg-[#F8FBFF] hover:bg-white hover:text-black border border-input data-[state=on]:border-primary md:text-lg',
                    scriptin.className
                  )}
                >
                  <span>{form.signature}</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="p-3 bg-[#F8F9FF] rounded-lg">
              <p className="font-semibold">Preview</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div className="bg-white rounded-xl p-3">
                  <h3 className={cn('text-center', getFontType())}>
                    <span ref={signatureRef}>{form.signature}</span>
                  </h3>
                  <p className="text-center text-sm mt-2 text-[#272B30]">
                    {t('signature')}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <h3 className={cn('text-center', getFontType())}>
                    {form.initial}
                  </h3>
                  <p className="text-center text-sm mt-2 text-[#272B30]">
                    {t('initial')}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent className="w-full" value="create-signature">
            <div className="p-3 bg-[#F8F9FF] rounded-lg mt-10 w-full">
              <p className="font-semibold text-sm">{t('drawSignature')}</p>
              <div className="relative group w-full">
                <SignaturePad
                  onEnd={() => onStopDraw('signature')}
                  ref={(ref) => {
                    signatureCanvasRef.current = ref;
                  }}
                  canvasProps={{
                    className:
                      'bg-white w-full min-h-[270px] border border-dashed rounded-lg mt-2'
                  }}
                />
                {pad.signature.length > 1 && (
                  <Button
                    onClick={() => {
                      signatureCanvasRef.current?.clear();
                      onDeleteDraw('signature');
                    }}
                    className="gap-2 bg-white text-destructive absolute bottom-5 right-5 custom-shadow font-semibold h-10 hover:bg-white"
                    size="sm"
                  >
                    <DeleteIcon pathClassName="fill-destructive" />
                    Reset
                  </Button>
                )}
              </div>
              <p className="font-semibold text-sm mt-3">{t('drawInitials')}</p>
              <div className="relative w-full sm:w-6/12 group">
                <SignaturePad
                  onEnd={() => onStopDraw('initial')}
                  ref={(ref) => {
                    initialCanvasRef.current = ref;
                  }}
                  canvasProps={{
                    className:
                      'bg-white w-full h-[270px] border border-dashed rounded-lg mt-2'
                  }}
                />
                {pad.initial.length > 1 && (
                  <Button
                    onClick={() => {
                      onDeleteDraw('initial');
                      initialCanvasRef.current?.clear();
                    }}
                    className="gap-2 bg-white text-destructive absolute bottom-5 right-5 custom-shadow font-semibold h-10 hover:bg-white"
                    size="sm"
                  >
                    <DeleteIcon pathClassName="fill-destructive" />
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="upload-image">
            <p className="text-gray-2 text-sm mt-10">{t('subtitle')}</p>
            <div className="p-3 bg-[#F8F9FF] rounded-lg mt-8">
              <Fragment>
                <p className="font-semibold text-sm">
                  {t('uploadSignature')} (Max. file size 2MB)
                </p>
                {images.signatures.length > 1 ? (
                  <div className="flex items-center cursor-pointer justify-center px-5 border border-dashed bg-white mt-2 rounded-lg h-[270px] relative">
                    <Image
                      src={images.signatures}
                      alt="100"
                      height={200}
                      width={200}
                    />
                    <Button
                      onClick={() => {
                        setImages((prev) => ({
                          ...prev,
                          signatures: ''
                        }));
                      }}
                      className="gap-2 bg-white text-destructive absolute bottom-5 right-5 custom-shadow font-semibold h-10 hover:bg-white"
                      size="sm"
                    >
                      <DeleteIcon pathClassName="fill-destructive" />
                      Reset
                    </Button>
                  </div>
                ) : (
                  <Dropzone onDrop={onDropSignature}>
                    {({ getRootProps, getInputProps }) => (
                      <Fragment>
                        <section
                          {...getRootProps()}
                          className="flex items-center cursor-pointer justify-center px-5 border border-dashed bg-white mt-2 rounded-lg h-[270px]"
                        >
                          <p className="text-sm font-semibold text-primary">
                            {t('chooseImage')}
                          </p>
                        </section>
                        <input
                          className="bg-black z-10"
                          type="file"
                          {...getInputProps()}
                          id="dropzone-file"
                        />
                      </Fragment>
                    )}
                  </Dropzone>
                )}
              </Fragment>
              <Fragment>
                <p className="font-semibold text-sm mt-5">
                  {t('uploadInitial')} (Max. file size 2MB)
                </p>
                {images.initial.length > 1 ? (
                  <div className="flex items-center cursor-pointer justify-center px-5 border border-dashed bg-white mt-2 rounded-lg h-[270px] w-full sm:w-6/12 relative">
                    <Image
                      src={images.initial}
                      alt="100"
                      height={200}
                      width={200}
                    />
                    <Button
                      onClick={() => {
                        setImages((prev) => ({
                          ...prev,
                          initial: ''
                        }));
                      }}
                      className="gap-2 bg-white text-destructive absolute bottom-5 right-5 custom-shadow font-semibold h-10 hover:bg-white"
                      size="sm"
                    >
                      <DeleteIcon pathClassName="fill-destructive" />
                      Reset
                    </Button>
                  </div>
                ) : (
                  <Dropzone onDrop={onDropInitial}>
                    {({ getRootProps, getInputProps }) => (
                      <Fragment>
                        <section
                          {...getRootProps()}
                          className="flex items-center cursor-pointer justify-center px-5 border border-dashed bg-white mt-2 rounded-lg h-[270px] w-full sm:w-6/12"
                        >
                          <p className="text-sm font-semibold text-primary">
                            {t('chooseImage')}
                          </p>
                        </section>
                        <input
                          accept="image/png"
                          className="bg-black z-10"
                          type="file"
                          {...getInputProps()}
                          id="dropzone-file"
                        />
                      </Fragment>
                    )}
                  </Dropzone>
                )}
              </Fragment>
            </div>
          </TabsContent>
        </Tabs>

        <AlertDialogFooter className="flex justify-center items-center">
          <AlertDialogCancel
            disabled={isLoading}
            className="custom-shadow w-full md:w-6/12"
          >
            {t('cancel')}
          </AlertDialogCancel>
          <Button
            disabled={isLoading || IS_DISABLED}
            onClick={() => {
              if (tabsValue === 'text') {
                convertToDataURL();
              } else if (tabsValue === 'create-signature') {
                const image =
                  signatureCanvasRef.current?.toDataURL() as unknown;
                // props.continueCallback(image as string);
                setOpen(false);
              } else {
                // props.continueCallback(images.signatures);
                setOpen(false);
              }
            }}
            className="sign-button-shadow w-full md:w-6/12"
          >
            {t('submit')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChangeSignatureAttribute;
