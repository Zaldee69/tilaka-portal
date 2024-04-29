'use client';
import { useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { ScrollArea } from '@/components/ui/scroll-area';
import { accountList, notifications } from '@/constants';
import { cn } from '@/lib/utils';
import { useOnClickOutside } from '@/hooks/useClickOutside';
import {
  BellIcon,
  CorporateIconBig,
  CorporateIconSmall,
  SearchIcon
} from '../../../public/icons/icons';
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  XCircle
} from 'lucide-react';
import { Button, buttonVariants } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Separator } from '../ui/separator';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../LanguageSwitcher';
import { Link } from '@/navigation';

const NavbarMenu = ({ searchParams }: { searchParams: {} }) => {
  const [showMenu, setShowMenu] = useState<
    'account-list' | 'notification' | 'search' | null
  >(null);
  const ref = useRef(null);

  const handleClickOutside = () => {
    setShowMenu(null);
  };

  const t = useTranslations('Navbar');

  useOnClickOutside(ref, handleClickOutside);

  const menuProps = useSpring({
    height: showMenu === null ? 0 : showMenu === 'search' ? 80 : 270,
    paddingTop: showMenu !== null ? 12 : 0,
    paddingBottom: showMenu !== null ? 8 : 0,
    config: {
      duration: 250
    }
  });

  const menuPopUpWrapper = () => (
    <animated.div
      style={menuProps}
      className="absolute right-0 md:right-5 top-16 !bg-white shadow-md rounded-b-xl w-full md:w-96 overflow-hidden"
    >
      {showMenu === 'account-list' ? (
        <AccountListSelect logoutTitle={t('logout')} />
      ) : showMenu === 'search' ? (
        <div className="px-5">
          {' '}
          <SearchInput placeholder={t('searchDoc')} />{' '}
        </div>
      ) : showMenu === 'notification' ? (
        <NotificationList viewAllTitle={t('viewAll')} />
      ) : null}
    </animated.div>
  );

  const openMenuHandler = (
    menu: 'account-list' | 'notification' | 'search' | null
  ) => {
    if (menu === showMenu) {
      setShowMenu(null);
    } else {
      setShowMenu(menu);
    }
  };

  const iconFill = (menu: string | null) => {
    return showMenu === menu ? '#0D5FB3' : '#323232';
  };

  return (
    <div ref={ref}>
      <div className="flex items-center gap-x-7">
        <Button
          onClick={() => openMenuHandler('search')}
          variant="ghost"
          className="h-fit w-fit p-0 md:hidden"
        >
          <SearchIcon fill={iconFill('search')} />
        </Button>
        <Button
          onClick={() => openMenuHandler('notification')}
          variant="ghost"
          className="h-fit w-fit p-0"
        >
          <BellIcon fill={iconFill('notification')} />
        </Button>
        <Button
          onClick={() => openMenuHandler('account-list')}
          variant="ghost"
          className="h-fit w-fit p-0 justify-start hover:text-black"
        >
          <div className="flex items-center gap-2">
            <span className="p-2 bg-[#F2F9FF] rounded-xl">
              {' '}
              <CorporateIconSmall />{' '}
            </span>
            <div className="md:block hidden">
              <p className="font-semibold truncate max-w-60">
                johndoe@yopmail.com
              </p>
              <p className="text-xs font-light text-start truncate max-w-60">
                PT. John Doe Capital
              </p>
            </div>
            <ChevronDown
              color={iconFill('account-list')}
              className={cn('rotate-0 transition-transform duration-200', {
                'rotate-180': showMenu === 'account-list'
              })}
              size={18}
            />
          </div>
        </Button>
        <LanguageSwitcher
          className="hidden md:flex"
          searchparams={searchParams}
        />
      </div>
      {menuPopUpWrapper()}
    </div>
  );
};

const SearchInput = ({ placeholder }: { placeholder: string }) => (
  <div className="pb-5">
    <Input
      placeholder={placeholder}
      className="h-10"
      icon={<SearchIcon svgClassName="mt-2" />}
    />
  </div>
);

const AccountListSelect = ({ logoutTitle }: { logoutTitle: string }) => {
  const [account, setAccount] = useState(accountList);

  const handleChange = (value: string) => {
    const updateAccountList = accountList.map((account) => {
      if (account.email === value) {
        return { ...account, isPrimary: true };
      } else {
        return { ...account, isPrimary: false };
      }
    });

    setAccount(updateAccountList);
  };

  return (
    <div>
      <ScrollArea className="h-[200px] px-5">
        <RadioGroup
          onValueChange={(value) => handleChange(value)}
          className="w-full"
          defaultValue="john.doe@example.com"
        >
          {account.map((account) => (
            <div
              key={account.id}
              className={cn(
                'flex items-center justify-between border p-2 rounded-md border-input  cursor-pointer',
                {
                  'border-primary': account.isPrimary
                }
              )}
            >
              <Label
                className="flex justify-between items-center gap-3 cursor-pointer"
                htmlFor={account.id}
              >
                <div className="p-1.5 bg-[#F2F9FF] rounded-lg">
                  <CorporateIconBig />
                </div>
                <div>
                  <p className="font-semibold truncate max-w-60">
                    {account.email}
                  </p>
                  <p className="text-xs truncate max-w-60">{account.company}</p>
                </div>
              </Label>
              <RadioGroupItem
                className={cn({
                  'border-primary/50': account.isPrimary
                })}
                value={account.email}
                id={account.id}
              />
            </div>
          ))}
        </RadioGroup>
      </ScrollArea>
      <Link
        href="/"
        className={buttonVariants({
          className: '!w-fit !px-4 group mt-2',
          variant: 'ghost'
        })}
      >
        <ExternalLink size={22} className="text-gray-400" />
        <p className="font-semibold ml-2">{logoutTitle}</p>
      </Link>
    </div>
  );
};

const NotificationList = ({ viewAllTitle }: { viewAllTitle: string }) => {
  const iconClassname = ' text-gray-400';

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className={iconClassname} />;
      case 'error':
        return <XCircle className={iconClassname} />;
      case 'info':
        return <AlertCircle className={iconClassname} />;
      default:
        break;
    }
  };

  return (
    <div>
      <ScrollArea className="h-[200px] px-5">
        {notifications.map((notification) => (
          <div className="flex items-start gap-2 mt-3" key={notification.type}>
            {getIcon(notification.type)}
            <div className="mr-3 flex flex-col w-full">
              <p className="truncate max-w-80">{notification.title}</p>
              <span className="truncate  max-w-80 text-gray-400 text-sm">
                {notification.description}
              </span>
              <span className="text-gray-400 text-xs">
                {notification.date}, {notification.time}
              </span>
              <Separator className="mt-2 w-full" />
            </div>
          </div>
        ))}
      </ScrollArea>
      <Button
        className="w-fit px-5 group mt-2 font-semibold text-primary"
        variant="ghost"
      >
        {viewAllTitle}
      </Button>
    </div>
  );
};

export default NavbarMenu;
