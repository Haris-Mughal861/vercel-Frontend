import React, { useState } from 'react';
import {
  Box, CssBaseline, Drawer, IconButton,
  List, ListItem, ListItemIcon, ListItemText,
  Typography, useMediaQuery, Divider, Fab, ListItemButton
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import GroupsIcon from '@mui/icons-material/Groups';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import LogoutIcon from '@mui/icons-material/Logout';

import { useTheme } from '@mui/material/styles';
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';

const drawerWidth = 240;

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    dispatch(authActions.setAuth({ isAuth: false, userId: "", email: "", role: null }));
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Registered Sellers', icon: <GroupsIcon />, path: '/admin/sellers' },
    { text: 'Login Stats', icon: <AssessmentIcon />, path: '/admin/logins' },
    { text: 'Update Banner', icon: <AdUnitsIcon />, path: '/admin/banner-editor' },
  ];

  const drawerContent = (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold">Admin Panel</Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <CssBaseline />

      
      {isMobile && (
        <Fab
          color="default"
          size="medium"
          onClick={() => setMobileOpen(true)}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1300,
            minHeight: '36px',
          }}
        >
          <MenuIcon />
        </Fab>
      )}

      
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': { width: drawerWidth } }}
        >
          {drawerContent}
        </Drawer>
      ) : (
       
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: isMobile ? 0 : 0,
          ml: isMobile ? 0 : `${drawerWidth}px`,
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default AdminLayout;
