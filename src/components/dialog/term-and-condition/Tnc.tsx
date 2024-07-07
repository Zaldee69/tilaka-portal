'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

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

import { Button, buttonVariants } from '@/components/ui/button';
import { useContext, useRef, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { TnCContext } from './TncContextProvider';
import FRDialog from '@/components/dialog/FRVerification';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';

const TnCDialog = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [isScrolledToBottom, setIsScrolledToBottom] = useState<boolean>(false);

  const [acceptTerm, setAcceptTerm] = useState<boolean>(false);
  const [acceptCondition, setAcceptCondition] = useState<boolean>(false);

  const [openFrDialog, setOpenFrDialog] = useState<boolean>(false);
  const [openCertInformation, setOpenCertInformation] =
    useState<boolean>(false);

  const { stateSetter, state } = useContext(TnCContext);

  const t = useTranslations('Settings.dialog.fr');

  const i = useTranslations('issuanceOnProcessDialog');

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current!;
    console.log({ scrollTop, scrollHeight, clientHeight });
    if (scrollTop + clientHeight >= scrollHeight) {
      setIsScrolledToBottom(true);
    }
  };

  return (
    <>
      <Dialog
        open={state.isOpen}
        onOpenChange={(open) => stateSetter({ isOpen: open })}
      >
        <DialogContent className="px-2 pb-3 md:pb-6 md:px-6">
          <DialogHeader>
            <DialogTitle className="uppercase">
              Syarat & ketentuan tilaka
            </DialogTitle>
          </DialogHeader>
          <div>
            <div className="text-center bg-[#0AB7E9] rounded-md text-white py-2 mb-3">
              <p className="text-sm md:text-base px-3">
                Silahkan dibaca dan di scroll hingga paragraf terakhir
              </p>
            </div>
            <div
              ref={contentRef}
              onScroll={handleScroll}
              className="md:max-h-[400px] max-h-[280px] overflow-y-scroll text-sm px-2 pb-3"
            >
              <div>
                <p className="mt-3 mb-0 text-lg leading-6 font-bold">
                  Selamat datang di Layanan TILAKA!
                </p>
                <p className="mt-3 mb-0 leading-6">
                  Dengan ini, PT Tilaka Nusa Teknologi (“PSrE TILAKA” atau
                  “Kami”) ingin menyampaikan bahwa selaku pemilik dan pengelola
                  dari Layanan Tanda Tangan Elektronik yang dapat digunakan baik
                  dengan mengakses secara langsung melalui URL :
                  <a
                    href="https://corporate.tilaka.id/ca-corporate-portal/login.xhtml"
                    className="text-blue-600"
                    target="_blank"
                  >
                    https://corporate.tilaka.id/ca-corporate-portal/login.xhtml
                  </a>{' '}
                  atau melalui aplikasi yang dibuat, dikelola, dikembangkan,
                  atau dimiliki oleh pihak ketiga yang memiliki hubungan
                  kontraktual dengan PSrE TILAKA (“Layanan TILAKA”) memiliki
                  syarat dan ketentuan (“S&K”) yang harus Pemilik dan/atau
                  Pemohon (“Anda”) setujui sebelum menggunakan Layanan TILAKA.
                  Anda berkewajiban untuk membaca, memahami, dan menyetujui isi
                  dari S&K ini sebelum melakukan melakukan permohonan
                  penerbitan, permohonan penerbitan ulang, permohonan
                  penggantian kunci, menerima, dan/atau menggunakan Sertifikat
                  Pemilik (“Mengakses Layanan TILAKA”). Dalam hal Anda tidak
                  menyetujui sebagian atau seluruh ketentuan yang diatur dalam
                  S&K ini, maka Anda tidak diperkenankan untuk Mengakses Layanan
                  TILAKA.
                </p>
                <p className="mt-3 mb-1 leading-6">
                  S&K ini berlaku efektif setelah ditampilkan pada salah satu
                  halaman pada Layanan TILAKA saat Anda mengajukan permohonan
                  penerbitan, permohonan penerbitan ulang, dan/atau permohonan
                  penggantian kunci Sertifikat Pemilik. Atas permohonan
                  permohonan penerbitan, permohonan penerbitan ulang, permohonan
                  penggantian kunci Sertifikat Pemilik yang dilakukan setelah
                  S&K ini berlaku efektif, maka ketentuan pada S&K ini berlaku
                  untuk Pemilik.
                </p>
                <p className="mt-3 mb-0 leading-6">
                  Anda dengan ini mengetahui, mengerti, dan menyetujui bahwa S&K
                  ini merupakan Dokumen Elektronik dan tindakan Anda memberikan
                  tanda “centang” saat permohonan permohonan penerbitan,
                  permohonan penerbitan ulang, dan/atau permohonan penggantian
                  kunci Sertifikat Pemilik merupakan persetujuan Anda secara
                  aktif untuk mengikatkan diri dan tunduk pada ketentuan yang
                  terdapat pada S&K ini. Oleh karena itu, S&K ini telah berlaku
                  sah dan mengikat Anda secara hukum dan terus berlaku sepanjang
                  anda Mengakses Layanan TILAKA.
                </p>
                <p className="mt-3 mb-0 leading-6 text-lg font-bold">
                  Definisi
                </p>
                <ol className="m-0 pl-0 list-decimal">
                  <li className="ml-4 indent-0 pl-2">
                    Akun adalah suatu kode alfanumerik yang diterbitkan oleh
                    PSrE TILAKA yang berfungsi untuk mengidentifikasi Anda dalam
                    menggunakan Layanan TILAKA.
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Data Pribadi adalah data tentang orang perseorangan yang
                    teridentifikasi atau dapat diidentifikasi secara tersendiri
                    atau dikombinasi dengan informasi lainnya baik secara
                    langsung maupun tidak langsung melalui sistem elektronik
                    atau nonelektronik.
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Dokumen Elektronik adalah setiap Informasi Elektronik yang
                    dibuat, diteruskan, dikirimkan, diterima, atau disimpan
                    dalam bentuk analog, digital, elektromagnetik, optikal, atau
                    sejenisnya, yang dapat dilihat, ditampilkan dan/atau
                    didengar melalui komputer atau sistem elektronik, termasuk
                    atau sistem elektronik, termasuk tetapi tidak terbatas pada
                    tulisan, suara, gambar, peta, rancangan, foto atau
                    sejenisnya, huruf, tanda, angka, kode akses, simbol atau
                    perforasi yang memiliki makna atau arti atau dapat dipahami
                    oleh orang yang mampu memahaminya.
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Hari Kalender adalah semua hari dalam satu tahun sesuai
                    kalender gregorius tanpa kecuali termasuk hari sabtu, minggu
                    dan hari libur nasional yang ditetapkan sewaktu-waktu oleh
                    Pemerintah.
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Kontrak Elektronik adalah Perjanjian yang dibuat melalui
                    sistem elektronik.
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Pemilik adalah Warga Negara Indonesia yang berada dalam
                    ruang lingkup Pelanggan dan merupakan subjek dari Sertifikat
                    Pemilik.
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Pemohon adalah Warga Negara Indonesia yang berada dalam
                    ruang lingkup Pelanggan yang mengajukan permohonan
                    penerbitan atau penerbitan ulang atau penggantian kunci
                    Sertifikat dalam ruang lingkup Pelanggan. Setelah Sertifikat
                    diterbitkan, Pemohon disebut sebagai Pemilik.
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Pelanggan adalah Korporasi atau Personal yang berlangganan
                    Layanan TILAKA.
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    PT Tilaka Nusa Teknologi (“PSrE TILAKA”) adalah PSrE dengan
                    status pengakuan berinduk yang Sertifikatnya telah
                    ditandatangani oleh PSrE Induk.
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Repositori Tilaka adalah suatu halaman pada website PSrE
                    TILAKA yang berisi semua dokumen publik milik PSrE TILAKA,
                    yang dapat diakses melalui
                    <a
                      href="https://repository.tilaka.id/"
                      className="text-black no-underline"
                    >
                      https://repository.tilaka.id/
                    </a>
                    .
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Sertifikat adalah Sertifikat yang bersifat elektronik yang
                    memuat tanda tangan elektronik dan identitas yang
                    menunjukkan status subjek hukum para pihak dalam transaksi
                    elektronik.
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Sertifikat Pemilik adalah Sertifikat yang diterbitkan oleh
                    PSrE TILAKA.
                  </li>
                </ol>
                <p>&nbsp;</p>
                <p className="leading-6 text-lg font-bold">
                  Ketentuan Bagi Anda
                </p>
                <ol className="m-0 pl-0 list-decimal">
                  <li className="ml-4 indent-0 pl-2">
                    Anda setuju untuk Mengakses Layanan TILAKA hanya untuk
                    tujuan sebagaimana ditentukan dalam S&K ini dan daftar
                    Dokumen Publik sebagaimana disebutkan dalam S&K ini. Anda
                    dengan ini menjamin untuk tidak akan menggunakan Layanan
                    TILAKA untuk tujuan penipuan, menyebabkan ketidaknyamanan
                    kepada orang lain, atau melakukan tindakan lainnya yang
                    dapat atau dianggap dapat menimbulkan kerugian dalam bentuk
                    apapun terhadap orang atau badan hukum lainnya.
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Dalam rangka menggunakan Layanan TILAKA, Anda akan memiliki
                    Akun yang hanya boleh digunakan oleh Anda dan tidak dapat
                    dialihkan kepada orang lain dengan alasan ataupun keadaan
                    apapun. Maka dari itu, Anda berkewajiban untuk menjaga
                    kerahasiaan nama Akun dan kata sandi yang akan digunakan
                    sehubungan dengan penggunaan Layanan TILAKA.
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Anda setuju untuk memberikan semua informasi dan/atau Data
                    Pribadi yang diminta oleh PSrE TILAKA dengan disertai dengan
                    dokumen pendukung yang dibutuhkan sehubungan dengan kegiatan
                    Mengakses Layanan TILAKA.
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Anda setuju bahwa PSrE TILAKA berhak untuk melakukan
                    verifikasi secara independen terhadap semua informasi
                    dan/atau Data Pribadi sesuai dengan prosedur yang berlaku
                    pada PSrE TILAKA.
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Anda dengan ini menjamin bahwa segala informasi dan/atau
                    Data Pribadi yang disampaikan kepada TILAKA sehubungan
                    dengan kegiatan Mengakses Layanan TILAKA adalah benar,
                    jelas, akurat dan lengkap. Anda berkewajiban untuk
                    menginformasikan kepada PSrE TILAKA dalam hal terdapat
                    perubahan, penambahan, atau pembaruan atas informasi
                    dan/atau Data Pribadi. PSrE TILAKA berhak untuk menolak
                    permohonan penerbitan Sertifikat Pemilik, menolak penerbitan
                    ulang Sertifikat Pemilik, menolak permohonan penggantian
                    kunci Sertifikat Pemilik, dan/atau menolak melakukan
                    perubahan, penambahan, atau pembaruan atas informasi
                    dan/atau Data Pribadi yang tersimpan pada Layanan TILAKA,
                    jika ditemukan atau patut diduga bahwa informasi dan/atau
                    Data Pribadi yang diberikan oleh Anda tidak sesuai dengan
                    ketentuan S&K ini dan Dokumen Publik sebagaimana disebutkan
                    dalam S&K ini.
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Anda setuju atas isi yang tercantum dalam Sertifikat Pemilik
                    yang diterbitkan oleh PSrE TILAKA baik dari proses
                    permohonan penerbitan, permohonan penerbitan ulang, dan/atau
                    permohonan penggantian kunci Sertifikat Pemilik dalam hal:
                    <ol className="m-0 pl-0 list-[lower-alpha]">
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        Anda telah memeriksa dan menyetujui informasi yang
                        terkandung dalam Sertifikat Pemilik; atau
                      </li>
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        Anda tidak memberikan tanggapan dalam jangka waktu 9
                        (Sembilan) Hari Kalender sejak PSrE TILAKA mengirimkan{' '}
                        <em>email</em> terkait penerbitan Sertifikat Pemilik.
                      </li>
                    </ol>
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Dalam hal permohonan penggantian kunci Sertifikat Pemilik,
                    Anda dengan ini mengetahui dan setuju bahwa:
                    <ol className="m-0 pl-0 list-[lower-alpha]">
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        Proses penggantian kunci Sertifikat Pemilik
                        mengakibatkan PSrE TILAKA akan melakukan penerbitan
                        Sertifikat Pemilik baru dengan kunci publik,{' '}
                        <em>serial number</em>, dan <em>key identifier</em> yang
                        baru, sementara informasi pribadi Pemilik yang tercantum
                        pada Sertifikat Pemilik yang digunakan untuk
                        menandatangani permohonan penggantian Sertifikat Pemilik
                        baru ini akan tetap digunakan pada Sertifikat Pemilik
                        baru yang akan diterbitkan PSrE TILAKA tersebut;
                      </li>
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        Penggantian kunci Sertifikat Pemilik mengakibatkan PSrE
                        TILAKA akan membangkitkan pasangan kunci baru yang
                        terasosiasi dengan Sertifikat Pemilik yang digunakan
                        untuk menandatangani permohonan penggantian Sertifikat
                        Pemilik baru ini; dan/atau
                      </li>
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        Masa berlaku Sertifikat Pemilik baru akan berbeda dengan
                        Sertifikat Pemilik yang Anda gunakan untuk
                        menandatangani permohonan penggantian Sertifikat Pemilik
                        ini.
                      </li>
                    </ol>
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Anda setuju untuk tidak menggunakan Layanan TILAKA dengan
                    cara sebagai berikut:
                    <ol className="m-0 pl-0 list-[lower-alpha]">
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        Menggunakan Layanan TILAKA untuk tujuan yang melanggar
                        hukum atau ketentuan peraturan perundang-undangan yang
                        berlaku;
                      </li>
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        Melakukan tindakan yang disebabkan oleh kelalaian atau
                        kesengajaan olehnya, yang pada pokoknya menyebabkan
                        perubahan, penambahan, pengurangan, merusak,
                        menghilangkan, menyembunyikan, membuat tidak dapat
                        digunakannya Layanan TILAKA baik sebagian atau
                        seluruhnya;
                      </li>
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        Melakukan tindakan yang baik dengan sengaja atau karena
                        kelalaiannya menyebabkan pelanggaran atas hak PSrE
                        TILAKA dalam hal yang termasuk namun tidak terbatas pada
                        pelanggaran privasi, hak cipta, merek, paten, rahasia
                        dagang, atau hak kekayaan intelektual lainnya, hak yang
                        timbul dari hubungan kontraktual antara PSrE TILAKA
                        dengan pihak ketiga lainnya, dan/atau hak lain yang
                        dimiliki PSrE TILAKA baik untuk masa sekarang maupun di
                        kemudian hari yang dilindungi oleh peraturan
                        perundang-undangan yang berlaku; dan
                      </li>
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        Melakukan tindakan menyalin, memodifikasi, mengadaptasi,
                        menerjemahkan, membuat karya turunan dari, melakukan
                        perekayasaan balik, atau membongkar bagian manapun baik
                        sebagian atau seluruhnya atas Layanan TILAKA.
                      </li>
                    </ol>
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Anda setuju bahwa PSrE TILAKA berhak untuk menghentikan
                    sementara atau permanen dengan atau tanpa disertai dengan
                    pencabutan Akun dan/atau Sertifikat Pemilik milik Anda dalam
                    hal terdapat kegiatan untuk meningkatkan pelayanan yang
                    terdapat pada Layanan TILAKA atau pelanggaran dari Anda
                    terhadap ketentuan dari S&K ini.
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Dalam rangka kegiatan Anda Mengakses Layanan TILAKA, Anda
                    mengetahui dan setuju bahwa PSrE TILAKA akan akan
                    memberitahukan sebagian atau seluruh informasi yang terdapat
                    dalam Sertifikat Pemilik kepada pihak pengandal dan/atau
                    pihak lainnya, hal mana demikian akan dilakukan oleh PSrE
                    TILAKA dengan tunduk pada ketentuan yang tercantum pada
                    Dokumen Publik sebagaimana disebutkan dalam S&K ini.
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Dalam rangka Mengakses Layanan TILAKA, Anda setuju untuk
                    tunduk pada ketentuan yang terdapat pada Dokumen Publik yang
                    terdapat pada Repositori Tilaka serta di tautan yang
                    terdapat pada bagian akhir S&K ini yang terdiri dari :
                    <ol className="m-0 pl-0 list-[lower-alpha]">
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        <em>Certification Practice Statement</em> (“CPS”);
                      </li>
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        Kebijkan Privasi;
                      </li>
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        Perjanjian Pemilik Sertifikat; dan
                      </li>
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        Kebijakan Jaminan
                        <span className="text-gray-600">.</span>
                      </li>
                    </ol>
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Dalam hal Anda menggunakan Layanan TILAKA melalui aplikasi
                    yang dibuat, dikelola, dikembangkan, atau dimiliki oleh
                    pihak ketiga yang memiliki hubungan kontraktual PSrE TILAKA
                    (“aplikasi pihak ketiga”), maka Anda harus mengetahui dan
                    menyetujui bahwa Kami tidak memiliki kendali apapun terhadap
                    konten-konten yang terdapat pada aplikasi tersebut sebelum
                    Anda memilih untuk menggunakan Layanan TILAKA. Akses atau
                    penggunaan Anda terhadap aplikasi milik pihak ketiga sebelum
                    menggunakan Layanan TILAKA tersebut tunduk pada syarat dan
                    ketentuan serta kebijakan privasi yang ditentukan oleh pihak
                    ketiga tersebut. Anda dengan ini melepaskan tanggung jawab
                    Kami terhadap isi atau bagian apapun dari aplikasi pihak
                    ketiga tersebut termasuk bagaimana aplikasi pihak ketiga
                    tersebut memperoleh, mengumpulkan, mengolah, menyimpan,
                    menampilkan, mengumumkan, mengirimkan, dan memusnahkan Data
                    Pribadi Anda sebelum Anda menggunakan Layanan TILAKA.
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    Dalam hal karena kelalaian atau kesengajaannya dalam
                    melaksanakan ketentuan dari S&K ini menyebabkan kerugian
                    yang diterima oleh PSrE TILAKA, Anda atau pihak ketiga
                    lainnya. Maka, Anda dengan ini sepakat untuk melepaskan,
                    membebaskan, memberikan ganti rugi, dan membela PSrE TILAKA,
                    termasuk direktur, komisaris, karyawan dan/atau rekanan atas
                    hal-hal yang termasuk namun tidak terbatas pada permintaan,
                    klaim, kerugian, tuntutan, tanggung jawab, kewajiban,
                    kerusakan, ongkos dan biaya yang timbul
                    <span className="text-gray-600">.</span>
                  </li>
                </ol>
                <p className="mt-0 indent-0">&nbsp;</p>
                <p className="leading-6 text-lg font-bold">
                  Kerahasiaan dan Keamanan
                </p>
                <p>
                  Anda setuju bahwa PSrE TILAKA dapat mengungkapkan atau
                  memberikan akses terhadap informasi, Dokumen Elektronik,
                  Kontrak Elektronik, dan/atau Data Pribadi Anda dalam rangka
                  memenuhi ketentuan hukum, peraturan perundang-undangan
                  dan/atau keputusan pengadilan, hal tersebut dilakukan dalam
                  rangka proses penegakan atau pengambilan tindakan pencegahan
                  lebih lanjut sehubungan dengan kegiatan tidak berwenang,
                  dugaan tindak pidana, pelanggaran hukum dan/atau pelanggaran
                  terhadap peraturan perundang-undangan yang berlaku.
                </p>
                <br />
                <p className="leading-6 text-lg font-bold">
                  Hak Kekayaan Intelektual
                </p>
                <p>
                  Nama, kode program, model bisnis, desain, merek dagang, warna,
                  gambar, video, audio, teknologi, dan hal lainnya sehubungan
                  dengan Layanan TILAKA yang belum, dalam proses maupun telah
                  terdaftar atas nama PSrE TILAKA, dilindungi oleh hak kekayaan
                  intelektual termasuk namun tidak terbatas pada hak cipta,
                  merek, paten dan hak kekayaan intelektual yang diatur
                  berdasarkan hukum Negara Republik Indonesia. Tindakan Anda
                  dalam hal mengakses dan menggunakan Layanan TILAKA, tidak
                  mengakibatkan perpindahan baik sebagian atau seluruh Hak
                  Kekayaan Intelektual sehubungan dengan Layanan TILAKA tersebut
                  Anda.
                </p>
                <p>&nbsp;</p>
                <p className="leading-6 text-lg font-bold">Hubungi TILAKA</p>
                <p>
                  Anda dapat menghubungi PSrE TILAKA melalui surat elektronik
                  (email) ke alamat
                  <a
                    href="mailto:info@tilaka.id"
                    className="text-black no-underline"
                  >
                    info@tilaka.id
                  </a>{' '}
                  atau dengan mengirimkan dokumen fisik melalui kantor PSrE
                  TILAKA melalui alamat Belleza Shopping Arcade Lantai 3 Unit SA
                  0380, Jl. Arteri Permata Hijau Nomor 34, RT.004/RW.002, Grogol
                  Utara, Kebayoran Lama, Jakarta Selatan, 12210.
                </p>
                <p>&nbsp;</p>
                <p className="leading-6 text-lg font-bold">Sengketa</p>
                <p>
                  Segala sengketa terkait dengan penafsiran atau pelaksanaan
                  dari syarat dan ketentuan ini, para pihak sepakat untuk
                  menyelesaikan secara musyawarah untuk mufakat. Apabila
                  penyelesaian secara musyawarah untuk mencapai sepakat tersebut
                  tidak tercapai, maka para pihak sepakat untuk menyelesaikannya
                  melalui Pengadilan Negeri Jakarta Selatan sesuai domisili PSrE
                  TILAKA.
                </p>
                <p>&nbsp;</p>
                <p>
                  CP/CPS —&gt;&nbsp;
                  <a
                    href="https://repository.tilaka.id/CP_CPS.pdf"
                    target="_blank"
                    className="text-blue-600"
                  >
                    https://repository.tilaka.id/CP_CPS.pdf
                  </a>
                </p>
                <p>
                  Kebijakan Jaminan —&gt;&nbsp;
                  <a
                    href="https://repository.tilaka.id/kebijakan-jaminan.pdf"
                    target="_blank"
                    className="text-blue-600"
                  >
                    https://repository.tilaka.id/kebijakan-jaminan.pdf
                  </a>
                </p>
                <p>
                  Kebijakan Privasi —&gt;&nbsp;
                  <a
                    href="https://repository.tilaka.id/kebijakan-privasi.pdf"
                    target="_blank"
                    className="text-blue-600"
                  >
                    https://repository.tilaka.id/kebijakan-privasi.pdf
                  </a>
                </p>
                <p>
                  Perjanjian Pemilik Sertifikat —&gt;&nbsp;
                  <a
                    href="https://repository.tilaka.id/perjanjian-pemilik-sertifikat.pdf"
                    target="_blank"
                    className="text-blue-600"
                  >
                    https://repository.tilaka.id/perjanjian-pemilik-sertifikat.pdf
                  </a>
                </p>
              </div>
            </div>
            <div className="pt-5 px-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  onCheckedChange={(checked: boolean) => setAcceptTerm(checked)}
                  disabled={!isScrolledToBottom}
                  id="terms"
                  className="!rounded-[2px]"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Saya menyatakan bahwa data yang saya isi adalah benar dan
                  dapat dipertanggungjawabkan
                </label>
              </div>
              <div className="flex items-start mt-3 space-x-2">
                <Checkbox
                  onCheckedChange={(checked: boolean) =>
                    setAcceptCondition(checked)
                  }
                  disabled={!isScrolledToBottom}
                  id="condition"
                  className="!rounded-[2px]"
                />
                <label
                  htmlFor="condition"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <div>
                    Saya telah menyetujui
                    <a
                      href="https://repository.tilaka.id/CP_CPS.pdf"
                      target="_blank"
                      className="text-primary"
                    >
                      {' '}
                      CP/CPS
                    </a>
                    ,
                    <a
                      href="https://repository.tilaka.id/kebijakan-jaminan.pdf"
                      target="_blank"
                      className="text-primary"
                    >
                      {' '}
                      Kebijakan Jaminan
                    </a>
                    ,
                    <a
                      href="https://repository.tilaka.id/kebijakan-privasi.pdf"
                      target="_blank"
                      className="text-primary"
                    >
                      {' '}
                      Kebijakan Privasi
                    </a>
                    , dan
                    <a
                      href="https://repository.tilaka.id/perjanjian-pemilik-sertifikat.pdf"
                      target="_blank"
                      className="text-primary"
                    >
                      {' '}
                      Perjanjian Pemilik Sertifikat
                    </a>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-2 justify-center ">
            <Button
              onClick={() => stateSetter({ isOpen: false })}
              variant="ghost"
              className="border border-primary text-primary !px-10 w-fit md:w-auto font-semibold"
            >
              Kembali
            </Button>
            {state.confirmationType === 'fr' ? (
              <Button
                disabled={!acceptCondition || !acceptTerm}
                onClick={() => {
                  setOpenFrDialog(true);
                  stateSetter({ isOpen: false });
                }}
                className="font-semibold !px-10 w-fit md:w-auto md:max-w-none max-w-[136px]"
              >
                Konfirmasi
              </Button>
            ) : (
              <Link
                href="https://dev-api.tilaka.id/personal-webview/kyc/re-enroll?issue_id=issue-597ec4fd-daeb-481b-923b-4ca281f0c2dd&redirect_url=https://www.google.com"
                target="_blank"
                onClick={() => {
                  stateSetter({ isOpen: false });
                }}
              >
                <Button
                  disabled={!acceptCondition || !acceptTerm}
                  className="font-semibold !px-10 w-fit md:w-full md:max-w-none max-w-[136px]"
                >
                  Konfirmasi
                </Button>
              </Link>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <FRDialog
        showOTPButton={false}
        open={openFrDialog}
        setOpen={setOpenFrDialog}
        callbackCaptureProcessor={() => {
          setOpenFrDialog(false);
          setOpenCertInformation(true);
        }}
        subtitle={t('subtitle')}
        title={i('frTitle')}
      />

      <AlertDialog
        open={openCertInformation}
        onOpenChange={setOpenCertInformation}
      >
        <AlertDialogContent className="max-w-sm py-4">
          <AlertDialogHeader>
            <AlertDialogDescription className="text-black text-center pt-4">
              {i('content')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="!items-center mt-3 !justify-center pb-4">
            <AlertDialogCancel className="bg-primary text-white !px-10 !w-fit">
              {i('submit')}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TnCDialog;
