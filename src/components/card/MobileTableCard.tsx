import React from 'react';
import { Badge } from '../ui/badge';
import { MoreHorizontal, User } from 'lucide-react';
import {
  PermIdentityIcon,
  SupervisorAccountIcon
} from '../../../public/icons/icons';
import { Button } from '../ui/button';

const MobileTableCard = () => {
  return (
    <div className="border rounded-xl py-2 px-3 mt-3 border-gray-6 flex justify-between">
      <div className="flex flex-col gap-2">
        <Badge className="w-fit mt-2 bg-[#FFB951]">On Progress</Badge>
        <h5>BAST Kasuari</h5>
        <p className="text-xs">23-05-2023 16:53</p>
        <div className="flex gap-1 items-center">
          <PermIdentityIcon svgClassName="w-5 h-5" />
          <p className="text-xs">Muhammad</p>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <Button variant="ghost" className="p-0 h-fit">
          <MoreHorizontal />
        </Button>
        <div>
          5<SupervisorAccountIcon />
        </div>
      </div>
    </div>
  );
};

export default MobileTableCard;
