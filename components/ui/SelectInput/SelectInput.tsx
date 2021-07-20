import React from 'react';
import cn from 'classnames';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

interface Props {
  className?: string;
  id: string;
  data: Array<any>;
  label: string;
  value: string | undefined;
  disabled?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
}

const SelectInput: React.FC<Props> = ({
  className,
  id,
  data,
  label,
  value,
  disabled,
  onChange,
}) => {
  return (
    <TextField
      select
      className={cn(className)}
      onChange={onChange}
      id={id}
      value={value}
      label={label}
      disabled={disabled}
      margin="dense">
      {data.map((option, key) => (
        <MenuItem key={option + key} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default React.memo(SelectInput);
