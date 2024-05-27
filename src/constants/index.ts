import {
  DashboardIcon,
  DocumentIcon,
  SettingsIcon,
  VerifiedIcon
} from '../../public/icons/icons';

export const accountList = [
  {
    id: '1',
    email: 'john.doe@example.com',
    company: 'PT. Neckeep',
    isPrimary: true
  },
  {
    id: '2',
    email: 'never.doe@show.com',
    company: 'PT. Neckeep',
    isPrimary: false
  },
  {
    id: '3',
    email:
      'bringmetothehorizon@show.combringmetothehorizon@show.combringmetothehorizon@show.com',
    company: 'PT. Bring Me To The Horizon',
    isPrimary: false
  },
  {
    id: '4',
    email: 'losecontrol@gmail.com',
    company: 'PT. Hysteria Tech',
    isPrimary: false
  },
  {
    id: '5',
    email: 'doyouknow@haha.com',
    company: 'PT. Muse Music',
    isPrimary: false
  }
];

export const notifications = [
  {
    title:
      'Sirkulasi dokumen Daftar Hadir Sharing Session Regulasi dan Implementasi TTE.pdf telah dihentikan oleh inisiator - portal tidak mendukung maksimal 25 ttd dlm 1 dokumen',
    description: 'portal tidak mendukung, maksimal 25 TTD dalam satu dokumen',
    type: 'error',
    date: '03 Mar 2025',
    time: '19:32'
  },
  {
    title:
      'Saat ini Eliana Lumban Gaol selesai melakukan tanda tangan, dokumen sudah dikirim ke Salman Al Faricy untuk ditandatangani. - Daftar Hadir Sharing Session Regulasi dan Implementasi TTE.pdf',
    description: 'Daftar Sharing Session TTE.pdf',
    type: 'info',
    date: '04 Mar 2025',
    time: '13:32'
  },
  {
    title: 'Penandatangan berhasil',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus distinctio sunt omnis eligendi ex eaque ullam odit dolores, facilis doloribus cum voluptatem illum saepe autem rem numquam explicabo vitae et.',
    type: 'success',
    date: '09 Mar 2025',
    time: '11:32'
  },
  {
    title: 'Pembaruan Sertifikat Gagal',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus distinctio sunt omnis eligendi ex eaque ullam odit dolores, facilis doloribus cum voluptatem illum saepe autem rem numquam explicabo vitae et.',
    type: 'error',
    date: '19 Mar 2025',
    time: '19:43'
  },
  {
    title: 'Sertifikat dalam proses',
    description: 'Sertifikat anda dalam proses penerbitan',
    type: 'info',
    date: '03 Mar 2025',
    time: '14:32'
  },
  {
    title: 'Sertifikat berhasil',
    description: 'Sertifikat anda telah berhasil diperbarui',
    type: 'success',
    date: '21 Mar 2025',
    time: '12:32'
  }
];

export const sidebarLinks = [
  {
    title: 'sidebar.dashboard',
    Icons: DashboardIcon,
    path: '/dashboard'
  },
  {
    title: 'sidebar.document',
    Icons: DocumentIcon,
    path: '/dashboard/documents',
    subPath: '/detail'
  },
  {
    title: 'sidebar.verifyPdf',
    Icons: VerifiedIcon,
    path: '/dashboard/pdf-verification'
  },
  {
    title: 'sidebar.settings',
    Icons: SettingsIcon,
    path: '/dashboard/settings',
    subPath: '/certificate'
  }
];
