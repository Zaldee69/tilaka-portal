'use client';
import React, { useContext } from 'react';
import {
  BrushIcon,
  QuestionAnswerIcon,
  StampIcon,
  TilakaIcon
} from '../../../public/icons/icons';
import { Button } from '../ui/button';
import Image from 'next/image';
import SidebarLinks from './SidebarLinks';
import { SidebarContext } from './SidebarContextProvider';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useSpring, animated } from '@react-spring/web';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import SigningModal from '../dialog/signing-dialog/SigningDialog';

const Sidebar = () => {
  const { state } = useContext(SidebarContext);

  const t = useTranslations('Dashboard');

  const sidebarProps = useSpring({
    width: state.isOpen ? 220 : 64,
    marginLeft: state.isOpen ? 80 : 8,
    config: {
      duration: 250
    }
  });

  const sidebarContentProps = useSpring({
    width: state.isOpen ? 250 : 64,
    config: {
      duration: 250
    }
  });

  return (
    <animated.div
      style={sidebarProps}
      className={cn('col-span-2 relative hidden lg:block')}
    >
      <animated.div
        style={sidebarContentProps}
        className={cn(
          'sidebar fixed top-0 left-0 z-20 bottom-0 hidden lg:block'
        )}
      >
        <Image
          src={`/images/${!state.isOpen ? 'logo.svg' : 'logo-tilaka.png'}`}
          height={!state.isOpen ? 32 : 50}
          width={!state.isOpen ? 34 : 158}
          className="block my-5 mx-auto"
          alt="Tilaka Logo Small"
          quality={100}
          priority
        />

        <div
          className={cn(
            'bg-primary rounded-full flex items-center justify-center w-12 h-12 mx-auto mt-10',
            {
              'h-10 w-10': !state.isOpen
            }
          )}
        >
          <p className="text-white font-bold ">Y</p>
        </div>
        <div
          className={cn('text-center mt-2', {
            hidden: !state.isOpen
          })}
        >
          <h5>Muhammad John Doe</h5>
          <p className="text-xs md:text-sm text-gray-400 mt-1">johndoe21</p>
        </div>
        <div
          className={cn('flex justify-center gap-2 md:flex-row flex-col', {
            '!flex-col': !state.isOpen
          })}
        >
          <div
            className={cn(
              ' flex items-center gap-2 bg-white custom-shadow h-8 px-4 rounded-[70px] w-fit mt-2',
              {
                'px-2 gap-1 mt-5 mx-auto': !state.isOpen
              }
            )}
          >
            <BrushIcon
              svgClassName={cn('w-5 h-5', {
                'h-4 w-4': !state.isOpen
              })}
            />
            <p
              className={cn('font-medium text-sm ', {
                '!text-xs': !state.isOpen
              })}
            >
              23
            </p>
          </div>
          <div
            className={cn(
              ' flex items-center gap-2 bg-white custom-shadow h-8 px-4 rounded-[70px] w-fit mt-2',
              {
                'px-2 gap-1 mx-auto': !state.isOpen
              }
            )}
          >
            <StampIcon
              svgClassName={cn('w-5 h-5', {
                'h-4 w-4': !state.isOpen
              })}
            />
            <p
              className={cn('font-medium text-sm ', {
                '!text-xs': !state.isOpen
              })}
            >
              27
            </p>
          </div>
        </div>
        <div
          className={cn('flex justify-center my-10 mx-7', {
            'my-5 mx-auto': !state.isOpen
          })}
        >
          <SigningModal />
        </div>
        <div
          className={cn('px-5', {
            'px-2': !state.isOpen
          })}
        >
          <SidebarLinks />
        </div>
        <div
          className={cn('absolute bottom-5 left-8', {
            'left-5': !state.isOpen
          })}
        >
          <Link
            href="https://tilaka.id/ufaqs/"
            target="_blank"
            className="font-semibold flex gap-2 items-center"
          >
            <QuestionAnswerIcon fill="#828282" />
            <div
              className={cn('text-sm ml-[5.5px] text-gray-1', {
                hidden: !state.isOpen
              })}
            >
              FAQ
            </div>
            <ExternalLink
              height={18}
              width={18}
              className={cn('text-gray-4', {
                hidden: !state.isOpen
              })}
            />
          </Link>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default Sidebar;
