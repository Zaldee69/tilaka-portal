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
  autoOpen: boolean;
  onlyShowOnMobile?: boolean;
}

const Collapsible = ({
  title,
  children,
  autoOpen,
  onlyShowOnMobile = false,
  className,
  header
}: Props) => {
  const [isExpand, setIsExpand] = useState<boolean>(autoOpen);

  const [measureRef, { height }] = useMeasure();

  const collpaseProps = useSpring({
    from: {
      height: 0
    },
    to: {
      height: isExpand ? height : 0
    }
  });

  return (
    <div className={className}>
      <div className={cn('flex justify-between p-3 items-center')}>
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
        style={collpaseProps}
      >
        <div ref={measureRef}>{children}</div>
      </animated.div>
    </div>
  );
};

export default Collapsible;
