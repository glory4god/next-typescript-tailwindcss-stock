import React from 'react';
import cn from 'classnames';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Props {
  className?: string;
  data: Array<any>;
  label: string;
  id: string;
  value: string | undefined;
  disabled?: boolean;
  onChange?: (e: any, newValue: string | undefined) => void;
}

const AutoCompleteInput: React.FC<Props> = ({
  className,
  disabled,
  data,
  label,
  id,
  value,
  onChange,
}) => {
  return (
    <div className={cn(className)}>
      <Autocomplete
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        options={data}
        renderInput={(params: any) => (
          <TextField {...params} size="small" label={label} margin="dense" />
        )}
      />
    </div>
  );
};

export default React.memo(AutoCompleteInput);
