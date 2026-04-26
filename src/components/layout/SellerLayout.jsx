import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  Box, CssBaseline, ListItemButton, IconButton, useMediaQuery, Toolbar, AppBar, Typography
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';

const drawerWidth = 240;

const SellerLayout = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.setAuth({ isAuth: false, userId: "", email: "", role: null }));
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/seller/dashboard' },
    { text: 'Add Product', icon: <AddBoxIcon />, path: '/seller/product/add' },
    { text: 'My Products', icon: <ListAltIcon />, path: '/seller/product/list' },
    { text: 'Add Blog', icon: <AddBoxIcon />, path: '/seller/add-blog' },
    { text: 'My Blogs', icon: <ListAltIcon />, path: '/seller/blogs' },
    { text: 'Logout', icon: <LogoutIcon />, action: handleLogout },
  ];

  const drawer = (
    <Box sx={{ mt: isMobile ? 0 : '64px' }}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                if (item.path) {
                  navigate(item.path);
                } else if (item.action) {
                  item.action();
                }
                if (isMobile) setMobileOpen(false);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Top Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: 'white',
          color: 'black',
          zIndex: theme.zIndex.drawer + 1,
          borderBottom: '1px solid #ddd',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            Seller Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ [`& .MuiDrawer-paper`]: { width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              marginTop: '64px',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1.5, sm: 2, md: 3 },
          mt: '64px',
          ml: isMobile ? 0 : `${drawerWidth}px`,
          width: '100%',
          minWidth: 0,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default SellerLayout;
