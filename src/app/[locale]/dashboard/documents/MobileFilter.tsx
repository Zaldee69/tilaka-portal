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
import { FilterAltIcon, SearchIcon } from '../../../../../public/icons/icons';
import { Input } from '@/components/ui/input';
import { DatePickerRange } from '@/components/DatePickerRange';

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
        <DrawerHeader className="pb-0">
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

        <div className="px-4 mt-3">
          <h5>Pembuat</h5>
          <Input
            placeholder="Pembuat"
            className="h-10 pl-12 pr-2 w-full mt-2"
            icon={<SearchIcon svgClassName="mt-2" />}
            iconPosition="left"
          />
        </div>
        <div className="px-4 mt-3">
          <h5 className="mb-2">Tanggal</h5>
          <DatePickerRange />
        </div>
        <div className="px-4 mt-3">
          <h5>Status</h5>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <Button size="sm" variant="outline" className="text-black">
              On Progress
            </Button>
            <Button size="sm" variant="outline" className="text-black">
              Draft
            </Button>
            <Button size="sm" variant="outline" className="text-black">
              Done
            </Button>
            <Button size="sm" variant="outline" className="text-black">
              Denied
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
