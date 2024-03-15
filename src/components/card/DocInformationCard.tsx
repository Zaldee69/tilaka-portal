import { cn } from '@/lib/utils';

import { TilakaIcon } from '../../../public/icons/icons';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  Icon: any;
  title: string;
  amount: number | string;
  iconfill: string;
  bgfill: string;
}

const DocInformationCard = ({ children, className, Icon, ...props }: Props) => (
  <div
    className={cn(
      'px-3 py-2 rounded-2xl w-full relative overflow-hidden',
      className
    )}
    {...props}
  >
    <TilakaIcon
      svgClassName="w-24 h-24 absolute -top-8 -right-5"
      fill={props.bgfill}
    />
    <div className="bg-white inline-block p-2 rounded-2xl">
      <Icon fill={props.iconfill} />
    </div>
    <p className="text-xs md:text-sm text-[#787878] ">{props.title}</p>
    <h1 className="text-[#1B4782]">{props.amount}</h1>
  </div>
);
DocInformationCard.displayName = 'DocInformationCard';

export default DocInformationCard;
