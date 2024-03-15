import React from 'react';
import Image from 'next/image';
import NavbarMenu from './NavbarMenu';
import { MobileSidebar } from '../sidebar/MobileSidebar';
import { Input } from '../ui/input';
import { SearchIcon } from '../../../public/icons/icons';
import SidebarCollpaseTrigger from '../sidebar/SidebarCollpaseTrigger';
import { useTranslations } from 'next-intl';

const Navbar = ({ searchParams }: { searchParams: {} }) => {
  const t = useTranslations('Navbar');
  return (
    <nav className="px-5 py-4 bg-white shadow-sm md:shadow-none sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className=" items-center gap-6 w-4/12 hidden lg:flex">
          <SidebarCollpaseTrigger />
          <Input
            placeholder={t('searchDoc')}
            className="h-10 pl-10 w-full"
            icon={<SearchIcon svgClassName="mt-2" />}
            iconPosition="left"
          />
        </div>
        <div className="flex items-center gap-x-5">
          <MobileSidebar />
          <Image
            src="/images/logo-tilaka.png"
            height={30}
            width={118}
            alt="Tilaka Logo"
            className="lg:hidden"
            quality={100}
            priority
          />
        </div>
        <NavbarMenu searchParams={searchParams} />
      </div>
    </nav>
  );
};

export default Navbar;
