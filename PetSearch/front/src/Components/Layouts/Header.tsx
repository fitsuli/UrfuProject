import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Fab } from '@mui/material';
import { bgBlur } from '../../Styles/CssStyles';
import React from 'react';
import { AccountPopover } from './AccountPopover';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useNavigate } from 'react-router-dom';

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

//@ts-ignore
const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));


export default function Header({ onOpenNav }: { onOpenNav: () => void }) {
  const navigate = useNavigate()

  return (
    <StyledRoot>
      <StyledToolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 1,
            sm: 3,
          }}
        >
          <Box color={'#FFFFFF'} />

          <Fab color="primary" variant="extended" onClick={() => navigate("/addPost")}>
            <AddRoundedIcon sx={{ mr: 1 }} />
            Создать объявление
          </Fab>
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
