import Collapsible from '@/components/Collapsible';
import React from 'react';

const PdfViewer = () => {
  const Header = () => (
    <div className="flex items-center gap-3">
      <div className="bg-[#E1EAF2] rounded-full flex items-center justify-center w-8 h-8">
        <p className="font-bold ">W</p>
      </div>
      <p className="font-semibold text-[#1B4782]">Wahab Hidayat</p>
    </div>
  );

  const TimeStampHeader = () => (
    <div className="flex items-center gap-3">
      <p className="font-semibold text-[#1B4782]">Timestamp</p>
    </div>
  );

  return (
    <div className="flex flex-col flex-1 justify-between mt-5 bg-gray-6 h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow flex flex-col-reverse lg:flex-row">
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            hahaha
          </div>
        </div>
        <div className="shrink-0 border-2 border-gray-6 lg:w-96 lg:flex-[0.65] p-4 max-h-screen bg-white">
          <h4 className="pb-4">Informasi Dokumen</h4>
          <div className="max-h-[calc(100vh-9rem)] overflow-y-scroll no-scrollbar">
            <h6 className="text-gray-2">2 Penandatangan</h6>
            <Collapsible
              className="bg-gray-6 rounded-md !text-sm mt-3"
              header={<Header />}
              autoOpen
            >
              <div className="bg-gray-6 px-3 pb-3 rounded-b-md">
                <div className="bg-white p-2 rounded-sm">
                  <p className="text-gray-2 text-sm">Format Tanda Tangan</p>
                  <p className="font-medium my-2 text-sm">PAdES_BASELINE_T</p>
                  <p className="text-gray-2 text-xs">Rincian Validasi</p>
                  <div className="bg-[#FFFAE7] p-2 rounded-md text-sm mt-2 mb-3">
                    Rantai sertifikat untuk tandatangan tidak terpercaya,
                    sertifikat tidak diterbitkan oleh CA Berinduk (Kominfo) atau
                    tidak masuk ke dalam daftar terpercaya. Rantai sertifikat
                    untuk timestamp tidak terpercaya, sertifikat tidak
                    diterbitkan oleh CA Berinduk (Kominfo) atau tidak masuk ke
                    dalam daftar terpercaya. Algoritma SHA1 tidak lagi
                    disarankan untuk digunakan untuk time-stamp signature!
                  </div>
                  <p className="text-gray-2 text-xs">Rantai Sertifikat</p>
                  <p className="font-medium mt-1 text-sm">
                    WAHAB HIDAYAT (IDW6409)
                  </p>
                  <div className="flex items-center justify-between my-3">
                    <div>
                      {' '}
                      <p className="text-gray-2 text-xs">Waktu Klaim</p>
                      <p className="font-medium mt-1 text-sm">
                        2023-05-08 09:49:27 (UTC)
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-2 text-xs">
                        Waktu Tanda Tangan Valid
                      </p>
                      <p className="font-medium mt-1 text-sm">
                        2023-06-07 10:11:48 (UTC)
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-2 text-xs">Posisi Tanda Tangan</p>
                  <p className="font-medium mt-1 text-sm">1 Dari 1</p>
                  <p className="text-gray-2 text-xs mt-3">Timestamp (1)</p>
                  <Collapsible
                    className="bg-gray-6 rounded-t-md !text-sm mt-3"
                    header={<TimeStampHeader />}
                    autoOpen
                  >
                    <div className="bg-gray-6 px-3 pb-3 rounded-b-md">
                      <div className="bg-white p-2 rounded-sm">
                        <p className="text-gray-2 text-sm">
                          Format Tanda Tangan
                        </p>
                        <p className="font-medium my-2 text-sm">
                          PAdES_BASELINE_T
                        </p>
                        <p className="text-gray-2 text-xs">Rincian Validasi</p>
                        <div className="bg-[#FFFAE7] p-2 rounded-md text-sm mt-2 mb-3">
                          Rantai sertifikat untuk tandatangan tidak terpercaya,
                          sertifikat tidak diterbitkan oleh CA Berinduk
                          (Kominfo) atau tidak masuk ke dalam daftar terpercaya.
                          Rantai sertifikat untuk timestamp tidak terpercaya,
                          sertifikat tidak diterbitkan oleh CA Berinduk
                          (Kominfo) atau tidak masuk ke dalam daftar terpercaya.
                          Algoritma SHA1 tidak lagi disarankan untuk digunakan
                          untuk time-stamp signature!
                        </div>
                        <p className="text-gray-2 text-xs">Rantai Sertifikat</p>
                        <p className="font-medium mt-1 text-sm">
                          WAHAB HIDAYAT (IDW6409)
                        </p>
                        <div className="flex items-center justify-between my-3">
                          <div>
                            {' '}
                            <p className="text-gray-2 text-xs">Waktu Klaim</p>
                            <p className="font-medium mt-1 text-sm">
                              2023-05-08 09:49:27 (UTC)
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-2 text-xs">
                              Waktu Tanda Tangan Valid
                            </p>
                            <p className="font-medium mt-1 text-sm">
                              2023-06-07 10:11:48 (UTC)
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-2 text-xs">
                          Posisi Tanda Tangan
                        </p>
                        <p className="font-medium mt-1 text-sm">1 Dari 1</p>
                        <p className="text-gray-2 text-xs mt-3">
                          Timestamp (1)
                        </p>
                      </div>
                    </div>
                  </Collapsible>
                </div>
              </div>
            </Collapsible>
            <Collapsible
              className="bg-gray-6 rounded-md !text-sm mt-3"
              header={<Header />}
              autoOpen
            >
              <div className="bg-gray-6 px-3 pb-3 rounded-b-md">
                <div className="bg-white p-2 rounded-sm">
                  <p className="text-gray-2 text-sm">Format Tanda Tangan</p>
                  <p className="font-medium my-2 text-sm">PAdES_BASELINE_T</p>
                  <p className="text-gray-2 text-xs">Rincian Validasi</p>
                  <div className="bg-[#FFFAE7] p-2 rounded-md text-sm mt-2 mb-3">
                    Rantai sertifikat untuk tandatangan tidak terpercaya,
                    sertifikat tidak diterbitkan oleh CA Berinduk (Kominfo) atau
                    tidak masuk ke dalam daftar terpercaya. Rantai sertifikat
                    untuk timestamp tidak terpercaya, sertifikat tidak
                    diterbitkan oleh CA Berinduk (Kominfo) atau tidak masuk ke
                    dalam daftar terpercaya. Algoritma SHA1 tidak lagi
                    disarankan untuk digunakan untuk time-stamp signature!
                  </div>
                  <p className="text-gray-2 text-xs">Rantai Sertifikat</p>
                  <p className="font-medium mt-1 text-sm">
                    WAHAB HIDAYAT (IDW6409)
                  </p>
                  <div className="flex items-center justify-between my-3">
                    <div>
                      {' '}
                      <p className="text-gray-2 text-xs">Waktu Klaim</p>
                      <p className="font-medium mt-1 text-sm">
                        2023-05-08 09:49:27 (UTC)
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-2 text-xs">
                        Waktu Tanda Tangan Valid
                      </p>
                      <p className="font-medium mt-1 text-sm">
                        2023-06-07 10:11:48 (UTC)
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-2 text-xs">Posisi Tanda Tangan</p>
                  <p className="font-medium mt-1 text-sm">1 Dari 1</p>
                  <p className="text-gray-2 text-xs mt-3">Timestamp (1)</p>
                  <Collapsible
                    className="bg-gray-6 rounded-t-md !text-sm mt-3"
                    header={<TimeStampHeader />}
                    autoOpen
                  >
                    <div className="bg-gray-6 px-3 pb-3 rounded-b-md">
                      <div className="bg-white p-2 rounded-sm">
                        <p className="text-gray-2 text-sm">
                          Format Tanda Tangan
                        </p>
                        <p className="font-medium my-2 text-sm">
                          PAdES_BASELINE_T
                        </p>
                        <p className="text-gray-2 text-xs">Rincian Validasi</p>
                        <div className="bg-[#FFFAE7] p-2 rounded-md text-sm mt-2 mb-3">
                          Rantai sertifikat untuk tandatangan tidak terpercaya,
                          sertifikat tidak diterbitkan oleh CA Berinduk
                          (Kominfo) atau tidak masuk ke dalam daftar terpercaya.
                          Rantai sertifikat untuk timestamp tidak terpercaya,
                          sertifikat tidak diterbitkan oleh CA Berinduk
                          (Kominfo) atau tidak masuk ke dalam daftar terpercaya.
                          Algoritma SHA1 tidak lagi disarankan untuk digunakan
                          untuk time-stamp signature!
                        </div>
                        <p className="text-gray-2 text-xs">Rantai Sertifikat</p>
                        <p className="font-medium mt-1 text-sm">
                          WAHAB HIDAYAT (IDW6409)
                        </p>
                        <div className="flex items-center justify-between my-3">
                          <div>
                            {' '}
                            <p className="text-gray-2 text-xs">Waktu Klaim</p>
                            <p className="font-medium mt-1 text-sm">
                              2023-05-08 09:49:27 (UTC)
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-2 text-xs">
                              Waktu Tanda Tangan Valid
                            </p>
                            <p className="font-medium mt-1 text-sm">
                              2023-06-07 10:11:48 (UTC)
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-2 text-xs">
                          Posisi Tanda Tangan
                        </p>
                        <p className="font-medium mt-1 text-sm">1 Dari 1</p>
                        <p className="text-gray-2 text-xs mt-3">
                          Timestamp (1)
                        </p>
                      </div>
                    </div>
                  </Collapsible>
                </div>
              </div>
            </Collapsible>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
