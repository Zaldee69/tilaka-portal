'use client';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import React, { useContext } from 'react';
import { buttonVariants } from '../ui/button';
import { usePathname } from 'next/navigation';
import { sidebarLinks } from '@/constants';
import { SidebarContext } from './SidebarContextProvider';
import { cn } from '@/lib/utils';

const sidebarMessages = {
  'sidebar.dashboard': 'Dashboard',
  'sidebar.document': 'Dokumen',
  'sidebar.verifyPdf': 'Verifikasi PDF',
  'sidebar.settings': 'Pengaturan'
};

interface Props {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarLinks: React.FC<Props> = ({ setOpen }) => {
  const t = useTranslations('Dashboard');
  const path = usePathname();

  const { state } = useContext(SidebarContext);

  const checkPathname = (href: string) => {
    return !path
      ?.split('/')
      [
        path?.split('/').length - 1
      ]?.includes(href?.split('/')[href.split('/').length - 1]);
  };

  return (
    <div className="flex flex-col gap-3 items-start">
      {sidebarLinks.map((item) => (
        <Link
          onClick={() => setOpen && setOpen(false)}
          className={buttonVariants({
            variant: 'secondary',
            className: cn(
              `w-full !justify-start group font-semibold !px-3 hover:!text-primary hover:!bg-secondary   ${checkPathname(item.href) ? 'bg-transparent !text-gray-1' : '!text-primary'} `,
              { '!justify-center': !state.isOpen }
            )
          })}
          href={item.href}
          key={item.title}
        >
          <item.Icons
            svgClassName={cn('flex-none mr-3', {
              'mr-0': !state.isOpen
            })}
            pathClassName={cn(
              'group-hover:fill-primary fill-[#828282] transition-colors',
              {
                'fill-primary': !checkPathname(item.href)
              }
            )}
          />
          {state.isOpen && t(`${item.title as keyof typeof sidebarMessages}`)}
        </Link>
      ))}
    </div>
  );
};

export default SidebarLinks;
