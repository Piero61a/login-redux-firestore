import {
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { iDrawerWidth } from '../../types';
import { SidebarList } from '../../constants/ArraySidebar';
import { TurnedInNot } from '@mui/icons-material';
import { useAppSelector } from '../../hooks';

const SideBar: React.FC<iDrawerWidth> = ({ drawerWidth = 240 }) => {
  const { displayName } = useAppSelector((state) => state.auth);
  const isScreenSmall = useMediaQuery('(max-width:600px)');
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant={isScreenSmall ? 'temporary' : 'permanent'}
        open={isScreenSmall ? false : true}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {SidebarList.map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TurnedInNot />
                </ListItemIcon>
                <Grid container direction="column">
                  <ListItemText primary={text} />
                  <ListItemText
                    secondary={
                      'quos distinctio, libero similique eos iste eligendi debitis?'
                    }
                  />
                </Grid>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
