import React from 'react';
import { useState } from 'react';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { useAuth } from '../Auth/AuthProvider';
import stringAvatar from '../../Utils/AvatarString';
import { useNavigate } from 'react-router-dom';

export const AccountPopover: React.FC = () => {
    const [open, setOpen] = useState(null);
    const navigate = useNavigate();
    const auth = useAuth();

    const handleOpen = (event: any) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };


    return <>
        <IconButton
            onClick={handleOpen}
            sx={{
                p: 0,
                ...{
                    '&:before': {
                        zIndex: 1,
                        content: "''",
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        position: 'absolute',
                    },
                },
            }}
        >
            <Avatar  {...stringAvatar(auth.user ? auth.user.fullName : "A A")} />
        </IconButton>

        <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
                sx: {
                    p: 0,
                    mt: 1.5,
                    ml: 0.75,
                    width: 180,
                    '& .MuiMenuItem-root': {
                        typography: 'body2',
                        borderRadius: 0.75,
                    },
                },
            }}
        >
            <Box sx={{ my: 1.5, px: 2.5 }}>
                <Typography variant="subtitle2" noWrap>
                    {auth.user && auth.user.fullName}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                    {auth.user && auth.user.role}
                </Typography>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack sx={{ p: 1 }}>
                <MenuItem key={'Домашняя'} onClick={() => navigate("/lost")}>
                    {'Домашняя'}
                </MenuItem>
                <MenuItem key={'Профиль'} onClick={handleClose}>
                    {'Профиль'}
                </MenuItem>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <MenuItem onClick={auth.signOut} sx={{ m: 1 }}>
                Выйти
            </MenuItem>
        </Popover>
    </>
}
