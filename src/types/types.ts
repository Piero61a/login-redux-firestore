// Interfaces
export interface iChildren {
  children: JSX.Element;
  title?: string;
}
export interface iDrawerWidth {
  drawerWidth: number;
}
export interface iInitialStateUser {
  status: Status;
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  errorMessage: string | null;
}
export interface iInitialStateJournal {
  isSaving: boolean;
  messageSaved: string;
  notes: iNewNote[];
  active: tActiveJournal | null;
}
export interface iNewNote {
  title: string;
  id: string;
  body: string;
  date: number;
}
export interface iNoteProps {
  note: iNewNote;
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
export interface iInitialFormValidations {
  [key: string]: [Function, string];
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

// Types
export type tGetState = {
  auth: iInitialStateUser;
  journal: iInitialStateJournal;
};

export type tFormValidation = {
  [key: string]: string | null;
};
export type tFormCheckedValues = {
  [key: string]: string | null;
};
export type tActiveJournal = {
  id: string;
  title: string;
  body: string;
  date: number;
  imagesUrls: string[];
};

// Enums
export enum Status {
  NotAuthenticated = 'not-authenticated',
  Checking = 'Checking',
  Authenticated = 'authenticated',
}
