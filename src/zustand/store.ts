import { Signature, Signer } from '@/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface PDF {
  id: string;
  name: string;
  file: string;
  size: string;
}

interface SigningState {
  pdf_file: PDF[] | [];
  is_only_for_me: boolean;
  signers: Signer[] | [];
  messages: {
    subject: string;
    body: string;
  };
  addSigner: (
    id: string,
    name: string,
    privilege: 'signer' | 'read_only'
  ) => void;
  addDocuments: (id: string, name: string, file: string, size: string) => void;
  addSignature: (
    type: 'signature' | 'initial' | 'stamp',
    userId: string,
    page: string
  ) => void;
  deleteSigner: (id: string) => void;
  deleteDocument: (id: string) => void;
  deleteSignature: (
    signatureId: string,
    userId: string,
    type: 'signature' | 'initial' | 'stamp'
  ) => void;
  changePrivilege: (privilege: Signer['privilege'], id: string) => void;
  changeSignatureSettings: (
    type: 'show_logo' | 'show_signature' | 'show_name' | 'show_qr',
    value: boolean,
    userId: string
  ) => void;
  changeSignaturePosition: (
    x: number,
    y: number,
    id: string,
    userId: string
  ) => void;
  changeSignatureSize: (
    width: number,
    height: number,
    id: string,
    userId: string
  ) => void;
  changeIsOnlyForMe: (value: boolean) => void;
  changeSignatureImage: (image: string, id: string, userId: string) => void;
  resetSignatureDraft: () => void;
}

const useSigningStore = create<SigningState>()(
  devtools(
    persist(
      (set) => ({
        addSigner: (id, name, privilege) =>
          set((state) => {
            // Check if a signer with the name "johndoe" already exists
            const existingSigner = state.signers.find(
              (signer) => signer.name === 'johndoe21'
            );
            if (existingSigner && name === 'johndoe21') {
              // Do not add the new signer if "johndoe" exists
              return state;
            }

            return {
              signers: [
                ...(state.signers || []),
                {
                  id,
                  name,
                  privilege,
                  color:
                    state.signers.length % 2 !== 0
                      ? 'bg-[#A7C0FF]/90'
                      : 'bg-[#F4EA89]/90',
                  signature_settings: {
                    show_logo: false,
                    show_name: false,
                    show_qr: false,
                    show_signature: false
                  },
                  signatures: {
                    initial: [],
                    signature: [],
                    stamp: [],
                    pages: []
                  }
                }
              ]
            };
          }),
        addDocuments: (id: string, name: string, file: string, size: string) =>
          set((state) => ({
            ...state,
            pdf_file: [
              ...(state.pdf_file || []),
              {
                file,
                id,
                name,
                size
              }
            ]
          })),
        addSignature: (
          type: 'signature' | 'initial' | 'stamp',
          userId: string,
          page: string
        ) =>
          set((state) => {
            const updatedSigners = state.signers ? [...state.signers] : [];
            const signerIndex = updatedSigners.findIndex(
              (signer) => signer.id === userId
            );

            if (signerIndex !== -1) {
              const newSignature = {
                id: (Math.random() + 1).toString(36).substring(7),
                page,
                pos: {
                  x: 0,
                  y: 0
                },
                height:
                  updatedSigners[signerIndex].signature_settings.show_qr &&
                  !updatedSigners[signerIndex].signature_settings.show_signature
                    ? 60
                    : 50,
                width:
                  updatedSigners[signerIndex].signature_settings.show_qr &&
                  !updatedSigners[signerIndex].signature_settings.show_signature
                    ? 50
                    : 128,
                image: ''
              }; // Create new signature
              if (!updatedSigners[signerIndex].signatures) {
                // Initialize signatures object with default values
                updatedSigners[signerIndex].signatures = {
                  signature: [],
                  initial: [],
                  stamp: [],
                  pages: []
                };
              }

              // Add the new signature to the appropriate type
              if (!updatedSigners[signerIndex].signatures[type]) {
                updatedSigners[signerIndex].signatures[type] = [newSignature];
              } else {
                updatedSigners[signerIndex].signatures[type].push(newSignature);
              }

              // Add the page to the pages array if it's not already present
              if (
                !updatedSigners[signerIndex].signatures.pages.includes(page)
              ) {
                updatedSigners[signerIndex].signatures.pages.push(page);
              }

              // Automatically set the 'Tampilkan Tanda Tangan' radio button to active when add signature
              if (
                type === 'signature' &&
                !updatedSigners[signerIndex].signature_settings.show_qr
              )
                updatedSigners[signerIndex].signature_settings.show_signature =
                  true;

              return { ...state, signers: updatedSigners };
            }
            return state;
          }),
        deleteSigner: (id) =>
          set((state) => {
            const index = state.signers?.findIndex(
              (signer) => signer.id === id
            );
            if (index !== undefined && index !== -1) {
              const updatedSigners = [...(state.signers || [])];
              updatedSigners.splice(index, 1);
              return { signers: updatedSigners };
            }
            return state;
          }),
        deleteDocument: (id) =>
          set((state) => {
            const index = state.pdf_file?.findIndex((doc) => doc.id === id);
            if (index !== undefined && index !== -1) {
              const updatedDoc = [...(state.pdf_file || [])];
              updatedDoc.splice(index, 1);
              return { pdf_file: updatedDoc };
            }
            return state;
          }),
        deleteSignature: (
          signatureId: string,
          userId: string,
          type: 'signature' | 'initial' | 'stamp'
        ) => {
          set((state) => {
            const updatedSigners = state.signers ? [...state.signers] : [];
            const signerIndex = updatedSigners.findIndex(
              (signer) => signer.id === userId
            );

            if (signerIndex !== -1) {
              const updatedSigner = { ...updatedSigners[signerIndex] };
              if (updatedSigner.signatures && updatedSigner.signatures[type]) {
                updatedSigner.signatures[type] = updatedSigner.signatures[
                  type
                ].filter((signature) => {
                  if (signature.id === signatureId) {
                    // Check if the signature being deleted matches the current signature
                    const page = signature.page;
                    const remainingSignaturesOnPage = updatedSigner.signatures[
                      type
                    ].filter((s) => s.page === page);
                    // Check if there are remaining signatures on the same page
                    const hasRemainingSignatures =
                      remainingSignaturesOnPage.length > 1;
                    // If there are no remaining signatures on the same page, remove the page
                    if (!hasRemainingSignatures) {
                      updatedSigner.signatures.pages =
                        updatedSigner.signatures.pages.filter(
                          (p) => p !== page
                        );
                    }
                    return signature.id !== signatureId;
                  }
                  return true;
                });

                // Reset all signature_settings to false if no remaining signatures
                const hasRemainingSignatures =
                  updatedSigner.signatures['signature'].length > 0;

                if (!hasRemainingSignatures) {
                  updatedSigner.signature_settings = {
                    show_signature: false,
                    show_name: false,
                    show_qr: false,
                    show_logo: false
                  };
                }
              }

              // Update the signer in the array
              updatedSigners[signerIndex] = updatedSigner;

              return { ...state, signers: updatedSigners };
            }

            // Return the unchanged state if signer with given id is not found
            return state;
          });
        },
        changePrivilege: (privilege, id) =>
          set((state) => {
            const updatedSigners = state.signers?.map((signer) => {
              if (signer.id === id) {
                // Update privilege if signer found
                return { ...signer, privilege: privilege };
              }
              return signer;
            });
            return { signers: updatedSigners };
          }),
        changeSignatureSettings: (
          type: 'show_logo' | 'show_signature' | 'show_name' | 'show_qr',
          value: boolean,
          userId: string
        ) =>
          set((state) => {
            const updatedSigners = state.signers ? [...state.signers] : [];
            const signerIndex = updatedSigners.findIndex(
              (signer) => signer.id === userId
            );

            if (signerIndex !== -1) {
              const updatedSigner = { ...updatedSigners[signerIndex] };
              updatedSigner.signature_settings[type] = value;

              // If show_signature is false, set show_name to false as well
              if (type === 'show_signature' && !value) {
                console.log(value);
                updatedSigner.signature_settings['show_name'] = false;
              }

              // Function to update signature dimensions
              const updateSignatureDimensions = (signatures: Signature[]) => {
                return signatures.map((signature) => ({
                  ...signature,
                  height: 50, // New height value
                  width: 50 // New width value
                }));
              };

              if (
                type === 'show_qr' &&
                value &&
                !updatedSigner.signature_settings.show_signature
              ) {
                updatedSigner.signatures.signature = updateSignatureDimensions(
                  updatedSigner.signatures.signature
                );
              } else if (
                type === 'show_signature' &&
                value &&
                updatedSigner.signature_settings.show_qr
              ) {
                updatedSigner.signatures.signature =
                  updatedSigner.signatures.signature.map((signature) => ({
                    ...signature,
                    height: 60, // New height value
                    width: 128 // New width value
                  }));
              } else if (
                type === 'show_signature' &&
                !value &&
                updatedSigner.signature_settings.show_qr
              ) {
                updatedSigner.signatures.signature = updateSignatureDimensions(
                  updatedSigner.signatures.signature
                );
              }

              // Update the signer in the array
              updatedSigners[signerIndex] = updatedSigner;

              return { ...state, signers: updatedSigners };
            }

            // Return the unchanged state if signer with given id is not found
            return state;
          }),
        changeSignaturePosition: (
          x: number,
          y: number,
          id: string,
          userId: string
        ) => {
          set((state) => {
            const updatedSigners = state.signers ? [...state.signers] : [];
            const signerIndex = updatedSigners.findIndex(
              (signer) => signer.id === userId
            );

            if (signerIndex !== -1) {
              const updatedSigner = { ...updatedSigners[signerIndex] };
              const { signature, initial, stamp } = updatedSigner.signatures;

              // Search for the signature with the specified id
              const signatureType = signature.find((s) => s.id === id)
                ? 'signature'
                : initial.find((i) => i.id === id)
                  ? 'initial'
                  : stamp.find((s) => s.id === id)
                    ? 'stamp'
                    : null;

              if (signatureType) {
                // Update the position of the signature
                const updatedSignature = updatedSigner.signatures[
                  signatureType
                ].find((s) => s.id === id);
                if (updatedSignature) {
                  updatedSignature.pos = { x, y };
                }
              }

              // Update the signer in the array
              updatedSigners[signerIndex] = updatedSigner;

              return { ...state, signers: updatedSigners };
            }

            // Return the unchanged state if signer with given id is not found
            return state;
          });
        },
        changeSignatureSize: (
          width: number,
          height: number,
          id: string,
          userId: string
        ) => {
          set((state) => {
            const updatedSigners = state.signers ? [...state.signers] : [];
            const signerIndex = updatedSigners.findIndex(
              (signer) => signer.id === userId
            );

            if (signerIndex !== -1) {
              const updatedSigner = { ...updatedSigners[signerIndex] };
              const { signature, initial, stamp } = updatedSigner.signatures;

              // Search for the signature with the specified id
              const signatureType = signature.find((s) => s.id === id)
                ? 'signature'
                : initial.find((i) => i.id === id)
                  ? 'initial'
                  : stamp.find((s) => s.id === id)
                    ? 'stamp'
                    : null;

              if (signatureType) {
                // Update the size of the signature
                const updatedSignature = updatedSigner.signatures[
                  signatureType
                ].find((s) => s.id === id);
                if (updatedSignature) {
                  updatedSignature.width = width;
                  updatedSignature.height = height;
                }
              }

              // Update the signer in the array
              updatedSigners[signerIndex] = updatedSigner;

              return { ...state, signers: updatedSigners };
            }

            // Return the unchanged state if signer with given id is not found
            return state;
          });
        },
        resetSignatureDraft: () =>
          set(() => {
            return {
              is_only_for_me: false,
              messages: {
                body: '',
                subject: ''
              },
              pdf_file: [],
              signers: []
            };
          }),
        changeIsOnlyForMe: (value: boolean) =>
          set(() => {
            return {
              is_only_for_me: value
            };
          }),
        changeSignatureImage: (image: string, id: string, userId: string) => {
          set((state) => ({
            signers: state.signers.map((signer) => {
              if (signer.id === userId) {
                return {
                  ...signer,
                  signatures: {
                    ...signer.signatures,
                    signature: signer.signatures.signature.map((signature) => {
                      if (signature.id === id) {
                        return { ...signature, image };
                      }
                      return signature;
                    })
                  }
                };
              }
              return signer;
            })
          }));
        },
        is_only_for_me: false,
        messages: {
          body: '',
          subject: ''
        },
        pdf_file: [],
        signers: []
      }),

      {
        name: 'signing-storage'
      }
    )
  )
);

export default useSigningStore;
