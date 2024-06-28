'use client';
import React, { useContext } from 'react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { sidebarLinks } from '@/constants';
import { SidebarContext } from './SidebarContextProvider';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';

const sidebarMessages = {
  'sidebar.dashboard': 'Dashboard',
  'sidebar.document': 'Dokumen',
  'sidebar.verifyPdf': 'Verifikasi PDF',
  'sidebar.settings': 'Pengaturan'
};

const SidebarLinks: React.FC<{
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setOpen }) => {
  const t = useTranslations('Dashboard');
  const path = usePathname();
  const { state } = useContext(SidebarContext);

  const checkPathname = (href: string) => {
    const lastPathSegment = path?.split('/').pop();
    const hrefLastSegment = href?.split('/').pop();

    // Check if the last path segment is part of the href's last segment
    const isSubPath =
      lastPathSegment &&
      hrefLastSegment &&
      lastPathSegment.includes(hrefLastSegment);

    // Check if the href matches the path or any of the subPaths
    const isMatchingSubPath = sidebarLinks.find(
      (link) =>
        link.path === href &&
        link.subPath &&
        link.subPath.some((sub) => `/${lastPathSegment}` === sub)
    );

    return !isSubPath && !isMatchingSubPath;
  };
  return (
    <div className="flex flex-col gap-3 items-start">
      {sidebarLinks.map((item) => (
        <Link
          onClick={() => setOpen && setOpen(false)}
          className={buttonVariants({
            variant: 'secondary',
            className: cn(
              `w-full !justify-start group font-semibold !px-3 hover:!text-primary hover:!bg-secondary   ${checkPathname(item.path) ? 'bg-transparent !text-gray-1' : '!text-primary'} `,
              { '!justify-center': !state.isOpen }
            )
          })}
          href={item.path}
          key={item.title}
        >
          <item.Icons
            svgClassName={cn('flex-none mr-3', {
              'mr-0': !state.isOpen
            })}
            pathClassName={cn(
              'group-hover:fill-primary fill-[#828282] transition-colors',
              {
                'fill-primary': !checkPathname(item.path)
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
