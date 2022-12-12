import { useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import green from '@mui/material/colors/green';
import customShadows from './CustomShadows';
import shadows from './Shadows';
import Card from './Overrides/Card';

export default function ThemeProvider({ children } : {children: JSX.Element}) {
    const themeOptions = useMemo(
        () => ({
            palette: {primary: { main: green[600].toString() }}, 
            customShadows: customShadows(),
            shadows: shadows(),
            shape: { borderRadius: 8 }
        }),
        []
    );

    //@ts-ignore
    const theme = createTheme(themeOptions);
    theme.components = Object.assign(Card(theme))

    return (
        <MUIThemeProvider theme={theme}>
            {children}
        </MUIThemeProvider>
    );
}