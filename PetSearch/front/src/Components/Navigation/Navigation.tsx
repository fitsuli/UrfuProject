import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar, Button, Stack } from '@mui/material';
import useResponsive from '../../Hooks/useResponsive';
import stringAvatar from '../../Utils/AvatarString';
import Logo from '../Logo';
import { useAuth } from '../Auth/AuthProvider';
import NavSection from './NavSections';
import { NavConfig } from './NavConfig';
import React from 'react';

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadius * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

export default function Nav({ openNav, onCloseNav }: { openNav: boolean, onCloseNav: () => void }) {
  const { pathname } = useLocation();
  const isDesktop = useResponsive('up', 'lg');
  const auth = useAuth()
  const theme = useTheme()
  const user = auth.user

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Box
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
        <Typography sx={{
          color: theme.palette.primary.main,
          fontWeight: 'fontWeightBold'
        }}>Pet Search</Typography>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar  {...stringAvatar(user ? user.fullName : "A A")} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: '600' }}>
                {user ? user.fullName : null}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {user ? user.role : null}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={NavConfig} />

      <Box sx={{ flexGrow: 1 }} />
      <Button sx={{
        borderRadius: "8px",
        position: "fixed",
        bottom: 0,
        margin: 4,
        width: NAV_WIDTH - 64
      }}
        variant={"outlined"} 
        onClick={() => auth.signOut()}>
        Выйти
      </Button>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
