// Modern black and white theme for oil and gas skills assessment platform
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000', // Pure black
      light: '#333333',
      dark: '#000000',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#666666', // Dark gray
      light: '#999999',
      dark: '#333333',
      contrastText: '#FFFFFF'
    },
    success: {
      main: '#00C851', // Modern green
      light: '#5DFC71',
      dark: '#007E33',
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#FF8800', // Modern orange
      light: '#FFB366',
      dark: '#CC6A00',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#FF4444', // Modern red
      light: '#FF8888',
      dark: '#CC0000',
      contrastText: '#FFFFFF'
    },
    info: {
      main: '#33B5E5', // Modern blue
      light: '#66C2FF',
      dark: '#0099CC',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#FFFFFF',
      paper: '#FAFAFA'
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
      disabled: '#999999'
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    },
    divider: '#E0E0E0'
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 900,
      lineHeight: 1.1,
      letterSpacing: '-0.02em'
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.01em'
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em'
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      fontWeight: 400
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      fontWeight: 400
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.02em'
    }
  },
  shape: {
    borderRadius: 12
  }
});

export default theme;