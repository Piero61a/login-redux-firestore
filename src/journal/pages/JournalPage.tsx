import { useAppDispatch, useAppSelector } from '../../hooks';

import { IconButton } from '@mui/material';
import JournalLayout from '../layout/JournalLayout';
import { AddOutlined } from '@mui/icons-material';
import NothingSelectedView from '../views/NothingSelectedView';
import { startNewNote } from '../../store/journal';
import NoteView from '../views/NoteView';

const JournalPage = () => {
  const dispatch = useAppDispatch();
  const { isSaving, active } = useAppSelector((state) => state.journal);
  const onClickNewNote = () => {
    dispatch(startNewNote());
  };
  return (
    <JournalLayout>
      <>
        {active === null ? <NothingSelectedView /> : <NoteView />}

        <IconButton
          disabled={isSaving}
          onClick={onClickNewNote}
          size="large"
          sx={{
            color: 'white',
            backgroundColor: 'error.main',
            ':hover': { backgroundColor: 'error.main', opaciity: 0.9 },
            position: 'fixed',
            right: 50,
            bottom: 50,
          }}
        >
          <AddOutlined sx={{ fontSize: 30 }} />
        </IconButton>
      </>
    </JournalLayout>
  );
};
export default JournalPage;
