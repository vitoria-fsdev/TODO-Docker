"use client";

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',  // ou 'dark'
    primary: {
      main: '#1976d2',
    },
    // Adicione mais customizações
  },
});

export default theme;