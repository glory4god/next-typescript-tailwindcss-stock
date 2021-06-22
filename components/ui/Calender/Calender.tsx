/* eslint-disable react/display-name */
import React from 'react';
import DatePicker from 'react-datepicker';
import Button, { ButtonProps } from '@material-ui/core/Button';

import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  selectedDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  openToDate: string;
  disabled?: boolean;
  onChange: (date: Date) => void;
}

const SelectCalendar: React.FC<Props> = ({
  startDate,
  endDate,
  disabled,
  openToDate,
  onChange,
  selectedDate,
}) => {
  const ExampleCustomInput = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ value, onClick, disabled }, ref) => (
      <Button
        variant="outlined"
        onClick={onClick}
        ref={ref}
        disabled={disabled}>
        <div>{value ? `${value} ` : 'date picker'}</div>
      </Button>
    ),
  );
  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  return (
    <div className="relative w-full my-4">
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={!selectedDate ? null : selectedDate}
        showDisabledMonthNavigation
        minDate={startDate}
        maxDate={endDate}
        onChange={onChange}
        filterDate={isWeekday}
        // 공휴일 제외 로직 하나 추가해야함
        openToDate={new Date(openToDate)}
        disabled={disabled}
        showYearDropdown
        showMonthDropdown
        useShortMonthInDropdown
        customInput={<ExampleCustomInput disabled={disabled} />}
        withPortal
      />
    </div>
  );
};

export default React.memo(SelectCalendar);
