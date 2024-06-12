import React, { useCallback, useEffect, useId, useState } from 'react';

import { Switch } from '@/components/ui/switch';

import { Button } from '../../../ui/button';
import {
  ContactIcon,
  DeleteIcon,
  UploadIcon
} from '../../../../../public/icons/icons';
import { useTranslations } from 'next-intl';

import { toast } from 'sonner';

import Image from 'next/image';
import Dropzone from 'react-dropzone';
import Collapsible from '@/components/Collapsible';
import { cn, fileToBase64, getFileSize } from '@/lib/utils';
import PdfRenderer from '@/components/PdfRenderer';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { emailRegex } from '@/components/form/LoginForm';
import { tilakaNameRegex } from '@/hooks/useSchema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

import { Textarea } from '@/components/ui/textarea';
import { useWizard } from 'react-use-wizard';
import Navbar from './Navbar';
import useSigningStore from '@/zustand/store';

interface RecipientCollapsibleProps {
  signer: string;
  setSigner: React.Dispatch<React.SetStateAction<string>>;
  form: string;
  setForm: React.Dispatch<React.SetStateAction<string>>;
}

const Step1 = () => {
  const { nextStep } = useWizard();

  const [signer, setSigner] = useState<string>('');
  const [form, setForm] = useState<string>('');

  const [isShouldDisabled, setIsShouldDisabled] = useState<boolean>(false);

  const { signers, pdf_file } = useSigningStore();

  const t = useTranslations('SigningDialog');

  const loggedSigner = signers.filter(
    (signer) => signer.name === 'johndoe21'
  )[0];

  const isAllViewOnly = signers.every((el) => el.privilege === 'read_only');

  useEffect(() => {
    if (
      signers.length >= 1 &&
      (loggedSigner.privilege !== 'read_only' || signers.length > 1) &&
      pdf_file.length >= 1 &&
      !isAllViewOnly
    ) {
      setIsShouldDisabled(false);
    } else {
      setIsShouldDisabled(true);
    }
  }, [signers.length, pdf_file.length, loggedSigner?.privilege]);

  return (
    <div className="w-full flex flex-col items-center h-[calc(100vh-3.5rem) gap-10 pb-32 overflow-scroll">
      <Navbar />
      <UploadDropZone />
      <RecipientCollapsible
        signer={signer}
        setSigner={setSigner}
        form={form}
        setForm={setForm}
      />
      <MessageCollapsible />
      <div className="custom-shadow border p-5 h-20 absolute bottom-0 left-0 right-0 bg-white flex justify-end">
        <Button
          disabled={isShouldDisabled}
          className="!font-bold sign-button-shadow w-full md:w-fit"
          onClick={() => nextStep()}
        >
          {t('step2.continue')}
        </Button>
      </div>
    </div>
  );
};

const UploadDropZone = () => {
  const [isUploading, setIsUploading] = useState<boolean>();
  const [numPages, setNumPages] = useState<number>(1);

  const s = useTranslations('SigningDialog.step1');

  const { addDocuments, deleteDocument, pdf_file } = useSigningStore();

  const randomid = (Math.random() + 1).toString(36).substring(7);

  const onDrop = useCallback(
    async (acceptedFile: File[]) => {
      setIsUploading(true);

      if (pdf_file.length + acceptedFile.length > 15) {
        setIsUploading(false);
        return toast.error('Gagal mengunggah file', {
          description: `Anda hanya dapat mengunggah hingga 15 file sekaligus`
        });
      }

      acceptedFile.map(async (file) => {
        file.text().then((x) => {
          if (
            x.includes('Encrypt') ||
            x
              .substring(x.lastIndexOf('<<'), x.lastIndexOf('>>'))
              .includes('/Encrypt')
          ) {
            return toast.error('Gagal mengunggah file', {
              description: `File ${file.name} terproteksi`
            });
          } else {
            const SIZE = getFileSize(file.size);
            const SplittedSize = SIZE.split(' ');
            if (file.type !== 'application/pdf') {
              toast.error('Gagal mengunggah file', {
                description: `File ${file.name} bukan PDF`
              });
            } else if (
              Number(SplittedSize[0]) > 30 &&
              SplittedSize[1] === 'MB'
            ) {
              toast.error('Gagal mengunggah file', {
                description: `Ukuran File ${file.name} lebih dari 30MB`
              });
            } else {
              const FILE = URL.createObjectURL(file);
              const NAME = file.name;
              const ID = randomid;

              // Update state to include the new document
              addDocuments(ID, NAME, FILE, SIZE);
            }
          }
        });
        setIsUploading(false);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Collapsible
      autoOpen
      header={<h4 className="text-gray-2">{s('uploadDocument')}</h4>}
      className="md:w-6/12 w-11/12 border pb-2 rounded-2xl md:mt-24 mt-36"
      headerClassName="justify-start gap-2 px-4 pt-4"
    >
      <div
        className={cn(
          'px-4 gap-4 items-start overflow-x-scroll no-scrollbar lg:grid-cols-3 flex',
          {
            'lg:grid': pdf_file.length >= 1
          }
        )}
      >
        {pdf_file.length >= 1
          ? pdf_file.map((doc) => (
              <div
                key={doc.id}
                className={cn(
                  'w-56 modal-button-shadow rounded-md p-2 flex-none'
                )}
              >
                <div className="bg-white h-full">
                  <div className=" w-full group relative">
                    <div className="border rounded-md p-1">
                      <PdfRenderer
                        numPages={numPages}
                        setNumPages={setNumPages}
                        url={doc.file}
                      />
                    </div>
                    <div className="absolute left-0 group-hover:bg-black/10 bottom-0 z-10 right-0 top-0 rounded-md transition-colors flex justify-end p-1">
                      <Button
                        onClick={() => {
                          deleteDocument(doc.id);
                        }}
                        className=" hover:bg-white px-2.5  rounded-sm bg-white hidden group-hover:flex transition-all"
                      >
                        <DeleteIcon pathClassName="fill-destructive" />
                      </Button>
                    </div>
                  </div>
                  {doc.name.length > 30 ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <p className="font-semibold text-sm my-1">
                            {doc.name
                              .split('')
                              .splice(0, 20)
                              .join('')
                              .concat('...pdf')}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{doc.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <p className="font-semibold text-sm my-1">{doc.name}</p>
                  )}

                  <p className="text-xs text-gray-3">
                    {numPages} Pages - {doc.size}
                  </p>
                </div>
              </div>
            ))
          : null}
        <div className="rounded-md h-64 w-full">
          <Dropzone disabled={isUploading} onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section className="flex h-full justify-center">
                <div
                  {...getRootProps()}
                  className={cn(
                    'border-2 w-full h-60 border-dashed border-[#E6F1FC] border-spacing-4 rounded-lg bg-white md:selection:w-6/12 px-5 py-24',
                    {
                      'w-56 bg-[#F5FAFF]': pdf_file.length >= 1
                    }
                  )}
                >
                  <div className="flex flex-col justify-center items-center h-full">
                    <Image
                      src="/images/upload.svg"
                      height={56}
                      width={56}
                      alt="Tilaka Logo"
                      quality={100}
                      priority
                    />
                    <p
                      className={cn('text-gray-2 text-sm mt-3 text-center', {
                        hidden: pdf_file.length >= 1
                      })}
                    >
                      {s('dragYourDoc')}
                    </p>

                    <Button
                      size="lg"
                      className={cn(
                        'py-2 font-semibold sign-button-shadow my-3 gap-3',
                        {
                          'px-2.5': pdf_file.length >= 1
                        }
                      )}
                    >
                      <UploadIcon pathClassName="fill-white" />{' '}
                      {s('uploadDocument')}
                    </Button>
                    <p className="text-gray-3 mt-1 text-sm text-center">
                      {s('maxFileSize')}
                    </p>
                  </div>
                  <input
                    className="hidden"
                    type="file"
                    {...getInputProps()}
                    id="dropzone-file"
                  />
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      </div>
    </Collapsible>
  );
};

const RecipientCollapsible = ({
  form,
  setForm,
  signer,
  setSigner
}: RecipientCollapsibleProps) => {
  const t = useTranslations('SigningDialog.step1');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setForm(value);
    if (emailRegex.test(value) || tilakaNameRegex.test(value)) {
      setSigner(value);
    } else {
      setSigner('');
    }
  };

  const {
    addSigner,
    deleteSigner,
    changePrivilege,
    signers,
    is_only_for_me,
    changeIsOnlyForMe
  } = useSigningStore();

  const randomid = (Math.random() + 1).toString(36).substring(7);

  const onAddSigner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailRegex.test(signer) || tilakaNameRegex.test(signer)) {
      addSigner(randomid, signer, 'signer');
      setForm('');
      setSigner('');
    }
  };

  return (
    <Collapsible
      autoOpen={false}
      header={<h4 className="text-gray-2">{t('recipient')}</h4>}
      className="md:w-6/12 w-11/12 border pb-2 rounded-2xl"
      headerClassName="justify-start gap-2 px-4 pt-4"
    >
      <div className="px-4">
        <div className="flex items-center gap-5 mt-2">
          <Switch
            checked={is_only_for_me}
            onCheckedChange={(e) => changeIsOnlyForMe(e)}
            id="only-me"
          />
          <Label htmlFor="only-me" className="font-semibold text-gray-1">
            {t('selfSign')}
          </Label>
        </div>
        {is_only_for_me ? null : (
          <div className="my-4">
            <form onSubmit={onAddSigner}>
              <Label htmlFor="add-signer" className="font-normal text-gray-1">
                {t('addSigner')}
              </Label>
              <Input
                id="add-signer"
                placeholder={t('input')}
                className="mt-2"
                autoComplete="off"
                type="text"
                onChange={onChangeHandler}
                value={form}
                icon={
                  <ContactIcon
                    svgClassName="mt-3"
                    pathClassName="fill-gray-2"
                  />
                }
              />
              {signer.length > 1 ? (
                <Button
                  variant="ghost"
                  type="submit"
                  size="lg"
                  className="flex border !py-9 !px-4 border-input mt-1 rounded-md w-full justify-start hover:!text-black"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary rounded-full flex items-center justify-center w-10 h-10">
                      <p className="font-bold text-white uppercase ">
                        {signer?.split('')[0]}
                      </p>
                    </div>
                    <p className="text-sm">{signer}</p>
                  </div>
                </Button>
              ) : null}
            </form>

            {signers.length >= 1 ? (
              <div className="mt-4">
                <div className="grid-cols-7 hidden md:grid">
                  <p className="text-sm col-span-3 text-gray-1">Tilaka Name</p>
                  <p className="text-sm col-span-3 text-gray-1">{t('role')}</p>
                </div>

                {signers.map((signer) => (
                  <div
                    key={signer.id}
                    className="grid max-[768px]:grid-rows-3 md:grid-cols-7 py-3 px-4 space-y-2 rounded-2xl bg-secondary-1 mt-2"
                  >
                    <div className="flex items-center gap-3 col-span-3">
                      <div className="bg-[#E1EAF2] rounded-full flex items-center justify-center w-8 h-8">
                        <p className="font-bold uppercase">
                          {signer.name.split('')[0]}
                        </p>
                      </div>
                      <p className="font-semibold text-[#1B4782]">
                        {signer.name === 'johndoe21'
                          ? signer.name + ' ' + '(Saya)'
                          : signer.name}
                      </p>
                    </div>
                    <div className="col-span-3">
                      <Select
                        defaultValue={signer.privilege}
                        onValueChange={(value: 'signer' | 'read_only') =>
                          changePrivilege(value, signer.id)
                        }
                      >
                        <SelectTrigger className="w-full md:w-full font-semibold">
                          <SelectValue placeholder="Penandatangan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className="font-semibold" value="signer">
                            {t('signer')}
                          </SelectItem>
                          <SelectItem
                            className="font-semibold"
                            value="read_only"
                          >
                            {t('viewOnly')}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {signer.name === 'johndoe21' ? null : (
                      <div className="col-span-1 flex justify-start md:justify-end">
                        <Button
                          onClick={() => deleteSigner(signer.id)}
                          className="!p-0 !w-fit md:ml-3 disabled:!cursor-not-allowed"
                          variant="ghost"
                        >
                          <DeleteIcon width={30} height={30} />
                          <p className="md:hidden">{t('delete')}</p>
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-input py-2 px-4 mt-4 items-center gap-5 flex rounded-md ">
                <Image
                  src="/images/add-signer.svg"
                  height={96}
                  width={101}
                  alt="Add Signer"
                />
                <div>
                  <h5 className="text-gray-2">Tambahkan penerima lainnya</h5>
                  <p className="text-sm text-gray-2 mt-2">
                    Masukkan Tilaka ID atau email untuk menambahkan penerima
                    dokumen sebagai penandatangan atau hanya penerima
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Collapsible>
  );
};

const MessageCollapsible = () => {
  const [form, setForm] = useState<{ subject: string; content: string }>({
    subject: '',
    content: ''
  });

  const t = useTranslations('SigningDialog.step1');

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    const { content, subject } = form;

    // Handle deletion of a single character
    if (value.length < content.length || value.length < subject.length) {
      if (name === 'content') {
        setForm((prev) => ({
          ...prev,
          [name]: value
          // Update character count if necessary
        }));
      } else if (name === 'subject') {
        setForm((prev) => ({
          ...prev,
          [name]: value
          // Update character count if necessary
        }));
      }
      return;
    }

    if (content.length >= 10000 || subject.length >= 100) return;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Collapsible
      autoOpen={false}
      header={<h4 className="text-gray-2">{t('message')}</h4>}
      className="md:w-6/12 w-11/12 border pb-2 rounded-2xl"
      headerClassName="justify-start gap-2 px-4 pt-4"
    >
      <div className="px-4">
        <Label htmlFor="subject" className="font-normal text-gray-2">
          {t('emailSubject')}*
        </Label>
        <Input
          onChange={onChangeHandler}
          id="subject"
          name="subject"
          placeholder="Subject"
          className="mt-2 mb-2"
          autoComplete="off"
          type="text"
          value={form.subject}
        />
        <p className="mb-4 text-xs text-gray-2">
          {t('remainingCharacter')}: {100 - form.subject.length}
        </p>
        <Label htmlFor="content" className="font-normal text-gray-2">
          {t('emailContent')}*
        </Label>
        <Textarea
          onChange={onChangeHandler}
          id="content"
          name="content"
          placeholder={t('emailContent')}
          className="mt-2"
          autoComplete="off"
          value={form.content}
        />
        <p className="mb-4 text-xs text-gray-2 mt-2">
          {form.content.length}/1000 {t('characters')}
        </p>
      </div>
    </Collapsible>
  );
};

export default Step1;
