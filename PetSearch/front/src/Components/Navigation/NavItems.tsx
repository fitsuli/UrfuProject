import { NavLink as RouterLink } from 'react-router-dom';
import ListItemText from '@mui/material/ListItemText';
import { StyledNavItem, StyledNavItemIcon } from './StyledNavItem';

export const NavItem = ({ item } : {item : any}) => {
    const { title, path, icon, info } = item;
  
    return (
        // @ts-ignore
      <StyledNavItem
        component={RouterLink}
        to={path}
        sx={{
          '&.active': {
            color: 'text.primary',
            bgcolor: 'action.selected',
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