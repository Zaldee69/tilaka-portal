'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  searchparams: {};
}

const LanguageSwitcher = React.forwardRef<
  HTMLDivElement,
  LanguageSwitcherProps
>(({ className, ...props }, ref) => {
  const pathname = usePathname();
  const redirectPathname = pathname.split('/').slice(2).join('/');
  const locale = pathname.includes('id') ? 'en/' : 'id/';
  const queryString = new URLSearchParams(props.searchparams as {}).toString();

  const href = '/' + locale + (redirectPathname || '') + '?' + queryString;

  const renderLink = (localeValue: string, label: string) => (
    <Link
      key={localeValue}
      href={href}
      locale={localeValue}
      className={cn('px-2 py-1 rounded-full text-white', {
        'bg-white text-primary': pathname.includes(`/${localeValue}`)
      })}
    >
      {label}
    </Link>
  );

  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        'flex items-center bg-primary rounded-full px-1 py-1 text-xs font-semibold',
        className
      )}
    >
      {renderLink('en', 'EN')}
      {renderLink('id', 'ID')}
    </div>
  );
});

LanguageSwitcher.displayName = 'LanguageSwitcher';

export default LanguageSwitcher;
