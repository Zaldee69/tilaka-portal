import { useOnClickOutside } from '@/hooks/useClickOutside';
import { generateArrayOfPageNumber } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    <div className="mt-6 flex md:flex-row flex-col items-start justify-between md:items-center">
      <div className="flex items-center gap-5">
        <div className="relative mt-2 md:mt-0">
          <Select>
            <SelectTrigger className="w-[50px] font-semibold">
              <SelectValue placeholder="5" />
            </SelectTrigger>
            <SelectContent className="!w-[50px]">
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="25">25</SelectItem>
            </SelectContent>
          </Select>
          <div
            ref={contentPerPageMenuRef}
            className={[
              'absolute right-0 bottom-8 z-10 w-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
              showContentPerPageMenu ? 'block' : 'hidden'
            ].join(' ')}
          >
            <div className="py-1" role="none">
              <button
                className={[
                  'text-gray-700 block px-4 py-2 text-sm hover:bg-primary w-full',
                  contentPerPage === 5 ? 'bg-primary' : 'bg-white'
                ].join(' ')}
                onClick={() => setContentPerPage(5)}
              >
                5
              </button>
              <button
                className={[
                  'text-gray-700 block px-4 py-2 text-sm hover:bg-primary w-full',
                  contentPerPage === 10 ? 'bg-primary' : 'bg-white'
                ].join(' ')}
                onClick={() => setContentPerPage(10)}
              >
                10
              </button>
              <button
                className={[
                  'text-gray-700 block px-4 py-2 text-sm hover:bg-primary w-full',
                  contentPerPage === 25 ? 'bg-primary' : 'bg-white'
                ].join(' ')}
                onClick={() => setContentPerPage(25)}
              >
                25
              </button>
            </div>
          </div>
        </div>
        <p className="text-sm text-neutral800 font-normal md:mr-5">
          {contentPerPage * currentPage - (contentPerPage - 1)}-
          {contentPerPage * currentPage} dari {totalElements} data
        </p>
      </div>
      <div className="flex items-center border rounded-xl mt-2 md:mt-0">
        <div className={['flex'].join(' ')}>
          <button
            className="px-2 py-2 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 group rounded-l-xl"
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
                'px-4 py-2 flex items-center justify-center',
                currentPage === page
                  ? 'text-white bg-primary font-semibold'
                  : 'text-primary0 bg-white hover:bg-primary hover:font-semibold hover:text-white'
              ].join(' ')}
            >
              {page === 0 ? '...' : page}
            </button>
          ))}
        </div>
        <div className={['flex'].join(' ')}>
          <button
            className="flex items-center justify-center cursor-pointer px-2 py-2 group disabled:cursor-not-allowed disabled:opacity-50 rounded-r-xl"
            disabled={currentPage === totalPages || !isSuccess}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight strokeWidth={1} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
