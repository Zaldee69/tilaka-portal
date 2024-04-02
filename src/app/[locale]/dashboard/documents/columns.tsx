'use client';
import { ColumnDef } from '@tanstack/react-table';
import { AccountCircleIcon } from '../../../../../public/icons/icons';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

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

export const columns: ColumnDef<Document>[] = [
  {
    accessorKey: 'date',
    header: 'Date'
  },
  {
    accessorKey: 'name',
    header: 'Document Name'
  },
  {
    accessorKey: 'initiator',
    header: 'Initiator'
  },
  {
    accessorKey: 'signer',
    header: 'Signer',
    cell: async ({ row }) => {
      const totalSigner = row.getValue('signer') as Signer[];
      return (
        <div className="flex gap-2 items-center">
          {' '}
          <AccountCircleIcon svgClassName="h-5 w-5" />
          <p className="font-semibold">{totalSigner.length}</p>
        </div>
      );
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;

      const getBadgeLabelAndColor = (status: string) => {
        const badgeProps = {
          label: '',
          color: ''
        };

        switch (status) {
          case 'on_progress':
            badgeProps.color = 'bg-[#FFB951]';
            badgeProps.label = 'On Progress';
            break;
          case 'draft':
            badgeProps.color = 'bg-[#929292]';
            badgeProps.label = 'Draft';
            break;
          case 'done':
            badgeProps.color = 'bg-[#3B9B1B]';
            badgeProps.label = 'Done';
            break;
          case 'denied':
            badgeProps.color = 'bg-[#BD0505]';
            badgeProps.label = 'Denied';
            break;

          default:
            break;
        }

        return { color: badgeProps.color, label: badgeProps.label };
      };

      return (
        <Badge
          className={`w-fit flex-none px-1.5 ${getBadgeLabelAndColor(status).color}`}
        >
          {getBadgeLabelAndColor(status).label}
        </Badge>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const initiator = row.getValue('initiator');

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-[10px] p-2" align="end">
            <DropdownMenuItem>Lihat</DropdownMenuItem>
            <DropdownMenuItem>Tandatangan</DropdownMenuItem>
            <DropdownMenuItem>Download</DropdownMenuItem>
            <DropdownMenuItem>Audit Trail</DropdownMenuItem>
            {initiator === 'Saya' ? (
              <DropdownMenuItem>Batalkan</DropdownMenuItem>
            ) : (
              <DropdownMenuItem>Tolak</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
