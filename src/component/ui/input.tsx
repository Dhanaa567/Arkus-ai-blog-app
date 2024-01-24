import React from 'react';
import { TextField } from '@mui/material';

interface InputFieldProps {
  label: string;
  name:  string;
  variant: any | undefined;
  fullWidth?: boolean | undefined;
  margin?: "dense" | "normal" | "none" | undefined;
  value?: string | undefined | null;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined; 
  multiline?:  boolean | undefined;
  rows?: string | number | undefined;
  required?:  boolean | undefined;
  InputProps?: any;
  size?: 'medium' | 'small';
  defaultValue?: string | number | undefined;
  InputLabelProps?: any;
  error?: boolean;
  helperText?: string;
}

const Input: React.FC<InputFieldProps> = ({ label, name, rows, variant, multiline, fullWidth, margin, error, value, InputLabelProps, helperText, required, onChange, InputProps, defaultValue,size}) => {
  
  return (
    <TextField
      name={name}
      variant={variant}
      margin={margin}
      fullWidth ={fullWidth}
      label={label}
      value={value}
      size={size}
      multiline={multiline}
      rows={rows}
      required={required}
      onChange={onChange}
      defaultValue= {defaultValue}
      InputProps= {InputProps}
      InputLabelProps= {InputLabelProps}
      error={error}
      helperText={helperText}
    />
  );
};

export default Input;
