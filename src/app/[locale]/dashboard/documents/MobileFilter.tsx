'use client';
import React, { useState } from 'react';

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { Button, buttonVariants } from '@/components/ui/button';
import { FilterAltIcon } from '../../../../../public/icons/icons';

const MobileFilter = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger
        className={buttonVariants({
          className:
            '!rounded-full !w-fit flex justify-center !px-7 gap-3 font-semibold sign-button-shadow'
        })}
      >
        <FilterAltIcon fill="#fff" svgClassName="flex-none" /> <h5>Filter</h5>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-start">
            <div className="flex items-center justify-between">
              Filter{' '}
              <Button
                variant="ghost"
                size="sm"
                className="text-primary font-semibold"
              >
                Reset
              </Button>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-4">
          <h5>Sort By</h5>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <Button size="sm" variant="outline" className="text-black">
              ASC
            </Button>
            <Button size="sm" variant="outline" className="text-black">
              DESC
            </Button>
          </div>
        </div>
        <div className="px-4 mt-3">
          <h5>Status</h5>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <Button size="sm" variant="outline" className="text-black">
              Date
            </Button>
            <Button size="sm" variant="outline" className="text-black">
              Initiator
            </Button>
            <Button size="sm" variant="outline" className="text-black">
              Signer
            </Button>
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={() => setIsOpen(false)}>Terapkan</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilter;
