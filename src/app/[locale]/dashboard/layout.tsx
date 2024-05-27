import Navbar from '@/components/navbar/Navbar';
import Sidebar from '@/components/sidebar';
import { SidebarContextProvider } from '@/components/sidebar/SidebarContextProvider';
import { NextIntlClientProvider, useMessages } from 'next-intl';

const DashboarLayout = ({
  children,
  params,
  searchParams
}: {
  children: React.ReactNode;
  params: { locale: string };
  searchParams: {};
}) => {
  const messages = useMessages();
  return (
    <NextIntlClientProvider locale={params.locale} messages={messages}>
      <SidebarContextProvider>
        <main className="relative">
          <div className="flex">
            <Sidebar />
            <div className="w-full">
              <Navbar params={params} searchParams={searchParams} />
              <div>{children}</div>
            </div>
          </div>
        </main>
      </SidebarContextProvider>
    </NextIntlClientProvider>
  );
};

export default DashboarLayout;
