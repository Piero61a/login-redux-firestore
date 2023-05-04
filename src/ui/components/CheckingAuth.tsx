import { CircularProgress, Grid } from '@mui/material';

const CheckingAuth = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignContent="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', pt: 4 }}
    >
      <Grid container direction="row" justifyContent="center">
        <CircularProgress color="warning" />
      </Grid>
    </Grid>
  );
};

export default CheckingAuth;
