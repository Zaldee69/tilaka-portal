import { useTranslations } from 'next-intl';

import DataTable from '@/components/DataTable';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';

import {
  FilterAltIcon,
  SearchIcon,
  SortIcon
} from '../../../../../public/icons/icons';
import { Button } from '@/components/ui/button';
import MobileFilter from './MobileFilter';

type Signer = {
  tilaka_name: string;
  email: string;
  status: 'signed' | 'pending' | 'sent' | 'denied';
};

export type Document = {
  date: string;
  name: string;
  initiator: string;
  signer: Signer[];
  status: 'on_progress' | 'draft' | 'done' | 'denied';
};

function getData(): Document[] {
  // Fetch data from your API here.
  return [
    {
      date: 'Mei 08, 2023 16:47',
      name: 'BAST Kasuari',
      initiator: 'Husen',
      signer: [
        {
          tilaka_name: 'husen123',
          email: 'husen@kuru.com',
          status: 'signed'
        }
      ],
      status: 'on_progress'
    },
    {
      date: 'Mei 08, 2023 16:47',
      name: 'PKS Tilaka x PT. ABC',
      initiator: 'Saya',
      signer: [
        {
          tilaka_name: 'husen123',
          email: 'husen@kuru.com',
          status: 'signed'
        },
        {
          tilaka_name: 'husen123',
          email: 'menangkeri@kuru.com',
          status: 'signed'
        },
        {
          tilaka_name: 'husen123',
          email: 'awan@kmanten.com',
          status: 'signed'
        }
      ],
      status: 'draft'
    },
    {
      date: 'Mei 08, 2023 16:47',
      name: 'PKS Tilaka x PT. ABC',
      initiator: 'Husen',
      signer: [
        {
          tilaka_name: 'husen123',
          email: 'husen@kuru.com',
          status: 'signed'
        }
      ],
      status: 'done'
    },
    {
      date: 'Mei 08, 2023 16:47',
      name: 'PKS PT. Aji Karya',
      initiator: 'Husen',
      signer: [
        {
          tilaka_name: 'husen123',
          email: 'husenalbadari@aji.com',
          status: 'signed'
        }
      ],
      status: 'denied'
    }
  ];
}

export default function Page() {
  const data = getData();

  const t = useTranslations('Dashboard');

  return (
    <div className="p-5 mx-auto">
      <h1 className="text-gray-1">{t('sidebar.document')}</h1>
      <div className="flex justify-between mt-7 mb-5">
        <div className="flex gap-3 w-full md:w-fit">
          <Input
            placeholder={t('table.document')}
            className="h-10 pl-12 pr-2 w-full"
            icon={<SearchIcon svgClassName="mt-2" />}
            iconPosition="left"
          />{' '}
          <Select>
            <SelectTrigger
              icon={<FilterAltIcon fill="#000" />}
              className="w-[280px] font-semibold hidden md:flex"
            >
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Date</SelectItem>
              <SelectItem value="dark">Initiator</SelectItem>
              <SelectItem value="system">Signer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Select>
          <SelectTrigger
            icon={<SortIcon />}
            className="w-[140px] font-semibold hidden md:flex"
          >
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">ASC</SelectItem>
            <SelectItem value="dark">DESC</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable showPagination data={data} />
      <div className="pb-20 md:hidden" />
      <div className="sticky bottom-5 flex justify-center md:hidden">
        <MobileFilter />
      </div>
    </div>
  );
}
