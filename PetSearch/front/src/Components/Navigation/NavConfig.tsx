import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NearMeRoundedIcon from '@mui/icons-material/NearMeRounded';
import NightShelterRoundedIcon from '@mui/icons-material/NightShelterRounded';

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
        title: 'Приюты',
        path: '/shelter',
        icon: <NightShelterRoundedIcon />
    }
]