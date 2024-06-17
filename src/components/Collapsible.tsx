'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { cn } from '@/lib/utils';
import useMeasure from 'react-use-measure';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
  header?: React.ReactNode;
  headerClassName?: string;
  autoOpen: boolean;
  onlyShowOnMobile?: boolean;
}

const Collapsible = ({
  title,
  children,
  autoOpen,
  headerClassName,
  onlyShowOnMobile = false,
  className,
  header
}: Props) => {
  const [isExpand, setIsExpand] = useState<boolean>(autoOpen);

  const [measureRef, { height: measuredHeight }] = useMeasure();

  const collpaseProps = useSpring({
    height: isExpand ? measuredHeight : 0,
    config: { tension: 250, friction: 30 }
  });

  return (
    <div className={className}>
      <div
        className={cn('flex justify-between p-3 items-center', headerClassName)}
      >
        {header ? header : <h4>{title}</h4>}
        <Button
          onClick={() => setIsExpand(!isExpand)}
          variant="ghost"
          className={cn('p-0 h-fit focus:text-black', {
            'md:hidden': onlyShowOnMobile
          })}
        >
          <ChevronDown
            className={cn('rotate-0 transition-transform duration-200', {
              'rotate-180': isExpand
            })}
          />
        </Button>
      </div>
      <animated.div
        className={cn('', {
          'overflow-hidden': !isExpand
        })}
        style={{ ...collpaseProps, overflow: 'hidden' }}
      >
        <div ref={measureRef}>{children}</div>
      </animated.div>
    </div>
  );
};

export default Collapsible;
