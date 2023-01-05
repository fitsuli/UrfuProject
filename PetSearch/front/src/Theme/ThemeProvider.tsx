import { useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import customShadows from './CustomShadows';
import shadows from './Shadows';
import Card from './Overrides/Card';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import palette from './Palette';

export default function ThemeProvider({ children } : {children: JSX.Element}) {
    const themeOptions = useMemo(
        () => ({
            palette, 
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
            <CssBaseline/>
            {children}
        </MUIThemeProvider>
    );
}