'use client';
import React, { useContext } from 'react';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { SidebarContext } from './SidebarContextProvider';

const SidebarCollpaseTrigger = () => {
  const { state, stateSetter } = useContext(SidebarContext);

  return (
    <Button
      className="p-0 w-fit h-fit hidden md:block"
      variant="ghost"
      onClick={() => stateSetter({ isOpen: !state.isOpen })}
    >
      <Menu />
    </Button>
  );
};

export default SidebarCollpaseTrigger;
