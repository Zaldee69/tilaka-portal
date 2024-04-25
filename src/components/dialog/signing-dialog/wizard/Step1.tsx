import React, { Fragment, useCallback, useId, useState } from 'react';

import { Switch } from '@/components/ui/switch';

import { Button } from '../../../ui/button';
import {
  ContactIcon,
  DeleteIcon,
  UploadIcon
} from '../../../../../public/icons/icons';
import { useTranslations } from 'next-intl';

import Image from 'next/image';
import Dropzone from 'react-dropzone';
import { useToast } from '@/components/ui/use-toast';
import Collapsible from '@/components/Collapsible';
import { cn, fileToBase64 } from '@/lib/utils';
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
} from '../../../ui/select';
import { Textarea } from '../../../ui/textarea';
import { useWizard } from 'react-use-wizard';
import Navbar from './Navbar';

interface Docs {
  name: string;
  size: string;
  id: string;
  file: string;
}

const Step1 = () => {
  const { nextStep } = useWizard();
  return (
    <Fragment>
      <Navbar />
      <UploadDropZone />
      <RecipientCollapsible />
      <MessageCollapsible />
      <div className="custom-shadow p-5 h-20 absolute bottom-0 left-0 right-0 bg-white flex justify-end">
        <Button
          className="!font-bold sign-button-shadow"
          onClick={() => nextStep()}
        >
          Lanjut
        </Button>
      </div>
    </Fragment>
  );
};

const UploadDropZone = () => {
  const [isUploading, setIsUploading] = useState<boolean>();
  const [docs, setDocs] = useState<Docs[]>([]);

  const t = useTranslations('VerifyPdf');

  const { toast } = useToast();

  const randomid = useId();

  function getFileSize(size: number) {
    const fSExt = ['Bytes', 'KB', 'MB', 'GB'];
    let i = 0;
    while (size > 900) {
      size /= 1024;
      i++;
    }
    if (i > 1) {
      // If the size is in MB or GB
      return `${Math.floor(size)} ${fSExt[i]}`;
    } else {
      // If the size is in Bytes or KB
      return `${size.toFixed(2)} ${fSExt[i]}`;
    }
  }

  const onDrop = useCallback(
    async (acceptedFile: File[]) => {
      setIsUploading(true);

      if (docs.length + acceptedFile.length > 15) {
        setIsUploading(false);
        return toast({
          title: 'Gagal mengunggah file',
          description: `Anda hanya dapat mengunggah hingga 15 file sekaligus`,
          variant: 'destructive',
          color: '#E53E3E'
        });
      }

      const convertFile = async (file: File) => {
        const base64String = await fileToBase64(file);
        return base64String;
      };

      acceptedFile.map(async (file) => {
        if (file.type !== 'application/pdf') {
          toast({
            title: 'Gagal mengunggah file',
            description: `File ${file.name} bukan PDF`,
            variant: 'destructive',
            color: '#E53E3E',
            key: file.size,
            style: {
              marginTop: '10px'
            }
          });
        } else {
          const newDoc: Docs = {
            name: file.name as string,
            size: getFileSize(file.size),
            id: randomid, // Generate unique ID based on the length of the existing array
            file: await convertFile(file)
          };

          // Update state to include the new document
          setDocs((prevDocs) => [...prevDocs, newDoc]);

          setIsUploading(false);
        }
      });
    },
    [docs, setDocs]
  );

  const deleteDocs = (id: string) => {
    // Find the index of the document with the provided id
    const index = docs.findIndex((item) => item.id === id);

    if (index !== -1) {
      // Create a copy of the docs array
      const updatedDocs = [...docs];

      // Remove the document at the found index
      updatedDocs.splice(index, 1);

      // Update the state with the modified array
      setDocs(updatedDocs);
    }
  };

  return (
    <Collapsible
      autoOpen
      header={<h4 className="text-gray-2">Upload Dokumen</h4>}
      className="w-6/12 border pb-2 rounded-2xl"
      headerClassName="justify-start gap-2 px-4 pt-4"
    >
      <div
        className={cn('px-4 gap-4 items-start grid-cols-3', {
          grid: docs.length >= 1
        })}
      >
        {docs.length >= 1
          ? docs.map((doc) => (
              <div
                key={doc.id}
                className={cn('w-56 modal-button-shadow rounded-md p-2')}
              >
                <div className="bg-white h-full">
                  <div className=" w-full group relative">
                    <div className="border rounded-md p-1">
                      <PdfRenderer url={doc.file} />
                    </div>
                    <div className="absolute left-0 group-hover:bg-black/10 bottom-0 z-10 right-0 top-0 rounded-md transition-colors flex justify-end p-1">
                      <Button
                        onClick={() => {
                          deleteDocs(doc.id);
                        }}
                        className=" hover:bg-white px-2.5  rounded-sm bg-white hidden group-hover:flex transition-all"
                      >
                        <DeleteIcon pathClassName="fill-destructive" />
                      </Button>
                    </div>
                  </div>
                  <p className="font-semibold text-sm my-1">{doc.name}</p>
                  <p className="text-xs text-gray-3">10 Pages - {doc.size}</p>
                </div>
              </div>
            ))
          : null}
        <div className="rounded-md h-64">
          <Dropzone disabled={isUploading} onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section className="flex h-full justify-center">
                <div
                  {...getRootProps()}
                  className={cn(
                    'border-2 w-full h-60 border-dashed border-[#E6F1FC] border-spacing-4 rounded-lg bg-white md:selection:w-6/12 px-5 py-24',
                    {
                      'w-56 bg-[#F5FAFF]': docs.length >= 1
                    }
                  )}
                >
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col justify-center items-center h-full"
                  >
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
                        hidden: docs.length >= 1
                      })}
                    >
                      Tarik dokumen Anda kesini atau
                    </p>

                    <Button
                      size="lg"
                      className={cn(
                        'py-2 font-semibold sign-button-shadow my-3 gap-3',
                        {
                          'px-2.5': docs.length >= 1
                        }
                      )}
                    >
                      <UploadIcon pathClassName="fill-white" /> Upload Dokumen
                    </Button>
                    <p className="text-gray-3 mt-1 text-sm text-center">
                      {t('uploadZone.unuploading.subtitle')}
                    </p>
                    <input
                      className="hidden"
                      type="file"
                      {...getInputProps()}
                      id="dropzone-file"
                    />
                  </label>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      </div>
    </Collapsible>
  );
};

interface Signer {
  name: string;
  id: string;
  privillege: 'signer' | 'ready_only';
}

const RecipientCollapsible = () => {
  const [signers, setSigners] = useState<Signer[]>([]);
  const [signer, setSigner] = useState<string>('');
  const [form, setForm] = useState<string>('');

  const [isOnlyForMe, setIsOnlyForMe] = useState<boolean>(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setForm(value);
    if (emailRegex.test(value) || tilakaNameRegex.test(value)) {
      setSigner(value);
    } else {
      setSigner('');
    }
  };

  const randomid = useId();

  const addSigner = () => {
    let newSigner: Signer = {
      id: randomid,
      name: signer,
      privillege: 'signer'
    };

    setSigners((prev) => [...prev, newSigner]);
    setForm('');
    setSigner('');
  };

  const deleteSigner = (id: string) => {
    const index = signers.findIndex((item) => item.id === id);

    if (index !== -1) {
      // Create a copy of the docs array
      const updateSigners = [...signers];

      // Remove the document at the found index
      updateSigners.splice(index, 1);

      // Update the state with the modified array
      setSigners(updateSigners);
    }
  };

  return (
    <Collapsible
      autoOpen={false}
      header={<h4 className="text-gray-2">Penerima</h4>}
      className="w-6/12 border pb-2 rounded-2xl"
      headerClassName="justify-start gap-2 px-4 pt-4"
    >
      <div className="px-4">
        <div className="flex items-center gap-5 mt-2">
          <Switch
            checked={isOnlyForMe}
            onCheckedChange={(e) => setIsOnlyForMe(e)}
            id="only-me"
          />
          <Label htmlFor="only-me" className="font-semibold text-gray-2">
            Tandatangan Sendiri
          </Label>
        </div>
        {isOnlyForMe ? null : (
          <div className="my-4">
            <Label htmlFor="add-signer" className="font-normal text-gray-2">
              Tambah Penandatangan
            </Label>
            <Input
              id="add-signer"
              placeholder="Masukkan Tilaka ID atau Email"
              className="mt-2"
              autoComplete="off"
              type="text"
              onChange={onChangeHandler}
              value={form}
              icon={
                <ContactIcon svgClassName="mt-3" pathClassName="fill-gray-2" />
              }
            />
            {signer.length > 1 ? (
              <Button
                onClick={addSigner}
                variant="ghost"
                size="lg"
                className="flex border !py-9 !px-4 border-input mt-1 rounded-md w-full justify-start hover:!text-black"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary rounded-full flex items-center justify-center w-10 h-10">
                    <p className="font-bold text-white uppercase ">
                      {signer.split('')[0]}
                    </p>
                  </div>
                  <p className="text-sm">{signer}</p>
                </div>
              </Button>
            ) : null}
            {signers.length >= 1 ? (
              <div className="mt-4">
                <div className="grid grid-cols-7">
                  <p className="text-sm col-span-3 text-gray-2">Tilaka ID</p>
                  <p className="text-sm col-span-3 text-gray-2">Peran</p>
                </div>
                {signers.map((signer) => (
                  <div
                    key={signer.id}
                    className="grid grid-cols-7 py-3 px-4 rounded-2xl bg-secondary-1 mt-2"
                  >
                    <div className="flex items-center gap-3 col-span-3">
                      <div className="bg-[#E1EAF2] rounded-full flex items-center justify-center w-8 h-8">
                        <p className="font-bold uppercase">
                          {signer.name.split('')[0]}
                        </p>
                      </div>
                      <p className="font-semibold text-[#1B4782]">
                        {signer.name}
                      </p>
                    </div>
                    <div className="col-span-3">
                      <Select>
                        <SelectTrigger className="w-[280px] font-semibold hidden md:flex">
                          <SelectValue placeholder="Penandatangan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className="font-semibold" value="light">
                            Penandatangan
                          </SelectItem>
                          <SelectItem className="font-semibold" value="dark">
                            Hanya Lihat
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <Button
                        onClick={() => deleteSigner(signer.id)}
                        className="!p-0 !w-fit ml-3"
                        variant="ghost"
                      >
                        <DeleteIcon width={30} height={30} />
                      </Button>
                    </div>
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
      header={<h4 className="text-gray-2">Pesan</h4>}
      className="w-6/12 border pb-2 rounded-2xl"
      headerClassName="justify-start gap-2 px-4 pt-4"
    >
      <div className="px-4">
        <Label htmlFor="subject" className="font-normal text-gray-2">
          Subject Email*
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
          Sisa karakter: {100 - form.subject.length}
        </p>
        <Label htmlFor="content" className="font-normal text-gray-2">
          Isi Email*
        </Label>
        <Textarea
          onChange={onChangeHandler}
          id="content"
          name="content"
          placeholder="Isi Email"
          className="mt-2"
          autoComplete="off"
          value={form.content}
        />
        <p className="mb-4 text-xs text-gray-2 mt-2">
          {form.content.length}/1000 karakter
        </p>
      </div>
    </Collapsible>
  );
};

export default Step1;
