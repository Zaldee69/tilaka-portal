'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  children: React.ReactNode;
  autoOpen: boolean;
}

const Collapsible = ({ title, children, autoOpen }: Props) => {
  const [isExpand, setIsExpand] = useState<boolean>(autoOpen);

  const collpaseProps = useSpring({
    height: isExpand ? 570 : 0,
    config: {
      duration: 250
    }
  });

  return (
    <div>
      <div className="flex justify-between p-3">
        <h4>{title}</h4>
        <Button
          onClick={() => setIsExpand(!isExpand)}
          variant="ghost"
          className="p-0 h-fit md:hidden focus:text-black"
        >
          <ChevronDown
            className={cn('rotate-0 transition-transform duration-200', {
              'rotate-180': isExpand
            })}
          />
        </Button>
      </div>
      <animated.div className="overflow-hidden" style={collpaseProps}>
        {children}
      </animated.div>
    </div>
  );
};

export default Collapsible;
