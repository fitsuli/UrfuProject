import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NearMeRoundedIcon from '@mui/icons-material/NearMeRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import React from 'react';

export type NavConfigItem = {
    title: string,
    path: string,
    icon: JSX.Element
}

export const NavConfig : Array<NavConfigItem> = [
    {
        title: 'Потеряшки',
        path: '/lost',
        icon: <SearchRoundedIcon />
    },
    {
        title: 'Найденные',
        path: '/found',
        icon: <NearMeRoundedIcon />
    },
    {
        title: 'Карта',
        path: '/map',
        icon: <PlaceRoundedIcon />
    }
]