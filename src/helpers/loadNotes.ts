import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase';
import { iNewNote } from '../types';

export const loadNotes = async (uid: string = '') => {
  if (!uid) throw new Error('El UID del usuario no existe');

  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);
  const notes: iNewNote[] = [];
  docs.forEach((doc) => {
    notes.push({
      id: doc.id,
      title: doc.data().title,
      body: doc.data().body,
      date: doc.data().date,
    });
  });
  
  return notes;
};
