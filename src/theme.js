// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4c8bf5',
    },
    background: {
      default: '#121212',
      paper: '#1e1e2f',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#2c2c3e',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#38384a',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#ccc',
        },
      },
    },
  },
});

export default theme;
