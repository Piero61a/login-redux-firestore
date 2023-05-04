import { useAppDispatch, useAppSelector, useForm } from '../../hooks';
import { ChangeEvent, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Google } from '@mui/icons-material';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';

import {
  starLoginWithEmailPassword,
  startGoogleSingIn,
} from '../../store/auth';
import AuthLayout from '../layout/AuthLayout';
import { Status, iInitialFormValidations } from '../../types';
const inicialFormData = {
  displayName: '',
  email: '',
  password: '',
};
const formValidations: iInitialFormValidations = {
  email: [(value: string) => value.includes('@'), 'El correo debe tener un @'],
  password: [
    (value: string) => value.length >= 6,
    'El password debe tener al menos 6 caracteres',
  ],
};
const LoginPage = () => {
  const { status, errorMessage } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { email, password, onInputChange } = useForm(
    inicialFormData,
    formValidations
  );
  const isAuthenticating = useMemo(() => status === Status.Checking, [status]);

  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ email, password });
    //! No es esta la accion a despachar
    dispatch(starLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSingIn = () => {
    console.log('onGoogleSinIn');
    dispatch(startGoogleSingIn());
  };
  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn ">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              autoComplete=""
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isAuthenticating}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={onGoogleSingIn}
                variant="contained"
                disabled={isAuthenticating}
                fullWidth
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una Cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
export default LoginPage;
