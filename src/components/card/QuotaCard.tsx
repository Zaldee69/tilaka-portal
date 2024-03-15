import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { History, PlusCircle } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useTranslations } from 'next-intl';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  expiry?: string;
  amount: number | string;
  plusbuttontitle: string;
  historybuttontitle: string;
  title: string;
  Icon: any;
}

const QuotaCard = ({ children, className, Icon, ...props }: Props) => {
  const t = useTranslations('Dashboard');

  return (
    <div
      className={cn('p-5 rounded-2xl flex flex-col justify-between', className)}
      {...props}
    >
      <div>
        <div className="flex gap-3">
          <div className="border-[3px] border-[#E0F7FE4D] rounded-2xl p-3 flex-none">
            <Icon svgClassName="flex-none" fill="#fff" />
          </div>
          <div>
            <h3 className="text-white">{props.amount}</h3>
            <p className="text-white">{props.title}</p>
          </div>
        </div>
        <div className="mt-3">
          {children}
          <div className="text-white flex items-center justify-between mt-2">
            {props.expiry && (
              <p className="text-sm">
                {t('validUntil')} {props.expiry}
              </p>
            )}
            <p className="text-sm">
              {t('usage')}: <span className="font-semibold">5</span>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-[8px] flex justify-around items-center mt-3 px-5">
        <Button variant="ghost" className="font-semibold text-primary px-0">
          <PlusCircle className="mr-2" />
          {props.plusbuttontitle}
        </Button>
        <Separator orientation="vertical" className="h-8 bg-gray-6" />
        <Button variant="ghost" className="font-semibold text-primary px-0">
          <History className="mr-2" />
          {props.historybuttontitle}
        </Button>
      </div>
    </div>
  );
};

QuotaCard.displayName = 'QuotaCard';

export default QuotaCard;
