import { Dispatch } from '@reduxjs/toolkit';
import { iNewNote, tGetState } from '../../types';
import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from '.';
import { loadNotes } from '../../helpers';

export const startNewNote = () => {
  return async (dispatch: Dispatch, getState: () => tGetState) => {
    //TODO: tarea dispatch de una nueva accion
    dispatch(savingNewNote());
    const { uid } = getState().auth;

    const newNote: iNewNote = {
      id: '',
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;
    //! dispatch
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
    // dispatch(newNote)
    // dispatch(activarNote)
  };
};
export const startLoadingNotes = () => {
  return async (dispatch: Dispatch, getState: () => tGetState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error('El UID del usuario no existe');

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};
