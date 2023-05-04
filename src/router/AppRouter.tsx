import { Navigate, Route, Routes } from 'react-router-dom';
import AuthRoutes from '../auth/routes/AuthRoutes';
import JournalRoutes from '../journal/routes/JournalRoutes';
import { Status } from '../types';
import CheckingAuth from '../ui/components/CheckingAuth';
import useCheckOut from '../hooks/useCheckOut';

const AppRouter = () => {
  const status = useCheckOut();
  if (status === Status.Checking) {
    return <CheckingAuth />;
  }
  return (
    <Routes>
      {status === Status.Authenticated ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />

      {/* Login y registro */}
      {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}

      {/* JournalApp */}
      {/* <Route path="/*" element={<JournalRoutes />} /> */}
    </Routes>
  );
};
export default AppRouter;
