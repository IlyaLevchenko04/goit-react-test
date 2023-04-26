import { Tweets } from './Tweets';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SharedLayout } from './SharedLayout';
import { Homepage } from 'pages/Home';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Homepage />} />
        <Route path="tweets" element={<Tweets />} />
        <Route path="*" element={<Navigate to={'/'} />} />
      </Route>
    </Routes>
  );
};
