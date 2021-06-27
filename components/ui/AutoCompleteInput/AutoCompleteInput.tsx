import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Props {
  data: Array<any>;
  label?: string;
  id: string;
  value: string | undefined;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (e: any, newValue: string | undefined) => void;
}

const AutoCompleteInput: React.FC<Props> = ({
  disabled,
  data,
  label,
  id,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <>
      <Autocomplete
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        options={data}
        renderInput={(params: any) => (
          <TextField
            {...params}
            placeholder={placeholder}
            size="small"
            label={label}
            margin="dense"
          />
        )}
      />
    </>
  );
};

export default React.memo(AutoCompleteInput);
