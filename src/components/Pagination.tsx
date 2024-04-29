import { useOnClickOutside } from '@/hooks/useClickOutside';
import { generateArrayOfPageNumber } from '@/lib/utils';
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react';
import { useMediaQuery } from 'usehooks-ts';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

type Props = {
  contentPerPage: number;
  setContentPerPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalElements: number;
  totalPages: number;
  isSuccess: boolean;
};

const Pagination = ({
  contentPerPage,
  setContentPerPage,
  currentPage,
  setCurrentPage,
  totalElements,
  totalPages,
  isSuccess
}: Props) => {
  const contentPerPageMenuRef = useRef(null);

  const shouldChangeRangeDisplayed: boolean = useMediaQuery(
    '(max-width: 1024px)'
  );

  const [showContentPerPageMenu, setShowContentPerPageMenu] =
    useState<boolean>(false);
  const [rangeDisplayed, setRangeDisplayed] = useState<number>(7);

  const onClickOutsideContentPerPageMenu = () => {
    setShowContentPerPageMenu(false);
  };

  useEffect(() => {
    if (shouldChangeRangeDisplayed) {
      setRangeDisplayed(5);
    } else {
      setRangeDisplayed(7);
    }
  }, [shouldChangeRangeDisplayed]);

  useOnClickOutside(contentPerPageMenuRef, onClickOutsideContentPerPageMenu);

  return (
    <div className="mt-6 flex justify-center flex-col gap-y-3 items-center">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center border rounded-xl">
          <div className="flex">
            <button
              className="p-1 md:p-2 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 group rounded-l-xl"
              disabled={currentPage === 1 || !isSuccess}
              onClick={() => setCurrentPage(1)}
            >
              <ChevronFirst strokeWidth={1} />
            </button>
          </div>
          <div className="flex">
            <button
              className="p-1 md:p-2 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 group rounded-l-xl"
              disabled={currentPage === 1 || !isSuccess}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronLeft strokeWidth={1} />
            </button>
          </div>
          <div className="flex items-center">
            {generateArrayOfPageNumber(
              totalPages,
              currentPage,
              rangeDisplayed
            ).map((page, i) => (
              <button
                key={i}
                disabled={page === 0 || !isSuccess}
                onClick={() => setCurrentPage(page)}
                className={[
                  'md:px-4 px-3 text-sm md:text-base py-2 flex items-center justify-center',
                  currentPage === page
                    ? 'text-white bg-primary font-semibold'
                    : 'text-primary0 bg-white hover:bg-primary hover:font-semibold hover:text-white'
                ].join(' ')}
              >
                {page === 0 ? '...' : page}
              </button>
            ))}
          </div>
          <div className="flex">
            <button
              className="flex items-center justify-center cursor-pointer p-1 md:p-2 group disabled:cursor-not-allowed disabled:opacity-50 rounded-r-xl"
              disabled={currentPage === totalPages || !isSuccess}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ChevronRight strokeWidth={1} />
            </button>
          </div>
          <div className="flex">
            <button
              className="flex items-center justify-center cursor-pointer p-1 md:p-2 group disabled:cursor-not-allowed disabled:opacity-50 rounded-r-xl"
              disabled={currentPage === totalPages || !isSuccess}
              onClick={() => setCurrentPage(totalPages)}
            >
              <ChevronLast strokeWidth={1} />
            </button>
          </div>
        </div>
        <Select>
          <SelectTrigger className="md:w-[50px] h-10 md:h-11  font-semibold">
            <SelectValue placeholder="5" />
          </SelectTrigger>
          <SelectContent className="!w-[50px] ">
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="25">25</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-5">
        <p className="text-sm text-neutral800 font-normal md:mr-5">
          {contentPerPage * currentPage - (contentPerPage - 1)}-
          {contentPerPage * currentPage} dari {totalElements} data
        </p>
      </div>
    </div>
  );
};

export default Pagination;
