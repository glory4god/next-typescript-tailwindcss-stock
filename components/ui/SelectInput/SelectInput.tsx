import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

interface Props {
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
      onChange={onChange}
      id={id}
      value={value}
      size="small"
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
