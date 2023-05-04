import {
  Box,
  Divider,
  Drawer,
  List,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { iDrawerWidth } from '../../types';
import { useAppSelector } from '../../hooks';
import SideBarList from './SideBarList';

const SideBar: React.FC<iDrawerWidth> = ({ drawerWidth = 240 }) => {
  const { displayName } = useAppSelector((state) => state.auth);
  const { notes } = useAppSelector((state) => state.journal);

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
          {notes.map((note) => (
            <SideBarList key={note.id} note={note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
