import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import React from 'react';
import { CertIcon, EditIcon } from '../../../../../public/icons/icons';
import { Link } from '@/navigation';
import { Check, Dot } from 'lucide-react';
import ChangePasswordDialog from './dialog/ChangePassword';
import ChangeAutheticationModeDialog from './dialog/ChangeAutheticationMode';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Page = ({
  params,
  searchParams
}: {
  params: { locale: string };
  searchParams: {};
}) => {
  const t = useTranslations('Dashboard');
  return (
    <div className="p-5 mx-auto">
      <h1 className="text-gray-1">{t('sidebar.settings')}</h1>

      <div className="mt-5 relative flex flex-col xl:flex-row gap-3 w-full mb-10 md:mb-0">
        <div className="bg-white custom-shadow right-0 xl:sticky top-20 rounded-2xl border border-gray-6 xl:w-[32%] h-fit p-4">
          <div className="flex items-center justify-start gap-3">
            <div className="bg-primary rounded-full flex items-center justify-center w-20 h-20">
              <p className="text-white text-3xl font-bold ">M</p>
            </div>
            <div>
              <h5 className="text-gray-1">Muhammad John Doe</h5>
              <p className="text-gray-3 text-sm font-semibold mt-1">johndoe1</p>
              <p className="text-xs mt-1">NIK: 12345678901234567</p>
            </div>
          </div>
          <ChangePasswordDialog />
          <ChangeAutheticationModeDialog />
          <LanguageSwitcher
            className="w-fit mt-3 md:hidden"
            searchparams={searchParams}
          />
        </div>
        <div className="xl:w-[68%] pb-10 bg-white custom-shadow p-5 rounded-2xl">
          <h4>Akun Tertaut</h4>
          <p className="text-sm text-[#272B30] mt-2">
            Untuk melakukan perubahan data pengguna, silahkan menghubungi
            Administrator Perusahaan
          </p>

          <div className="flex flex-col gap-4 mt-4">
            <div className="border-2 border-primary rounded-[20px] p-4 relative">
              <div className="absolute top-3 flex items-center">
                <Dot strokeWidth={10} className="animate-pulse text-accent" />
                <p className="text-sm text-accent  font-semibold">
                  Sedang Login
                </p>
              </div>
              <div className="flex xl:flex-row flex-col xl:gap-20 gap-4 xl:justify-between mt-8">
                <div>
                  <div className="flex items-center gap-5 cursor-pointer mb-3">
                    <div className="p-3 bg-secondary-1 rounded-md">
                      <svg
                        width="36"
                        height="34"
                        viewBox="0 0 36 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 8.04167V4.45833C18 2.4875 16.3875 0.875 14.4167 0.875H3.66666C1.69583 0.875 0.0833282 2.4875 0.0833282 4.45833V29.5417C0.0833282 31.5125 1.69583 33.125 3.66666 33.125H32.3333C34.3042 33.125 35.9167 31.5125 35.9167 29.5417V11.625C35.9167 9.65417 34.3042 8.04167 32.3333 8.04167H18ZM14.4167 29.5417H3.66666V25.9583H14.4167V29.5417ZM14.4167 22.375H3.66666V18.7917H14.4167V22.375ZM14.4167 15.2083H3.66666V11.625H14.4167V15.2083ZM14.4167 8.04167H3.66666V4.45833H14.4167V8.04167ZM32.3333 29.5417H18V11.625H32.3333V29.5417ZM28.75 15.2083H21.5833V18.7917H28.75V15.2083ZM28.75 22.375H21.5833V25.9583H28.75V22.375Z"
                          fill="#828282"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">PT. Maju Terus</p>
                      <p className="text-sm text-gray-3 mt-1">
                        johndoe@yopmail.com
                      </p>
                    </div>
                  </div>
                  <Link
                    className="underline decoration-primary underline-offset-4"
                    href="/dashboard/settings/certificate"
                  >
                    {' '}
                    <div className="flex gap-1 items-center">
                      <CertIcon fill="#0D5FB3" />
                      <p className="text-primary text-xs font-semibold">
                        Lihat Sertifikat
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="flex-1">
                  <div className="bg-[#F8F9FF] rounded-xl px-3 py-4">
                    <div className="flex gap-2 items-center justify-between">
                      <h5>{t('signing')}</h5>
                      <Button
                        variant="ghost"
                        className="items-center gap-2 font-semibold text-primary p-0 h-0 hidden xl:flex"
                      >
                        <EditIcon fill="#0D5FB3" svgClassName="flex-none" />
                        Ubah Tandatangan
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="bg-white rounded-xl p-3">
                        <svg
                          width="50"
                          height="53"
                          viewBox="0 0 50 53"
                          fill="none"
                          className="block mx-auto"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.58331 23.465C1.58331 22.7654 1.89594 22.2392 2.28486 21.6596C3.48258 19.8747 4.88021 18.1919 6.45402 16.7195C8.11115 15.1691 10.9017 12.4074 13.3792 12.2258C15.5584 12.066 14.332 15.6222 14.0507 16.779C12.0854 24.8615 9.40298 33.0726 5.9429 40.6562C5.77816 41.0172 3.29056 46.2676 2.84609 44.019C1.91542 39.3108 2.54035 33.8988 5.15116 29.8038C8.25222 24.9399 13.401 20.9529 17.9593 17.4734C18.1182 17.3521 19.4864 16.1631 19.7633 16.3624C20.1532 16.643 19.564 18.6418 19.5027 18.9019C18.2768 24.1021 16.6867 29.2597 14.8725 34.2876C14.8483 34.3549 14.106 36.2933 14.632 35.607C16.3375 33.3817 17.8321 30.9334 19.1419 28.4646C20.6197 25.6794 21.8097 22.7257 22.7899 19.7351C23.235 18.3773 23.7976 16.8935 23.9425 15.4597C23.9514 15.3708 23.9728 15.1048 23.9525 15.1918C23.8714 15.5394 23.749 15.8649 23.6318 16.2037C22.2701 20.1394 20.9581 24.1142 19.9236 28.1472C19.3724 30.2963 18.7996 32.5189 18.5807 34.734C18.4383 36.1745 19.7615 35.1723 20.4348 34.7042C22.7852 33.0701 24.9252 30.9546 26.4881 28.5638C28.4202 25.6082 28.224 22.4962 27.1194 19.259C26.2758 16.7867 25.0998 14.4354 24.2131 11.9778C24.1041 11.6757 23.5816 9.79368 23.6017 10.1029C24.0819 17.4694 23.0987 24.7791 22.5895 32.1152C22.5104 33.2545 22.3163 34.6592 22.5093 35.8054C22.5433 36.0071 22.7512 35.4733 22.8601 35.2994C23.4766 34.3152 24.0573 33.3126 24.6139 32.2937C26.4543 28.9248 28.206 25.4743 29.7853 21.977C30.4941 20.4075 30.9852 18.7543 31.6895 17.1857C32.1715 16.1122 31.5918 19.5399 31.3888 20.6974C30.9154 23.3964 30.0312 25.9918 29.4446 28.663C29.0973 30.2439 29.2459 27.6844 29.2642 27.4528C29.5485 23.8387 30.324 20.2695 31.3287 16.7889C31.3855 16.5921 32.1899 13.9012 32.2607 14.5669C32.7312 18.9909 32.6115 23.4879 32.6115 27.929C32.6115 29.6096 32.5422 31.3081 32.6115 32.9881C32.6447 33.7934 34.1322 32.4566 34.3052 32.2937C34.727 31.8966 35.7421 31.0562 35.5981 30.3792C35.4385 29.6289 34.6882 28.8936 34.2752 28.3059C32.302 25.4984 30.6546 22.4975 29.4646 19.2788C27.7352 14.6011 27.0748 9.66837 26.8789 4.71645C26.8449 3.8573 26.8388 2.99698 26.8388 2.13728C26.8388 2.00106 26.8144 1.27237 26.8488 1.98848C26.9997 5.12393 27.3288 8.22641 27.35 11.3727C27.4012 18.976 26.8708 26.5448 26.0371 34.0991C25.499 38.9743 24.9542 43.8479 24.6039 48.7409C24.5463 49.5456 24.533 50.3581 24.4536 51.1613C24.4411 51.2872 24.252 52.0938 24.3534 51.3994C24.9121 47.5704 26.6155 43.8056 28.1016 40.2693C30.0785 35.5649 32.1702 30.494 35.2774 26.3815C36.5271 24.7274 39.2112 22.5985 41.5512 22.8301C41.7277 22.8476 39.8213 25.4312 39.8073 25.449C37.9803 27.7827 36.1751 30.1967 34.0146 32.2441C33.9791 32.2778 32.8647 33.382 32.8019 32.9782C32.438 30.6365 32.8366 27.7557 33.2128 25.4688C34.1029 20.0587 36.2275 14.5545 39.1459 9.89463C40.9471 7.01851 43.3239 4.36402 46.2715 2.61344C46.9324 2.22097 47.6814 1.77722 48.4664 1.69089C48.5177 1.68525 49.1169 1.68097 48.8472 1.68097"
                            stroke="black"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                        <p className="text-center text-sm mt-2 text-[#272B30]">
                          {t('signature')}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-3">
                        <svg
                          width="54"
                          className="block mx-auto"
                          height="53"
                          viewBox="0 0 54 53"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.3254 7.58484C14.4842 4.81288 22.5184 0.55289 26.6758 3.04178C27.7483 3.68381 27.884 5.30074 28.0042 6.39321C28.3946 9.93859 28.157 13.6616 27.4434 17.1476C24.9315 29.4173 16.2241 44.4707 5.02288 50.9301C-3.22979 55.6891 3.97951 36.5239 8.72053 27.7523C13.4615 18.9807 20.4778 9.52725 28.4766 3.62269C30.5079 2.12322 33.2063 1.06849 35.709 2.07358C37.7338 2.88676 38.1192 5.53152 38.3658 7.43588C38.959 12.0178 38.0875 16.4489 36.447 20.7225C35.7856 22.4455 33.0852 27.275 34.0854 25.7273C36.7394 21.6205 40.6186 18.0849 44.2403 14.8686C44.3922 14.7337 47.294 11.8083 47.1332 13.3493C46.8872 15.7079 45.4692 17.8274 44.6535 20.0075C44.3848 20.726 43.646 21.7997 44.7421 21.9141C47.4744 22.1993 49.9149 20.5196 52.2402 19.3819"
                            stroke="#333333"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                        <p className="text-center text-sm mt-2 text-[#272B30]">
                          {t('initial')}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="mt-3 w-full xl:hidden custom-shadow text-primary hover:text-primary bg-white font-semibold gap-2 py-5 lg:hover:scale-105 transition-transform"
                      variant="ghost"
                    >
                      <EditIcon fill="#0D5FB3" />
                      {t('changeSignature')}
                    </Button>
                  </div>
                </div>
              </div>
              <Button className="font-semibold mt-5 xl:!w-fit xl:p-4 w-full">
                <Check className="w-5 h-5 mr-2" />
                Akun Utama
              </Button>
            </div>

            <div className="border-2 border-gray-6 rounded-[20px] p-4">
              <div className="flex xl:flex-row flex-col xl:gap-20 gap-4 xl:justify-between">
                <div>
                  <div className="flex items-center gap-5 cursor-pointer mb-3">
                    <div className="p-3 bg-secondary-1 rounded-md">
                      <svg
                        width="36"
                        height="34"
                        viewBox="0 0 36 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 8.04167V4.45833C18 2.4875 16.3875 0.875 14.4167 0.875H3.66666C1.69583 0.875 0.0833282 2.4875 0.0833282 4.45833V29.5417C0.0833282 31.5125 1.69583 33.125 3.66666 33.125H32.3333C34.3042 33.125 35.9167 31.5125 35.9167 29.5417V11.625C35.9167 9.65417 34.3042 8.04167 32.3333 8.04167H18ZM14.4167 29.5417H3.66666V25.9583H14.4167V29.5417ZM14.4167 22.375H3.66666V18.7917H14.4167V22.375ZM14.4167 15.2083H3.66666V11.625H14.4167V15.2083ZM14.4167 8.04167H3.66666V4.45833H14.4167V8.04167ZM32.3333 29.5417H18V11.625H32.3333V29.5417ZM28.75 15.2083H21.5833V18.7917H28.75V15.2083ZM28.75 22.375H21.5833V25.9583H28.75V22.375Z"
                          fill="#828282"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">PT. Maju Terus</p>
                      <p className="text-sm text-gray-3 mt-1">
                        johndoe@yopmail.com
                      </p>
                    </div>
                  </div>
                  <Link
                    className="underline decoration-primary underline-offset-4"
                    href="/dashboard/settings/certificate"
                  >
                    {' '}
                    <div className="flex gap-1 items-center">
                      <CertIcon fill="#0D5FB3" />
                      <p className="text-primary text-xs font-semibold">
                        Lihat Sertifikat
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="flex-1">
                  <div className="bg-[#F8F9FF] rounded-xl px-3 py-4">
                    <div className="flex gap-2 items-center justify-between">
                      <h5>{t('signing')}</h5>
                      <Button
                        variant="ghost"
                        className="items-center gap-2 font-semibold text-primary p-0 h-0 hidden xl:flex"
                      >
                        <EditIcon fill="#0D5FB3" svgClassName="flex-none" />
                        Ubah Tandatangan
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="bg-white rounded-xl p-3">
                        <svg
                          width="50"
                          height="53"
                          viewBox="0 0 50 53"
                          fill="none"
                          className="block mx-auto"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.58331 23.465C1.58331 22.7654 1.89594 22.2392 2.28486 21.6596C3.48258 19.8747 4.88021 18.1919 6.45402 16.7195C8.11115 15.1691 10.9017 12.4074 13.3792 12.2258C15.5584 12.066 14.332 15.6222 14.0507 16.779C12.0854 24.8615 9.40298 33.0726 5.9429 40.6562C5.77816 41.0172 3.29056 46.2676 2.84609 44.019C1.91542 39.3108 2.54035 33.8988 5.15116 29.8038C8.25222 24.9399 13.401 20.9529 17.9593 17.4734C18.1182 17.3521 19.4864 16.1631 19.7633 16.3624C20.1532 16.643 19.564 18.6418 19.5027 18.9019C18.2768 24.1021 16.6867 29.2597 14.8725 34.2876C14.8483 34.3549 14.106 36.2933 14.632 35.607C16.3375 33.3817 17.8321 30.9334 19.1419 28.4646C20.6197 25.6794 21.8097 22.7257 22.7899 19.7351C23.235 18.3773 23.7976 16.8935 23.9425 15.4597C23.9514 15.3708 23.9728 15.1048 23.9525 15.1918C23.8714 15.5394 23.749 15.8649 23.6318 16.2037C22.2701 20.1394 20.9581 24.1142 19.9236 28.1472C19.3724 30.2963 18.7996 32.5189 18.5807 34.734C18.4383 36.1745 19.7615 35.1723 20.4348 34.7042C22.7852 33.0701 24.9252 30.9546 26.4881 28.5638C28.4202 25.6082 28.224 22.4962 27.1194 19.259C26.2758 16.7867 25.0998 14.4354 24.2131 11.9778C24.1041 11.6757 23.5816 9.79368 23.6017 10.1029C24.0819 17.4694 23.0987 24.7791 22.5895 32.1152C22.5104 33.2545 22.3163 34.6592 22.5093 35.8054C22.5433 36.0071 22.7512 35.4733 22.8601 35.2994C23.4766 34.3152 24.0573 33.3126 24.6139 32.2937C26.4543 28.9248 28.206 25.4743 29.7853 21.977C30.4941 20.4075 30.9852 18.7543 31.6895 17.1857C32.1715 16.1122 31.5918 19.5399 31.3888 20.6974C30.9154 23.3964 30.0312 25.9918 29.4446 28.663C29.0973 30.2439 29.2459 27.6844 29.2642 27.4528C29.5485 23.8387 30.324 20.2695 31.3287 16.7889C31.3855 16.5921 32.1899 13.9012 32.2607 14.5669C32.7312 18.9909 32.6115 23.4879 32.6115 27.929C32.6115 29.6096 32.5422 31.3081 32.6115 32.9881C32.6447 33.7934 34.1322 32.4566 34.3052 32.2937C34.727 31.8966 35.7421 31.0562 35.5981 30.3792C35.4385 29.6289 34.6882 28.8936 34.2752 28.3059C32.302 25.4984 30.6546 22.4975 29.4646 19.2788C27.7352 14.6011 27.0748 9.66837 26.8789 4.71645C26.8449 3.8573 26.8388 2.99698 26.8388 2.13728C26.8388 2.00106 26.8144 1.27237 26.8488 1.98848C26.9997 5.12393 27.3288 8.22641 27.35 11.3727C27.4012 18.976 26.8708 26.5448 26.0371 34.0991C25.499 38.9743 24.9542 43.8479 24.6039 48.7409C24.5463 49.5456 24.533 50.3581 24.4536 51.1613C24.4411 51.2872 24.252 52.0938 24.3534 51.3994C24.9121 47.5704 26.6155 43.8056 28.1016 40.2693C30.0785 35.5649 32.1702 30.494 35.2774 26.3815C36.5271 24.7274 39.2112 22.5985 41.5512 22.8301C41.7277 22.8476 39.8213 25.4312 39.8073 25.449C37.9803 27.7827 36.1751 30.1967 34.0146 32.2441C33.9791 32.2778 32.8647 33.382 32.8019 32.9782C32.438 30.6365 32.8366 27.7557 33.2128 25.4688C34.1029 20.0587 36.2275 14.5545 39.1459 9.89463C40.9471 7.01851 43.3239 4.36402 46.2715 2.61344C46.9324 2.22097 47.6814 1.77722 48.4664 1.69089C48.5177 1.68525 49.1169 1.68097 48.8472 1.68097"
                            stroke="black"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                        <p className="text-center text-sm mt-2 text-[#272B30]">
                          {t('signature')}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-3">
                        <svg
                          width="54"
                          className="block mx-auto"
                          height="53"
                          viewBox="0 0 54 53"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.3254 7.58484C14.4842 4.81288 22.5184 0.55289 26.6758 3.04178C27.7483 3.68381 27.884 5.30074 28.0042 6.39321C28.3946 9.93859 28.157 13.6616 27.4434 17.1476C24.9315 29.4173 16.2241 44.4707 5.02288 50.9301C-3.22979 55.6891 3.97951 36.5239 8.72053 27.7523C13.4615 18.9807 20.4778 9.52725 28.4766 3.62269C30.5079 2.12322 33.2063 1.06849 35.709 2.07358C37.7338 2.88676 38.1192 5.53152 38.3658 7.43588C38.959 12.0178 38.0875 16.4489 36.447 20.7225C35.7856 22.4455 33.0852 27.275 34.0854 25.7273C36.7394 21.6205 40.6186 18.0849 44.2403 14.8686C44.3922 14.7337 47.294 11.8083 47.1332 13.3493C46.8872 15.7079 45.4692 17.8274 44.6535 20.0075C44.3848 20.726 43.646 21.7997 44.7421 21.9141C47.4744 22.1993 49.9149 20.5196 52.2402 19.3819"
                            stroke="#333333"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                        <p className="text-center text-sm mt-2 text-[#272B30]">
                          {t('initial')}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="mt-3 w-full xl:hidden custom-shadow text-primary hover:text-primary bg-white font-semibold gap-2 py-5 lg:hover:scale-105 transition-transform"
                      variant="ghost"
                    >
                      <EditIcon fill="#0D5FB3" />
                      {t('changeSignature')}
                    </Button>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="font-semibold mt-5 xl:!w-fit xl:p-4 w-full"
              >
                Jadikan Akun Utama
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
