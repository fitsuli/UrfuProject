import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import React from 'react';


const Logo = forwardRef(({ disabledLink = false, sx }: { disabledLink?: boolean, sx?: SxProps<Theme> }, ref) => {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;


    const logo = (
        <Box sx={{
            width: 40,
            height: 40,
            display: 'inline-flex',
            cursor: 'pointer',
            ...sx,
        }}>
            <PetsRoundedIcon color={'primary'} />
        </Box>
    );

    if (disabledLink) {
        return <>{logo}</>;
    }

    return (
        <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
            {logo}
        </Link>
    );
});

export default Logo;