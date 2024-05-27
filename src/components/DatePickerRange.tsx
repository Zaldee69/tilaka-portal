'use client';

import * as React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslations } from 'next-intl';

export function DatePickerRange() {
  const t = useTranslations('Dashboard');

  const [date, setDate] = React.useState<{
    begin: Date | null;
    end: Date | null;
  }>({
    begin: null,
    end: null
  });

  const onChangeHandler = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setDate({
      begin: start,
      end: end
    });
  };

  return (
    <div className="relative flex !w-full flex-col">
      <CalendarIcon className="mr-2 h-5 w-5 flex-none text-black absolute top-2.5 left-3 z-10" />
      <DatePicker
        name="date_created"
        selected={date.begin}
        startDate={date.begin}
        endDate={date.end}
        placeholderText={t('table.date')}
        onChange={onChangeHandler}
        selectsRange
        className=" h-10 pr-2 !w-full rounded-md border focus-visible:shadow focus-visible:shadow-primary/25 border-input bg-background pl-10 text-sm placeholder:text-[#BDBDBD] focus-visible:outline-none focus-visible:border-primary"
        autoComplete="off"
      />
    </div>
  );
}
