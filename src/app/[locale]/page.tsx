import Image from 'next/image';
import {
  useTranslations,
  NextIntlClientProvider,
  useMessages
} from 'next-intl';
import LoginForm from '@/components/form/LoginForm';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function Home({ params }: { params: { locale: string } }) {
  const t = useTranslations('Login');

  const messages = useMessages();

  return (
    <main className="md:flex md:justify-between h-screen relative">
      {/* left side */}
      <div className="flex flex-col items-center mt-10 px-8 col-span-4 md:w-[45%]">
        <Image
          src="/images/logo-tilaka.svg"
          height={50}
          width={158}
          alt="Tilaka Logo"
          quality={100}
          priority
          className="md:absolute left-10"
        />
        <h2 className="text-gray-2 mt-28 md:mt-32">{t('title')}</h2>
        <p className="text-sm text-gray-3 pb-12 pt-3">{t('subtitle')}</p>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <LoginForm />
        </NextIntlClientProvider>
        <p className="text-sm text-gray-3 absolute bottom-10 md:bottom-5">
          {t.rich('verifyPdf', {
            link: (chunks) => (
              <Link
                key={0}
                href="#"
                className={buttonVariants({
                  className: '!p-0 !text-primary font-bold',
                  variant: 'link'
                })}
              >
                {chunks}
              </Link>
            )
          })}
        </p>
      </div>
      {/* right side */}
      <div className="bg-login-banner object-cover bg-cover w-[55%] bg-no-repeat hidden md:block" />
    </main>
  );
}
