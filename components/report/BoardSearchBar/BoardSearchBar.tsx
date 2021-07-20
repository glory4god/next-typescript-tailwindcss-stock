import React from 'react';
import cn from 'classnames';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { SelectInput } from '../../ui';
import styles from './BoardSearchBar.module.css';
import { useDispatch } from 'react-redux';
import { fetchSearchReport } from '../../../lib/redux/report/reportSlice';

interface SearchBarProps {
  className?: string;
  condition: string;
  value: string;
  sorted: string;
  onSelectChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  onInputClick: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
}

const BoardSearchBar: React.FC<SearchBarProps> = ({
  className,
  condition,
  value,
  sorted,
  onSelectChange,
  onInputClick,
}) => {
  const dispatch = useDispatch();

  return (
    <div className={cn(className, styles.container)}>
      <div className="flex justify-between items-center space-x-2">
        <SelectInput
          className="w-32"
          data={['TITLE+CONTENT', 'USER', 'COMPANY']}
          id="search"
          value={condition}
          onChange={onSelectChange}
          label="condition"
        />
        <TextField
          label="search"
          fullWidth={true}
          value={value}
          onChange={onInputClick}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
              dispatch(
                fetchSearchReport(condition.toLowerCase(), value, sorted),
              );
            }
          }}
        />
        <Button
          style={{ marginTop: '16px' }}
          onClick={() => {
            dispatch(fetchSearchReport(condition.toLowerCase(), value, sorted));
          }}>
          검색
        </Button>
        {console.log(condition.toLowerCase())}
        {console.log(value)}
      </div>
    </div>
  );
};

export default BoardSearchBar;
