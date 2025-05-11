import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SnackbarOrigin } from '@mui/material/Snackbar';

interface State extends SnackbarOrigin {
  open: boolean;
}

interface SnackProps {
  snackMessage: string;
  snackStatus: boolean;
  fileCreated: boolean;
}

export default function CustomSnackBar({
  snackProps,
  setSnackProps,
}: {
  snackProps: SnackProps;
  setSnackProps: React.Dispatch<React.SetStateAction<SnackProps>>;
}) {
  const { snackMessage, snackStatus } = snackProps;

  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'left',
  });

  const { vertical, horizontal, open } = state;

  React.useEffect(() => {
    setState((prev) => ({
      ...prev,
      open: snackStatus,
    }));
  }, [snackStatus]);

  const handleClose = () => {
    setState((prev) => ({ ...prev, open: false }));
  };

  const handleExited = () => {
    setSnackProps({ snackMessage: '', snackStatus: false, fileCreated: false });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      slotProps={{transition:{ onExited: handleExited }}}
    >
      <Alert
        onClose={handleClose}
        severity={snackProps.fileCreated ? "success" : "error"}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {snackMessage}
      </Alert>
    </Snackbar>
  );
}
