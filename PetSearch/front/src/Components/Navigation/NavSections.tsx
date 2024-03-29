import { Box, List } from '@mui/material';
import React from 'react';
import { NavConfigItem } from './NavConfig';
import { NavItem } from './NavItems';

export default function NavSection({ data = [], ...other } : {data: Array<NavConfigItem>}) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}