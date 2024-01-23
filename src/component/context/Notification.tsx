import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


interface SnackbarProps {
    message:  string;
    open: boolean;
    severity: 'error' | 'info' | 'success' | 'warning';
}

const SnackbarComponent: React.FC<SnackbarProps> = ({open,severity, message}) => {
  const [show, setShow] = React.useState(open);
  const timeOut =()=>{
    setTimeout(()=>{
      setShow(false);
    },6000)
  }

  React.useEffect(timeOut,[]);

  return (
    <div>
      <Snackbar open={show} >
        <Alert
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SnackbarComponent;