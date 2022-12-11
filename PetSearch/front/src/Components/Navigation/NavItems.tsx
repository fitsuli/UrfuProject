import { NavLink as RouterLink } from 'react-router-dom';
import ListItemText from '@mui/material/ListItemText';
import { StyledNavItem, StyledNavItemIcon } from './StyledNavItem';
import { alpha, useTheme } from '@mui/material';

export const NavItem = ({ item } : {item : any}) => {
    const { title, path, icon, info } = item;
    const theme = useTheme()
    
    return (
        // @ts-ignore
      <StyledNavItem
        component={RouterLink}
        to={path}
        sx={{
          '&.active': {
            color: theme.palette.primary.main,
            bgcolor: alpha(theme.palette.primary.main, 0.08),
            fontWeight: 'fontWeightBold',
          },
        }}
      >
        <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
  
        <ListItemText disableTypography primary={title} />
  
        {info && info}
      </StyledNavItem>
    );
  }