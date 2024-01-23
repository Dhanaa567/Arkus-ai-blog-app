import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface MuiButtonProps extends ButtonProps {
  lable: string;
}

const Buttons: React.FC<MuiButtonProps> = ({ lable, color, variant, ...props }) => {
  return (
    <Button variant={variant} color={color} {...props}>
      {lable}
    </Button>
  );
};

export default Buttons;
