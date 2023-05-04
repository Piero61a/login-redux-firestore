export interface iChildren {
  children: JSX.Element;
  title?: string;
}
export interface iDrawerWidth {
  drawerWidth: number;
}
export interface iInitialState {
  status: Status;
  uid: number | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  errorMessage: string | null;
}
export interface iInitialForm {
  [key: string]: string | undefined;
  email: string;
  password: string;
  displayName: string;
  displayNameValid?: string;
  emailValid?: string;
  passwordValid?: string;
}
export interface iRegisterWithCredentials {
  email: string;
  password: string;
  displayName: string;
}
export interface iGenericEmailPass {
  email: string;
  password: string;
}
export interface iInitialFormValidations {
  [key: string]: [Function, string];
}
export interface iError {
  code: any;
  message: any;
}
export interface iFormProps {
  initialForm: iInitialForm;
  formValidations: iInitialFormValidations;
}

export type tFormValidation = {
  [key: string]: string | null;
};
export type tFormCheckedValues = {
  [key: string]: string | null;
};

export enum Status {
  NotAuthenticated = 'not-authenticated',
  Checking = 'Checking',
  Authenticated = 'authenticated',
}
