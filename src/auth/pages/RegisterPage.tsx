import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import { useAppDispatch, useAppSelector, useForm } from '../../hooks';
import { Status, iInitialForm, iInitialFormValidations } from '../../types';
import { useState, useMemo } from 'react';
import { starCreatingUserWithEmailPassword } from '../../store/auth';

const formData: iInitialForm = {
  email: '',
  password: '',
  displayName: '',
};
const formValidations: iInitialFormValidations = {
  email: [(value: string) => value.includes('@'), 'El correo debe tener un @'],
  password: [
    (value: string) => value.length >= 6,
    'El password debe tener al menos 6 caracteres',
  ],
  displayName: [
    (value: string) => value.length >= 1,
    'El nombre de usuario el obligatiorio',
  ],
};

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const { status, errorMessage } = useAppSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(
    () => status == Status.Checking,
    [status]
  );

  const [formSubmited, setFormSubmited] = useState(false);
  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmited(true);
    if (!isFormValid) return;

    dispatch(starCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Crear una cuenta">
      <div>
        <h1>FormValid {isFormValid ? 'Válido' : 'Incorrecto'}</h1>
        <form
          onSubmit={onSubmit}
          className="animate__animated animate__fadeIn "
        >
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Nombre Completo"
                type="text"
                placeholder="John doe"
                fullWidth
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={!!displayNameValid && formSubmited}
                helperText={displayNameValid}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@gmail.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmited}
                helperText={emailValid}
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
                error={!!passwordValid && formSubmited}
                helperText={passwordValid}
              />
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={isCheckingAuthentication}
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Crear Cuenta
                </Button>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="end">
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta ?</Typography>
              <Link component={RouterLink} color="inherit" to="/auth/login">
                Ingresar
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </AuthLayout>
  );
};
export default RegisterPage;
