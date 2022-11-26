import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import green from '@mui/material/colors/green';

ThemeProvider.propTypes = {
    children: PropTypes.node,
};

export default function ThemeProvider({ children } : {children: JSX.Element}) {
    const themeOptions = useMemo(
        () => ({
            palette: {
                primary: { main: green[600].toString() }
            }
        }),
        []
    );

    const theme = createTheme(themeOptions);

    return (
        <MUIThemeProvider theme={theme}>
            {children}
        </MUIThemeProvider>
    );
}
