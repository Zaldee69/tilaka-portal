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

import { FilterAltIcon, SearchIcon } from '../../../../../public/icons/icons';
import MobileFilter from './MobileFilter';
import { DatePickerRange } from '@/components/DatePickerRange';
import { Button } from '@/components/ui/button';

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
      date: '08-05-2023 16:47',
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
          status: 'pending'
        },
        {
          tilaka_name: 'husen123',
          email: 'awan@kmanten.com',
          status: 'sent'
        },
        {
          tilaka_name: 'husen123',
          email: 'awan@kmanten.com',
          status: 'denied'
        }
      ],
      status: 'on_progress'
    },
    {
      date: '08-05-2023 16:47',
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
      date: '08-05-2023 16:47',
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
      date: '08-05-2023 16:47',
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
        <div className="grid grid-cols-3 lg:grid-cols-5 md:grid-cols-4 gap-3 w-full md:w-fit">
          <div className="hidden md:flex">
            <DatePickerRange />
          </div>
          <div className="col-span-2 md:col-auto">
            <Input
              placeholder={t('table.document')}
              className="h-10 pl-12 pr-2 w-full"
              icon={<SearchIcon svgClassName="mt-2" />}
              iconPosition="left"
            />{' '}
          </div>
          <div className="flex gap-2 md:hidden">
            {' '}
            <Button className="p-4 font-semibold h-10">Filter</Button>
            <Button className="p-0 font-semibold" variant="ghost">
              Reset
            </Button>
          </div>
          <Input
            placeholder="Pembuat"
            className="h-10 pl-12 pr-2 hidden md:flex"
            icon={<SearchIcon svgClassName="mt-2 hidden md:block" />}
            iconPosition="left"
          />{' '}
          <Select>
            <SelectTrigger
              icon={<FilterAltIcon fill="#000" />}
              className=" font-semibold hidden md:flex"
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="hidden md:flex">
              <SelectItem value="light">On Progress</SelectItem>
              <SelectItem value="dark">Draft</SelectItem>
              <SelectItem value="system">Done</SelectItem>
              <SelectItem value="denied">Denied</SelectItem>
            </SelectContent>
          </Select>
          <div className="hidden col-span-1 md:flex gap-2">
            {' '}
            <Button className="px-7 font-semibold h-10">Filter</Button>
            <Button className="p-0 font-semibold" variant="ghost">
              Reset
            </Button>
          </div>
        </div>
      </div>
      <DataTable showPagination data={data} />
      <div className="pb-20 md:hidden" />
      <div className="sticky bottom-5 flex justify-center md:hidden">
        <MobileFilter />
      </div>
    </div>
  );
}
