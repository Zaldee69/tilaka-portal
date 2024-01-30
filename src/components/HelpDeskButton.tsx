import Link from 'next/link';
import React from 'react';
import { buttonVariants } from './ui/button';
import { HelpCircle } from 'lucide-react';

const HelpDeskButton = () => {
  return (
    <Link
      href="https://cantikatnt.atlassian.net/servicedesk/customer/portal/2/group/8/create/27"
      target="_blank"
      className={buttonVariants({
        className: 'absolute right-5 bottom-10 !rounded-full group !px-2 !h-10'
      })}
    >
      <span className="invisible group-hover:mr-1 group-hover:visible ease-in group-hover:duration-200 w-0 group-hover:w-fit group-hover:pl-1 opacity-0 group-hover:opacity-100">
        Hubungi Kami
      </span>
      <HelpCircle />
    </Link>
  );
};

export default HelpDeskButton;
