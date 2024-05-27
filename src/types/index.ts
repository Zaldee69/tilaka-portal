export type TPermissionState = 'granted' | 'denied' | 'prompt' | 'unknown';

export interface Signature {
  id: string;
  pos: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  page: string;
}

export interface Signer {
  name: string;
  id: string;
  color: string;
  privilege: 'signer' | 'read_only';
  signatures: {
    signature: Signature[];
    initial: Signature[];
    stamp: Signature[];
    pages: string[];
  };
  signature_settings: {
    show_signature: boolean;
    show_name: boolean;
    show_qr: boolean;
    show_logo: boolean;
  };
}
