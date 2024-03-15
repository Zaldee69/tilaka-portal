import Image from 'next/image';
import {
  useTranslations,
  NextIntlClientProvider,
  useMessages
} from 'next-intl';
import LoginForm from '@/components/form/LoginForm';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Home({
  params,
  searchParams
}: {
  params: { locale: string };
  searchParams: {};
}) {
  const t = useTranslations('Login');

  const messages = useMessages();

  return (
    <main className="md:flex md:justify-between relative">
      {/* left side */}
      <div className="flex flex-col items-center mt-10 px-8 col-span-4 xl:w-[45%] w-full">
        <div className="flex justify-between items-center w-full">
          <Image
            src="/images/logo-tilaka.png"
            height={50}
            width={158}
            alt="Tilaka Logo"
            quality={100}
            priority
          />
          <LanguageSwitcher searchparams={searchParams} />
        </div>
        <h2 className="text-gray-2 mt-24">{t('title')}</h2>
        <p className="text-sm text-gray-3 pb-12 pt-3">{t('subtitle')}</p>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <LoginForm />
        </NextIntlClientProvider>
        <div className="mt-[calc(25vh-6rem)] sm:mt-[22vh] pb-10 text-center">
          <p className="text-sm text-gray-3">
            {t.rich('verifyPdf', {
              link: (chunks) => (
                <Link
                  key={0}
                  href="#"
                  className={buttonVariants({
                    className: '!p-0 !text-primary font-bold h-fit',
                    variant: 'link'
                  })}
                >
                  {chunks}
                </Link>
              )
            })}
          </p>
          <p className="text-sm text-gray-3">
            {t.rich('contactUs', {
              link: (chunks) => (
                <Link
                  key={0}
                  href="https://cantikatnt.atlassian.net/servicedesk/customer/portal/2/group/8/create/27"
                  target="_blank"
                  className={buttonVariants({
                    className: '!p-0 !text-primary font-bold h-fit mt-2',
                    variant: 'link'
                  })}
                >
                  {chunks}
                </Link>
              )
            })}
          </p>
        </div>
      </div>

      {/* right side */}
      <div className="w-[55%] hidden lg:block relative min-h-screen">
        <Image
          src="/images/big-image.png"
          alt="Banner"
          fill
          priority
          quality={100}
        />
      </div>
    </main>
  );
}
